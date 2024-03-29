import * as React from "react";

export default class HeroList extends React.Component {
  render() {
    const { children, items, message } = this.props;

    const listItems = items.map((item, index) => (
      <li className="ms-ListItem" key={index}>
        <i className={`ms-Icon ms-Icon--${item.icon}`}></i>
        <span className="ms-font-m ms-fontColor-neutralPrimary">{item.primaryText}</span>
      </li>
    ));
    return (
      <main className="ms-welcome__main">
        <h1 className="ms-font-xxxl ms-fontWeight-strong ms-fontColor-neutralPrimary ms-u-slideUpIn20">{message}</h1>
        <ul className="ms-List ms-welcome__features ms-u-slideUpIn10">{listItems}</ul>
        {children}
      </main>
    );
  }
}
