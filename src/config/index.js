const config = {
  jhucsse: {
    url: process.env.NODE_ENV === 'production'
      ? '/api/mock-data/jhucsse'
      : '/mockData.json',
    key: 'jhucsse'
  },
  indiaLatest: {
    url: process.env.NODE_ENV === 'production'
      ? '/api/mock-data/indiaLatest'
      : '/mockData.json',
    key: 'indiaLatest'
  },
  indiaHistory: {
    url: process.env.NODE_ENV === 'production'
      ? '/api/mock-data/indiaHistory'
      : '/mockData.json',
    key: 'indiaHistory'
  },
  vietnamLatest: {
    url: process.env.NODE_ENV === 'production'
      ? '/api/mock-data/vietnamLatest'
      : '/mockData.json',
    key: 'vietnamLatest'
  },
  vietnamHistory: {
    url: process.env.NODE_ENV === 'production'
      ? '/api/mock-data/vietnamHistory'
      : '/mockData.json',
    key: 'vietnamHistory'
  },
  countriesLatest: {
    url: process.env.NODE_ENV === 'production'
      ? '/api/mock-data/countriesLatest'
      : '/mockData.json',
    key: 'countriesLatest'
  },
  allSummary: {
    url: process.env.NODE_ENV === 'production'
      ? '/api/mock-data/allSummary'
      : '/mockData.json',
    key: 'allSummary'
  },
  allHistory: {
    url: process.env.NODE_ENV === 'production'
      ? '/api/mock-data/allHistory'
      : '/mockData.json',
    key: 'allHistory'
  },
};

export default config;
