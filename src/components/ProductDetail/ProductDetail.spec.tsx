import { render, screen, fireEvent } from '@testing-library/react';
import ProductDetails from './ProductDetail';
import { useParams, useNavigate } from 'react-router-dom';
import products_items from '../Product/products-items';
import { useCart } from '../../hooks/useCart';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock('../../hooks/useCart', () => ({
  useCart: jest.fn(),
}));


describe('ProductDetails', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useCart as jest.Mock).mockReturnValue({ cart: [1, 2, 3] });
    
  });

  it('deve renderizar corretamente os dados do produto', () => {
    const product = products_items[0];
    (useParams as jest.Mock).mockReturnValue({ id: product.id.toString() });

    render(<ProductDetails />);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText(`R$ ${product.price.toFixed(2)}`)).toBeInTheDocument();
  });

  it('deve renderizar a imagem do produto', () => {
    const product = products_items[0];
    (useParams as jest.Mock).mockReturnValue({ id: product.id.toString() });

    render(<ProductDetails />);
    
    const image = screen.getByAltText(product.name);
    expect(image).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro quando o produto não é encontrado', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '9999' });

    render(<ProductDetails />);
    expect(screen.getByText('Produto não encontrado.')).toBeInTheDocument();
  });

  it('deve navegar para a home ao clicar no botão "Voltar para a Loja"', () => {
    const product = products_items[0];
    (useParams as jest.Mock).mockReturnValue({ id: product.id.toString() });

    render(<ProductDetails />);
    const button = screen.getByRole('button', { name: /Voltar para a Loja/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

});
