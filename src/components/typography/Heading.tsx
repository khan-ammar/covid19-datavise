import React from 'react';
import styles from './Heading.module';

type Props = {
  children: React.ReactNode,
  type: string,
};

function getTag(type: string): keyof JSX.IntrinsicElements {
  switch (type) {
    case 'h1':
    case 'display1':
      return 'h1';
    case 'h2':
    case 'display2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'h5':
      return 'h5';
    case 'h6':
      return 'h6';
    default:
      throw new Error(`Type ${type} is not supported`);
  }
}

function getClassName(type: string): string {
  if (styles[type]) {
    return styles[type];
  }

  throw new Error(`Type ${type} is not supported`);
}

export default function Heading(props: Props) {
  const { children, type, ...rest } = props;

  const Tag = getTag(type);
  const className = getClassName(type);

  return (
    <Tag className={className} {...rest}>
      {children}
    </Tag>
  );
}

Heading.defaultProps = {
  type: 'h1',
  children: undefined,
};
