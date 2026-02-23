import { render, screen } from '@testing-library/react';

import InvesttechOwnStocks from '../investtech-own-stocks';

describe('InvesttechOwnStocks', () => {
  it('should render own stocks info', () => {
    const ownStocksInfo = 'This is test stock information';
    render(<InvesttechOwnStocks ownStocksInfo={ownStocksInfo} />);
    expect(screen.getByText(ownStocksInfo)).toBeInTheDocument();
  });

  it('should render with empty string', () => {
    const { container } = render(<InvesttechOwnStocks ownStocksInfo="" />);
    const paragraph = container.querySelector('p');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph?.textContent).toBe('');
  });

  it('should apply correct styling classes', () => {
    const { container } = render(<InvesttechOwnStocks ownStocksInfo="Test" />);
    const paragraph = container.querySelector('p');
    expect(paragraph).toHaveClass('text-sm', 'leading-relaxed', 'font-medium');
  });

  it('should render within Card component', () => {
    const { container } = render(<InvesttechOwnStocks ownStocksInfo="Test" />);
    const card = container.querySelector('[data-slot="card"]');
    expect(card).toBeInTheDocument();
  });
});
