import * as React from "react";
// import { PrimaryButton, IButtonProps } from "office-ui-fabric-react/lib/Button";
import { DefaultButton, PrimaryButton, IButtonProps, Stack, IStackTokens } from "office-ui-fabric-react";

import { Label } from "office-ui-fabric-react/lib/Label";
import { Image } from "office-ui-fabric-react/lib/Image";
import { Alert } from "react-bootstrap";
import HeroList, { HeroListItem } from "../HeroList";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Login from "./login/Login";
import ProjectList from "./ProjectList/ProjectList";
import DocumentView from "./DocumentView/DocumentView";
import { HashRouter, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

const style = {
  image: {
    height: "4rem",
    width: "12rem",
    width: "50%",
    margin: "0 auto",
    paddingTop: "1rem"
  }
};
export class Router extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    let { disabled } = this.props;

    return (
      <React.Fragment>
        <HashRouter>
          <Switch>
            <Route path="/project_list">
              <ProjectList />
            </Route>
            <Route path="/doc_view">
              <DocumentView />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </HashRouter>
      </React.Fragment>
    );
    // <Login></Login>;
  }
}
