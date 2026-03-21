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
        <>
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
            classNames={{ root: "w-1/2 inline-block" }}
          />

          {fieldState.error && (
            <p className="filter-field-error">{fieldState.error.message}</p>
          )}
        </>
      )}
    />
  );
}

export default RHFSelect;
