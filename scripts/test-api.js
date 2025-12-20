#!/usr/bin/env node

/**
 * API Endpoint Test Script
 * Tests the MongoDB-integrated API endpoints
 */

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

async function testAPIEndpoints() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI environment variable is not set');
      return;
    }

    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Change to project root directory for correct relative imports
    process.chdir(path.join(__dirname, '..'));

    // Test each API endpoint
    const endpoints = [
      { name: 'countriesLatest', path: path.join(__dirname, '../api/mock-data/countriesLatest.js') },
      { name: 'allHistory', path: path.join(__dirname, '../api/mock-data/allHistory.js') },
      { name: 'allSummary', path: path.join(__dirname, '../api/mock-data/allSummary.js') },
      { name: 'jhucsse', path: path.join(__dirname, '../api/mock-data/jhucsse.js') }
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`\n🧪 Testing ${endpoint.name} endpoint...`);

        // Mock request/response objects
        const mockReq = { method: 'GET', query: {} };
        const mockRes = {
          status: (code) => ({
            json: (data) => {
              console.log(`✅ ${endpoint.name}: Status ${code}, Data length: ${JSON.stringify(data).length} chars`);
              if (Array.isArray(data) && data.length > 0) {
                console.log(`   📊 Sample data: ${JSON.stringify(data[0]).substring(0, 100)}...`);
              } else if (typeof data === 'object' && data !== null) {
                console.log(`   📊 Data keys: ${Object.keys(data).join(', ')}`);
              }
              return mockRes;
            },
            send: (data) => {
              console.log(`✅ ${endpoint.name}: Status ${code}, Response sent`);
              return mockRes;
            }
          }),
          setHeader: () => mockRes,
          json: (data) => {
            console.log(`✅ ${endpoint.name}: Data returned, length: ${JSON.stringify(data).length} chars`);
            if (Array.isArray(data) && data.length > 0) {
              console.log(`   📊 Sample data: ${JSON.stringify(data[0]).substring(0, 100)}...`);
            }
            return mockRes;
          }
        };

        // Import and call the endpoint function
        const endpointModule = require(endpoint.path);
        const handler = endpointModule.default || endpointModule;

        if (typeof handler === 'function') {
          await handler(mockReq, mockRes);
        } else {
          console.log(`⚠️  ${endpoint.name}: Handler not found or not a function`);
        }

      } catch (error) {
        console.error(`❌ ${endpoint.name} failed:`, error.message);
      }
    }

    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    console.log('\n🎉 All API endpoint tests completed!');

  } catch (error) {
    console.error('❌ Test script failed:', error.message);
  }
}

if (require.main === module) {
  testAPIEndpoints();
}

module.exports = { testAPIEndpoints };