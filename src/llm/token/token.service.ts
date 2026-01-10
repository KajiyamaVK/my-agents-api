import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(private configService: ConfigService) {}
  async createToken() {
    const clientId = this.configService.getOrThrow<string>('FLOW_CLIENT_ID');
    const clientSecret =
      this.configService.getOrThrow<string>('FLOW_CLIENT_SECRET');
    const appToAccess =
      this.configService.getOrThrow<string>('FLOW_APP_TO_ACCESS');
    const flowTenant = this.configService.getOrThrow<string>('FLOW_TENANT');
    const flowAgent = this.configService.getOrThrow<string>('FLOW_AGENT');

    const payload = {
      appToAccess: appToAccess,
      clientId: clientId,
      clientSecret: clientSecret,
    };

    const url = 'https://flow.ciandt.com/auth-engine-api/v1/api-key/token';

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      FlowTenant: flowTenant,
      FlowAgent: flowAgent,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Response Status:', JSON.stringify(data));
      if (response.ok) {
        return data;
      }

      return {
        status: 'error',
        details: `Status code: ${response.status} - ${data.message || 'Unknown error'}`,
      };
    } catch (error) {
      return { status: 'error', details: error.message };
    }
  }

  checkHealth() {
    const url = 'https://flow.ciandt.com/auth-engine-api/v1/health';
    const check = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { Accept: 'application/json' },
        });
        if (response.ok) return { status: 'ok' };
        return { status: 'error', details: `Status code: ${response.status}` };
      } catch (error) {
        return { status: 'error', details: error.message };
      }
    };

    return check();
  }
}
