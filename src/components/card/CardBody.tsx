import React from 'react';
import cn from 'classnames';
import styles from './CardBody.module';

type Props = {
  children: React.ReactNode,
  size?: string,
};

export default function CardBody(props: Props) {
  const { children, size } = props;

  return (
    <div
      className={cn(styles.root, {
        [styles.sizeLarge]: size === 'lg',
      })}
    >
      {children}
    </div>
  );
}

CardBody.defaultProps = {
  size: 'md',
};
