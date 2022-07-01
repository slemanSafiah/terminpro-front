import React, { useState, useEffect } from "react";
import {
  Stepper,
  Box,
  Step,
  StepLabel,
  StepContent,
  Button,
  FormControl,
  TextField,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import "./signup.css";
import Header from "../components/shared/Header";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAtom } from "jotai";
import userAtom from "../components/atoms/userAtom";
import registerFormAtom from "../components/atoms/registerFormAtom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialValues1 = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  type: "Customer",
};
const initialValues2 = {
  password: "",
  confirmPassword: "",
};
const initialValues3 = {
  paypal: "",
  institutionName: "",
  category: "Hair Cut",
  location: "",
  description: "",
};

const yupSchemaSec1 = yup.object({
  firstName: yup.string().min(4).required(),
  lastName: yup.string().min(4).required(),
  email: yup.string().email().required(),
  mobile: yup.string().min(10).max(10).required(),
  type: yup.string().required(),
});

const yupSchemaSec2 = yup.object({
  password: yup.string().min(5).required(),
  confirmPassword: yup
    .string()
    .min(5)
    .required()
    .test("match password", "check the equality", (value, context) => {
      return value === context.parent.password;
    }),
});

const yupSchemaSec3 = yup.object({
  paypal: yup.string().email().required(),
  institutionName: yup.string().min(3).required(),
  category: yup.string().required(),
  location: yup.string().min(5).required(),
  description: yup.string().min(9).required(),
});

const yupSchemaSec3_1 = yup.object({
  paypal: yup.string().email().required(),
});

