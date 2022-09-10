/** @jsxImportSource @emotion/react */
import React, { useMemo } from 'react';
import {
  Button,
  Grid, Paper, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Article, Update } from '@mui/icons-material';
import Layout from '../components/layouts/Layout';
import {
  getAuthor, getRuffleVersion, getVersionName, goToExtLink,
} from '../utils/helper';
import { paperBase } from '../utils/styles';

const About = () => {
  const [t] = useTranslation(['common', 'notice', 'menu']);
  const ruffleVersion = useMemo(() => getRuffleVersion(), []);
  const author = useMemo(() => getAuthor(), []);

  return (
    <Layout
      title={t('about-title')}
      withBackButton
    >
      <Grid item xs={12}>
        <Paper css={paperBase}>
          <img draggable="false" alt="logo" src={`${process.env.PUBLIC_URL}/images/flaru-logo.webp`} />
          <Typography component="p" variant="body1">
            Flaru
            {' '}
            {getVersionName()}
            {' '}
            By
            {' '}
            {author}
            ,
            Flash Emulator Based on Ruffle (Nightly
            {' '}
            {ruffleVersion}
            )
          </Typography>
          <Typography component="p" variant="body1">
            <Button
              startIcon={<Article />}
              onClick={(ev) => goToExtLink(ev, 'https://github.com/ruffle-rs/ruffle/blob/master/LICENSE.md')}
            >
              Ruffle LICENSE
            </Button>
            <Button
              startIcon={<Update />}
              onClick={(ev) => goToExtLink(ev, 'https://github.com/jooy2/flaru/releases')}
            >
              {t('menu:update-check')}
            </Button>
          </Typography>
        </Paper>
      </Grid>
    </Layout>
  );
};

export default About;