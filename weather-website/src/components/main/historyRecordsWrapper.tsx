import { getHistoryRecordsInRange } from "@/lib/actions/history";
import DateRangeAndTypeSelector from "./dateRangeAndTypeSelector";
import { getAvailableHistoryDays } from "@/lib/days";
import HistoryRecordsGraph from "./historyRecordsGraph";
import { getTranslator } from "@/lib/server-dictionary";

export default async function HistoryRecordsWrapper() {
  const { t } = await getTranslator();

  const defaultStartDate = new Date(new Date().setDate(new Date().getDate() - 6));
  const defaultEndDate = new Date();
  const defaultData = await getHistoryRecordsInRange(defaultStartDate, defaultEndDate);
  const availableDates = await getAvailableHistoryDays();
  const availableFilters = [
    { value: "temperature", label: t("historyRecordsSortItems.temperature") },
    { value: "app_temperature", label: t("historyRecordsSortItems.app_temperature") },
    { value: "dew_point", label: t("historyRecordsSortItems.dew_point") },
    
    { value: "humidity", label: t("historyRecordsSortItems.humidity") },
    
    { value: "pressure", label: t("historyRecordsSortItems.pressure") },
    { value: "pressure_at_sea_level", label: t("historyRecordsSortItems.pressure_at_sea_level") },
    { value: "saturation_vapor_pressure", label: t("historyRecordsSortItems.saturation_vapor_pressure") },
    { value: "vapor_pressure", label: t("historyRecordsSortItems.vapor_pressure") },
    
    { value: "wind_speed", label: t("historyRecordsSortItems.wind_speed") },
    { value: "max_wind_speed", label: t("historyRecordsSortItems.max_wind_speed") },
    { value: "rain_mm", label: t("historyRecordsSortItems.rain_mm") },
    { value: "wind_direction", label: t("historyRecordsSortItems.wind_direction") },

  ];

  const defaultFilters = [
    availableFilters[0],
  ];
  
  return (
    <DateRangeAndTypeSelector
      defaultStartDate={defaultStartDate}
      defaultEndDate={defaultEndDate}
      availableDates={availableDates}
      defaultData={defaultData}
      availableFilters={availableFilters}
      defaultFilters={defaultFilters}
      fetchNewData={getHistoryRecordsInRange}
      ChildrenComponent={HistoryRecordsGraph}
    />
  );
}
