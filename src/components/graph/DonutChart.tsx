import React, { useRef } from 'react';
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import GraphLegend from './GraphLegend';
//import styles from './LineChart.scss';

const Colors = [
  '#AABB07',
  '#07BBAA',
];

const style = {
  fontFamily: 'Poppins',
  fontSize: '0.875rem',
  fontWeight: 400,
  color: '#575962',
};

type Props = {
  data: {
    key: string,
    value: number,
  }[],
  title?: string,
  height?: number,
  tooltipFormatter?: Function,
  onSelect?: (values: number[]) => void,
  enableDragSelect?: boolean,
  commodityTitle?: string,
};

export default function DonutChart(props: Props) {
  const { title, data, height, tooltipFormatter, onSelect, commodityTitle, enableDragSelect } = props;

  const highchart = useRef();

  function handleSeriesClick(event) {
    const { point: { name } } = event;
    if (onSelect) {
      onSelect({ name });
    }
  }

  function handleGraphLegendItemClick(event) {
    const chart = highchart.current?.chart;
    let selected = []
    if (chart) {
      chart.series.forEach((item) => {
        item.data.forEach(it => {
          if (event.includes(it.name)) {
            let selectedPoint = { val: it.name, data: it.y }
            selected.push(selectedPoint)
          }
        })
      });
    }

    if (onSelect) {
      onSelect({ [commodityTitle]: [...selected] });
    }
    return false;
  }

  function handleLegendItemClick(event) {
    const { target: { name } } = event;
    if (onSelect) {
      onSelect({ name });
    }
    return false;
  }

  function handleHover(name?: string) {
    const chart = highchart.current?.chart;
    console.log(name);
    if (chart) {
      chart.series.forEach((item) => {
        item.data.forEach(it => {
          if (!name) {
            it.setState('');
          } else {
            it.setState(it.name === name ? 'hover' : 'inactive');
          }
        })
      });
      chart.redraw();
    }
  }

  const options = {
    chart: {
      height,
      type: 'pie',
      events: {
        render: function () {
          var titlePos = this.seriesGroup.getBBox();
          this.title.attr({ x: titlePos.width / 2 + titlePos.x });
        }
      },
    },
    title: {
      enabled: !!title,
      text: title,
      align: 'center',
      verticalAlign: 'middle',
      style: {
        fontSize: '2rem',
        fontWeight: 'bold',
      },
    },

    legend: {
      labelFormatter: function () {
        return this.name;
      },
      enabled: enableDragSelect ? false : true,
      align: 'right',
      layout: 'vertical',
      itemStyle: style,
      verticalAlign: enableDragSelect ? 'top' : 'middle',
      symbolHeight: 5,
      symbolWidth: 40,
      symbolRadius: 0,
      squareSymbol: false,
      symbolPadding: 10,
      width: 200,
      itemWidth: 200,
      /*
      alignColumns: false,
      floating: true,
      y: -80,
      */
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      style,
      formatter(): number {

        return tooltipFormatter
          ? tooltipFormatter(this)
          : this.y;
      },
    },
    series: [{
      name: '',
      innerSize: '85%',
      data: Object.keys(data).map((item, index) => ({
        name: item,
        y: Number(data[item]),
        color: Colors[index % Colors.length],
        dataLabels: {
          enabled: false,
        },
      })),
    }],
    plotOptions: {
      pie: {
        allowPointSelect: true,
        showInLegend: true,
        cursor: 'pointer',
        events: {
          click: handleSeriesClick,
        },
        point: {
          events: {
            legendItemClick: handleLegendItemClick,
          },
        },
      },
    },
  };

  return (
    <div>
      {/*<div className={styles.root}>*/}
      {!!data && (
        <div>{/*} className={styles.legend}>*/}
          <GraphLegend
            series={Object.keys(data).map((item, index) => ({
              name: item,
              color: Colors[index % Colors.length],
            }))}
            onSelect={handleGraphLegendItemClick}
            onHover={handleHover}
          />
        </div>
      )}


      <HighchartsReact
        ref={highchart}
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
}

DonutChart.defaultProps = {
  title: undefined,
  height: undefined,
  tooltipFormatter: undefined,
  onSelect: undefined,
  enableDragSelect: false,
  commodityTitle: undefined,
};
