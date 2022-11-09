import {Track} from "../Components/Track/TrackPage";

export class Spotify {
    TOKEN: string;
    CLIENT_ID: string;
    REDIRECT_URI: string;
    UID: string;

    constructor() {
        this.TOKEN = "";
        this.UID = "";
        this.CLIENT_ID = "5d4c4c8f924e4d429cfd4c273e9dd256";
        // this.REDIRECT_URI = "https://enzo-jamming.surge.sh/";
        this.REDIRECT_URI = "http://localhost:3000/";
    }

    async search(term: string) {
        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}&limit=20`;
        const token = await this.getAccessToken();
        if (!token) {
            console.log("token not found")
        }
        const tracks: Track[] = [];
        await fetch(endpoint, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(async response => {
            await response.json().then(data => {
                data.tracks.items.forEach((item: any) => {
                    tracks.push({
                        id: item.id,
                        album: item.album.name,
                        artist: item.artists[0].name,
                        name: item.name,
                        uri: item.uri
                    });
                })
            })

        });
        return tracks;
    }

    async savePlayList(playListName: string, uris?: string[]) {
        // if (!playListName || !uris) {
        //     console.log("playlist name or uris is empty")
        //     return;
        // }
        const token = await this.getAccessToken();
        if (!token) {
            console.log("token not found")
        }
        if (!this.UID || this.UID === "") {
            const endpoint = 'https://api.spotify.com/v1/me';

            await fetch(endpoint, {
                headers: {Authorization: `Bearer ${token}`}
            }).then(async response => {
                await response.json().then(data => {
                    this.UID = data.id;
                })
            })
        }

        // 创建 playlist
        const endpoint = `https://api.spotify.com/v1/users/${this.UID}/playlists`;

        const data = await fetch(endpoint, {
            method: 'POST',
            headers: {Authorization: `Bearer ${token}`},
            body: JSON.stringify({name: playListName})
        })
        const playlistID = data.json().then(json => json.id);

        const addtrack_endpoint = `https://api.spotify.com/v1/users/${this.UID}/playlists/${playlistID}/tracks`

        const r = await fetch(addtrack_endpoint,  {
            method: 'POST',
            headers: {Authorization: `Bearer ${token}`},
            body: "t"
        })



    }

    async getAccessToken() {
        console.log("getAccessToken Invoked")

        if (this.TOKEN !== "") {
            console.log("Browser has token")
            return this.TOKEN;
        }

        if (localStorage.getItem("token")) {
            console.log("Local Storage has token")
            this.TOKEN = localStorage.getItem("token")!;
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
                localStorage.setItem("token", accessToken);
                console.log("token saved to localstorage")
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