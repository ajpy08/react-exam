import React, { useState } from "react";
import { TextField, Button, Checkbox } from "@mui/material";
import axios from "axios";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorTerms, setErrorTerms] = useState(false);

  const apiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTY5YTY5ZTU0ZTMyNmUzNTg3MzZlNGFmY2RmMDUyMyIsInN1YiI6IjVhZGJiODFmYzNhMzY4NjJjMDAxMzM0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IE_6Ciqe0ylXDQIqrzh_LGGK3R4WBFKzsj6RxWWZvS8";

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorEmail(!validateEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorPassword(!validatePassword(e.target.value));
  };

  const handleTermsChange = (e) => {
    setTerms(e.target.checked);
    setErrorTerms(!validateTerms(e.target.checked));
  };

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }
    if (!validatePassword(password)) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
    if (!validateTerms(terms)) {
      setErrorTerms(true);
    } else {
      setErrorTerms(false);
    }

    if (email === "angel.puc@dacodes.com.mx" && password === "1234567") {
      sessionStorage.setItem(
        "apiKey",
        apiKey
      );
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/authentication/guest_session/new",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      };

      axios
        .request(options)
        .then(function (response) {
          if (response.data.guest_session_id) {
            sessionStorage.setItem("guest_session_id", response.data.guest_session_id);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
      onLogin();
    } else {
      alert("correo o contraseña incorrectos");
    }
  };

  const validateEmail = (value) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(value);
  };

  const validatePassword = (value) => {
    if (value.length >= 7) return true;
  };

  const validateTerms = (value) => {
    if (!value) return true;
  };

  return (
    <div style={{ width: 1000, backgroundColor: "#03067B" }}>
      <div style={{ margin: 40 }}>
        <TextField
          label="Correo electrónico de DaCodes"
          variant="outlined"
          value={email}
          name="email"
          onChange={handleEmailChange}
          // style={{width: '655px', height: '66px'}}
          error={errorEmail}
          helperText={errorEmail ? "Ingrese un email válido" : ""}
          fullWidth
          type={"email"}
        />{" "}
        <br />
        <br />
        <TextField
          label="Contraseña"
          variant="outlined"
          value={password}
          name="password"
          type="password"
          onChange={handlePasswordChange}
          error={errorPassword}
          helperText={errorPassword ? "Ingrese una contraseña válida" : ""}
          fullWidth
          // style={{width: '655px', height: '66px'}}
        />
        <br />
        <br />
        <Checkbox name="terms" checked={terms} onChange={handleTermsChange} />
        He leído y acepto los terminos y condiciones <br />
        <br />
        <Button
          disabled={!errorEmail && !errorPassword && !errorTerms}
          variant="contained"
          onClick={handleSubmit}
        >
          Crear cuenta
        </Button>
        <br />
        <br />
      </div>
    </div>
  );
};

export default LoginForm;
