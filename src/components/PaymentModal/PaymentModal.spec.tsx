import { render, screen, fireEvent } from '@testing-library/react';
import PaymentModal from './PaymentModal';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../hooks/useCart', () => ({
  useCart: jest.fn(),
}));


describe('PaymentModal', () => {
  const mockNavigate = jest.fn();
  const mockClearCart = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useCart as jest.Mock).mockReturnValue({ clearCart: mockClearCart });
  });

  it('não deve renderizar nada quando não estiver visível', () => {
    const { container } = render(<PaymentModal visible={false} onClose={jest.fn()} total={100} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('deve renderizar corretamente quando estiver visível', () => {
    render(<PaymentModal visible={true} onClose={jest.fn()} total={123.45} />);
    expect(screen.getByText('Pagamento via PIX')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /finalizar compra/i })).toBeInTheDocument();
  });

  it('deve chamar onClose ao clicar no botão de fechar (×)', () => {
    const onClose = jest.fn();
    render(<PaymentModal visible={true} onClose={onClose} total={100} />);
    fireEvent.click(screen.getByRole('button', { name: /fechar modal/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('deve limpar o carrinho, fechar o modal e redirecionar ao clicar em "Finalizar Compra"', () => {
    const onClose = jest.fn();
    render(<PaymentModal visible={true} onClose={onClose} total={100} />);
    const finalizeButton = screen.getByRole('button', { name: /Já paguei, voltar para o início/i });

    fireEvent.click(finalizeButton);

    expect(onClose).toHaveBeenCalled();
    expect(mockClearCart).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('deve fechar o modal ao clicar no overlay', () => {
    const onClose = jest.fn();

    const { container } = render(<PaymentModal visible={true} onClose={onClose} total={100} />);
    const overlay = container.querySelector('.modal-wrapper')!;
    fireEvent.click(overlay);

    expect(onClose).toHaveBeenCalled();
  });

  it('não deve fechar o modal ao clicar dentro do conteúdo', () => {
    const onClose = jest.fn();

    const { container } = render(<PaymentModal visible={true} onClose={onClose} total={100} />);
    const content = container.querySelector('.modal-content')!;
    fireEvent.click(content);

    expect(onClose).not.toHaveBeenCalled();
  });
});
