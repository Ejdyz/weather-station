"use client"
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select";
import { useEffect, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker"
import { Calendar } from "../ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button";
import { useI18n } from "@/hooks/context/i18n-context";
import { cs as csLocale, enUS as enUSLocale } from "date-fns/locale";


export default function DateRangeAndTypeSelector({
  defaultStartDate = new Date(new Date().setDate(new Date().getDate() - 6)),
  defaultEndDate = new Date(),
  availableDates,
  defaultData = [],
  availableFilters = [],
  defaultFilters = [],
  fetchNewData,
  ChildrenComponent,
}: {
  defaultStartDate: Date,
  defaultEndDate: Date,
  availableDates: Date[],
  defaultData: any[],
  availableFilters: MultiSelectOption[],
  defaultFilters: MultiSelectOption[],
  fetchNewData: (startDate: Date, endDate: Date) => Promise<any[]>,
  ChildrenComponent: React.FC<{ data: any[], selectedFilters: string[], availableFilters: MultiSelectOption[] }>
}) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(defaultFilters.map((f) => f.value));
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: defaultStartDate,
    to: defaultEndDate,
  });
  const [data, setData] = useState<any[]>(defaultData);
  const { t, locale } = useI18n();
  const months = [
    t("months.january.short"), t("months.february.short"), t("months.march.short"), t("months.april.short"),
    t("months.may.short"), t("months.june.short"), t("months.july.short"), t("months.august.short"),
    t("months.september.short"), t("months.october.short"), t("months.november.short"), t("months.december.short")
  ];

  // Map our app locale (string) to date-fns Locale expected by react-day-picker
  const dateFnsLocale = useMemo(() => (locale === "cs" ? csLocale : enUSLocale), [locale]);

  const fetchDays = async (startDate: Date, endDate: Date) => {
    const response = await fetchNewData(startDate, endDate);
    setData(response);
  }

  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      console.log(dateRange)
      fetchDays(new Date(dateRange.from.setHours(0, 0, 0, 0)), new Date(dateRange.to.setHours(23, 59, 59, 999)));
    }
  }, [dateRange]);

  const disableUnavailableDates = (date: Date) => {
    return !availableDates.some((availableDate) => date.toDateString() === availableDate.toDateString())
  }

  function formatShortNumericDays(date: Date) {
    // Prefer native Intl for button label; falls back to static list
    return months[date.getMonth()] + " " + date.getDate() + ".";
  }

  const buttonContent = !dateRange || !dateRange?.from || !dateRange?.to ? "Select Date" : formatShortNumericDays(dateRange?.from) + " - " + formatShortNumericDays(dateRange?.to);

  return (
    <div>
      <div className="flex xl:flex-row flex-col gap-2 z-10 mb-2">
        <MultiSelect
          placeholder={t("multiSelect.placeholder")}
          className="min-w-0"
          options={availableFilters}
          onValueChange={setSelectedFilters}
          defaultValue={selectedFilters}
          modalPopover={true}
          searchable={false}
          autoSize
          maxCount={2}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button size={"lg"} variant="outline" >{buttonContent.toString()}</Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" sideOffset={0}>
            <Calendar
              locale={dateFnsLocale}
              className="w-full"
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              disabled={disableUnavailableDates}
            />
          </PopoverContent>
        </Popover>
      </div>
      <ChildrenComponent data={data} selectedFilters={selectedFilters} availableFilters={availableFilters} />
    </div>
  );
}
