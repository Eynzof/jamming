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
        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}&limit=20`;
        const token = await this.getAccessToken();
        const data = await fetch(endpoint, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return data.json();

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
                // TODO: 保存到本地Cookie
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