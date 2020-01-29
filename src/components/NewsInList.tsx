import React from 'react';
import { Box } from '@material-ui/core';
import { Link } from './Link';
import { px2vp } from '../helpers';

export interface NewsInListProps {
  url: string;
  title: string;
  date: number;
}

export function NewsInList(props: NewsInListProps) {
  const { url, title, date } = props;

  return (
    <Box display="flex" alignItems="center" style={{ padding: '0.5em 0' }}>
      <span style={{ paddingRight: px2vp(10) }}>
        {new Date(date).toLocaleDateString()}
      </span>
      <Link href={url}>{title}</Link>
    </Box>
  );
}
