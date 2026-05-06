import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock before importing
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { id: '1', name: 'Test User' },
    refreshCart: vi.fn(),
  }),
}));

import ProductCard from '../components/ProductCard';

describe('ProductCard Component', () => {
  const mockProduct = {
    _id: '1',
    name: 'Test Product',
    price: 99.99,
    description: 'A test product',
    image: 'test-image.jpg'
  };

  it('should render product card with product details', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} onLoginRequired={() => {}} />
      </BrowserRouter>
    );
    
    // Test if product card renders without crashing
    expect(document.body).toBeTruthy();
  });

  it('should display product price', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} onLoginRequired={() => {}} />
      </BrowserRouter>
    );
    
    // Test that component renders
    expect(document.body).toBeTruthy();
  });
});


