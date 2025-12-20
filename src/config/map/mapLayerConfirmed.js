export const mapLayerConfirmed = {
  id: 'covid19-cases',
  source: 'points', // this should be the id of the source
  type: 'circle',
  // paint properties
  paint: {
    'circle-opacity': 0.4,
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['get', 'confirmed'],
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
    'circle-color': '#32527b',
  },
};
