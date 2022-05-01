import type { actionObject } from '../components/SideBar/types';

const customActionsList: actionObject[] = [
  {
    name: 'action1',
    displayName: 'Action 1',
    icon: '/action1-icon.png',
    active: true,
    description: 'This is action 1',
    path: '/execute/action1',
  },
  {
    name: 'action2',
    displayName: 'Action 2',
    icon: '/action2-icon.png',
    active: true,
    description: 'This is action 2',
    path: '/execute/action2',
  },
];
const customCookie: string = '';
const customuploadingAndDownloadingAction: actionObject[] = [
  {
    name: 'uploadingAction',
    displayName: 'Uploading Action',
    icon: '/uploading-action-icon.png',
    active: true,
    description: 'This is uploading action',
    path: '/execute/uploadingAction',
  },
  {
    name: 'downloadingAction',
    displayName: 'Downloading Action',
    icon: '/downloading-action-icon.png',
    active: true,
    description: 'This is downloading action',
    path: '/execute/downloadingAction',
  },
];

export { customActionsList, customCookie, customuploadingAndDownloadingAction };
