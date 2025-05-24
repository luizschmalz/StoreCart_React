import { render, screen, fireEvent } from '@testing-library/react';
import NavbarMarket from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(), 
}));

jest.mock('../../hooks/useCart', () => ({
  useCart: jest.fn(),
}));

describe('NavbarMarket', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // 👇 Força o tipo para poder usar mockReturnValue sem erro do TS
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useCart as jest.Mock).mockReturnValue({ cart:  [
      { id: 1, name: 'Produto 1', price: 10.99, image: 'image1.jpg', qtd: 1 },
      { id: 2, name: 'Produto 2', price: 20.5, image: 'image2.jpg', qtd: 1 },
    ]});
  });

  it('deve renderizar o nome da empresa', () => {
    render(<NavbarMarket />);
    expect(screen.getByText('RocketStore')).toBeInTheDocument();
  });

  it('deve mostrar a quantidade correta de itens no carrinho', () => {
    render(<NavbarMarket />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('deve navegar para a home ao clicar no nome da empresa', () => {
    render(<NavbarMarket />);
    fireEvent.click(screen.getByText('RocketStore'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('deve navegar para /carrinho ao clicar no botão do carrinho', () => {
    render(<NavbarMarket />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/carrinho');
  });
});