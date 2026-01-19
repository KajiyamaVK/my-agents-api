export const WhatsappServiceMock = {
  // Mock the startup logic (so it doesn't launch Chromium)
  onModuleInit: jest.fn(), 
  
  // Mock the specific methods your controllers use
  sendCameraSnapshotToSelf: jest.fn().mockResolvedValue({ status: 'sent', timestamp: Date.now() }),
  sendMessage: jest.fn().mockResolvedValue(true),
  isReady: jest.fn().mockReturnValue(true),
  
  // If you use the client directly somewhere, mock it too
  client: {
    initialize: jest.fn(),
    destroy: jest.fn(),
  },
};