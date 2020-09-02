import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { Card, CardTitle, CardHeader, CardBody } from '../card';
import Map from '../graph/Map';
import cn from 'classnames';
import styles from './MapCard.module';
import CategoryButtons from '../categoryButtons/CategoryButtons';
import BarChart from '../graph/BarChart';


const mapByTypes = [
  {
    value: 'cases',
    label: 'Cases',
  },
  {
    value: 'deaths',
    label: 'Deaths',
  },
  {
    value: 'recovered',
    label: 'Recovered',
  }
];

export default function MapCard(props) {
  const { data, max, mapBy, onMapBy } = props;
  const [selected, setSelected] = useState([]);

  function onSelect(event) {
    setSelected(selected.concat(event.name));
  }

  function onUnSelect(event) {
    setSelected(event.name);
  }

  return (
    <Card fullHeight>
      <CardHeader>
        <CardTitle>Map View</CardTitle>
      </CardHeader>
      <CardBody size="lg">
        <Row >
          <CategoryButtons category={mapBy} onSelect={onMapBy} allButton={false} />
        </Row>

        <Row className={cn(styles.container, styles.map)}>
          <Map
            data={data.Countries.map((item) => ({
              code: item.CountryCode,
              name: item.Country,
              value: mapBy === 'cases' ? item.TotalConfirmed : (mapBy === 'deaths') ? item.TotalDeaths : item.TotalRecovered,
            }))}
            max={max}
            mapBy={mapBy}
            width={1500}
            height={500}
            onSelect={onSelect}
            onUnselect={onUnSelect}
          />
        </Row>

        <Row className={cn(styles.container, styles.barchart)}>
          <BarChart
            data={data}
            width={1500}
            height={400}
            mapBy={mapBy}
            maxItems={10}
            sort={true} />
        </Row>


      </CardBody>

    </Card>
  );
};