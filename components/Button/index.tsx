interface IProps {
  className?: string;
  children: React.ReactNode;
  onclick?: () => void | any;
  disabled?: boolean;
  type?: 'default' | 'error';
}

function Button(props: IProps) {
  const defaultStyling: string =
    'px-10 py-2 font-bold rounded-lg border-2 border-solid border-customblue-200 text-customblue-200 bg-customwhite-500 hover:text-customwhite-500 hover:bg-customblue-200 active:text-customwhite-500 active:bg-customblue-100 active:border-customblue-100 disabled:opacity-50 disabled:bg-transparent disabled:text-customblue-200 disabled:border-customblue-200 disabled:cursor-default';
  const errorStyling: string =
    'px-10 py-2 font-bold rounded-lg border-2 border-solid border-red-500 text-red-500 bg-customwhite-500 hover:text-customwhite-500 hover:bg-red-500 active:text-customwhite-500 active:bg-red-600 active:border-red-100 disabled:opacity-50 disabled:bg-transparent disabled:text-red-200 disabled:border-red-200 disabled:cursor-default';

  return (
    <button disabled={props.disabled} onClick={props.onclick} className={(props.type === 'error' ? errorStyling : defaultStyling) + ' ' + props.className}>
      {props.children}
    </button>
  );
}

export default Button;
