import AccountLayout from './account';
import NothingLayout from './nothing';
import PrincipalLayout from './principal';
import SimpleLayout from './simple';
import SimpleLayoutTwo from './simple2';

const layoutsMap: Record<string, React.FC<{ children: JSX.Element }>> = {
  '/': PrincipalLayout,
  '/_error': NothingLayout,
  '/login': NothingLayout,
  '/register': NothingLayout,
  '/forgotYourPassword': SimpleLayout,
  '/forgotYourPassword/OTP': SimpleLayout,
  '/forgotYourPassword/newPassword': SimpleLayout,
  '/admin': PrincipalLayout,
  '/store': SimpleLayoutTwo,
  '/account': PrincipalLayout,
  '/account/doctor/[slug]': AccountLayout,
  '/account/settings': AccountLayout,
  '/account/settings/account': AccountLayout,
};

export default layoutsMap;
