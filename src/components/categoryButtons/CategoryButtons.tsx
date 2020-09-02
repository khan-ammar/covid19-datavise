import React from 'react';
import styles from './CategoryButtons.module';
import { Button } from 'reactstrap';
import cn from 'classnames';

type Props = {
  category: string,
  onSelect: Function,
  allButton?: boolean,
};

const mapByTypes = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'cases',
    label: 'Cases',
  },
  {
    value: 'deaths',
    label: 'Deaths',
  },
  {
    value: 'recovered',
    label: 'Recovered',
  }
];


export default function CategoryButtons(props: Props) {

  const { category, onSelect, allButton } = props;
  const categories = allButton ? mapByTypes : mapByTypes.filter(item => item.value !== 'all');

  console.log("category buttons is ", category)

  return (
    <div className={styles.root}>
      {
        categories.map((type) => (
          <Button key={type.value} size="md" className={cn(styles.categoryButton, styles[type.value + 'Button'], category === type.value ? styles[type.value + 'Button-selected'] : '')} onClick={() => onSelect(type.value)}>{type.label}</Button>
        ))
      }

    </div>



  );

}

CategoryButtons.defaultProps = {
  allButton: false,
}

