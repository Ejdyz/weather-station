import {getWeatherStationStatus} from "@/lib/weatherData";

export const fetchCache = 'force-no-store';

const Page = async () => {
  const data = await getWeatherStationStatus()
  return (
    <>
      <h1>Status</h1>
      <p>{"Weather Station Status:" + (data.isActive?"Active":"Inactive")}</p>
      <p>{"Weather Station Last Updated:" + data.data.updatedAt}</p>
    </>
  );
};

export default Page;