import React, {Component} from 'react';
import './SearchResults.css'
import TrackList from "../TrackList/TrackList";

type SearchResultsProps = {
    searchResults: any,
}

class SearchResults extends Component<SearchResultsProps, {}> {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList tracks={this.props.searchResults}/>
            </div>
        );
    }
}

export default SearchResults;