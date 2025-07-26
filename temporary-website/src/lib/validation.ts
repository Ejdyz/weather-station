import { z } from 'zod';
import { timingSafeCryptoCompare } from './utils';

export const StatusApiSchema = z.object({
  wind_speed_m_s: z.number("Value must be a number or null").nullable(),
  wind_direction: z.number("Value must be a number or null").nullable(),
  rain_mm: z.number("Value must be a number or null").nullable(),
  temperature_dht: z.number("Value must be a number or null").nullable(),
  humidity_dht: z.number("Value must be a number or null").nullable(),
  pressure_hpa: z.number("Value must be a number or null").nullable(),
  temperature_bmp: z.number("Value must be a number or null").nullable(),
  sunlight_raw: z.number("Value must be a number or null").nullable(),
  rtc_timestamp: z.iso.datetime("Value must be a valid ISO datetime"),
  rtc_sync_lost: z.boolean("Value must be a boolean or null").nullable(),
  api_key: z.string().refine(
    (val) => {
      const expected = process.env.API_KEY;
      return timingSafeCryptoCompare(val, expected);
    },
    { message: "Invalid API key" }
  ),
});

export type StatusApi = z.infer<typeof StatusApiSchema>;