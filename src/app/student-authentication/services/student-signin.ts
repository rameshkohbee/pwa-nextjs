import configs from "utils/api/config";

export async function studentSignIn(userDetails: {
    username: string;
}): Promise<any> {
    try {
        const url = configs.api + "/studentSignIn";
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
}
