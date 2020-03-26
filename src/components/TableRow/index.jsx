import React from 'react';
import PropTypes from 'prop-types';
import s from './TableRow.module.scss';
import BasicCheckBox from '../BasicCheckBox';

const propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      numeric: PropTypes.bool.isRequired,
      customRow: PropTypes.func,
    }).isRequired,
  ).isRequired,
  id: PropTypes.string.isRequired,
  row: PropTypes.shape({}).isRequired,
  onCheckBoxChange: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  index: PropTypes.number,
};

const defaultProps = {
  selected: false,
  onClick: () => {},
  index: 0,
};

class TableRow extends React.PureComponent {
  render() {
    const { columns, row, onCheckBoxChange, id, selected, onClick, index } = this.props;
    return (
      <tr onClick={() => onClick(row, index)}>
        <td>
          <BasicCheckBox onChange={onCheckBoxChange} value={id} checked={selected} />
        </td>
        {columns.map((column) => (
          <td className={column.numeric ? s.rightAlign : ''} key={column.id}>
            {column.customRow ? column.customRow(row) : row[column.id]}
          </td>
        ))}
      </tr>
    );
  }
}

TableRow.propTypes = propTypes;
TableRow.defaultProps = defaultProps;
export default TableRow;
