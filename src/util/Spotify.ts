// export const Spotify = {
//
//     CLIENT_ID = "5d4c4c8f924e4d429cfd4c273e9dd256",
//     REDIRECT_URI = "http://localhost:3000/",
//
//     search = (term: string) => {
//         const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
//
//
//         return fetch(endpoint, {
//             headers: {Authorization: `Bearer ${this.getAccessToken()}`}
//         }).then(response => {
//             const j = JSON.stringify(response);
//             console.log(j);
//             // 把 response 转换成 tracks
//
//         })
//     },
//     getAccessToken = () => {
//         console.log("getAccessToken Invoked")
//
//         // Get access token from URL
//         const matchToken: RegExpMatchArray | null = window.location.href.match(/access_token=([^&]*)/);
//         const matchExpires: RegExpMatchArray | null = window.location.href.match(/expires_in=([^&]*)/);
//         if (matchToken && matchExpires) {
//             console.log('1')
//             let accessToken: string = matchToken[0];
//             let expiresIn: number = Number(matchExpires[0]);
//             if (accessToken && expiresIn) {
//                 console.log('2')
//                 window.setTimeout(() => accessToken = '', expiresIn * 1000);
//                 // @ts-ignore
//                 window.history.pushState('Access Token', null, '/');
//                 return accessToken;
//             } else {
//                 // @ts-ignore
//                 window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
//             }
//         } else {
//             // @ts-ignore
//             window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
//         }
//     }
// }

export class Spotify {
    TOKEN: string;
    CLIENT_ID: string;
    REDIRECT_URI: string;

    constructor() {
        this.TOKEN = "";
        this.CLIENT_ID = "5d4c4c8f924e4d429cfd4c273e9dd256";
        this.REDIRECT_URI = "http://localhost:3000/";
    }

    async search(term: string) {
        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        await this.getAccessToken().then((token) => {
            return fetch(endpoint, {
                headers: {Authorization: `Bearer ${token}`}
            }).then(response => {
                const j = JSON.stringify(response);
                console.log(j);
                // 把 response 转换成 tracks

            })
        })

    }

    async getAccessToken() {
        console.log("getAccessToken Invoked")

        if (this.TOKEN !== "") {
            console.log("Browser has token")
            return this.TOKEN;
        }
        // Get access token from URL

        const matchToken: RegExpMatchArray | null = window.location.href.match(/access_token=([^&]*)/);
        const matchExpires: RegExpMatchArray | null = window.location.href.match(/expires_in=([^&]*)/);

        if (matchToken && matchExpires) {
            let accessToken: string = matchToken[1];
            let expiresIn: number = Number(matchExpires[1]);
            if (accessToken && expiresIn) {
                console.log('2')
                this.TOKEN = accessToken;
                window.setTimeout(() => this.TOKEN = "", expiresIn * 1000);
                // @ts-ignore
                // 这行干嘛用的？
                window.history.pushState('Access Token', null, '/');
                return this.TOKEN;
                // 解析失败
            } else {
                console.log('token parsed failed')
                // @ts-ignore
                window.location = `https://accounts.spotify.com/authorize?client_id=${this.CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${this.REDIRECT_URI}`;
            }
            // URL里没有token，也就是还在jamming的页面
            // 导航到 spotify的认证界面
        } else {
            // @ts-ignore
            window.location = `https://accounts.spotify.com/authorize?client_id=${this.CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${this.REDIRECT_URI}`;
        }
    }

}