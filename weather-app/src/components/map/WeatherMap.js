import "./mapcrop.css"
const WeatherMap = () => {
  //OPenWeatherMap
  // return (
  //   <div className="iframe-container ">
  //     <iframe
  //       src="https://openweathermap.org/weathermap?basemap=map&cities=true&layer=radar&lat=50.0860&lon=14.4223&zoom=5"
  //       width="100%"
  //       className=" rounded-3xl  h-[200vh]"
  //     />
  //   </div>
  //);

  //Ventusky
  // https://www.ventusky.com/?p=50.6;13.8;5&l=temperature-2m

  //rainviewer
  return (
    <div className="p-2">
      <iframe
        src="https://www.rainviewer.com/map.html?loc=47.8721,14.7217,4&oFa=0&oC=0&oU=0&oCS=1&oF=0&oAP=1&c=1&o=83&lm=1&layer=radar&sm=1&sn=1&hu=false"
        width="100%"

        className="h-[90vh] rounded-2xl"
      />
    </div>
  );
};

export default WeatherMap;