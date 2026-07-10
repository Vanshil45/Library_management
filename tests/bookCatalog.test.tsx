import { render, screen, fireEvent } from '@testing-library/react';
import BookCatalog from '../src/components/BookCatalog';

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [
    { id: 1, title: 'Book One', author: 'Author A', isbn: '1234567890' },
    { id: 2, title: 'Book Two', author: 'Author B', isbn: '0987654321' },
  ] }))
}));

describe('BookCatalog Component', () => {
  it('renders without crashing', () => {
    render(<BookCatalog />);
    expect(screen.getByPlaceholderText('Search books...')).toBeInTheDocument();
  });

  it('displays books fetched from API', async () => {
    render(<BookCatalog />);
    const bookOne = await screen.findByText('Book One');
    const bookTwo = await screen.findByText('Book Two');
    expect(bookOne).toBeInTheDocument();
    expect(bookTwo).toBeInTheDocument();
  });

  it('filters books based on search term', async () => {
    render(<BookCatalog />);
    fireEvent.change(screen.getByPlaceholderText('Search books...'), { target: { value: 'One' } });
    const bookOne = await screen.findByText('Book One');
    expect(bookOne).toBeInTheDocument();
    expect(screen.queryByText('Book Two')).not.toBeInTheDocument();
  });
});
