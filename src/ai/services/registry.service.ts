// src/ai/services/registry.service.ts
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';

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
    await this.syncFromLocalFile();
  }

  /**
   * Sincroniza o YAML com o Banco de Dados (Upsert).
   * Se o ficheiro estiver corrompido, o sistema mantém os dados atuais do BD.
   */
  private async syncFromLocalFile() {
    if (!fs.existsSync(this.configPath)) {
      this.logger.warn(`Ficheiro de configuração não encontrado em: ${this.configPath}. Usando apenas dados do banco.`);
      return;
    }

    try {
      const fileContent = fs.readFileSync(this.configPath, 'utf8');
      const config = yaml.load(fileContent) as ResourceConfig;

      if (!config) return;

      this.logger.log('A iniciar sincronização de recursos...');

      // Sincronizar Contatos
      if (config.contacts) {
        for (const contact of config.contacts) {
          await this.prisma.contact.upsert({
            where: { alias: contact.alias.toLowerCase() },
            update: { whatsappId: contact.whatsappId, isMe: contact.isMe || false },
            create: { alias: contact.alias.toLowerCase(), whatsappId: contact.whatsappId, isMe: contact.isMe || false },
          });
        }
      }

      // Sincronizar Câmeras
      if (config.cameras) {
        for (const cam of config.cameras) {
          await this.prisma.camera.upsert({
            where: { name: cam.name.toLowerCase() },
            update: { frigateName: cam.frigateName, description: cam.description },
            create: { name: cam.name.toLowerCase(), frigateName: cam.frigateName, description: cam.description },
          });
        }
      }

      this.logger.log('Sincronização concluída com sucesso.');
    } catch (error) {
      this.logger.error(`Erro ao processar ficheiro YAML: ${error.message}`);
      this.logger.warn('A sincronização foi abortada. O sistema operará com os dados persistidos anteriormente.');
    }
  }

  // Métodos de Resolução para a IA
  async resolveContact(term: string) {
    // BEST PRACTICE: Defensive programming to prevent crashes if IA sends objects/null
    if (!term || typeof term !== 'string') {
      this.logger.warn(`[resolveContact] Invalid term received: ${JSON.stringify(term)}`);
      return null;
    }

    const lowerTerm = term.toLowerCase();
    
    if (['me', 'mim', 'self', 'meu'].includes(lowerTerm)) {
      return this.prisma.contact.findFirst({ where: { isMe: true } });
    }

    return this.prisma.contact.findUnique({
      where: { alias: lowerTerm }
    });
  }

  async resolveCamera(name: string) {
    // BEST PRACTICE: Defensive programming to prevent "name.toLowerCase is not a function"
    if (!name || typeof name !== 'string') {
      this.logger.warn(`[resolveCamera] Invalid name received: ${JSON.stringify(name)}`);
      return null;
    }

    return this.prisma.camera.findUnique({
      where: { name: name.toLowerCase() }
    });
  }

  async getAllCameras() {
    return this.prisma.camera.findMany();
  }
}