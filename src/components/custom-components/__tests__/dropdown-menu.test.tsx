import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DropdownMenuComponent } from '../dropdown-menu';

describe('DropdownMenuComponent', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('should render dropdown with first option as default', () => {
    const handleSelect = jest.fn();
    render(<DropdownMenuComponent options={mockOptions} onSelect={handleSelect} />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('should render with selected option', () => {
    const handleSelect = jest.fn();
    render(
      <DropdownMenuComponent
        options={mockOptions}
        onSelect={handleSelect}
        selectedOption={mockOptions[1]}
      />
    );

    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('should render default text when no options provided', () => {
    const handleSelect = jest.fn();
    render(<DropdownMenuComponent options={[]} onSelect={handleSelect} />);

    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('should open dropdown menu on click', async () => {
    const user = userEvent.setup();
    const handleSelect = jest.fn();
    render(<DropdownMenuComponent options={mockOptions} onSelect={handleSelect} />);

    const trigger = screen.getByText('Option 1');
    await user.click(trigger);

    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('should call onSelect when option is clicked', async () => {
    const user = userEvent.setup();
    const handleSelect = jest.fn();
    render(<DropdownMenuComponent options={mockOptions} onSelect={handleSelect} />);

    const trigger = screen.getByText('Option 1');
    await user.click(trigger);

    const option2 = screen.getByText('Option 2');
    await user.click(option2);

    expect(handleSelect).toHaveBeenCalledWith({ value: 'option2', label: 'Option 2' });
  });

  it('should close dropdown after selecting option', async () => {
    const user = userEvent.setup();
    const handleSelect = jest.fn();
    render(<DropdownMenuComponent options={mockOptions} onSelect={handleSelect} />);

    const trigger = screen.getByText('Option 1');
    await user.click(trigger);

    // Verify menu is open - Option 2 and Option 3 should be visible
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();

    const option2 = screen.getByText('Option 2');
    await user.click(option2);

    // Dropdown should close, so Option 2 and Option 3 should not be visible in menu anymore
    // Only Option 1 should be visible (in the trigger)
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument();

    // Verify onSelect was called
    expect(handleSelect).toHaveBeenCalledWith({ value: 'option2', label: 'Option 2' });
  });

  it('should show "No options available" when options array is empty', async () => {
    const user = userEvent.setup();
    const handleSelect = jest.fn();
    render(<DropdownMenuComponent options={[]} onSelect={handleSelect} />);

    const trigger = screen.getByText('Select an option');
    await user.click(trigger);

    expect(screen.getByText('No options available')).toBeInTheDocument();
  });

  it('should apply selected styling to selected option', async () => {
    const user = userEvent.setup();
    const handleSelect = jest.fn();
    render(
      <DropdownMenuComponent
        options={mockOptions}
        onSelect={handleSelect}
        selectedOption={mockOptions[0]}
      />
    );

    const trigger = screen.getByText('Option 1');
    await user.click(trigger);

    const option1 = screen.getAllByText('Option 1')[1]; // Second instance is in menu
    expect(option1.closest('div')).toHaveClass('bg-primary-background');
  });
});
