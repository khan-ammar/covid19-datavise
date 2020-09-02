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
  const [country1, setCountry1] = useState('China');
  const [country2, setCountry2] = useState('United States of America');
  const classes = useStyles();
  const [country1Data, setCountry1Data] = useState();
  const [country2Data, setCountry2Data] = useState();

  useEffect(() => {
    if (country1 !== '') {
      const fetchOptions = {
        url: countryUrl + country1,
        method: 'GET',
      };
      const fetchData = async () => {

        const response = await axios(fetchOptions,);
        setCountry1Data(response.data);
      }

      fetchData();

    }


  }, [country1]);

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



  function onChangeCountry1(val) {
    !!val ? setCountry1(val.Country) : setCountry1('');
  }

  function onChangeCountry2(val) {
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
                id="country-select-1"
                style={{ width: 300 }}
                /*classes={{
                  option: classes.option,
                }}*/
                options={dataset.Countries}
                onChange={(event, newValue) => {
                  onChangeCountry1(newValue);
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

                id="country-select-2"
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
                      autoComplete: '', // disable autocomplete and autofill
                    }}
                  />
                )}
              />



            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <PieChart data={dataset.Countries.find((item) => item.Country === country1)} isDonut={false} />
          </Col>
          <Col className={styles.colDivider}>
            <PieChart data={dataset.Countries.find((item) => item.Country === country2)} isDonut={false} />
          </Col>
        </Row>

        <Row>
          <Col>
            {!!country1 && !!country1Data && (
              <LineChart country={country1} data={country1Data} />

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