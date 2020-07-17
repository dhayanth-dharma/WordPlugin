import { Grid, Paper } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import latinize from "latinize";
import { PrimaryButton, SearchBox } from "office-ui-fabric-react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import * as React from "react";
import { withRouter } from "react-router-dom";
import req from "../../../../assets/data/req.json";
import { DocumentOutService } from "../../api";
import ContentList from "./ContentList";
import Highlighter from "./Highlighter";
import styles from "./Highlighter.css";

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
  documentName: {
    width: "90%",
    margin: "0 auto",
    height: "auto",
    background: "#e6e6e6",
    verticalAlign: "middle"
  },
  buttonDiv: {
    width: "90%",
    margin: "0 auto",
    height: "auto",
    verticalAlign: "middle"
  },
  paper: {
    width: "90%",
    margin: "1rem auto"
  },
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

class DocumentView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedItem: [],
      documentDetail: {},
      requirementData: [],
      checked: false,
      documentId: null,
      projectId: null,
      project: null,
      searchText: "",
      textToHighlight: "",
      activeIndex: -1,
      caseSensitive: false,
      contentControls: [],
      isTextSelected: true,
      requirementContent: [],
      isContentList: false,
      currentContent: []
    };
  }

  componentDidMount() {
    // this.getRequirementData(this.props.match.params.pid, this.props.match.params.did);
    // this.getDocumentDetails(this.props.match.params.did);
    // this.setState({ documentId: this.props.match.params.did });
    // this.setState({ projectId: this.props.match.params.pid });
    // MyService.getProjectDetails({ projectId: this.props.match.params.pid })
    //   .then(res => {
    //     this.setState({ project: res });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    this.setState({ requirementData: req });
    // this.registerKeyPressEvent();
  }

  getRequirementData = (pid, did) => {
    DocumentOutService.getRequirementByDoc({ docId: did, projectId: pid })
      .then(res => {
        if (res) this.setState({ requirementData: res });
      })
      .catch(error => {
        console.log(error);
      });
  };
  updateCoverage(payload) {
    DocumentOutService.updateCoverage(
      { projectId: this.state.projectId },
      { documentId: this.state.documentId },
      payload
    ).catch(err => {
      console.log(err);
      createNotification("error", err);
    });
  }
  getDocumentDetails = did => {
    DocumentOutService.get({ docId: did })
      .then(res => {
        if (res) this.setState({ documentDetail: res });
      })
      .catch(error => {
        console.log(error);
      });
  };

  checkboxChange = (e, data) => {
    const tmpReqData = [...this.state.requirementData];
    tmpReqData.find(o => o === data).covered = !tmpReqData.find(o => o === data).covered;
    this.setState({ requirementData: tmpReqData });
    this.updateCoverage(data);
  };
  checkContentRequirement = data => {
    const { requirementContent } = this.state;
    let filtered = requirementContent.filter(o => o.requirementId === data.reqProject.requirementId);
    if (filtered && filtered.length > 0) {
      return true;
    } else return false;
  };

  onChange = (event, item) => {
    const { selectedItem } = this.state;
    selectedItem.push(item);
    this.setState({ selectedItem });
  };
  stringSearch = text => {
    if (this.state.searchText && this.state.searchText != "") {
      let n = this.stringCheckExist(this.state.searchText, text);
      return n;
    } else return 1;
  };

  insertReqTableOnCursor() {
    let tableData = [];
    let row = [];
    row.push("Type");
    row.push("InformationId");
    row.push("DocumentId");
    row.push("Content");
    row.push("RequirementId");
    row.push("PageStart");
    tableData.push(row);
    this.state.requirementData.forEach(element => {
      if (element.covered) {
        let row = [];
        row.push(element.reqProject.type);
        row.push(element.reqProject.informationId);
        row.push(element.reqProject.documentId);
        row.push(element.reqProject.content);
        row.push(element.reqProject.requirementId);
        row.push(element.reqProject.pageStart);
        tableData.push(row);
      }
    });
    Word.run(async function(context) {
      var range = context.document.getSelection();
      // context.load(range);
      if (tableData.length < 2) {
        return;
      }
      return context.sync().then(function() {
        let table = range.insertTable(tableData.length, tableData[0].length, "after", tableData);
        table.styleBuiltIn = Word.Style.gridTable5Dark_Accent3;
        let myContentControl = table.insertContentControl();
        myContentControl.appearance = "BoundingBox"; //"Hidden"
        myContentControl.title = "Requirement_t_01";
        return context.sync().then(function() {
          Office.context.document.bindings.addFromNamedItemAsync("Requirement_t_01", "table", {}, function(result) {
            if (result.status == "succeeded") {
              result.value.addHandlerAsync(Office.EventType.BindingSelectionChanged, tableChangehandler);
            } else {
              console.log("error while adding bindings");
            }
          });
        });
      });
    }).catch(function(e) {
      console.log(e);
    });

    function tableChangehandler(args) {
      var row;
      if (args.startRow == undefined) {
        row = 0;
      } else {
        row = args.startRow + 1;
      }
      Word.run(function(context) {
        var selectedCell = context.document.contentControls
          .getByTitle("Requirement_t_01")
          .getFirst()
          .tables.getFirst()
          .getCell(row, args.startColumn).body;
        context.load(selectedCell);
        return context.sync().then(function() {
          console.log(selectedCell.text);
        });
      }).catch(function(e) {
        console.log("handler:" + e.message);
        console.log("error>> table cell click:" + e);
      });
    }
  }

  stringCheckExist = (searchTerm, text) => {
    let regex = new RegExp(`(${this.escapeRegex(searchTerm)})`, "i");
    let parts = text.split(regex);
    let count = 0;
    parts
      .filter(part => part)
      .map((part, i) => {
        if (regex.test(part)) {
          count++;
        }
      });
    return count;
  };
  escapeRegex = string => {
    return string.replace(/[-\/\\^$*+?.,_()|[\]{}]/g, "");
  };

  checkIsCoveredExist = () => {
    let bool = true;
    this.state.requirementData.map(element => {
      if (!element.covered) {
        bool = false;
      }
    });
    return bool;
  };

  //onKey Press Search -- Not registered yet
  registerKeyPressEvent = async () => {
    var doc = Office.context.document;
    if (doc) {
      doc.addHandlerAsync(Office.EventType.DocumentSelectionChanged, eventArgs => {
        let requirement = this.state.requirementData;
        handleSearchIn(requirement);
      });
    }
    async function handleSearchIn(requirement) {
      let requirementData = requirement;
      console.log(requirementData);

      //*******************CUSTOM WORD SEARCH. SUITABLE FOR PARAGRAPH SEARCH. COSTY FUNCTION */
      await Word.run(async context => {
        let paragraphs = context.document.body.paragraphs;
        paragraphs.load("text");
        await context.sync();
        let text = [];
        paragraphs.items.forEach(item => {
          let paragraph = item.text.trim();

          for (let i = 0; i < requirementData.length; i++) {
            console.log("searching");
            let term = requirementData[i].reqProject.content;
            if (paragraph) {
              let position = paragraph.search(term);
              if (position > 0) {
                console.log("found in this paragraph : " + paragraph);
                //highlights the paragraph
                item.font.color = "black";
                item.font.highlightColor = "Yellow";
                item.font.italic = true;
              }
            }
          }
        });
        await context.sync();
      }).catch(function(error) {
        console.log("Error: " + error);
        if (error instanceof OfficeExtension.Error) {
          console.log("Debug info: " + JSON.stringify(error.debugInfo));
        }
      });
    }
  };

  handleContentListItemClick = dataItem => {
    const { contentControls } = this.state;
    let controls = contentControls.filter(el => el.requirementId === dataItem.reqProject.requirementId);

    Word.run(context => {
      var contentControlsDoc = context.document.contentControls;
      context.load(contentControlsDoc, "title");
      return context.sync().then(async () => {
        if (contentControlsDoc.items.length === 0) {
          console.log("There isn't a content control in this document.");
        } else {
          controls.forEach(element => {
            contentControlsDoc.items.forEach(existControl => {
              console.log(existControl.title);
              if (existControl.title && existControl.title.split("_")[2] == element.id) {
                console.log("control selected");
                existControl.select(Word.SelectionMode.start);
                context.sync();
              }
            });
          });
        }
      });
    }).catch(function(error) {
      console.log("Error: " + error);
      if (error instanceof OfficeExtension.Error) {
        let mesg = "Debug info: " + error.debugInfo;
      }
    });
  };

  handleRequirementClick = dataItem => {
    let requirementContent = this.state.requirementContent;
    let existData = requirementContent.find(element => element.requirementId === dataItem.reqProject.requirementId);
    if (existData) {
      this.setState({ currentContent: existData, isContentList: true });
    }
  };

  //get title of the document clause
  getTitle = async (context, paragraph) => {
    await context.load(paragraph);
    if (paragraph.style === "Heading 1" || paragraph.style === "Heading 2") {
      console.log("heading is :" + paragraph);
    } else {
      let prev = paragraph.getPreviousOrNullObject();
      if (!prev) {
        console.log("Heading not found");
      }
      await context.load(prev);
      await context.sync();
      console.log(prev);
      getTitle(context, prev);
    }
  };

  //add contents to requirement
  handleAddContent = async data => {
    let requirementContent = this.state.requirementContent;
    let existData = requirementContent.find(element => element.requirementId === data.reqProject.requirementId);
    await Office.context.document.getSelectedDataAsync(Office.CoercionType.Text, asyncResult => {
      if (asyncResult.status == Office.AsyncResultStatus.Failed) {
        console.log("Action failed. Error: " + asyncResult.error.message);
      } else {
        if (!asyncResult.value && asyncResult.value === "") {
          return;
        } else {
          if (existData) {
            let index = requirementContent.indexOf(existData);
            let isSameText = false;
            existData.content.forEach(cont => {
              if (cont.text === asyncResult.value) {
                isSameText = true;
              }
            });
            if (!isSameText) {
              this.addContentControlOnSelectedText(existData.content.length, data.reqProject.requirementId);
              existData.content.push({
                text: asyncResult.value,
                contentControlId: data.reqProject.requirementId + "_" + existData.content.length
              });
              requirementContent[index] = existData;
            }
          } else {
            let item = {
              requirementId: data.reqProject.requirementId,
              content: [{ text: asyncResult.value, contentControlId: data.reqProject.requirementId + "_" + 0 }]
            };
            requirementContent.push(item);
            this.addContentControlOnSelectedText(0, data.reqProject.requirementId);
            this.changeCheckStatus(data);
          }
          this.setState({ requirementContent });
        }
      }
    });
  };

  changeCheckStatus = data => {
    const tmpReqData = [...this.state.requirementData];
    tmpReqData.find(o => o === data).covered = !tmpReqData.find(o => o === data).covered;
    this.setState({ requirementData: tmpReqData });
    this.updateCoverage(data);
  };

  addContentControlOnSelectedText = async (index, requirementId) => {
    const { requirementData } = this.state;
    const { contentControls } = this.state;
    await Word.run(async context => {
      var range = context.document.getSelection();
      let id = requirementId + "_" + index;

      let contentControl = range.insertContentControl();
      contentControl.appearance = "BoundingBox"; //Hidden BoundingBox
      contentControl.tag = "requirement_content";
      contentControl.title = id;
      let contentControlObj = {
        title: "requirement_content",
        id: id,
        requirementId: requirementId,
        index: index
      };
      contentControls.push(contentControlObj);
      console.log(contentControls);
      await context.sync();
      this.setState({ contentControls });
    }).catch(function(error) {
      console.log("Error: " + error);
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  };

  handleContentBackClick = () => {
    this.setState({ isContentList: false });
  };

  //delete contents from list
  handleDeleteContentClick = (req, content) => {
    let requirementContent = this.state.requirementContent;
    let contentControls = this.state.contentControls;
    let indexOfreqCon = requirementContent.indexOf(req); //which requirement
    let indexOfContent = requirementContent[indexOfreqCon].content.indexOf(content); //which content in specific requirement

    if (indexOfreqCon > -1) {
      //deleting content control
      let contentControl = contentControls.find(cc => cc.id === content.contentControlId);
      this.deleteContentControl(contentControl.id);
      let indexOfCc = contentControls.indexOf(contentControl);
      contentControls.splice(indexOfCc, 1);
      //deleting content control

      requirementContent[indexOfreqCon].content.splice(indexOfContent, 1);
      if (requirementContent[indexOfreqCon].content.length < 1) {
        requirementContent.splice(indexOfreqCon, 1);
        this.setState({
          requirementContent: requirementContent,
          isContentList: false,
          contentControls: contentControls
        });
        let requirement = this.state.requirementData.findIndex(el => el.reqProject.requirementId === req.requirementId);
        this.changeCheckStatus(this.state.requirementData[requirement]);
      } else {
        this.setState({ requirementContent: requirementContent, contentControls: contentControls });
      }
    }
  };
  onContentClick = content => {
    let contentControls = this.state.contentControls;
    let controls = contentControls.filter(el => {
      return el.id === content.contentControlId;
    });

    Word.run(context => {
      var contentControlsDoc = context.document.contentControls;
      context.load(contentControlsDoc, "title");
      return context.sync().then(async () => {
        if (contentControlsDoc.items.length === 0) {
          console.log("There isn't a content control in this document.");
        } else {
          contentControlsDoc.items.forEach(existControl => {
            if (existControl.title && existControl.title === content.contentControlId) {
              existControl.select(Word.SelectionMode.select);
              context.sync();
            }
          });
        }
      });
    }).catch(function(error) {
      console.log("Error: " + error);
      if (error instanceof OfficeExtension.Error) {
        let mesg = "Debug info: " + error.debugInfo;
      }
    });
    //**** */ */
  };

  deleteContentControl = async id => {
    await Word.run(async context => {
      var myContentControls = context.document.contentControls.getByTitle(id);
      if (myContentControls) {
        context.load(myContentControls);
        await context.sync().then(async () => {
          if (myContentControls.items[0]) {
            myContentControls.items[0].delete(true);
            await context.sync().then(() => {
              console.log("Done!");
            });
          } else {
            console.log("content control not found");
          }
        });
      }
    }).catch(err => {
      // OfficeHelpers.Utilities.log
      console.log(err);
    });
  };

  render() {
    let { disabled } = this.props;
    let { selectedItem } = this.state;
    const { requirementData } = this.state;
    const { activeIndex, caseSensitive, searchText, textToHighlight } = this.state;
    const searchWords = searchText.split(/\s/).filter(word => word);
    return this.state.isContentList ? (
      <ContentList
        onBackClick={e => {
          this.handleContentBackClick(e);
        }}
        onDelete={(dataItem, content) => {
          this.handleDeleteContentClick(dataItem, content);
        }}
        contentList={this.state.currentContent}
        onContentClick={(req, index) => {
          this.onContentClick(req, index);
        }}
      />
    ) : (
      <React.Fragment>
        <div style={style.textBody}>
          <div style={style.bodyArea}>
            <Typography component="div">
              <Box fontSize="h4.fontSize" textAlign="left" m={2}>
                Project : {this.state.project ? this.state.project.projectName : ""}
              </Box>
            </Typography>
            <SearchBox
              name="searchTerms"
              value={searchText}
              onChange={event => this.setState({ searchText: event.target.value })}
              placeholder="Search for keywords"
            />
          </div>
        </div>
        <div>
          <div style={style.documentName}>
            <Typography component="div">
              <Box
                fontSize="h5.fontSize"
                textAlign="center"
                m={1}
                style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
              >
                Document : {this.state.documentDetail.name}
              </Box>
            </Typography>
          </div>
          <div style={style.paper}>
            {requirementData && requirementData.length > 0
              ? requirementData.map((dataItem, index) => {
                  if (this.stringSearch(dataItem.reqProject.requirementId + " : " + dataItem.reqProject.content) > 0) {
                    let isDisabled = true;
                    const { requirementContent } = this.state;
                    let filtered = requirementContent.filter(o => {
                      return o.requirementId === dataItem.reqProject.requirementId;
                    });
                    if (filtered && filtered.length > 0) {
                      isDisabled = false;
                    }
                    return (
                      <Paper
                        key={index}
                        elevation={3}
                        style={{ marginBottom: "1rem" }}
                        // onClick={this.handleRequirementClick(dataItem)}
                      >
                        <Grid container spacing={3} style={{ padding: "1rem" }}>
                          <Grid item xs={10}>
                            <Checkbox
                              checked={dataItem.covered}
                              onChange={e => {
                                this.checkboxChange(e, dataItem);
                              }}
                              disabled={isDisabled}
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <IconButton
                              onClick={r => {
                                this.handleAddContent(dataItem);
                              }}
                              style={{ marginTop: "-1rem" }}
                              disabled={!this.state.isTextSelected}
                            >
                              <PlaylistAddIcon />
                            </IconButton>
                          </Grid>

                          <Grid item xs={12}>
                            <Box fontSize="h7.fontSize" textAlign="left">
                              <Highlighter
                                activeClassName={styles.Active}
                                activeIndex={activeIndex}
                                caseSensitive={caseSensitive}
                                highlightClassName={styles.Highlight}
                                highlightStyle={{ fontWeight: "normal" }}
                                sanitize={latinize}
                                searchWords={searchWords}
                                onClick={() => {
                                  this.handleRequirementClick(dataItem);
                                }}
                                textToHighlight={
                                  dataItem.reqProject.requirementId + " : " + dataItem.reqProject.content
                                }
                              />{" "}
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    );
                  } else {
                    return null;
                  }
                })
              : null}
          </div>
        </div>
        <div style={style.buttonDiv}>
          <PrimaryButton
            style={style.button}
            text="Covered Req - Table"
            onClick={this.insertReqTableOnCursor}
            allowDisabledFocus
            disabled={this.checkIsCoveredExist()}
            checked={true}
          />
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(DocumentView);
