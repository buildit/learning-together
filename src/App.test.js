import React from 'react';
import ReactDOM from 'react-dom';
import { RoutesComponent } from './components';

jest.mock('./components')

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RoutesComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
