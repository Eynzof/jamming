const TOKEN = "";
export const Spotify = () => {
    const getAccessToken = () => {
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
                    window.location = 'https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=token&scope=playlist-modify-public&redirect_uri=http://localhost:3000';
                }
            }
        }
    }
}