import { Component } from 'react';
import { motion } from 'framer-motion';
import SideBarElement from '../SideBarElement';
import { actionObject } from './types';

interface IState {
  isBig: boolean;
  actionsList: actionObject[] | null;
}

interface IProps {
  actionsList: actionObject[] | null;
  selectedAction: string;
  onSelectAction: (name: string) => void;
}

class SideBar extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isBig: true,
      actionsList: this.props.actionsList,
    };
  }

  handleClick(): void {
    this.setState((state) => ({
      isBig: !state.isBig,
    }));
  }

  handler(name: string): void {
    this.props.onSelectAction(name);
  }

  render() {
    const big: string = '';
    const small: string = 'w-20';
    const hamburger: React.ReactNode = (
      <svg xmlns='http://www.w3.org/2000/svg' className='h-10 w-10' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
      </svg>
    );
    const cross: React.ReactNode = (
      <svg xmlns='http://www.w3.org/2000/svg' className='h-10 w-10' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
      </svg>
    );

    return (
      <div className={'bg-customblue-500 h-full text-customwhite-500 ' + (this.state.isBig ? big : small)}>
        <motion.button animate={{ rotate: this.state.isBig ? 90 : 0 }} className='text-center px-4 py-8' onClick={() => this.handleClick()}>
          {this.state.isBig ? cross : hamburger}
        </motion.button>
        {this.state.actionsList !== null &&
          this.state.actionsList.map((action: actionObject) => (
            <div key={action.name} onClick={() => this.handler(action.name)}>
              <SideBarElement isBig={this.state.isBig} active={action.name === this.props.selectedAction} name={action.name} icon={action.icon} />
            </div>
          ))}
      </div>
    );
  }
}

export default SideBar;
