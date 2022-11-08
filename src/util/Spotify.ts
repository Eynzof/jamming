const TOKEN = "";
const CLIENT_ID = "5d4c4c8f924e4d429cfd4c273e9dd256";
const REDIRECT_URI = "http://localhost:3000";
export class Spotify {

    static search = (term: string) => {
        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        return fetch(endpoint,{
            headers: {Authorization: `Bearer ${this.getAccessToken()}`}
        }).then(response => {
            const j = JSON.stringify(response);
            console.log(j);
            // 把 response 转换成 tracks

        })
    }
    static getAccessToken = () => {
        if (TOKEN) {
            return TOKEN;
        } else {
            // Get access token from URL
            const matchToken: RegExpMatchArray | null = window.location.href.match(/access_token=([^&]*)/);
            const matchExpires: RegExpMatchArray | null = window.location.href.match(/expires_in=([^&]*)/);
            if (matchToken && matchExpires) {
                let accessToken: string = matchToken[0];
                let expiresIn: number = Number(matchExpires[0]);
                if (accessToken && expiresIn) {
                    window.setTimeout(() => accessToken = '', expiresIn * 1000);
                    // @ts-ignore
                    window.history.pushState('Access Token', null, '/');
                    return accessToken;
                } else {
                    // @ts-ignore
                    window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
                }
            }
        }
    }
}