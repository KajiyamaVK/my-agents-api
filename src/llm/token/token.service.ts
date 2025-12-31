import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService {
  async createToken(body: {
    clientId?: string;
    clientSecret?: string;
    appToAccess?: string;
  }) {
    const clientId = body.clientId || process.env.FLOW_CLIENT_ID || '';
    const clientSecret =
      body.clientSecret || process.env.FLOW_CLIENT_SECRET || '';
    const appToAccess = body.appToAccess || '';

    const payload = {
      appToAccess: appToAccess,
      clientId: clientId,
      clientSecret: clientSecret,
    };

    const url = 'https://flow.ciandt.com/auth-engine-api/v1/api-key/token';

    const flowTenant = process.env.FLOW_TENANT || '';
    const flowAgent = process.env.FLOW_AGENT || '';

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
        details: `Status code: ${response.status}`,
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
