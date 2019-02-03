/* eslint-disable no-console */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';

const styles = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  getRowClassName = ({ index }) => {
    const { classes, rowClassName, onRowClick } = this.props;

    return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex = null }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
    const { headerHeight, columns, classes, sort } = this.props;
    const direction = {
      [SortDirection.ASC]: 'asc',
      [SortDirection.DESC]: 'desc',
    };

    const inner =
      !columns[columnIndex].disableSort && sort != null ? (
        <TableSortLabel active={dataKey === sortBy} direction={direction[sortDirection]}>
          {label}
        </TableSortLabel>
      ) : (
        label
      );

    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        {inner}
      </TableCell>
    );
  };

  render() {
    const { classes, columns, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            className={classes.table}
            height={height}
            width={width}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ cellContentRenderer = null, className, dataKey, ...other }, index) => {
              let renderer;
              if (cellContentRenderer != null) {
                renderer = cellRendererProps =>
                  this.cellRenderer({
                    cellData: cellContentRenderer(cellRendererProps),
                    columnIndex: index,
                  });
              } else {
                renderer = this.cellRenderer;
              }

              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classNames(classes.flexContainer, className)}
                  cellRenderer={renderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellContentRenderer: PropTypes.func,
      dataKey: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.string,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  sort: PropTypes.func,
};

MuiVirtualizedTable.defaultProps = {
  headerHeight: 56,
  rowHeight: 56,
};

const WrappedVirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

const data = [
  ['02/05/2019', "Message 1", 6.0, 24, 4.0],
  ['02/04/2019', "Message 2", 9.0, 37, 4.3],
  ['02/03/2019', "Message 3", 16.0, 24, 6.0],
  ['02/02/2019', "Message 4", 3.7, 67, 4.3],
  ['02/01/2019', "Message 5", 16.0, 49, 3.9],
  ['02/01/2019', "Message 6", 16.0, 49, 3.9],
  ['02/01/2019', "Message 7", 16.0, 49, 3.9],
  ['02/01/2019', "Message 8", 16.0, 49, 3.9],
  ['02/01/2019', "Message 9", 16.0, 49, 3.9],
  ['02/01/2019', "Message 10", 16.0, 49, 3.9],
  ['02/01/2019', "Message 11", 16.0, 49, 3.9],
  ['02/01/2019', "Message 12", 16.0, 49, 3.9],
  ['02/01/2019', "Message 13", 16.0, 49, 3.9],
  ['02/01/2019', "Message 14", 16.0, 49, 3.9],
  ['02/01/2019', "Message 15", 16.0, 49, 3.9],
  ['02/01/2019', "Message 16", 16.0, 49, 3.9],
  ['02/01/2019', "Message 17", 16.0, 49, 3.9],
  ['02/01/2019', "Message 18", 16.0, 49, 3.9],
  ['02/01/2019', "Message 19", 16.0, 49, 3.9],
  ['02/01/2019', "Message 20", 16.0, 49, 3.9],
  ['02/01/2019', "Message 21", 16.0, 49, 3.9],
  ['02/01/2019', "Message 22", 16.0, 49, 3.9],
];

let id = 0;
function createData(date, message, em1, em2, em3) {
  id += 1;
  return { id, date, message, em1, em2, em3 };
}

const rows = [];
for (let i = 0; i < data.length; i += 1) {
  rows.push(createData(...data[i]));
}

// for (let i = 0; i < 200; i += 1) {
// 	const randomSelection = data[Math.floor(Math.random() * data.length)];
// 	rows.push(createData(...randomSelection));
//   }

function ReactVirtualizedTable() {
  return (
    <Paper style={{ height: 800, width: '100%' }}>
	Click on an entry to view the recomendations
      <WrappedVirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        onRowClick={({ index }) => alert(rows[index].message)}
        columns={[
          {
            width: 120,
            label: 'Date',
            dataKey: 'date',
		  },
          {
			width: 200,
			flexGrow: 1.0,
            label: 'Message',
            dataKey: 'message',
          },
          {
            width: 120,
            label: 'Emotion 1',
            dataKey: 'em1',
            numeric: true,
          },
          {
            width: 120,
            label: 'Emotion 2',
            dataKey: 'em2',
            numeric: true,
          },
          {
            width: 120,
            label: 'Emotion 3',
            dataKey: 'em3',
            numeric: true,
          },
        ]}
      />
    </Paper>
  );
}

export default ReactVirtualizedTable;
