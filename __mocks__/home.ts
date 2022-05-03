import type { actionObject } from '../components/SideBar/types';
import { AppError } from '../utils/error';

const customActionsList: actionObject[] = [
  {
    name: 'customAction1',
    displayName: 'Action 1',
    icon: '/servestatic/icon/testIcon.svg',
    active: false,
    description: 'Description for an action',
    path: '/execute/customAction1',
  },
  {
    name: 'customAction2',
    displayName: 'Action 2',
    icon: '/servestatic/icon/testIcon.svg',
    active: false,
    description: 'Description for an action',
    path: '/execute/customAction2',
  },
];
const customCookie: string = 'Hello world out there';
const customuploadingAndDownloadingAction: actionObject[] = [
  {
    name: 'customAction1',
    displayName: 'Action 1',
    icon: '/servestatic/icon/testIcon.svg',
    active: false,
    description: 'Description for an action',
    path: '/execute/customAction1',
  },
  {
    name: 'customAction2',
    displayName: 'Action 2',
    icon: '/servestatic/icon/testIcon.svg',
    active: false,
    description: 'Description for an action',
    path: '/execute/customAction2',
  },
];
const customAppError: AppError = new AppError('InternalServerError', 'Internal server error');

export { customActionsList, customCookie, customuploadingAndDownloadingAction, customAppError };
