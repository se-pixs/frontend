import { Component } from 'react';
import { motion } from 'framer-motion';
import SideBarElement from '../SideBarElement';

interface IState {
  isBig: boolean;
  actionsList: actionObject[];
}

interface IProps {
  actionsList: actionObject[];
}

interface actionObject {
  name: string;
  icon: React.ReactNode;
  active: boolean;
}

class SideBar extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.checkActionList = this.checkActionList.bind(this);

    let newActionList: actionObject[] = [];

    if (this.props.actionsList.length > 0) {
      newActionList = this.checkActionList();
    }

    this.state = {
      isBig: true,
      actionsList: newActionList,
    };
  }

  checkActionList(): actionObject[] {
    let newActionList: actionObject[] = this.props.actionsList;

    let flag: boolean = false;
    for (let p of newActionList) {
      if (p.active) {
        if (!flag) {
          flag = true;
        } else {
          p.active = false;
        }
      }
    }
    if (!flag) {
      newActionList[0].active = true;
    }

    return newActionList;
  }

  handleClick(): void {
    this.setState((state) => ({
      isBig: !state.isBig,
    }));
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
      <div className={'bg-customblue-500 h-full text-customwhite ' + (this.state.isBig ? big : small)}>
        <motion.button animate={{ rotate: this.state.isBig ? 90 : 0 }} className='text-center px-4 py-8' onClick={() => this.handleClick()}>
          {this.state.isBig ? cross : hamburger}
        </motion.button>
        {this.state.actionsList.map((action: actionObject) => (
          <SideBarElement key={action.name} isBig={this.state.isBig} active={action.active} name={action.name} icon={action.icon} />
        ))}
      </div>
    );
  }
}

export default SideBar;
