import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import settings from '@/settings';

const createApolloClient = (token?: string | null, headers = {}) => {
  // Crea un enlace HTTP usando la URL de la API
  const httpLink = createHttpLink({
    uri: settings.API_URL + '/graphql',
  });

  // Añade los headers personalizados a todas las solicitudes
  const authLink = setContext((_, { headers: prevHeaders }) => {
    return {
      headers: {
        ...prevHeaders,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Debes verificar si realmente necesitas este header aquí
        'apollo-require-preflight': 'true',
        ...(token != null && { Authorization: `${token}` }),
        ...headers, // Headers personalizados adicionales que pasas como argumento
      },
    };
  });

  // Crea el cliente Apollo con el enlace HTTP y el enlace de autenticación
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    name: 'Dr-Cuotas-Web-Client',
    version: '1.0',
  });
};

export default createApolloClient;
