import { studentAuthStorage } from "src/utils/common/auth-utilites";
import { currentTms } from "src/utils/common/time-utilites";
import configs from "utils/api/config";

export async function refreshAwsToken(): Promise<any> {
    const awsToken = studentAuthStorage.getAwsToken();
    const refreshToken = studentAuthStorage.getRefreshToken();
    const awsUserId = studentAuthStorage.getAwsUserId();

    try {
        const response = await fetch(configs.api + "/refreshToken", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${awsToken}`,
                Ref: refreshToken,
                Sub: awsUserId,
            },
        });
        const statusCode = response.status;
        const data = await response.json();
        if (statusCode === 200) {
            studentAuthStorage.setAwsToken(
                data.AuthenticationResult.AccessToken,
            );
            const currentTime = currentTms();
            studentAuthStorage.setAwsTokenCreationTime(currentTime || 0);
            return data.AuthenticationResult.AccessToken;
        } else {
            //TODO logout();
            studentAuthStorage.cleanStudentAuthToken();
            const url = window.location.href;
            if (url.includes("login")) {
                window.location.replace(`${window.location.href}`);
            } else {
                window.location.replace(`${window.location.origin}/login`);
            }
        }
    } catch (err) {
        console.log("Session Expired", err);
        studentAuthStorage.cleanStudentAuthToken();
        const url = window.location.href;
        if (url.includes("login")) {
            window.location.replace(`${window.location.href}`);
        } else {
            window.location.replace(`${window.location.origin}/login`);
        }
        return false;
    }
}
