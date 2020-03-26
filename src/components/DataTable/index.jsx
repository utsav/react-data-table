import React from 'react';
import PropTypes from 'prop-types';
import { InView } from 'react-intersection-observer';
import s from './DataTable.module.scss';
import TableRow from '../TableRow';
import BasicInput from '../BasicInput';
import BasicCheckBox from '../BasicCheckBox';

const propTypes = {
  primaryColumn: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool.isRequired,
      width: PropTypes.string,
      customRow: PropTypes.func,
    }).isRequired,
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSelectionChange: PropTypes.func,
  itemsPerPage: PropTypes.number,
  onRowClick: PropTypes.func,
};

const defaultProps = {
  onSelectionChange: () => {},
  itemsPerPage: 30,
  onRowClick: () => {},
};

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    const { rows, itemsPerPage } = props;
    this.state = {
      currentPage: 1,
      rowData: [...rows].splice(0, itemsPerPage),
      selectedRows: {},
      allSelected: false,
      sortBy: {
        field: null,
        ascDesc: 'asc',
      },
      search: '',
    };
  }

  filterData = (search, currentPage, sortBy) => {
    const { rows, columns, itemsPerPage } = this.props;

    const newRows = rows.filter((row) => {
      let found = false;
      for (let i = 0; i <= columns.length; i += 1) {
        const column = columns[i] ? columns[i].id : null;
        if (row[column] && row[column].indexOf(search) !== -1) {
          found = true;
          break;
        }
      }
      return found;
    });

    if (sortBy && sortBy.field) {
      newRows.sort((row1, row2) => {
        const row1a = row1[sortBy.field].toUpperCase();
        const row2b = row2[sortBy.field].toUpperCase();
        let comparison = 0;
        if (row1a > row2b) {
          comparison = sortBy.ascDesc === 'asc' ? 1 : -1;
        } else if (row1a < row2b) {
          comparison = sortBy.ascDesc === 'asc' ? -1 : 1;
        }
        return comparison;
      });
    }

    this.setState({ rowData: newRows.splice(0, itemsPerPage * currentPage) });
  };

  handleSearchChange = (e) => {
    const { sortBy } = this.state;
    this.setState({ search: e.target.value, currentPage: 1 });
    this.filterData(e.target.value, 1, sortBy);
  };

  handleRowCheckBoxChange = (e) => {
    const { onSelectionChange } = this.props;
    const { selectedRows, allSelected } = this.state;

    if (allSelected) return;

    const newSelectedRow = {
      ...selectedRows,
      [e.target.value]: e.target.checked,
    };

    this.setState({
      selectedRows: newSelectedRow,
    });

    onSelectionChange(Object.keys(selectedRows));
  };

  handleSelectAll = (e) => {
    const { onSelectionChange } = this.props;
    this.setState({ selectedRows: {} });
    if (e.target.checked) {
      this.setState({ allSelected: true });
    } else {
      this.setState({ allSelected: false });
    }
    onSelectionChange('all');
  };

  handleInViewChange = (inView) => {
    if (!inView) return;

    const { currentPage, search, sortBy } = this.state;
    const newCurrentPage = currentPage + 1;
    this.setState({ currentPage: newCurrentPage });
    this.filterData(search, newCurrentPage, sortBy);
  };

  handleChangeSortBy = (column) => {
    const { search, sortBy } = this.state;
    const newSortBy = {
      field: column,
      ascDesc: sortBy.field === column && sortBy.ascDesc === 'asc' ? 'desc' : 'asc',
    };
    this.setState({ sortBy: newSortBy, currentPage: 1 });
    this.filterData(search, 1, newSortBy);
  };

  render() {
    const { search, allSelected, rowData, selectedRows, sortBy } = this.state;
    const { columns, primaryColumn, onRowClick } = this.props;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <BasicInput value={search} key="basic-input" onChange={this.handleSearchChange} />
          <table className={s.table}>
            <thead className={s.head}>
              <tr>
                <th>
                  <BasicCheckBox onChange={this.handleSelectAll} checked={allSelected} />
                </th>
                {columns.map((column) => (
                  <th
                    className={sortBy.field === column.id ? s[sortBy.ascDesc] : undefined}
                    key={column.id}
                    name={column.label}
                    onClick={() => this.handleChangeSortBy(column.id)}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={s.body}>
              {rowData.map((row, index) => (
                <TableRow
                  key={row[primaryColumn]}
                  id={row[primaryColumn].toString()}
                  index={index}
                  columns={columns}
                  row={row}
                  selected={allSelected || selectedRows[row[primaryColumn]]}
                  onCheckBoxChange={this.handleRowCheckBoxChange}
                  onClick={onRowClick}
                />
              ))}
            </tbody>
          </table>
          <InView rootMargin="50%" onChange={this.handleInViewChange}>
            {({ ref }) => <div ref={ref} />}
          </InView>
        </div>
      </div>
    );
  }
}

DataTable.propTypes = propTypes;
DataTable.defaultProps = defaultProps;
export default DataTable;
