import Divider from "@/components/Divider";

const Footer = ({data}) => {
  return (
    <div className="w-full h-14 flex justify-center flex-col text-white items-center">
      <Divider />
      <h3 className="mt-4 mb-4">
        Poslení aktualizace:  {new Date(data.time).getDate()}.{new Date(data.time).getMonth() + 1}.{new Date(data.time).getFullYear()} {new Date(data.time).getHours()}:{new Date(data.time).getMinutes()}
      </h3>
    </div>
  );
};

export default Footer;