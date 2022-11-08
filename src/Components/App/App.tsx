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
    state = {
        searchResults: [{name: "Flubirds", artist: "Overhead", album: "Mr.Dog", id: "1"}],
        playListName: "My Playlist",
        playListTracks: [{name: "Timber", artist: "Kesha", album: "Die Young", id: "2"}]
    };

    // 这是一个修改state的方法，同时影响下属的所有组件: SearchResults, Playlist，所以要放在这里。
    addTrack = (track: Track) => {
        // 已经添加过了
        if (this.state.playListTracks.find(currentTrack => currentTrack.id === track.id)) {
            console.log("Track already added")
            return;
        } else {
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

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar/>
                    <div className="App-playlist">
                        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
                        <Playlist playlistName={this.state.playListName} playlistTracks={this.state.playListTracks}
                                  onRemove={this.removeTrack} handleNameChange={this.updatePlaylistName}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;