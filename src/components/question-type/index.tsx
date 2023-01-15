import { CheckboxIcon, RadioIcon, ShortInputIcon } from "@library/icons";
import { Text } from "..";

/**
 * Question types `Multiple Choice`
 * @param param0
 * @returns
 */
export function QuestionType({
    type = "MULTIPLECHOICE",
    color = "#555555",
}: {
    type?: "MULTIPLECHOICE" | "MULTIPLESELECT" | "SUBJECTIVE" | string;
    color?: string;
}): JSX.Element {
    let Icon = <RadioIcon type="checked" color={color} />;
    let text = "Multiple Choice";
    switch (type) {
        case "MULTIPLECHOICE":
            Icon = <RadioIcon type="checked" color={color} />;
            text = "Multiple Choice";
            break;
        case "MULTIPLESELECT":
            Icon = <CheckboxIcon type="checked" color={color} />;
            text = "Multiple Response";
            break;
        case "SUBJECTIVE":
            Icon = <ShortInputIcon color={color} />;
            text = "Short Answer";
            break;
    }
    return (
        <div
            className={`inline-flex rounded bg-pure-white items-center gap-1 py-1 px-2 smalltext`}
        >
            {Icon}
            <Text t={text} style={`smalltext text-[${color}]`} />
        </div>
    );
}
