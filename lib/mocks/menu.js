const mockMenuItems = [
  {
    label: 'How it works',
    link: '/how-it-works',
  },
  {
    label: 'Experiences',
    link: '/experiences',
    children: [
      {
        label: 'Some event',
        link: '/some-event',
      },
      {
        label: 'Some concert',
        link: '/some-concert',
      },
    ],
  },
];

export default mockMenuItems;
