// To parse this data:
//
//   import { Convert, KohbeeQuizDetails } from "./file";
//
//   const kohbeeQuizDetails = Convert.toKohbeeQuizDetails(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface KohbeeQuizDetails {
    id?: string;
    studentId?: string;
    creatorId?: string;
    quizId?: string;
    responses?: Response[];
    tmsSubmit?: number;
    finalScore?: number;
    hasEvaluated?: boolean;
    certificateUrl?: string;
    tmsTestStart?: number;
    creatorFeedback?: string;
    isStarted?: boolean;
    isSubmitted?: boolean;
}

export interface Response {
    questionId?: string;
    options?: string[];
    answer?: string;
    hasTakenHint?: boolean;
    timeTaken?: number;
    markAwarded?: number;
    hasEvaluated?: boolean;
    isAttempted?: boolean;
    isInReview?: boolean;
    isBookmarked?: boolean;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toKohbeeQuizDetails(json: string): KohbeeQuizDetails {
        return cast(JSON.parse(json), r("KohbeeQuizDetails"));
    }

    public static kohbeeQuizDetailsToJson(value: KohbeeQuizDetails): string {
        return JSON.stringify(uncast(value, r("KohbeeQuizDetails")), null, 2);
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
                console.log(_);
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
    KohbeeQuizDetails: o(
        [
            { json: "id", js: "id", typ: u(undefined, "") },
            { json: "studentId", js: "studentId", typ: u(undefined, "") },
            { json: "creatorId", js: "creatorId", typ: u(undefined, "") },
            { json: "quizId", js: "quizId", typ: u(undefined, "") },
            {
                json: "responses",
                js: "responses",
                typ: u(undefined, a(r("Response"))),
            },
            { json: "tmsSubmit", js: "tmsSubmit", typ: u(undefined, 0) },
            { json: "finalScore", js: "finalScore", typ: u(undefined, 0) },
            {
                json: "hasEvaluated",
                js: "hasEvaluated",
                typ: u(undefined, true),
            },
            {
                json: "certificateUrl",
                js: "certificateUrl",
                typ: u(undefined, ""),
            },
            { json: "tmsTestStart", js: "tmsTestStart", typ: u(undefined, 0) },
            {
                json: "creatorFeedback",
                js: "creatorFeedback",
                typ: u(undefined, ""),
            },
            { json: "isStarted", js: "isStarted", typ: u(undefined, true) },
            { json: "isSubmitted", js: "isSubmitted", typ: u(undefined, true) },
        ],
        false,
    ),
    Response: o(
        [
            { json: "questionId", js: "questionId", typ: u(undefined, "") },
            { json: "options", js: "options", typ: u(undefined, a("")) },
            { json: "answer", js: "answer", typ: u(undefined, "") },
            {
                json: "hasTakenHint",
                js: "hasTakenHint",
                typ: u(undefined, true),
            },
            { json: "timeTaken", js: "timeTaken", typ: u(undefined, 0) },
            { json: "markAwarded", js: "markAwarded", typ: u(undefined, 0) },
            {
                json: "hasEvaluated",
                js: "hasEvaluated",
                typ: u(undefined, true),
            },
            { json: "isAttempted", js: "isAttempted", typ: u(undefined, true) },
            { json: "isInReview", js: "isInReview", typ: u(undefined, true) },
            {
                json: "isBookmarked",
                js: "isBookmarked",
                typ: u(undefined, true),
            },
        ],
        false,
    ),
};
