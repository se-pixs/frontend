interface IProps {
  className?: string;
  title: string;
  description: string;
}

function Title(props: IProps) {
  return (
    <div className='mb-10'>
      <h1 className='text-3xl font-bold'>{props.title}</h1>
      <p className='text-xl'>{props.description}</p>
    </div>
  );
}

export default Title;
