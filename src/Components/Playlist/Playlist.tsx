import React, {Component} from 'react';
import './Playlist.css';
import TrackList from "../TrackList/TrackList";
import {Track} from "../Track/TrackPage";

type PlaylistProps = {
    playlistTracks: Track[];
    playlistName: string;
    onRemove: (track: Track) => void;
    handleNameChange: (name: string) => void;
    onSave: () => void;
}

class Playlist extends Component<PlaylistProps, any> {

    onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.handleNameChange(e.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                <input defaultValue={'New Playlist'} onChange={this.onNameChange}/>
                <TrackList onRemove={this.props.onRemove} tracks={this.props.playlistTracks} isRemoval={true}/>
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}

export default Playlist;