import React, { Component } from "react";

class IdiomSearchBox extends Component {
  constructor(props) {
    super(props);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleSearchTextChange(e) {
    this.props.onSearchTextChange(e.target.value);
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.props.onSubmit(e);
    }
  }
  render() {
    return (
      <div className="row justify-content-center m-2">
        <div className="col-10 col-sm-6">
          <form className="form-inline d-flex justify-content-center">
            <input
              className="form-control form-control-lg ml-3 w-75"
              type="text"
              placeholder="例：美丽"
              value={this.props.searchText}
              onChange={this.handleSearchTextChange}
              disabled={this.props.disabled}
              onKeyPress={this.handleKeyPress}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default IdiomSearchBox;
