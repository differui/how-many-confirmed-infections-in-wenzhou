import React from 'react';
import { WebView } from '../components/WebView';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';

export function Loading() {
  const { t } = useTranslation();
  const LoadingUI = styled.div(() => {
    return {};
  });

  return (
    <WebView>
      <LoadingUI className="page">
        <Box flex={1} display="flex" alignItems="center">
          <p>{t('loading')}</p>
        </Box>
      </LoadingUI>
    </WebView>
  );
}
