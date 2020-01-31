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
import { WenZhouMap } from '../components/WenZhouMap';
import { isToday } from '../helpers/date';

export function Home() {
  const { t } = useTranslation();
  const HomeUI = styled.div(() => {
    return {};
  });

  const news = getNews();
  const friends = getFriends();
  const {
    server: serverRegions,
    cured: curedRegions,
    new: newRegions,
    confirmed: confirmedRegions,
  } = getLatestRegionStatistics();
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
  const isModifyAtToday = isToday(modifyTime);
  const noDataFallback = t('counter_no_data') as string;

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
          value={isModifyAtToday ? confirmed : noDataFallback}
          title={t('counter_title_confirmed')}
          unit={t('counter_unit')}
        />
        <Box display="flex" justifyContent="space-between">
          <Counter
            size="md"
            value={noDataFallback}
            title={t('counter_title_suspected')}
            unit={t('counter_unit')}
          />
          <Counter
            size="md"
            value={isModifyAtToday ? cured : noDataFallback}
            title={t('counter_title_cured')}
            unit={t('counter_unit')}
          />
          <Counter
            size="md"
            value={isModifyAtToday ? dead : noDataFallback}
            title={t('counter_title_dead')}
            unit={t('counter_unit')}
          />
          {delta > 0 ? (
            <Counter
              size="md"
              value={isModifyAtToday ? delta : noDataFallback}
              title={t('counter_title_new')}
              unit={t('counter_unit')}
            />
          ) : null}
        </Box>

        {confirmedRegions ? (
          <>
            <Headline>{t('counter_title_confirmed')}</Headline>
            <WenZhouMap></WenZhouMap>
          </>
        ) : null}

        {newRegions.length ? (
          <>
            <Headline>{t('counter_title_new')}</Headline>
            {newRegions.map(region => (
              <RegionInList
                key={region.regionName}
                name={region.regionName}
                value={region.newCount!}
                unit={t('counter_unit')}
              ></RegionInList>
            ))}
          </>
        ) : null}

        {curedRegions.length ? (
          <>
            <Headline>{t('counter_title_cured')}</Headline>
            {curedRegions.map(region => (
              <RegionInList
                key={region.regionName}
                name={region.regionName}
                value={region.curedCount!}
                unit={t('counter_unit')}
              ></RegionInList>
            ))}
          </>
        ) : null}

        {serverRegions.length ? (
          <>
            <Headline>{t('counter_title_severe')}</Headline>
            {serverRegions.map(region => (
              <RegionInList
                key={region.regionName}
                name={region.regionName}
                value={region.severeCount!}
                unit={t('counter_unit')}
              ></RegionInList>
            ))}
          </>
        ) : null}

        {timeline.length ? (
          <>
            <Headline>{t('review_title')}</Headline>
            {timeline.map(event => (
              <EventInList
                key={event.updateTime}
                date={event.updateTime}
                value={event.confirmed}
                unit={t('counter_unit')}
              ></EventInList>
            ))}
          </>
        ) : null}

        {news.length ? (
          <>
            {' '}
            <Headline>{t('news_title')}</Headline>
            {news.map(item => (
              <NewsInList key={item.url} {...item}></NewsInList>
            ))}
          </>
        ) : null}

        {friends.length ? (
          <>
            {' '}
            <Headline>{t('friends_title')}</Headline>
            {friends.map(friend => (
              <FirendInList key={friend.url} {...friend}></FirendInList>
            ))}
          </>
        ) : null}

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
