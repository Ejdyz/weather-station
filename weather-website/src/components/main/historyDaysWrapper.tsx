import { getHistoryDaysInRange } from "@/lib/actions/days";
import DateRangeAndTypeSelector from "./dateRangeAndTypeSelector";
import { getAvailableHistoryDays } from "@/lib/days";
import { HistoryDaysTable } from "./historyDaysTable";
import { getTranslator } from "@/lib/server-dictionary";

export default async function HistoryDaysWrapper() {
  const { t } = await getTranslator();

  const defaultStartDate = new Date(new Date().setDate(new Date().getDate() - 6));
  const defaultEndDate = new Date();
  const defaultData = await getHistoryDaysInRange(defaultStartDate, defaultEndDate);
  const availableDates = await getAvailableHistoryDays();
  const availableFilters = [
    { value: "max_temperature", label: t("historyTableSortItems.max_temperature") },
    { value: "avg_temperature", label: t("historyTableSortItems.avg_temperature") },
    { value: "min_temperature", label: t("historyTableSortItems.min_temperature") },

    { value: "max_humidity", label: t("historyTableSortItems.max_humidity") },
    { value: "avg_humidity", label: t("historyTableSortItems.avg_humidity") },
    { value: "min_humidity", label: t("historyTableSortItems.min_humidity") },

    { value: "max_pressure", label: t("historyTableSortItems.max_pressure") },
    { value: "avg_pressure", label: t("historyTableSortItems.avg_pressure") },
    { value: "min_pressure", label: t("historyTableSortItems.min_pressure") },

    { value: "max_wind_speed", label: t("historyTableSortItems.max_wind_speed") },
    { value: "avg_wind_speed", label: t("historyTableSortItems.avg_wind_speed") },
    { value: "min_wind_speed", label: t("historyTableSortItems.min_wind_speed") },

    { value: "wind_direction", label: t("historyTableSortItems.wind_direction") },

    { value: "max_rain", label: t("historyTableSortItems.max_rain") },
    { value: "all_rain", label: t("historyTableSortItems.all_rain") },

    { value: "sunrise", label: t("historyTableSortItems.sunrise") },
    { value: "sunset", label: t("historyTableSortItems.sunset") },

    { value: "moonrise", label: t("historyTableSortItems.moonrise") },
    { value: "moonset", label: t("historyTableSortItems.moonset") },

    { value: "moon_phase", label: t("historyTableSortItems.moon_phase") },

    { value: "golden_hour_start", label: t("historyTableSortItems.golden_hour_start") },
    { value: "golden_hour_end", label: t("historyTableSortItems.golden_hour_end") },
  ];

  const defaultFilters = [
    availableFilters[1],
    availableFilters[4],
    availableFilters[7],
    availableFilters[9],
    availableFilters[11],
    availableFilters[12],
  ];
  
  return (
    <DateRangeAndTypeSelector
      defaultStartDate={defaultStartDate}
      defaultEndDate={defaultEndDate}
      availableDates={availableDates}
      defaultData={defaultData}
      availableFilters={availableFilters}
      defaultFilters={defaultFilters}
      fetchNewData={getHistoryDaysInRange}
      ChildrenComponent={HistoryDaysTable}
    />
  );
}
