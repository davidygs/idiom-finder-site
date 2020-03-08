import React, { Component } from "react";

class IdiomList extends Component {
  state = {};
  render() {
    return (
      <div className="results row justify-content-center m-2">
        <div className="col-8 col-sm-4">
          <ul className="list-group list-group-flush text-center">
            {this.props.idioms.map(it => (
              <li className="list-group-item" key={it.idiom}>
                {it.idiom}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default IdiomList;
