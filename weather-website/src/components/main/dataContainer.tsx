import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DataItem {
  title: string;
  value: string | number;
  icon: string;
}

interface DataContainerProps extends DataItem {
  additionalData?: DataItem[];
}

export default function DataContainer({ title, value, icon, additionalData }: DataContainerProps) {
  const Base = (
    <div className="flex flex-col gap-3">
      <div className="flex justify-start items-center gap-2">
        <img src={icon} alt={title} className="size-16" />
        <div className="flex flex-col">
          <strong className="text-lg">{value}</strong>
          <span className="-mt-2">{title}</span>
        </div>
      </div>
    </div>
  )

  if (!additionalData || additionalData.length === 0) {
    return Base;
  }

  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer">
        {Base}
      </PopoverTrigger>
      <PopoverContent>
        {additionalData?.length ? (
          <ul className="flex flex-col gap-4 pl-0 list-none">
            {additionalData.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <img src={item.icon} alt={item.title} className="size-12" />
                <div className="flex flex-col leading-tight">
                  <strong className="text-sm">{item.value}</strong>
                  <span className="text-xs -mt-0.5 opacity-80">{item.title}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </PopoverContent>
    </Popover>

  );
}