export default function Signup() {
  const [categories, setCategories] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [personalInfo, setPersonalInfo] = useAtom(
    registerFormAtom.personalInfoAtmo
  );
  const [password, setPassword] = useAtom(registerFormAtom.passwordAtom);
  const [instiutionInfo, setInstiutionInfo] = useAtom(
    registerFormAtom.instiutionInfoAtom
  );

  const {
    handleSubmit: handleSubmit1,
    control: control1,
    formState: { errors: errors1 },
  } = useForm({
    defaultValues: initialValues1,
    resolver: yupResolver(yupSchemaSec1),
  });

  const {
    handleSubmit: handleSubmit2,
    control: control2,
    formState: { errors: errors2 },
  } = useForm({
    defaultValues: initialValues2,
    resolver: yupResolver(yupSchemaSec2),
  });

  const {
    handleSubmit: handleSubmit3,
    control: control3,
    formState: { errors: errors3 },
  } = useForm({
    defaultValues: initialValues3,
    resolver: yupResolver(
      personalInfo.type === "customer" ? yupSchemaSec3_1 : yupSchemaSec3
    ),
  });

  const handleChangePassword = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleNext = (key) => {
    if (key === 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    if (key === 2) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  function OnSubmit1(formData) {
    handleNext(1);
    setPersonalInfo(formData);
  }

  function OnSubmit2(formData) {
    handleNext(2);
    setPassword(formData);
  }

  function OnSubmit3(formData) {
    setInstiutionInfo(formData);

    axios({
      method: "POST",
      url: "https://terminpro2022.herokuapp.com/api/user/signup",
      data: { ...personalInfo, ...password, ...formData, category: category },
    })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        console.log(res.data);
      })
      .then(() => {
        setCurrentUser({
          firstName: personalInfo.firstName,
          lastName: personalInfo.lastName,
          type: personalInfo.type,
          loggedIn: true,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }

  useEffect(() => {
    axios({
      url: "https://terminpro2022.herokuapp.com/api/admin/category",
      method: "GET",
    }).then((res) => {
      setCategories((prev) => {
        return res.data.data.map((cat) => cat.name);
      });
    });
  }, []);
  const mediaQuery = window.matchMedia("(max-width: 600px)");

  return (
    <>
      <Header />
      <div className="signup-container">
        <div
          style={
            mediaQuery.matches
              ? {
                  width: "90%",
                  height: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  marginLeft: "auto",
                  marginRight: "auto",
                }
              : {
                  width: "50%",
                  height: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }
          }
        >
          <div className="stepper-container">
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step key={1}>
                <StepLabel>Personal Information</StepLabel>
                <StepContent>
                  <form onSubmit={handleSubmit1(OnSubmit1)}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Controller
                        name="firstName"
                        control={control1}
                        render={({ field }) => {
                          return (
                            <FormControl
                              {...field}
                              sx={{
                                width: "48%",
                                mb: 2,
                                boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.2)",
                              }}
                            >
                              <TextField
                                label="First Name"
                                variant="outlined"
                                placeholder="First Name"
                                size="small"
                                error={errors1.firstName}
                                helperText={
                                  errors1.firstName
                                    ? errors1.firstName.message
                                    : ""
                                }
                              />
                            </FormControl>
                          );
                        }}
                      />
                      <Controller
                        name="lastName"
                        control={control1}
                        render={({ field }) => {
                          return (
                            <FormControl
                              key={"lastName"}
                              {...field}
                              sx={{
                                width: "48%",
                                mb: 2,
                                boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.2)",
                              }}
                            >
                              <TextField
                                key={"lasttName"}
                                size="small"
                                label="Last Name"
                                variant="outlined"
                                placeholder="Last Name"
                                error={errors1.lastName}
                                helperText={
                                  errors1.lastName
                                    ? errors1.lastName.message
                                    : ""
                                }
                              />
                            </FormControl>
                          );
                        }}
                      />
                    </div>

                    <Controller
                      name="email"
                      control={control1}
                      render={({ field }) => {
                        return (
                          <FormControl
                            {...field}
                            sx={{
                              width: "100%",
                              mb: 2,
                              boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.2)",
                            }}
                          >
                            <TextField
                              size="small"
                              label="Email"
                              variant="outlined"
                              placeholder="Email"
                              error={errors1.email}
                              helperText={
                                errors1.email ? errors1.email.message : ""
                              }
                            />
                          </FormControl>
                        );
                      }}
                    />
                    <Controller
                      name="mobile"
                      control={control1}
                      render={({ field }) => {
                        return (
                          <FormControl
                            {...field}
                            sx={{
                              width: "100%",
                              mb: 4,
                              boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.2)",
                            }}
                          >
                            <TextField
                              size="small"
                              label="Mobile"
                              variant="outlined"
                              placeholder="Mobile"
                              error={errors1.mobile}
                              helperText={
                                errors1.mobile ? errors1.mobile.message : ""
                              }
                            />
                          </FormControl>
                        );
                      }}
                    />
                    <Controller
                      name="type"
                      control={control1}
                      render={({ field }) => {
                        return (
                          <FormControl {...field}>
                            <FormLabel id="demo-row-radio-buttons-group-label">
                              Register as :
                            </FormLabel>
                            <RadioGroup
                              error={errors1.type}
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                            >
                              <FormControlLabel
                                value="customer"
                                control={<Radio />}
                                label="Customer"
                              />
                              <FormControlLabel
                                value="institution"
                                control={<Radio />}
                                label="Institution"
                              />
                            </RadioGroup>
                          </FormControl>
                        );
                      }}
                    />
                    <Box sx={{ mb: 0 }}>
                      <div>
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Continue
                        </Button>
                      </div>
                    </Box>
                  </form>
                </StepContent>
              </Step>
              <Step
                key={2}
                sx={{
                  width: "100%",
                }}
              >
                <StepLabel>Password</StepLabel>
                <StepContent>
                  <form onSubmit={handleSubmit2(OnSubmit2)}>
                    <div>
                      <Controller
                        name="password"
                        control={control2}
                        render={({ field }) => {
                          return (
                            <FormControl
                              {...field}
                              sx={{
                                width: "100%",
                                mb: 1,
                                boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.2)",
                              }}
                              variant="outlined"
                            >
                              <InputLabel htmlFor="outlined-adornment-password">
                                Password
                              </InputLabel>
                              <OutlinedInput
                                error={errors2.password}
                                size="small"
                                sx={{
                                  width: "100%",
                                }}
                                id="outlined-adornment-password"
                                type={values.showPassword ? "text" : "password"}
                                value={values.password}
                                onChange={handleChangePassword("password")}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                    >
                                      {values.showPassword ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                }
                                label="Password"
                              />
                            </FormControl>
                          );
                        }}
                      />

                      <Controller
                        name="confirmPassword"
                        control={control2}
                        render={({ field }) => {
                          return (
                            <FormControl
                              {...field}
                              sx={{
                                boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.2)",
                                width: "100%",
                                mb: 2,
                              }}
                            >
                              <TextField
                                size="small"
                                label="Confirm Password"
                                variant="outlined"
                                placeholder="Confirm Password"
                                error={
                                  errors2.confirmPassword ||
                                  password.password !== password.confirmPassword
                                }
                                helperText={
                                  errors2.confirmPassword
                                    ? "Password must be more than 3 characters and match the Confirm password"
                                    : ""
                                }
                              />
                            </FormControl>
                          );
                        }}
                      />
                    </div>
                    <Box sx={{ mb: 0 }}>
                      <div>
                        <Button
                          variant="contained"
                          type="subnit"
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Continue
                        </Button>
                      </div>
                    </Box>
                  </form>
                </StepContent>
              </Step>
              <Step
                key={3}
                sx={{
                  width: "100%",
                }}
              >
                <StepLabel>Payment Information</StepLabel>
                <StepContent
                  sx={{
                    width: "100%",
                  }}
                >
                  <form
                    onSubmit={handleSubmit3(OnSubmit3)}
                    style={{
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <Controller
                        name="paypal"
                        control={control3}
                        render={({ field }) => {
                          return (
                            <FormControl
                              {...field}
                              sx={{
                                width: "100%",
                                mb: 2,
                                boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.2)",
                              }}
                            >
                              <TextField
                                sx={{
                                  width: "100%",
                                }}
                                size="small"
                                label="Paypal Card Number"
                                variant="outlined"
                                placeholder="Paypal Card Number"
                                error={errors3.paypal}
                                helperText={
                                  errors3.paypal ? errors3.paypal.message : ""
                                }
                              />
                            </FormControl>
                          );
                        }}
                      />

                      {/* check if the user is institution owner */}
                      {personalInfo.type === "institution" && (
                        <>
                          <div>
                            <Controller
                              name="institutionName"
                              control={control3}
                              render={({ field }) => {
                                return (
                                  <FormControl
                                    {...field}
                                    sx={{
                                      width: "58%",
                                      mb: 2,
                                      boxShadow:
                                        "0px 0px 3px rgba(0, 0, 0, 0.2)",
                                    }}
                                  >
                                    <TextField
                                      size="small"
                                      label="Institution Name"
                                      variant="outlined"
                                      placeholder="Institution Name"
                                      error={errors3.institutionName}
                                      helperText={
                                        errors3.institutionName
                                          ? errors3.institutionName.message
                                          : ""
                                      }
                                    />
                                  </FormControl>
                                );
                              }}
                            />
                            <Controller
                              name="category"
                              control={control3}
                              render={({ field }) => {
                                return (
                                  <FormControl
                                    sx={{
                                      width: "38%",
                                      mb: 2,
                                      ml: 2,
                                      boxShadow:
                                        "0px 0px 3px rgba(0, 0, 0, 0.2)",
                                    }}
                                  >
                                    <Select
                                      {...field}
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={category}
                                      label="Category"
                                      size="small"
                                      placeholder="Category"
                                      onChange={handleChange}
                                      defaultValue="Hair Cut"
                                    >
                                      {categories.map((cat, i) => (
                                        <MenuItem
                                          selected={i === 0}
                                          value={cat}
                                        >
                                          {cat}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                );
                              }}
                            />
                          </div>
                          <Controller
                            name="location"
                            control={control3}
                            render={({ field }) => {
                              return (
                                <FormControl
                                  {...field}
                                  sx={{
                                    width: "100%",
                                    mb: 2,
                                    boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.2)",
                                  }}
                                >
                                  <TextField
                                    size="small"
                                    label="Location"
                                    variant="outlined"
                                    placeholder="Location"
                                    error={errors3.location}
                                    helperText={
                                      errors3.location
                                        ? errors3.location.message
                                        : ""
                                    }
                                  />
                                </FormControl>
                              );
                            }}
                          />
                          <Controller
                            name="description"
                            control={control3}
                            render={({ field }) => {
                              return (
                                <FormControl
                                  {...field}
                                  sx={{
                                    width: "100%",
                                    mb: 2,
                                    boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.2)",
                                  }}
                                >
                                  <TextField
                                    size="small"
                                    label="Description"
                                    variant="outlined"
                                    placeholder="Description"
                                    multiline
                                    rows={3}
                                    error={errors3.description}
                                    helperText={
                                      errors3.description
                                        ? errors3.description.message
                                        : ""
                                    }
                                  />
                                </FormControl>
                              );
                            }}
                          />
                        </>
                      )}
                    </div>
                    <Box sx={{ mb: 0 }}>
                      <div>
                        <Button
                          variant="contained"
                          sx={{ mt: 1, mr: 1 }}
                          type="submit"
                        >
                          Finish
                        </Button>
                      </div>
                    </Box>
                  </form>
                </StepContent>
              </Step>
            </Stepper>
            <div
              style={{
                fontFamily: "Poppins",
                color: "rgb(100,100,100)",
                textAlign: "center",
                paddingTop: "8px",
              }}
            >
              already have an account ?
              <spna style={{ color: "rgb(60,60,60)" }}>
                <Link to={"/login"}> Login </Link>
              </spna>
            </div>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div className="Signup-title">Signup</div>

          <img
            className="signup-background"
            src="assets/signup.jpg"
            alt="signup "
          />
        </div>
      </div>
    </>
  );
}
