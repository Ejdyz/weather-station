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
    beaufort: "Beaufortova škála",
    beaufort_number: "Stupeň",
    beaufort_description: [
      "Bezvětří",
      "Vánek",
      "Slabý vítr",
      "Mírný vítr",
      "Dosti čerstvý vítr",
      "Čerstvý vítr",
      "Silný vítr",
      "Prudký vítr",
      "Bouřlivý vítr",
      "Vichřice",
      "Silná vichřice",
      "Mohutná vichřice",
      "Orkán"
    ],
    sky_condition: 'Oblačnost',
    sky_conditions: {
      clear: 'Jasno',
      partly_cloudy: 'Částečně oblačno',
      cloudy: 'Oblačno',
      overcast: 'Zataženo',
      rain: 'Déšť',
      snow: 'Sníh',
      thunderstorm: 'Bouřka',
      fog: 'Mlha'
    },
    temperature: 'Teplota',
    apparent: 'Pocitová teplota',
    apparent_short: 'Pocitová',
    dew_point: 'Rosný bod',
    humidity: 'Vlhkost',
    pressure: 'Relativní tlak',
    pressure_at_sea_level: 'Tlak na hladině moře',
    saturation_vapor_pressure: 'Sytostní tlak vodní páry',
    vapor_pressure: 'Tlak vodní páry',
    wind_speed: 'Rychlost větru',
    max_wind_speed: 'Maximální rychlost větru za posledních 5 minut',
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
    rain_conditions:{
      light: 'Lehké', //<2,5mm/h
      moderate: 'Střední', //2,5<= i <10 mm/h
      heavy: 'Silné' //>=10 mm/h
    },
    time: 'Čas'
  },
  zodiac: {
    aries: 'Beran',
    taurus: 'Býk',
    gemini: 'Blíženci',
    cancer: 'Rak',
    leo: 'Lev',
    virgo: 'Panna',
    libra: 'Váhy',
    scorpio: 'Štír',
    sagittarius: 'Střelec',
    capricorn: 'Kozoroh',
    aquarius: 'Vodnář',
    pisces: 'Ryby'
  },
  moon_phases: {
    new: "Nov",
    waxing_crescent: "Rostoucí srpek",
    first_quarter: "První čtvrt",
    waxing_gibbous: "Rostoucí gibbous",
    full: "Úplněk",
    waning_gibbous: "Ubývající gibbous",
    last_quarter: "Poslední čtvrt",
    waning_crescent: "Ubývající srpek"
  },
  golden_hour: 'Zlatá hodina',
  days_of_week: {
    monday: 'Pondělí',
    tuesday: 'Úterý',
    wednesday: 'Středa',
    thursday: 'Čtvrtek',
    friday: 'Pátek',
    saturday: 'Sobota',
    sunday: 'Neděle'
  },
  months: {
    january: {
      long: 'Leden',
      short: 'Led',
      genitive: 'Ledna'
    },
    february: {
      long: 'Únor',
      short: 'Úno',
      genitive: 'Února'
    },
    march: {
      long: 'Březen',
      short: 'Bře',
      genitive: 'Března'
    },
    april: {
      long: 'Duben',
      short: 'Dub',
      genitive: 'Dubna'
    },
    may: {
      long: 'Květen',
      short: 'Kvě',
      genitive: 'Květnu'
    },
    june: {
      long: 'Červen',
      short: 'Čvn',
      genitive: 'Června'
    },
    july: {
      long: 'Červenec',
      short: 'Čvc',
      genitive: 'Července'
    },
    august: {
      long: 'Srpen',
      short: 'Srp',
      genitive: 'Srpna'
    },
    september: {
      long: 'Září',
      short: 'Zář',
      genitive: 'Září'
    },
    october: {
      long: 'Říjen',
      short: 'Říj',
      genitive: 'Října'
    },
    november: {
      long: 'Listopad',
      short: 'Lis',
      genitive: 'Listopadu'
    },
    december: {
      long: 'Prosinec',
      short: 'Pro',
      genitive: 'Prosince'
    }
  },
  multiSelect:{
    selectAll: "Vybrat vše",
    more: "další",
    placeholder: "Vyberte možnosti",
    options: "možností",
    clear: "Vymazat",
    close: "Zavřít"
  },
  historyTableSortItems: {
    date: "Datum",
    max_temperature:"Max. Teplota",
    avg_temperature:"Průměrná Teplota",
    min_temperature:"Min. Teplota",

    max_humidity:"Max. Vlhkost",
    avg_humidity:"Průměrná Vlhkost",
    min_humidity:"Min. Vlhkost",

    max_pressure:"Max. Tlak",
    avg_pressure:"Průměrný Tlak",
    min_pressure:"Min. Tlak",

    max_wind_speed:"Max. Rychlost větru",
    avg_wind_speed:"Průměrná Rychlost větru",
    min_wind_speed:"Min. Rychlost větru",

    wind_direction:"Směr větru",

    max_rain:"Max. Srážky",
    all_rain:"Všechny srážky",
    sunrise:"Východ slunce",
    sunset:"Západ slunce",

    moonrise:"Východ měsíce",
    moonset:"Západ měsíce",
    moon_phase:"Fáze měsíce",
    golden_hour_start:"Začátek zlaté hodiny",
    golden_hour_end:"Konec zlaté hodiny",

    noData: "Žádná data pro vybraný rozsah"
  },
  historyRecordsSortItems: {
    date: "Datum",

    temperature: "Teplota",
    app_temperature:"Pocitová Teplota",
    humidity:"Relativní Vlhkost",

    pressure:"Relativní Tlak",
    pressure_at_sea_level:"Tlak na hladině moře",
    wind_speed:"Rychlost větru",

    max_wind_speed:"Max. Rychlost větru",
    wind_direction:"Max. Rychlost větru",
    rain_mm:"Průměrná Rychlost větru",

    dew_point:"Min. Rychlost větru",
    saturation_vapor_pressure:"Směr větru",
    vapor_pressure:"Max. Srážky",

    noData: "Žádná data pro vybraný rozsah"
  }
} as const;