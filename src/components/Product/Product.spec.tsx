import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import products_items from './products-items';
import { toast } from 'sonner';
import Products from './Products';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../hooks/useCart', () => ({
  useCart: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
  },
}));

jest.mock('../../components/Navbar/Navbar', () => () => <div data-testid="navbar-mock" />);


describe('Products', () => {
  const mockNavigate = jest.fn();
  const mockAddToCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Força o mock do useNavigate a retornar a função mockNavigate
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    // Força o mock do useCart a retornar addToCart mockado
    (useCart as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
    });
  });

  it('deve renderizar todos os produtos na tela', () => {
    render(<Products />);

    products_items.forEach(product => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(`R$ ${product.price.toFixed(2)}`)).toBeInTheDocument();
      // Imagem
      const expectedCount = products_items.length;
      const images = screen.getAllByAltText('gallery-photo');
      expect(images).toHaveLength(expectedCount);});
  });

  it('deve chamar addToCart e mostrar toast ao clicar em "Adicionar ao Carrinho"', () => {
    render(<Products />);

    
    const firstProduct = products_items[0];
    const addButton = screen.getAllByText('Adicionar ao Carrinho')[0];

    fireEvent.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledWith(firstProduct);
    expect(toast.success).toHaveBeenCalledWith(
      `${firstProduct.name} adicionado ao carrinho! 🛒`,
      expect.objectContaining({ duration: 4000 }),
    );

    // Botão deve ficar desabilitado após o clique
    expect(addButton).toBeDisabled();
  });

  it('deve navegar para a página de detalhes ao clicar em "Ver Detalhes"', () => {
    render(<Products />);

    const firstProduct = products_items[0];
    const detailButton = screen.getAllByText('Ver Detalhes')[0];

    fireEvent.click(detailButton);

    expect(mockNavigate).toHaveBeenCalledWith(`/products/${firstProduct.id}`);
  });
});
