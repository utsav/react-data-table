import React from 'react';
import { mount } from 'enzyme';
import DataTable from './index';
import tableData from '../../../__mocks__/tableData.json';

const columnsData = [
  {
    id: 'title',
    label: 'Title',
    customRow: (row) => (
      <div>
        <span>{row.title}</span>
      </div>
    ),
    numeric: false,
  },
  { id: 'url', label: 'Url', numeric: false },
];

describe('DataTable component', () => {
  it('renders without crashing', () => {
    mount(<DataTable primaryColumn="id" rows={tableData} columns={columnsData} />);
  });

  it('should display only 10 rows', () => {
    const wrapper = mount(
      <DataTable primaryColumn="id" itemsPerPage={10} rows={tableData} columns={columnsData} />,
    );
    expect(wrapper.find('TableRow').length).toBe(10);
  });

  it('should sort column on click', () => {
    const wrapper = mount(
      <DataTable primaryColumn="id" itemsPerPage={10} rows={tableData} columns={columnsData} />,
    );
    wrapper.find('table > thead > tr > th').at(1).simulate('click');
    wrapper.update();
    // asc sorting
    expect(wrapper.state().rowData[0].title).toEqual(
      'accusamus beatae ad facilis cum similique qui sunt',
    );

    wrapper.find('table > thead > tr > th').at(1).simulate('click');
    wrapper.update();
    // desc sorting
    expect(wrapper.state().rowData[0].title).toEqual('voluptate voluptates sequi');
  });

  it('should search column on seach input change', () => {
    const wrapper = mount(
      <DataTable primaryColumn="id" itemsPerPage={10} rows={tableData} columns={columnsData} />,
    );
    wrapper
      .find('BasicInput')
      .find('input')
      .simulate('change', { target: { value: 'repudiandae iusto' } });

    wrapper.update();
    expect(wrapper.state().rowData).toEqual([
      {
        albumId: 1,
        id: 13,
        title: 'repudiandae iusto deleniti rerum',
        url: 'https://via.placeholder.com/600/197d29',
        thumbnailUrl: 'https://via.placeholder.com/150/197d29',
      },
    ]);
  });

  it('should check particular checkbox on checkbox change', () => {
    const wrapper = mount(
      <DataTable primaryColumn="id" itemsPerPage={10} rows={tableData} columns={columnsData} />,
    );
    // check
    wrapper
      .find('TableRow')
      .first()
      .props()
      .onCheckBoxChange({ target: { value: '1', checked: false } });
    wrapper.update();
    expect(wrapper.state().selectedRows).toEqual({ '1': false });
  });

  it('should load infinite data on end reach', () => {
    const wrapper = mount(
      <DataTable primaryColumn="id" itemsPerPage={10} rows={tableData} columns={columnsData} />,
    );
    wrapper.instance().handleInViewChange(false);
    wrapper.update();
    expect(wrapper.state().rowData.length).toEqual(10);

    wrapper.instance().handleInViewChange(true);
    wrapper.update();
    expect(wrapper.state().rowData.length).toEqual(20);
  });

  it('should select all checkbox on allcheckbox check', () => {
    const wrapper = mount(
      <DataTable primaryColumn="id" itemsPerPage={10} rows={tableData} columns={columnsData} />,
    );
    wrapper.find('thead BasicCheckBox').simulate('change', { target: { checked: true } });
    wrapper.update();
    expect(wrapper.state().allSelected).toEqual(true);

    wrapper.find('thead BasicCheckBox').simulate('change', { target: { checked: false } });
    wrapper.update();
    expect(wrapper.state().allSelected).toEqual(false);
  });
});
