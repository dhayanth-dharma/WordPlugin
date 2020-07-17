import * as React from "react";
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
import Login from "../login/Login";
import ProjectList from "../ProjectList/ProjectList";
import DocumentView from "../DocumentView/DocumentView";
import ContentList from "../DocumentView/ContentList";
import { HashRouter, BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Welcome from "../Welcome/Welcome";
import WordApiFunction from "../FunctionApi/WordApiFunction";
import WordApiPhaseTwo from "../FunctionApi/ApiFunctionPhaseTwo";
import DialogHelper from "../FunctionApi/DialogHelper";

const style = {
  image: {
    height: "4rem",
    width: "12rem",
    width: "50%",
    margin: "0 auto",
    paddingTop: "1rem"
  }
};
export class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  componentDidMount() {}

  insertText = async () => {
    await Word.run(async context => {
      let body = context.document.body;
      body.insertParagraph("Hello Office UI Fabric React!", Word.InsertLocation.end);
      await context.sync();
    });
  };

  navClick = () => {
    window.location.href = "/project_list";
  };
  render() {
    let { disabled } = this.props;

    return (
      <div>
        <HashRouter>
          <Switch>
            <Route path="/project_list">
              <ProjectList />
            </Route>
            <Route path="/doc_view/:pid/:did">
              <DocumentView />
            </Route>

            <Route path="/login">
              <Login />
            </Route>
            <Route path="/api/test">
              <WordApiFunction />
            </Route>
            <Route path="/next-demo">
              <WordApiPhaseTwo />
            </Route>
            <Route path="/dialog-message">
              <DialogHelper />
            </Route>
            <Route path="/content-list">
              <ContentList />
            </Route>
            <Route path="/">
              <Welcome />
            </Route>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
