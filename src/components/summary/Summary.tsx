import React, { useState, useEffect } from 'react';
import {
  Container, Col, Row, Button
} from 'reactstrap';

import { Card, CardTitle, CardHeader, CardBody } from '../card';

//import { Card, CardBody, CardTitle } from 'reactstrap';

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';

import styles from './Summary.module';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';



import TitleValue from '../titleValue/TitleValue';
//
import PieChart from '../graph/PieChart';

import BarChart from '../graph/BarChart';
//import DonutChart from '../graph/DonutChart';
import LineChart from '../graph/LineChart';
import SimpleLineChart from '../graph/SimpleLineChart';
import PolarBarChart from '../graph/PolarBarChart';
import SunburstChart from '../graph/SunburstChart';
import HalfDonutChart from '../graph/HalfDonutChart';
import formatNumber from '../../utils/formatNumber';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});


type Props = {
  data: Object[];
  dataset?: Object[];
};

const countryUrl = 'https://api.covid19api.com/total/dayone/country/';






export default function Summary(props: Props) {
  const { data, dataset } = props;
  const [datasetSummary, setDatasetSummary] = useState();
  const [country, setCountry] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  //const classes = useStyles();
  const [popData, setPopData] = useState();
  const [countryData, setCountryData] = useState();



  useEffect(() => {
    console.log('country hai bhai ', country)
    if (country !== '') {
      const fetchOptions = {
        url: countryUrl + country,
        method: 'GET',
      };
      const fetchData = async () => {

        console.log(fetchOptions)

        const response = await axios(fetchOptions,);
        console.log('Got data for country ', response.data);
        console.log(response.data.map(it => console.log(new Date(it.Date).getDate())))

        setCountryData(response.data);
      }

      fetchData();

    }


  }, [country]);





  function onSelectCountry(item) {

    console.log(item);
    //setCountry({ key: item.CountryCode, value: item.Country });



  }

  function onChangeCountry(val) {
    console.log("Selected", val)
    !!val ? setCountry(val.Country) : setCountry('');
  }


  console.log('data is ', data)


  return (
    <Card>
      <CardHeader>
        <CardTitle>Global Summary</CardTitle>

      </CardHeader>

      <CardBody>
        <Row>

          <Col>
            <TitleValue
              align={'center'}
              title={'Cases'}
              value={formatNumber(data.TotalConfirmed)}
              value2={data.NewConfirmed}
            />
          </Col>

          <Col className={styles.colDivider}>
            <TitleValue
              align={'center'}
              title={'Deaths'}
              value={data.TotalDeaths}
              value2={data.NewDeaths}
            />
          </Col>

          <Col className={styles.colDivider}>
            <TitleValue
              align={'center'}
              title={'Recovered'}
              value={data.TotalRecovered}
              value2={data.NewRecovered}
            />
          </Col>
        </Row>

      </CardBody>

      <CardHeader>
        <CardTitle>Global Summary</CardTitle>

      </CardHeader>

      <CardBody>

        <Row>

          <Col>
            <HalfDonutChart title={'CASES'} totalVal={data.TotalConfirmed} newVal={data.NewConfirmed} />
            <TitleValue title={'Cases'} displayTitle={false} value2={data.NewConfirmed} />

          </Col>

          <Col className={styles.colDivider}>
            <HalfDonutChart title={'DEATHS'} totalVal={data.TotalDeaths} newVal={data.NewDeaths} />
            <TitleValue title={'Deaths'} displayTitle={false} value2={data.NewDeaths} />
          </Col>

          <Col className={styles.colDivider}>
            <HalfDonutChart title={'RECOVERED'} totalVal={data.TotalRecovered} newVal={data.NewRecovered} />
            <TitleValue title={'Recovered'} displayTitle={false} value2={data.NewRecovered} />
          </Col>
        </Row>
      </CardBody>

      <CardBody>

        <Row>
          <Col>
            {!!data && (


              <PieChart data={{ 'Active': data.TotalConfirmed, 'Deaths': data.TotalDeaths, 'Recovered': data.TotalRecovered }} legendEnabled={true} />
            )}
          </Col>
          <Col>
            {!!data && (
              //<PieChart data={data} />
              <PolarBarChart data={dataset} maxItems={200} />
            )}
          </Col>
        </Row>

        <Row>
          <SunburstChart data={dataset} />
        </Row>

      </CardBody>

      <CardBody>



        <Row>
          <Col>
            {!!data && (
              <BarChart data={dataset} maxItems={200} />
            )}

          </Col>
        </Row >



        <Row>
          <Col>
            <Autocomplete
              id="country-select-demo"
              style={{ width: 300 }}
              options={dataset.Countries}
              onChange={(event, newValue) => {
                onChangeCountry(newValue);
              }}

              autoHighlight
              getOptionLabel={(option) => option.Country}
              renderOption={(option) => (
                <React.Fragment>
                  {option.Country} ({option.CountryCode}) +{option.NewDeaths}
                </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose a country"
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />

          </Col>
          <Col>
            {!!country && !!countryData && (
              <LineChart data={countryData} />

            )}

          </Col>
        </Row>
        <Row>
          {!!country && !!countryData && (
            <SimpleLineChart data={countryData} />
          )}

        </Row>


      </CardBody >





      {/*<Autocomplete
            id="country-select-demo"
            style={{ width: 300 }}
            options={datasetSummary?.Countries}
            classes={{
              option: classes.option,
            }}
            autoHighlight
            getOptionLabel={(option) => option.Country}
            renderOption={(option) => (
              <React.Fragment>
                {option.Country} ({option.CountryCode}) +{option.NewDeaths}
              </React.Fragment>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a country"
                variant="outlined"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
              />*/}


    </Card >






  );
}