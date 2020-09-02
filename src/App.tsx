import React, { useState, useEffect } from 'react';
//import logo from './logo.svg';
import './globalStyles.scss';

import axios from 'axios';
import Summary from './components/summary/Summary';
import MapCard from './components/mapCard/MapCard';
import GlobalSummary from './components/globalSummary/GlobalSummary';
import CountryComparison from './components/countryComparison/CountryComparison';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(fetchOptions,);
        setData(response.data);
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
    }

  }, [data, mapBy]);

  function onSetMapBy(val) {
    console.log('app mein .. ', val, maxValue);

    setMapBy(val);
  }

  return (
    <div className="App">
      {!!data && (
        <GlobalSummary data={data.Global} lastUpdated={data.Countries[0].Date} />
      )}

      {!!data && (
        <MapCard data={data} max={maxValue} mapBy={mapBy} onMapBy={onSetMapBy} />
      )}

      {/*{!!data && (
        <Summary data={data.Global} dataset={data} />
      )}*/}

      {!!data && (
        <CountryComparison data={data.Global} dataset={data} />
      )}
    </div>
  );
}

export default App;
