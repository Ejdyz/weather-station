"use client"
import {Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import IncidentBox from "@/app/status/IncidentBox";
import {CheckBadgeIcon} from "@/components/icons/Icons";
import BackButton from "@/components/BackButton";
import "../about/noSlider.css"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

const StatusPage = ({data, statusData}) => {
  const router = useRouter();
  const [timeUntilRefresh, setTimeUntilRefresh] = useState(60); // Initial time in seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeUntilRefresh(prevTime => {
        if (prevTime === 1) {
          router.refresh(); // Reload the page when timer reaches 0
          return 60; // Reset the timer
        } else {
          return prevTime - 1; // Decrease time by 1 second
        }
      });
    }, 1000); // Run every second

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []); // Run this effect only once on component mount

  let time;
  let date = new Date(data.data.time);
  date.setHours(date.getHours() + date.getTimezoneOffset()/60);
  if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(date.getMinutes())) {
    time = date.getDate() + "." + (date.getMonth() + 1) + " " + (date.getHours()) + ":0" + date.getMinutes() + ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(date.getSeconds()) ? ":0" + date.getSeconds() : ":" + date.getSeconds())
  } else {
    time = date.getDate() + "." + (date.getMonth() + 1) + " " + (date.getHours()) + ":" + date.getMinutes()+ ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(date.getSeconds()) ? ":0" + date.getSeconds() : ":" + date.getSeconds())
  }
  return (
    <>
      <BackButton />
      <div className={" w-full min-h-screen h-full bg-gradient-to-br from-slate-900 to-slate-700 text-white pb-4"}>
        <div className="w-full p-10 flex md:flex-row flex-col justify-center align-middle items-center gap-1">
          <h1 className="m-2 font-bold md:text-7xl text-6xl ">STATUS</h1>
          <div className={" p-2 px-4  rounded-3xl flex items-center " + (data.isActive ? " bg-danger" : "bg-warning")}>
            <span className="relative mx-4 flex h-10 w-10">
              <span
                className={"animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 " + (data.isActive ? "bg-lime-500" : "bg-red-600")}></span>
              <span
                className={"relative inline-flex rounded-full  h-10 w-10 " + (data.isActive ? "bg-lime-500" : "bg-red-600")}></span>
            </span>
            <h1 className="md:text-7xl text-6xl font-semibold translate-y-[-2px]">{data.isActive ? "ACTIVE" : "INACTIVE"}</h1>
          </div>
        </div>
        <br/>
        <div className={"md:p-8 p-4"}>
          <Table className="bg-slate-700 p-4 rounded-2xl text-white md:overflow-x-hidden overflow-x-scroll md:block hidden" removeWrapper aria-label="table of data">
            <TableHeader >
              <TableColumn className={" bg-slate-600 text-white font-bold text-medium"} align={"center"}>Temperature</TableColumn>
              <TableColumn className={" bg-slate-600 text-white font-bold text-medium"} align={"center"}>Humidity</TableColumn>
              <TableColumn className={" bg-slate-600 text-white font-bold text-medium"} align={"center"}>Pressure</TableColumn>
              <TableColumn className={" bg-slate-600 text-white font-bold text-medium"} align={"center"}>Light</TableColumn>
              <TableColumn className={" bg-slate-600 text-white font-bold text-medium"} align={"center"}>Rain</TableColumn>
              <TableColumn className={" bg-slate-600 text-white font-bold text-medium"} align={"center"}>Is Raining</TableColumn>
              <TableColumn className={" bg-slate-600 text-white font-bold text-medium"} align={"center"}>Time</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>{data.data.temperature} C°</TableCell>
                <TableCell>{data.data.humidity} %</TableCell>
                <TableCell>{data.data.pressure} hPa</TableCell>
                <TableCell>{data.data.light}</TableCell>
                <TableCell>{data.data.rain} %</TableCell>
                <TableCell><Chip
                  color={data.data.isRaining ? "primary" : "danger"}>{data.data.isRaining ? "Yes" : "No"}</Chip></TableCell>
                <TableCell>{time}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex flex-col gap-3 items-center md:hidden">
            <Table className="bg-slate-700 p-4 rounded-2xl text-white md:overflow-x-hidden overflow-x-scroll" removeWrapper aria-label="table of data">
              <TableHeader >
                <TableColumn className={" bg-slate-600 text-white font-bold text-medium"} align={"center"}>Temperature</TableColumn>
                <TableColumn className={" bg-slate-600 text-white font-bold text-medium"} align={"center"}>Humidity</TableColumn>
                <TableColumn className={" bg-slate-600 text-white font-bold text-medium"} align={"center"}>Pressure</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>{data.data.temperature} C°</TableCell>
                  <TableCell>{data.data.humidity} %</TableCell>
                  <TableCell>{data.data.pressure} hPa</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Table className="bg-slate-700 p-4 rounded-2xl text-white md:overflow-x-hidden overflow-x-scroll" removeWrapper aria-label="table of data">
              <TableHeader >
                <TableColumn className={" bg-slate-600 text-white font-bold text-medium"} align={"center"}>Light</TableColumn>
                <TableColumn className={" bg-slate-600 text-white font-bold text-medium"} align={"center"}>Rain</TableColumn>
                <TableColumn className={" bg-slate-600 text-white font-bold text-medium"} align={"center"}>Is Raining</TableColumn>
                <TableColumn className={" bg-slate-600 text-white font-bold text-medium"} align={"center"}>Time</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>{data.data.light}</TableCell>
                  <TableCell>{data.data.rain} %</TableCell>
                  <TableCell><Chip
                    color={data.data.isRaining ? "primary" : "danger"}>{data.data.isRaining ? "Yes" : "No"}</Chip></TableCell>
                  <TableCell>{time}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        {statusData.data.length === 0 && (
          <div className="flex w-full justify-center align-middle items-center gap-4">
            <CheckBadgeIcon className={"w-10 h-10 text-danger"}/>
            <h1 className="text-center text-2xl font-bold">No incidents</h1>
          </div>
        )}
        {
          statusData.data.map((data, index) =>
            <IncidentBox key={index} data={data} index={data} />
          )
        }
        <div className="mt-4 w-full text-center ">
          <p className="opacity-50">Refreshing in {timeUntilRefresh} seconds</p>
        </div>
      </div>
    </>
  )
};

export default StatusPage;