import React from 'react';
import SearchResultCard from './SearchResultCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { type } from 'os';

const baseUrl = "https://mistyped-server.mormor.online";
type SearchGroupProperties = {
}

type SearchGroupState = {
  availableResults: string[];
  unavailableResults: string[];
  url: string;
}

class SearchGroup extends React.Component<SearchGroupProperties, SearchGroupState> {
  constructor(props: SearchGroupProperties) {
    super(props);
    this.state = {
      availableResults: [],
      unavailableResults: [],
      url: ""
    }
  }

  isValidUrl = (url: string) => {
    const urlRegex = /^(?:(ftp|http|https):\/\/)?(?:www\.)?[^\s]+$/;
    return urlRegex.test(url);
  }

  onSearchButtonClick = (url: string) => {
    if (!url || !this.isValidUrl(url)) {
      toast.error("Please provide a valid url.")
      return;
    }


    const toastId = toast.loading("Calculating possible candidates...")
    fetch(baseUrl + '/checkurl/?url=' + url, {
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
    })
      .then(response => {
        console.log(response)
        return response.json()
      })
      .then(data => {
        console.log(data)
        const availableUrls: string[] = data["Available"]
        const unavailableUrls: string[] = data["Unavailable"]
        this.setState({
          availableResults: availableUrls,
          unavailableResults: unavailableUrls
        })
        if (availableUrls || unavailableUrls) {
          toast.update(toastId, {
            render: "Finished!",
            type: "success",
            isLoading: false,
            autoClose: 5000,
          });
        } else {
          toast.update(toastId, {
            render: "Could not find any candidates for the provdided url.",
            type: "error",
            isLoading: false,
            autoClose: 5000
          });
        }
      })
  }

  render() {
    return (
      <div id="searchGroup" className="flex flex-col items-center justify-center w-full pt-5" style={{ height: '90%' }}>
        <div className="pb-14 flex flex-col w-96" >
          <h1 className="text-green-500 text-3xl pb-3">mistyped</h1>
          <input className="h-10 dark:bg-gray-800 dark:text-gray-400" type="text" id="url" placeholder="Paste your url here." title='Only valid links will work' value={this.state.url} onInput={e => this.setState({ url: (e.target as HTMLInputElement).value })} />
          <button className="bg-green-500 text-white p-3 rounded-lg align-center" onClick={() => this.onSearchButtonClick(this.state.url)}>Search!</button>
          <div id="progressBarWrapper" className="pt-3">
          </div>
        </div>

        <div className="pb-14 flex flex-col w-full overflow-auto" >
          <div id="resultGroup" className="flex flex-col items-center justify-center w-full" >
            {this.state.availableResults.length > 0 ?
              <h1 className="text-green-500">Used Urls</h1>
              : <div></div>
            }
            <div className="w-full">
              {this.state.availableResults.map((ur, i) => <SearchResultCard Url={ur} IsAvailable={true} />)}
            </div>
            {this.state.unavailableResults.length > 0 ?
              <h1 className="text-green-500">Unused Urls</h1>
              : <div></div>
            }
            <div className="w-full">
              {this.state.unavailableResults.map((ur, i) => <SearchResultCard Url={ur} IsAvailable={false}></SearchResultCard>)}
            </div>
          </div>
        </div>
        <ToastContainer
        ></ToastContainer>
      </div>
    )
  }
}


export default SearchGroup;
