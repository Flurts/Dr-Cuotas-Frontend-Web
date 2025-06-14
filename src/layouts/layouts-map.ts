import AccountLayout from './account';
import NothingLayout from './nothing';
import PrincipalLayout from './principal';
import SimpleLayout from './simple';

const layoutsMap: Record<string, React.FC<{ children: JSX.Element }>> = {
  '/': PrincipalLayout,
  '/_error': NothingLayout,
  '/login': NothingLayout,
  '/register': NothingLayout,
  '/forgotYourPassword': SimpleLayout,
  '/forgotYourPassword/OTP': SimpleLayout,
  '/forgotYourPassword/newPassword': SimpleLayout,
  '/admin': PrincipalLayout,
  '/store': PrincipalLayout,
  '/account': PrincipalLayout,
  '/contact': PrincipalLayout,
  '/account/doctor/[slug]': AccountLayout,
  '/account/settings': AccountLayout,
  '/account/settings/account': AccountLayout,
};

export default layoutsMap;
