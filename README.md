## Bao's Covid Tracking Map

[![Powered by Vercel](./powered-by-vercel.svg)](https://vercel.com?utm_source=pulakchakraborty)

Bao Covid Map is a map-based responsive web-application built using Create-React-App to monitor and visualize the spread of the novel Covid19 virus across the world. Data grabbed is represented on graphs using key targets.

## Demo

### [https://baocovidmap.vercel.app/](https://baocovidmap.vercel.app/)

### Features

- Interactive dashboard which provides a latest and historical summary of the confirmed, recovered and deceased cases in the world on a country-level.
- The dashboard also includes area, line and bar charts to visualize the historical data on cumulative and daily basis.
- An interactive map shows the impact of Coronavirus on a geographical level.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Built With

### Tools and Services

- [Create React App](https://github.com/facebook/create-react-app)
- [Mapbox](https://www.mapbox.com/?utm_source=pchakraborty)
- [Axios](https://github.com/axios/axios)
- [Recharts](https://github.com/recharts/recharts)
- [React Table](https://github.com/tannerlinsley/react-table)
- [Styled Components](https://styled-components.com)
- [Vercel](https://vercel.com?utm_source=pulakchakraborty)

### APIs

- [Covid19 REST API for Global data](https://docs.corona.lmao-xd.wtf/version-2)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Database Setup (MongoDB Atlas)

This application uses MongoDB Atlas for data storage instead of static JSON files.

### Prerequisites
- MongoDB Atlas account and cluster
- Vercel account connected to MongoDB Atlas

### Environment Configuration
1. Copy `.env.local.example` to `.env.local`
2. Add your MongoDB Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   ```

### Database Seeding
After setting up your MongoDB connection:

```bash
# Seed the database with mock data
npm run seed-db
```

This will migrate all data from `mockData.json` to your MongoDB Atlas database.

### Vercel Deployment
1. Add `MONGODB_URI` environment variable in Vercel dashboard
2. Deploy your application
3. The API routes will automatically connect to MongoDB

### Data Structure
The database contains the following collections:
- `countrylatests` - Country-level COVID statistics
- `allhistories` - Global historical time-series data
- `jhucsses` - Provincial/state-level data (including 21 US states)
- `allsummarys` - Global summary statistics
- `indialatests`, `indiahistories` - India-specific data
- `vietnamlatests`, `vietnamhistories` - Vietnam-specific data
