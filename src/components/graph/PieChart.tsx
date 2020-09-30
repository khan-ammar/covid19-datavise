import React from 'react';
import Highcharts, { OptionsBoostBlendingValue } from 'highcharts';
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
  color: styles.textColorLight,
};

type Props = {
  title?: string,
  yAxisTitle?: string,
  xAxisTitle?: string,
  data: Object,
  gridLineWidth?: number,
  height?: number,
  legendEnabled?: boolean,
  isDonut?: boolean,
};

export default function PieChart(props: Props) {
  const { title, data, gridLineWidth, legendEnabled, isDonut } = props;

  const options = {
    series: [{
      innerSize: isDonut ? '50%' : '0%',
      /*data: Object.keys(data).map((item, index) => ({
        name: item,
        y: Number(data[item]),
        color: PieColors[index],
        dataLabels: {
          enabled: true,
        },
      })),*/
      data: data ? [
        { name: 'Recovered', y: data.TotalRecovered, color: styles['recoveredColorMax'] },
        { name: 'Active', y: data.TotalConfirmed - data.TotalDeaths - data.TotalRecovered, color: styles['casesColorMax'] },
        { name: 'Deaths', y: data.TotalDeaths, color: styles['deathsColorMax'] },
      ] : [],
      /*events: {
        legendItemClick: function() {
          return false;
        }
      },*/
    }],
    title: {

      text: isDonut ? title : '',
      verticalAlign: 'middle',
      y: 0,
      floating: true,
    },
    chart: {
      style,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },

    credits: {
      enabled: false,
    },
    colors: PieColors,

    legend: {
      enabled: legendEnabled,
      labelFormatter: function () {
        return this.name;
      },
      itemHoverStyle: {
        color: null,
        cursor: 'default',
      },


      align: 'center',
      layout: 'horizontal',
      itemStyle: style,
      verticalAlign: 'bottom',
      //reversed: true,
      //itemMarginBottom: 10,
    },
    plotOptions: {
      series: {
        enableMouseTracking: true,
        states: {
          hover: {
            enabled: true,
          },
          inactive: {
            opacity: 1,
          },
        },
      },
      pie: {
        allowPointSelect: true,
        dataLabels: {
          enabled: true,
          connectorWidth: 0,
          format: '{point.percentage:.1f}%',
          distance: -30,
          style: {
            fontSize: 14,
          }
        },
        showInLegend: true,

        point: {
          events: {
            /*legendItemClick: function (e) {
              e.preventDefault();
            },*/
          },
        },
      },
    },
    tooltip: {
      enabled: true,
      //pointFormat: 'Total Spend Amount: $<b>{point.y} M</b> <br/>%age of Total: <b>{point.percentage:.1f}%</b>',
      formatter: function () {
        let tooltipString = '';
        tooltipString = tooltipString.concat(this.point.name, ': ', formatNumber(this.y));
        return tooltipString;
      },
      headerFormat: '<span style="font-size: 15px">{point.point.name}</span><br/>',


    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
}

PieChart.defaultProps = {
  gridLineWidth: 1,
  height: '400px',
  legendEnabled: true,
  isDonut: false,
};
