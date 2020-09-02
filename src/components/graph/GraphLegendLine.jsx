import React from 'react';
import styles from './GraphLegendLine.scss';

type Props = {
  width?: number,
  height?: number,
  color: string,
};

export default function GraphLegendLine(props: Props) {
  const { width, height, color } = props;

  const style = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: color,
  };

  return (
    <div className={styles.root} style={style} />
  );
}

GraphLegendLine.defaultProps = {
  width: 30,
  height: 3,
};