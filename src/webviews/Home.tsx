import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Title } from '../components/Title';
import { WebView } from '../components/WebView';
import { Counter } from '../components/Counter';
import { Box } from '@material-ui/core';
import { Headline } from '../components/Headline';
import { getNews } from '../services/news';
import { Footnote } from '../components/Footnote';
import { IsaaclinContext } from '../providers/isaaclin';
import { NewsInList } from '../components/NewsInList';

export function Home() {
  const { t } = useTranslation();
  const HomeUI = styled.div(() => {
    return {};
  });

  const news = getNews();
  const {
    confirmed,
    cured,
    dead,
    suspected,
    createTime,
    modifyTime,
  } = useContext(IsaaclinContext);

  return (
    <WebView>
      <HomeUI className="page">
        <Title>
          {t('app_title_prefix')} <em>{t('app_title_location')}</em>
          {t('app_title_suffix')}
        </Title>
        <Counter
          size="lg"
          value={confirmed}
          title={t('counter_title_confirmed')}
          unit={t('counter_unit')}
        ></Counter>
        <Box display="flex" justifyContent="space-between">
          <Counter
            size="md"
            value={suspected}
            title={t('counter_title_suspected')}
            unit={t('counter_unit')}
          ></Counter>
          <Counter
            size="md"
            value={cured}
            title={t('counter_title_cured')}
            unit={t('counter_unit')}
          ></Counter>
          <Counter
            size="md"
            value={dead}
            title={t('counter_title_dead')}
            unit={t('counter_unit')}
          ></Counter>
        </Box>
        <Headline>{t('news_title')}</Headline>
        {news.map(item => (
          <NewsInList key={item.url} {...item}></NewsInList>
        ))}
        <Box flex={1}></Box>
        <Footnote>
          {t('footnote_primary', {
            source: t('source_name'),
          })}
          &nbsp;
          {t('footnote_secondary', {
            created: new Date(createTime).toLocaleString(),
            updated: new Date(modifyTime).toLocaleString(),
          })}
        </Footnote>
      </HomeUI>
    </WebView>
  );
}
