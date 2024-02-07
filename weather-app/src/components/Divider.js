const Divider = ({children, props, gap}) => {
  return (
    <div {...props} className={"flex flex-row w-full " + (gap?" gap-x-1":" ")}>
      <div className="border-b-1 translate-y-[-50%] w-full" />
      {children}
      <div className="border-b-1 translate-y-[-50%] w-full" />
    </div>
  );
};

export default Divider;