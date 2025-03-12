import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

// Copy production schema but use SQLite with an in-memory database for tests
async function setupTestDatabase() {
  // Replace the database URL to use in-memory SQLite for tests
  process.env.DATABASE_URL = 'file:./test.db';
  
  const prisma = new PrismaClient();
  
  try {
    // Clean up the database first
    console.log('Setting up test database...');
    
    // Create tables using the schema
    await prisma.$executeRawUnsafe('PRAGMA foreign_keys = OFF;');
    
    // Insert test data
    console.log('Seeding test data...');
    
    // Example: Create test users
    await prisma.user.createMany({
      data: [
        {
          email: 'test1@example.com',
          name: 'Test User 1',
          status: 'guest',
          password: 'password123'
        },
        {
          email: 'test2@example.com',
          name: 'Test User 2',
          status: 'admin',
          password: 'password123'
        }
      ]
    });
    
    // Add more test data for other tables as needed
    
    console.log('Test database setup complete!');
  } catch (error) {
    console.error('Error setting up test database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  setupTestDatabase();
}

export { setupTestDatabase };
