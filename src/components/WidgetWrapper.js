import React, { Fragment, useState, useEffect, lazy } from 'react';
import axios from 'axios';

import config from '../config';

const CoronaMap = lazy(() => import('./CoronaMap'));

const SidePanel = lazy(() => import('./SidePanel'));

const WidgetWrapper = () => {
  const { vietnamLatest, countriesLatest, allSummary } = config;
  const [data, setData] = useState({});
  const [summary, setSummary] = useState({
    confirmed: 0,
    dead: 0,
    recovered: 0,
  });
  const [tableData, setTableData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [worldMap] = useState(true);

  //console.log(`data widget wrapper: ${data}`);
  useEffect(() => {
    if (!worldMap) {
      const fetchData = async () => {
        try {
          const {
            data: responseLatest,
            status: statusLatest,
          } = await axios.get(vietnamLatest);
          if (statusLatest === 200) {
            console.log(responseLatest);

            setSummary({
              confirmed: responseLatest.infected,
              dead: responseLatest.deceased,
              recovered: responseLatest.recovered,
            });
          }
        } catch (e) {
          if (e.response) {
            setErrorMessage(e.response.data.message);
          }
        }
      };
      fetchData();
    } else {
      const fetchData = async () => {
        try {
          const {
            data: responseLatest,
            status: statusLatest,
          } = await axios.get(countriesLatest);
          if (statusLatest === 200) {
            //const response = responseLatest.data;
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
          }

          const {
            data: responseAllSummary,
            status: statusHistory,
          } = await axios.get(allSummary);
          if (statusHistory === 200) {
            setSummary({
              confirmed: responseAllSummary.cases,
              dead: responseAllSummary.deaths,
              recovered: responseAllSummary.recovered,
            });
          }
        } catch (e) {
          if (e.response) {
            setErrorMessage(e.response.data.message);
          }
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
