import { z } from 'zod';

export const StatusApiSchema = z.object({
  wind_speed_m_s: z.number().nullable(),
  wind_direction: z.number().nullable(),
  rain_mm: z.number().nullable(),
  temperature_dht: z.number().nullable(),
  humidity_dht: z.number().nullable(),
  pressure_hpa: z.number().nullable(),
  temperature_bmp: z.number().nullable(),
  sunlight_raw: z.number().nullable(),
  rtc_timestamp: z.iso.datetime(),
  rtc_sync_lost: z.boolean().nullable(),
  api_key: z.string().min(1, 'API key is required'),
});

export type StatusApi = z.infer<typeof StatusApiSchema>;