// Get the start time and count from command line arguments (format: HH:MM [count])
const [, , startTimeArg, countArg] = process.argv;

let startHour: number, startMinute: number;
const requestCount = countArg ? parseInt(countArg, 10) : 1000;

if (startTimeArg && !/^\d{2}:\d{2}$/.test(startTimeArg)) {
  console.error('Please provide a start time in HH:MM format, e.g., npm run send-status -- 14:30 1000');
  process.exit(1);
}

if (startTimeArg) {
  [startHour, startMinute] = startTimeArg.split(':').map(Number);
} else {
  const now = new Date();
  startHour = now.getHours();
  startMinute = now.getMinutes();
}

const now = new Date();
const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute, 0, 0);

async function sendStatusWithTimestamp(timestamp: string) {
  const data = generateRandomStatus(timestamp);

  try {
    const res = await fetch('http://localhost:3000/api/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    console.log(`Sent status for ${timestamp}: ${res.status}`);
  } catch (err) {
    console.error(`Error sending status for ${timestamp}:`, err);
  }
}

async function sendBatchStatuses(count: number) {
  const durations: number[] = [];
  for (let i = 0; i < count; i++) {
    const ts = new Date(start.getTime() + i * 60 * 1000).toISOString();
    const startTime = Date.now();
    await sendStatusWithTimestamp(ts);
    const duration = Date.now() - startTime;
    durations.push(duration);
  }

  if (durations.length > 0) {
    const min = Math.min(...durations);
    const max = Math.max(...durations);
    const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
    const sorted = [...durations].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2;

    console.log(`\nRequest durations (ms): min=${min}, max=${max}, avg=${avg.toFixed(2)}, median=${median}`);
  }
}

sendBatchStatuses(requestCount);

// Helper to generate random float in range
function randFloat(min: number, max: number, nullable = false): number | null {
  if (nullable && Math.random() < 0.1) return null;
  return +(Math.random() * (max - min) + min).toFixed(2);
}

// Helper to generate random boolean or null
function randBool(nullable = false): boolean | null {
  if (nullable && Math.random() < 0.1) return null;
  return Math.random() < 0.5;
}

// Generate random StatusApi data, with custom timestamp
function generateRandomStatus(rtc_timestamp: string) {
  return {
    wind_speed_m_s: randFloat(0, 30, true),
    wind_direction: randFloat(0, 360, true),
    rain_mm: randFloat(0, 50, true),
    temperature_dht: randFloat(-20, 50, true),
    humidity_dht: randFloat(0, 100, true),
    pressure_hpa: randFloat(950, 1050, true),
    temperature_bmp: randFloat(-20, 50, true),
    sunlight_raw: randFloat(0, 1023, true),
    rtc_timestamp,
    rtc_sync_lost: randBool(true),
    api_key: process.env.API_KEY || 'testingKey',
  };
}