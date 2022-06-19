import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "antd";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import {
  AccessTimeFilledOutlined,
  AttachMoneyOutlined,
} from "@mui/icons-material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Botton from "@mui/material/Button";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Divider,
  FormControl,
  InputLabel,
  Select,
  LinearProgress,
  Snackbar,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import { Empty } from "antd";
import "antd/dist/antd.css";
import { MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { Buffer } from "buffer";
import Times from "../../../helper/times";
import { useAtom } from "jotai";
import validaityAtom from "../../atoms/validity";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  boxShadow: "0px 0px 3px 2px rgba(100,100,100,0.5)",
  p: "32px 0 0 0",
};

export default function InstitutionComp() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(new Date());
  const [time, setTime] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [profile, setProfile] = useState({});
  const [services, setServices] = useState([]);
  const [booking, setBooking] = useState({ time: 0, price: 0 });
  const [userId, setUserId] = useState("");
  const { id } = useParams();
  const [validity, setValidity] = useAtom(validaityAtom);

  useEffect(() => {
    axios({
      url: `http://localhost:5000/api/user/${id}`,
      method: "GET",
    }).then((res) => {
      console.log(id);
      setProfile(res.data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axios({
      url: `http://localhost:5000/api/service/all/${id}`,
      method: "GET",
    }).then((res) => {
      setServices(res.data.data);
    });
  });

  useEffect(() => {
    let token =
      localStorage.getItem("token") &&
      JSON.parse(
        Buffer.from(localStorage.getItem("token"), "base64")
          .toString("utf-8")
          .split("}")[1] + "}"
      );

    setUserId(token.id);
  }, []);

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setBooking({ time: 0, price: 0 });
    setOpen(false);
  };

  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const progressDone = (timer) => {
    clearInterval(timer);
    setProgress(0);
    setLoading(false);
    setOpen(false);
    handleClickAlert(true);
    setBooking({
      time: 0,
      price: 0,
    });
  };

  const handleSubmitButton = (formData) => {
    let date = value.toLocaleDateString().split("/");
    date = [date[1], date[0], date[2]];
    const data = {
      date: date.join("/"),
      time: time,
      price: booking.price,
      length: booking.time,
      services: services.filter((item) => {
        return formData[item._id] === true;
      }),
      institution: id,
    };
    axios({
      url: `http://localhost:5000/api/payment/pay/${userId}`,
      method: "POST",
      data,
    }).then(async (res) => {
      let pending = await axios({
        url: "http://localhost:5000/api/appointment",
        method: "POST",
        data: {
          date: data.time,
          history: data.date,
          service: data.services.map((ser) => ser._id),
          institution: id,
          user: userId,
        },
      });
      console.log(pending.data);
      if (res.status === 200) {
        console.log(res);
        window.location.replace(res.data.red_url);
      } else {
        console.log("Error in payment");
      }
      setLoading(true);
      const timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? progressDone(timer) : prevProgress + 10
        );
      }, 800);
    });
  };

  const { handleSubmit, control } = useForm();

  return (
    <div className="institution-container">
      <div className="institution-section1">
        <div className="institution-section1-card">
          <div className="institution-section1-card-category">
            {profile.category}
          </div>
          <div className="institution-section1-card-title">
            {profile.institutionName}
          </div>
          <div className="institution-section1-card-location">
            {profile.location}
          </div>
          <div
            className="institution-section1-card-booking"
            onClick={(e) => {
              console.log(validity);
              if (validity) {
                e.preventDefault();
                handleOpen();
              }
            }}
            style={{
              backgroundColor: `${!validity ? "gray" : "rgb(53, 53, 53)"}`,
            }}
          >
            {!validity ? "this institution not available now" : "Booking"}
          </div>
        </div>
        <div className="institution-section1-slider">
          <Carousel autoplay>
            {profile?.gallery?.map((img) => {
              return (
                <div className="institution-section1-slider-slide">
                  <img className="institution-img" src={img} alt="salon" />
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
      <div className="institution-section2">{profile.description}</div>
      <div className="services-container-title">Our Services</div>
      <div className="services-container">
        <Services services={services} />
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="modal-title">Reserve Appointments With Us</div>
            <form
              onSubmit={handleSubmit((e) => {
                handleSubmitButton(e);
              })}
            >
              <div className="modal">
                <div className="modal-section-1">
                  <div className="modal-services">
                    <FormGroup>
                      {services.map((ser) => (
                        <>
                          <div className="modal-service">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Controller
                                name={ser._id.toString()}
                                control={control}
                                render={({ field }) => {
                                  return (
                                    <FormControl {...field}>
                                      <Checkbox
                                        value={{
                                          price: ser.price,
                                          time: ser.time,
                                        }}
                                        onChange={(eve) => {
                                          if (eve.target.checked) {
                                            setBooking((prev) => {
                                              return {
                                                time: prev.time + ser.time,
                                                price: prev.price + ser.price,
                                              };
                                            });
                                          } else {
                                            setBooking((prev) => {
                                              return {
                                                time: prev.time - ser.time,
                                                price: prev.price - ser.price,
                                              };
                                            });
                                          }
                                        }}
                                      />
                                    </FormControl>
                                  );
                                }}
                              />
                              <div className="modal-service-name">
                                {ser.name}
                              </div>
                            </div>
                            <div className="modal-service-price">
                              <div>{ser.price}</div>
                              <AttachMoneyOutlined />
                            </div>
                          </div>
                          <Divider />
                        </>
                      ))}
                    </FormGroup>
                  </div>
                  <div className="modal-total">
                    <div>Total</div>
                    <div className="modal-total-stat">
                      Price : <span>{booking.price.toFixed(2)}</span>
                      <AttachMoneyOutlined />
                    </div>
                    <div className="modal-total-stat">
                      Time :<span>{booking.time} min</span>
                      <AccessTimeFilledOutlined />
                    </div>
                    <Botton
                      disabled={
                        time.length === 0 ||
                        booking.price === 0 ||
                        value < Date.now()
                      }
                      variant="contained"
                      sx={{
                        mt: 2.5,
                        pt: 2,
                        pb: 2,
                      }}
                      type="submit"
                      color="secondary"
                      className="modal-total-stat-button"
                    >
                      Reserve The Appointment
                    </Botton>
                  </div>
                </div>
                <div className="modal-section-2">
                  <Controller
                    name="date"
                    control={control}
                    render={({ field }) => {
                      return (
                        <FormControl>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                              label="Date"
                              inputFormat="MM/dd/yyyy"
                              value={value}
                              onChange={handleChange}
                              renderInput={(params) => (
                                <TextField {...field} {...params} />
                              )}
                            />
                          </LocalizationProvider>
                        </FormControl>
                      );
                    }}
                  />

                  <FormControl
                    size="medium"
                    sx={{ width: "25%", marginLeft: "2em" }}
                  >
                    <InputLabel id="demo-simple-select-label">Time</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={time}
                      label="Available Times"
                      onChange={handleChangeTime}
                    >
                      {Times.map((e) => (
                        <MenuItem
                          value={e}
                          sx={{
                            fontFamily: "Poppins",
                            fontWeight: 400,
                          }}
                        >
                          {e}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div>
                {loading && (
                  <LinearProgress variant="determinate" value={progress} />
                )}
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
      <Snackbar
        open={openAlert}
        autoHideDuration={1000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          Reservation Done
        </Alert>
      </Snackbar>
    </div>
  );
}

function Services({ services }) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      {services?.length === 0 ? (
        <Empty />
      ) : (
        <div>
          {services?.map((ser) => (
            <Accordion
              expanded={expanded === ser.name}
              onChange={handleChange(ser.name)}
            >
              <AccordionSummary className="ac-sum">{ser.name}</AccordionSummary>
              <AccordionDetails className="ac-det">
                <div>{ser.description}</div>
                <div
                  style={{
                    width: "30%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    marginTop: "1em",
                  }}
                >
                  <div className="flex">
                    {ser.price}
                    <AttachMoneyOutlined />
                  </div>
                  <div className="flex">
                    {ser.time}
                    <AccessTimeFilledOutlined />
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}
    </>
  );
}
