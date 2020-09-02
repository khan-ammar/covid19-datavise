import React, { useMemo, useCallback } from 'react';
import Highcharts from 'highcharts/highstock';
import sortBy from 'lodash/sortBy';
import maxBy from 'lodash/maxBy';
import HighchartsReact from 'highcharts-react-official';
import styles from './graphStyles.module';

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
  inverted?: boolean,
  mapBy?: string,
  width?: number,
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

export default function BarChart(props: Props) {
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
    yMax,
    mapBy,
    width,
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


  const options = {
    series: [{
      color: styles.[`${mapBy.toLowerCase()}ColorMax`],
      name: xAxisTitle,
      data: data.Countries.sort((a, b) => (a.TotalDeaths < b.TotalDeaths) ? 1 : -1)./*filter((it) => (it.TotalDeaths > 5000)).*/map((row, index) => ({
        name: row.Country,
        y: mapBy === 'cases' ? row.TotalConfirmed : (mapBy === 'deaths') ? row.TotalDeaths : row.TotalRecovered,
      })),//{ name: row.Country, y: row.TotalDeaths })),
    }],
    plotOptions: {
      series: {
        turboThreshold: 0,
        cropThreshold: data.Countries.filter((it) => (it.TotalDeaths > 1000)).length,//normalizedData.length,
        cursor: enableSelection ? 'pointer' : undefined,
        events: {
          click: handleSelectByClick
        },
      },
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        /* Here is the setting to limit the maximum column width. */
        maxPointWidth: 50,
        pointWidth: 20,
        minPointLength: 10,
      }
    },
    title: {
      text: title,
    },
    chart: {
      type: 'bar',
      inverted: inverted,
      //style,
      plotBorderWidth: 1,
      width: width,
      //height,
      //zoomType: onSelectedPoints ? 'x' : undefined, //todo, open zoomType for 'y' if future charts need
      // marginLeft,
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      formatter(): number {
        console.log('tooltip is ', this);
        return tooltipFormatter
          ? tooltipFormatter(this)
          : (`${this.key} : ${this.y}`);
      },
      positioner: function (labelWidth, labelHeight, point) {
        if (point.plotX < 200) {
          return {
            x: point.plotX + 200,
            y: point.plotY,
          };
        }

        if (point.plotY > 300) {
          return {
            x: point.plotX,
            y: point.plotY - labelHeight,
          }
        }

        return {
          x: point.plotX,
          y: point.plotY,
        };
      },
    },
    xAxis: {
      type: 'category',
      title: {
        text: '',
      },
      min: 0,
      max: Math.min(maxItems - 1, 180),
      scrollbar: {
        enabled: maxItems - 1 < 180 - 1,
      },
      tickLength: 0,
      labels: {
        style,
        useHTML: true,
        formatter(event): string {
          const { value } = event;
          return `
            <div style="text-align: right;overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width:170px">
              ${value}
            </div>
          `;
        },
        maxStaggerLines: 1,

      },
    },
    yAxis: {
      title: {
        text: xAxisTitle,
      },
      min: yMin,
      max: yMax,
      tickAmount: xAxisTickAmount,
      labels: {
        style,
        formatter(): number {
          return xAxisFormatter
            ? xAxisFormatter(this.value)
            : this.value;
        },
      },
    }
  };

  console.log(options.series);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
}

BarChart.defaultProps = {
  title: undefined,
  xAxisTitle: undefined,
  sort: false,
  height: undefined,
  xAxisTickAmount: 6,
  maxItems: 7,
  tooltipFormatter: undefined,
  enableSelection: true,
  inverted: false,
  mapBy: 'Cases',
};
