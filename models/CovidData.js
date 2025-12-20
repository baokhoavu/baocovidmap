import mongoose from 'mongoose';

const CountryLatestSchema = new mongoose.Schema({
  updated: Number,
  country: String,
  countryInfo: {
    id: Number,
    iso2: String,
    iso3: String,
    lat: Number,
    long: Number,
    flag: String,
  },
  cases: Number,
  todayCases: Number,
  deaths: Number,
  todayDeaths: Number,
  recovered: Number,
  todayRecovered: Number,
  active: Number,
  critical: Number,
  casesPerOneMillion: Number,
  deathsPerOneMillion: Number,
  tests: Number,
  testsPerOneMillion: Number,
  population: Number,
  continent: String,
  oneCasePerPeople: Number,
  oneDeathPerPeople: Number,
  oneTestPerPeople: Number,
  activePerOneMillion: Number,
  recoveredPerOneMillion: Number,
  criticalPerOneMillion: Number,
});

const AllSummarySchema = new mongoose.Schema({
  updated: Number,
  cases: Number,
  todayCases: Number,
  deaths: Number,
  todayDeaths: Number,
  recovered: Number,
  todayRecovered: Number,
  active: Number,
  critical: Number,
  casesPerOneMillion: Number,
  deathsPerOneMillion: Number,
  tests: Number,
  testsPerOneMillion: Number,
  population: Number,
  oneCasePerPeople: Number,
  oneDeathPerPeople: Number,
  oneTestPerPeople: Number,
  activePerOneMillion: Number,
  recoveredPerOneMillion: Number,
  criticalPerOneMillion: Number,
  affectedCountries: Number,
});

const JHUSCSSESchema = new mongoose.Schema({
  country: String,
  province: String,
  updatedAt: String,
  stats: {
    confirmed: Number,
    deaths: Number,
    recovered: Number,
  },
  coordinates: {
    latitude: String,
    longitude: String,
  },
});

const AllHistorySchema = new mongoose.Schema({
  cases: mongoose.Schema.Types.Mixed,
  deaths: mongoose.Schema.Types.Mixed,
  recovered: mongoose.Schema.Types.Mixed,
});

const IndiaLatestSchema = new mongoose.Schema({
  success: Boolean,
  data: {
    summary: {
      total: Number,
      confirmedCasesIndian: Number,
      confirmedCasesForeign: Number,
      discharged: Number,
      deaths: Number,
      confirmedButLocationUnidentified: Number,
    },
    'unofficial-summary': [mongoose.Schema.Types.Mixed],
    regional: [{
      loc: String,
      confirmedCasesIndian: Number,
      confirmedCasesForeign: Number,
      discharged: Number,
      deaths: Number,
      totalConfirmed: Number,
    }],
  },
  lastRefreshed: String,
  lastOriginUpdate: String,
});

const IndiaHistorySchema = new mongoose.Schema({
  day: String,
  summary: {
    total: Number,
    confirmedCasesIndian: Number,
    confirmedCasesForeign: Number,
    discharged: Number,
    deaths: Number,
    confirmedButLocationUnidentified: Number,
  },
  regional: [{
    loc: String,
    confirmedCasesIndian: Number,
    confirmedCasesForeign: Number,
    discharged: Number,
    deaths: Number,
    totalConfirmed: Number,
  }],
});

const VietnamLatestSchema = new mongoose.Schema({
  infected: Number,
  deceased: Number,
  recovered: Number,
  lastUpdatedAtApify: String,
});

const VietnamHistorySchema = new mongoose.Schema({
  infected: Number,
  deceased: Number,
  recovered: Number,
  date: String,
});

// Check if models already exist to prevent re-compilation errors
export const CountryLatest = mongoose.models.CountryLatest || mongoose.model('CountryLatest', CountryLatestSchema);
export const AllSummary = mongoose.models.AllSummary || mongoose.model('AllSummary', AllSummarySchema);
export const JHUCSSE = mongoose.models.JHUCSSE || mongoose.model('JHUCSSE', JHUSCSSESchema);
export const AllHistory = mongoose.models.AllHistory || mongoose.model('AllHistory', AllHistorySchema);
export const IndiaLatest = mongoose.models.IndiaLatest || mongoose.model('IndiaLatest', IndiaLatestSchema);
export const IndiaHistory = mongoose.models.IndiaHistory || mongoose.model('IndiaHistory', IndiaHistorySchema);
export const VietnamLatest = mongoose.models.VietnamLatest || mongoose.model('VietnamLatest', VietnamLatestSchema);
export const VietnamHistory = mongoose.models.VietnamHistory || mongoose.model('VietnamHistory', VietnamHistorySchema);