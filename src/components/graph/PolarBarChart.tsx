import React, { useMemo, useCallback } from 'react';
import Highcharts from 'highcharts/highstock';
import sortBy from 'lodash/sortBy';
import maxBy from 'lodash/maxBy';
import HighchartsReact from 'highcharts-react-official';
import more from 'highcharts/highcharts-more';
more(Highcharts);

const style = {
  fontFamily: 'Poppins',
  fontSize: '0.875rem',
  fontWeight: 400,
  color: '#575962',
};

type Props = {
  title?: string,
  xAxisTitle?: string,
  data: Object[],
  sort?: boolean,
  height?: number,
  xAxisTickAmount?: number,
  xAxisFormatter?: (value: number) => number,
  maxItems: number,
  tooltipFormatter?: Function,
  events?: Function,
  enableSelection?: boolean,
  onSelectedPoints?: Function,
  inverted?: boolean
};

/*function normalizeData(data, sort?: boolean) {
  const normalizedData = data
    .map((row) => ({
      ...row,
      value: Number(row.value),
    }));

  return sort
    ? sortBy(normalizedData, (row) => row.value).reverse()
    : normalizeData;
}*/

export default function PolarBarChart(props: Props) {
  const {
    title,
    xAxisTitle,
    data,
    sort,
    height,
    xAxisFormatter,
    xAxisTickAmount,
    maxItems,
    tooltipFormatter,
    events,
    enableSelection,
    onSelectedPoints,
    inverted,
    yMin,
    yMax
  } = props;


  function handleSelectByClick(event) {
    if (!enableSelection || !onSelectedPoints || xAxisTitle === undefined) {
      return;
    }

    onSelectedPoints({
      [xAxisTitle]: [{
        val: event.point.name,
        data: event.point.trace
      }],
    });
  }

  const normalizedData = data;//normalizeData(data, sort);

  console.log("Bar chart data is ", normalizedData);

  const options = {
    colors: ['#FFD700', '#C0C0C0', '#CD7F32'],
    chart: {
      type: 'column',
      inverted: true,
      polar: true
    },
    title: {
      text: 'Winter Olympic medals per existing country (TOP 5)'
    },
    tooltip: {
      outside: true
    },
    pane: {
      size: '85%',
      innerSize: '20%',
      endAngle: 270
    },
    credits: {
      enabled: false,

    },
    xAxis: {
      tickInterval: 1,
      labels: {
        align: 'right',
        useHTML: true,
        allowOverlap: true,
        step: 1,
        y: 3,
        style: {
          fontSize: '13px'
        }
      },
      lineWidth: 0,
      categories: [
        'Norway <span class="f16"><span id="flag" class="flag no">' +
        '</span></span>',
        'United States <span class="f16"><span id="flag" class="flag us">' +
        '</span></span>',
        'Germany <span class="f16"><span id="flag" class="flag de">' +
        '</span></span>',
        'Canada <span class="f16"><span id="flag" class="flag ca">' +
        '</span></span>',
        'Austria <span class="f16"><span id="flag" class="flag at">' +
        '</span></span>'
      ]
    },
    yAxis: {
      crosshair: {
        enabled: true,
        color: '#333'
      },
      lineWidth: 0,
      tickInterval: 25,
      reversedStacks: false,
      endOnTick: true,
      showLastLabel: true
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        borderWidth: 0,
        pointPadding: 0,
        groupPadding: 0.15
      }
    },
    series: [{
      name: 'Gold medals',
      data: [132, 105, 92, 73, 64]
    }, {
      name: 'Silver medals',
      data: [125, 110, 86, 64, 81]
    }, {
      name: 'Bronze medals',
      data: [111, 90, 60, 62, 87]
    }]
  };

  console.log(options.series);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
}

PolarBarChart.defaultProps = {
  title: undefined,
  xAxisTitle: undefined,
  sort: false,
  height: undefined,
  xAxisTickAmount: 6,
  maxItems: 7,
  tooltipFormatter: undefined,
  enableSelection: true,
  inverted: false
};


