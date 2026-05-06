import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock before importing
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { id: '1', name: 'Test User', email: 'test@example.com' },
    cartCount: 0,
    logout: vi.fn(),
  }),
}));

import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
  it('should render the navbar', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    
    // Test if navbar renders without crashing
    expect(document.body).toBeTruthy();
  });
});


