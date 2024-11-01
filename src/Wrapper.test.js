import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Wrapper from './Wrapper';

jest.mock('@folio/linked-data', () => {
  global.document.createElement('linked-data');
});

describe('Wrapper Component', () => {
  const stripes = {
    locale: 'en',
    timezone: 'UTC',
    okapi: {
      url: 'testUrl',
      tenant: 'test',
      token: 'token',
    },
  };

  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <Wrapper stripes={stripes} />
      </MemoryRouter>
    );

    expect(container.querySelector('linked-data')).toBeInTheDocument();
  });
});
