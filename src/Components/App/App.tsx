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
    constructor(props: AppProps) {
        super(props);
        this.state = {
            searchResults: [{name: "Flubirds", artist: "Overhead", album: "Mr.Dog", id: ""}],
            playListName: "My Playlist",
            playListTracks: [{name: "Flubirds", artist: "Overhead", album: "Mr.Dog", id: ""}]
        };
        this.addTrack = this.addTrack.bind(this);
    }

    // 这是一个修改state的方法，同时影响下属的所有组件: SearchResults, Playlist，所以要放在这里。
    addTrack(track: Track) {
        // 已经添加过了
        if (this.state.playListTracks.find(currentTrack => currentTrack.id === track.id)) {
            console.log("Track already added")
            return;
        } else {
            this.state.playListTracks.push(track);
            this.setState({playListTracks: this.state.playListTracks});
        }
    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar/>
                    <div className="App-playlist">
                        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
                        <Playlist playlistName={this.state.playListName} playlistTracks={this.state.playListTracks}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;