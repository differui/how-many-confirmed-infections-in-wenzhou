import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Title } from '../components/Title';
import { WebView } from '../components/WebView';
import { Counter } from '../components/Counter';
import { Box } from '@material-ui/core';
import { Link } from '../components/Link';
import { Headline } from '../components/Headline';
import { getNews } from '../services/news';
import { px2vp } from '../helpers';
import { Footnote } from '../components/Footnote';
import { DXYContext } from '../providers/dxy';

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
  } = useContext(DXYContext);

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
          title={t('counter_unit')}
        ></Counter>
        <Box display="flex" justifyContent="space-between">
          <Counter
            size="md"
            value={suspected}
            title={t('counter_title_suspected')}
          ></Counter>
          <Counter
            size="md"
            value={cured}
            title={t('counter_title_cured')}
          ></Counter>
          <Counter
            size="md"
            value={dead}
            title={t('counter_title_dead')}
          ></Counter>
        </Box>
        <Headline>{t('news_title')}</Headline>
        {news.map(({ url, title, date }) => (
          <Box display="flex" alignItems="center" key={url}>
            <span style={{ paddingRight: px2vp(10) }}>
              {new Date(date).toLocaleDateString()}
            </span>
            <Link href={url}>{title}</Link>
          </Box>
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
