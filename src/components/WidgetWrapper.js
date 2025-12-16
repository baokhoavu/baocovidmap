import React, { Fragment, useState, useEffect, lazy } from 'react';

import config from '../config';

const CoronaMap = lazy(() => import('./CoronaMap'));

const SidePanel = lazy(() => import('./SidePanel'));

const WidgetWrapper = () => {
  const vietnamLatest = config.vietnamLatest;
  const countriesLatest = config.countriesLatest;
  const allSummary = config.allSummary;
  const [data, setData] = useState({});
  const [summary, setSummary] = useState({
    confirmed: 0,
    dead: 0,
    recovered: 0,
  });
  const [tableData, setTableData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [worldMap] = useState(true);

  useEffect(() => {
    if (!worldMap) {
      const fetchData = async () => {
        try {
          const mockData = await fetch(vietnamLatest.url).then(r => r.json());
          const responseLatest = mockData[vietnamLatest.key];
          console.log(responseLatest);

          setSummary({
            confirmed: responseLatest.infected,
            dead: responseLatest.deceased,
            recovered: responseLatest.recovered,
          });
        } catch (e) {
          setErrorMessage('Error fetching data');
        }
      };
      fetchData();
    } else {
      const fetchData = async () => {
        try {
          const mockData = await fetch(countriesLatest.url).then(r => r.json());
          const responseLatest = mockData[countriesLatest.key];
          setData(
            responseLatest.map((point, index) => ({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [point.countryInfo.long, point.countryInfo.lat],
              },
              properties: {
                id: index,
                country: point.country,
                province: null,
                confirmed: point.cases,
                dead: point.deaths,
                recovered: point.recovered,
              },
            }))
          );
          setTableData(responseLatest);

          const mockDataSummary = await fetch(allSummary.url).then(r => r.json());
          const responseAllSummary = mockDataSummary[allSummary.key];
          setSummary({
            confirmed: responseAllSummary.cases,
            dead: responseAllSummary.deaths,
            recovered: responseAllSummary.recovered,
          });
        } catch (e) {
          setErrorMessage('Error fetching data');
        }
      };
      fetchData();
    }
  }, [worldMap, vietnamLatest, countriesLatest, allSummary]);

  return (
    <Fragment>
      <CoronaMap data={data} error={errorMessage} />
      {/* <MapFilter worldMap={worldMap} switchMap={switchMap} /> */}
      <SidePanel summary={summary} worldMap={worldMap} tableData={tableData} />
    </Fragment>
  );
};

export default WidgetWrapper;
