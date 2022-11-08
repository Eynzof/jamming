import React, {Component} from 'react';
import './TrackPage.css'

type TrackProps = { track: Track; isRemoval: boolean; onAdd: any, onRemove: any }

export interface Track {
    name: string,
    artist: string,
    album: string,
    id: string,
}

class TrackPage extends Component<TrackProps, {}> {


    renderAction() {
        if (this.props.isRemoval) {
            return <button className="Track-action" onClick={this.removeTrack}>-</button>
        } else {
            return <button className="Track-action" onClick={this.addTrack}>+</button>
        }
    }

    addTrack = () => {
        console.log('addTrack invoked')
        this.props.onAdd(this.props.track)
    }

    removeTrack = () => {
        console.log('removeTrack invoked')
        this.props.onRemove(this.props.track)
    }

    render() {
        return (<div className="Track">
            <div className="Track-information"><h3>{this.props.track.name}</h3>
                <p>{this.props.track.artist} | {this.props.track.album}</p></div>
            {this.renderAction()}
        </div>);
    }
}

export default TrackPage;