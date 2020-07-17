import * as React from "react";
import { PrimaryButton, IButtonProps } from "office-ui-fabric-react/lib/Button";
import { Label } from "office-ui-fabric-react/lib/Label";

import { Alert } from "react-bootstrap";
export class ButtonPrimaryExample extends React.Component {
  constructor(props) {
    super(props);
  }

  insertText = async () => {
    // In the click event, write text to the document.
    await Word.run(async context => {
      let body = context.document.body;
      body.insertParagraph("Hello Office UI Fabric React!", Word.InsertLocation.end);
      await context.sync();
    });
  };

  render() {
    let { disabled } = this.props;
    return (
      <div className="ms-BasicButtonsExample">
        <Label>Click the button to insert text.</Label>
        <PrimaryButton data-automation-id="test" disabled={disabled} text="Insert text..." onClick={this.insertText} />
      </div>
    );
  }
}
