// src/whatsapp/whatsapp.service.ts
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Client, LocalAuth, MessageMedia } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { AiTool } from 'src/common/decorators/ai-tool.decorator';
import { RegistryService } from 'src/ai/services/registry.service';

@Injectable()
export class WhatsappService implements OnModuleInit {
  private client: Client;
  private readonly logger = new Logger(WhatsappService.name);
  private frigateUrl: string;
  private isReady = false;

  constructor(
    private readonly configService: ConfigService,
    private readonly registryService: RegistryService,
  ) {
    this.frigateUrl = this.configService.get<string>('FRIGATE_URL') ?? 'http://localhost:5000';
    
    const isTest = process.env.NODE_ENV === 'test';
    
    if (isTest) {
      this.logger.warn('WhatsappService inicializado em modo TESTE. O Puppeteer não será iniciado.');
      return;
    }

    const dataPath = './.wwebjs_auth';
    this.removeSessionLocks(dataPath);

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
    if (this.client) {
      this.client.initialize();
    }
  }

  private initializeClient() {
    this.client.on('qr', (qr) => {
      this.logger.log('QR RECEIVED. Scan this with your WhatsApp:');
      qrcode.generate(qr, { small: true });
    });

    this.client.on('ready', () => {
      this.isReady = true;
      this.logger.log('WhatsApp Client is ready!');
    });

    this.client.on('authenticated', () => {
      this.logger.log('WhatsApp Client authenticated');
    });

    this.client.on('auth_failure', (msg) => {
      this.isReady = false;
      this.logger.error('Authentication failure', msg);
    });

    this.client.on('disconnected', (reason) => {
      this.isReady = false;
      this.logger.warn('WhatsApp Client was disconnected', reason);
    });
  }

  private removeSessionLocks(directory: string) {
    const resolvedPath = path.resolve(directory);
    if (!fs.existsSync(resolvedPath)) return;

    try {
      const files = fs.readdirSync(resolvedPath);
      for (const file of files) {
        const fullPath = path.join(resolvedPath, file);
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

  @AiTool({
    name: 'send_whatsapp_message',
    description: 'Envia uma mensagem para um contato cadastrado (ex: thiago, esposa), um número específico ou "me" para mim mesmo.',
    parameters: {
      type: 'object',
      properties: {
        to: { type: 'string', description: 'Nome do contato no cadastro, número com DDD ou "me" para enviar para mim' },
        message: { type: 'string', description: 'Texto da mensagem' },
      },
      required: ['to', 'message'],
    },
  })
  async sendMessage({ to, message }: { to: string; message: string }) {
    if (!this.isReady || !this.client?.info) {
      throw new Error('O cliente WhatsApp ainda não está pronto. Aguarde alguns segundos.');
    }

    try {
      let contactId: string;
      const registeredContact = await this.registryService.resolveContact(to);
      
      if (registeredContact) {
        contactId = registeredContact.whatsappId;
      } else if (['me', 'mim', 'self', 'meu', 'mim mesmo'].includes(to.toLowerCase())) {
        contactId = this.client.info.wid._serialized;
      } else {
        const cleanNumber = to.replace(/\D/g, '');
        if (!cleanNumber) throw new Error(`Destinatário "${to}" não reconhecido.`);
        contactId = to.includes('@c.us') ? to : `${cleanNumber}@c.us`;
      }

      this.logger.log(`Resolving recipient "${to}" to ID: ${contactId}`);

      try {
        const isSelf = contactId === this.client.info.wid._serialized;
        // Logic consolidated: if it's me, use sendSeen: false
        await this.client.sendMessage(contactId, message, isSelf ? { sendSeen: false } : {});
      } catch (innerError) {
        if (innerError.message?.includes('markedUnread')) {
          this.logger.warn(`Aviso: Erro 'markedUnread' ao enviar para ${to}. Entrega provável.`);
          return `Mensagem enviada para ${to} (com aviso de estado).`;
        }
        throw innerError;
      }
      
      return `Mensagem enviada com sucesso para ${to}`;
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      this.logger.error(`Erro ao enviar mensagem para ${to}: ${msg}`);
      throw new Error(`Falha no WhatsApp: ${msg}`);
    }
  }

  async sendImageToSelf(imageUrl: string, caption?: string): Promise<string> {
    if (!this.isReady || !this.client?.info?.wid) {
      throw new Error('WhatsApp client is not ready or authenticated');
    }

    const myId = this.client.info.wid._serialized;
    
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error(`Status: ${response.status}`);

      const arrayBuffer = await response.arrayBuffer();
      const media = new MessageMedia(
        response.headers.get('content-type') || 'image/jpeg', 
        Buffer.from(arrayBuffer).toString('base64'), 
        'image.jpg'
      );

      await this.client.sendMessage(myId, media, { caption, sendSeen: false });
      return `Imagem enviada com sucesso.`;
    } catch (error) {
      this.logger.error(`Failed to send image to self: ${error.message}`);
      throw new Error(`Could not send image: ${error.message}`);
    }
  }

  @AiTool({
    name: 'get_frigate_snapshot',
    description: 'Captura uma foto de uma câmera do Frigate e envia para o meu WhatsApp.',
    parameters: {
      type: 'object',
      properties: {
        cameraAlias: { type: 'string', description: 'O apelido da câmera (ex: portao, garagem).' },
        customTitle: { type: 'string', description: 'Um título opcional.' },
      },
      required: ['cameraAlias'],
    },
  })
  async sendCameraSnapshotToSelf(cameraAlias: string, customTitle?: string): Promise<string> {
    if (!this.isReady || !this.client?.info?.wid) {
      throw new Error('WhatsApp client not ready');
    }

    const camera = await this.registryService.resolveCamera(cameraAlias);
    if (!camera) throw new Error(`Câmera "${cameraAlias}" não encontrada.`);

    const myId = this.client.info.wid._serialized;
    const snapshotUrl = `${this.frigateUrl}/api/${camera.frigateName}/latest.jpg`;
    
    try {
      const response = await fetch(snapshotUrl);
      if (!response.ok) throw new Error(`Frigate status: ${response.status}`);

      const arrayBuffer = await response.arrayBuffer();
      const media = new MessageMedia('image/jpeg', Buffer.from(arrayBuffer).toString('base64'), 'snapshot.jpg');

      await this.client.sendMessage(myId, media, { 
        caption: customTitle ? `🔔 *${customTitle}*` : `📸 *${camera.name.toUpperCase()}*`,
        sendSeen: false 
      });
      return `Snapshot da câmera ${cameraAlias} enviado com sucesso.`;
    } catch (error) {
      this.logger.error(`Failed to send snapshot for ${cameraAlias}`, error);
      throw new Error(`Could not send snapshot: ${error.message}`);
    }
  }
}