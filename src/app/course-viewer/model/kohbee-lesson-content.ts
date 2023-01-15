// To parse this data:
//
//   import { Convert } from "./file";
//
//   const kohbeeLessonContent = Convert.toKohbeeLessonContent(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface KohbeeLessonContent {
    contentType: string;
    creatorId: string;
    description: null | string;
    enterpriseId: string;
    id: string;
    isListed: boolean;
    isYoutube?: boolean;
    previewData?: PreviewData;
    sizeInBytes: number | null;
    tmsCreate: number;
    tmsDelete: null;
    tmsUpdate: number;
    type: string;
    uri: string;
    aspectRatio?: number;
    filename?: string;
    durationInSeconds?: number;
    thumbnailUrl?: string;
    videoUrls?: VideoUrls | null;
    html?: string;
    text?: string;
}

export interface PreviewData {
    description: null;
    imageLink: null;
    title: null;
}

export interface VideoUrls {
    "1280x720p"?: string;
    "1920x1080p"?: string;
    "480x270p"?: string;
    "640x360p"?: string;
    "960x540p"?: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toKohbeeLessonContent(json: string): KohbeeLessonContent[] {
        return cast(JSON.parse(json), a(r("KohbeeLessonContent")));
    }

    public static kohbeeLessonContentToJson(
        value: KohbeeLessonContent[],
    ): string {
        return JSON.stringify(
            uncast(value, a(r("KohbeeLessonContent"))),
            null,
            2,
        );
    }
}

function invalidValue(typ: any, val: any, key: any = ""): never {
    if (key) {
        throw Error(
            `Invalid value for key "${key}". Expected type ${JSON.stringify(
                typ,
            )} but got ${JSON.stringify(val)}`,
        );
    }
    throw Error(
        `Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`,
    );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach(
            (p: any) => (map[p.json] = { key: p.js, typ: p.typ }),
        );
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach(
            (p: any) => (map[p.js] = { key: p.json, typ: p.typ }),
        );
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ""): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {
                console.log();
            }
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map((el) => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(
        props: { [k: string]: any },
        additional: any,
        val: any,
    ): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach((key) => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key)
                ? val[key]
                : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach((key) => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers")
            ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")
            ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")
            ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    KohbeeLessonContent: o(
        [
            { json: "contentType", js: "contentType", typ: "" },
            { json: "creatorId", js: "creatorId", typ: "" },
            { json: "description", js: "description", typ: u(null, "") },
            { json: "enterpriseId", js: "enterpriseId", typ: "" },
            { json: "id", js: "id", typ: "" },
            { json: "isListed", js: "isListed", typ: true },
            { json: "isYoutube", js: "isYoutube", typ: u(undefined, true) },
            {
                json: "previewData",
                js: "previewData",
                typ: u(undefined, r("PreviewData")),
            },
            { json: "sizeInBytes", js: "sizeInBytes", typ: u(0, null) },
            { json: "tmsCreate", js: "tmsCreate", typ: 0 },
            { json: "tmsDelete", js: "tmsDelete", typ: null },
            { json: "tmsUpdate", js: "tmsUpdate", typ: 0 },
            { json: "type", js: "type", typ: "" },
            { json: "uri", js: "uri", typ: "" },
            { json: "aspectRatio", js: "aspectRatio", typ: u(undefined, 3.14) },
            { json: "filename", js: "filename", typ: u(undefined, "") },
            {
                json: "durationInSeconds",
                js: "durationInSeconds",
                typ: u(undefined, 0),
            },
            { json: "thumbnailUrl", js: "thumbnailUrl", typ: u(undefined, "") },
            {
                json: "videoUrls",
                js: "videoUrls",
                typ: u(undefined, u(r("VideoUrls"), null)),
            },
            { json: "html", js: "html", typ: u(undefined, "") },
            { json: "text", js: "text", typ: u(undefined, "") },
        ],
        false,
    ),
    PreviewData: o(
        [
            { json: "description", js: "description", typ: null },
            { json: "imageLink", js: "imageLink", typ: null },
            { json: "title", js: "title", typ: null },
        ],
        false,
    ),
    VideoUrls: o(
        [
            { json: "1280x720p", js: "1280x720p", typ: u(undefined, "") },
            { json: "1920x1080p", js: "1920x1080p", typ: u(undefined, "") },
            { json: "480x270p", js: "480x270p", typ: u(undefined, "") },
            { json: "640x360p", js: "640x360p", typ: u(undefined, "") },
            { json: "960x540p", js: "960x540p", typ: u(undefined, "") },
        ],
        false,
    ),
};
