import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';

export const Elevation = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h2' gutterBottom>{t('elevationPage.title')}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <p>elevation content</p>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}