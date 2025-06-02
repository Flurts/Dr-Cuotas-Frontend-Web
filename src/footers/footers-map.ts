import NothingFooter from './NothingFooter';
import PrincipalFooter from './principal';

const footersMap: Record<string, React.FC<{ children: JSX.Element }>> = {
  '/': PrincipalFooter,
  '/_error': PrincipalFooter,
  '/login': NothingFooter,
  '/register': NothingFooter,
  '/forgotYourPassword': NothingFooter,
  '/forgotYourPassword/OTP': NothingFooter,
  '/forgotYourPassword/newPassword': NothingFooter,
  '/terms-and-conditions': NothingFooter,
  '/account': NothingFooter,
  '/faq': PrincipalFooter,
  '/admin': PrincipalFooter,
  '/professionals': PrincipalFooter,
  '/store': PrincipalFooter,
  '/contact': PrincipalFooter,
  '/account/settings': NothingFooter,
  '/account/settings/account': NothingFooter,
};

export default footersMap;
