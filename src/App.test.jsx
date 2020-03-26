import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import App from './App';
import tableData from '../__mocks__/tableData.json';

// const wait = () =>
//   new Promise((resolve) => {
//     setTimeout(resolve, 1000);
//   });

describe('App component', () => {
  it('renders without crashing', async () => {
    const mockFetchResponse = Promise.resolve({
      json: () => Promise.resolve(tableData),
    });
    global.fetch = () => mockFetchResponse;
    await act(async () => {
      const wrapper = mount(<App />);
      await wait();
      wrapper.update();
      expect(wrapper.find('DataTable').props().rows.length).toBe(34);
    });
  });

  it('should set empty array if response is null', async () => {
    const mockFetchResponse = Promise.resolve({
      json: () => Promise.resolve(null),
    });
    global.fetch = () => mockFetchResponse;
    await act(async () => {
      const wrapper = mount(<App />);
      await wait();
      wrapper.update();
      expect(wrapper.find('DataTable').props().rows.length).toBe(0);
    });
  });
});
