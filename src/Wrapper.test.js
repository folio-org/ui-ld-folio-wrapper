import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Wrapper from './Wrapper';

jest.mock('@folio/linked-data', () => jest.fn());

describe('Wrapper', () => {
  test('sets navigation origin into localstorage', () => {
    const mockSetItem = jest.fn();
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(mockSetItem);

    render(
      <MemoryRouter>
        <Wrapper history={{ location: { state: { from: {} } } }} stripes={{ okapi: {} }} />
      </MemoryRouter>
    );

    expect(mockSetItem).toHaveBeenCalled();
  });

  test('does not set navigation origin into localstorage', () => {
    const mockSetItem = jest.fn();
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(mockSetItem);

    render(
      <MemoryRouter>
        <Wrapper history={{ location: { state: undefined } }} stripes={{ okapi: {} }} />
      </MemoryRouter>
    );

    expect(mockSetItem).not.toHaveBeenCalled();
  });
});
