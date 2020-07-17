import * as React from "react";
import { PrimaryButton } from "office-ui-fabric-react";
import Alert from "@material-ui/lab/Alert";
import HeroList from "../HeroList";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { Typography, Link } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Logo from "../Elements/Logo";
import { PublicService } from "../../api";
const style = {
  loginArea: {
    width: "80%",
    margin: "0 auto",
    background: "#e6e6e6",
    verticalAlign: "middle"
  },
  alert: {
    width: "80%",
    margin: "0 auto",
    height: "6rem"
  },
  innerDiv: {
    width: "90%",
    left: "9%",
    position: "relative",
    top: "50%"
  },
  root: {
    minWidth: 275,
    marginTop: "-0.5rem"
  },
  textField: {
    margin: "0 auto",
    width: "90%"
  },
  button: {
    marginTop: "1rem",
    marginBottom: "1.5rem",
    width: "90%"
  }
};
export default class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      listItems: [],
      email: "",
      password: "",
      alertError: 200,
      openVersioning: false,
      buttonStatus: true,
      instance: ""
    };
  }
  componentDidMount() {
    this.setState({
      listItems: [
        {
          icon: "Ribbon",
          primaryText: "Your add-in for smart tender answer drafting and requirment coverage"
        },
        {
          icon: "Unlock",
          primaryText: "Sign-in to access content on the projects you are working on:  "
        }
      ]
    });
  }

  insertText = async () => {
    await Word.run(async context => {
      let body = context.document.body;
      body.insertParagraph("Hello Office UI Fabric React!", Word.InsertLocation.end);
      await context.sync();
    });
  };

  handleLogin = () => {
    event.preventDefault();
    if (this.state.email && this.state.password && this.state.email != "" && this.state.password != "")
      this.login(this.state.email, this.state.password);
  };
  handleLogin2 = () => {
    event.preventDefault();

    this.login("gilles.morin@engie.com", "aitenders");
  };
  handleSubmit = () => {
    event.preventDefault();
    if (this.state.email && this.state.password && this.state.email != "" && this.state.password != "")
      this.login(this.state.email, this.state.password);
  };

  login(email, password, instance) {
    instance = this.state.instance;
    if (this.state.instance && this.state.instance != "") {
      PublicService.loginWithInstance({ email: email, password: password, instance: instance })
        .then(res => {
          if (res.headers["authorization"]) {
            window.sessionStorage.setItem("token", res.headers["authorization"]);
            window.location.hash = "/project_list";
          } else {
            throw new Error();
          }
        })
        .catch(error => {
          this.handleError(error);
        });
    } else {
      PublicService.login({ email: email, password: password })
        .then(res => {
          if (res.headers["authorization"]) {
            window.sessionStorage.setItem("token", res.headers["authorization"]);
            window.location.hash = "/project_list";
          } else {
            throw new Error();
          }
        })
        .catch(error => {
          this.handleError(error);
        });
    }
  }

  handleError = error => {
    this.setState({ alertError: error });
    setTimeout(() => {
      this.setState({ alertError: 200 });
    }, 4000);
  };

  handleChangeMail = e => {
    this.setState({ email: e.target.value });
    if (e.target.value && this.state.password && e.target.value != "" && this.state.password != "")
      this.setState({ buttonStatus: false });
    else this.setState({ buttonStatus: true });
  };
  handleChangeInstance = e => {
    this.setState({ instance: e.target.value });
    if (e.target.value && this.state.password && e.target.value != "" && this.state.password != "")
      this.setState({ buttonStatus: false });
    else this.setState({ buttonStatus: true });
  };
  handleChangePassword = e => {
    this.setState({ password: e.target.value });
    if (this.state.email && e.target.value && this.state.email != "" && e.target.value != "")
      this.setState({ buttonStatus: false });
    else this.setState({ buttonStatus: true });
  };
  render() {
    let { disabled } = this.props;
    return (
      <React.Fragment>
        <Logo />
        <HeroList message="WELCOME" items={this.state.listItems}></HeroList>
        {this.state.alertError !== 200 ? (
          <div style={style.alert}>
            <Alert
              variant="filled"
              severity="error"
              onClose={() => {
                this.setState({ alertError: 200 });
              }}
            >
              Your email/password is incorrect. Please try again.
            </Alert>
          </div>
        ) : null}
        <Card style={style.root}>
          <CardContent>
            <div style={style.loginArea}>
              <form onSubmit={this.handleSubmit}>
                <div style={style.innerDiv}>
                  <div>
                    <TextField
                      style={style.textField}
                      id="instance"
                      label="www.engine.aitenders.com"
                      disabled={false}
                      onChange={this.handleChangeInstance}
                    />
                  </div>
                  <div>
                    <TextField
                      style={style.textField}
                      id="email"
                      label="someone@.outlookcom"
                      autoFocus
                      onChange={this.handleChangeMail}
                      required
                    />
                  </div>
                  <div>
                    <TextField
                      style={style.textField}
                      id="password"
                      label="password"
                      type="password"
                      onChange={this.handleChangePassword}
                      required
                    />
                  </div>
                  <div>
                    <PrimaryButton
                      style={style.button}
                      text="SIGN IN"
                      type="submit"
                      onClick={this.handleLogin}
                      allowDisabledFocus
                      disabled={this.state.buttonStatus}
                      checked={true}
                    />
                  </div>
                  <div>
                    <PrimaryButton
                      style={style.button}
                      text="GO IN"
                      type="submit"
                      onClick={this.handleLogin2}
                      allowDisabledFocus
                      checked={true}
                    />
                  </div>
                </div>
              </form>
            </div>
          </CardContent>
          <div>
            <Typography align="right">
              <Link
                href="#"
                onClick={e => {
                  window.location.href = "https://dev.aitenders.com/forgotten-password";
                }}
                style={{ textDecoration: "none", marginRight: "1.6rem" }}
              >
                Forgot your password
              </Link>
            </Typography>
          </div>
        </Card>
      </React.Fragment>
    );
  }
}
// export default
