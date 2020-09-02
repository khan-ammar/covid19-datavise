import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { Col, Row } from 'reactstrap';
import { Card, CardBody, CardHeader, CardTitle } from '../card';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import LineChart from '../graph/LineChart';
import PieChart from '../graph/PieChart';
import styles from './CountryComparison.module';

type Props = {
  data: Object[],
  dataset: Object[],
};

const useStyles = makeStyles({
  option: {
    fontSize: 16,
    color: styles.textColorDark,
    //backgroundColor: styles.backgroundColorLight,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
      alignItems: 'center',
    },
  }
});

const countryUrl = 'https://api.covid19api.com/total/dayone/country/';


export default function CountryComparison(props: Props) {
  const { data, dataset } = props;
  const [country, setCountry] = useState('China');
  const [country2, setCountry2] = useState('United States of America');
  const classes = useStyles();
  const [countryData, setCountryData] = useState();
  const [country2Data, setCountry2Data] = useState();

  console.log('comparison ', dataset)

  useEffect(() => {
    console.log('country hai bhai ', country)
    if (country !== '') {
      const fetchOptions = {
        url: countryUrl + country,
        method: 'GET',
      };
      const fetchData = async () => {

        const response = await axios(fetchOptions,);
        setCountryData(response.data);
      }

      fetchData();

    }


  }, [country]);

  useEffect(() => {
    if (country2 !== '') {
      const fetchOptions = {
        url: countryUrl + country2,
        method: 'GET',
      };
      const fetchData2 = async () => {

        const response = await axios(fetchOptions,);

        setCountry2Data(response.data);
      }

      fetchData2();

    }


  }, [country2]);



  function onChangeCountry(val) {
    console.log("Selected", val)
    !!val ? setCountry(val.Country) : setCountry('');
  }

  function onChangeCountry2(val) {
    console.log("Selected", val)
    !!val ? setCountry2(val.Country) : setCountry2('');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparison</CardTitle>

      </CardHeader>
      <CardBody size="lg" >
        <Row>
          <Col>
            <div className={styles.colCentered} >
              <Autocomplete
                id="country-select-demo1"
                style={{ width: 300 }}
                /*classes={{
                  option: classes.option,
                }}*/
                options={dataset.Countries}
                onChange={(event, newValue) => {
                  onChangeCountry(newValue);
                }}

                autoHighlight
                getOptionLabel={(option) => option.Country}
                renderOption={(option) => (
                  <React.Fragment>
                    {option.Country} ({option.CountryCode})
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField

                    {...params}
                    label="Choose a country"
                    variant="outlined"

                    inputProps={{
                      ...params.inputProps,
                      autoComplete: '', // disable autocomplete and autofill
                    }}
                  />
                )}
              />

            </div>

          </Col>

          <Col>
            <div className={styles.colCentered}>
              <Autocomplete

                id="country-select-demo2"
                style={{ width: 300 }}
                options={dataset.Countries}
                onChange={(event, newValue) => {
                  onChangeCountry2(newValue);
                }}

                autoHighlight
                getOptionLabel={(option) => option.Country}
                renderOption={(option) => (
                  <React.Fragment>
                    {option.Country} ({option.CountryCode})
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



            </div>
          </Col>







        </Row>

        <Row>
          <Col>
            <PieChart data={dataset.Countries.find((item) => item.Country === country)} isDonut={false} />
          </Col>
          <Col className={styles.colDivider}>
            <PieChart data={dataset.Countries.find((item) => item.Country === country2)} isDonut={false} />


          </Col>



        </Row>
        <Row>
          <Col>
            {!!country && !!countryData && (
              <LineChart country={country} data={countryData} />

            )}
          </Col>
          <Col className={styles.colDivider}>
            {!!country2 && !!country2Data && (
              <LineChart country={country2} data={country2Data} />

            )}
          </Col>
        </Row>
      </CardBody>

    </Card>
  );

};