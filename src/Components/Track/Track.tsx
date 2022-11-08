import React, {Component} from 'react';
import './Track.css'

type TrackProps = {
    track: any,
    isRemoval: boolean | undefined;
}

class Track extends Component<TrackProps, {}> {
    renderAction() {
        if (this.props.isRemoval) {
            return <button className="Track-action">-</button>
        } else {
            return <button className="Track-action">+</button>
        }
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <button className="Track-action">{this.renderAction()}</button>
            </div>
        );
    }
}

export default Track;