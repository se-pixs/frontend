import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DownloadField from '../components/DownloadField';

import { imgData } from '../__mocks__/download';

const handleReverse = jest.fn();
const handleDeleteAndRety = jest.fn();

describe('DownloadField', () => {
  beforeEach(() => {
    render(<DownloadField imageData={imgData} deleteAndRetry={handleDeleteAndRety} reverse={handleReverse} />);
  });

  it('renders correctly for specific image', async () => {
    const downloadButton = screen.getByRole('button', { name: /Download/i });
    expect(downloadButton).toBeInTheDocument();

    const reverseButton = screen.getByRole('button', { name: /Reverse/i });
    expect(reverseButton).toBeInTheDocument();

    const deleteAndRetryButton = screen.getByRole('button', { name: /Delete\sand\sRetry/i });
    expect(deleteAndRetryButton).toBeInTheDocument();

    fireEvent.click(downloadButton);
  });

  it('performs right action on download', async () => {
    const downloadButton = screen.getByRole('button', { name: /Download/i });

    const a = fireEvent.click(downloadButton);
    console.log(a);
  });

  it('performs right action on reverse', async () => {
    const reverseButton = screen.getByRole('button', { name: /Reverse/i });

    fireEvent.click(reverseButton);
    expect(handleReverse).toHaveBeenCalledTimes(1);
  });

  it('performs right action on delete and retry when choosing NO', async () => {
    const deleteAndRetryButton = screen.getByRole('button', { name: /Delete\sand\sRetry/i });
    fireEvent.click(deleteAndRetryButton);

    const modalButtonNo = screen.getByRole('button', { name: /No/i });
    expect(modalButtonNo).toBeInTheDocument();

    fireEvent.click(modalButtonNo);

    expect(modalButtonNo).not.toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(handleDeleteAndRety).toHaveBeenCalledTimes(0);
  });

  it('performs right action on delete and retry when choosing YES', async () => {
    const deleteAndRetryButton = screen.getByRole('button', { name: /Delete\sand\sRetry/i });
    fireEvent.click(deleteAndRetryButton);

    const modalButtonYes = screen.getByRole('button', { name: /Yes/i });
    expect(modalButtonYes).toBeInTheDocument();

    fireEvent.click(modalButtonYes);

    expect(modalButtonYes).not.toBeInTheDocument();
    expect(handleDeleteAndRety).toHaveBeenCalledTimes(1);
  });
});
