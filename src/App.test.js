import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App'; 

test('renders START button', () => {
  render(<App />);
  const buttons = screen.getAllByText(/START/i);
  expect(buttons.length).toEqual(2);
});

test('renders label', () => {
  render(<App />);
  const linkElement = screen.getByText(/Enter the number of squares:/i);
  expect(linkElement).toBeInTheDocument();
});
