import React, { Component } from "react";
import Layout from "../components/Layout.js";
import Link from "next/link";
import { Icon, Table, Input, Button } from "semantic-ui-react";
import axios from "axios";
import config from "../server/config.js";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleInput = e => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({ [name]: value });
  };

  takeScreenShot = (url, device) => {
    console.log("screenshot");
    this.setState({ loading: true }, () => {
      axios
        .get(`${config.server}/screenshot?url=${url}&device=${device}`)
        .then(res => {
          console.log(res.data);
          if (res.data != "no such page" && res.data != "invalid url") {
            console.log(
              "res.data != 'no such page' && res.data != 'invalid url'"
            );
            this.setState({ [device]: res.data.link }, () => {
              this.setState({
                showImage: true,
                loading: false,
                noPage: false
              });
            });
          } else if (res.data == "no such page") {
            console.log(res.data);
            this.setState({
              noPage: true,
              loading: false,
              showImage: false,
              msg: `Sorry! can't find it`
            });
          } else if (res.data == "invalid url") {
            console.log(res.data);
            this.setState({
              noPage: true,
              loading: false,
              showImage: false,
              msg: `invalid address`
            });
          }
        })
        .catch(e => console.log(e));
    });
  };

  capture = url => {
    this.takeScreenShot(url, "desktop");
    this.takeScreenShot(url, "phone");
  };

  render() {
    return (
      <Layout>
        <div className="text-center">
          <h3 className="title align-center">
            RESTful api to take a screenshot of any site{" "}
            <span role="img" aria-label="camera">
              📸
            </span>
          </h3>
        </div>
        <div className="align-center">
          <div className="flex-container center test-it">
            <br />

            <Input
              name="urlInput"
              placeholder="Add link..."
              type="text"
              onChange={e => this.handleInput(e)}
              action={
                <Button
                  loading={this.state.addingWebsiteLoader}
                  color="teal"
                  content="Capture"
                  onClick={() => this.capture(this.state.urlInput)}
                />
              }
              style={{ padding: "50px" }}
            />
          </div>
          <br />
          {!this.state.loading ? (
            <div className="flex-container center">
              {this.state.showImage ? (
                <img className="dsk-img" src={this.state.desktop} />
              ) : null}
              {this.state.showImage ? (
                <img className="phone-img" src={this.state.phone} />
              ) : null}
            </div>
          ) : (
            <p className="text-center">
              one moment please
              <span role="img" aria-label="thinking">
                {" "}
                💅
              </span>
              ...
            </p>
          )}
          {!this.state.loading ? (
            <div>
              {!this.state.noPage ? (
                <div className="text-center">
                  <a
                    target="_blank"
                    className="block"
                    href={this.state.desktop}
                  >
                    {this.state.desktop}
                  </a>
                  <a target="_blank" className="block" href={this.state.phone}>
                    {this.state.phone}
                  </a>
                </div>
              ) : (
                <p className="text-center ">
                  {this.state.msg}
                  <span role="img" aria-label="thinking">
                    {" "}
                    🤷{" "}
                  </span>
                </p>
              )}
            </div>
          ) : null}
        </div>
        {style}
      </Layout>
    );
  }
}

Index.getInitialProps = async () => {
  // getInitialProps is a Next method to get props to be fetched to the page when its render
  return {};
};

const style = (
  <style jsx="true">
    {`
      .align-center {
        margin-left: auto;
        margin-right: auto;
      }

      .response-text {
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        top: 30%;
      }

      .block {
        display: block;
      }

      .title {
        margin-bottom: 5rem;
        margin-top: 0.5rem;
      }

      .flex-container {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
      }

      .url-input {
        width: 300px;
      }

      .center {
        justify-content: center;
      }

      .dsk-img {
        width: auto;
        height: 200px;
        margin-right: 1rem;
        margin-bottom: 1rem;
      }

      .phone-img {
        width: auto;
        height: 200px;
        margin-left: 1rem;
        margin-bottom: 1rem;
      }
    `}
  </style>
);

export default Index;
