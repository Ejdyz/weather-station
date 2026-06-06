export default {
  metadata:{
    title: "Weather Proboštov",
    description: "Meteorological station with a web interface for monitoring current and historical weather data in the village of Proboštov using its own meteorological station."
  },
  data: {
    beaufort: "Beaufort scale",
    beaufort_number: "Beaufort number",
    beaufort_description: [
      "Calm",
      "Light air",
      "Light breeze",
      "Gentle breeze",
      "Moderate breeze",
      "Fresh breeze",
      "Strong breeze",
      "Moderate gale",
      "Gale",
      "Strong gale",
      "Storm",
      "Violent storm",
      "Hurricane"
    ],
    sky_condition: 'Sky condition',
    sky_conditions: {
      clear: 'Clear',
      partly_cloudy: 'Partly cloudy',
      cloudy: 'Cloudy',
      overcast: 'Overcast',
      rain: 'Rain',
      snow: 'Snow',
      thunderstorm: 'Thunderstorm',
      fog: 'Fog'
    },
    temperature: 'Temperature',
    apparent: 'Apparent temperature',
    apparent_short: 'Apparent',
    dew_point: 'Dew point',
    humidity: 'Humidity',
    pressure: 'Relative pressure',
    pressure_at_sea_level: 'Pressure at sea level',
    saturation_vapor_pressure: 'Saturation vapor pressure',
    vapor_pressure: 'Vapor pressure',
    wind_speed: 'Wind speed',
    max_wind_speed_1m: 'Max wind speed in past minute',
    min_wind_speed_1m: 'Min wind speed in past minute',
    max_wind_speed_5m: 'Max wind speed in past 5 minutes',
    min_wind_speed_5m: 'Min wind speed in past 5 minutes',
    wind_direction: 'Wind direction',
    wind_direction_cardinal: {
      N: 'North',
      NE: 'Northeast',
      E: 'East',
      SE: 'Southeast',
      S: 'South',
      SW: 'Southwest',
      W: 'West',
      NW: 'Northwest'
    },
    rain: 'Rain',
    rain_conditions:{
      light: 'Light', //<2,5mm/h
      moderate: 'Moderate', //2,5<= i <10 mm/h
      heavy: 'Heavy' //>=10 mm/h
    },
    time: 'Time'
  },
  zodiac: {
    aries: 'Aries',
    taurus: 'Taurus',
    gemini: 'Gemini',
    cancer: 'Cancer',
    leo: 'Leo',
    virgo: 'Virgo',
    libra: 'Libra',
    scorpio: 'Scorpio',
    sagittarius: 'Sagittarius',
    capricorn: 'Capricorn',
    aquarius: 'Aquarius',
    pisces: 'Pisces'
  },
  moon_phases: {
    new: 'New Moon',
    waxing_crescent: 'Waxing Crescent',
    first_quarter: 'First Quarter',
    waxing_gibbous: 'Waxing Gibbous',
    full: 'Full Moon',
    waning_gibbous: 'Waning Gibbous',
    last_quarter: 'Last Quarter',
    waning_crescent: 'Waning Crescent'
  },
  golden_hour: 'Golden Hour',
  days_of_week: {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  },
    months: {
    january: {
      long: 'January',
      short: 'Jan',
      genitive: 'January'
    },
    february: {
      long: 'February',
      short: 'Feb',
      genitive: 'February'
    },
    march: {
      long: 'March',
      short: 'Mar',
      genitive: 'March'
    },
    april: {
      long: 'April',
      short: 'Apr',
      genitive: 'April'
    },
    may: {
      long: 'May',
      short: 'May',
      genitive: 'May'
    },
    june: {
      long: 'June',
      short: 'Jun',
      genitive: 'June'
    },
    july: {
      long: 'July',
      short: 'Jul',
      genitive: 'July'
    },
    august: {
      long: 'August',
      short: 'Aug',
      genitive: 'August'
    },
    september: {
      long: 'September',
      short: 'Sep',
      genitive: 'September'
    },
    october: {
      long: 'October',
      short: 'Oct',
      genitive: 'October'
    },
    november: {
      long: 'November',
      short: 'Nov',
      genitive: 'November'
    },
    december: {
      long: 'December',
      short: 'Dec',
      genitive: 'December'
    }
  },
  multiSelect: {
    selectAll: "Select All",
    more: "more",
    placeholder: "Select options",
    options: "options",
    clear: "Clear",
    close: "Close"
  },
  historyTableSortItems: {
    date: "Date",
    max_temperature:"Max Temperature",
    avg_temperature:"Average Temperature",
    min_temperature:"Min Temperature",

    max_humidity:"Max Humidity",
    avg_humidity:"Average Humidity",
    min_humidity:"Min Humidity",

    max_pressure:"Max Pressure",
    avg_pressure:"Average Pressure",
    min_pressure:"Min Pressure",

    max_wind_speed:"Max Wind Speed",
    avg_wind_speed:"Average Wind Speed",
    min_wind_speed:"Min Wind Speed",

    wind_direction:"Wind Direction",

    max_rain:"Max Rain",
    all_rain:"All Rain" ,
    sunrise:"Sunrise",
    sunset:"Sunset",

    moonrise:"Moonrise",
    moonset:"Moonset",
    moon_phase:"Moon Phase" ,
    golden_hour_start:"Golden Hour Start",
    golden_hour_end:"Golden Hour End",

    noData: "No Data for selected range"
  },
  historyRecordsSortItems: {
    date: "Datum",

    temperature: "Temperature",
    app_temperature:"Apparent Temperature",
    humidity:"Humidity",

    pressure:"Pressure",
    pressure_at_sea_level:"Pressure at Sea Level",
    wind_speed:"Wind Speed",

    max_wind_speed:"Max. Wind Speed",
    min_wind_speed:"Min. Wind Speed",
    wind_direction:"Wind Direction",
    rain_mm:"Rain (mm)",

    dew_point:"Dew Point",
    saturation_vapor_pressure:"Saturation Vapor Pressure",
    vapor_pressure:"Vapor Pressure",

    noData: "No Data for selected range"
  },
  footer: {
    language: "Language",
    allRightsReserved: "All rights reserved",
    lastRecord: "Last update"
  }
} as const;
