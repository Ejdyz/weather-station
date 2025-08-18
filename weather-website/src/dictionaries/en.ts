export default {
  landing: {
    title: 'Site under development!',
    body1: 'A new site is coming soon bringing many new features and improvements.',
    body2: 'Clicking the Github button takes you to the repository where you can follow project development.',
    planned: 'Planned improvements:',
    planned_list: [
      'New design and UI',
      'New sensors for weather measurement',
      'Better stability and reliability'
    ],
    tab_landing: 'Intro',
    tab_data: 'Data',
    github: 'Github',
    data_title: 'Temporary data display'
  },
  data: {
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
    dew_point: 'Dew point',
    humidity: 'Humidity',
    pressure: 'Pressure',
    wind_speed: 'Wind speed',
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
  moon_phase:{
    new_moon: 'New Moon',
    waxing_crescent: 'Waxing Crescent',
    first_quarter: 'First Quarter',
    waxing_gibbous: 'Waxing Gibbous',
    full_moon: 'Full Moon',
    waning_gibbous: 'Waning Gibbous',
    last_quarter: 'Last Quarter',
    waning_crescent: 'Waning Crescent'
  },
} as const;
