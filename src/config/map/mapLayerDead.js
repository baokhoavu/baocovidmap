export const mapLayerDead = {
  id: 'covid19-dead',
  source: 'points', // this should be the id of the source
  type: 'circle',
  // paint properties
  paint: {
    'circle-opacity': 0.5,
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['get', 'dead'],
      0,
      0,
      1,
      6,
      100,
      8,
      1000,
      10,
      4000,
      12,
      8000,
      16,
      12000,
      20,
      100000,
      32,
      200000,
      40,
    ],
    'circle-color': '#d32f2f',
  },
};
