import { Controller } from "react-hook-form";
import { DatePicker } from "antd";
import dayjs from "dayjs";

function RHFDatePicker({
  name,
  rules,
  placeholder = "Select date",
  format = "YYYY/MM/DD",
  showTime = false,
}: {
  name: string;
  rules?: unknown;
  placeholder?: string;
  format?: string;
  showTime?: boolean;
}) {
  return (
    <Controller
      name={name}
      rules={rules}
      render={({ field, fieldState }) => {
        const value = field.value;

        return (
          <div className="w-full flex flex-col items-start gap-1.5">
            <DatePicker
              className="filter-date-control"
              value={value ? dayjs(value) : null}
              onChange={(date) => {
                field.onChange(date ? date.format(format) : null);
              }}
              onBlur={field.onBlur}
              placeholder={placeholder}
              format={format}
              showTime={showTime ? { format: "HH:mm" } : false}
              status={fieldState.error ? "error" : ""}
              size="middle"
              classNames={{ root: "w-full!" }}
            />

            {fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}

export default RHFDatePicker;
