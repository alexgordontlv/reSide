import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  list: {
    maxHeight: "500px",
    maxWidth: 600,
    overflow: "auto",
  },
  rowRed: {
    backgroundColor: "#F1F1F1",
    borderLeft: "3px solid rgba(225,0,0, 0.8)",
    marginBottom: "10px",
    borderRadius: "10px",
    maxHeight: "50px",
  },
  rowGreen: {
    backgroundColor: "#F1F1F1",
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
