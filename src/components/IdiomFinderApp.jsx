import React, { Component } from "react";
import IdiomSearchBox from "./IdiomSearchBox";
import IdiomList from "./IdiomList";
import LogoBox from "./LogoBox";
import StatusBox from "./StatusBox";
import Footer from "./Footer";
import IntroBox from "./IntroBox";

class IdiomFinderApp extends Component {
  constructor(props) {
    super(props);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.state = {
      idioms: [
        // { idiom: "闭月羞花", score: 34 },
        // { idiom: "倾国倾城", score: 33 },
        // { idiom: "沉鱼落雁", score: 23 },
        // { idiom: "国色天香", score: 20 },
        // { idiom: "明眸皓齿", score: 19 },
        // { idiom: "花容月貌", score: 13 },
        // { idiom: "花颜月貌", score: 12 },
        // { idiom: "亭亭玉立", score: 11 },
        // { idiom: "繁花似锦", score: 10 },
        // { idiom: "眉清目秀", score: 8 },
        // { idiom: "美如冠玉", score: 8 },
        // { idiom: "姹紫嫣红", score: 8 },
        // { idiom: "秀色可餐", score: 6 },
        // { idiom: "如花似玉", score: 6 },
        // { idiom: "山明水秀", score: 6 },
        // { idiom: "花红柳绿", score: 6 },
        // { idiom: "草长莺飞", score: 6 }
      ],
      searchText: "",
      isWaiting: false,
      error: false,
      showIntro: true
    };
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSearchTextChange(searchText) {
    this.setState({ idioms: [], searchText: searchText, showIntro: true });
  }
  handleSubmit(event) {
    const TIMEOUT = 10000;
    event.preventDefault();
    this.setState({ isWaiting: true, error: false, showIntro: false });
    fetchWithTimeout(
      `http://idiombackend.unific.ga:8000/?query=${this.state.searchText}`,
      { headers: { Accept: "application/json" } },
      TIMEOUT
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ idioms: data, isWaiting: false });
      })
      .catch(error => {
        this.setState({ isWaiting: false, error: true });
      });
  }

  render() {
    let content;
    if (this.state.isWaiting) {
      content = <StatusBox status="waiting" />;
    } else if (this.state.error) {
      content = <StatusBox status="error" />;
    } else if (this.state.showIntro) {
      content = <IntroBox />;
    } else {
      content = <IdiomList idioms={this.state.idioms} />;
    }
    return (
      <React.Fragment>
        <main className="container">
          <div className="row pt-5">
            <div className="col">
              <LogoBox />
              <IdiomSearchBox
                searchText={this.state.keyword}
                onSearchTextChange={this.handleSearchTextChange}
                onSubmit={this.handleSubmit}
                disabled={this.state.isWaiting}
              />
              {content}
            </div>
          </div>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

const fetchWithTimeout = (uri, options = {}, time = 5000) => {
  // Lets set up our `AbortController`, and create a request options object
  // that includes the controller's `signal` to pass to `fetch`.
  const controller = new AbortController();
  const config = { ...options, signal: controller.signal };
  // Set a timeout limit for the request using `setTimeout`. If the body of this
  // timeout is reached before the request is completed, it will be cancelled.
  const timeout = setTimeout(() => {
    controller.abort();
  }, time);
  return fetch(uri, config)
    .then(response => {
      // Because _any_ response is considered a success to `fetch`,
      // we need to manually check that the response is in the 200 range.
      // This is typically how I handle that.
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      return response;
    })
    .catch(error => {
      // When we abort our `fetch`, the controller conveniently throws a named
      // error, allowing us to handle them separately from other errors.
      if (error.name === "AbortError") {
        throw new Error("Response timed out");
      }
      throw new Error(error.message);
    });
};

export default IdiomFinderApp;
