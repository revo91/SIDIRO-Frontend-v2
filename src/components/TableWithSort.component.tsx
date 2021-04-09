import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';

interface IData {
  rows: Array<Array<string | number | Date | React.ReactNode>>
  columns: Array<string>
}

interface ITableWithSort extends IData {
  dense?: boolean,
  defaultOrderColumnIndex?: number
}

type TOrder = 'asc' | 'desc';

type TOrderDataType = 'number' | 'string' | 'Date' | 'reactNode'

interface IEnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string, columnIndex: number) => void;
  order: TOrder;
  orderBy: string;
  columns: Array<string>;
}

////////////////////////////////////////////////////

const sortRowsBy = (data: IData, sortBy: string, order: TOrder, orderDataType: TOrderDataType) => {
  const sortByColumnIndex = data.columns.findIndex(col => col === sortBy)
  if (orderDataType === 'number' || orderDataType === 'Date') {
    data.rows.sort((a: Array<any>, b: Array<any>) => order === 'asc' ? a[sortByColumnIndex] - b[sortByColumnIndex] : b[sortByColumnIndex] - a[sortByColumnIndex])
  }
  else if (orderDataType === 'string') {
    data.rows.sort((a: Array<any>, b: Array<any>) => order === 'asc' ? a[sortByColumnIndex].localeCompare(b[sortByColumnIndex]) : b[sortByColumnIndex].localeCompare(a[sortByColumnIndex]))
  }
  return data.rows
};

const EnhancedTableHead = (props: IEnhancedTableProps) => {
  const { classes, order, orderBy, onRequestSort, columns } = props;
  const createSortHandler = (property: string, columnIndex: number) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property, columnIndex);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell, index) => (
          <TableCell
            key={index}
            align='left'
            padding={'default'}
            sortDirection={orderBy === headCell ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell}
              direction={orderBy === headCell ? order : 'asc'}
              onClick={createSortHandler(headCell, index)}
            >
              {headCell}
              {orderBy === headCell ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

export const TableWithSort: React.FC<ITableWithSort> = ({ columns, rows, dense, defaultOrderColumnIndex }) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState<TOrder>('desc');
  const [orderDataType, setOrderDataType] = React.useState<TOrderDataType>('Date')
  const [orderBy, setOrderBy] = React.useState<string>(defaultOrderColumnIndex ? columns[defaultOrderColumnIndex] : columns[0]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { t } = useTranslation();

  /**
  * [Type guard]
  * @return boolean
  */
  const isDate = (element: unknown): element is Date => {
    return (element as Date).toTimeString !== undefined;
  }
  /**
   * [Type guard]
   * @return boolean
   */
  const isNumber = (element: unknown): element is number => {
    return (element as number).toExponential !== undefined;
  }
   /**
   * [Type guard]
   * @return boolean
   */
    const isString = (element: unknown): element is string => {
      return (element as string).toUpperCase !== undefined;
    }
  //

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string, columnIndex: number) => {
    const isAsc = orderBy === property && order === 'asc';
    const rowValue = rows[0][columnIndex]
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    if (isDate(rowValue)) {
      setOrderDataType('Date')
    }
    else if (isNumber(rowValue)) {
      setOrderDataType('number')
    }
    else if (isString(rowValue)) {
      setOrderDataType('string')
    }
    else {
      setOrderDataType('reactNode')
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              columns={columns}
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {sortRowsBy({ rows, columns }, orderBy, order, orderDataType)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      key={index}
                    >
                      {row.map((cell, i) => {
                        return (
                          <TableCell key={i} align="left">
                            {isDate(cell) ? cell.toLocaleString() : cell}
                          </TableCell>)
                      })}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={columns.length} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelRowsPerPage={t('tableWithSort.labelRowsPerPage')}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t('tableWithSort.labelDisplayedRows')} ${count}`}
        />
      </Paper>
    </div>
  );
}