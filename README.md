# Bao's COVID-19 Tracking Map

COVID-19 tracking map project - a responsive web app I built to help visualize the global spread of the coronavirus during those intense early pandemic days. Using Create React App as the foundation, it pulls real-time data and displays it on interactive maps and charts so people can understand what's happening around the world.

## Live Demo

Check it out live: [https://baocovidmap.vercel.app/](https://baocovidmap.vercel.app/)

## What It Does

- **Interactive Dashboard**: Get the latest numbers on confirmed cases, recoveries, and deaths for every country
- **Historical Data Visualization**: See how things progressed over time with area charts, line graphs, and bar charts
- **Global Map View**: Click around the world to see COVID impact by location
- **Responsive Design**: Works great on desktop, tablet, and mobile

## Tech Stack

### Frontend
- **Create React App** - The reliable React boilerplate that got me started
- **Mapbox** - For those beautiful, interactive maps
- **Recharts** - Clean, customizable charts that tell the data story
- **React Table** - Making data tables sortable and filterable
- **Styled Components** - Keeping the CSS organized and component-scoped
- **Axios** - Handling all the API calls smoothly

### Hosting & Deployment
- **Vercel** - Super easy deployment with great performance

### Data Source
- **COVID-19 API** - Pulling from corona.lmao-xd.wtf for global statistics

## Getting Started

### Prerequisites
You'll need Node.js and npm installed on your machine.

### Installation

1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   This will open http://localhost:3000 in your browser.

### Building for Production

```bash
npm run build
```

This creates an optimized build in the `build` folder, ready for deployment.

### Running Tests

```bash
npm test
```

Launches the test runner in interactive watch mode.

## Database Setup (MongoDB Atlas)

### Setup Steps

1. **Create MongoDB Atlas Account**: Sign up at mongodb.com and create a free cluster
2. **Get Connection String**: Copy your connection URI from the Atlas dashboard
3. **Environment Variables**: Create a `.env.local` file (copy from `.env.local.example`):
   ```
   MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/covidmap?retryWrites=true&w=majority
   ```

### Seeding the Database

Once your database is connected:

```bash
npm run seed-db
```

This script migrates all the mock data from `mockData.json` into your MongoDB collections.

### Database Schema

The app stores data in these collections:
- **countrylatests**: Current stats by country
- **allhistories**: Global timeline data
- **jhucsses**: Provincial/state data (including US states)
- **allsummarys**: World totals
- **indialatests/indiahistories**: India-specific data
- **vietnamlatests/vietnamhistories**: Vietnam-specific data

### Vercel Deployment

For production deployment:

1. Connect your Vercel account to MongoDB Atlas
2. Add the `MONGODB_URI` environment variable in Vercel dashboard
3. Deploy - the API routes will automatically connect to your database

## How It Works

The app fetches data from the COVID-19 API and stores it in MongoDB. The frontend then queries this data to power the maps, charts, and tables. It's all about making global health data accessible and understandable.

## License

This project is open source - feel free to use it as inspiration for your own projects.
Built with during the COVID-19 pandemic to help people stay informed.
