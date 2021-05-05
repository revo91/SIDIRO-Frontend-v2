import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

interface IExportCSVButton {
  data: Array<Array<any>>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    margin: {
      margin: theme.spacing(1),
    },
    floatRight: {
      float: 'right'
    }
  })
)

export const ExportCSVButton: React.FC<IExportCSVButton> = ({ data }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const generateCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + data.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sidiro.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
  }

  return (
    <Fab
      onClick={() => generateCSV()}
      variant="extended"
      color="secondary"
      aria-label="export-to-csv"
      className={clsx(classes.margin, classes.floatRight)}
    >
      <GetAppIcon className={classes.extendedIcon} />
      {t('deviceDataDialog.exportCSVTitle')}
    </Fab>
  )
}