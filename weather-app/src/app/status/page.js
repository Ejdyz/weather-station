import {getWeatherStationStatus} from "@/lib/weatherData";
import StatusPage from "@/app/status/StatusPage";

export const fetchCache = 'force-no-store';

export const metadata = {
  title: 'Status',
  description: 'Status page of the weather station',
};
const Page = async () => {
  const fetchIncidentData = async () => {
      const res = await fetch('https://uptime.betterstack.com/api/v2/incidents?monitor_id=1799772&per_page=50',{
        cache: 'no-store',
        headers: {
          "authorization": "Bearer Uetq8qJyEvWHKcRQfS3RuERH",
        },
      })
      return await res.json()
  };

  const incidents = await fetchIncidentData()

  const data = await getWeatherStationStatus()

  return(
    <StatusPage data={data} statusData={incidents} />
  )
};

export default Page;