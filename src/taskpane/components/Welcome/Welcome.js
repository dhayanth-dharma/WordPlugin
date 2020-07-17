import * as React from "react";

import HeroList from "../HeroList";
import { Typography, Link } from "@material-ui/core";
import Logo from "../Elements/Logo";
import { FontIcon } from "office-ui-fabric-react/lib/Icon";
import { mergeStyles, mergeStyleSets } from "office-ui-fabric-react/lib/Styling";
import { Link as RouteLink } from "react-router-dom";
const iconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: "0 25px"
});
const classNames = mergeStyleSets({
  deepSkyBlue: [{ color: "deepskyblue", size: "10px" }, iconClass]
});
const style = {
  image: {
    height: "4rem",
    width: "12rem",
    width: "50%",
    margin: "0 auto",
    paddingTop: "1rem"
  },
  loginArea: {
    width: "50%",
    margin: "0 auto",
    background: "#0000",
    marginTop: "1rem"
  },

  innerDiv: {
    width: "50%",
    margin: "0 auto",
    paddingTop: "-1"
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  textField: {
    // margin: "0 auto",
    width: "100%"
  },
  button: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    width: "100%"
  }
};
export default class Welcome extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      listItems: [],
      email: "",
      password: "",
      alertError: 200,
      openVersioning: false
    };
  }
  componentDidMount() {
    this.setState({
      listItems: [
        {
          icon: "Handwriting",
          primaryText: "Draft and review more efficiently"
        },
        {
          icon: "CompletedSolid",
          primaryText: "Improve your document accuracy  "
        },
        {
          icon: "BufferTimeBefore",
          primaryText: "Reduce time-consuming validation"
        }
      ]
    });
  }

  render() {
    let { disabled } = this.props;
    return (
      <React.Fragment>
        <Logo />
        <HeroList message="WELCOME" items={this.state.listItems}></HeroList>

        <div style={style.loginArea}>
          <div>
            <Typography align="center">
              <Link href="#" onClick={e => {}} style={{ textDecoration: "none" }}>
                <RouteLink to="/login">Get Started!</RouteLink>
                <FontIcon iconName="play" style={{ height: "20px", marginLeft: "0.5rem" }} />
              </Link>
            </Typography>
          </div>
          <div>
            <Typography align="center">
              <Link href="#" onClick={e => {}} style={{ textDecoration: "none" }}>
                <RouteLink to="/api/test">Demo Function!</RouteLink>
              </Link>
            </Typography>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
