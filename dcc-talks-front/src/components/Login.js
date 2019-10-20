import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn(props) {
  const classes = useStyles();

  const handleFormSubmit = (event) => {
    event.preventDefault()
    let email=event.target.elements.email.value;
    let password = event.target.elements.password.value;
    props.socketEntrar(email, (valido) => {
      if (valido===true){
        props.retv(email);
        props.unmount();
      }
      else{
        alert("Email não válido");
        //TODO:
        //limpar o campo de email e senha
      }
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Logar
        </Typography>
        <form className={classes.form} noValidate
        onSubmit = {handleFormSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            //value={values.email}
            name="email"
            autoComplete="email"
            autoFocus
            //onChange={handleChange('email')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            //value={values.password}
            //onChange={handleChange('password')}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar de mim"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            //onClick={handleSubmit}//{props.unmount}
          >
            Logar
          </Button>
        </form>
      </div>
    </Container>
  );
}
