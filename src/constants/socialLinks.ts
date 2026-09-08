export interface SocialLink {
  label: string;
  value: string;
  href: string;
}

export interface SocialLinks {
  email: SocialLink;
  linkedin: SocialLink;
  github: SocialLink;
  whatsapp: SocialLink;
}

// ponytail: single source of truth for all social/contact links
export const SOCIAL_LINKS: SocialLinks = {
  email: {
    label: 'Email',
    value: 'mahmodmansour2001@gmail.com',
    href: 'mailto:mahmodmansour2001@gmail.com',
  },
  linkedin: {
    label: 'LinkedIn',
    value: 'mahmoudmagdy001',
    href: 'https://www.linkedin.com/in/mahmoudmagdy001/',
  },
  github: {
    label: 'GitHub',
    value: 'MahmoudMagdy001',
    href: 'https://github.com/MahmoudMagdy001',
  },
  whatsapp: {
    label: 'WhatsApp',
    value: '+20 109 061 7609',
    href: 'https://wa.me/201090617609',
  },
};

export const CV_URL: string = '/Mahmoud_Magdy_Mansour_CV.pdf';
