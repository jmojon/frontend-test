import React from 'react';
import ReactDOM from 'react-dom';
import { CustomerForm } from './CustomerForm';

const mockFormProps: any = {
    handleSubmit: () => {}
}

it('renders customer forms without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CustomerForm handleSubmit={mockFormProps.handleSubmit} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

