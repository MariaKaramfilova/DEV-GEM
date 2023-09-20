// @ts-nocheck
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../../src/components/Login/Login.tsx';
import RoutePaths from '../../src/components/RoutePaths/RoutePaths.tsx';
import { Router } from 'react-router-dom';

describe('Login component tests', () => {

  it('Renders correctly initial document', async () => {
    /* first we visit /login and test if the string in the element with class "login-label"  has"Please Log In" is there */
    render(
      <Router>
        <RoutePaths/>
        <Login />
      </Router>
    );
    const loginLabel = screen.getByText('Log in');

    expect(loginLabel).toBeInTheDocument();
  });

});