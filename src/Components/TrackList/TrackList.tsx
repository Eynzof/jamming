import React, {Component} from 'react';
import './TrackList.css'
import TrackPage, {Track} from "../Track/TrackPage";

type TrackListProps = {
    tracks: Track[],
    onAdd: any,
    isRemoval: boolean,
}

class TrackList extends Component<TrackListProps, {}> {
    render() {
        return (
            <div className="TrackList">
                {this.props.tracks.map((track: any) =>
                  <TrackPage key={track.id} track={track} isRemoval={this.props.isRemoval} onAdd={this.props.onAdd}/>
                )}
            </div>

        );
    }
}

export default TrackList;