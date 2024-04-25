import Divider from "@/components/Divider";

const Footer = ({data}) => {
  let time = new Date(data.time)
  const timeString = time.getDate() + "." + (time.getMonth() + 1) + "  " + ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(time.getHours()) ? "0" + time.getHours() : "" + time.getHours()) + ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(time.getMinutes()) ? ":0" + time.getMinutes() : ":" + time.getMinutes())
  return (
    <div className="w-full h-14 flex justify-center flex-col text-white items-center">
      <Divider />
      <h3 className="mt-4 mb-4">
        Poslení aktualizace:  {timeString}
      </h3>
    </div>
  );
};

export default Footer;