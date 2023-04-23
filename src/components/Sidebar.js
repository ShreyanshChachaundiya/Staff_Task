import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

const drawerWidth = 176;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: "#0F0E20",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#0F0E20",
    color: "#AB8484",
    fontSize: "24px",
  },

  listItem: {
    color: "#ffffff",
    textDecoration: "none",
  },
}));

function Sidebar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem button>
            <ListItemText primary="Party" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="All Entries & Bill" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Stock" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Item" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Report" />
          </ListItem>
          <Link
            style={{
              textDecoration: "none",
            }}
          >
            <ListItem
              button
              style={{ backgroundColor: "#1602FF", color: "#ffffff" }}
            >
              <ListItemText primary="ManageStaff" />
            </ListItem>
          </Link>
          <ListItem button>
            <ListItemText primary="Setting" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Paid Plan" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="help & Support" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default Sidebar;
