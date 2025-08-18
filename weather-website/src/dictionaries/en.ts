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
    temperature: 'Temperature',
    apparent: 'Apparent temperature',
    dew_point: 'Dew point',
    humidity: 'Humidity',
    pressure: 'Pressure',
    wind_speed: 'Wind speed',
    wind_direction: 'Wind direction',
    rain: 'Rain',
    time: 'Time'
  }
} as const;
