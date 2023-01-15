import React, {
    ChangeEvent,
    forwardRef,
    HTMLAttributes,
    KeyboardEvent,
} from "react";

export interface InputFieldProps extends HTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    value?: string;
    limitPerBox?: number;
    isNumeric?: boolean;
    hasErrored?: boolean;
    inputStyle?: string;
    errorStyle?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
    onFocus?: (e) => void;
}
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    (
        {
            placeholder,
            limitPerBox,
            value = "",
            isNumeric,
            hasErrored,
            inputStyle,
            errorStyle,
            onChange,
            onKeyUp,
            onFocus,
            ...rest
        },
        ref,
    ): JSX.Element => {
        return (
            <input
                autoComplete="off"
                ref={ref}
                type={isNumeric ? "tel" : "text"}
                value={value}
                maxLength={limitPerBox}
                placeholder={placeholder}
                onChange={onChange}
                onKeyUp={onKeyUp}
                onFocus={onFocus}
                {...rest}
                className={`w-9 h-9 p-0 rounded-md text-center lg:w-10 lg:h-10 ${inputStyle} ${
                    hasErrored
                        ? `border-red-400 border-1 md:border-2 ${errorStyle}`
                        : "border-gray-400"
                } `}
            />
        );
    },
);
