interface IProps {
  className?: string;
  name: string;
  description: string;
  type: string;
  options: any;
  default: string;
  onValueChange: (value: string, name: string) => void;
}

function ValueFieldInput(props: IProps) {
  function handler(event: any) {
    props.onValueChange(event.target.value, props.name);
  }

  const className = "float-right w-32 border border-gray-400 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-custompurple-400"

  return (
    <div className={props.className + ' align-middle'}>
      <label className='float-left py-1'>{props.name + ':'}</label>
      {props.type !== "dropdown" ? <input className={className} defaultValue={props.default} onChange={(event) => handler(event)} />:
      <select className={className} defaultValue={props.default} onChange={handler} placeholder="Select an option">
      {
          props.options.map((option: any) => <option key={option} value={option}>{option}</option>)
      }
      </select>}
    </div>
  );
}

export default ValueFieldInput;
