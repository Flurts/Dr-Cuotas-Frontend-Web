import { FaTelegram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import {
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoPinterest,
  IoLogoSnapchat,
  IoLogoTiktok,
  IoLogoWhatsapp,
  IoLogoYoutube,
} from 'react-icons/io5';
import { RiFacebookFill } from 'react-icons/ri';

import { SocialMedia } from '@/types';

export const socialMediaIcons = {
  [SocialMedia.Facebook]: RiFacebookFill,
  [SocialMedia.Twitter]: FaXTwitter,
  [SocialMedia.Instagram]: IoLogoInstagram,
  [SocialMedia.LinkedIn]: IoLogoLinkedin,
  [SocialMedia.YouTube]: IoLogoYoutube,
  [SocialMedia.WhatsApp]: IoLogoWhatsapp,
  [SocialMedia.Telegram]: FaTelegram,
  [SocialMedia.Pinterest]: IoLogoPinterest,
  [SocialMedia.Snapchat]: IoLogoSnapchat,
  [SocialMedia.TikTok]: IoLogoTiktok,
};
