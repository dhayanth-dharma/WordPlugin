import * as React from "react";
import { Image } from "office-ui-fabric-react/lib/Image";

const style = {
  image: {
    width: "30%",
    margin: "0 auto",
    paddingTop: "1rem"
  },
  loginArea: {
    width: "90%",
    margin: "0 auto",
    paddingTop: "-1",
    background: "#e6e6e6"
  },
  innerDiv: {
    width: "90%",
    margin: "0 auto",
    paddingTop: "-1"
  },
  root: {
    minWidth: 275,
    marginTop: "-40px"
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
export default class Logo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    let { disabled } = this.props;
    return (
      <React.Fragment>
        <div>
          <Image style={style.image} src="src/resources/images/new_aitenders_logo.png" alt="AITenders Logo" />
        </div>
      </React.Fragment>
    );
  }
}
// export default
