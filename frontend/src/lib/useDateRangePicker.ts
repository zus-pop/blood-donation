import { useState } from "react";
import { subDays, format, parseISO } from "date-fns";

export interface DateRange {
    from: string; // yyyy-MM-dd
    to: string;   // yyyy-MM-dd
}

export function useDateRangePicker(maxDays = 7) {
    const today = format(new Date(), "yyyy-MM-dd");
    const [range, setRange] = useState<DateRange>({
        from: format(subDays(new Date(), maxDays - 1), "yyyy-MM-dd"),
        to: today,
    });

    function setFrom(from: string) {
        let to = range.to;
        // Nếu from > to thì cập nhật to = from
        if (from > to) to = from;
        // Nếu quá maxDays thì cập nhật to = from + maxDays - 1
        const fromDate = parseISO(from);
        const maxTo = format(subDays(fromDate, -maxDays + 1), "yyyy-MM-dd");
        if (to > maxTo) to = maxTo;
        setRange({ from, to });
    }

    function setTo(to: string) {
        let from = range.from;
        // Nếu to < from thì cập nhật from = to
        if (to < from) from = to;
        // Nếu quá maxDays thì cập nhật from = to - maxDays + 1
        const toDate = parseISO(to);
        const minFrom = format(subDays(toDate, maxDays - 1), "yyyy-MM-dd");
        if (from < minFrom) from = minFrom;
        setRange({ from, to });
    }

    return { range, setFrom, setTo };
}
