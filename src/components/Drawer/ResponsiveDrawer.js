import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
  useTheme,
} from "@material-ui/core/styles";
import { Button, useMediaQuery } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const [page, setPage] = useState(0);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();

  const history = useHistory();

  useEffect(() => {
    const user = localStorage.getItem("userDetail");
    props.setIsLogout(true);

    if (!user) {
      history.push("/");
      props.setIsLogout(false);
      return;
    }

    if (page === 0) {
      history.push("/home");
    } else if (page === 1) {
      history.push("/allnews");
    } else if (page === 2) {
      history.push("/create");
    } else if (page === 3) {
      history.push("/approve");
    } else if (page === 4) {
      history.push("/magazine");
    } else if (page === 5) {
      history.push("/viral");
    } else if (page === 6) {
      history.push("/jobs");
    } else if (page === 7) {
      history.push("/users");
    }
    // eslint-disable-next-line
  }, [page, history, props.setIsLogout]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const darkTheme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  const drawer = (
    <div>
      <div
        style={{
          width: "100%",
          height: 64,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 25,
          border: "1px solid grey",
          fontFamily: "Montserrat",
        }}
      >
        Way2News
      </div>
      <Divider />
      <List>
        {[
          "Home",
          "All News",
          "Create News",
          "Approve News",
          "Magazine",
          "Viral",
          "Jobs",
          "Users",
        ].map((text, index) => (
          <ListItem
            button
            onClick={(e) => setPage(index)}
            key={text}
            style={{ padding: "8px 20px", margin: "6px 0" }}
          >
            {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const logout = () => {
    localStorage.removeItem("userDetail");
    props.setIsLogout(false);
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{ display: "flex" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ flex: 1 }}>
            Dashboard
          </Typography>
          {props.islogout && (
            <Button variant="contained" disableElevation onClick={logout}>
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <ThemeProvider theme={darkTheme}>
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </ThemeProvider>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

export default ResponsiveDrawer;
