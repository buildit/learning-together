import React from 'react';
import ReactDOM from 'react-dom';
import { default as RoutesComponent } from './routes';
jest.mock('../register');
jest.mock('../user-profile');
jest.mock('../page404');
jest.mock('../landing');
jest.mock('../workshopList');
jest.mock('../workshopForm');
jest.mock('../workshop');
jest.mock('../confirmation');
jest.mock('../../UserProvider')

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RoutesComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
