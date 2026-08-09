"use client";

import { Input } from "antd";
import type { InputProps } from "antd";
import type { ReactNode } from "react";
import {
  Controller,
  type FieldValues,
  type RegisterOptions,
  useFormContext,
} from "react-hook-form";

interface RHFInputProps extends Omit<InputProps, "name" | "prefix" | "size" | "type"> {
  name: string;
  label?: string;
  placeholder?: string;
  size?: "small" | "middle" | "large";
  isPassword?: boolean;
  isReadOnly?: boolean;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  rules?: RegisterOptions<FieldValues, string>;
  icon?: ReactNode;
  isTextArea?: boolean;
}

export const RHFInput = ({
  name,
  label,
  placeholder,
  size = "large",
  isPassword = false,
  isReadOnly = false,
  rules = {},
  isTextArea = false,
  type = "text",
  icon,
  ...rest
}: RHFInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const status = fieldState.error ? "error" : undefined;
        const readOnly = isReadOnly || rest.readOnly;
        const input = isTextArea ? (
          <Input.TextArea
            {...field}
            placeholder={placeholder}
            size={size}
            status={status}
            disabled={rest.disabled}
            className={rest.className}
            readOnly={readOnly}
          />
        ) : isPassword ? (
          <Input.Password
            {...field}
            {...rest}
            placeholder={placeholder}
            size={size}
            status={status}
            prefix={icon}
            readOnly={readOnly}
          />
        ) : (
          <Input
            {...field}
            {...rest}
            placeholder={placeholder}
            size={size}
            status={status}
            prefix={icon}
            type={type}
            readOnly={readOnly}
          />
        );

        return (
          <div className="w-full flex flex-col items-start gap-1">
            {label && <label className="app-field-label">{label}</label>}
            {input}
            {fieldState.error && (
              <span className="w-full text-red-500 text-xs text-right">
                {fieldState.error.message}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};
