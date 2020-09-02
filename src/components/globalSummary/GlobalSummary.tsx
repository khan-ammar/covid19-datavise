import React, { useState, useEffect } from 'react';
import { Col, Row, Button, UncontrolledTooltip } from 'reactstrap';
import { Card, CardTitle, CardHeader, CardBody } from '../card';
import styles from './GlobalSummary.module';
import TitleValue from '../titleValue/TitleValue';
import HalfDonutChart from '../graph/HalfDonutChart';
import StackedBarChart from '../graph/StackedBarChart';
import cn from 'classnames';

type Props = {
  data: Object[];
  lastUpdated: string;
};

const str_subtitle = 'LAST 24 HOURS';

export default function GlobalSummary(props: Props) {
  const { data, lastUpdated } = props;
  const [sameScale, setSameScale] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Row>
            <Col>Global Summary</Col>
            <Col className={styles.lastUpdated}>Last Updated: {lastUpdated}</Col>
          </Row>
        </CardTitle>
      </CardHeader>

      <CardBody>
        <Row>
          <Col>
            <TitleValue title={'Cases'} displayTitle={false} subtitle={str_subtitle} value={data.NewConfirmed} />
            <StackedBarChart title={'CASES'} totalVal={data.TotalConfirmed} newVal={data.NewConfirmed} />
          </Col>

          <Col className={cn(styles.colDivider)}>
            <TitleValue title={'Deaths'} displayTitle={false} subtitle={str_subtitle} value={data.NewDeaths} />
            <StackedBarChart title={'DEATHS'} totalVal={data.TotalDeaths} newVal={data.NewDeaths} maxVal={sameScale === true ? data.TotalConfirmed : data.TotalDeaths} />
          </Col>

          <Col className={cn(styles.colDivider)}>
            <TitleValue title={'Recovered'} displayTitle={false} subtitle={str_subtitle} value={data.NewRecovered} />
            <StackedBarChart title={'RECOVERED'} totalVal={data.TotalRecovered} newVal={data.NewRecovered} maxVal={sameScale === true ? data.TotalConfirmed : data.TotalRecovered} />
          </Col>
        </Row>

        <Row className={styles.root}>
          <Button id={'scale_button'} className={cn(styles.scaleButton)} onClick={() => setSameScale(!sameScale)} active={sameScale}>{sameScale ? 'SAME SCALE' : 'AUTO SCALE'}</Button>
          <UncontrolledTooltip style={{ color: styles.textColorLight, backgroundColor: 'white', fontWeight: 'bold' }} className={styles.tooltip} placement={'bottom'} target={'scale_button'}>{sameScale ? 'Using same scale. Click to switch to auto.' : 'Using auto scale. Click to use the same scale.'}</UncontrolledTooltip>
        </Row>



      </CardBody>
    </Card >
  );
}