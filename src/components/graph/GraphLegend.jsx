import React from 'react';
//import Selectable from '../selectable/Selectable';
import GraphLegendItem from './GraphLegendItem';
import styles from './GraphLegend.scss';

type Props = {
  series: Object[],
  onSelect?: (value: string[]) => void,
  onHover?: (value?: string[]) => void,
};

export default function GraphLegend(props: Props) {
  const { series, onSelect, onHover } = props;

  console.log(series);

  function handleSelect(name: string) {
    if (onSelect) {
      onSelect([name]);
    }
  }

  function handleSelection(names: string[]) {
    if (onSelect) {
      onSelect(names);
    }
  }

  return (
    <>
    {/*<Selectable
      onSelectionFinish={handleSelection}
    >*/}
      <div className={styles.root}>
        <div className={styles.legend}>
          {Object.keys(series).map(({ name, color }) => (
            <GraphLegendItem
              key={name}
              color={color}
              name={name}
              selectedKey={name}
              onSelect={handleSelect}
              onHover={onHover}
            />
          ))}
        </div>
      </div>
    {/*</Selectable>*/}
    </>
  );
}
