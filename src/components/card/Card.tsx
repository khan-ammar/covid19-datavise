import React from 'react';
import styles from './Card.module';
import cn from 'classnames';

type Props = {
  children: React.ReactNode,
  className?: any,
  fullHeight?: boolean,
};

export default function Card(props: Props) {
  const { children, className, fullHeight } = props;

  return (
    <div
      className={cn(className, styles.root, {
        [styles.fullHeight]: fullHeight,
      })}
    >
      {children}
    </div>
  );
}
