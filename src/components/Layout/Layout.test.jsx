import React from 'react';
import { mount } from 'enzyme';
import Layout from './index';

describe('Layout component', () => {
  it('renders without crashing', () => {
    mount(
      <Layout>
        <div>Test Children</div>
      </Layout>,
    );
  });
});
