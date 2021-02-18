import React from 'react';
import styled, { css } from 'styled-components';

const Styles = styled.div`
  padding: 0.1em 15px;
  display: flex;
  justify-content: center;
  background: rgba(34, 49, 63, 1);
`;

const Button = styled.button`
  background: rgb(63, 59, 59);
  border: 2px solid #7787a5;
  color: #7787a5;
  width: 100%;
  height: 1.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  opacity: 0.5;
  cursor: pointer;
  pointer-events: all;

  /* "down" effect on click */
  &:active {
    transform: translateY(1px);
    filter: saturate(150%);
  }

  /* inverse colors on mouse-over */
  &:hover,
  &:focus {
    color: #7787a5;
    border-color: #7787a5;
    background: rgba(209, 79, 105, 0.2);
    opacity: 1;
  }

  ${(props) =>
    props.isActive &&
    css`
      background: rgba(209, 79, 105, 0.2);
      color: #7787a5;
      opacity: 1;
    `}
`;
const ButtonGroup = styled.div`
  padding: 0.5em 0.25em 0.5em;
  width: 45%;
  border-radius: 4px;

  @media (min-width: 375px) {
    width: 40%;
  }

  @media (min-width: 425px) {
    width: 35%;
  }

  @media (min-width: 768px) {
    width: 33%;
  }

  @media (min-width: 1024px) {
    width: 33%;
  }
`;

const ToggleChartWrapper = ({ chartName, setChartName }) => {
  return (
    <Styles>
      <ButtonGroup>
        <Button
          style={{
            borderBottom: '1px solid #7787a5',
            borderRadius: '32px 0 0 0',
          }}
          onClick={() => setChartName('Total Cases')}
          isActive={chartName === 'Total Cases'}>
          Total Cases
        </Button>
        <Button
          style={{ borderTop: '1px solid #7787a5', borderRadius: '0 0 0 32px' }}
          onClick={() => setChartName('Active Cases')}
          isActive={chartName === 'Active Cases'}>
          Active Cases
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button
          style={{
            borderBottom: '1px solid #7787a5',
            borderRadius: '0 32px 0 0',
          }}
          onClick={() => setChartName('Daily Cases')}
          isActive={chartName === 'Daily Cases'}>
          Daily Cases
        </Button>
        <Button
          style={{ borderTop: '1px solid #7787a5', borderRadius: '0 0 32px 0' }}
          onClick={() => setChartName('Daily Deaths')}
          isActive={chartName === 'Daily Deaths'}>
          Daily Deaths
        </Button>
      </ButtonGroup>
    </Styles>
  );
};

export default ToggleChartWrapper;
