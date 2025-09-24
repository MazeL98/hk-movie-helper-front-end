import React, { useMemo } from "react";
import {
  Navigate,
  ViewProps,
  DateLocalizer,
  View,
} from "react-big-calendar";
// @ts-ignore: 没有官方类型声明
import TimeGrid from "react-big-calendar/lib/TimeGrid";

interface CustomWeekViewProps extends ViewProps {
  date: Date;
  localizer: DateLocalizer;
  max?: Date;
  min?: Date;
  scrollToTime?: Date;
}

 

// const CustomWeekView:  React.FC<ViewProps> & {
//   range: (date: Date, { localizer }: { localizer: DateLocalizer }) => Date[];
//   navigate: (
//     date: Date,
//     action: typeof Navigate[keyof typeof Navigate],
//     { localizer }: { localizer: DateLocalizer }
//   ) => Date;
//   title: (date: Date, { localizer }: { localizer: DateLocalizer }) => string;
// } 
const CustomWeekView = ({
  date,
  localizer,
  max = localizer.endOf(new Date(), "day"),
  min = localizer.startOf(new Date(), "day"),
  scrollToTime = localizer.startOf(new Date(), "day"),
  ...props
}) => {
  const currRange = useMemo(
    () => CustomWeekView.range(date, { localizer }),
    [date, localizer]
  );

  return (
    <TimeGrid
      date={date}
      eventOffset={15}
      localizer={localizer}
      max={max}
      min={min}
      range={currRange}
      scrollToTime={scrollToTime}
      {...props}
    />
  );
};

// --- static methods ---

CustomWeekView.range = (date, { localizer }: { localizer: DateLocalizer }) => {
  const start = date;
  const end = localizer.add(start, 2, "day");

  let current = start;
  const range: Date[] = [];

  while (localizer.lte(current, end, "day")) {
    range.push(current);
    current = localizer.add(current, 1, "day");
  }

  return range;
};

CustomWeekView.navigate = (
  date,
  action: typeof Navigate[keyof typeof Navigate],
  { localizer }: { localizer: DateLocalizer }
) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -3, "day");

    case Navigate.NEXT:
      return localizer.add(date, 3, "day");

    default:
      return date;
  }
};

CustomWeekView.title = (
  date,
  { localizer }: { localizer: DateLocalizer }
) => {
  const [start, ...rest] = CustomWeekView.range(date, { localizer });
  return localizer.format(
    { start, end: rest.pop() as Date },
    "dayRangeHeaderFormat"
  );
};

export default CustomWeekView;