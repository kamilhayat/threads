import { FaTwitter, FaGithub, FaLinkedin, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export const siteConfig = {
  contact: [
    {
      name: 'Phone',
      value: '08595954095',
      icon: FaPhone,
    },
    {
      name: 'Email',
      value: 'abc@gmail.com',
      icon: FaEnvelope,
    },
    {
      name: 'Address',
      value: 'abul fazal part1',
      icon: FaMapMarkerAlt,
    },
  ],
  socialLinks: [
    { name: 'Twitter', url: 'https://twitter.com/yourusername', icon: FaTwitter },
    { name: 'GitHub', url: 'https://github.com/yourusername', icon: FaGithub },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/yourusername', icon: FaLinkedin },
    { name: 'Instagram', url: 'https://www.instagram.com/yourusername', icon: FaInstagram },
  ],
};

