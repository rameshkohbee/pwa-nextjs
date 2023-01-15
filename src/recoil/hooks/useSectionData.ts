import { useRecoilValue } from "recoil";

import { pageDataState } from "@recoil/atoms";
import { KohbeePage, SectionWidgetData } from "src/models/kohbee-page";

export function useSectionData(
    name: string,
    id: string,
): {
    hasData: any;
    sectionData: any;
} {
    const kohbeePage: KohbeePage = useRecoilValue(pageDataState);
    let hasData = false;
    let sectionData = {} as SectionWidgetData;
    if (
        kohbeePage !== undefined &&
        kohbeePage.sectionWidgetData !== undefined
    ) {
        sectionData = kohbeePage.sectionWidgetData[parseInt(id)] ?? sectionData;
        if (sectionData !== undefined) {
            hasData = true;
        }
    }

    return { hasData: hasData, sectionData: sectionData };
}
