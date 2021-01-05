import React from 'react';
import './SearchBar.css';




class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        };

        this.handleTermChange = this.handleTermChange.bind(this);

        this.handleLocationChange = this.handleLocationChange.bind(this);

        this.handleSearch = this.handleSearch.bind(this);

        this.handleKeyPress = this.handleKeyPress.bind(this);

        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        };
    }


    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return <li onClick={this.handleSortByChange.bind(this, sortByOptionValue)} className={this.getSortByClass(sortByOptionValue)} key={sortByOptionValue}>{sortByOption}</li>
        })
    };

    getSortByClass(sortByOption){
        if(this.state.sortBy === sortByOption) {
            return 'active'
        } else {
            return ''
        }
    };

    handleSortByChange(sortByOption){
        this.setState({ sortBy: sortByOption});
    };

    handleTermChange(e){
        this.setState({ term: e.target.value })
    };

    handleLocationChange(e){
        this.setState({ location: e.target.value })
    };

    handleSearch(e){
        let term = (this.state.term ? this.state.term : 'a');
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy)
        // e.preventDefault();
    };

    handleKeyPress(e) {
        if(e.which === 13) {
            this.handleSearch();
        }
    }

    render() {
        return(
        <div className="SearchBar">
            <div className="SearchBar-sort-options">
                <ul>
                    {this.renderSortByOptions()}
                </ul>
            </div>
            <div className="SearchBar-fields">
                <input placeholder="Search Businesses" onChange={this.handleTermChange} onKeyPress={this.handleKeyPress}/>
                <input placeholder="Where?" onChange={this.handleLocationChange} onKeyPress={this.handleKeyPress}/>
            </div>
            <div className="SearchBar-submit">
                <a onClick={this.handleSearch}>Let's Go</a>
            </div>
        </div>
        )
    }
}

export default SearchBar;