import React, { Fragment } from 'react'
import { getSearchResults } from '../../api'
import { WorkshopPreviewComponent } from '../workshopPreview'
import { MessageComponent } from '../message'
import './search.scss'

export default class SearchComponent extends React.Component {
  constructor() {
    super()
    this.state = { searchInput: '', searchResults: [], isError: false }
    this.searchCallback = this.searchCallback.bind(this)
  }

  errorCallback() {
    this.setState({ isError: !this.state.isError })
  }
  searchHandler(e) {
    e.preventDefault()
    this.setState({ searchInput: e.target.value, searchResults: [] })
    if (e.target.value === '') return
    getSearchResults(e.target.value, this.searchCallback)
  }
  searchCallback(response) {
    if (response.status === 200) {
      this.setState({ searchResults: this.sortResultsData(response.data) })
    }
    else {
      this.setState({ isError: true, searchInput: '' })
    }
  }
  sortResultsData(data) {
    let results = []
    if (data.categoryResults !== null) {
      data.categoryResults.map(result => {
        results.push(result)
      })
    }
    if (data.locationResults !== null) {
      data.locationResults.map(result => {
        results.push(result)
      })
    }
    if (data.userResults !== null) {
      data.userResults.map(result => {
        results.push(result)
      })
    }
    if (data.workshopResults !== null) {
      data.workshopResults.map(result => {
        results.push(result)
      })
    }
    return results
  }
  render() {
    const { searchResults, isError } = this.state
    return (
      <Fragment>
        <div className="search-container">
          <input type="search" name='search' placeholder="Search" value={this.state.searchInput} onChange={this.searchHandler.bind(this)} />
          <div className="search-results-container">
            {
              searchResults.length !== 0 &&
              (
                searchResults.map((result, idx) => {
                  return <WorkshopPreviewComponent workshop={result} key={idx} />
                })
              )
            }
          </div>
        </div>
        {
          isError && (
            <MessageComponent message='Search functionality is not working at the moment. Please try later' callback={this.errorCallback.bind(this)} />
          )
        }
      </Fragment>
    )
  }
}