import React, {Component} from 'react';
import SearchResults from "../SearchResults/SearchResults";
import SearchBar from "../SearchBar/SearchBar";
import Playlist from "../Playlist/Playlist";
import './App.css';

type AppProps = {
    searchResults: any,
    playListName: string,
    playListTracks: any,
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

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar/>
                    <div className="App-playlist">
                        <SearchResults searchResults={this.state.searchResults}/>
                        <Playlist/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;