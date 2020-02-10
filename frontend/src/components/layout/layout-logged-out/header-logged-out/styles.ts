import { makeStyles } from "@material-ui/core";

const HEADER_HEIGHT = "50px";
const DRAWER_PADDING = "10%";

const headerStyles = {
  alignItems: "center",
  display: "flex",
  height: HEADER_HEIGHT
};

export default makeStyles(theme => ({
  root: {
    ...headerStyles,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  loginButton: {
    width: "fit-content"
  },
  loginoutWrapper: {
    width: "100%",
    maxWidth: "500px",
    height: "100%",
    padding: `0 ${DRAWER_PADDING}`,
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  drawerHeader: {
    ...headerStyles,
    flexDirection: "row-reverse",
    position: "absolute",
    top: 0,
    right: 0,
    paddingRight: `${DRAWER_PADDING}`
  },
  formWrapper: {
    margin: "auto 0"
  }
}));
