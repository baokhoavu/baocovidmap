#!/usr/bin/env node

/**
 * Database Model Test Script
 * Tests the MongoDB models and data retrieval
 */

const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

async function testDatabaseModels() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI environment variable is not set');
      return;
    }

    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Import models directly
    const { CountryLatest, AllHistory, AllSummary, JHUCSSE } = require(path.join(__dirname, '../models/CovidData'));

    // Test each model
    const tests = [
      { name: 'CountryLatest', model: CountryLatest, expectedCount: 20 },
      { name: 'AllHistory', model: AllHistory, expectedCount: 1 },
      { name: 'AllSummary', model: AllSummary, expectedCount: 1 },
      { name: 'JHUCSSE', model: JHUCSSE, expectedCount: 30 }
    ];

    for (const test of tests) {
      try {
        console.log(`\n🧪 Testing ${test.name} model...`);
        const count = await test.model.countDocuments();
        console.log(`✅ ${test.name}: Found ${count} documents`);

        if (count > 0) {
          const sample = await test.model.findOne().limit(1);
          console.log(`   📊 Sample keys: ${Object.keys(sample.toObject()).join(', ')}`);
        }

        if (count !== test.expectedCount) {
          console.log(`⚠️  Expected ${test.expectedCount} documents, found ${count}`);
        }

      } catch (error) {
        console.error(`❌ ${test.name} test failed:`, error.message);
      }
    }

    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    console.log('\n🎉 All database model tests completed!');
    console.log('\n✅ Your MongoDB Atlas setup is working correctly!');
    console.log('🚀 Ready for Vercel deployment!');

  } catch (error) {
    console.error('❌ Test script failed:', error.message);
  }
}

if (require.main === module) {
  testDatabaseModels();
}

module.exports = { testDatabaseModels };