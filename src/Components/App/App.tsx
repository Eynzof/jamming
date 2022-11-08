import React, {Component} from 'react';
import SearchResults from "../SearchResults/SearchResults";
import SearchBar from "../SearchBar/SearchBar";
import Playlist from "../Playlist/Playlist";
import './App.css';
import {Track} from "../Track/TrackPage";

type AppProps = {
    searchResults: Track[];
    playListName: string,
    playListTracks: Track[],
}

class App extends Component<{}, AppProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            searchResults: [{name: "Flubirds", artist: "Overhead", album: "Mr.Dog", id: ""}],
            playListName: "My Playlist",
            playListTracks: [{name: "Flubirds", artist: "Overhead", album: "Mr.Dog", id: ""}]
        };
    }

    addTrack(track:Track) {
        if (this.state.playListTracks.find(currentTrack => currentTrack.id === track.id)) {
            return;
        }
    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar/>
                    <div className="App-playlist">
                        <SearchResults searchResults={this.state.searchResults}/>
                        <Playlist playlistName={this.state.playListName} playlistTracks={this.state.playListTracks}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;