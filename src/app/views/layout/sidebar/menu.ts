import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard',
    profiles: ['super_admin', 'admin', 'company_admin', 'teacher', 'director'],
  },
  {
    label: 'Web Apps',
    isTitle: true
  },
  {
    label: 'Calendar',
    icon: 'calendar',
    link: '/calendar',
    badge: {
      variant: 'primary',
      text: 'By classroom',
    },
    profiles: ['super_admin', 'admin', 'company_admin', 'teacher', 'director'],
  },
  {
    label: 'Calendar',
    icon: 'calendar',
    link: '/calendar-by-teacher',
    badge: {
      variant: 'primary',
      text: 'By teacher',
    },
    profiles: ['super_admin', 'admin', 'company_admin', 'director'],
  },
  {
    label: 'Calendar',
    icon: 'calendar',
    link: '/my-calendar',
    badge: {
      variant: 'primary',
      text: 'My calendar',
    },
    profiles: ['teacher', 'director'],
  },
  {
    label: 'Admin',
    isTitle: true
  },
  {
    label: 'Users',
    icon: 'user',
    link: '/user',
    profiles: ['super_admin'],
  },
  {
    label: 'Teachers',
    icon: 'user',
    link: '/teacher',
    profiles: ['super_admin'],
  },
  {
    label: 'Events',
    icon: 'check-circle',
    profiles: ['super_admin', 'admin', 'company_admin'],
    subItems: [
      {
        label: 'Add event (s)',
        link: '/event/new',
        profiles: ['super_admin', 'admin', 'company_admin'],
      },
      {
        label: 'Suspend events',
        link: '/event',
        profiles: ['super_admin'],
      },
      {
        label: 'Event Types',
        link: '/event-type',
        profiles: ['super_admin'],
      },
      /*
      {
        label: 'Modify group events',
        link: '/event/modify-group-events',
        profiles: ['super_admin', 'company_admin'],
      }*/
    ]
  },
  {
    label: 'Organisation',
    icon: 'folder',
    profiles: ['super_admin'],
    subItems: [
      {
        label: 'Departments',
        link: '/department',
        profiles: ['super_admin'],
      },
      {
        label: 'Classrooms',
        link: '/classroom',
        profiles: ['super_admin'],
      },
      {
        label: 'Companies',
        link: '/company',
        profiles: ['super_admin'],
      },
    ]
  },
  {
    label: 'Holidays',
    icon: 'sun',
    link: '/holiday',
    profiles: ['super_admin', 'teacher'],
  },
  {
    label: 'Teaching hours',
    icon: 'clock',
    link: '/teaching-hours',
    profiles: ['super_admin', 'admin', 'company_admin', 'director'],
  },
  {
    label: 'Logs',
    icon: 'list',
    profiles: ['super_admin'],
    subItems: [
      {
        label: 'Log history',
        link: '/logs',
        profiles: ['super_admin'],
      },
      {
        label: 'Event change logs',
        link: '/event-logs',
        profiles: ['super_admin'],
      },
    ]
  }
];
