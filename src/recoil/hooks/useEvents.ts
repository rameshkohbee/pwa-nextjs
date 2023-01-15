import { saveUserAction } from "@services/api/analytics-service/save-user-action";
import {
    KohbeeUserAction,
    SourceUtm,
    KohbeeUserActionAttributeValue,
} from "src/models/kohbee-user-action";
import store from "store2";
import { currentTms } from "src/utils/common/time-utilites";
import { SESSION_EXPIRY, SESSION_ID } from "src/utils/constants";
import { getLocation } from "@services/api/analytics-service/get-location";
import { standardEvents } from "src/utils/constants/events";

export function useSendEvent(
    eventName: string,
    userId: string,
    pageId: string,
    source: SourceUtm,
): {
    actionId: string;
} {
    let eventId = "";
    try {
        for (let i = 0; i < standardEvents.length; i++) {
            if (eventName == standardEvents[i].eventName) {
                eventId = standardEvents[i].id;
            }
        }
        (async () => {
            const ip = await getLocation();
            const DeviceDetector = (await import("device-detector-js")).default;
            const deviceDetector = new DeviceDetector();
            const deviceResult = deviceDetector.parse(navigator.userAgent);
            const device =
                deviceResult.device?.type +
                "," +
                deviceResult.device?.brand +
                "," +
                deviceResult.device?.model;
            const userAction = {} as KohbeeUserAction;
            const sourceUtm = {} as SourceUtm;
            const actionAttribute = {} as KohbeeUserActionAttributeValue;

            sourceUtm.id = userId;
            sourceUtm.campaign = source.campaign;
            sourceUtm.medium = source.medium;
            sourceUtm.source = source.source;

            actionAttribute.id = userId;
            actionAttribute.k = "ip-address";
            actionAttribute.v = ip;

            userAction.id = "";
            userAction.sessionId = store.get(SESSION_ID);
            userAction.userDataId = userId;
            userAction.pageId = pageId;
            userAction.eventId = eventId;
            userAction.location = ip;
            userAction.tmsCreate = currentTms();
            userAction.device = device;
            userAction.userAgent = navigator.userAgent;
            userAction.timeZone =
                Intl.DateTimeFormat().resolvedOptions().timeZone;
            userAction.source = sourceUtm;
            userAction.attribute = [actionAttribute];
            const actionId = await saveUserAction(userAction);
            store.set(SESSION_EXPIRY, currentTms() + 1800, true);
            return { actionId: actionId };
        })();
    } catch (error) {
        console.log();
    }
    return { actionId: "" };
}
