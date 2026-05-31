// src/registry/registry.service.ts
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';
import { AiTool } from '../common/decorators/ai-tool.decorator';

interface ResourceConfig {
  contacts?: Array<{ alias: string; whatsappId: string; isMe?: boolean }>;
  cameras?: Array<{ name: string; frigateName: string; description?: string }>;
}

@Injectable()
export class RegistryService implements OnModuleInit {
  private readonly logger = new Logger(RegistryService.name);
  private readonly configPath = path.resolve('.config/resources.private.yaml');

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    this.debugConfigAccess(); // Run debug check first
    await this.syncFromLocalFile();
  }

  private debugConfigAccess() {
    this.logger.warn({ msg: '[DEBUG] Checking configuration...' });
    this.logger.log({ msg: '[DEBUG] CWD', cwd: process.cwd() });
    this.logger.log({ msg: '[DEBUG] Target Path', path: this.configPath });

    const dir = path.dirname(this.configPath);
    if (fs.existsSync(dir)) {
      try {
        const files = fs.readdirSync(dir);
        this.logger.log({ msg: `[DEBUG] Files found in ${dir}`, files });
      } catch (e) {
        this.logger.error({ msg: `[DEBUG] Cannot read directory ${dir}`, error: e.message });
      }
    } else {
      this.logger.error({ msg: `[DEBUG] Directory does NOT exist inside the container!`, dir });
    }
  }

  private async syncFromLocalFile() {
    if (!fs.existsSync(this.configPath)) {
      this.logger.warn({ msg: `FAILED: Config file not found at ${this.configPath}. Skipping sync.` });
      return;
    }

    try {
      const fileContent = fs.readFileSync(this.configPath, 'utf8');
      const config = yaml.load(fileContent) as ResourceConfig;

      if (!config) {
        this.logger.warn({ msg: 'YAML file is empty or invalid.' });
        return;
      }

      this.logger.log({ 
        msg: 'Starting sync...', 
        cameras: config.cameras?.length || 0, 
        contacts: config.contacts?.length || 0 
      });

      // Sync Contacts
      if (config.contacts) {
        for (const contact of config.contacts) {
          // Manual upsert logic since alias is not unique in schema and telegramChatId is required
          const existing = await this.prisma.contact.findFirst({
             where: { alias: contact.alias.toLowerCase() }
          });

          if (existing) {
             await this.prisma.contact.update({
               where: { id: existing.id },
               data: { whatsappId: contact.whatsappId, isMe: contact.isMe || false }
             });
          } else {
             // We need a telegramChatId because it's required and unique. 
             // Generating a placeholder if not provided, but ensuring uniqueness.
             // This is a workaround because the schema requires it.
             await this.prisma.contact.create({
               data: { 
                 alias: contact.alias.toLowerCase(), 
                 whatsappId: contact.whatsappId, 
                 isMe: contact.isMe || false,
                 telegramChatId: `placeholder_${Date.now()}_${Math.random().toString(36).substring(7)}` 
               }
             });
          }
        }
      }

      // Sync Cameras
      if (config.cameras) {
        for (const cam of config.cameras) {
          await this.prisma.camera.upsert({
            where: { name: cam.name.toLowerCase() },
            update: { frigateName: cam.frigateName, description: cam.description },
            create: { name: cam.name.toLowerCase(), frigateName: cam.frigateName, description: cam.description },
          });
        }
      }

      this.logger.log({ msg: 'Sync completed successfully.' });
    } catch (error) {
      this.logger.error({ msg: 'Sync failed', error: error.message });
    }
  }

  // ... (Keep existing resolveContact, resolveCamera, getAllCameras, getDebugResources methods as they were)
  
  async resolveContact(term: string) {
    if (!term || typeof term !== 'string') return null;
    const lowerTerm = term.toLowerCase();
    if (['me', 'mim', 'self', 'meu'].includes(lowerTerm)) {
      return this.prisma.contact.findFirst({ where: { isMe: true } });
    }
    // alias is not unique in schema, so use findFirst
    return this.prisma.contact.findFirst({ where: { alias: lowerTerm } });
  }

  async resolveCamera(name: string) {
    if (!name || typeof name !== 'string') return null;
    return this.prisma.camera.findUnique({ where: { name: name.toLowerCase() } });
  }

  async getAllCameras() {
    return this.prisma.camera.findMany();
  }

  @AiTool({
    name: 'get_database_resources',
    description: 'Retorna uma lista completa de todas as câmeras e contatos registrados no banco de dados.',
    parameters: { type: 'object', properties: {}, required: [] },
  })
  async getDebugResources() {
    const cameras = await this.prisma.camera.findMany();
    const contacts = await this.prisma.contact.findMany();
    return {
      total_cameras: cameras.length,
      total_contacts: contacts.length,
      cameras: cameras.map(c => ({ name: c.name, frigate_id: c.frigateName })),
      contacts: contacts.map(c => ({ alias: c.alias, is_me: c.isMe }))
    };
  }
}