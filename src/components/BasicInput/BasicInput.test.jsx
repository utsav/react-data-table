import React from 'react';
import { mount } from 'enzyme';
import BasicInput from './index';

describe('BasicInput component', () => {
  it('renders without crashing', () => {
    mount(<BasicInput />);
  });

  it('should call onChange function on input change', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<BasicInput onChange={mockFn} value="there" checked />);
    wrapper.find('input').simulate('change');
    expect(mockFn).toBeCalled();
  });
});
