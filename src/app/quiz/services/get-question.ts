import {
    getAccessToken,
    studentAuthStorage,
} from "src/utils/common/auth-utilites";
import configs from "utils/api/config";

export async function getQuestion(id: string): Promise<any> {
    const awsToken = await getAccessToken();
    const awsUserId = studentAuthStorage.getAwsUserId();
    try {
        const url = configs.api + `/getQuestion?id=${id}&userId=${awsUserId}`;
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
            return data.KohbeeQuestion;
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