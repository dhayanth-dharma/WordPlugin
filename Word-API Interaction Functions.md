# Office API Function

### 1. Range

Range allows to select a specific range in a word doc.We can select crusor position in word with this API Class. So we can insert text, table or any other content control to selected range. Also, we can modify the selected range by applying style, clear the range or can perform many other functions. Basically the `Range` class allows to selected a specified area in a word doc and perform all word api operations.

### 2. Section

Section class api gives functionalities to access different section on word document. With this class, we can add header, add footer, change font style of selected section and etc.
Additionally we have `SectionCollection` that we can get all section of current document.

### 3. Table

- We can select table control from word document and can perform selected word-api common functions.
- functions

  - Insert text to cells, update text, modify font style, change the text alignment, in a column
  - Style the table, style the last or first column, style total row
  - Add row, add column , delete table, delete columns , delete rows, update specific cell (by row index and column index) and so on.
  - We can search in a table for a specific word,
  - Can navigates Word ui to a specific location in a table.
  - Merge cells
  - Insert a paragraph in a cell

### 4. Search Table

We can search table with column value and can perform table operations.We can perform operation to all matching tables or to an one table.

### 5. Search (SearchOptions)

Word api contains separate class for search keyword in word document. It gives basic functionalities when searching a word, Example : ignore case, ignore space, match prefix , ignore_punct and so on.

### 6. Delete selected text or range of content

Using range class we can delete or update selected text on a crusor range.

### 7. Insert Text

We can insert text to the word document using office API. It allows to insert text on selected places

### 8. Binding events

We can bind specific events to the word body. The events are limited based on the Word-API js.
[https://docs.microsoft.com/en-us/javascript/api/word/word.eventtype?view=word-js-preview]

### 9. List

We can select particular list and different level of list to add or remove items in the list.

### 10. Insert Text from external file

We can insert text from external docs file. We need to implement function to pass in a string of a base64 encoded docx file.

### 11. Selection (Highlighted Text)

Office-API allows to get selected (Highlighted text) on Word. We can use that text for many purpose, Example: Search , Replace etc.

### 12. Font Style (Highlighted Text)

Get retrieve current font style of the document and allows to modify the font styles. (Can use selected CSS styling for add font styles to the word doc. Example : {fontStyle, fontColor, Heading3} )

### 13. Add Table

Word API allows to insert table to the current document. We can add decided rows and columns

### 14. Search and Highlight

Using Word API , we can search words while we type and can able to highlight the text. Also, we can perform many other functions like search selected word and replace or style them and so on.

### 15. Content Control.

Content Control allows to tag a control in document. So, later we can get the content control by tag and we can perform operation that are provided in word api.

### 16. Paragraph

- We can change and modify different properties of selected paragraph. We can change alignment, font, line-spacing, style, etc. Also, we can delete or replace the paragraph.
- There are functions that we can used to get previous paragraph or next paragraph. Can check whether the paragraph is _List item_ or which content control. Can add inline picture to the selected paragraph from external file.
- Insert a break at a specified location.
- Insert a another content control in a specified location or insert an HTML.

### 17. Office Dialog Message.

Dialog message box can be triggered using Office API in order to increase the UI UX experience in some situation. This will pop up an additional window with React elements.

### 18. Lock and unlock the document

We can able to lock or unlock the complete doc or certain paragraph that has been identified using search or inserted from Add-In. Important: If we want to lock a specific paragraph or a table, then it should be identified using some text search or it should be inserted from Add-in.

### 19. Comment

There is no direct way of inserting comment to the word document. We can insert a comment By inserting an Ooxml (Open XML Document) to the selected area by replacing the current selected word. We can delete all the comments within the document. If we want to delete one specific comment, then it should be inserted within a **contentControl** object which later helps to identify the comment.

### 20. Insert HTML

We can insert HTML Elements directly to the document. We can change the position of insertion (After, before, end or selection point). Styling the HTML element should be done as inline styling to elements.

## POC Summary

We have limited feature in current release of the Office js. But we can extend the functionality by consuming existing functions of office js, and bind our custom programs to it. For an example, We don't have `Mouse-Release-Event` yet implemented in Word-Api-js. But, we can use `Selection-Change-Event` and can trigger an event when user changes the crusor position on the word body. So this helps to implement `Mouse-Release-Event`. In this way, we can achieve many functions as we want.

## Source

https://docs.microsoft.com/en-us/javascript/api/word?view=word-js-preview
