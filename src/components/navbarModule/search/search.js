import React, { Fragment } from "react";
import { getSearchResults } from "../../../api";
import { Link } from "react-router-dom";
import { MessageComponent } from "../../messageModule";
import "./search.scss";

export default class SearchComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: "",
      categoryResults: [],
      locationResults: [],
      userResults: [],
      workshopResults: [],
      isError: false
    };
    this.searchCallback = this.searchCallback.bind(this);
  }

  errorCallback() {
    this.setState({ isError: !this.state.isError });
  }
  searchHandler(e) {
    e.preventDefault();
    this.setState({
      searchInput: e.target.value,
      categoryResults: [],
      locationResults: [],
      userResults: [],
      workshopResults: []
    });
    if (e.target.value === "") return;
    getSearchResults(e.target.value, this.searchCallback);
  }
  searchCallback(response) {
    if (response.status === 200) {
      this.sortResultsData(response.data);
    } else {
      this.setState({ isError: true, searchInput: "" });
    }
  }
  sortResultsData(data) {
    const {
      categoryResults,
      locationResults,
      userResults,
      workshopResults
    } = data;
    if (data.categoryResults !== null) {
      this.setState({ categoryResults });
    }
    if (data.locationResults !== null) {
      this.setState({ locationResults });
    }
    if (data.userResults !== null) {
      this.setState({ userResults });
    }
    if (data.workshopResults !== null) {
      this.setState({ workshopResults });
    }
  }
  render() {
    const {
      workshopResults,
      categoryResults,
      userResults,
      isError
    } = this.state;
    return (
      <Fragment>
        <div className="search-container">
          <input
            type="search"
            name="search"
            placeholder="Search"
            value={this.state.searchInput}
            onChange={this.searchHandler.bind(this)}
            autoFocus
          />
          <div className="search-results-container">
            {userResults.length !== 0 && (
              <div>
                <h2>Users</h2>
                {userResults.map((result, idx) => {
                  return (
                    <div className='search-result-hover'>
                      <Link
                        to={`/user/${result.id}`}
                        key={idx}
                      >
                        <h5>{result.firstName} {result.lastName}</h5>
                      </Link>
                    </div>
                  )
                })}
              </div>
            )}
            {categoryResults.length !== 0 && (
              <div>
                <h2>Categories</h2>
                {categoryResults.map((result, idx) => {
                  return (
                    <div className='search-result-hover'>
                      <Link
                        to={`/workshops/categories/${result.id}/${result.name}`}
                        key={idx}
                      >
                        <h5>{result.name}</h5>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
            {workshopResults.length !== 0 && (
              <div>
                <h2>Workshops</h2>
                {workshopResults.map((result, idx) => {
                  return (
                    <div className='search-result-hover'>
                      <Link
                        to={`/workshop/${result.workshopId ? result.workshopId : result.id
                          }`}
                        key={idx}
                      >
                        <h5>{result.name}</h5>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {isError && (
          <MessageComponent
            message="Search functionality is not working at the moment. Please try later"
            callback={this.errorCallback.bind(this)}
          />
        )}
      </Fragment>
    );
  }
}
