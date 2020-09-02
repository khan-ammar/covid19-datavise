import React from 'react';
import cn from 'classnames';
//import { createSelectable, TSelectableItemProps } from 'react-selectable-fast';
import GraphLegendLine from './GraphLegendLine';
import styles from './GraphLegendItem.scss';

type Props = TSelectableItemProps & {
  color: string,
  name: string,
  onSelect: (value: string) => void,
  onHover?: (value?: string) => void,
};

function GraphLegendItem(props: Props) {
  const {
    color,
    name,
    isSelecting,
    onSelect,
    onHover,
    selectableRef,
  } = props;

  function handleClick() {
    onSelect(name);
  }

  function handleMouseEnter() {
    if (onHover) {
      onHover(name);
    }
  }

  function handleMouseLeave() {
    if (onHover) {
      onHover();
    }
  }

  return (
    <div 
      className={styles.root} 
      onClick={handleClick} ref={selectableRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <GraphLegendLine color={color} />
      <div 
        className={cn(styles.name, {
          [styles.selected]: isSelecting,
        })}
      >
        {name}
      </div>
    </div>
  );
}

GraphLegendItem.defaultProps = {
  onHover: undefined,
};

//export default createSelectable(GraphLegendItem);

export default GraphLegendItem;