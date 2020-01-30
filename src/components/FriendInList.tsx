import React from 'react';
import { Box } from '@material-ui/core';
import { Link } from './Link';

export interface FirendInListProps {
  url: string;
  title: string;
}

export function FirendInList(props: FirendInListProps) {
  const { url, title } = props;

  return (
    <Box display="flex" style={{ padding: '0.5em 0' }}>
      <Link href={url}>{title}</Link>
    </Box>
  );
}
