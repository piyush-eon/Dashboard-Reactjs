import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button, CircularProgress } from "@material-ui/core";
import axios from "axios";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "70%",
    // height: "80%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function CreateMagazineModal({ children, fetchMagazines }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [pics, setPics] = useState();
  const [userInfo, setUserInfo] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userDetail")));
  }, []);

  console.log(pics);

  const createMagazine = async () => {
    const formData = new FormData();

    for (let i = 0; i < pics.length; i++) {
      formData.append(`pics`, pics[i]);
    }

    // formData.append("pics", pics);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        "/api/magazine/admin/create",
        formData,
        config
      );
      setError();
      setLoading(false);
      console.log(data);
      fetchMagazines();
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <span className="singleMagazine" onClick={handleOpen}>
        {children}
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
            <h1>Upload Magazine</h1>
            {error && (
              <Alert severity="error" style={{ marginBottom: 10 }}>
                {error.message}
              </Alert>
            )}
            <input
              type="file"
              multiple
              onChange={(e) => setPics(e.target.files)}
            />
            <br />
            {loading && (
              <CircularProgress
                color="inherit"
                size="50px"
                style={{ marginTop: 6, alignSelf: "center" }}
              />
            )}
            <br />

            <Button
              variant="contained"
              color="primary"
              onClick={createMagazine}
            >
              Upload
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
