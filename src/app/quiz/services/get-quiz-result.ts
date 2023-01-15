import {
    getAccessToken,
    studentAuthStorage,
} from "src/utils/common/auth-utilites";
import configs from "utils/api/config";

export async function getQuizResultById(quizId: string): Promise<any> {
    const awsToken = await getAccessToken();
    const awsUserId = studentAuthStorage.getAwsUserId();
    try {
        const url =
            configs.api +
            `/getQuizResultById?quizId=${quizId}&studentId=${awsUserId}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${awsToken}`,
                Sub: awsUserId,
            },
        });
        const statusCode = response.status;
        const data = await response.json();
        if (statusCode === 200) {
            if (Object.keys(data?.KohbeeQuizResult)?.length) {
                return data.KohbeeQuizResult;
            } else {
                return undefined;
            }
        } else {
            console.log(
                `Failed! response code: ${statusCode} \nMessage: Error while fetching quiz`,
            );
            return undefined;
        }
    } catch (err) {
        console.log("Error: ", err);
    }
}
