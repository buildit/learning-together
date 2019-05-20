import React from 'react';
import ReactDOM from 'react-dom';
import { default as RoutesComponent } from './routes';
//jest.mock('../register');
jest.mock('../../userModule');
jest.mock('../page404');
jest.mock('../../landingModule');
jest.mock('../../workshopModule');
jest.mock('../../messageModule');
jest.mock('../../../UserProvider')

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RoutesComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
