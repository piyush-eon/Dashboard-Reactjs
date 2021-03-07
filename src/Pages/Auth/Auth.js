import { Button, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./Auth.css";

const Auth = ({ setIsLogout }) => {
  const [phone, setPhone] = useState();
  const [otp, setOtp] = useState();
  const [otpActive, setOtpActive] = useState(false);
  const [error, setError] = useState();

  const history = useHistory();
  useEffect(() => {
    const user = localStorage.getItem("userDetail");

    if (user) {
      history.push("/home");
    }
  }, [history, setIsLogout]);

  const Authentication = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post("/api/user/login", { phone }, config);
      setOtpActive(true);
      setError();
      console.log(data);
    } catch (error) {
      setError("Please Enter Correct Phone Number");
      setOtpActive(false);
    }
  };

  const verifyOTP = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/verify",
        { otp, phone },
        config
      );
      setError();
      if (data.success === true) {
        console.log(data);

        localStorage.setItem("userDetail", JSON.stringify(data));
        setIsLogout(true);
        history.push("/home");
      }
    } catch (error) {
      setError("Please Enter Correct OTP");
    }
  };

  return (
    <div className="formLogin">
      <span
        style={{
          fontFamily: "Montserrat",
          fontSize: 50,
          paddingBottom: 10,
          marginTop: -10,
        }}
      >
        Login to Dashboard
      </span>
      <div className="container">
        {error && (
          <Alert severity="error" style={{ marginBottom: 10 }}>
            {error}
          </Alert>
        )}
        <TextField
          style={{ marginBottom: 10 }}
          label="Enter Phone No."
          variant="outlined"
          onChange={(e) => setPhone(e.target.value)}
        />
        {otpActive && (
          <TextField
            style={{ marginBottom: 10 }}
            label="Enter OTP Sent to your phone"
            variant="outlined"
            onChange={(e) => setOtp(e.target.value)}
          />
        )}
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={!otpActive ? Authentication : verifyOTP}
        >
          {!otpActive ? "Send OTP" : "Login"}
        </Button>
      </div>
    </div>
  );
};

export default Auth;
