export default function WeatherRadar() {
  return (
    <iframe className="w-full h-[70dvh] rounded-sm inverted-colors:*:" src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=m/s&zoom=4&overlay=radar&product=radar&level=surface&lat=49.325&lon=15.82&message=true" />
  )
}
