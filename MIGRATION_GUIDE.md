# Migration Guide: Static JSON to MongoDB Atlas

## Overview
This guide helps you migrate from static `mockData.json` files to MongoDB Atlas for better scalability and maintainability.

## Prerequisites
- MongoDB Atlas account with a cluster
- Vercel account
- Node.js environment

## Step 1: Set Up MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Create a free account and cluster

2. **Create Database and User**
   - In Atlas dashboard, create a new database (e.g., `covidmap`)
   - Create a database user with read/write permissions
   - Whitelist your IP address (or 0.0.0.0/0 for all IPs)

3. **Get Connection String**
   - Click "Connect" > "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## Step 2: Configure Environment Variables

1. **Local Development**
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` and add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/covidmap?retryWrites=true&w=majority
   ```

2. **Vercel Deployment**
   - In Vercel dashboard, go to your project settings
   - Add environment variable: `MONGODB_URI`
   - Set the value to your MongoDB connection string

## Step 3: Seed the Database

```bash
# Install dependencies (if not already done)
npm install

# Seed the database with existing mock data
npm run seed-db
```

This will:
- Connect to your MongoDB Atlas cluster
- Clear any existing data
- Import all data from `mockData.json`
- Create the necessary collections

## Step 4: Test the Migration

```bash
# Start development server
npm start
```

Visit your application and verify:
- Map loads with US state markers
- Charts display historical data
- Country statistics are shown
- No console errors related to data fetching

## Step 5: Deploy to Vercel

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel --prod
```

Or push to your Git repository if you have automatic deployments set up.

## Step 6: Clean Up (Optional)

After confirming everything works with MongoDB:

```bash
# Remove the static JSON file (optional)
rm public/mockData.json

# Update .gitignore to exclude .env.local
echo ".env.local" >> .gitignore
```

## Troubleshooting

### Connection Issues
- Verify MongoDB Atlas IP whitelist includes your IP
- Check username/password in connection string
- Ensure database user has read/write permissions

### Seeding Errors
- Check MongoDB Atlas network access
- Verify connection string format
- Ensure database name in URI matches your Atlas database

### Vercel Deployment Issues
- Confirm `MONGODB_URI` environment variable is set in Vercel
- Check Vercel function logs for connection errors
- Verify API routes are working: `/api/mock-data/countriesLatest`

## Benefits of MongoDB Migration

✅ **Scalability**: Handle more data and concurrent users
✅ **Real-time Updates**: Easy to update data programmatically
✅ **Backup & Recovery**: Built-in MongoDB Atlas features
✅ **Query Performance**: Optimized database queries
✅ **Data Integrity**: Schema validation and constraints
✅ **Production Ready**: Industry-standard database solution

## Rollback (if needed)

If you need to rollback to static JSON:

1. Restore `public/mockData.json` from backup
2. Update config to use local JSON instead of API routes
3. Remove MongoDB-related code

The application is designed to work with both approaches seamlessly.