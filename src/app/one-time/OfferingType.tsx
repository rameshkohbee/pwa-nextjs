import { Text } from "@components/text";
import { memo } from "react";

const OfferingType = ({
    type,
    style = "",
}: {
    type: string;
    style?: string;
}) => {
    let offeringName = "";
    switch (type) {
        case "RECORDED":
            offeringName = "Join Recorded Course";
            break;
        case "LIVE":
            offeringName = "Join Live Class";
            break;
        case "WORKSHOP":
            offeringName = "Join Live Workshop";
            break;
    }

    return <Text t={offeringName} style={style}></Text>;
};

export default memo(
    OfferingType,
    (prevProps, newProps) => prevProps.type === newProps.type,
);
