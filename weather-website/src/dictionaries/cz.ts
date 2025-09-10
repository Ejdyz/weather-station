export default {
  metadata:{
    title: "Počasí Proboštov",
    short_name: "Počasí",
    description: "Meteorologická stanice s webovým rozhraním pro sledování aktuálních a historických dat o počasí ve vesnici Proboštov za pomoci vlastní metrologické stanice."
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
    full: "Úplněk",
    waxing_crescent: "Přibývající srpek",
    waxing_gibbous: "Přibývající měsíc",
    first_quarter: "První čtvrt",
    last_quarter: "Poslední čtvrt",
    waning_gibbous: "Ubývající srpek",
    waning_crescent: "Ubývající měsíc"
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
    dew_point:"Rosný Bod",
    
    humidity:"Relativní Vlhkost",

    pressure:"Relativní Tlak",
    pressure_at_sea_level:"Tlak na hladině moře",
    saturation_vapor_pressure:"Sytostní tlak vodní páry",
    vapor_pressure:"Tlak vodní páry",
    
    wind_speed:"Rychlost větru",
    max_wind_speed:"Max. Rychlost větru",
    rain_mm:"Srážky",
    wind_direction:"Směr větru",


    noData: "Žádná data pro vybraný rozsah"
  },
  footer: {
    language: "Jazyk",
    allRightsReserved: "Všechna práva vyhrazena",
    lastRecord: "Poslední změna"
  }
} as const;