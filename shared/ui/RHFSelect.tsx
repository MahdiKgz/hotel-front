import { Controller, useFormContext } from "react-hook-form";
import { Select } from "antd";

function RHFSelect({
  name,
  options,
  rules,
  placeholder,
  mode = "",
  getPopupContainer,
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="w-1/2 flex flex-col items-start gap-1.5">
          <Select
            className="filter-select-control"
            popupClassName="filter-select-dropdown"
            value={field.value}
            onChange={(value) => field.onChange(value)}
            onBlur={field.onBlur}
            placeholder={placeholder}
            options={options}
            status={fieldState.error ? "error" : ""}
            mode={mode === "multiple" ? "multiple" : undefined}
            size="middle"
            showSearch
            optionFilterProp="label"
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toString()
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            getPopupContainer={
              getPopupContainer ||
              ((triggerNode) => triggerNode?.parentElement || document.body)
            }
            classNames={{
              root: "w-full inline-block",
              placeholder: "text-[#9ca3af]!",
            }}
          />

          {fieldState.error && (
            <p className="text-sm text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}

export default RHFSelect;
