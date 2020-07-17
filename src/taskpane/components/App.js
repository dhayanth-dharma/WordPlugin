import * as React from "react";
import { Button, ButtonType } from "office-ui-fabric-react";
import Header from "./Header";
import HeroList, { HeroListItem } from "./HeroList";
import Progress from "./Progress";
import { ButtonPrimaryExample } from "./Button";
import { Home } from "./Home/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const style = {
  image: {
    height: "4rem",
    width: "12rem",
    width: "50%",
    margin: "0 auto",
    paddingTop: "1rem"
  },
  loading: {
    width: "80%",
    margin: "0 auto",
    paddingTop: "-1",
    background: "#e6e6e6"
  }
};

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      listItems: []
    };
  }

  componentDidMount() {}

  click = async () => {
    return Word.run(async context => {
      const paragraph = context.document.body.insertParagraph("Hello World", Word.InsertLocation.end);
      paragraph.font.color = "blue";
      await context.sync();
    });
  };

  render() {
    const { title, isOfficeInitialized } = this.props;
    // if (!isOfficeInitialized) {
    //   return (
    //     <div style={style.loading}>
    //       <Progress title={title} logo="assets/img/ait.PNG" message="Aitenders for Microsoft-Word" />
    //     </div>
    //   );
    // }
    return (
      //
      <div className="ms-welcome">
        <Home></Home>
      </div>
    );
  }
}
