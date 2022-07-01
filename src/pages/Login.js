import React, { useState } from "react";

import Header from "../components/shared/Header";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  OutlinedInput,
  FormControl,
  InputLabel,
  InputAdornment,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAtom } from "jotai";
import userAtom from "../components/atoms/userAtom";
import axios from "axios";
import { Buffer } from "buffer";
import "./login.css";

const yupSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
});

export default function Login() {
  const [, setCurrentUser] = useAtom(userAtom);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(yupSchema),
  });

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  if (localStorage.getItem("token")) {
    let token =
      localStorage.getItem("token") &&
      JSON.parse(
        Buffer.from(localStorage.getItem("token"), "base64")
          .toString("utf-8")
          .split("}")[1] + "}"
      );
    token.type === "admin"
      ? navigate("/admin", { replace: true })
      : navigate("/", { replace: true });
  }

  function onSubmit(formData) {
    axios({
      url: "https://terminpro2022.herokuapp.com/api/user/login",
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setCurrentUser({
          firstName: res.data.data.firstName,
          lastName: res.data.data.lastName,
          type: res.data.data.type,
          loggedIn: true,
        });
        res.data.data.type === "admin"
          ? navigate("/admin", { replace: true })
          : navigate("/", { replace: true });
      }
    });
  }

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="login-form-container">
          <div className="login-form">
            <div className="login-form-title">Login</div>
            <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => {
                  return (
                    <FormControl
                      variant="outlined"
                      sx={{
                        m: 1,
                        width: "80%",
                        boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <TextField
                        {...field}
                        id="outlined-required"
                        label="Email"
                        placeholder="Email"
                        error={errors.email ? true : false}
                        helperText={errors.email ? errors.email.message : ""}
                      />
                    </FormControl>
                  );
                }}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => {
                  return (
                    <FormControl
                      sx={{
                        m: 1,
                        width: "80%",
                        boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.2)",
                      }}
                      variant="outlined"
                      error={errors.password ? true : false}
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        {...field}
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {!showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        error={errors.password ? true : false}
                        label="Password"
                      />
                      {errors.password && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "0.8rem",
                            marginLeft: "8px",
                          }}
                        >
                          {errors.password.message}
                        </div>
                      )}
                    </FormControl>
                  );
                }}
              />

              <Button
                sx={{
                  margin: "1em 0em",
                }}
                variant="contained"
                type="submit"
                color="success"
              >
                submit
              </Button>
              <div
                style={{
                  fontFamily: "Poppins",
                  color: "rgb(100,100,100)",
                }}
              >
                does not have an account ?
                <spna style={{ color: "rgb(60,60,60)" }}>
                  <Link to={"/signup"}> Signup </Link>
                </spna>
              </div>
            </form>
          </div>
        </div>
        <div className="login-image">
          <img src="assets/login.jpg" alt="reserve appointments" />
        </div>
      </div>
    </>
  );
}
