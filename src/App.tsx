import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { routes } from './routes';
import ResetPasswordPage from './component/pages/ResetPasswordPage';
import { ThemeProvider } from './context/ThemeContext';

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;