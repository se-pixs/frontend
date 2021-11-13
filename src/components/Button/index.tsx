interface IProps {
  className?: string;
  children: React.ReactNode;
  onclick?: () => void;
  disabled?: boolean;
}

function Button(props: IProps) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onclick}
      className={
        'px-10 py-2 font-bold rounded-lg border-2 border-solid border-customblue-200 text-customblue-200 bg-customwhite hover:text-customwhite hover:bg-customblue-200 active:text-customwhite active:bg-customblue-100 active:border-customblue-100 disabled:opacity-50 disabled:bg-transparent disabled:text-customblue-200 disabled:border-customblue-200 disabled:cursor-default ' +
        props.className
      }>
      {props.children}
    </button>
  );
}

export default Button;
