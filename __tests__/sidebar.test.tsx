import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SideBar from '../components/SideBar';
import { customActionsList } from '../__mocks__/home';

describe('Sidebar', () => {
  it('shows actions correctly', async () => {
    const selectedAction = customActionsList[0].name;
    render(
      <SideBar
        actionsList={customActionsList}
        selectedAction={selectedAction}
        onSelectAction={function (_name: string): void {
          console.log('Hello world');
        }}
      />,
    );

    customActionsList.forEach((e) => {
      const sidebarElement = screen.getByText(e.displayName, { exact: true });
      expect(sidebarElement).toBeInTheDocument();
    });
  });
});
