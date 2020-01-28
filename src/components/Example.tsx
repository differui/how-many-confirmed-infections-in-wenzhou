import React from 'react';
import styled from 'styled-components';

export interface CounterProps {
  value: number;
}

export function Counter(props: CounterProps) {
  const { value } = props;

  return <p>{value}</p>;
}
