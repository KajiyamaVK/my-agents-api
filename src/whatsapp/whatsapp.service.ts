import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Client, LocalAuth, MessageMedia } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { delay } from '../common/utils/delay.util';

@Injectable()
export class WhatsappService implements OnModuleInit {
  private client: Client;
  private readonly logger = new Logger(WhatsappService.name);
  private frigateUrl: string;

  constructor(private configService: ConfigService) {
    this.frigateUrl = this.configService.get<string>('FRIGATE_URL') ?? 'http://localhost:5000';
    
    const isTest = process.env.NODE_ENV === 'test';
    const dataPath = isTest ? './.wwebjs_auth_test' : './.wwebjs_auth';

    this.removeSessionLocks(dataPath);

    // FIX: Add delay to allow for file system to release locks after previous session
    // This is a temporary fix, and a more robust solution might involve
    // better process management or a watchdog for the session directory.
    this.client = new Client({
      authStrategy: new LocalAuth({ 
        dataPath: dataPath 
      }),
      puppeteer: {
        headless: true,
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
        args: [
          '--no-sandbox', 
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ],
      },
    });

    this.initializeClient();
  }

  async onModuleInit() {
    this.client.initialize();
  }

  private initializeClient() {
    this.client.on('qr', (qr) => {
      this.logger.log('QR RECEIVED. Scan this with your WhatsApp:');
      qrcode.generate(qr, { small: true });
    });

    this.client.on('ready', () => {
      this.logger.log('WhatsApp Client is ready!');
    });

    this.client.on('authenticated', () => {
      this.logger.log('WhatsApp Client authenticated');
    });

    this.client.on('auth_failure', (msg) => {
      this.logger.error('Authentication failure', msg);
    });
  }

  private removeSessionLocks(directory: string) {
    const resolvedPath = path.resolve(directory);
    
    if (!fs.existsSync(resolvedPath)) {
      return;
    }

    try {
      const files = fs.readdirSync(resolvedPath);
      
      for (const file of files) {
        const fullPath = path.join(resolvedPath, file);
        console.log('Checking file:', fullPath); // DEBUG
        const stat = fs.lstatSync(fullPath);

        if (stat.isDirectory()) {
          this.removeSessionLocks(fullPath);
        } else if (['SingletonLock', 'SingletonCookie', 'SingletonSocket'].includes(file)) {
          this.logger.warn(`Forcibly removing Chromium Lock file at: ${fullPath}`);
          execSync(`rm -f "${fullPath}"`);
        }
      }
    } catch (error) {
      this.logger.error(`Failed to clean session locks: ${error.message}`);
    }
  }

  async sendTestMessageToSelf(message: string): Promise<any> {
    if (!this.client.info || !this.client.info.wid) {
      throw new Error('Client is not ready or not authenticated');
    }

    const myId = this.client.info.wid._serialized;

    return this.client.sendMessage(myId, message, { sendSeen: false }); 
  }

  async sendImageToSelf(imageUrl: string, caption?: string): Promise<any> {
    if (!this.client.info || !this.client.info.wid) {
      throw new Error('Client is not ready or not authenticated');
    }

    const myId = this.client.info.wid._serialized;

    // 1. Fetch the media from the URL
    const media = await MessageMedia.fromUrl(imageUrl);

    // 2. Send the media
    return this.client.sendMessage(myId, media, { 
      caption: caption, 
      sendSeen: false
    });
  }

  async sendCameraSnapshotToSelf(cameraName: string, customTitle?: string): Promise<any> {
    if (!this.client.info || !this.client.info.wid) {
      throw new Error('Client is not ready or not authenticated');
    }

    const myId = this.client.info.wid._serialized;
    const snapshotUrl = `${this.frigateUrl}/api/${cameraName}/latest.jpg`;
    
    this.logger.log(`Fetching snapshot and headers from: ${snapshotUrl}`);

    try {
      // 1. Fetch the image manually to get headers
      const response = await fetch(snapshotUrl);
      
      if (!response.ok) {
        throw new Error(`Frigate returned ${response.status} ${response.statusText}`);
      }

      // 2. Extract Timestamps
      const serverDate = new Date(); // Current Server Time
      const lastModifiedHeader = response.headers.get('last-modified');
      const frigateDate = lastModifiedHeader ? new Date(lastModifiedHeader) : serverDate;

      // Calculate Latency (in seconds)
      const latencyMs = serverDate.getTime() - frigateDate.getTime();
      const latencySec = (latencyMs / 1000).toFixed(1);

      // 3. Convert Image Buffer to MessageMedia
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Data = buffer.toString('base64');
      const media = new MessageMedia('image/jpeg', base64Data, 'snapshot.jpg');

      // 4. Format Times for Brasilia
      const fmtOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };

      const frigateTimeStr = new Intl.DateTimeFormat('pt-BR', fmtOptions).format(frigateDate);
      const serverTimeStr = new Intl.DateTimeFormat('pt-BR', fmtOptions).format(serverDate);

      const title = customTitle ? `🔔 *${customTitle}*` : `📸 *${cameraName}*`;

      // 5. Construct Caption with comparison
      const caption = 
        `${title}\n` +
        `📹 Frame: ${frigateTimeStr}\n` +
        `🤖 Server: ${serverTimeStr}\n` +
        `⏱️ Latency: ${latencySec}s`;

      return this.client.sendMessage(myId, media, { 
        caption: caption,
        sendSeen: false
      });

    } catch (error) {
      this.logger.error(`Failed to send snapshot for ${cameraName}`, error);
      throw new Error(`Could not fetch or send snapshot: ${error.message}`);
    }
  }
}