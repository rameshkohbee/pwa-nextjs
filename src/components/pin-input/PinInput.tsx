import React, {
    ChangeEvent,
    HTMLAttributes,
    KeyboardEvent,
    memo,
    useEffect,
    useRef,
    useState,
} from "react";
import { InputField } from "./InputField";

// keyCode constants
const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;
const SPACEBAR = 32;

export interface PinInputProps extends HTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    defaultValue?: string;
    value?: string;
    length?: number;
    limitPerBox?: number;
    isNumeric?: boolean;
    setPin?: (value: string) => void;
    hasErrored?: boolean;
    containerStyle?: string;
    inputStyle?: string;
    errorStyle?: string;
}

/**
 * @Info validate input is numeric or not
 * @param value {string}
 * @param isNumeric {boolean}
 * @returns {true/false}
 */
function validateIsNumeric(value: string, isNumeric: boolean): boolean {
    const NUMERIC_REGEX = /^[0-9]+$/;
    const regex = NUMERIC_REGEX;
    if (isNumeric) {
        return regex.test(value);
    }
    return true;
}

/**
 * The PinInput component is similar to the Input component, but is optimized for entering sequences of digits quickly.
 */
const PinInput = ({
    defaultValue,
    value,
    placeholder = "0",
    length = 4,
    limitPerBox = 1,
    isNumeric = false,
    setPin = () => "",
    hasErrored = false,
    containerStyle = "",
    inputStyle = "",
    errorStyle = "",
}: PinInputProps): JSX.Element => {
    const [pinArray, setPinArray] = useState<string[]>(
        new Array(length).fill(""),
    );
    const [, setIsSuccessful] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement[]>([]);

    const isOnPaste = useRef<boolean>(false);
    const checkIsSuccessful = (arr: string[]) => {
        let count = 0;
        for (let i = 0; i < length; i++) {
            if (arr[i].length === limitPerBox) {
                count++;
            }
        }
        if (count === length) {
            setIsSuccessful(true);
        } else {
            setIsSuccessful(false);
        }
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { value = "" } = e.target;

        if (validateIsNumeric(value, isNumeric) && value.trim().length) {
            if (value.length > limitPerBox && index === length - 1) {
                return false;
            }
            pinArray[index] = value;
            setPinArray([...pinArray]);
            if (value.length >= limitPerBox && index < length - 1) {
                inputRef.current[index + 1].focus();
            }

            checkIsSuccessful(pinArray);
        } else if (value.length === 0) {
            pinArray[index] = value;
            setPinArray([...pinArray]);
            return false;
        }
    };
    const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (
            e.keyCode === BACKSPACE ||
            e.code === "Backspace" ||
            e.key === "Backspace"
        ) {
            if (!pinArray[index] && index > 0) {
                inputRef.current[index - 1].focus();
            }
        } else if (e.keyCode === DELETE || e.key === "Delete") {
            e.preventDefault();
            if (index > 0) {
                inputRef.current[index - 1].focus();
            }
        } else if (e.keyCode === LEFT_ARROW || e.code === "ArrowLeft") {
            if (index > 0) {
                inputRef.current[index - 1].focus();
            }
        } else if (e.keyCode === RIGHT_ARROW || e.code === "ArrowRight") {
            if (index < length - 1) {
                inputRef.current[index + 1].focus();
            }
        } else if (
            e.keyCode === SPACEBAR ||
            e.key === " " ||
            e.code === "Spacebar" ||
            e.code === "Space"
        ) {
            e.preventDefault();
        }
    };
    const handleOnPaste = (input: string) => {
        const totalLength = limitPerBox * length;
        const newInput = input.slice(0, totalLength);
        const focusLength = Math.floor(newInput.length / limitPerBox);

        if (validateIsNumeric(newInput, isNumeric)) {
            for (let i = 0; i < length; i++) {
                pinArray[i] = newInput.slice(
                    i * limitPerBox,
                    i * limitPerBox + limitPerBox,
                );
            }

            setPinArray([...pinArray]);

            if (focusLength < length) {
                inputRef.current[focusLength].focus();
            } else {
                inputRef.current[focusLength - 1].focus();
            }
        } else {
            return false;
        }
    };
    useEffect(() => {
        const pin = pinArray.join("");
        setPin(pin);
    }, [pinArray]);

    useEffect(() => {
        if (defaultValue?.length) {
            const temp = defaultValue.split("");
            const newArray: string[] = [];
            for (let i = 0; i < length; i++) {
                newArray[i] = temp.splice(0, limitPerBox).join("");
            }
            setPinArray([...newArray]);
        }
        false && console.log(value);
    }, []);
    return (
        <div>
            <div
                onPaste={(e) => {
                    isOnPaste.current = true;
                    const input = e.clipboardData.getData("Text");
                    handleOnPaste(input);
                }}
                className={`flex gap-2 w-full justify-center items-center ${containerStyle}`}
            >
                {pinArray.map((val, index) => (
                    <InputField
                        key={index}
                        value={val}
                        ref={(element) => {
                            if (element) {
                                inputRef.current[index] = element;
                            }
                        }}
                        onFocus={(e) => e.target.select()}
                        placeholder={placeholder}
                        limitPerBox={limitPerBox}
                        isNumeric={isNumeric}
                        hasErrored={hasErrored}
                        inputStyle={inputStyle}
                        errorStyle={errorStyle}
                        onChange={(e) => {
                            if (!isOnPaste.current) {
                                handleChange(e, index);
                            } else {
                                e.preventDefault();
                                isOnPaste.current = false;
                            }
                        }}
                        onKeyUp={(e) => handleKeyUp(e, index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default memo(PinInput, (prevProps, currProps) => {
    if (
        prevProps.hasErrored === currProps.hasErrored &&
        prevProps.value === currProps.value
    ) {
        return true;
    } else {
        return false;
    }
});
