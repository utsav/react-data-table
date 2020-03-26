import React from 'react';
import { mount } from 'enzyme';
import BasicCheckBox from './index';

describe('BasicCheckBox component', () => {
  it('renders without crashing', () => {
    mount(<BasicCheckBox />);
  });

  it('should call onChange function on checkbox click', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<BasicCheckBox onChange={mockFn} checked />);
    wrapper.find('input').simulate('change');
    expect(mockFn).toBeCalled();
  });
});
