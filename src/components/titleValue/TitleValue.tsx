import React from 'react';
import cn from 'classnames';
import styles from './TitleValue.module';
import formatNumber from '../../utils/formatNumber';

type Props = {
  title: string,
  subtitle?: string,
  value?: React.ReactNode,
  align?: string,
  displayTitle?: boolean,
};

export default function TitleValue(props: Props) {
  const { title, subtitle, value, align, displayTitle } = props;

  return (
    <div
      className={cn(styles.root, styles[title.toLowerCase()], {
        [styles.alignCenter]: align === 'center',
      })}
    >

      {!!title && displayTitle && (<div className={cn(styles.title)}>
        {title}
      </div>)}

      {!!subtitle && (
        <span className={cn(styles.subTitle)}>{subtitle}</span>
      )}

      <br />

      {!!value && (
        <span className={cn(styles.value, styles[`${title.toLowerCase()}New`])}>
          {formatNumber(value)}
        </span>

      )}

    </div>
  );
}

TitleValue.defaultProps = {
  align: 'center',
  subtitle: undefined,
  value: undefined,
  displayTitle: true,
};