import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { setAccountInfo } from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get("http://localhost:5001/sign-in", {
        params: {
          username: event.target.elements.email.value,
          password: event.target.elements.password.value,
        },
      })
      .then(function (response) {
        if (response.data !== "fail") {
          //set currUser state
          dispatch(setAccountInfo(response.data));
          history.push({
            pathname: `/home`,
            // pathname: `/home?id=${response.data.firstName}`,
          });
        } else {
          alert("Wrong Username or Password");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/create-account" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
export default Login;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Button,
//   TextField,
//   Grid,
//   Paper,
//   AppBar,
//   Typography,
//   Toolbar,
// } from "@material-ui/core";
// import axios from "axios";
// import { useHistory } from "react-router-dom";

// const Login = () => {
//   const history = useHistory();

//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     axios
//       .get("http://localhost:5001/sign-in", {
//         params: {
//           username: event.target.elements.username.value,
//           password: event.target.elements.password.value,
//         },
//       })
//       .then(function (response) {
//         console.log(response.data);
//         if (response.data === "success") {
//           console.log("naviage to join room");
//           history.push({
//             pathname: `/home?username=${event.target.elements.username.value}`,
//             state: {
//               username: event.target.elements.username.value,
//             },
//           });
//         } else {
//           alert("Wrong Username or Password");
//         }
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };
//   return (
//     <div>
//       <AppBar position="static" alignitems="center" color="primary">
//         <Toolbar>
//           <Grid container justify="center" wrap="wrap">
//             <Grid item></Grid>
//           </Grid>
//         </Toolbar>
//       </AppBar>
//       <Grid container spacing={0} justify="center" direction="row">
//         <Grid item>
//           <Grid
//             container
//             direction="column"
//             justify="center"
//             spacing={2}
//             className="login-form"
//           >
//             <Paper
//               variant="elevation"
//               elevation={2}
//               className="login-background"
//             >
//               <Grid item>
//                 <Typography component="h1" variant="h5">
//                   Sign in
//                 </Typography>
//               </Grid>
//               <Grid item>
//                 <form onSubmit={handleSubmit}>
//                   <Grid container direction="column" spacing={2}>
//                     <Grid item>
//                       <TextField
//                         type="email"
//                         placeholder="Email"
//                         fullWidth
//                         name="username"
//                         variant="outlined"
//                         value={userName}
//                         onChange={(e) => setUserName(e.target.value)}
//                         required
//                         autoFocus
//                       />
//                     </Grid>
//                     <Grid item>
//                       <TextField
//                         type="password"
//                         placeholder="Password"
//                         fullWidth
//                         name="password"
//                         variant="outlined"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                       />
//                     </Grid>
//                     <Grid item>
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         type="submit"
//                         className="button-block"
//                       >
//                         Submit
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </form>
//               </Grid>
//               <Grid item>
//                 <Button
//                   component={Link}
//                   to="/create-account"
//                   className="button-block"
//                 >
//                   Not a user? Create an account.
//                 </Button>
//               </Grid>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };
// export default Login;
