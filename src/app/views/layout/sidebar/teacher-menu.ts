import { MenuItem } from './menu.model';

export const TEACHER_MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard'
  },
  {
    label: 'Web Apps',
    isTitle: true
  },
  {
    label: 'My Calendar',
    icon: 'calendar',
    link: '/my-calendar',
    badge: {
      variant: 'primary',
      text: 'Event',
    }
  },
];
