import React, {Component} from 'react';
import './SearchBar.css'

type SearchBarProps = {
    onSearch: (term: string) => void;
}

type SearchBarState = {
    term: string;
}


class SearchBar extends Component<SearchBarProps, SearchBarState> {

    search = () => {
        this.props.onSearch(this.state.term);
    }

    handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({term: e.target.value});
    }


    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        );
    }
}

export default SearchBar;