import * as React from "react";
import { PrimaryButton } from "office-ui-fabric-react";
class DialogHelper extends React.Component {
  ok = () => {
    debugger;
    Office.context.ui.messageParent(true);
  };
  render() {
    return (
      <div>
        <PrimaryButton
          variant="primary"
          className="ms-welcome__action"
          onClick={() => {
            console.log("Changed");
          }}
        >
          Show Dialog Message
        </PrimaryButton>
      </div>
    );
  }
}

export default DialogHelper;
