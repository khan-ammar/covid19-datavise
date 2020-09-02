import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from './graphStyles.module';
import formatNumber from '../../utils/formatNumber';

const PieColors = [
  styles.casesColorMax,
  styles.deathsColorMax,
  styles.recoveredColorMax,
];

const style = {
  fontFamily: 'Poppins',
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '#575962',
};

type Props = {
  title?: string,
  yAxisTitle?: string,
  xAxisTitle?: string,
  data?: {
    key: string,
    value: number,
  }[],
  gridLineWidth?: number,
  height?: number,
  maxVal?: number,
  legendEnabled?: boolean,
  totalVal: number,
  newVal: number,
};

export default function StackedBarChart(props: Props) {
  const { title, totalVal, newVal, maxVal, gridLineWidth, legendEnabled, height } = props;

  const options = {
    chart: {
      type: 'bar',
      align: 'center',
      verticalAlign: 'top',
      height: height,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: title,
      align: 'center',
      verticalAlign: 'top',
      style: {
        fontSize: '28px',
        color: styles.textColorDark,
        fontWeight: 'bold',
        backgroundColor: style.textColorLight,
      },

    },
    subtitle: {
      text: formatNumber(totalVal),
      align: 'center',
      verticalAlign: 'middle',
      style: {
        fontSize: '25px',
        color: styles[`${title.toLowerCase()}ColorMax`],
        fontWeight: 'bold',
      },
      y: -40,
    },
    xAxis: {
      categories: [' '],
    },
    yAxis: {
      min: 0,
      title: {
        text: '',
      },
      max: maxVal,
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: [{
      name: `NEW ${title}`,
      data: [newVal],
      color: styles[`${title.toLowerCase()}ColorMax`],
    },
    {
      name: `PREV ${title}`,
      data: [totalVal - newVal],
      color: styles[`${title.toLowerCase()}ColorMin`],
    },
    ],
    tooltip: {
      //pointFormat: '{point.y}',
      formatter: function () {
        let tooltipString = '';
        tooltipString = tooltipString.concat(this.series.name, ': ', formatNumber(this.y));
        return tooltipString;
      },
    },

  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
}

StackedBarChart.defaultProps = {
  gridLineWidth: 1,
  height: '250px',
  legendEnabled: false,
  maxVal: undefined,
};

