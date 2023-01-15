import { Text } from "../../components";

export function Stepper({
    title,
    dark,
    index,
    isSelected,
}: {
    title: string;
    index: string;
    dark?: boolean;
    isSelected: boolean;
}): JSX.Element {
    return (
        <div
            className={`flex justify-center md:justify-start items-center p-2 ${
                isSelected
                    ? `${dark ? "bg-darker-grey" : "bg-color"}`
                    : `${dark ? "bg-color" : "bg-slate-100"}`
            }`}
        >
            <Text
                t={index}
                style={
                    isSelected
                        ? "text-primary-color header mx-2"
                        : "header mx-2"
                }
            ></Text>
            <Text
                t={title}
                style={
                    isSelected
                        ? "headerSmall text-primary-color text-left ml-1"
                        : "headerSmall text-left ml-1"
                }
            ></Text>
        </div>
    );
}
