import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  list: {
    maxHeight: "500px",
    paddingTop: "20px",
    maxWidth: 600,
    overflow: "auto",
  },
  rowRed: {
    backgroundColor: "#d1ede1",
    fontFamily: "sans-serif",
    borderLeft: "3px solid rgba(225,0,0, 0.8)",
    marginBottom: "10px",
    opacity: "0.8",
    borderRadius: "10px",
    maxHeight: "50px",
  },
  rowGreen: {
    backgroundColor: "#d1ede1",
    opacity: "0.8",
    borderLeft: "3px solid rgba(0,255,0, 0.8)",
    marginBottom: "10px",
    borderRadius: "10px",
    maxHeight: "50px",
  },
  icon: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: "medium",
  },
}));
