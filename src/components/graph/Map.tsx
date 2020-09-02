import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMap from 'highcharts/modules/map';
import mapDataWorld from '@highcharts/map-collection/custom/world.geo.json';
import styles from './graphStyles.module';
import formatNumber from '../../utils/formatNumber';

HighchartsMap(Highcharts); // Initialize the map module

const style = {
  fontFamily: 'Poppins',
  fontSize: '0.875rem',
  fontWeight: 400,
  color: '#575962',
};

/*type Props = {
  title?: string,
  yAxisTitle?: string,
  xAxisTitle?: string,
  data: {
    key: string,
    value: number,
  }[],
  max?: Number,
  gridLineWidth?: number,
  height?: number,
};*/

type Props = {
  data: Object[],
  max: number,
  mapBy: string,
  width?: number,
  height?: number,
  onSelect?: Function,
  onUnselect?: Function,
};


export default function Map(props: Props) {
  const { data, max, mapBy, width, height, onSelect, onUnselect } = props;

  const mapOptions = {
    chart: {
      map: 'custom/world',
      align: 'center',
      verticalAlign: 'top',
      marginTop: 50,
      width: width,
      height: height,
    },

    title: {
      text: ''
    },

    legend: {
      title: {
        text: '',
        style: {
          color: ( // theme
            Highcharts.defaultOptions &&
            Highcharts.defaultOptions.legend &&
            Highcharts.defaultOptions.legend.title &&
            Highcharts.defaultOptions.legend.title.style &&
            Highcharts.defaultOptions.legend.title.style.color
          ) || 'black'
        }
      }
    },

    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },

    tooltip: {
      backgroundColor: 'none',
      borderWidth: 0,
      shadow: false,
      useHTML: true,
      padding: 0,
      pointFormat: '<span class="f32"><span class="flag {point.properties.hc-key}">' +
        '</span></span><br/>' +
        '<span style="font-size: 18px; font-weight:bold;">{point.name}</span><br/>' +
        `<span style="font-size:20px; color:${styles.hoverTextColor}">{point.value}</span>`,
      //headerFormat: '<span style="font-size: 18px; font-weight:bold;">{point.point.name}</span><br/>',
      /*positioner: function () {
        return { x: width / 2, y: 0 };
      }*/
    },

    credits: {
      enabled: false
    },

    colorAxis: {
      min: 0,
      max: max,
      minColor: styles[`${mapBy.toLowerCase()}ColorMin`],
      maxColor: styles[`${mapBy.toLowerCase()}ColorMax`],
      //type: 'logarithmic'
    },

    series: [{
      data: data,
      mapData: mapDataWorld,
      allowPointSelect: true,
      joinBy: ['iso-a2', 'code'],
      name: '',
      states: {
        hover: {
          color: styles.hoverColor,
        }
      },
      point: {
        events: {
          /*TODO: Add selection functionality
          select: function () {
            onSelect(this);
          },
          unselect: function () {
            onUnSelect(this);
          }*/
        }
      }
    }]

  };

  return (
    <HighchartsReact
      constructorType={'mapChart'}
      highcharts={Highcharts}
      options={mapOptions}
    />
  );


};

Map.defaultProps = {
  height: 400,
  width: 1500,
}



