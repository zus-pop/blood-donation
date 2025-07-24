

import { DateTimePicker } from "./date-time-picker";

interface DateRangePickerProps {
    value: { from: Date | undefined; to: Date | undefined };
    onChange: (value: { from: Date | undefined; to: Date | undefined }) => void;
    maxDays?: number;
}

export function DateRangePicker({ value, onChange, maxDays = 7 }: DateRangePickerProps) {

    function setFrom(date: Date | undefined) {
        let to = value.to;
        if (date && to) {
            // Nếu quá maxDays thì cập nhật to = from + maxDays - 1
            const maxTo = new Date(date);
            maxTo.setDate(maxTo.getDate() + maxDays - 1);
            if (to > maxTo) {
                to = maxTo;
            }
        }
        onChange({ from: date, to });
    }

    function setTo(date: Date | undefined) {
        let from = value.from;
        if (date && from) {
            // Nếu quá maxDays thì cập nhật from = to - maxDays + 1
            const minFrom = new Date(date);
            minFrom.setDate(minFrom.getDate() - maxDays + 1);
            if (from < minFrom) {
                from = minFrom;
            }
        }
        onChange({ from, to: date });
    }

    // Tính toán min/max cho từng picker
    let fromMin: Date | undefined = undefined;
    let fromMax: Date | undefined = undefined;
    let toMin: Date | undefined = undefined;
    let toMax: Date | undefined = undefined;

    if (value.to) {
        // Nếu đã chọn to, from chỉ được chọn trong khoảng [to - maxDays + 1, to]
        fromMax = value.to;
        fromMin = new Date(value.to);
        fromMin.setDate(fromMin.getDate() - maxDays + 1);
    }
    if (value.from) {
        // Nếu đã chọn from, to chỉ được chọn trong khoảng [from, from + maxDays - 1]
        toMin = value.from;
        toMax = new Date(value.from);
        toMax.setDate(toMax.getDate() + maxDays - 1);
    }

    return (
        <div className="flex gap-2 items-center">
            <div>
                <span className="block text-xs mb-1">From</span>
                <DateTimePicker
                    date={value.from}
                    setDate={setFrom}
                    minDate={fromMin}
                    maxDate={fromMax}
                />
            </div>
            <div>
                <span className="block text-xs mb-1">To</span>
                <DateTimePicker
                    date={value.to}
                    setDate={setTo}
                    minDate={toMin}
                    maxDate={toMax}
                />
            </div>
            <span className="text-xs text-gray-500">(Max {maxDays} days)</span>
        </div>
    );
}
