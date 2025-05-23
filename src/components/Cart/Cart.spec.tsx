import { render, screen, fireEvent } from '@testing-library/react';
import Cart from './Cart';
import { useCart } from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../hooks/useCart');
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  }
}));

describe('Cart Component', () => {
  const mockNavigate = jest.fn();
  const mockRemoveFromCart = jest.fn();
  const mockClearCart = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve mostrar "carrinho vazio" se não houver itens', () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [],
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart,
    });

    render(<Cart />);
    expect(screen.getByText(/O carrinho está vazio/i)).toBeInTheDocument();
    const backButton = screen.getByRole('button', { name: /Voltar para a Loja/i });
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('deve renderizar os itens do carrinho', () => {
    const fakeCart = [
      { name: 'Produto 1', price: 10.99, image: 'image1.jpg' },
      { name: 'Produto 2', price: 20.5, image: 'image2.jpg' },
    ];

    (useCart as jest.Mock).mockReturnValue({
      cart: fakeCart,
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart,
    });

    render(<Cart />);

    expect(screen.getByText('Produto 1')).toBeInTheDocument();
    expect(screen.getByText('R$ 10.99')).toBeInTheDocument();
    expect(screen.getByText('Produto 2')).toBeInTheDocument();
    expect(screen.getByText('R$ 20.50')).toBeInTheDocument();

    expect(screen.getByText('R$ 31.49')).toBeInTheDocument(); // Total
  });

  it('deve chamar removeFromCart e mostrar toast ao clicar em "Remover"', () => {
    const fakeCart = [
      { name: 'Produto 1', price: 10.99, image: 'image1.jpg' },
    ];

    (useCart as jest.Mock).mockReturnValue({
      cart: fakeCart,
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart,
    });

    render(<Cart />);
    const removeButton = screen.getByRole('button', { name: /Remover/i });
    fireEvent.click(removeButton);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(0);
    expect(toast.error).toHaveBeenCalledWith('Produto 1 removido do carrinho! 🗑️', { duration: 2000 });
  });

  it('deve limpar o carrinho e mostrar toast ao clicar em "Limpar Carrinho"', () => {
    const fakeCart = [
      { name: 'Produto 1', price: 10.99, image: 'image1.jpg' },
    ];

    (useCart as jest.Mock).mockReturnValue({
      cart: fakeCart,
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart,
    });

    render(<Cart />);
    const clearButton = screen.getByRole('button', { name: /Limpar Carrinho/i });
    fireEvent.click(clearButton);
    expect(mockClearCart).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith('Todos itens do carrinho removidos! 🗑️', { duration: 2000 });
  });

  it('deve navegar ao clicar em "Voltar para a Loja"', () => {
    const fakeCart = [
      { name: 'Produto 1', price: 10.99, image: 'image1.jpg' },
    ];

    (useCart as jest.Mock).mockReturnValue({
      cart: fakeCart,
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart,
    });

    render(<Cart />);
    const backButton = screen.getByRole('button', { name: /Voltar para a Loja/i });
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('deve renderizar o botão "Finalizar Compra"', () => {
    const fakeCart = [
      { name: 'Produto 1', price: 10.99, image: 'image1.jpg' },
    ];

    (useCart as jest.Mock).mockReturnValue({
      cart: fakeCart,
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart,
    });

    render(<Cart />);
    expect(screen.getByRole('button', { name: /Finalizar Compra/i })).toBeInTheDocument();
  });
});
