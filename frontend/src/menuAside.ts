import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ?? icon.mdiTable,
    permissions: 'READ_USERS'
  },
  {
    href: '/projects/projects-list',
    label: 'Projects',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiFolder' in icon ? icon['mdiFolder' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_PROJECTS'
  },
  {
    href: '/reports/reports-list',
    label: 'Reports',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiFileDocument' in icon ? icon['mdiFileDocument' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_REPORTS'
  },
  {
    href: '/scans/scans-list',
    label: 'Scans',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiMagnify' in icon ? icon['mdiMagnify' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_SCANS'
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

 {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS'
  },
]

export default menuAside
