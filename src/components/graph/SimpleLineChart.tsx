import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
//import styles from './LineChart.scss';

const style = {
  fontFamily: 'Poppins',
  fontSize: '0.875rem',
  fontWeight: 400,
  color: '#575962',
};

type Props = {
  title?: string,
  yAxisTitle?: string,
  xAxisTitle?: string,
  categories?: string[],
  data: Object[],
  gridLineWidth?: number,
  yLabelFormatter?: (value: number) => number,
  legendSpace?: number,
  yAxisMaxValue?: number,
  xAxisTickInterval?: number,
  yAxisTickInterval?: number,
  events?: Object,
  enableLegends?: boolean,
  onSelectedPoints?: Function,
  onSelectionbyText?: boolean,
  onSelectedLegends?: Function,
  showPlotLine?: boolean,
  plotLineValue?: number,
  customTooltip?: string,
  xAxisLabelAlignment?: string,
};

export default function SimpleLineChart(props: Props) {
  const {
    title,
    xAxisTitle,
    yAxisTitle,
    data,
    gridLineWidth,
    categories,
    yLabelFormatter,
    legendSpace,
    yAxisMaxValue,
    xAxisTickInterval,
    yAxisTickInterval,
    events,
    enableLegends,
    onSelectedPoints,
    onSelectionbyText,
    onSelectedLegends,
    showPlotLine,
    plotLineValue,
    customTooltip,
    xAxisLabelAlignment,

  } = props;



  const xAxisCategories = categories
    ? categories
    : data && data.map((item) => (`${new Date(item.Date).getMonth()}/${new Date(item.Date).getFullYear()}`));

  const options = {
    series: [{
      name: 'seriesName',
      data: data.map((item, index) => ({
        //name: item.Date,
        y: Number(item.Deaths),
        color: '#FAA11E',
        dataLabels: {
          enabled: false,
        },
        // marker: {
        //   symbol: 'circle',
        // },
        allowPointSelect: true,
      }))
    }],
    title: {
      text: title,
    },
    chart: {
      style,
      // spacingTop: legendSpace,

      zoomType: onSelectedPoints ? 'x' : undefined, //todo, open zoomType for 'y' if future charts need
      marginRight: 40,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      formatter: function (tooltip) {
        if (customTooltip) {
          let tooltipString = customTooltip;
          tooltipString = tooltipString.replace("{0}", this.x).replace("{1}", this.color).replace("{2}", this.y);
          return tooltipString;
        }
        // If not custom tooltip, use the default formatter
        return tooltipFormatter ? tooltipFormatter(this) : tooltip.defaultFormatter.call(this, tooltip);
      }
    },
    xAxis: {
      categories: xAxisCategories,
      gridLineWidth,
      enabled: !!xAxisTitle,
      title: {
        text: xAxisTitle,
      },
      labels: {
        style,
        align: xAxisLabelAlignment,
        useHTML: true,
        /*formatter: function (label) {
          let dateValues = label.value.split('/');
          return GraphMonths[parseInt(dateValues[0]) - 1] + "</br>" + dateValues[1];
        }*/
      },
      tickmarkPlacement: 'on',
      // max: categories.length - 1.5,
      tickInterval: xAxisTickInterval ? Number(xAxisTickInterval) : xAxisTickInterval,
    },
    yAxis: {
      tickInterval: yAxisTickInterval,
      max: yAxisMaxValue,
      enabled: !!yAxisTitle,
      title: {
        text: yAxisTitle,
      },
      plotLines: showPlotLine ? [{
        color: '#000000',
        width: 2,
        value: plotLineValue,
        dashStyle: 'dash'
      }] : '',
      labels: {
        style,
        formatter(): number {
          return yLabelFormatter
            ? yLabelFormatter(this.value)
            : this.value;
        },
      },
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      borderWidth: 0,
      alignColumns: false,
      floating: true,
      itemStyle: style,
      y: -legendSpace,
      enabled: enableLegends,

    },
    plotOptions: {
      series: {
        color: '#000000',
        cursor: 'pointer',

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

SimpleLineChart.defaultProps = {
  gridLineWidth: 1,
  yLabelFormatter: undefined,
  legendSpace: 80,
  enableLegends: true,
  onSelectedLegends: undefined,
  showPlotLine: false,
  xAxisLabelAlignment: 'left',
  onSelectionbyText: false,
  enableSelection: false
};
