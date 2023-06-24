import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from './store/store';

import { theme } from './constants';
import App from './App';

const persistor = persistStore(store);

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
