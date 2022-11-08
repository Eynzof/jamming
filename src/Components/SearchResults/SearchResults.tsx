import React, {Component} from 'react';
import './SearchResults.css'
import TrackList from "../TrackList/TrackList";
import {Track} from "../Track/TrackPage";

type SearchResultsProps = {
    searchResults: Track[],
    onAdd: any;
}

class SearchResults extends Component<SearchResultsProps, {}> {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList onAdd={this.props.onAdd} tracks={this.props.searchResults} isRemoval={false}/>
            </div>
        );
    }
}

export default SearchResults;