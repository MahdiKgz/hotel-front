"use client";
import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

interface RHFInputProps {
  name: string;
  placeholder?: string;
  size?: "small" | "middle" | "large";
  isPassword?: boolean;
  [key: string]: unknown;
  icon: React.ReactNode;
}

export const RHFInput = ({
  name,
  placeholder,
  size = "large",
  isPassword = false,
  rules = {},
  icon,
  ...rest
}: RHFInputProps) => {
  const { control } = useFormContext();

  const InputComponent = isPassword ? Input.Password : Input;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="w-full flex flex-col items-start gap-1">
          <InputComponent
            {...field}
            {...rest}
            placeholder={placeholder}
            size={size}
            status={fieldState.error ? "error" : undefined}
            prefix={icon}
          />
          {fieldState.error && (
            <span className="w-full text-red-500 text-xs text-right">
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};
