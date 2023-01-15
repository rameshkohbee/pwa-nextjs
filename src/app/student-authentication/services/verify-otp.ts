import configs from "utils/api/config";

export async function verifyOtp(userDetails: {
    otp: string;
    username: string;
    userId: string;
    sessionId: string;
}): Promise<any> {
    try {
        const url = configs.api + "/verifyOtp";
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const statusCode = response.status;
        // console.log("status", statusCode);
        const data = await response.json();
        // console.log("data", data);
        return { ...data, statusCode };
    } catch (err) {
        console.log("error", err);
        return err;
    }
}
