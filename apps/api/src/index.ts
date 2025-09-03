import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import AgentClient from './grpc-client.js';

const app = new Hono();
const agentClient = new AgentClient();

app.get('/', (c) => {
  return c.text('Hello Hono! API Server is running.');
});

// Health check
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// gRPC routes for agent communication
app.get('/agent/hello/:name', async (c) => {
  try {
    const name = c.req.param('name');
    const response = await agentClient.sayHello(name);
    return c.json(response);
  } catch (error) {
    return c.json({ error: 'Failed to communicate with agent' }, 500);
  }
});

app.get('/agent/status', async (c) => {
  try {
    const response = await agentClient.getStatus();
    return c.json(response);
  } catch (error) {
    return c.json({ error: 'Failed to get agent status' }, 500);
  }
});

app.post('/agent/process', async (c) => {
  try {
    const body = await c.req.json();
    const { text, language, operations } = body;
    
    if (!text || !language || !operations) {
      return c.json({ error: 'Missing required fields: text, language, operations' }, 400);
    }
    
    const response = await agentClient.processText(text, language, operations);
    return c.json(response);
  } catch (error) {
    return c.json({ error: 'Failed to process text with agent' }, 500);
  }
});

serve(
  {
    fetch: app.fetch,
    port: 8080
  },
  (info) => {
    console.log(`API Server is running on http://localhost:${info.port}`);
    console.log('Available endpoints:');
    console.log('  GET  /health');
    console.log('  GET  /agent/hello/:name');
    console.log('  GET  /agent/status');
    console.log('  POST /agent/process');
  }
);
