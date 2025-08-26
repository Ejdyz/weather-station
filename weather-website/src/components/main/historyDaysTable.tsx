"use client"
import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { formatWeatherData } from "@/lib/utils";
import { AvailableDate } from "@/lib/actions/days";
import { useI18n } from "@/hooks/context/i18n-context"

export function HistoryDaysTable({ data, selectedFilters, availableFilters }: { data: AvailableDate[]; selectedFilters: string[]; availableFilters: { value: string; label: string }[] }) {
  // Sorting state
  const [sortBy, setSortBy] = useState<string>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  // Map column identifiers to actual data keys and types to sort by
  type SortType = "number" | "date" | "string" | "time";
  const columnMap: Record<string, { key: keyof AvailableDate | "date"; type: SortType }> = {
    // fixed column
    date: { key: "date", type: "date" },

    // temperatures
    max_temperature: { key: "max_temperature", type: "number" },
    avg_temperature: { key: "avg_temperature", type: "number" },
    min_temperature: { key: "min_temperature", type: "number" },

    // humidity
    max_humidity: { key: "max_humidity", type: "number" },
    avg_humidity: { key: "avg_humidity", type: "number" },
    min_humidity: { key: "min_humidity", type: "number" },

    // pressure
    max_pressure: { key: "max_pressure", type: "number" },
    avg_pressure: { key: "avg_pressure", type: "number" },
    min_pressure: { key: "min_pressure", type: "number" },

    // wind
    max_wind_speed: { key: "max_wind_speed", type: "number" },
    avg_wind_speed: { key: "avg_wind_speed", type: "number" },
    min_wind_speed: { key: "min_wind_speed", type: "number" },
    wind_direction: { key: "avg_wind_direction", type: "number" },

    // rain
    max_rain: { key: "max_rain_mm", type: "number" },
    all_rain: { key: "all_rain_mm", type: "number" },

    // sun/moon times
    sunrise: { key: "sunrise", type: "date" },
    sunset: { key: "sunset", type: "date" },
    moonrise: { key: "moonrise", type: "date" },
    moonset: { key: "moonset", type: "date" },

    // moon / golden hour
    moon_phase: { key: "moon_phase", type: "string" },
    golden_hour_start: { key: "golden_hour_start", type: "time" },
    golden_hour_end: { key: "golden_hour_end", type: "time" },
  };

  const getComparableValue = (row: AvailableDate, colId: string): number | string | null => {
    const meta = columnMap[colId];
    if (!meta) return null;
    const value = row[meta.key as keyof AvailableDate] as unknown;
    switch (meta.type) {
      case "number": {
        const num = typeof value === "number" ? value : null;
        return num;
      }
      case "date": {
        const d = value instanceof Date ? value : null;
        return d ? d.getTime() : null;
      }
      case "time": {
        // Expect HH:MM style; treat other values as null so they sort last
        const str = typeof value === "string" ? value : null;
        if (!str) return null;
        const m = str.match(/^(\d{1,2}):(\d{2})$/);
        if (!m) return null;
        const hours = Number(m[1]);
        const mins = Number(m[2]);
        if (!Number.isFinite(hours) || !Number.isFinite(mins)) return null;
        return hours * 60 + mins;
      }
      case "string": {
        return typeof value === "string" ? value : null;
      }
      default:
        return null;
    }
  };

  const sortedData = useMemo(() => {
    if (!Array.isArray(data) || !data.length) return data;
    const colId = columnMap[sortBy] ? sortBy : "date";
    const dir = sortDir === "asc" ? 1 : -1;
    return [...data].sort((a, b) => {
      const av = getComparableValue(a, colId);
      const bv = getComparableValue(b, colId);
      // Nulls last
      const aNull = av === null || av === undefined || Number.isNaN(av as any);
      const bNull = bv === null || bv === undefined || Number.isNaN(bv as any);
      if (aNull && bNull) return 0;
      if (aNull) return 1;
      if (bNull) return -1;
      if (typeof av === "string" && typeof bv === "string") {
        return av.localeCompare(bv) * dir;
      }
      const an = Number(av);
      const bn = Number(bv);
      if (an < bn) return -1 * dir;
      if (an > bn) return 1 * dir;
      return 0;
    });
  }, [data, sortBy, sortDir, columnMap, getComparableValue]);

  const onSort = (colId: string) => {
    if (sortBy === colId) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(colId);
      setSortDir("asc");
    }
  };

  const SortIndicator = ({ colId }: { colId: string }) => {
    if (sortBy !== colId) return null;
    return <span className="ml-1 text-xs opacity-80">{sortDir === "asc" ? "▲" : "▼"}</span>;
  };

  const renderCell = (filter: string, row: AvailableDate) => {
    switch (filter) {
      // temperature
      case "avg_temperature":
        return formatWeatherData("temperature", row.avg_temperature);
      case "max_temperature":
        return formatWeatherData("temperature", row.max_temperature);
      case "min_temperature":
        return formatWeatherData("temperature", row.min_temperature);

      // humidity
      case "max_humidity":
        return formatWeatherData("humidity", row.max_humidity);
      case "avg_humidity":
        return formatWeatherData("humidity", row.avg_humidity);
      case "min_humidity":
        return formatWeatherData("humidity", row.min_humidity);

      // pressure
      case "max_pressure":
        return formatWeatherData("pressure", row.max_pressure);
      case "avg_pressure":
        return formatWeatherData("pressure", row.avg_pressure);
      case "min_pressure":
        return formatWeatherData("pressure", row.min_pressure);

      // wind
      case "max_wind_speed":
        return formatWeatherData("wind_speed_ms", row.max_wind_speed);
      case "avg_wind_speed":
        return formatWeatherData("wind_speed_ms", row.avg_wind_speed);
      case "min_wind_speed":
        return formatWeatherData("wind_speed_ms", row.min_wind_speed);
      case "wind_direction":
        return formatWeatherData("wind_direction", row.avg_wind_direction);

      // rain
      case "max_rain":
        return formatWeatherData("rain_mm", row.max_rain_mm);
      case "all_rain":
        return formatWeatherData("rain_mm", row.all_rain_mm);

      // times
      case "sunrise":
        return formatWeatherData("time_short_numeric", row.sunrise);
      case "sunset":
        return formatWeatherData("time_short_numeric", row.sunset);
      case "moonrise":
        return formatWeatherData("time_short_numeric", row.moonrise);
      case "moonset":
        return formatWeatherData("time_short_numeric", row.moonset);

      // moon / golden hour
      case "moon_phase":
        return row.moon_phase;
      case "golden_hour_start":
        return row.golden_hour_start ?? "-";
      case "golden_hour_end":
        return row.golden_hour_end ?? "-";
    }
    return "";
  };

  const { t } = useI18n();

  return (
    <div className="max-h-96 overflow-y-auto">
      <Table className="min-w-[400px] text-sm text-white">
        <TableHeader >
          <TableRow >
            <TableHead
              onClick={() => onSort("date")}
              className="text-left p-2 text-white sticky -left-1 backdrop-blur-sm cursor-pointer select-none"
              aria-sort={sortBy === "date" ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
            >
              {t("historyTableSortItems.date")}
              <SortIndicator colId="date" />
            </TableHead>
            {selectedFilters.map((filter) => {
              const label = availableFilters.find((f) => f.value === filter)?.label ?? filter;
              return (
                <TableHead
                  key={filter}
                  onClick={() => onSort(filter)}
                  className={"text-left p-2 text-white  cursor-pointer select-none" + (columnMap[filter] ? "" : " opacity-60 cursor-not-allowed")}
                  aria-sort={sortBy === filter ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                  title={columnMap[filter] ? `Sort by ${label}` : `Sorting not available for ${label}`}
                >
                  {label}
                  <SortIndicator colId={filter} />
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData?.length ? (
            sortedData.map((row) => (
              <TableRow key={row.id ?? row.date} className="border-t">
                <TableCell className="p-2 sticky -left-1 backdrop-blur-sm border-r-1 border-white">{formatWeatherData("date_short_numeric",row.date)}</TableCell>
                {selectedFilters.map((filter) => (
                  <TableCell key={filter} className="p-2">
                    {renderCell(filter, row)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="p-2" colSpan={4}>
                {t("historyTableSortItems.noData")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

