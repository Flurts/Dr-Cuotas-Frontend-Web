import NothingFooter from './NothingFooter';
import PrincipalFooter from './principal';

const footersMap: Record<string, React.FC<{ children: JSX.Element }>> = {
  '/': PrincipalFooter,
  '/_error': NothingFooter,
  '/login': NothingFooter,
  '/forgotYourPassword': NothingFooter,
  '/forgotYourPassword/OTP': NothingFooter,
  '/forgotYourPassword/newPassword': NothingFooter,
  '/terms-and-conditions': NothingFooter,
  '/account': PrincipalFooter,
};

export default footersMap;
