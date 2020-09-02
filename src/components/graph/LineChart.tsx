import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from './graphStyles.module';

const style = {
  fontFamily: 'Poppins',
  fontSize: '1.25rem',
  fontWeight: 'bold',
  color: styles.textColorDark,
};

export default function LineChart(props: Props) {
  const { data, country } = props;

  const options = {
    chart: {
      align: 'center',
      verticalAlign: 'bottom',
      height: 500,
    },
    title: {
      text: country,
      style,

    },

    xAxis: {
      categories: data.map((item) => (`${new Date(item.Date).getDate()}/${new Date(item.Date).getMonth() + 1}/${new Date(item.Date).getFullYear()}`)),
      tickInterval: 30,
      crosshair: true,
    },

    yAxis: {
      title: '',
      crosshair: true,
    },

    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
    },

    credits: {
      enabled: false
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },

      }
    },

    series: [{
      name: 'Cases',
      data: data.map((item) => ({
        y: Number(item.Confirmed),
      })),
      color: styles['textColorDark'],
    },
    {
      name: 'Recovered',
      data: data.map((item) => ({
        y: Number(item.Recovered),
      })),
      color: styles['recoveredColorMax'],

    },
    {
      name: 'Active',
      data: data.map((item) => ({
        y: Number(item.Active),
      })),
      color: styles['casesColorMax'],

    },
    {
      name: 'Deaths',
      data: data.map((item) => ({
        y: Number(item.Deaths),
      })),
      color: styles['deathsColorMax'],
    },
    ],



    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }

  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
}

