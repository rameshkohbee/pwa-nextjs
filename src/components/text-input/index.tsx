import { ChangeEventHandler } from "react";
import { Text } from "../text";

export function TextInput({
    title,
    id,
    placeholder,
    autocomplete,
    pattern,
    isRequired,
    dark,
    type,
    variant = "primary",
    isHidden = false,
    onChange = () => undefined,
}: {
    title?: string;
    id: string;
    isRequired: boolean;
    placeholder?: string;
    autocomplete?: string;
    dark?: boolean;
    pattern?: string;
    type: string;
    variant?: "primary" | "secondary";
    isHidden?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}): JSX.Element {
    const primaryStyle = `mt-1 focus:ring-primary-color focus:border-primary-color block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
        dark ? "bg-dark-grey !text-white" : "bg-white"
    }`;
    const secondaryStyle = `mt-1 focus:!ring-transparent focus:border-primary-color block w-full h-[50px] shadow-sm sm:text-sm border-0 border-[#555555] border-b-2 rounded-t-[4px] ${
        dark ? "bg-dark-grey !text-white" : "bg-white"
    }`;
    return (
        <div className={isHidden ? " w-1" : "block"}>
            {title !== undefined && (
                <label htmlFor="first-name" className="block mb-1">
                    <Text
                        t={title}
                        style={`subtextRegular ${
                            isHidden ? "!text-[1px] !text-transparent" : ""
                        }`}
                    ></Text>
                </label>
            )}
            <input
                type={type}
                name={id}
                id={id}
                required={isRequired}
                pattern={pattern}
                placeholder={placeholder}
                autoComplete={autocomplete}
                style={{
                    width: isHidden ? "1px" : "100%",
                    height: isHidden ? "1px" : "100%",
                }}
                onChange={onChange}
                className={
                    isHidden
                        ? "w-0 p-0"
                        : variant === "secondary"
                        ? secondaryStyle
                        : primaryStyle
                }
            />
        </div>
    );
}
