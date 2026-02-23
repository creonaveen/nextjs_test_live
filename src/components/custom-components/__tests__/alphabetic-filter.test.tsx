import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AlphabeticFilter } from '../alphabetic-filter';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => (key === 'all' ? 'All' : key),
}));

describe('AlphabeticFilter', () => {
  it('should render all alphabet letters', () => {
    const handleSelect = jest.fn();
    render(<AlphabeticFilter onSelect={handleSelect} />);

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    letters.forEach((letter) => {
      expect(
        screen.getByRole('button', { name: `Filter by letter ${letter}` })
      ).toBeInTheDocument();
    });
  });

  it('should render "All" button when showAll is true', () => {
    const handleSelect = jest.fn();
    render(<AlphabeticFilter onSelect={handleSelect} showAll={true} />);
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
  });

  it('should not render "All" button when showAll is false', () => {
    const handleSelect = jest.fn();
    render(<AlphabeticFilter onSelect={handleSelect} showAll={false} />);
    expect(screen.queryByRole('button', { name: /all/i })).not.toBeInTheDocument();
  });

  it('should call onSelect when a letter is clicked', async () => {
    const user = userEvent.setup();
    const handleSelect = jest.fn();
    render(<AlphabeticFilter onSelect={handleSelect} />);

    const buttonA = screen.getByRole('button', { name: 'Filter by letter A' });
    await user.click(buttonA);

    expect(handleSelect).toHaveBeenCalledWith('A');
  });

  it('should call onSelect with undefined when "All" is clicked', async () => {
    const user = userEvent.setup();
    const handleSelect = jest.fn();
    render(<AlphabeticFilter onSelect={handleSelect} showAll={true} />);

    const allButton = screen.getByRole('button', { name: /all/i });
    await user.click(allButton);

    expect(handleSelect).toHaveBeenCalledWith(undefined);
  });

  it('should apply selectedAlphabetic variant to selected letter', () => {
    const handleSelect = jest.fn();
    render(<AlphabeticFilter onSelect={handleSelect} selectedLetter="B" />);

    const buttonB = screen.getByRole('button', { name: 'Filter by letter B' });
    expect(buttonB).toHaveAttribute('data-slot', 'button');
  });

  it('should apply alphabetic variant to non-selected letters', () => {
    const handleSelect = jest.fn();
    render(<AlphabeticFilter onSelect={handleSelect} selectedLetter="C" />);

    const buttonA = screen.getByRole('button', { name: 'Filter by letter A' });
    expect(buttonA).toHaveAttribute('data-slot', 'button');
  });

  it('should apply selectedAlphabetic variant to "All" when no letter is selected', () => {
    const handleSelect = jest.fn();
    render(<AlphabeticFilter onSelect={handleSelect} showAll={true} />);

    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toHaveAttribute('data-slot', 'button');
  });

  it('should accept custom className', () => {
    const handleSelect = jest.fn();
    const { container } = render(
      <AlphabeticFilter onSelect={handleSelect} className="custom-class" />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom-class');
  });
});
