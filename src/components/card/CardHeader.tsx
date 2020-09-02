import React from 'react';
import Media from 'reactstrap/lib/Media';
import styles from './CardHeader.module';

type Props = {
  children?: React.ReactNode,
  actions?: React.ReactNode,
};

export default function CardHeader(props: Props) {
  const { children, actions } = props;

  return (
    <div className={styles.root}>
      <Media>
        <Media body>
          {children}
        </Media>
        <Media right>
          {actions}
        </Media>
      </Media>
    </div>
  );
}

CardHeader.defaultProps = {
  children: undefined,
  actions: undefined,
};
