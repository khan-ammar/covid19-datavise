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
  legendEnabled?: boolean,
  totalVal: number,
  newVal: number,
};

export default function HalfDonutChart(props: Props) {
  const { title, totalVal, newVal, gridLineWidth, legendEnabled } = props;

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
    },
    title: {
      text: title,
      align: 'center',
      verticalAlign: 'top',
      style: {
        fontSize: '30px',
        color: '#120631',
        fontWeight: 'bold',
      },

    },
    subtitle: {
      text: formatNumber(totalVal),
      align: 'center',
      verticalAlign: 'middle',
      style: {
        fontSize: '30px',
        color: styles[`${title.toLowerCase()}ColorMax`],
        fontWeight: 'bold',
      },
      y: -50,
    },
    tooltip: {
      //pointFormat: '{point.y}',
      formatter: function () {
        let tooltipString = '';
        tooltipString = tooltipString.concat(this.point.name, ': ', formatNumber(this.y));
        return tooltipString;
      },
      headerFormat: '<span style="font-size: 15px">{point.point.name}</span><br/>',

    },
    accessibility: {
      point: {
        valueSuffix: ''
      }
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: false,
          distance: -50,
          style: {
            //fontWeight: 'bold',
            color: '#120631',//'white',
            fontSize: '24px',

          }
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '95%'],
        size: '110%',
      }
    },
    credits: {
      enabled: false,
    },
    series: [{
      type: 'pie',
      name: title,
      innerSize: '50%',
      data: [{
        name: `PREV ${title}`, y: totalVal - newVal, color: styles[`${title.toLowerCase()}ColorMax`],
      },
      {
        name: `NEW ${title}`, y: newVal, color: styles[`${title.toLowerCase()}ColorMin`],
      }
      ],
    }]
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
}

HalfDonutChart.defaultProps = {
  gridLineWidth: 1,
  height: '400px',
  legendEnabled: false,
};

