export const mapLayerRecovered = {
  id: 'covid19-recovered',
  source: 'points', // this should be the id of the source
  type: 'circle',
  // paint properties
  paint: {
    'circle-opacity': 0.4,
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['get', 'recovered'],
      0,
      0,
      1,
      8,
      1000,
      12,
      50000,
      16,
      100000,
      20,
      500000,
      28,
      2000000,
      36,
      4000000,
      44,
    ],
    'circle-color': '#2e7d32',
  },
};
