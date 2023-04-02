export type Hyperlink = {
  name: string;
  path: string;
}

export const CONSTANTS = {
  APP_NAME: 'Project Management'
}

export const ApplicationLinks: Hyperlink[] = [
  {
    name: 'Companies',
    path: '/companies'
  },
  {
    name: 'Projects',
    path: '/projects'
  },
]