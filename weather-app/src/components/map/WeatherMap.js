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
    <div className="p-4">
      <iframe
        src="https://www.rainviewer.com/map.html?loc=50.6774,14.057,7&oCS=1&oAP=1&c=1&o=55&lm=1&layer=radar&sm=1&sn=1" 
        frameborder="0"  allowfullscreen
        width="100%"
        className="h-[90vh] rounded-2xl"
      />
    </div>
  );
};

export default WeatherMap;