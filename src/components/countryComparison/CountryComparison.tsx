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
import DotLoader from "react-spinners/DotLoader";
import { css } from "@emotion/core";

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

const override = css`
  margin: 0 auto;
  display: block;
`;

const countryUrl = 'https://api.covid19api.com/total/dayone/country/';


export default function CountryComparison(props: Props) {
  const { data, dataset } = props;
  const [country1, setCountry1] = useState('India');
  const [country2, setCountry2] = useState('United States of America');
  const classes = useStyles();
  const [country1Data, setCountry1Data] = useState();
  const [country2Data, setCountry2Data] = useState();
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    if (country1 !== '') {
      const fetchOptions = {
        url: countryUrl + country1,
        method: 'GET',
      };
      const fetchData = async () => {

        const response = await axios(fetchOptions,);
        setCountry1Data(response.data);
        setLoading1(false);
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
        setLoading2(false);
      }
      fetchData2();
    }

  }, [country2]);



  function onChangeCountry1(val) {
    if (!!val) {
      setCountry1(val.Country);
    }
  }

  function onChangeCountry2(val) {
    if (!!val) {
      setCountry2(val.Country);
    }
  }

  function getCountry(countries, country) {
    return countries.find((item) => item.Country === country);
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
                value={getCountry(dataset.Countries, country1)}


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
                value={getCountry(dataset.Countries, country2)}

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

        {(
          <div >
            <DotLoader
              css={override}
              size={100}
              color={styles.backgroundColorLight}
              loading={loading1 || loading2}
            />
          </div>

        )}


        <Row>
          <Col>
            {!loading1 && !!country1 && !!country1Data && (
              <PieChart
                data={getCountry(dataset.Countries, country1)}
                isDonut={true}
                title={getCountry(dataset.Countries, country1)['CountryCode']} />
            )}
          </Col>

          <Col className={styles.colDivider}>
            {!loading2 && !!country2 && !!country2Data && (
              <PieChart
                data={getCountry(dataset.Countries, country2)}
                isDonut={true}
                title={getCountry(dataset.Countries, country2)['CountryCode']} />
            )}
          </Col>
        </Row>

        <Row>
          <Col>
            {!loading1 && !!country1 && !!country1Data && (
              <LineChart country={country1} data={country1Data} />

            )}
          </Col>
          <Col className={styles.colDivider}>
            {!loading2 && !!country2 && !!country2Data && (
              <LineChart country={country2} data={country2Data} />

            )}
          </Col>
        </Row>

      </CardBody>
    </Card>
  );
};