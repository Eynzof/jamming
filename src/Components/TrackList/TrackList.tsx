import React, {Component} from 'react';
import './TrackList.css'
import Track from "../Track/Track";

type TrackListProps = {
    tracks: any,
}

class TrackList extends Component<TrackListProps, {}> {
    render() {
        return (
            <div className="TrackList">
                {/* You will add a map method that renders a set of Track components */}
                {this.props.tracks.map((track: any) =>
                  <Track track={track} isRemoval={false} />
                )}
            </div>

        );
    }
}

export default TrackList;