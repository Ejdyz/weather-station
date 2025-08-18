export default {
  landing: {
    title: 'Stránka je ve vývoji!',
    body1: 'V blízké době se můžete těšit na novou stránku, která přinese spoustu nových funkcí a vylepšení.',
    body2: 'Po kliknutí na tlačítko Github se dostanete na repozitář, kde můžete sledovat vývoj projektu.',
    planned: 'Plánované vylepšení:',
    planned_list: [
      'Nový design a uživatelské rozhraní',
      'Nové senzory pro měření počasí',
      'Lepší stabilita a spolehlivost'
    ],
    tab_landing: 'Úvod',
    tab_data: 'Data',
    github: 'Github',
    data_title: 'Dočasné zobrazení dat'
  },
  data: {
    sky_condition: 'Oblačnost',
    temperature: 'Teplota',
    apparent: 'Pocitová teplota',
    dew_point: 'Rosný bod',
    humidity: 'Vlhkost',
    pressure: 'Tlak',
    wind_speed: 'Rychlost větru',
    wind_direction: 'Směr větru',
    wind_direction_cardinal:{
      N: 'Sever',
      NE: 'Severovýchod',
      E: 'Východ',
      SE: 'Jihovýchod',
      S: 'Jih',
      SW: 'Jihozápad',
      W: 'Západ',
      NW: 'Severozápad'
    },
    rain: 'Srážky',
    time: 'Čas'
  }
} as const;