import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteIcon from "@material-ui/icons/Delete";
import * as React from "react";

const styles = {
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: "#F8F8FF"
  },
  title: {
    margin: "4, 0, 2"
  }
};

class ContentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contentList: null };
  }
  componentDidMount() {
    if (this.props.contentList) this.setState({ contentList: this.props.contentList });
  }

  render() {
    const { contentList } = this.state;
    if (contentList && contentList.content) console.log(contentList.content[0]);

    return (
      <Grid item xs={12} md={6}>
        <Typography variant="h6" style={styles.title}>
          <IconButton
            onClick={e => {
              this.props.onBackClick(e);
            }}
            edge="end"
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton>
        </Typography>
        {this.props.contentList && this.props.contentList.content ? (
          <div style={styles.demo}>
            <List dense={true}>
              {this.props.contentList.content.map((dataItem, index) => (
                <div>
                  <ListItem
                    key={dataItem.contentControlId}
                    onClick={e => {
                      this.props.onContentClick(dataItem);
                    }}
                  >
                    <ListItemText primary={dataItem.text} secondary={null} />
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={() => {
                          this.props.onDelete(this.props.contentList, dataItem);
                        }}
                        edge="end"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </div>
        ) : null}
      </Grid>
    );
  }
}

export default ContentList;
