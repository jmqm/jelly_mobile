// type TLogIn = {
//     Name: string;
//     Token: string;
// };

type TLogIn = {
    success: false;
} | {
    success: true;

    userName: string;
    userId: string;
    userAccessToken: string;
};

export const ConvertToTLogIn = (json?: any): TLogIn => {
    const success = json !== undefined && json !== null;

    if (success === false) {
        return {
            success: false
        } as TLogIn;
    }

    return {
        success: true,

        userName: json.User.Name,
        userId: json.User.Id,
        userAccessToken: json.AccessToken
    } as TLogIn;
};

export default TLogIn;
