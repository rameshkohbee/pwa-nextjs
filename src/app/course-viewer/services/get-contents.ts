import {
    getAccessToken,
    studentAuthStorage,
} from "src/utils/common/auth-utilites";
import configs from "utils/api/config";

export async function getContentsByIds(contentIds: string[]): Promise<any> {
    const awsToken = await getAccessToken();
    const awsUserId = studentAuthStorage.getAwsUserId();
    try {
        const url = configs.api + `/getContentsByIds`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${awsToken}`,
                Sub: awsUserId,
            },
            body: JSON.stringify({
                contentIds: contentIds,
                userId: awsUserId,
            }),
        });
        const statusCode = response.status;
        const data = await response.json();
        if (statusCode === 200) {
            return { ...data, statusCode };
        } else {
            console.log(
                `Failed! response code: ${statusCode} \nMessage: Error while fetching contents`,
            );
            return { ...data, statusCode };
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}
