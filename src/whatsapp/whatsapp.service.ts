import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Client, LocalAuth, MessageMedia } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WhatsappService implements OnModuleInit {
  private client: Client;
  private readonly logger = new Logger(WhatsappService.name);
  private frigateUrl: string;

  constructor(private configService: ConfigService) {
    this.frigateUrl = this.configService.get<string>('FRIGATE_URL') ?? 'http://localhost:5000';

    this.client = new Client({
      authStrategy: new LocalAuth(), // Saves session locally so you don't scan QR every time
      puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Required for some environments (like Docker)
      },
    });

    this.initializeClient();
  }

  onModuleInit() {
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

  async sendTestMessageToSelf(message: string): Promise<any> {
    if (!this.client.info || !this.client.info.wid) {
      throw new Error('Client is not ready or not authenticated');
    }

    const myId = this.client.info.wid._serialized;

    // ADD { sendSeen: false } HERE
    return this.client.sendMessage(myId, message, { sendSeen: false }); 
  }

  async sendImageToSelf(imageUrl: string, caption?: string): Promise<any> {
    if (!this.client.info || !this.client.info.wid) {
      throw new Error('Client is not ready or not authenticated');
    }

    const myId = this.client.info.wid._serialized;

    // 1. Fetch the media from the URL
    // MessageMedia.fromUrl downloads the file and converts it to base64 automatically.
    const media = await MessageMedia.fromUrl(imageUrl);

    // 2. Send the media
    // We pass the media object as the content.
    // 'caption' is part of the options object.
    return this.client.sendMessage(myId, media, { 
      caption: caption, 
      sendSeen: false // Keep this to avoid the "markedUnread" error
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