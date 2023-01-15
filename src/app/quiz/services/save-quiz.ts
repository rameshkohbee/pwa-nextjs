/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
import {
    getAccessToken,
    studentAuthStorage,
} from "src/utils/common/auth-utilites";
import configs from "utils/api/config";

export async function saveQuizSubmission(quizDetails): Promise<any> {
    const awsToken = await getAccessToken();
    const awsUserId = studentAuthStorage.getAwsUserId();
    try {
        const url = configs.api + `/saveQuizSubmission?r=s`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${awsToken}`,
                Sub: awsUserId,
            },
            body: JSON.stringify(quizDetails),
        });
        const statusCode = response.status;
        const data = await response.json();
        if (statusCode === 200) {
            return data;
        } else {
            console.log(data);
            return undefined;
        }
    } catch (err) {
        console.log("error:", err);
    }
}
