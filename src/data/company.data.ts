import { MailIcon, MapPinIcon } from 'lucide-react';

const CompanyData = {
  name: 'Company Ipsum',
  copyright: '© 2026 Company Ipsum',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sollicitudin tempor nunc, id posuere leo semper sit amet. Integer vitae ante eu tortor semper feugiat. Orci varius natoque penatibus et magnis dis parturient viverra.',
  menu: {
    main: {
      title: 'Main menu',
      links: [
        {
          href: '/lorem',
          label: 'Lorem',
        },
        {
          href: '/ipsum',
          label: 'Ipsum',
        },
        {
          href: '/dolor',
          label: 'Dolor',
        },
        {
          href: '/sit',
          label: 'Sit',
        },
        {
          href: '/amet',
          label: 'Amet',
        },
      ],
    },
  },
  socials: [
    {
      icon: MapPinIcon,
      label: 'Jl. Lorem Ipsum, Dolor Kota Sit Amet, 67676',
      href: '#',
    },
    {
      icon: MailIcon,
      label: 'mail_ipsum@example.com',
      href: '#',
    },
  ],
};

export default CompanyData;
