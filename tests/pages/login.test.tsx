// @ts-nocheck
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../../src/components/Login/Login.tsx';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from 'react-router-dom';
import { LOG_IN_PATH } from '../../src/common/common.ts';

describe('Login component tests', () => {

  it('Renders correctly initial document', async () => {
    /* first we visit /login and test if the string in the element with class "login-label"  has"Please Log In" is there */
    render(
      <Router>
        <Routes>
        <Route path={LOG_IN_PATH} element={<Login />} />
        </Routes>
        <Login />
      </Router>
    );
    const loginLabel = screen.getByText('Sign In');

    expect(loginLabel).toBeInTheDocument();
  });

});