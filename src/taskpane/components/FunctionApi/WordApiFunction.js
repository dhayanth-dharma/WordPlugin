import TextField from "@material-ui/core/TextField";
import { PrimaryButton } from "office-ui-fabric-react";
import * as React from "react";
import req from "../../../../assets/data/req.json";

const style = {
  image: {
    height: "4rem",
    width: "12rem",
    width: "50%",
    margin: "0 auto",
    paddingTop: "1rem"
  }
};
export default class WordApiFunction extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { searchTerm: "", searchTermTable: "", selectedText: "" };
  }
  componentDidMount() {
    // this.subscribeToEvent();
  }

  //adding event listner to office adding
  subscribeToEvent = () => {
    Office.context.document.addHandlerAsync(Office.EventType.DocumentSelectionChanged, this.addComment);
  };

  addComment = evtArgs => {
    Office.context.document.setSelectedDataAsync("Hello World!", function(asyncResult) {
      if (asyncResult.status == Office.AsyncResultStatus.Failed) {
        write(asyncResult.error.message);
      }
    });

    // console.log("test");
    // evtArgs.document.setSelectedDataAsync(
    //   "my comment",
    //   { CustomXMLNodeType: Office.Office.CustomXMLNodeType.NodeComment },
    //   function(asyncResult) {
    //     var error = asyncResult.error;
    //     if (asyncResult.status === Office.AsyncResultStatus.Failed) {
    //       console.log(error.name + ": " + error.message);
    //     }
    //   }
    // );
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
  // componentDidUpdate(prevState, newState) {}
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
  getTable = async () => {
    Word.run(function(context) {
      var contentControls = context.document.contentControls;
      contentControls.load("text");
      return context.sync().then(function() {
        if (contentControls.items.length === 0) {
          let mesg = "There isn't a content control in this document.";
          document.getElementById("message").innerText += mesg;
        } else {
          contentControls.items[0].clear();
          return context.sync().then(function() {
            let mesg = "Content control cleared of contents.";
            document.getElementById("message").innerText += mesg;
          });
        }
      });
    }).catch(function(error) {
      console.log("Error: " + JSON.stringify(error));
      if (error instanceof OfficeExtension.Error) {
        let mesg = "Debug info: " + JSON.stringify(error.debugInfo);
        document.getElementById("message").innerText += mesg;
      }
    });
  };
  section = async () => {
    Word.run(function(context) {
      // Create a proxy sectionsCollection object.
      var mySections = context.document.sections;
      context.load(mySections, "body/style");
      return context.sync().then(function() {
        var myFooter = mySections.items[0].getFooter("primary");
        myFooter.insertText("Added a footer to the first section.", Word.InsertLocation.end);
        myFooter.insertContentControl();
        return context.sync().then(function() {
          console.log("Added a footer to the first section.");
        });
      });
    }).catch(function(error) {
      console.log("Error: " + JSON.stringify(error));
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  };
  footer = async () => {
    await Word.run(async context => {
      context.document.sections
        .getFirst()
        .getFooter("Primary")
        .insertParagraph("This is a footer", "End");

      await context.sync();
    }).catch(function(error) {
      console.log("Error: " + JSON.stringify(error));

      let mesg = "Debug info: " + JSON.stringify(error.debugInfo);
      document.getElementById("message").innerText += mesg;
    });
  };

  higiLight = async () => {
    Office.context.document.getSelectedDataAsync(Office.CoercionType.Text, function(asyncResult) {
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

  writeToSelection = () => {
    Office.context.document.setSelectedDataAsync("Hello World!", function(asyncResult) {
      if (asyncResult.status == Office.AsyncResultStatus.Failed) {
        write(asyncResult.error.message);
      }
    });
    function write(message) {
      document.getElementById("message").innerText += message;
    }
  };

  insertExternalDocxFile = () => {
    Word.run(function(context) {
      var body = context.document.body;
      body.insertFileFromBase64(getBase64(), Word.InsertLocation.start);
      return context.sync().then(function() {
        console.log("Added base64 encoded text to the beginning of the document body.");
      });
    }).catch(function(error) {
      console.log("Error: " + JSON.stringify(error));
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  };
  insertBodyInsertHtml = () => {
    Word.run(function(context) {
      var body = context.document.body;
      body.insertHtml("<strong>This is text inserted with body.insertHtml()</strong>", Word.InsertLocation.start);
      return context.sync().then(function() {
        console.log("HTML added to the beginning of the document body.");
      });
    }).catch(function(error) {
      console.log("Error: " + JSON.stringify(error));
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  };

  search = async () => {
    this.clearMessage();
    var b = this.state.searchTerm;
    console.log(this.state);
    await Word.run(function(context) {
      var searchResults = context.document.body.search(b, { ignorePunct: true});
      context.load(searchResults, "font");

      return context.sync().then(function() {
        console.log("Found count: " + searchResults.items.length);
        for (var i = 0; i < searchResults.items.length; i++) {
          searchResults.items[i].font.color = "purple";
          searchResults.items[i].font.highlightColor = "#FFFF00"; //Yellow
          searchResults.items[i].font.bold = true;
        }
        return context.sync();
      });
    }).catch(function(error) {
      console.log("Error: " + JSON.stringify(error));
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  };
  handleSearch = async e => {
    this.clearMessage();
    this.setState({ searchTerm: e.target.value });
    var term = this.state.searchTerm;
    console.log(this.state.searchTerm);
    await Word.run(function(context) {
      var searchResults = context.document.body.search(term, { ignorePunct: true });
      context.load(searchResults, "font");
      return context.sync().then(function() {
        console.log("Found count: " + searchResults.items.length);
        for (var i = 0; i < searchResults.items.length; i++) {
          searchResults.items[i].font.color = "red";
          searchResults.items[i].font.highlightColor = "green"; //Yellow
          searchResults.items[i].font.italic = true;
        }
        return context.sync();
      });
    }).catch(function(error) {
      console.log("Error: " + JSON.stringify(error));
      if (error instanceof OfficeExtension.Error) {
        document.getElementsById.innerHTML = "Debug info: " + JSON.stringify(error.debugInfo);
      }
    });
  };
  handleSearchTableTextChange = async e => {
    this.setState({ searchTermTable: e.target.value });
  };

  clearMessage = () => {
    // document.getElementsById.innerHTML = "";
  };

  clickFont = async () => {
    Word.run(function(context) {
      var body = context.document.body;

      context.load(body, "font/size, font/name, font/color, style");
      return context.sync().then(function() {
        var results =
          "Font size: " +
          body.font.size +
          "; Font name: " +
          body.font.name +
          "; Font color: " +
          body.font.color +
          "; Body style: " +
          body.style;

        document.getElementById("message").innerHTML = results;
        console.log(results);
      });
    }).catch(function(error) {
      console.log("Error: " + JSON.stringify(error));
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  };

  placeTable = async () => {
    Word.run(function(content) {
      var fruits = [
        ["Apple", "red", "round", "crunchy"],
        ["Banana", "yellow", "long", "mushy"],
        ["Pear", "green", "oblong", "variable"]
      ];
      var fruitsNonuniform = [
        ["Apple", "red"],
        ["Banana", "yellow", "long", "mushy"],
        ["Pear", "green", "oblong"]
      ];
      var fruitsUnderfilled = [
        ["Apple", "red", "", ""],
        ["Banana", "yellow", "long", "mushy"],
        ["Pear", "green", "oblong", ""]
      ];
      var table = content.document.body.insertTable(fruits.length, fruits[0].length, "start", fruits);
      content.load(table);
      return content
        .sync()
        .then(function() {
          table.style = "Grid Table 6 Colorful - Accent 2";
          return content.sync().then(function() {});
        })
        .catch(function(e) {
          console.log(e.message);
        });
    });
  };
  insertHtmlOnSelectedRange = async () => {
    Word.run(function(context) {
      // Queue a command to get the current selection and then
      // create a proxy range object with the results.
      var range = context.document.getSelection();

      // Queue a command to insert HTML in to the beginning of the range.
      range.insertHtml("<strong>This is text inserted with range.insertHtml()</strong>", Word.InsertLocation.start);

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

  getRangeOfuserSelectionAsHtml = () => {
    Word.run(function(context) {
      var range = context.document.getSelection(); // Create a range proxy object for the current selection.
      context.load(range);
      // Synchronize the document state by executing the queued commands,and return a promise to indicate task completion.
      return context.sync().then(function() {
        if (range.isEmpty) {
          //Check if the selection is empty
          return;
        }
        var html = range.getHtml();
        return context.sync().then(function() {
          var htmlVal = html.value; //Get the selected text in HTML
          console.log(htmlVal);
        });
      });
    });
  };

  replaceSelectedRange = () => {
    Word.run(function(context) {
      var range = context.document.getSelection(); // Create a range proxy object for the current selection.

      range.clear();
      range.delete();

      // Synchronize the document state by executing the queued commands, and return a promise to indicate task completion.
      return context.sync().then(function() {
        range.styleBuiltIn = "Normal";
        range.insertText(" your text "); // Queue a command to insert the encrypted text instead the current text
      });
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
  searchAndAddTableRow = async () => {
    let searchTerm = this.state.searchTermTable;
    await Word.run(async context => {
      const body = context.document.body;
      const insectRangeCollection = body.search(searchTerm);
      context.load(insectRangeCollection);
      await context.sync();
      const table1 = insectRangeCollection.getFirst().parentTable;
      context.load(table1, "");
      await context.sync();
      let numRows2 = table1.rowCount.toString();
      table1.addRows("End", 1, [[numRows2, "newly added row with search"]]);
    });
  };

  rangeDelete = async () => {
    Word.run(function(context) {
      var range = context.document.getSelection();
      range.delete();
      debugger;

      return context.sync().then(function() {
        console.log("Deleted the selection (range object)");
      });
    }).catch(function(error) {
      console.log("Error: " + JSON.stringify(error));
      console.log("Error: " + JSON.stringify(error.debugInfo));
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  };

  writeText = async text => {
    return Word.run(async context => {
      const paragraph = context.document.body.insertParagraph(text, Word.InsertLocation.end);
      paragraph.font.color = "red";
      await context.sync();
    });
  };
  getAllProperties = async text => {
    await Word.run(async context => {
      let builtInProperties = context.document.properties;
      builtInProperties.load("*");
      await context.sync();
      console.log(JSON.stringify(builtInProperties, null, 4));
      document.getElementById("message").innerHTML = JSON.stringify(builtInProperties, null, 4);
    });
  };

  insertInlineImage = async () => {
    Word.run(function(context) {
      var body = context.document.body;
      body.insertOoxml(
        "<pkg:package xmlns:pkg='http://schemas.microsoft.com/office/2006/xmlPackage'><pkg:part pkg:name='/_rels/.rels' pkg:contentType='application/vnd.openxmlformats-package.relationships+xml' pkg:padding='512'><pkg:xmlData><Relationships xmlns='http://schemas.openxmlformats.org/package/2006/relationships'><Relationship Id='rId1' Type='http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument' Target='word/document.xml'/></Relationships></pkg:xmlData></pkg:part><pkg:part pkg:name='/word/document.xml' pkg:contentType='application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml'><pkg:xmlData><w:document xmlns:w='http://schemas.openxmlformats.org/wordprocessingml/2006/main' ><w:body><w:p><w:pPr><w:spacing w:before='360' w:after='0' w:line='480' w:lineRule='auto'/><w:rPr><w:color w:val='70AD47' w:themeColor='accent6'/><w:sz w:val='28'/></w:rPr></w:pPr><w:r><w:rPr><w:color w:val='70AD47' w:themeColor='accent6'/><w:sz w:val='28'/></w:rPr><w:t>This text has formatting directly applied to achieve its font size, color, line spacing, and paragraph spacing.</w:t></w:r></w:p></w:body></w:document></pkg:xmlData></pkg:part></pkg:package>",
        Word.InsertLocation.start
      );
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

  save = () => {
    Word.run(function(context) {
      var thisDocument = context.document;

      context.load(thisDocument, "saved");

      return context.sync().then(function() {
        if (thisDocument.saved === false) {
          thisDocument.save();
          return context.sync().then(function() {
            console.log("Saved the document");
          });
        } else {
          console.log("The document has not changed since the last save.");
        }
      });
    }).catch(function(error) {
      console.log("Error: " + JSON.stringify(error));
      if (error instanceof OfficeExtension.Error) {
        console.log("Debug info: " + JSON.stringify(error.debugInfo));
      }
    });
  };

  insertTableWithContentControl() {
    Word.run(function(context) {
      var data = [
        ["Apple", "Orange", "Pineapple"],
        ["Tokyo", "Beijing", "Seattle"]
      ];
      var table = context.document.body.insertTable(3, 3, "start", data);
      table.styleBuiltIn = Word.Style.gridTable1Light;
      var myContentControl = table.insertContentControl();
      myContentControl.title = "CC Title";
      return context.sync();
    }).catch(function(e) {
      console.log(e.message);
    });
  }
  requirementTable() {
    let tableData = [];
    let row = [];
    row.push("type");
    row.push("informationId");
    row.push("documentId");
    row.push("content");
    row.push("requirementId");
    row.push("pageStart");
    tableData.push(row);
    req.forEach(element => {
      let row = [];
      row.push(element.type);
      row.push(element.informationId);
      row.push(element.documentId);
      row.push(element.content);
      row.push(element.requirementId);
      row.push(element.pageStart);
      tableData.push(row);
    });

    Word.run(function(context) {
      var table = context.document.body.insertTable(tableData.length, tableData[0].length, "start", tableData);
      table.styleBuiltIn = Word.Style.gridTable3;
      var myContentControl = table.insertContentControl();
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
    }).catch(function(e) {
      console.log(e.message);
    });

    //Add the event handler
    function tableChangehandler(args) {
      //check out all the values you can get, see below how we use it to display the selected cell value...
      //  console.log("selection changed!" + args.startRow + " " + args.startColumn + " " + args.rowCount + " " + args.columnCount);
      var row;
      if (args.startRow == undefined) {
        //menas the selection is in the header!
        row = 0;
      } else {
        //selection not in the header...
        row = args.startRow + 1;
      }
      // the other thing you can try here is to get the table, and print the selected cell value..
      Word.run(function(context) {
        //this instruction selected  cell of the  table within the content control named "myTableTite"
        var mySelectedCellBody = context.document.contentControls
          .getByTitle("Requirement_t_01")
          .getFirst()
          .tables.getFirst()
          .getCell(row, args.startColumn).body;
        context.load(mySelectedCellBody);
        return context.sync().then(function() {
          //lets write the value of the cell (assumes single cell selected.)
          console.log(mySelectedCellBody.text);
        });
      }).catch(function(e) {
        console.log("handler:" + e.message);
      });
    }
  }

  dialogMessage2() {
    // additional workout code found below
    // https://docs.microsoft.com/en-us/office/dev/add-ins/develop/dialog-api-in-office-add-ins
    return new Promise((resolve, rejects) => {
      Office.context.ui.displayDialogAsync(
        "https://localhost:3000/taskpane.html#/dialog-message",
        { height: 30, width: 20 },
        function(asyncResult) {
          dialog = asyncResult.value;
          dialog.addEventHandler(Office.EventType.DialogMessageReceived, messageRecieved(e));
          dialog.addEventHandler(Office.EventType.DialogEventReceived, function processDialogEvent(arg) {
            debugger;
            switch (arg.error) {
              case 12002:
                console.log(
                  "The dialog box has been directed to a page that it cannot find or load, or the URL syntax is invalid."
                );
                break;
              case 12003:
                console.log("The dialog box has been directed to a URL with the HTTP protocol. HTTPS is required.");
                break;
              case 12006:
                console.log("Dialog closed.");
                break;
              default:
                console.log("Unknown error in dialog box.");
                break;
            }
          });
        }
      );
    });

    function messageRecieved(e) {
      debugger;
      console.log("testomg");
    }
  }

  dialogMessage() {
    Word.run(function(context) {
      var dialog;
      Office.context.ui.displayDialogAsync(
        "https://localhost:3000/taskpane.html#/dialog-message",
        { height: 30, width: 20 },
        function(asyncResult) {
          dialog = asyncResult.value;
          dialog.addEventHandler(Office.EventType.DialogEventReceived, processMessage());
          dialog.addEventHandler(Office.EventType.onClose, this.dialogClose());
        }
      );
    }).catch(error => {
      console.log(JSON.stringify(error));
    });
    function processMessage() {
      console.log("messageReceived");
    }
  }

  dialogClose() {
    console.log("onclose clicked");
  }

  makeDialogMessageCall() {
    if (loginSuccess) {
      Office.context.ui.messageParent(googleProfile);
    }
  }
  processMessage = () => {
    console.log("test");
    //this will helps to close the dialog and run some logic
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
          <PrimaryButton
            style={{ marginLeft: "2px", marginTop: "1px" }}
            variant="primary"
            className="ms-welcome__action"
            onClick={this.clickFont}
          >
            Get current font style
          </PrimaryButton>
        </div>
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton
            style={{ marginLeft: "2px", marginTop: "1px" }}
            variant="primary"
            className="ms-welcome__action"
            onClick={this.higiLight}
          >
            Get Selected Word (First select some words in document)
          </PrimaryButton>
        </div>
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton
            style={{ marginLeft: "2px", marginTop: "1px" }}
            variant="primary"
            className="ms-welcome__action"
            onClick={this.writeToSelection}
          >
            Write To Selected Word (First select some words in document)
          </PrimaryButton>
        </div>
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.replaceSelectedRange}>
            Replace Selection 2
          </PrimaryButton>
        </div>
        {/* <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.getTable}>
            Get Tables
          </PrimaryButton>
        </div> */}
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.getRangeOfuserSelectionAsHtml}>
            Get Selection as HTML
          </PrimaryButton>
        </div>

        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.placeTable}>
            Add Tables
          </PrimaryButton>
        </div>
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.section}>
            Extraction Section (Scroll down to see effect)
          </PrimaryButton>
        </div>
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.footer}>
            Extraction Footer (Scroll down to see effect)
          </PrimaryButton>
        </div>
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.search}>
            Search keyword in paragraph
          </PrimaryButton>
          <TextField onChange={e => this.handleSearch(e)} label="search text here"></TextField>
        </div>
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.searchAndAddTableRow}>
            Search a table by column text
          </PrimaryButton>
          <TextField onChange={e => this.handleSearchTableTextChange(e)} label="search text here"></TextField>
        </div>
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.insertInlineImage}>
            Insert styled text with ooml pkg
          </PrimaryButton>
        </div>
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.insertHtmlOnSelectedRange}>
            Insert html on a selected range
          </PrimaryButton>
        </div>
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.rangeDelete}>
            Delete selected Range
          </PrimaryButton>
        </div>
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.addTableRow}>
            add Row to table
          </PrimaryButton>
        </div>
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.insertTableWithContentControl}>
            insert table with contentControl
          </PrimaryButton>
        </div>
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.getAllProperties}>
            log all properties
          </PrimaryButton>
        </div>
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.save}>
            Save document
          </PrimaryButton>
        </div>
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.dialogMessage}>
            Show Dialog Message
          </PrimaryButton>
        </div>
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton variant="primary" className="ms-welcome__action" onClick={this.requirementTable}>
            Requirement table
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
        <div style={{ marginTop: "2px" }} className="ms-welcome">
          <PrimaryButton
            variant="primary"
            className="ms-welcome__action"
            onClick={e => {
              window.location.hash = "/next-demo";
            }}
          >
            Next Page
          </PrimaryButton>
        </div>

        <div style={{ marginTop: "4px", background: "blue", color: "white" }} className="ms-welcome" id="message"></div>
      </div>
    );
  }
}
