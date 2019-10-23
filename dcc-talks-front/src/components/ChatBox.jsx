import React, { Component } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import Input from "@material-ui/core/Input";

const styles = theme => ({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});
const useStyles = makeStyles(theme => ({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  text: {
    padding: theme.spacing(2, 2, 0)
  },
  input:{
    width: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "start",
    color: theme.palette.text.secondary,
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3)
  },
  list: {
    marginBottom: theme.spacing(2)
  },
  subheader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    bottom: "auto",
    bottom: 0
  },
  grow: {
    flexGrow: 1
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto"
  }
}));

//@withStyles(styles)
class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      text_message: ""
    };
    this.addMessage = this.addMessage.bind(this);
    this.addMsgHistory = this.addMsgHistory.bind(this);
    this.props.messagesUpdate(this.addMessage);
    this.props.messageHistory(this.addMsgHistory);
  }
  addMessage(msg) {
    this.setState({
      messages: [...this.state.messages, msg]
    });
  }

  addMsgHistory(msg) {
    console.log("history: " + msg);
  }

  render() {
    const classes = makeStyles(styles);
    const handleChange = name => event => {
      this.setState({ ...this.state, [name]: event.target.value });
    };
    const handleSubmit = () => {
      this.setState({ ...this.state, ["text_message"]: "" });
      this.props.sendMessage(this.state.text_message, callback => {
        console.log("tipo sendMessage: " + typeof this.props.sendMessage);
      });
    };
    const keyPressed = event => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    };

    return (
      <React.Fragment>
        <Typography className={classes.text} variant="h5" gutterBottom>
          dccTalks
        </Typography>
        <Grid
          container
          className={classes.root}
          wrap="nowrap"
          width="auto"
          text-align="left"
          //spacing={2}
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          {this.state.messages.map((message, id) => (
            <Grid item xs key={id}>
              <Paper className={classes.paper} s={2}>
                <Typography align="left">
                  <div dangerouslySetInnerHTML={{ __html: message }} />
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box
          className={classes.root}
          bgcolor="primary.main"
          color="primary.contrastText"
          width="100%"
          position="fixed"
          bottom={0}
        >
          <Input
            className={classes.input}
            autoFocus
            rows={1}
            rowsMax={1}
            display='flex'
            width="auto"
            margin="dense"
            multiline
            placeholder="Digite uma mensagem."
            value={this.state.text_message}
            onKeyPress={keyPressed}
            onChange={handleChange("text_message")}
          />
          <IconButton
            className={classes.iconButton}
            align="right"
            onClick={handleSubmit}
          >
            <SendRoundedIcon />
          </IconButton>
        </Box>
      </React.Fragment>
    );
  }
}

export default ChatBox;