import createApolloClient from './index';

const useApolloClient = (headers = {}) => {
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('accessToken');
  }

  return createApolloClient(token, headers);
};

export default useApolloClient;
