import {
    getAccessToken,
    studentAuthStorage,
} from "src/utils/common/auth-utilites";
import configs from "utils/api/config";

export async function getQuiz(quizId: string): Promise<any> {
    const awsToken = await getAccessToken();
    const awsUserId = studentAuthStorage.getAwsUserId();
    await (async () => {
        if (!awsUserId) {
            studentAuthStorage.cleanStudentAuthToken();
            window.location.replace(
                `${window.location.origin}/login?type=quiz&offeringId=${quizId}`,
            );
            return true;
        }
    })();
    try {
        const url = configs.api + `/getQuiz?id=${quizId}&userId=${awsUserId}`;
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
            return data.KohbeeQuiz;
        } else {
            console.log(
                `Failed! response code: ${statusCode} \nMessage: Error while fetching quiz`,
            );
            return undefined;
        }
    } catch (err) {
        console.log(err);
    }
}
