import { render, screen } from '@testing-library/react';
import App from './App';

test('renders start game button', () => {
  render(<App />);
  const gameButton = screen.getByText(/Start a Game/i);
  expect(gameButton).toBeInTheDocument();
});
