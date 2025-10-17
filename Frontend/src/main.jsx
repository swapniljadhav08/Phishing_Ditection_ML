import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home.jsx';
import { ClerkProvider } from '@clerk/clerk-react'
import PhishGuardPage from './menu/PhishGuardPage.jsx';
import ShowCase from './menu/showCase.jsx';
 
 
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env file')
  }

const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <App />,   
  // },
    {
    path: '/',
    element: <Home />,
  },
  {
    path:'/PhishGuardPage',
    element:<PhishGuardPage/>
  },
  {
    path:'/showCase',
    element:<ShowCase/>
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
       <RouterProvider router={router} />   
      </ClerkProvider>
   
  </StrictMode>,
);
