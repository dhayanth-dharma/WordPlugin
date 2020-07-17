import { Box, Grid, Paper } from "@material-ui/core";
import SnackbarContent from "@material-ui/core/SnackbarContent"; // PoP UP POPER
import { PrimaryButton } from "office-ui-fabric-react";
import * as React from "react";

const style = {
  image: {
    height: "4rem",
    width: "12rem",
    width: "50%",
    margin: "0 auto",
    paddingTop: "1rem"
  }
};
export default class WordApiPhaseTwo extends React.Component {
  textData = [
    "Click this text and then, double-click on the word body to past it",
    "some sample text",
    "This is tests",
    "LOCAL SETTINGS CAN BE Referenced AS LOCAL STORAGE IN JS ENV"
  ];
  constructor(props, context) {
    super(props, context);
    this.state = {
      searchTerm: "",
      searchTermTable: "",
      selectedText: "",
      textData: this.textData,
      popOpen: "none",
      lockDoc: false,
      keyPress: false
    };
  }
  componentDidMount() {
    // this.registerBindChangeEvent();
    this.wrapBodyInsideContentControl();
    // this.registerKeyPressEvent();
    // this.subscribeToEvent();
  }

  debugger;
  wrapBodyInsideContentControl = () => {
    Word.run(function(context) {
      var body = context.document.body;
      body.insertContentControl();
      return context.sync().then(function() {
        console.log("Wrapped the body in a content control.");
      });
    }).catch(function(error) {
      console.log("Error: " + JSON.stringify(error));
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  };

  lockDoc = async () => {
    if (!this.state.lockDoc) {
      await Word.run(function(context) {
        var contentControls = context.document.body.contentControls;
        context.load(contentControls);

        return context.sync().then(function() {
          if (contentControls.items.length === 0) {
            console.log("No content control found.");
          } else {
            return context.sync().then(function() {
              for (var i = 0; i < contentControls.items.length; i++) {
                contentControls.items[i].cannotEdit = true;
              }
            });
          }
        });
      }).catch(function(error) {
        console.log("Error: " + JSON.stringify(error));
        if (error instanceof OfficeExtension.Error) {
          console.log("Debug info: " + JSON.stringify(error.debugInfo));
        }
      });
    } else {
      this.unlockDoc();
    }
    this.setState({ lockDoc: !this.state.lockDoc });
  };

  //search every words within the same doc and count the occurrence.
  searchCount = async () => {
    await Word.run(async context => {
      let paragraphs = context.document.body.paragraphs;
      paragraphs.load("text");
      await context.sync();
      let text = [];
      paragraphs.items.forEach(item => {
        let paragraph = item.text.trim();
        if (paragraph) {
          paragraph.split(" ").forEach(term => {
            let currentTerm = term.trim();
            if (currentTerm) {
              text.push(currentTerm);
            }
          });
        }
      });

      let makeTextDistinct = new Set(text);
      let distinctText = Array.from(makeTextDistinct);
      let allSearchResults = [];

      for (let i = 0; i < distinctText.length; i++) {
        let results = context.document.body.search(distinctText[i], { matchCase: true, matchWholeWord: true });
        results.load("text");

        // Map search term with its results.
        let correlatedResults = {
          searchTerm: distinctText[i],
          hits: results
        };
        allSearchResults.push(correlatedResults);
      }
      await context.sync();
      // Display counts.
      allSearchResults.forEach(result => {
        let length = result.hits.items.length;
        console.log("Search term: " + result.searchTerm + " => Count: " + length);
      });
    }).catch(error => {
      console.log("Error: " + error);
    });
  };

  unlockDoc = async () => {
    await Word.run(function(context) {
      var contentControls = context.document.body.contentControls;
      context.load(contentControls);

      return context.sync().then(function() {
        if (contentControls.items.length === 0) {
          console.log("No content control found.");
        } else {
          return context.sync().then(function() {
            // contentControlsWithTag.items[0].insertHtml("<b>Hello World</b>", 'Replace');
            for (var i = 0; i < contentControls.items.length; i++) {
              contentControls.items[i].cannotEdit = false;
            }
          });
        }
      });
    }).catch(function(error) {
      console.log("Error: " + JSON.stringify(error));
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  };

  htmlList = async () => {
    await Word.run(function(context) {
      var body = context.document.body;
      var currentHtml = body.getHtml();
      // We can ge the documetn at Ooxml as well // getOoxml()
      // var currentHtml = body.getHtml();
      body.insertHtml(
        `<ul style='list-style-type: circle; background: #ff9999;
        padding: 20px;'>
          <li>Coffee</li>
          <li>Tea</li>
          <li>Tea</li>
        </ul>`,
        Word.InsertLocation.start
      );
      return context.sync().then(function() {
        console.log(currentHtml);
        console.log("HTML added to the beginning of the document body.");
      });
    }).catch(function(error) {
      console.log("Error: " + JSON.stringify(error));
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  };

  //this work around working for key press event
  registerKeyPressEvent = () => {
    if (this.state.keyPress) {
      var doc = Office.context.document;
      if (doc) {
        debugger;
        doc.addHandlerAsync(Office.EventType.DocumentSelectionChanged, function(eventArgs) {
          console.log(eventArgs);
          write(eventArgs);
        });
      }

      function write(message) {
        document.getElementById("message").innerText += message;
      }
    } else {
      this.unRegisterKeyPressEvent();
    }
  };
  //this work around working for key press event
  unRegisterKeyPressEvent = () => {
    var doc = Office.context.document;
    if (doc) {
      doc.removeHandlerAsync(Office.EventType.DocumentSelectionChanged);
    }
  };

  //
  registerBindChangeEvent = () => {
    Office.context.document.bindings.getByIdAsync("myBinding", function(asyncResult) {
      console.log(asyncResult.value.document.url);
    });
  };

  onTextSelected = text => {
    this.setState({ selectedText: text });
    this.subscribeToEvent();
    this.handlePopOpen("block");
  };
  //adding event listner to office adding
  subscribeToEvent = () => {
    Office.context.document.addHandlerAsync(Office.EventType.DocumentSelectionChanged, this.addComment);
  };
  addComment = evtArgs => {
    //here i can show the popup window
    //then i can invoke the pasting method based on the selection, either full text or heading
    var text = this.state.selectedText;
    if (text && text != "") {
      Office.context.document.setSelectedDataAsync(text, function(asyncResult) {
        if (asyncResult.status == Office.AsyncResultStatus.Failed) {
          write(asyncResult.error.message);
        }
      });
    }
    this.setState({ selectedText: "" });
  };

  //this functino can be used to add text to specific location on mouse click
  onClickAddTextToClikedArea = evtArgs => {
    Office.context.document.addHandlerAsync(Office.EventType.DocumentSelectionChanged, addTextOnClickedPlace());

    function addTextOnClickedPlace() {
      Office.context.document.setSelectedDataAsync("Hello World!", function(asyncResult) {
        if (asyncResult.status == Office.AsyncResultStatus.Failed) {
          write(asyncResult.error.message);
        }
      });
    }
  };

  //detecting changes in the selection
  detectingChangesInTheSelected() {
    Office.context.document.addHandlerAsync("documentSelectionChanged", myHandler, function(result) {});
    function myHandler(eventArgs) {
      write("Document Selection Changed");
    }
    function write(message) {
      document.getElementById("message").innerText += message;
    }
  }
  stopDetectingChangesInSelection() {
    Office.context.document.removeHandlerAsync("documentSelectionChanged", { handler: myHandler }, function(result) {});
  }

  handlerClick = evtArgs => {
    evtArgs.document.getSelectedDataAsync(Office.CoercionType.Text, function(asyncResult) {
      if (asyncResult.status == Office.AsyncResultStatus.Failed) {
        write("Action failed. Error: " + asyncResult.error.message);
      } else {
        write("Selected data: " + asyncResult.value);
      }
    });
    function write(message) {
      document.getElementById("message").innerText += message;
    }
  };
  //   componentDidUpdate(prevState, newState) {}
  navClick = () => {
    window.location.href = "/project_list";
  };
  click = async () => {
    var t = `Video provides a powerful way to help you prove your point. When you click Online Video, you can paste in the embed code for the video you want to add. You can also type a keyword to search online for the video that best fits your document.
    To make your document look professionally produced, Word provides header, footer, cover page, and text box designs that complement each other. For example, you can add a matching cover page, header, and sidebar. Click Insert and then choose the elements you want from the different galleries.
    Themes and styles also help keep your World documenkt coordinated. When you click Design and choose a new Theme, the pictures, charts, and SmartArt graphics change to match your new theme. When you apply styles, your headings change to match the new theme.
    Save time in Word with new buttons that show world up where you need them. To change the way a picture fits in your document, click it and a button for layout options appears next to it. When you work on a table, click where you want to add a row or a column, and then click the plus sign.
    Reading is easier, too, in the new Reading view. You can collapse parts of the document and focus on the text you want. If you need to stop reading before you reach the end, Word remembers where you left off - even on another device.
    `;
    return Word.run(async context => {
      const paragraph = context.document.body.insertParagraph(t, Word.InsertLocation.start);
      paragraph.font.color = "blue";
      await context.sync();
    });
  };

  contentControllAdd = async () => {
    //********************IMPORTANT NOTE */
    //REMEMBER TO ADD UNIQUE TITLE AND TAG. OTHERWISE YOU CANT ATTACH EVENT TO THE CONTROLS
    await Word.run(async context => {
      let paragraphs = context.document.body.paragraphs;
      paragraphs.load("$none");
      await context.sync();

      for (let i = 0; i < paragraphs.items.length; i++) {
        let contentControl = paragraphs.items[i].insertContentControl();
        // For even, tag "even".
        if (i % 2 === 0) {
          contentControl.tag = "even";
          contentControl.title = "even";
          //   contentControl.addHandlerAsync(Office.EventType.ItemChanged, contentControlClick);
          //   await contentControl.select("Select");
          //   await context.sync();
          //   Bindings.addFromSelectionAsync();
          //   await context.sync();
          //   Binding.addHandlerAsync(Office.EventType.ItemChanged, contentControlClick);
          //   await context.sync();

          //   contentControl.bindings.addFromSelectionAsync({ id: "Binding" + i }, function(result) {
          //     if (result.status == "succeeded") {
          //       result.value.addHandlerAsync(Office.EventType.BindingSelectionChanged, handlers);
          //     }
          //   });
          //   function handlers() {
          //     console.log("Event Triggered!");
          //   }
        } else {
          contentControl.tag = "odd";
          contentControl.title = "odd";
        }
      }
      console.log("Content controls inserted: " + paragraphs.items.length);
      await context.sync();
    }).catch(error => {
      console.log(error);
    });

    //after creating content control, we attaching event to that specific content
    //remember the content you retreive while attaching event should be unique, means it should contain unique title.
    this.CreateCCSelectionChangedEvent();
  };

  CreateCCSelectionChangedEvent = () => {
    try {
      //   Office.context.document.bindings.addFromNamedItemAsync("even", "text", { id: "Binding01" }, function(result) {
      //     if (result.status == "succeeded") {
      //       result.value.addHandlerAsync(Office.EventType.BindingSelectionChanged, function(result) {
      //         console.log("Event Triggered!");
      //       });
      //     }
      //   });
      Office.context.document.bindings.addFromNamedItemAsync("odd", "text", { id: "Binding01" }, function(result) {
        if (result.status === "succeeded") {
          result.value.addHandlerAsync(Office.EventType.BindingSelectionChanged, function() {
            console.log("Don't touch me");
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  contentControlClick = () => {
    console.log("Works clicks");
  };
  insertHtmlOnSelectedRange = async () => {
    Word.run(function(context) {
      // Queue a command to get the current selection and then
      // create a proxy range object with the results.
      var range = context.document.getSelection();

      // Queue a command to insert HTML in to the beginning of the range.
      range.insertHtml(
        `<p><abbr title="World Health Organization">WHO</abbr> was founded in 1948.</p>`,
        Word.InsertLocation.start
      );

      // Synchronize the document state by executing the queued commands,
      // and return a promise to indicate task completion.
      return context.sync().then(function() {
        console.log("HTML added to the beginning of the range.");
      });
    }).catch(function(error) {
      console.log("Error: " + JSON.stringify(error));
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  };

  addTableRow = async () => {
    await Word.run(async context => {
      const tableCollection = context.document.body.tables;
      context.load(tableCollection);
      await context.sync();
      for (var i = 0; i < tableCollection.items.length; i++) {
        var theTable = null;
        theTable = tableCollection.items[i];
        var cell1 = theTable.values[0][0];
        // if (cell1 == "Apple") {
        context.load(theTable, "");
        await context.sync();
        let numRows = theTable.rowCount.toString();
        theTable.addRows("End", 1, [[numRows, "newly inserted row"]]);
        // }
      }
    });
  };

  //************************MAY BE USEFUL IN SOME CASES */
  //get the content control of clicked item in word doc
  insideOfContentControlCheck() {
    Word.run(function(ctx) {
      var myCC = ctx.document.getSelection().parentContentControl;
      ctx.load(myCC); // I think this is the part you are missing!
      return ctx.sync().then(function() {
        console.log(myCC.title); // if there is a content control we'll show the title
      });
    }).catch(function(e) {
      //there is no ContentControl.
      console.log("Error", e.message);
    });
  }

  removeComment() {
    Word.run(async context => {
      let body = context.document.body;
      let bodyOOXML = body.getOoxml();

      await context.sync();
      let bodyOOXMLText = bodyOOXML.value;
      var cleanText = removeXml(bodyOOXMLText);
      body.insertOoxml(cleanText, Word.InsertLocation.replace);
    });

    function removeXml(xmlString) {
      let xmlText = "";
      try {
        // initialize DOM parser
        let parser = new DOMParser();
        let namespace = [];

        // parse XML string into XML DOM object
        let xmlDoc = parser.parseFromString(xmlString, "text/xml");

        // get xml namespace prefix for 'pkg'
        namespace["pkg"] = xmlDoc.documentElement.getAttribute("xmlns:pkg");

        // get all 'pkg:part' nodes
        let allChildrenNodes = xmlDoc.getElementsByTagNameNS(namespace["pkg"], "part");

        // delete comments.xml node in pkg:part
        let currentChildNode = allChildrenNodes[0];
        while (currentChildNode !== null && currentChildNode.getAttribute("pkg:name").match("comments.xml") === null) {
          currentChildNode = currentChildNode.nextSibling;
        }
        if (currentChildNode !== null) currentChildNode.parentNode.removeChild(currentChildNode);

        // get document relationship package
        currentChildNode = allChildrenNodes[0];
        while (currentChildNode !== null && currentChildNode.getAttribute("pkg:name").match("word/_rels") === null) {
          currentChildNode = currentChildNode.nextSibling;
        }

        // get all relationships
        let relationships = currentChildNode.getElementsByTagName("Relationship");

        // delete comment relationship from relationships
        let currentRelationship = relationships[0];
        while (
          currentRelationship !== null &&
          currentRelationship.getAttribute("Target").match("comments.xml") === null
        ) {
          currentRelationship = currentRelationship.nextSibling;
        }
        if (currentRelationship !== null) currentRelationship.parentNode.removeChild(currentRelationship);

        // get main document
        currentChildNode = allChildrenNodes[0];
        while (
          currentChildNode !== null &&
          currentChildNode.getAttribute("pkg:name").match("/word/document.xml") === null
        ) {
          currentChildNode = currentChildNode.nextSibling;
        }

        // get w namespace
        namespace["w"] = currentChildNode.childNodes[0].childNodes[0].getAttribute("xmlns:w");

        // get commentRangeStart nodes
        let commentRangeStartNodes = currentChildNode.getElementsByTagNameNS(namespace["w"], "commentRangeStart");
        while (commentRangeStartNodes.length > 0) {
          commentRangeStartNodes[0].parentNode.removeChild(commentRangeStartNodes[0]);
        }

        // get commentReference nodes
        let commentReferenceNodes = currentChildNode.getElementsByTagNameNS(namespace["w"], "commentReference");
        while (commentReferenceNodes.length > 0) {
          commentReferenceNodes[0].parentNode.removeChild(commentReferenceNodes[0]);
        }

        // get commentRangeEnd nodes
        let commentRangeEndNodes = currentChildNode.getElementsByTagNameNS(namespace["w"], "commentRangeEnd");
        while (commentRangeEndNodes.length > 0) {
          commentRangeEndNodes[0].parentNode.removeChild(commentRangeEndNodes[0]);
        }

        xmlText = new XMLSerializer().serializeToString(xmlDoc);
      } catch (err) {
        console.log(err);
      }

      return xmlText;
    }
  }

  removingOoxml() {
    // adding comment link
    //https://social.msdn.microsoft.com/Forums/Lync/en-US/bf46fe31-9aa2-4ade-9d7a-c4fba00eebed/issue-while-inserting-comment-in-word-using-officejs?forum=appsforoffice
    /****************************** */
    //removing comment link
    // https://stackoverflow.com/questions/44804345/how-to-delete-an-inserted-ooxml-comment-using-word-js-api?noredirect=1&lq=1
    //************************************ */
    //Binding event handler to contentControl working example
    //https://stackoverflow.com/questions/57571842/office-js-word-add-in-document-to-sidebar-communication

    //helps to replace the oxl which already added.
    //but i decided to get set tag to each commented word along with content control . so i can delete the word and add new there
    Word.run(function(ctx) {
      var myTempOOXML = "get some valid  OOXML!";
      ctx.document.body.paragraphs
        .getFirst()
        .split([" "], false, false, false)
        .getFirst()
        .insertOoxml(myTempOOXML, "replace");
      return ctx.sync();
    }).catch(function(e) {
      app.showNotification(e.message);
    });
  }

  insertInlineImage = async () => {
    Word.run(function(context) {
      var body = context.document.body;
      var myOOXML =
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <?mso-application progid="Word.Document"?>
        <pkg:package 
            xmlns:pkg="http://schemas.microsoft.com/office/2006/xmlPackage">
            <pkg:part pkg:name="/_rels/.rels" pkg:contentType="application/vnd.openxmlformats-package.relationships+xml" pkg:padding="512">
                <pkg:xmlData>
                    <Relationships 
                        xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
                        <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
                    </Relationships>
                </pkg:xmlData>
            </pkg:part>
            <pkg:part pkg:name="/word/_rels/document.xml.rels" pkg:contentType="application/vnd.openxmlformats-package.relationships+xml" pkg:padding="256">
                <pkg:xmlData>
                    <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
                        <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments" Target="comments.xml"/>
                    </Relationships>
                </pkg:xmlData>
            </pkg:part>
            <pkg:part pkg:name="/word/document.xml" pkg:contentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml">
                <pkg:xmlData>
                    <w:document 
                        xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
                        <w:body>
                            <w:p>
                                <w:commentRangeStart w:id="0"/>
                                <w:r><w:t xml:space="preserve">` +
        "This is preseve" +
        `</w:t></w:r>
                                <w:r>
                                    <w:commentReference w:id="0"/>
                                </w:r>
                                <w:commentRangeEnd w:id="0"/>
                            </w:p>
                        </w:body>
                    </w:document>
                </pkg:xmlData>
            </pkg:part>
            <pkg:part pkg:name="/word/comments.xml" pkg:contentType="application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml">
                <pkg:xmlData>
                    <w:comments 
                        xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
                        <w:comment w:id="0" >
                            <w:p><w:r><w:t>comment text from API</w:t></w:r></w:p>
                        </w:comment>
                    </w:comments>
                </pkg:xmlData>
            </pkg:part>
        </pkg:package>`;

      body.insertOoxml(myOOXML, Word.InsertLocation.start);
      return context.sync().then(function() {
        console.log("OOXML added to the beginning of the document body.");
      });
    }).catch(function(error) {
      console.log("Error: " + JSON.stringify(error));
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  };

  addCommentOnSelection = async () => {
    Office.context.document.getSelectedDataAsync(Office.CoercionType.Text, function(asyncResult) {
      if (asyncResult.status == Office.AsyncResultStatus.Failed) {
        console.log("Action failed. Error: " + asyncResult.error.message);
      } else {
        var selectedData = asyncResult.value;
        console.log("Selected data: " + asyncResult.value);
        Word.run(function(contextWord) {
          var range = contextWord.document.getSelection();
          return contextWord.sync().then(function() {
            var myComment = prepareComment(selectedData);
            if (myComment && myComment != "") {
              range.clear();
              range.delete();
              range.styleBuiltIn = "Normal";
              range.insertOoxml(myComment);
              return contextWord.sync();
            }
          });
        });
      }
    });

    function prepareComment(text) {
      if (text && text != "")
        var myComment =
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
          <?mso-application progid="Word.Document"?>
          <pkg:package 
              xmlns:pkg="http://schemas.microsoft.com/office/2006/xmlPackage">
              <pkg:part pkg:name="/_rels/.rels" pkg:contentType="application/vnd.openxmlformats-package.relationships+xml" pkg:padding="512">
                  <pkg:xmlData>
                      <Relationships 
                          xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
                          <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
                      </Relationships>
                  </pkg:xmlData>
              </pkg:part>
              <pkg:part pkg:name="/word/_rels/document.xml.rels" pkg:contentType="application/vnd.openxmlformats-package.relationships+xml" pkg:padding="256">
                  <pkg:xmlData>
                      <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
                          <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments" Target="comments.xml"/>
                      </Relationships>
                  </pkg:xmlData>
              </pkg:part>
              <pkg:part pkg:name="/word/document.xml" pkg:contentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml">
                  <pkg:xmlData>
                      <w:document 
                          xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
                          <w:body>
                              <w:p>
                                  <w:commentRangeStart w:id="0"/>
                                  <w:r><w:t xml:space="preserve">` +
          text +
          `</w:t></w:r>
                                  <w:r>
                                      <w:commentReference w:id="0"/>
                                  </w:r>
                                  <w:commentRangeEnd w:id="0"/>
                              </w:p>
                          </w:body>
                      </w:document>
                  </pkg:xmlData>
              </pkg:part>
              <pkg:part pkg:name="/word/comments.xml" pkg:contentType="application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml">
                  <pkg:xmlData>
                         <w:comments 
                          xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
                          <w:comment w:id="0" w:author="Dhaya" w:date="` +
          new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getDate() +
          `" w:initials="DD" >
                              <w:p><w:r><w:t>Some Comment here</w:t></w:r></w:p>
                          </w:comment>
                      </w:comments>
                  </pkg:xmlData>
              </pkg:part>
          </pkg:package>`;
      return myComment;
    }
  };
  // DEMO
  // https://docs.microsoft.com/en-us/office/dev/add-ins/develop/dialog-api-in-office-add-ins

  handlePopOpen = bool => {
    this.setState({ popOpen: bool });
    setTimeout(() => {
      this.setState({ popOpen: "none" });
    }, 5000);
  };

  clearBody = () => {
    Word.run(context => {
      let body = context.document.body;
      body.clear();
      return context.sync().then(function() {
        console.log("Cleared the body contents.");
      });
    }).catch(function(error) {
      console.log("Error: " + JSON.stringify(error));
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.handlePopOpen("none");
  };

  changeKeyPressEvent = () => {
    let val = this.state.keyPress;
    this.setState({ keyPress: !val });
    this.registerKeyPressEvent();
  };
  render() {
    const { title, isOfficeInitialized } = this.props;
    return (
      <div>
        <div className="ms-welcome">
          <PrimaryButton
            style={{ marginLeft: "2px", marginTop: "1px" }}
            variant="primary"
            className="ms-welcome__action"
            onClick={this.click}
          >
            Insert Text
          </PrimaryButton>
        </div>

        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.contentControllAdd}>
            Add content control
          </PrimaryButton>
        </div>

        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton
            variant="primary"
            className="ms-welcome__action"
            onClick={e => {
              this.insertInlineImage();
            }}
          >
            Anonymous Comment
          </PrimaryButton>
        </div>
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.removeComment}>
            remove comment
          </PrimaryButton>
        </div>

        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.addCommentOnSelection}>
            add comment on selection
          </PrimaryButton>
        </div>
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.changeKeyPressEvent}>
            {this.state.keyPress ? "Bind Keypress event" : "Un-Bind Keypress event"}
          </PrimaryButton>
        </div>
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.lockDoc}>
            {this.state.lockDoc ? "Unlock Doc" : "Lock Doc"}
          </PrimaryButton>
        </div>
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.searchCount}>
            Search and count (Log)
          </PrimaryButton>
        </div>
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.htmlList}>
            Insert html list
          </PrimaryButton>
        </div>
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.clearBody}>
            Clear body
          </PrimaryButton>
        </div>
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton
            variant="primary"
            className="ms-welcome__action"
            onClick={e => {
              document.getElementById("message").innerHTML = "";
            }}
          >
            Clear Message Area
          </PrimaryButton>
        </div>
        <div style={{ marginTop: "2px", paddingBottom: "2px" }} className="ms-welcome">
          <PrimaryButton
            variant="primary"
            className="ms-welcome__action"
            onClick={e => {
              window.location.hash = "/api/test";
            }}
          >
            Back
          </PrimaryButton>
        </div>

        <div
          style={{ marginTop: "4px", marginBottom: "4px", background: "blue", color: "white" }}
          className="ms-welcome"
          id="message"
        ></div>

        <div style={{ marginTop: "2px" }} className="ms-welcome">
          {this.textData.map((dataItem, index) => (
            <Paper
              elevation={3}
              key={index}
              style={{ marginBottom: "1rem" }}
              onClick={e => {
                this.onTextSelected(dataItem);
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={1}>
                  {/* <Checkbox onChange={e => {}} /> */}
                </Grid>
                <Grid item xs={11}>
                  <Box textAlign="left">{dataItem}</Box>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </div>

        <div style={{ display: this.state.popOpen }}>
          <SnackbarContent message={"Text copied, Double click on the document to past it"} />
        </div>
      </div>
    );
  }
}
