import { createMocks } from 'node-mocks-http';
import { GET, POST } from '@/app/api/users/route';
import { prisma } from '@/lib/prisma';

// Mock the prisma client
jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findMany: jest.fn(),
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe('Users API Endpoints', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const mockUsers = [
        { id: 1, name: 'Test User', email: 'test@example.com', status: 'guest' },
        { id: 2, name: 'Test User 2', email: 'test2@example.com', status: 'guest' },
      ];
      
      (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);
      
      const { req } = createMocks({ method: 'GET' });
      const response = await GET();
      const responseBody = await response.json();
      
      expect(response.status).toBe(200);
      expect(responseBody).toEqual(mockUsers);
      expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
    });

    it('should handle errors', async () => {
      (prisma.user.findMany as jest.Mock).mockRejectedValue(new Error('Database error'));
      
      const { req } = createMocks({ method: 'GET' });
      const response = await GET();
      const responseBody = await response.json();
      
      expect(response.status).toBe(500);
      expect(responseBody).toHaveProperty('error');
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const mockUser = {
        id: 1,
        name: 'New User',
        email: 'new@example.com',
        status: 'guest',
      };
      
      const mockRequestBody = {
        name: 'New User',
        email: 'new@example.com',
      };
      
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);
      
      const { req } = createMocks({
        method: 'POST',
        body: mockRequestBody,
      });
      
      // Mock the request.json() method
      const mockRequest = {
        json: jest.fn().mockResolvedValue(mockRequestBody),
      } as unknown as Request;
      
      const response = await POST(mockRequest);
      const responseBody = await response.json();
      
      expect(response.status).toBe(201);
      expect(responseBody).toEqual(mockUser);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: mockRequestBody,
      });
    });
  });
});
