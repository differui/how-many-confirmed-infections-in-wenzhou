import React from 'react';
import { WebView } from '../components/WebView';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';

export interface ErrorProps {
  message?: string;
}

export function Error(props: ErrorProps) {
  const { t } = useTranslation();
  const { message } = props;
  const ErrorUI = styled.div(() => {
    return {};
  });

  return (
    <WebView>
      <ErrorUI className="page">
        <Box flex={1} display="flex" alignItems="center">
          <p>{message ?? t('error_default')}</p>
        </Box>
      </ErrorUI>
    </WebView>
  );
}
