#!/usr/bin/env node

/**
 * Database Seeding Script
 * Seeds MongoDB with mock COVID data from mockData.json
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const {
  CountryLatest,
  AllSummary,
  JHUCSSE,
  AllHistory,
  IndiaLatest,
  IndiaHistory,
  VietnamLatest,
  VietnamHistory
} = require('../models/CovidData');

async function seedDatabase() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    console.log('🌱 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Load mock data
    const mockDataPath = path.join(__dirname, '..', 'public', 'mockData.json');
    const mockData = JSON.parse(fs.readFileSync(mockDataPath, 'utf8'));
    console.log('📖 Loaded mock data from JSON file');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await Promise.all([
      CountryLatest.deleteMany({}),
      AllSummary.deleteMany({}),
      JHUCSSE.deleteMany({}),
      AllHistory.deleteMany({}),
      IndiaLatest.deleteMany({}),
      IndiaHistory.deleteMany({}),
      VietnamLatest.deleteMany({}),
      VietnamHistory.deleteMany({})
    ]);
    console.log('✅ Cleared existing data');

    // Seed data
    console.log('🌱 Seeding database...');

    if (mockData.countriesLatest && mockData.countriesLatest.length > 0) {
      await CountryLatest.insertMany(mockData.countriesLatest);
      console.log(`✅ Seeded ${mockData.countriesLatest.length} countries`);
    }

    if (mockData.allSummary) {
      await AllSummary.create(mockData.allSummary);
      console.log('✅ Seeded global summary');
    }

    if (mockData.jhucsse && mockData.jhucsse.length > 0) {
      await JHUCSSE.insertMany(mockData.jhucsse);
      console.log(`✅ Seeded ${mockData.jhucsse.length} provincial locations`);
    }

    if (mockData.allHistory) {
      await AllHistory.create(mockData.allHistory);
      console.log('✅ Seeded historical data');
    }

    if (mockData.indiaLatest) {
      await IndiaLatest.create(mockData.indiaLatest);
      console.log('✅ Seeded India latest data');
    }

    if (mockData.indiaHistory && mockData.indiaHistory.length > 0) {
      await IndiaHistory.insertMany(mockData.indiaHistory);
      console.log(`✅ Seeded ${mockData.indiaHistory.length} India history records`);
    }

    if (mockData.vietnamLatest) {
      await VietnamLatest.create(mockData.vietnamLatest);
      console.log('✅ Seeded Vietnam latest data');
    }

    if (mockData.vietnamHistory && mockData.vietnamHistory.length > 0) {
      await VietnamHistory.insertMany(mockData.vietnamHistory);
      console.log(`✅ Seeded ${mockData.vietnamHistory.length} Vietnam history records`);
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log('📊 You can now remove the mockData.json file from /public');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the seeding script
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };