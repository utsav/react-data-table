/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import TableRow from './index';

const rowData = {
  one: 'row one',
  two: 'row two',
  three: 'row three',
};

const props = {
  id: 'four',
  columns: [
    { id: 'one', numeric: false },
    { id: 'two', numeric: true },
    { id: 'three', numeric: false },
  ],
  row: {
    one: 'row one',
    two: 'row two',
    three: 'row three',
  },
};

describe('TableRow component', () => {
  it('renders without crashing', () => {
    mount(<TableRow {...props} onCheckBoxChange={() => {}} />);
  });

  it('renders without crashing', () => {
    const mockFn = jest.fn();
    const index = 4;
    const wrapper = mount(
      <TableRow {...props} onCheckBoxChange={() => {}} onClick={mockFn} index={index} />,
    );
    wrapper.find('tr').first().simulate('click');
    expect(mockFn).toBeCalledWith(rowData, index);
  });
});
