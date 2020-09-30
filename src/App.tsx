import React, { useState, useEffect } from 'react';
import './globalStyles.scss';
import axios from 'axios';
import MapCard from './components/mapCard/MapCard';
import GlobalSummary from './components/globalSummary/GlobalSummary';
import CountryComparison from './components/countryComparison/CountryComparison';
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
`;

const fetchOptions = {
  url: 'https://api.covid19api.com/summary',
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  },
};


function App() {
  const [data, setData] = useState();
  const [mapBy, setMapBy] = useState('cases');
  const [maxValue, setMaxValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(fetchOptions,);
        setData(response.data);
        setLoading(false);
      } catch (e) {
        console.log(`axios request failed: ${e}`);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!!data) {
      let maxVal = Math.max.apply(Math, data.Countries.map((item) => {
        return mapBy === 'cases' ? item.TotalConfirmed : (mapBy === 'deaths') ? item.TotalDeaths : item.TotalRecovered;
      }));

      setMaxValue(maxVal);
      setLoading(false);
    }

  }, [data, mapBy]);

  function onSetMapBy(val) {
    setMapBy(val);
    setLoading(true);
  }

  return (
    <div className="App">
      {!!loading && (
        <div className="Loading">
          <GridLoader
            css={override}
            size={15}
            color={"#123abc"}
            loading={loading}
          />
        </div>
      )}

      {!!data && !loading && (
        <>
          <GlobalSummary data={data.Global} lastUpdated={data.Countries[0].Date} />

          <CountryComparison data={data.Global} dataset={data} />

          <MapCard data={data} max={maxValue} mapBy={mapBy} onMapBy={onSetMapBy} />
        </>
      )}
    </div>
  );
}

export default App;
