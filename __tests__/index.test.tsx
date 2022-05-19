import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home, { getServerSideProps } from '../pages/index';
import { customActionsList, customCookie, customuploadingAndDownloadingAction, customAppError } from '../__mocks__/home';
import * as axiosInterceptor from '../utils/axiosInterceptor';
import { notDeepEqual } from 'assert';

describe('Home', () => {
  it('renders correctly without error', async () => {
    render(<Home actionsList={customActionsList} cookie={customCookie} uploadingAndDownloadingAction={customuploadingAndDownloadingAction} />);

    const navbarHeading = screen.getByText('PiXS - Image Manipulation Extended', { exact: true });
    expect(navbarHeading).toBeInTheDocument();

    const actionHeading = screen.getByRole('heading', {
      name: customActionsList[0].displayName,
    });
    expect(actionHeading).toBeInTheDocument();

    const desc = screen.getByText(customActionsList[0].description, { exact: true });
    expect(desc).toBeInTheDocument();

    const configs = screen.getByText('Configurations', { exact: true });
    expect(configs).toBeInTheDocument();

    const configsTest = screen.getByText('You must first upload an image!', { exact: true });
    expect(configsTest).toBeInTheDocument();
    expect(configsTest).toBeVisible();
  });

  it('renders correctly on error', async () => {
    render(<Home actionsList={customActionsList} cookie={customCookie} uploadingAndDownloadingAction={customuploadingAndDownloadingAction} error={customAppError.toString()} />);

    expect(() =>
      screen.getByRole('heading', {
        name: customActionsList[0].displayName,
      }),
    ).toThrow();

    expect(() => screen.getByText(customActionsList[0].description, { exact: true })).toThrow();
    expect(() => screen.getByText('Configurations', { exact: true })).toThrow();
    expect(() => screen.getByText('You must first upload an image!', { exact: true })).toThrow();

    const modalButton = screen.getByRole('button', {
      name: 'Reload',
    });
    expect(modalButton).toBeInTheDocument();
  });

  /**
   * @jest-environment node
   */
  // it('gets mock data on error', async () => {
  //   const spy = jest.spyOn(axiosInterceptor, 'axiosGetIpInterceptor').mockImplementation(async () => {
  //     const customReturn = {
  //       data: {
  //         actionsList: customActionsList,
  //         cookie: 'awdawdawdawda',
  //         uploadingAndDownloadingAction: customuploadingAndDownloadingAction,
  //       },
  //     };
  //     return Promise.resolve(customReturn);
  //   });

  //   const { props } = await getServerSideProps();

  //   // expect(props.error).toBeUndefined();
  //   expect(props.actionsList).toEqual(customActionsList);
  //   expect(props.cookie).not.toEqual('');
  //   expect(props.uploadingAndDownloadingAction).toEqual(customuploadingAndDownloadingAction);
  // });
});
