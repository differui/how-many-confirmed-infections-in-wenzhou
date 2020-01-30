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
import { getLatestRegionStatistics } from '../services/region';
import { RegionInList } from '../components/RegionInList';
import { getFriends } from '../services/firends';
import { FirendInList } from '../components/FriendInList';

export function Home() {
  const { t } = useTranslation();
  const HomeUI = styled.div(() => {
    return {};
  });

  const news = getNews();
  const friends = getFriends();
  const regions = getLatestRegionStatistics();
  const { latest, timeline } = useContext(StatisticsContext);
  const {
    confirmed,
    cured,
    dead,
    delta,
    suspected,
    createTime,
    modifyTime,
  } = latest;

  return (
    <WebView>
      <HomeUI className="page">
        <Title>
          <span>{t('app_title_prefix')}</span>
          <em>{t('app_title_location')}</em>
          <span>{t('app_title_suffix')}</span>
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
          {delta > 0 ? (
            <Counter
              size="md"
              value={delta}
              title={t('counter_title_new')}
              unit={t('counter_unit')}
            />
          ) : null}
        </Box>
        {regions.length ? (
          <>
            {' '}
            <Headline>{t('region_title')}</Headline>
            {regions.map(region => (
              <RegionInList
                key={region.regionName}
                name={region.regionName}
                value={region.confirmedCount}
                unit={t('counter_unit')}
              ></RegionInList>
            ))}
            <RegionInList
              key="total"
              name={t('region_name_summary')}
              value={regions.reduce(
                (total, region) => total + region.confirmedCount,
                0
              )}
              unit={t('counter_unit')}
            ></RegionInList>
          </>
        ) : null}
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
        <Headline>{t('friends_title')}</Headline>
        {friends.map(friend => (
          <FirendInList key={friend.url} {...friend}></FirendInList>
        ))}
        <Footnote>
          {t('footnote_primary', {
            source: `${t('source_name_dxy')} ${t('source_name_wzw')} ${t(
              'source_name_wzfb'
            )}`,
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
