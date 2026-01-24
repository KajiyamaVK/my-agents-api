// test/fixtures/whatsapp.mock.ts
export const WhatsappServiceMock = {
  // Mock the startup logic
  onModuleInit: jest.fn(), 
  
  // BEST PRACTICE: Mock the consolidated interface
  sendMessage: jest.fn().mockResolvedValue('Mensagem enviada com sucesso'),
  sendImageToSelf: jest.fn().mockResolvedValue('Imagem enviada com sucesso'),
  sendCameraSnapshotToSelf: jest.fn().mockResolvedValue('Snapshot enviado com sucesso'),
  
  // Status check used by guards/controllers
  isReady: true,
  
  client: {
    initialize: jest.fn(),
    destroy: jest.fn(),
    info: {
      wid: { _serialized: 'me@c.us' }
    }
  },
};