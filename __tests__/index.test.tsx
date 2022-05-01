import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/index';
import { customActionsList, customCookie, customuploadingAndDownloadingAction } from '../__mocks__/home';

describe('Home', () => {
  // it('gets correct data', async () => {
  //   let response: { props: IProps } | null = null;
  //   let error = null;
  //   try {
  //     response = await getServerSideProps();
  //   } catch (error) {
  //     error = error;
  //   }

  //   expect(error).toBeNull();

  //   expect(response).not.toBeNull();
  //   expect(response).toBeTruthy();
  //   expect(response?.props.error).toBeUndefined();

  //   // expect(value).toEqual({ props: { businessName: 'Name', businessID: 'fjdks' } });
  // });

  it('renders correctly', async () => {
    render(<Home actionsList={customActionsList} cookie={customCookie} uploadingAndDownloadingAction={customuploadingAndDownloadingAction} />);

    const heading = screen.getByRole('heading', {
      name: customActionsList[0].displayName,
    });
    expect(heading).toBeInTheDocument();

    const desc = screen.getByText(customActionsList[0].description, { exact: true });
    expect(desc).toBeInTheDocument();

    const configs = screen.getByText('Configurations', { exact: true });
    expect(configs).toBeInTheDocument();
  });
});
