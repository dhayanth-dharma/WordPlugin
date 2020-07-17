import * as React from "react";
import { PrimaryButton } from "office-ui-fabric-react";
import { CardContent, Box, Typography, Card } from "@material-ui/core";
import { Dropdown, DropdownMenuItemType } from "office-ui-fabric-react/lib/Dropdown";
import { ProjectService } from "../../api";
import { DocumentOutService } from "../../api";
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";
import Logo from "../Elements/Logo";
import { MyService } from "../../api";
const style = {
  bodyArea: {
    marginTop: "3rem"
  },
  textBody: { marginTop: "3rem", width: "90%", margin: "0 auto" },
  loginArea: {
    width: "90%",
    margin: "0 auto",
    background: "#e6e6e6"
  },
  innerDiv: {
    width: "90%",
    margin: "0 auto"
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

class ProjectList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedItem: {},
      projectData: [],
      selectedItemProject: {},
      documentData: [],
      documentDataRaw: [],
      projectDataRaw: [],
      selectedItemDocument: {},
      isDocumentDropDownDisabled: true,
      userDetail: {}
    };
  }
  componentDidMount() {
    // let en = process.env.REACT_APP_API;
    this.getProjectList();
    MyService.getDetails()
      .then(res => {
        if (res) this.setState({ userDetail: res });
      })
      .catch(error => {
        console.log(error);
      });
  }
  getProjectList = () => {
    let projects = [];
    ProjectService.getProjectsByUser()
      .then(res => {
        projects = res;
        if (res) this.setupDropDownProject(projects);
      })
      .catch(error => {
        console.log(error);
      });
  };

  setupDropDownProject = projectData => {
    let projects = [];
    projectData.map((data, index) => {
      let item = {};
      item.key = data.projectId;
      item.text = data.projectName;
      item.index = index;
      projects.push(item);
      if (index % 5 === 0) {
        let itemDivide = { key: "divider_" + index, text: "-", itemType: DropdownMenuItemType.Divider };
        projects.push(itemDivide);
      }
    });
    this.setState({ projectData: projects });
    this.setState({ projectDataRaw: projectData });
  };
  onDeliveribleChange = (event, item) => {
    let selectedItem = this.state.documentDataRaw[item.index];
    this.setState({ selectedItemDocument: selectedItem });
  };
  onProjectChange = (event, item) => {
    let selectedItem = this.state.projectDataRaw[item.index];
    this.setState({ selectedItemProject: selectedItem });
    if (item && item.index) {
      let documents = [];
      let project = this.state.projectDataRaw[item.index];
      let documentsRaw = [];
      DocumentOutService.getUserDocuments({ projectId: project.projectId })
        .then(res => {
          documentsRaw = res;
          if (!documentsRaw || documentsRaw.length < 1) {
            this.setState({ documentData: [] });
            this.setState({ documentDataRaw: [] });
            this.setState({ isDocumentDropDownDisabled: true });
            return;
          }
          documentsRaw.map((data, index) => {
            let item = {};
            item.key = data.id;
            item.text = data.name;
            item.index = index;
            documents.push(item);
            if (index % 5 === 0) {
              let itemDivide = { key: "divider_" + index, text: "-", itemType: DropdownMenuItemType.Divider };
              documents.push(itemDivide);
            }
          });
          this.setState({ documentData: documents });
          this.setState({ documentDataRaw: documentsRaw });
          this.setState({ isDocumentDropDownDisabled: false });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  setDocumentDropDownItem = () => {};
  handleAccessProject = () => {
    let { selectedItemProject } = this.state;
    let { selectedItemDocument } = this.state;
    this.props.history.push(`/doc_view/1/36`);

    if (selectedItemProject && selectedItemDocument && selectedItemProject.projectId && selectedItemDocument.id) {
      this.props.history.push(`/doc_view/${selectedItemProject.projectId}/${selectedItemDocument.id}`);
    }
  };

  render() {
    let { disabled } = this.props;
    let { selectedItemProject } = this.state;
    let { selectedItemDocument } = this.state;
    let { selectedItem } = this.state;
    let { documentData } = this.state;
    return (
      <React.Fragment>
        <Logo />
        <div style={style.textBody}>
          <Typography component="div">
            <Box fontSize="h5.fontSize" textAlign="left" m={2}>
              Welcome {this.state.userDetail.firstName}.
            </Box>
            <Box textAlign="left" m={2}>
              Select a project to work on
            </Box>
          </Typography>
        </div>
        <div style={style.bodyArea}>
          <Card style={style.root}>
            <CardContent>
              <div style={style.loginArea}>
                <div style={style.innerDiv}>
                  <div>
                    <Dropdown
                      label="Select a Project"
                      selectedKey={selectedItemProject ? selectedItemProject.key : undefined}
                      onChange={this.onProjectChange}
                      placeholder="Select an option"
                      options={this.state.projectData}
                    />
                  </div>
                  <div>
                    <Dropdown
                      label="Select a Deliverables"
                      selectedKey={selectedItemDocument ? selectedItemDocument.key : undefined}
                      onChange={this.onDeliveribleChange}
                      placeholder="Select an option"
                      options={documentData}
                      disabled={this.state.isDocumentDropDownDisabled}
                    />
                  </div>

                  <div>
                    <PrimaryButton
                      style={style.button}
                      text="Access project"
                      onClick={this.handleAccessProject}
                      allowDisabledFocus
                      // disabled={
                      //   selectedItemProject &&
                      //   selectedItemDocument &&
                      //   selectedItemProject.projectId &&
                      //   selectedItemDocument.id
                      //     ? false
                      //     : true
                      // }
                      checked={true}
                      selectedItemProject={this.state.selectedItemProject}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(ProjectList);
