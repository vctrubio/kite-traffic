# API Testing Guide

## Manual Testing

1. Run the development server:
   ```
   npm run dev
   ```

2. Visit the API testing interface at `http://localhost:3000/api-test`
   This interface allows you to:
   - Select any API endpoint
   - Choose HTTP method (GET, POST, PUT, DELETE)
   - Provide ID parameters for individual resources
   - Enter JSON request bodies for POST/PUT requests
   - See formatted API responses

3. Examples:
   - Get all users: Select `/api/users` with GET method
   - Create a user: Select `/api/users` with POST method and provide JSON:
     ```json
     {
       "name": "Test User",
       "email": "test@example.com",
       "status": "guest"
     }
     ```
   - Get a specific user: Select `/api/users` with GET method and enter the ID
   - Update a user: Select `/api/users` with PUT method, enter the ID, and provide the updated fields
   - Delete a user: Select `/api/users` with DELETE method and enter the ID

## Automated Testing

1. Install testing dependencies:
   ```
   npm install --save-dev jest @testing-library/react node-mocks-http jest-environment-node @types/jest
   ```

2. Setup test database:
   ```
   npx ts-node prisma/setup-test-db.ts
   ```

3. Run the tests:
   ```
   npm test
   ```

4. Run tests in watch mode during development:
   ```
   npm run test:watch
   ```

## Creating New Tests

To create tests for a new API endpoint:

1. Create a new test file in the `__tests__/api` directory
2. Import the handler functions from your route file
3. Mock the Prisma client for the corresponding model
4. Write test cases for each HTTP method

Example test structure:
```typescript
import { createMocks } from 'node-mocks-http';
import { GET, POST } from '@/app/api/[resource]/route';
import { prisma } from '@/lib/prisma';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    [resourceName]: {
      findMany: jest.fn(),
      create: jest.fn(),
      // other methods...
    },
  },
}));

describe('[Resource] API Endpoints', () => {
  // Test cases here
});
```

## Simulating API Requests in Tests

```typescript
// For GET requests
const { req } = createMocks({ method: 'GET' });
const response = await GET();

// For POST requests with a body
const mockRequest = {
  json: jest.fn().mockResolvedValue({ name: 'Test', email: 'test@example.com' }),
} as unknown as Request;
const response = await POST(mockRequest);

// For PUT/DELETE requests with URL parameters
const mockParams = { params: { id: '1' } };
const mockRequest = {
  json: jest.fn().mockResolvedValue({ name: 'Updated' }),
} as unknown as Request;
const response = await PUT(mockRequest, mockParams);
```
