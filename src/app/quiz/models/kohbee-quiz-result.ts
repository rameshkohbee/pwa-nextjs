// To parse this data:
//
//   import { Convert, KohbeeQuizResult } from "./file";
//
//   const kohbeeQuizResult = Convert.toKohbeeQuizResult(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface KohbeeQuizResult {
    certificateUrl?: string;
    creatorId?: string;
    description?: string;
    finalScore?: number;
    id?: string;
    quizId?: string;
    quizType?: string;
    sections?: Section[];
    studentId?: string;
    subtitle?: string;
    title?: string;
    tmsCreate?: number;
    tmsUpdate?: number;
    totalScore?: number;
}

export interface Section {
    correctMark?: number;
    description?: string;
    hasPartialMarking?: boolean;
    isSectionSkippable?: boolean;
    negativeMark?: boolean;
    responses?: Response[];
    subtitle?: string;
    timeLimit?: number;
    title?: string;
}

export interface Response {
    answers?: string[];
    correctAnswers?: string[];
    correctMark?: number;
    feedback?: Feedback;
    hasAttempted?: boolean;
    hasEvaluated?: boolean;
    hasTakenHint?: boolean;
    imageUrl?: string;
    isBookmarked?: boolean;
    markAwarded?: number;
    negativeMark?: number;
    options?: Feedback[];
    questionId?: string;
    questionTitle?: string;
    questionType?: string;
    subjectiveAnswer?: string;
    timeLimit?: number;
    timeTaken?: number;
    videoUrl?: string;
    wordLimit?: number;
}

export interface Feedback {
    id?: string;
    imageUrl?: string;
    subtitle?: string;
    title?: string;
    videoUrl?: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toKohbeeQuizResult(json: string): KohbeeQuizResult {
        return cast(JSON.parse(json), r("KohbeeQuizResult"));
    }

    public static kohbeeQuizResultToJson(value: KohbeeQuizResult): string {
        return JSON.stringify(uncast(value, r("KohbeeQuizResult")), null, 2);
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
    KohbeeQuizResult: o(
        [
            {
                json: "certificateUrl",
                js: "certificateUrl",
                typ: u(undefined, ""),
            },
            { json: "creatorId", js: "creatorId", typ: u(undefined, "") },
            { json: "description", js: "description", typ: u(undefined, "") },
            { json: "finalScore", js: "finalScore", typ: u(undefined, 0) },
            { json: "id", js: "id", typ: u(undefined, "") },
            { json: "quizId", js: "quizId", typ: u(undefined, "") },
            { json: "quizType", js: "quizType", typ: u(undefined, "") },
            {
                json: "sections",
                js: "sections",
                typ: u(undefined, a(r("Section"))),
            },
            { json: "studentId", js: "studentId", typ: u(undefined, "") },
            { json: "subtitle", js: "subtitle", typ: u(undefined, "") },
            { json: "title", js: "title", typ: u(undefined, "") },
            { json: "tmsCreate", js: "tmsCreate", typ: u(undefined, 0) },
            { json: "tmsUpdate", js: "tmsUpdate", typ: u(undefined, 0) },
            { json: "totalScore", js: "totalScore", typ: u(undefined, 0) },
        ],
        false,
    ),
    Section: o(
        [
            { json: "correctMark", js: "correctMark", typ: u(undefined, 0) },
            { json: "description", js: "description", typ: u(undefined, "") },
            {
                json: "hasPartialMarking",
                js: "hasPartialMarking",
                typ: u(undefined, true),
            },
            {
                json: "isSectionSkippable",
                js: "isSectionSkippable",
                typ: u(undefined, true),
            },
            {
                json: "negativeMark",
                js: "negativeMark",
                typ: u(undefined, true),
            },
            {
                json: "responses",
                js: "responses",
                typ: u(undefined, a(r("Response"))),
            },
            { json: "subtitle", js: "subtitle", typ: u(undefined, "") },
            { json: "timeLimit", js: "timeLimit", typ: u(undefined, 0) },
            { json: "title", js: "title", typ: u(undefined, "") },
        ],
        false,
    ),
    Response: o(
        [
            { json: "answers", js: "answers", typ: u(undefined, a("")) },
            {
                json: "correctAnswers",
                js: "correctAnswers",
                typ: u(undefined, a("")),
            },
            { json: "correctMark", js: "correctMark", typ: u(undefined, 0) },
            {
                json: "feedback",
                js: "feedback",
                typ: u(undefined, r("Feedback")),
            },
            {
                json: "hasAttempted",
                js: "hasAttempted",
                typ: u(undefined, true),
            },
            {
                json: "hasEvaluated",
                js: "hasEvaluated",
                typ: u(undefined, true),
            },
            {
                json: "hasTakenHint",
                js: "hasTakenHint",
                typ: u(undefined, true),
            },
            { json: "imageUrl", js: "imageUrl", typ: u(undefined, "") },
            {
                json: "isBookmarked",
                js: "isBookmarked",
                typ: u(undefined, true),
            },
            { json: "markAwarded", js: "markAwarded", typ: u(undefined, 0) },
            { json: "negativeMark", js: "negativeMark", typ: u(undefined, 0) },
            {
                json: "options",
                js: "options",
                typ: u(undefined, a(r("Feedback"))),
            },
            { json: "questionId", js: "questionId", typ: u(undefined, "") },
            {
                json: "questionTitle",
                js: "questionTitle",
                typ: u(undefined, ""),
            },
            { json: "questionType", js: "questionType", typ: u(undefined, "") },
            {
                json: "subjectiveAnswer",
                js: "subjectiveAnswer",
                typ: u(undefined, ""),
            },
            { json: "timeLimit", js: "timeLimit", typ: u(undefined, 0) },
            { json: "timeTaken", js: "timeTaken", typ: u(undefined, 0) },
            { json: "videoUrl", js: "videoUrl", typ: u(undefined, "") },
            { json: "wordLimit", js: "wordLimit", typ: u(undefined, 0) },
        ],
        false,
    ),
    Feedback: o(
        [
            { json: "id", js: "id", typ: u(undefined, "") },
            { json: "imageUrl", js: "imageUrl", typ: u(undefined, "") },
            { json: "subtitle", js: "subtitle", typ: u(undefined, "") },
            { json: "title", js: "title", typ: u(undefined, "") },
            { json: "videoUrl", js: "videoUrl", typ: u(undefined, "") },
        ],
        false,
    ),
};
