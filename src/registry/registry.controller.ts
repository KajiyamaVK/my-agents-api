// src/registry/registry.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { RegistryService } from './registry.service';
import { FlowAuthGuard } from '../common/guards/flow.guard'; // Import the guard

@Controller('registry')
@UseGuards(FlowAuthGuard) // FIX: Secure all endpoints in this controller
export class RegistryController {
  constructor(private readonly registryService: RegistryService) {}

  @Get('debug')
  async getDebugResources() {
    return this.registryService.getDebugResources();
  }
}