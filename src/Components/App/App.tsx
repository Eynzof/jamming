import React, {Component} from 'react';
import SearchResults from "../SearchResults/SearchResults";
import SearchBar from "../SearchBar/SearchBar";
import Playlist from "../Playlist/Playlist";
import './App.css';
import {Track} from "../Track/TrackPage";
import {Spotify} from "../../util/Spotify";

type AppProps = {
    searchResults: Track[];
    playListName: string,
    playListTracks: Track[],
}

class App extends Component<{}, AppProps> {
    state = {
        searchResults: [{name: "Hello", artist: "Adele", album: "25", id: "1Yk0cQdMLx5RzzFTYwmuld", uri: "spotify:track:1Yk0cQdMLx5RzzFTYwmuld"}],
        playListName: "My Playlist",
        playListTracks: [{
            name: "Timber (feat. Ke$ha)", artist: "Pitbull", album: "Global Warming: Meltdown (Deluxe Version)", id: "3cHyrEgdyYRjgJKSOiOtcS", uri: "spotify:track:3cHyrEgdyYRjgJKSOiOtcS"
        }]
    };

    // 这是一个修改state的方法，同时影响下属的所有组件: SearchResults, Playlist，所以要放在这里。
    addTrack = (track: Track) => {
        // 已经添加过了
        if (this.state.playListTracks.find(currentTrack => currentTrack.id === track.id)) {
            console.log("Track already added")
            return;
        } else {
            // @ts-ignore
            this.state.playListTracks.push(track);
            this.setState({playListTracks: this.state.playListTracks});
        }
    }

    removeTrack = (track: Track) => {
        if (track) {
            const result = this.state.playListTracks.filter(currentTrack => currentTrack.id !== track.id);
            this.setState({playListTracks: result});
        } else {
            console.log("Track does not exist")
        }
    }

    updatePlaylistName = (name: string) => {
        this.setState({playListName: name});
    }

    savePlaylist = () => {
        const spotify = new Spotify();
        const trackURIs = this.state.playListTracks.map(track => track.uri);
        spotify.savePlayList(this.state.playListName, trackURIs)
    }


    search = (term: string) => {
        const spotify = new Spotify();
        spotify.search(term).then(data => {
            this.setState({searchResults: data});
        })
    }


    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search}/>
                    <div className="App-playlist">
                        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
                        <Playlist playlistName={this.state.playListName} playlistTracks={this.state.playListTracks}
                                  onRemove={this.removeTrack} handleNameChange={this.updatePlaylistName}
                                  onSave={this.savePlaylist}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;