#!/usr/bin/env node

/**
 * Mock Data Management Utility
 * Helps manage mock data for the Bao COVID Map application
 */

const fs = require('fs');
const path = require('path');

const MOCK_DATA_PATH = path.join(__dirname, '..', 'public', 'mockData.json');

function validateMockData() {
  try {
    const data = JSON.parse(fs.readFileSync(MOCK_DATA_PATH, 'utf8'));

    const requiredKeys = [
      'countriesLatest',
      'allHistory',
      'allSummary'
    ];

    const missingKeys = requiredKeys.filter(key => !data[key]);

    if (missingKeys.length > 0) {
      console.error('❌ Missing required keys:', missingKeys.join(', '));
      return false;
    }

    console.log('✅ Mock data validation passed');
    console.log(`📊 Found ${data.countriesLatest?.length || 0} countries`);
    console.log(`📈 Historical data keys: ${Object.keys(data.allHistory || {}).length}`);

    return true;
  } catch (error) {
    console.error('❌ Error validating mock data:', error.message);
    return false;
  }
}

function updateTimestamps() {
  try {
    const data = JSON.parse(fs.readFileSync(MOCK_DATA_PATH, 'utf8'));
    const now = Date.now();

    // Update timestamps in countries data
    if (data.countriesLatest) {
      data.countriesLatest = data.countriesLatest.map(country => ({
        ...country,
        updated: now
      }));
    }

    fs.writeFileSync(MOCK_DATA_PATH, JSON.stringify(data, null, 2));
    console.log('✅ Timestamps updated successfully');
  } catch (error) {
    console.error('❌ Error updating timestamps:', error.message);
  }
}

function showStats() {
  try {
    const data = JSON.parse(fs.readFileSync(MOCK_DATA_PATH, 'utf8'));
    const stats = fs.statSync(MOCK_DATA_PATH);

    console.log('📊 Mock Data Statistics:');
    console.log(`File size: ${(stats.size / 1024).toFixed(2)} KB`);
    console.log(`Last modified: ${stats.mtime.toISOString()}`);

    if (data.countriesLatest) {
      const totalCases = data.countriesLatest.reduce((sum, country) => sum + (country.cases || 0), 0);
      const totalDeaths = data.countriesLatest.reduce((sum, country) => sum + (country.deaths || 0), 0);
      console.log(`🌍 Countries: ${data.countriesLatest.length}`);
      console.log(`📈 Global cases: ${totalCases.toLocaleString()}`);
      console.log(`💀 Global deaths: ${totalDeaths.toLocaleString()}`);
    }

    if (data.jhucsse) {
      const usStates = data.jhucsse.filter(item => item.country === 'US');
      const totalUSCases = usStates.reduce((sum, state) => sum + (state.stats?.confirmed || 0), 0);
      const totalUSDeaths = usStates.reduce((sum, state) => sum + (state.stats?.deaths || 0), 0);
      console.log(`🇺🇸 US States: ${usStates.length}`);
      console.log(`🏛️ US cases: ${totalUSCases.toLocaleString()}`);
      console.log(`⚰️ US deaths: ${totalUSDeaths.toLocaleString()}`);
      console.log(`📍 Total locations: ${data.jhucsse.length}`);
    }
  } catch (error) {
    console.error('❌ Error reading stats:', error.message);
  }
}

const command = process.argv[2];

switch (command) {
  case 'validate':
    validateMockData();
    break;
  case 'update-timestamps':
    updateTimestamps();
    break;
  case 'stats':
    showStats();
    break;
  default:
    console.log('Mock Data Management Utility');
    console.log('');
    console.log('Usage: node scripts/mock-data.js <command>');
    console.log('');
    console.log('Commands:');
    console.log('  validate          - Validate mock data structure');
    console.log('  update-timestamps - Update all timestamps to current time');
    console.log('  stats            - Show mock data statistics');
    break;
}

module.exports = {
  validateMockData,
  updateTimestamps,
  showStats
};