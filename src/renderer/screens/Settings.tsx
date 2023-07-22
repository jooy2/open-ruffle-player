/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/react';
import { RootState } from '@/renderer/store';
import Layout from '@/renderer/components/layouts/Layout';
import { marginTopSm } from '@/renderer/utils/styles';
import PanelHeader from '@/renderer/components/views/PanelHeader';
import { setConfig } from '@/renderer/store/slices/appScreenSlice';
import ModalLocalStorageView from '../components/dialogs/ModalLocalStorageView';

const Settings = () => {
  const stateAppScreen = useSelector((state: RootState) => state.appScreen);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation(['common', 'notice', 'menu']);
  const [themeCheck, setThemeCheck] = useState(stateAppScreen.appConfigTheme);
  const [preferredRendererCheck, setPreferredRendererCheck] = useState(
    stateAppScreen.appConfigPreferredRenderer,
  );
  const [qualityCheck, setQualityCheck] = useState(stateAppScreen.appConfigQuality);
  const [language, setLanguage] = useState(stateAppScreen.appConfigLanguage);
  const [hideHeaderChecked, setHideHeaderChecked] = useState(stateAppScreen.appConfigHideHeader);
  const [letterboxChecked, setLetterboxChecked] = useState(stateAppScreen.appConfigLetterbox);
  const [hideContextChecked, setHideContextChecked] = useState(stateAppScreen.appConfigHideContext);
  const [showPlayerControllerChecked, setShowPlayerControllerChecked] = useState(
    stateAppScreen.appConfigShowPlayerController,
  );
  const [showPlayerVersionSelectChecked, setShowPlayerVersionSelectChecked] = useState(
    stateAppScreen.appConfigShowPlayerVersionSelect,
  );
  const [restoreWindowBoundsChecked, setRestoreBoundsChecked] = useState(
    stateAppScreen.appConfigRestoreWindowBounds,
  );
  const [adjustOriginalSizeChecked, setAdjustOriginalSizeChecked] = useState(
    stateAppScreen.appConfigAdjustOriginalSize,
  );
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const handleRadioChange = async (event): Promise<void> => {
    const { value } = event.target;
    switch (event.target.name) {
      case 'themeCheck':
        setThemeCheck(value);
        window.mainApi.send('setAppConfig', { theme: value });
        await dispatch(setConfig({ appConfigTheme: value }));
        if (value === 'auto') {
          await dispatch(setConfig({ isDarkTheme: prefersDarkMode }));
        } else {
          await dispatch(setConfig({ isDarkTheme: value !== 'light' }));
        }
        break;
      case 'preferredRendererCheck':
        setPreferredRendererCheck(value);
        window.mainApi.send('setAppConfig', { preferredRenderer: value });
        await dispatch(setConfig({ appConfigPreferredRenderer: value }));
        break;
      case 'qualityCheck':
        setQualityCheck(value);
        window.mainApi.send('setAppConfig', { quality: value });
        await dispatch(setConfig({ appConfigQuality: value }));
        break;
      default:
        break;
    }
  };

  const handleCheckboxChange = async (event): Promise<void> => {
    const value = event.target.checked;
    switch (event.target.name) {
      case 'hideHeaderChecked':
        setHideHeaderChecked(value);
        window.mainApi.send('setAppConfig', { hideHeader: value });
        await dispatch(setConfig({ appConfigHideHeader: value }));
        break;
      case 'letterboxChecked':
        setLetterboxChecked(value);
        window.mainApi.send('setAppConfig', { letterbox: value });
        await dispatch(setConfig({ appConfigLetterbox: value }));
        break;
      case 'hideContextChecked':
        setHideContextChecked(value);
        window.mainApi.send('setAppConfig', { hideContext: value });
        await dispatch(setConfig({ appConfigHideContext: value }));
        break;
      case 'restoreWindowBoundsChecked':
        setRestoreBoundsChecked(value);
        window.mainApi.send('setAppConfig', { restoreWindowBounds: value });
        await dispatch(setConfig({ appConfigRestoreWindowBounds: value }));
        break;
      case 'adjustOriginalSizeChecked':
        setAdjustOriginalSizeChecked(value);
        window.mainApi.send('setAppConfig', { adjustOriginalSize: value });
        await dispatch(setConfig({ appConfigAdjustOriginalSize: value }));
        break;
      case 'showPlayerVersionSelectChecked':
        setShowPlayerVersionSelectChecked(value);
        window.mainApi.send('setAppConfig', { showPlayerVersionSelect: value });
        await dispatch(setConfig({ appConfigShowPlayerVersionSelect: value }));
        break;
      case 'showPlayerControllerChecked':
        setShowPlayerControllerChecked(value);
        window.mainApi.send('setAppConfig', { showPlayerController: value });
        await dispatch(setConfig({ appConfigShowPlayerController: value }));
        break;
      default:
        break;
    }
  };

  const handleSelectChange = async (event): Promise<void> => {
    const { value } = event.target;
    switch (event.target.name) {
      case 'language':
        setLanguage(value);
        window.mainApi.send('setAppConfig', { language: value });
        await dispatch(setConfig({ appConfigLanguage: value }));
        await i18n.changeLanguage(value);
        break;
      default:
        break;
    }
  };

  const handleReset = (ev): void => {
    ev.preventDefault();
    window.mainApi.send('resetAppConfig');
  };

  const handleOpenLocalStorageViewModal = async (): Promise<void> => {
    await dispatch(setConfig({ dialogLocalStorageViewOpen: true }));
  };

  return (
    <Layout title={t('menu:settings') as string} withBackButton>
      <Grid
        item
        xs={12}
        css={css`
          max-height: calc(100vh - 68px);
          overflow-y: auto;
          span {
            font-size: 0.95em;
            color: ${stateAppScreen.isDarkTheme ? '#efefef' : '#4f4f4f'};
          }
        `}
      >
        <Paper
          css={css`
            padding: 16px;
          `}
        >
          <Typography component="h2" variant="h4">
            {t('menu:settings')}
          </Typography>
          <Typography component="span">{t('settings-info')}</Typography>
          <Grid
            container
            spacing={3}
            css={css`
              margin-top: 24px;
              h3 {
                font-size: 1.2em;
                font-weight: bold;
              }
              button > span {
                color: #1c1c1c;
              }
              span {
                font-size: 0.75em;
                color: ${stateAppScreen.isDarkTheme ? '#efefef' : '#4f4f4f'};
              }
              .MuiInputBase-fullWidth {
                max-width: 450px;
              }
            `}
          >
            <Grid item xs={12}>
              <PanelHeader
                title={t('settings-language-title')}
                desc={t('settings-language-desc')}
              />
              <Typography component="div">
                <Select
                  size="small"
                  fullWidth
                  value={language}
                  onChange={handleSelectChange}
                  inputProps={{
                    name: 'language',
                    id: 'system-language',
                  }}
                >
                  {['auto', 'ko', 'en', 'es', 'pt', 'de', 'fr', 'ja'].map((value) => (
                    <MenuItem key={value} value={value}>
                      {t(`menu:language-${value}`)}
                    </MenuItem>
                  ))}
                </Select>
              </Typography>
            </Grid>
            <Grid item xs={12} css={marginTopSm}>
              <PanelHeader title={t('settings-title-2')} desc={t('settings-desc-2')} />
              <RadioGroup
                row
                aria-label="theme"
                name="themeCheck"
                value={themeCheck}
                defaultValue="light"
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="auto"
                  control={<Radio size="small" />}
                  label={t('menu:theme-auto')}
                />
                <FormControlLabel
                  value="light"
                  control={<Radio size="small" />}
                  label={t('menu:theme-light')}
                />
                <FormControlLabel
                  value="dark"
                  control={<Radio size="small" />}
                  label={t('menu:theme-dark')}
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} css={marginTopSm}>
              <PanelHeader title={t('settings-title-1')} desc={t('settings-desc-1')} />
              <Grid container>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={showPlayerControllerChecked}
                        onChange={handleCheckboxChange}
                        name="showPlayerControllerChecked"
                      />
                    }
                    label={t('menu:show-player-controller')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={hideHeaderChecked}
                        onChange={handleCheckboxChange}
                        name="hideHeaderChecked"
                      />
                    }
                    label={t('menu:hide-header')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={letterboxChecked}
                        onChange={handleCheckboxChange}
                        name="letterboxChecked"
                      />
                    }
                    label={t('menu:letterbox')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={hideContextChecked}
                        onChange={handleCheckboxChange}
                        name="hideContextChecked"
                      />
                    }
                    label={t('menu:hide-context')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={adjustOriginalSizeChecked}
                        onChange={handleCheckboxChange}
                        name="adjustOriginalSizeChecked"
                      />
                    }
                    label={t('menu:adjust-original-size')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={showPlayerVersionSelectChecked}
                        onChange={handleCheckboxChange}
                        name="showPlayerVersionSelectChecked"
                      />
                    }
                    label={t('menu:show-player-version-select')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={restoreWindowBoundsChecked}
                        onChange={handleCheckboxChange}
                        name="restoreWindowBoundsChecked"
                      />
                    }
                    label={t('menu:restore-bounds')}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} css={marginTopSm}>
              <PanelHeader title={t('settings-title-3')} desc={t('settings-desc-3')} />
              <Grid item xs={12}>
                <RadioGroup
                  aria-label="position"
                  name="preferredRendererCheck"
                  value={preferredRendererCheck}
                  defaultValue="auto"
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="auto"
                    control={<Radio size="small" color="primary" />}
                    label={t('menu:renderer-auto')}
                  />
                  <FormControlLabel
                    value="wgpu-webgl"
                    control={<Radio size="small" color="primary" />}
                    label={t('menu:renderer-wgpu-webgl')}
                  />
                  <FormControlLabel
                    value="webgl"
                    control={<Radio size="small" color="primary" />}
                    label={t('menu:renderer-webgl')}
                  />
                  <FormControlLabel
                    value="canvas"
                    control={<Radio size="small" color="primary" />}
                    label={t('menu:renderer-canvas')}
                  />
                  <FormControlLabel
                    value="webgpu"
                    control={<Radio size="small" color="primary" />}
                    label={t('menu:renderer-webgpu')}
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <Grid item xs={12} css={marginTopSm}>
              <PanelHeader title={t('settings-title-4')} desc={t('settings-desc-4')} />
              <Grid item xs={12}>
                <RadioGroup
                  row
                  aria-label="position"
                  name="qualityCheck"
                  value={qualityCheck}
                  defaultValue="high"
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="low"
                    control={<Radio size="small" color="primary" />}
                    label={t('menu:quality-low')}
                  />
                  <FormControlLabel
                    value="medium"
                    control={<Radio size="small" color="primary" />}
                    label={t('menu:quality-medium')}
                  />
                  <FormControlLabel
                    value="high"
                    control={<Radio size="small" color="primary" />}
                    label={t('menu:quality-high')}
                  />
                  <FormControlLabel
                    value="best"
                    control={<Radio size="small" color="primary" />}
                    label={t('menu:quality-best')}
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <PanelHeader title={t('settings-other-title')} desc={t('settings-other-desc')} />
              <Grid container css={marginTopSm}>
                <Grid item xs={12}>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={() => handleOpenLocalStorageViewModal()}
                  >
                    {t('menu:manage-data')}
                  </Button>
                  <ModalLocalStorageView />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} css={marginTopSm}>
              <PanelHeader title={t('settings-reset-title')} desc={t('settings-reset-desc')} />
              <Typography component="div" css={marginTopSm}>
                <Button variant="contained" size="small" color="secondary" onClick={handleReset}>
                  {t('menu:reset-and-restart')}
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Layout>
  );
};

export default Settings;
