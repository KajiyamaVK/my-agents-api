// src/whatsapp/whatsapp.service.ts
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Client, LocalAuth, MessageMedia } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { AiTool } from '../common/decorators/ai-tool.decorator';
import { RegistryService } from '../registry/registry.service'; // UPDATED IMPORT

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
    
    if (process.env.NODE_ENV === 'test') return;

    const dataPath = './.wwebjs_auth';
    this.removeSessionLocks(dataPath);

    this.client = new Client({
      authStrategy: new LocalAuth({ dataPath }),
      puppeteer: {
        headless: true,
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
      },
    });

    this.initializeClient();
  }

  async onModuleInit() {
    if (this.client) this.client.initialize();
  }

  private initializeClient() {
    this.client.on('qr', (qr) => qrcode.generate(qr, { small: true }));
    this.client.on('ready', () => { this.isReady = true; this.logger.log('WhatsApp Client is ready!'); });
  }

  private removeSessionLocks(directory: string) {
    const resolvedPath = path.resolve(directory);
    if (!fs.existsSync(resolvedPath)) return;
    try {
      execSync(`find "${resolvedPath}" -name "Singleton*" -delete`);
    } catch (e) { this.logger.error(`Cleanup failed: ${e.message}`); }
  }

  @AiTool({
    name: 'send_whatsapp_message',
    description: 'Envia uma mensagem de texto via WhatsApp para um contato ou número.',
    parameters: {
      type: 'object',
      properties: { to: { type: 'string' }, message: { type: 'string' } },
      required: ['to', 'message'],
    },
  })
  async sendMessage({ to, message }: { to: string; message: string }) {
    if (!this.isReady) throw new Error('WhatsApp não está pronto.');
    try {
      const contact = await this.registryService.resolveContact(to);
      const contactId = contact ? contact.whatsappId : `${to.replace(/\D/g, '')}@c.us`;
      await this.client.sendMessage(contactId, message);
      return `Mensagem enviada via WhatsApp para ${to}`;
    } catch (e) { throw new Error(`Falha no WhatsApp: ${e.message}`); }
  }

  async sendImageToSelf(imageUrl: string, caption?: string) {
    if (!this.isReady) throw new Error('WhatsApp client not ready');
    const myId = this.client.info.wid._serialized;

    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
      
      const buffer = Buffer.from(await response.arrayBuffer());
      const media = new MessageMedia('image/jpeg', buffer.toString('base64'), 'image.jpg');
      
      await this.client.sendMessage(myId, media, { caption });
      return `Image sent to self`;
    } catch (e) {
      this.logger.error(`Failed to send image to self: ${e.message}`);
      throw new Error(`Failed to send image: ${e.message}`);
    }
  }

  @AiTool({
    name: 'get_frigate_snapshot_whatsapp',
    description: 'Captura uma foto da câmera Frigate e envia especificamente para o seu WhatsApp.',
    parameters: {
      type: 'object',
      properties: { cameraAlias: { type: 'string' }, customTitle: { type: 'string' } },
      required: ['cameraAlias'],
    },
  })
  async sendCameraSnapshotToSelf({ cameraAlias, customTitle }: { cameraAlias: string, customTitle?: string }): Promise<string> {
    if (!this.isReady) throw new Error('WhatsApp client not ready');

    const camera = await this.registryService.resolveCamera(cameraAlias);
    if (!camera) throw new Error(`Câmera "${cameraAlias}" não encontrada.`);

    const myId = this.client.info.wid._serialized;
    const url = `${this.frigateUrl}/api/${camera.frigateName}/latest.jpg`;
    
    try {
      const response = await fetch(url);
      const media = new MessageMedia('image/jpeg', Buffer.from(await response.arrayBuffer()).toString('base64'), 'snap.jpg');
      await this.client.sendMessage(myId, media, { caption: customTitle || `📸 *${camera.name.toUpperCase()}*` });
      return `Snapshot de ${cameraAlias} enviado via WhatsApp.`;
    } catch (e) { throw new Error(`Erro no snapshot WhatsApp: ${e.message}`); }
  }
}