// @ts-nocheck
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../../src/components/Login/Login.tsx';

describe('Login component tests', () => {

  it('Renders correctly initial document', async () => {
    /* first we visit /login and test if the string in the element with class "login-label"  has"Please Log In" is there */
    render(
      <Login />
    );
    const loginLabel = screen.getByText('Log in');

    expect(loginLabel).toBeInTheDocument();
  });

});