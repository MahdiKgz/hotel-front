// RHFSwitch.jsx
import { Switch } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const RHFSwitch = ({ name, label, valuePropName = "checked", ...rest }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col items-start gap-2">
          {label && <span className="text-xs">{label}</span>}
          <Switch
            {...field}
            checked={field.value}
            onChange={(checked) => field.onChange(checked)}
            defaultChecked={false}
            {...rest}
          />
        </div>
      )}
    />
  );
};

export default RHFSwitch;
