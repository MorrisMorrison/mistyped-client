import React from 'react';
import {FaPlay} from 'react-icons/fa'
type SearchResultCardProperties = {
    Url: string
    IsAvailable: boolean
}

type SearchResultCardState = {
}


class SearchResultCard extends React.Component<SearchResultCardProperties, SearchResultCardState>{
    constructor(props: SearchResultCardProperties) {
        super(props);
    }

    render() {
        return (
            <div className="bg-yellow-500 min-h-0 h-20 mt-1 mb-1 mx-60 w-90 flex items-center justify-between rounded-md">
                <div className="ml-5 font-bold">
                    {this.props.Url}
                </div>
                {/* {this.props.IsAvailable ?
                    <div className="mr-5">
                        <img src="404image" />
                    </div> 
                    : */}
                    <div className="mr-5">
                        <a href={this.props.Url} target="_blank"><FaPlay /></a>
                    </div>
                {/* } */}
                
            </div>
        )
    }
}

export default SearchResultCard
