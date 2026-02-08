/**
 * BullMQ Mock Fixture
 * 
 * Provides mock implementations of BullMQ Queue and related objects
 * to prevent real Redis connections during e2e testing.
 */

export const BullMQMock = {
  add: jest.fn().mockResolvedValue({ id: 'mock-job-id' }),
  close: jest.fn().mockResolvedValue(undefined),
  getJobs: jest.fn().mockResolvedValue([]),
  getJobCounts: jest.fn().mockResolvedValue({
    waiting: 0,
    active: 0,
    completed: 0,
    failed: 0,
    delayed: 0,
  }),
  pause: jest.fn().mockResolvedValue(undefined),
  resume: jest.fn().mockResolvedValue(undefined),
  clean: jest.fn().mockResolvedValue([]),
  obliterate: jest.fn().mockResolvedValue(undefined),
  on: jest.fn().mockReturnThis(),
  off: jest.fn().mockReturnThis(),
  removeListener: jest.fn().mockReturnThis(),
  emit: jest.fn().mockReturnThis(),
  name: 'mock-queue',
};
