import React from 'react';
import styles from './CardTitle.module';

type Props = {
  children: React.ReactNode,
};

export default function CardTitle(props: Props) {
  const { children } = props;

  return (
    <div className={styles.title} >
      {children}
    </div>
  );
}
