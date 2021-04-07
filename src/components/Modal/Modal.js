import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    // height: "80%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal({ children, mags, handleDelete, id }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <span className="singleMagazine">
        <div style={{ margin: 10, display: "flex", flexDirection: "column" }}>
          <span onClick={handleOpen}>{children}</span>
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginTop: 5 }}
            onClick={() => handleDelete(id)}
          >
            Delete
          </Button>
        </div>
      </span>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {/* <h2 id="transition-modal-title">Transition modal</h2> */}
            <p style={{ overflow: "scroll", display: "flex" }}>
              {mags.map((mag) => (
                <img
                  src={mag}
                  width="250px"
                  alt="mag.user"
                  key={mag}
                  style={{ margin: 10 }}
                />
              ))}
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
