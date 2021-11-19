interface IProps {
  className?: string;
  name: string;
  description: string;
  onValueChange: (value: string, name: string) => void;
}

function ValueFieldInput(props: IProps) {
  function handler(event: any) {
    props.onValueChange(event.target.value, props.name);
  }

  return (
    <div className={props.className + ' align-middle'}>
      <label className='float-left py-1'>{props.name + ':'}</label>
      <input className='float-right w-32 border border-gray-400 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-custompurple-400' onChange={(event) => handler(event)} />
    </div>
  );
}

export default ValueFieldInput;
