import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { promisify } from 'util';
import protoPath from '@repo/grpc';
import env from './config/env';

// Load the proto file from the grpc package
const packageDefinition = protoLoader.loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});


const agentProto = grpc.loadPackageDefinition(packageDefinition) as any;



// Create gRPC client
class AgentClient {
  private client: any;

  constructor() {
    this.client = new agentProto.linguaboost.AgentService(
      env.AGENT_SERVICE_URL,
      grpc.credentials.createInsecure()
    );
  }

  async sayHello(name: string): Promise<{ message: string }> {
    const sayHello = promisify(this.client.sayHello.bind(this.client));
    try {
      const response = await sayHello({ name });
      return response;
    } catch (error) {
      console.error('Error calling sayHello:', error);
      throw error;
    }
  }

  async processText(
    text: string,
    language: string,
    operations: string[]
  ): Promise<{
    processed_text: string;
    original_language: string;
    target_language: string;
    metadata: Record<string, string>;
    success: boolean;
    error_message: string;
  }> {
    const processText = promisify(this.client.processText.bind(this.client));
    try {
      const response = await processText({
        text,
        language,
        operations,
      });
      return response;
    } catch (error) {
      console.error('Error calling processText:', error);
      throw error;
    }
  }

  async getStatus(agentId?: string): Promise<{
    agent_id: string;
    status: string;
    uptime_seconds: number;
    processed_requests: number;
    version: string;
  }> {
    const getStatus = promisify(this.client.getStatus.bind(this.client));
    try {
      const response = await getStatus({ agent_id: agentId || '' });
      return response;
    } catch (error) {
      console.error('Error calling getStatus:', error);
      throw error;
    }
  }

  close() {
    this.client.close();
  }
}

export default AgentClient;
