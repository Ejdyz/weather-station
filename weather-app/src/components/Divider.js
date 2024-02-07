const Divider = ({children, props}) => {
  return (
    <div {...props} className="flex flex-row w-full gap-x-1">
      <div className="border-b-1 translate-y-[-50%] w-full" />
      {children}
      <div className="border-b-1 translate-y-[-50%] w-full" />
    </div>
  );
};

export default Divider;