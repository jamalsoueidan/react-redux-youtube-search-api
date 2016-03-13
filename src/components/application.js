import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTube } from '../actions/index';

import SearchBar from './search_bar';
import List from './list';
import Detail from './detail'

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {videos: [], selectedVideo: null};
  }

  componentDidMount() {
    this.search('react.js');
  }

  search(term) {
    this.props.fetchTube(term);
  }

  onVideoSelect(selectedVideo) {
    this.setState({selectedVideo})
  }

  render() {
    const selectedVideo = this.state.selectedVideo || this.props.selectedVideo;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <SearchBar onSearchTerm={this.search.bind(this)} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <Detail video={selectedVideo} />
          </div>
          <div className=".col-md-4">
            <List
              videos={this.props.videos}
              onVideoSelect={(selectedVideo) => this.onVideoSelect(selectedVideo)}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {videos: state.videos, selectedVideo: state.videos[0]};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchTube}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);