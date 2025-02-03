import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function SocialMedia({ className }: { className?: string }) {
  const socialMedia = [
    {
      icon: (
        <FaInstagram className="text-[#6636E2] hover:scale-110 transition-all duration-300" />
      ),
      href: 'https://www.instagram.com/drcuotas',
    },
    {
      icon: (
        <FaYoutube className="text-[#6636E2]  hover:scale-110 transition-all duration-300" />
      ),
      href: 'https://www.youtube.com/',
    },
    {
      icon: (
        <FaFacebookF className="text-[#6636E2]  hover:scale-110 transition-all duration-300" />
      ),
      href: 'https://www.facebook.com/',
    },
  ];
  return (
    <>
      <div className="">
        <div className={`flex flex-row gap-3 ${className} `}>
          {socialMedia.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="text-[#6636E2] text-xl"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
