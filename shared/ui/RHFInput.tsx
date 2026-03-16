"use client";
import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

interface RHFInputProps {
  name: string;
  placeholder?: string;
  size?: "small" | "middle" | "large";
  isPassword?: boolean;
  [key: string]: unknown;
}

export const RHFInput = ({
  name,
  placeholder,
  size = "large",
  isPassword = false,
  ...rest
}: RHFInputProps) => {
  const { control } = useFormContext();

  const InputComponent = isPassword ? Input.Password : Input;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <InputComponent
          {...field}
          {...rest}
          placeholder={placeholder}
          size={size}
          status={fieldState.error ? "error" : undefined}
          className={fieldState.error ? "border-red-500!" : ""}
        />
      )}
    />
  );
};
