#!/usr/bin/env node

/**
 * MongoDB Connection Test Script
 * Tests the connection to MongoDB Atlas
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: './.env.local' });

async function testConnection() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI environment variable is not set');
      console.log('');
      console.log('📝 Please update your .env.local file with your MongoDB Atlas connection string:');
      console.log('   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority');
      return;
    }

    if (MONGODB_URI.includes('<username>') || MONGODB_URI.includes('<password>')) {
      console.error('❌ MONGODB_URI still contains placeholder values');
      console.log('');
      console.log('📝 Please replace the placeholders in .env.local with your actual MongoDB Atlas credentials');
      return;
    }

    console.log('🔌 Testing MongoDB Atlas connection...');
    console.log('📍 URI:', MONGODB_URI.replace(/:([^:@]{4})[^:@]*@/, ':$1****@')); // Hide password

    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });

    console.log('✅ Successfully connected to MongoDB Atlas!');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
    console.log('🏠 Host:', mongoose.connection.host);

    // Test basic operations
    const db = mongoose.connection.db;
    const collections = await db.collections();
    console.log('📁 Collections found:', collections.length);

    await mongoose.connection.close();
    console.log('🔌 Connection closed successfully');

  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('   Error:', error.message);

    if (error.message.includes('authentication failed')) {
      console.log('');
      console.log('🔐 Possible issues:');
      console.log('   - Incorrect username or password');
      console.log('   - Database user doesn\'t have proper permissions');
    } else if (error.message.includes('getaddrinfo ENOTFOUND')) {
      console.log('');
      console.log('🌐 Possible issues:');
      console.log('   - Incorrect cluster URL');
      console.log('   - Network connectivity issues');
    } else if (error.message.includes('connection timed out')) {
      console.log('');
      console.log('⏱️  Possible issues:');
      console.log('   - IP address not whitelisted in MongoDB Atlas');
      console.log('   - Firewall blocking connection');
    }

    console.log('');
    console.log('🛠️  Troubleshooting steps:');
    console.log('   1. Check your MongoDB Atlas dashboard > Network Access');
    console.log('   2. Verify username/password in connection string');
    console.log('   3. Ensure database user has read/write permissions');
    console.log('   4. Try connecting from MongoDB Compass first');
  }
}

if (require.main === module) {
  testConnection();
}

module.exports = { testConnection };