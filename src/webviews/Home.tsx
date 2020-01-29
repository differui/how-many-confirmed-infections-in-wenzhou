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
import { StatisticsContext } from '../providers/Statistics';
import { NewsInList } from '../components/NewsInList';
import { EventInList } from '../components/EventInList';

export function Home() {
  const { t } = useTranslation();
  const HomeUI = styled.div(() => {
    return {};
  });

  const news = getNews();
  const { latest, timeline } = useContext(StatisticsContext);
  const { confirmed, cured, dead, suspected, createTime, modifyTime } = latest;

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
        />
        <Box display="flex" justifyContent="space-between">
          <Counter
            size="md"
            value="?"
            title={t('counter_title_suspected')}
            unit={t('counter_unit')}
          />
          <Counter
            size="md"
            value={cured}
            title={t('counter_title_cured')}
            unit={t('counter_unit')}
          />
          <Counter
            size="md"
            value={dead}
            title={t('counter_title_dead')}
            unit={t('counter_unit')}
          />
        </Box>
        <Headline>{t('review_title')}</Headline>
        {timeline.map(event => (
          <EventInList
            key={event.updateTime}
            date={event.updateTime}
            value={event.confirmed}
            unit={t('counter_unit')}
          ></EventInList>
        ))}
        <Headline>{t('news_title')}</Headline>
        {news.map(item => (
          <NewsInList key={item.url} {...item}></NewsInList>
        ))}
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
