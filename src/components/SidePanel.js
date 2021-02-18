import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import CasesHighlights from './CasesHighlights';
//import CasesTable from './CasesTable';
//import CasesChart from './CasesChart';
import config from '../config';
import { TableSettingsWorld } from '../config/TableSettings';
import ToggleChartWrapper from './ToggleChartWrapper';
// import { PlaceholderText } from '../styles/global';
import Spinner from './Spinner';
//import InfectionsChart from './InfectionsChart';
//import MapFilter from './MapFilter';

const CasesTable = lazy(() => import('./CasesTable'));

const CasesChart = lazy(() => import('./CasesChart'));

const ActiveCasesChart = lazy(() => import('./ActiveCasesChart'));

const DailyChart = lazy(() => import('./DailyChart'));

const DailyDeathsChart = lazy(() => import('./DailyDeathsChart'));

const Styles = styled.div`
  position: absolute;
  display: block;
  height: 720px;
  width: 100%;
  background: rgba(34, 49, 63, 1);
  color: #7787a5;
  justify-content: center;

  @media (min-width: 768px) {
    width: 420px;
    right: auto;
    left: 15px;
    position: absolute;
    display: block;
    height: 664px;
    top: 15px;
    border-radius: 0 0 4px 4px;
  }

  @media (min-width: 1024px) {
    width: 420px;
    right: auto;
    left: 15px;
    position: absolute;
    display: block;
    height: 680px;
    top: 15px;
    border-radius: 0 0 4px 4px;
  }
`;

const ChartPlaceHolder = styled.div`
  padding: 1rem;
  width: 100%;
  height: 256px;
  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    height: 220px;
  }

  @media (min-width: 1024px) {
    height: 220px;
  }
`;

// const renderFallbackText = () => (
//   <ChartPlaceHolder>
//     <PlaceholderText>Loading chart...</PlaceholderText>
//   </ChartPlaceHolder>
// );

const renderLoader = () => (
  <ChartPlaceHolder>
    <Spinner />
  </ChartPlaceHolder>
);

const SidePanel = ({ summary, worldMap, tableData }) => {
  const [allHistorical, setAllHistorical] = useState([]);
  const [setErrorMessage] = useState('');
  //   const [newInfectionsChart, setNewInfectionsChart] = useState(false);
  /* Stores any one of the four available charts for rendering purpose */
  const [chartName, setChartName] = useState('Total Cases');

  const { allHistory } = config;

  const tableColumnsWorld = useMemo(() => [{ ...TableSettingsWorld }], []);

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        if (worldMap && allHistorical.length === 0) {
          const {
            data: responseAllHistory,
            status: statusAllHistory,
          } = await axios.get(allHistory);
          if (statusAllHistory === 200) {
            setAllHistorical([
              ...Object.keys(responseAllHistory.cases)
                .slice(1)
                .map((item, index) => ({
                  day: item,
                  confirmed: Object.values(responseAllHistory.cases)[index + 1],
                  dead: Object.values(responseAllHistory.deaths)[index + 1],
                  recovered: Object.values(responseAllHistory.recovered)[
                    index + 1
                  ],
                  active:
                    Object.values(responseAllHistory.cases)[index + 1] -
                    Object.values(responseAllHistory.recovered)[index + 1],
                  newCases:
                    Object.values(responseAllHistory.cases)[index + 1] -
                    Object.values(responseAllHistory.cases)[index],
                  newRecoveries:
                    Object.values(responseAllHistory.recovered)[index + 1] -
                    Object.values(responseAllHistory.recovered)[index],
                  newDeaths:
                    Object.values(responseAllHistory.deaths)[index + 1] -
                    Object.values(responseAllHistory.deaths)[index],
                })),
            ]);
          }
        }
      } catch (e) {
        if (e.response) {
          setErrorMessage(e.response.data.message);
        }
      }
    };
    fetchLatestData();
  }, [worldMap, allHistorical.length, allHistory, setErrorMessage]);

  return (
    <Styles>
      <CasesHighlights summary={summary} worldMap={worldMap} />
      <ToggleChartWrapper chartName={chartName} setChartName={setChartName} />
      <Suspense fallback={renderLoader()}>
        {worldMap && chartName === 'Daily Cases' && (
          <DailyChart chartData={allHistorical} />
        )}
        {worldMap && chartName === 'Daily Deaths' && (
          <DailyDeathsChart chartData={allHistorical} />
        )}
        {worldMap && chartName === 'Total Cases' && (
          <CasesChart chartData={allHistorical} />
        )}
        {worldMap && chartName === 'Active Cases' && (
          <ActiveCasesChart chartData={allHistorical} />
        )}
      </Suspense>
      <Suspense fallback={renderLoader()}>
        {worldMap && (
          <CasesTable columns={tableColumnsWorld} data={tableData} />
        )}
      </Suspense>
    </Styles>
  );
};

export default SidePanel;
