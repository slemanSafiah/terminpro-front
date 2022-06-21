import React, { useState, useEffect } from "react";

import {
  Button,
  Modal,
  Fade,
  Box,
  Backdrop,
  FormControl,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  AddTask,
  Password,
  Payment,
  Person,
  SubscriptionsRounded,
} from "@mui/icons-material";
import Notification from "../../shared/Notification";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Navigation } from "swiper";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Empty } from "antd";
import { Buffer } from "buffer";
import axios from "axios";
import Gallery from "./Gallery";
import Services from "./Services";
import Plan from "../../pages/Admin/Plan";
import SubscriptionStatus from "./SubscriptionStatus";
import { useAtom } from "jotai";
import validaityAtom from "../../atoms/validity";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const schemaPassword = yup.object({
  password: yup.string().min(5).required(),
  confirmPassword: yup
    .string()
    .min(5)
    .required()
    .test(
      "checking Password",
      "check if two passwords are the same",
      (value, context) => {
        return value === context.parent.password;
      }
    ),
});

const Input = styled("input")({
  display: "none",
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: "0px 0px 3px 2px rgba(100,100,100,0.5)",
  p: "32px 0 0 0",
};

export default function ProfileComp() {
  const [validity, setValidity] = useAtom(validaityAtom);

  const [services, setServices] = useState([]);

  const [gImage, setGImage] = useState("");

  const [image, setImage] = useState("");

  const [userId, setUserId] = useState("");

  const [profile, setProfile] = useState({});

  const [type, setType] = useState("");

  const [open, setOpen] = useState(false);

  const [modified, setModified] = useState("");

  const [plans, setPlans] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  const [end, setEnd] = useState("");

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    let token =
      localStorage.getItem("token") &&
      JSON.parse(
        Buffer.from(localStorage.getItem("token"), "base64")
          .toString("utf-8")
          .split("}")[1] + "}"
      );

    setUserId(token.id);
    axios({
      url: `http://localhost:5000/api/user/${token.id}`,
      method: "GET",
    }).then((res) => {
      setProfile(res.data.data);
    });
  }, []);

  useEffect(() => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "terminpro");
    data.append("cloud_name", "sleman43");
    axios({
      url: "https://api.cloudinary.com/v1_1/sleman43/image/upload",
      method: "POST",
      data: data,
    }).then((res) => {
      //res.data.url
      axios({
        url: `http://localhost:5000/api/user/${userId}/photo`,
        method: "PUT",
        data: {
          img: res.data.url,
        },
      })
        .then(() => {
          setProfile((prev) => {
            return { ...prev, img: res.data.url };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  useEffect(() => {
    const data = new FormData();
    data.append("file", gImage);
    data.append("upload_preset", "terminpro");
    data.append("cloud_name", "sleman43");
    axios({
      url: "https://api.cloudinary.com/v1_1/sleman43/image/upload",
      method: "POST",
      data: data,
    }).then((res) => {
      axios({
        url: `http://localhost:5000/api/user/${userId}/gallery`,
        method: "PUT",
        data: {
          img: res.data.url,
        },
      })
        .then((res) => {
          setProfile((prev) => {
            return { ...prev, gallery: [...profile.gallery, res.data.url] };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gImage]);

  useEffect(() => {
    axios({
      url: `http://localhost:5000/api/service/all/${userId}`,
      method: "GET",
    })
      .then((res) => {
        setServices(res.data.data);
      })
      .catch((err) => {
        console.err(err);
      });
  }, [userId]);

  useEffect(() => {
    axios({
      url: "http://localhost:5000/api/plan",
      method: "GET",
    }).then((res) => {
      setPlans(res.data);
    });
  }, []);

  useEffect(() => {
    axios({
      url: `http://localhost:5000/api/payment/checkValidity/${userId}`,
      method: "GET",
    })
      .then((res) => {
        setEnd(res.data.end);
      })
      .catch((err) => console.log);
  }, [userId]);

  return (
    <div className="profile-contianer">
      {profile.type === "institution" && (
        <SubscriptionStatus end={end} id={userId} />
      )}
      <div className="profile-personal">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {profile.img ? (
            <img src={profile.img} alt="profile" className="profile-image" />
          ) : (
            <div className="profile-image">
              <Empty
                description="add your image"
                style={{
                  marginTop: "2em",
                  fontFamily: "Poppins",
                  color: "gray",
                }}
              />
            </div>
          )}
          <label
            htmlFor="contained-button-file"
            style={{
              marginTop: "1em",
            }}
          >
            <form>
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
              <Button
                color="secondary"
                variant="contained"
                component="span"
                type="submit"
              >
                Upload
              </Button>
            </form>
          </label>{" "}
        </div>
        <div className="profile-info">
          <div>
            {profile.firstName} {profile.lastName}
          </div>
          <div>Email : {profile.email}</div>
        </div>
      </div>
      <div className="profile-buttons">
        <Button
          endIcon={<Password />}
          variant="contained"
          color="secondary"
          onClick={(e) => {
            e.preventDefault();
            setType("password");
            handleOpen();
          }}
          sx={{ m: 2 }}
          disabled={profile.type === "institution" && !validity}
        >
          Change Password
        </Button>
        <Button
          sx={{ m: 2 }}
          endIcon={<Payment />}
          variant="contained"
          color="secondary"
          onClick={(e) => {
            e.preventDefault();
            setType("paypal");
            handleOpen();
          }}
          disabled={profile.type === "institution" && !validity}
        >
          Change Paypal Account
        </Button>
        {profile.type === "institution" && (
          <Button
            sx={{ m: 2 }}
            endIcon={<Person />}
            variant="contained"
            color="secondary"
            onClick={(e) => {
              e.preventDefault();
              setType("information");
              handleOpen();
            }}
            disabled={profile.type === "institution" && !validity}
          >
            Change INFORMATION
          </Button>
        )}
        {profile.type === "institution" && (
          <Button
            sx={{ m: 2 }}
            endIcon={<SubscriptionsRounded />}
            variant="contained"
            color="secondary"
            onClick={(e) => {
              e.preventDefault();
              setType("subscription");
              handleOpen();
            }}
          >
            Change SUBSCRIPTION
          </Button>
        )}
      </div>

      {profile.type === "institution" ? (
        <>
          <div
            className="profile-sec-header"
            style={{
              fontSize: "1.4rem",
              fontFamily: "Poppins",
              margin: "1em 0em",
            }}
          >
            Images Gallery
            <div>
              <label
                htmlFor="contained-button-files"
                style={{
                  marginTop: "1em",
                }}
              >
                <form>
                  <Input
                    accept="image/*"
                    id="contained-button-files"
                    multiple
                    type="file"
                    onChange={(e) => {
                      setGImage(e.target.files[0]);
                    }}
                  />
                  <Button
                    color="secondary"
                    variant="contained"
                    component="span"
                    type="submit"
                    disabled={profile.type === "institution" && !validity}
                  >
                    Upload
                  </Button>
                </form>
              </label>
            </div>
          </div>
          <Gallery images={profile?.gallery} userId={userId} />
        </>
      ) : (
        <></>
      )}
      {profile.type === "institution" ? (
        <>
          <div className="profile-sec-header">
            <div
              style={{
                fontSize: "1.4rem",
                fontFamily: "Poppins",
                margin: "1em 0em",
              }}
            >
              Available Services
            </div>
            {validity && (
              <AddTask
                color="success"
                onClick={(e) => {
                  e.preventDefault();
                  setType("add service");
                  handleOpen();
                }}
              />
            )}
          </div>
          <Services
            setType={setType}
            openModal={handleOpen}
            services={services}
            setServices={setServices}
            setModified={setModified}
          />
        </>
      ) : (
        <></>
      )}
      <div
        style={{
          textAlign: "center",
          fontSize: "1.4rem",
          fontFamily: "Poppins",
          margin: "1em 0em",
        }}
      >
        Previous appointments
      </div>
      {true ? (
        <AppsTable userId={userId} profile={profile} />
      ) : (
        <Empty
          style={{
            padding: "5em",
          }}
        />
      )}

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
            {type === "password" ? (
              <ChangePassword closeModal={handleClose} userId={userId} />
            ) : type === "paypal" ? (
              <ChangePaypal closeModal={handleClose} userId={userId} />
            ) : type === "add service" ? (
              <AddService
                closeModal={handleClose}
                userId={userId}
                services={services}
                setServices={setServices}
                setErrorMessage={setErrorMessage}
              />
            ) : type === "information" ? (
              <ModifyInformation closeModal={handleClose} userId={userId} />
            ) : type === "subscription" ? (
              <SelectSubscription
                closeModal={handleClose}
                userId={userId}
                plans={plans}
              />
            ) : (
              <ModifyService
                closeModal={handleClose}
                serviceId={modified}
                setServices={setServices}
              />
            )}
          </Box>
        </Fade>
      </Modal>
      {errorMessage ? (
        <Notification message={errorMessage} type={"error"} />
      ) : (
        <></>
      )}
    </div>
  );
}

function ChangePassword({ closeModal, userId }) {
  function onSubmit(formData) {
    axios({
      url: `http://localhost:5000/api/user/${userId}/changePassword`,
      method: "PUT",
      data: {
        password: formData.password,
      },
    }).catch((err) => {
      console.log(err);
    });
    closeModal();
  }

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schemaPassword),
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "70%",
          margin: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => {
              return (
                <FormControl
                  sx={{
                    width: "100%",
                  }}
                  error={errors.password}
                  {...field}
                >
                  <TextField
                    sx={{
                      width: "70%",
                      mb: 2,
                    }}
                    label="Password"
                    placeholder="Password"
                    helperText={errors.password ? errors.password.message : ""}
                    error={errors.password}
                  />
                </FormControl>
              );
            }}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => {
              return (
                <FormControl
                  sx={{
                    width: "100%",
                  }}
                  error={errors.confirmPassword}
                  {...field}
                >
                  <TextField
                    sx={{
                      width: "70%",
                      mb: 4,
                    }}
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    helperText={
                      errors.confirmPassword
                        ? errors.confirmPassword.message
                        : ""
                    }
                    error={errors.confirmPassword}
                  />
                </FormControl>
              );
            }}
          />
        </div>

        <Button variant="contained" type="submit" size="large">
          Update
        </Button>
      </form>
    </>
  );
}

function ChangePaypal({ closeModal, userId }) {
  function onSubmit(formData) {
    axios({
      url: `http://localhost:5000/api/user/${userId}`,
      method: "PUT",
      data: {
        paypal: formData.paypal,
      },
    }).catch((err) => {
      console.log(err);
    });
    closeModal();
  }

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      paypal: "",
    },
    resolver: yupResolver(
      yup.object({ paypal: yup.string().min(12).required() })
    ),
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "70%",
          margin: "auto",
        }}
      >
        <Controller
          name="paypal"
          control={control}
          render={({ field }) => {
            return (
              <FormControl
                sx={{
                  width: "100%",
                }}
                error={errors.confirmPassword}
                {...field}
              >
                <TextField
                  sx={{
                    width: "80%",
                    mb: 4,
                  }}
                  label="Paypal"
                  placeholder="Paypal"
                  helperText={errors.paypal ? errors.paypal.message : ""}
                  error={errors.paypal}
                />
              </FormControl>
            );
          }}
        />

        <Button
          variant="contained"
          type="submit"
          size="large"
          sx={{
            mb: 4,
          }}
        >
          Update
        </Button>
      </form>
    </>
  );
}

function ModifyInformation({ closeModal, userId }) {
  function onSubmit(formData) {
    axios({
      url: `http://localhost:5000/api/user/${userId}`,
      method: "PUT",
      data: {
        institutionName: formData.name,
        location: formData.location,
        description: formData.description,
      },
    }).catch((err) => {
      console.log(err);
    });
    closeModal();
  }

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: "",
      location: "",
      description: "",
    },
    resolver: yupResolver(
      yup.object({
        name: yup.string().min(3).required(),
        location: yup.string().min(6).required(),
        description: yup.string().min(10).required(),
      })
    ),
  });
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "50%",
          margin: "auto",
        }}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => {
            return (
              <FormControl
                sx={{
                  width: "100%",
                }}
                error={errors.name}
                {...field}
              >
                <TextField
                  sx={{
                    width: "100%",
                    mb: 4,
                  }}
                  label="Name"
                  placeholder="Name"
                  helperText={errors.name ? errors.name.message : ""}
                  error={errors.name}
                />
              </FormControl>
            );
          }}
        />
        <Controller
          name="location"
          control={control}
          render={({ field }) => {
            return (
              <FormControl
                sx={{
                  width: "100%",
                }}
                error={errors.location}
                {...field}
              >
                <TextField
                  sx={{
                    width: "100%",
                    mb: 4,
                  }}
                  label="Location"
                  placeholder="Location"
                  helperText={errors.location ? errors.location.message : ""}
                  error={errors.location}
                />
              </FormControl>
            );
          }}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => {
            return (
              <FormControl
                sx={{
                  width: "100%",
                }}
                error={errors.description}
                {...field}
              >
                <TextField
                  sx={{
                    width: "100%",
                    mb: 4,
                  }}
                  label="Description"
                  placeholder="Description"
                  multiline
                  rows={3}
                  helperText={
                    errors.description ? errors.description.message : ""
                  }
                  error={errors.description}
                />
              </FormControl>
            );
          }}
        />
        <Button
          variant="contained"
          type="submit"
          size="large"
          sx={{
            mb: 4,
          }}
        >
          Update
        </Button>
      </form>
    </>
  );
}

function SelectSubscription({ plans, userId, closeModal }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Swiper
          style={{
            height: "300px",
            width: "80%",
          }}
          modules={[Navigation, Pagination, A11y]}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          pagination={{
            clickable: true,
          }}
        >
          {plans.map((plan) => {
            return (
              <SwiperSlide>
                <Plan
                  plan={plan}
                  type="owner"
                  closeModal={closeModal}
                  userId={userId}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}

function AddService({
  closeModal,
  userId,
  setServices,
  services,
  setErrorMessage,
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      time: 0,
      price: 0,
    },
    resolver: yupResolver(
      yup.object({
        name: yup.string().required(),
        description: yup.string().required(),
        time: yup.number().min(1).required(),
        price: yup.number().min(1).required(),
      })
    ),
  });

  function onSubmit(formData) {
    axios({
      url: "http://localhost:5000/api/service",
      method: "POST",
      data: {
        ...formData,
        institution: userId,
      },
    })
      .then((res) => {
        if (res.data.msg) {
          setErrorMessage(res.data.msg);
        } else {
          setServices([...services, res.data]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    closeModal();
  }

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          marginBottom: "1em",
          fontSize: "1.3rem",
        }}
      >
        Add New Service
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => {
            return (
              <FormControl
                sx={{
                  width: "100%",
                }}
                error={errors.name}
                {...field}
              >
                <TextField
                  sx={{
                    mr: "auto",
                    ml: "auto",
                    width: "60%",
                    mb: 4,
                  }}
                  label="Name"
                  placeholder="Name"
                  helperText={errors.name ? errors.name.message : ""}
                  error={errors.name}
                />
              </FormControl>
            );
          }}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => {
            return (
              <FormControl
                sx={{
                  width: "100%",
                }}
                error={errors.description}
                {...field}
              >
                <TextField
                  sx={{
                    mr: "auto",
                    ml: "auto",
                    width: "60%",
                    mb: 4,
                  }}
                  label="Description"
                  placeholder="Description"
                  helperText={
                    errors.description ? errors.description.message : ""
                  }
                  error={errors.description}
                />
              </FormControl>
            );
          }}
        />
        <Controller
          name="time"
          control={control}
          render={({ field }) => {
            return (
              <FormControl
                sx={{
                  width: "100%",
                }}
                error={errors.time}
                {...field}
              >
                <TextField
                  sx={{
                    mr: "auto",
                    ml: "auto",
                    width: "60%",
                    mb: 4,
                  }}
                  label="Time"
                  placeholder="Time"
                  helperText={
                    errors.time
                      ? "time must be a number and it is required"
                      : ""
                  }
                  error={errors.time}
                />
              </FormControl>
            );
          }}
        />
        <Controller
          name="price"
          control={control}
          render={({ field }) => {
            return (
              <FormControl
                sx={{
                  width: "100%",
                }}
                error={errors.price}
                {...field}
              >
                <TextField
                  sx={{
                    mr: "auto",
                    ml: "auto",
                    width: "60%",
                    mb: 4,
                  }}
                  label="Price"
                  placeholder="Price"
                  helperText={
                    errors.price
                      ? "price must be a number and it is required"
                      : ""
                  }
                  error={errors.price}
                />
              </FormControl>
            );
          }}
        />
        <Button
          variant="contained"
          type="submit"
          size="large"
          style={{
            marginLeft: "70%",
          }}
          sx={{
            mb: 4,
          }}
        >
          Add
        </Button>
      </form>
    </div>
  );
}

function ModifyService({ closeModal, serviceId, setServices }) {
  const { handleSubmit, control } = useForm();
  function onSubmit(formData) {
    axios({
      url: `http://localhost:5000/api/service/${serviceId}`,
      method: "PUT",
      data: formData,
    }).then((res) => {
      setServices((prev) => {
        return [
          ...prev.filter((item) => {
            return item._id !== serviceId;
          }),
          res.data,
        ];
      });
    });
    closeModal();
  }

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          marginBottom: "1em",
          fontSize: "1.3rem",
        }}
      >
        Add New Service
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => {
            return (
              <FormControl
                sx={{
                  width: "100%",
                }}
                {...field}
              >
                <TextField
                  sx={{
                    mr: "auto",
                    ml: "auto",
                    width: "60%",
                    mb: 4,
                  }}
                  label="Name"
                  placeholder="Name"
                />
              </FormControl>
            );
          }}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => {
            return (
              <FormControl
                sx={{
                  width: "100%",
                }}
                {...field}
              >
                <TextField
                  sx={{
                    mr: "auto",
                    ml: "auto",
                    width: "60%",
                    mb: 4,
                  }}
                  label="Description"
                  placeholder="Description"
                />
              </FormControl>
            );
          }}
        />
        <Controller
          name="time"
          control={control}
          render={({ field }) => {
            return (
              <FormControl
                sx={{
                  width: "100%",
                }}
                {...field}
              >
                <TextField
                  sx={{
                    mr: "auto",
                    ml: "auto",
                    width: "60%",
                    mb: 4,
                  }}
                  label="Time"
                  placeholder="Time"
                />
              </FormControl>
            );
          }}
        />
        <Controller
          name="price"
          control={control}
          render={({ field }) => {
            return (
              <FormControl
                sx={{
                  width: "100%",
                }}
                {...field}
              >
                <TextField
                  sx={{
                    mr: "auto",
                    ml: "auto",
                    width: "60%",
                    mb: 4,
                  }}
                  label="Price"
                  placeholder="Price"
                />
              </FormControl>
            );
          }}
        />
        <Button
          variant="contained"
          type="submit"
          size="large"
          style={{
            marginLeft: "70%",
          }}
          sx={{
            mb: 4,
          }}
        >
          Add
        </Button>
      </form>
    </div>
  );
}

function AppsTable({ profile }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (Object.keys(profile).length > 0) {
      axios({
        url: `http://localhost:5000/api/appointment?${
          profile?.type === "customer" ? "user" : "institution"
        }=${profile._id}`,
        method: "GET",
      }).then((res) => {
        setRows(res.data.data);
      });
    }
  }, [profile]);

  return (
    <div
      style={{
        height: "350px",
        overflow: "scroll",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                fontFamily: "Poppins",
              }}
            >
              {profile.type === "customer"
                ? "Institution Name"
                : "Customer Name"}
            </TableCell>
            <TableCell
              align="center"
              style={{
                fontFamily: "Poppins",
              }}
            >
              Date
            </TableCell>
            <TableCell
              align="center"
              style={{
                fontFamily: "Poppins",
              }}
            >
              Price ${" "}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {profile?.type?.length > 0 ? (
            rows?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  style={{
                    fontFamily: "Poppins",
                  }}
                  component="th"
                  scope="row"
                >
                  {profile.type === "customer"
                    ? row.institution.institutionName
                    : `${row.user.firstName} ${row.user.lastName}`}
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Poppins",
                  }}
                  align="center"
                >{`${row.date} -${" " + row.history}`}</TableCell>
                <TableCell
                  style={{
                    fontFamily: "Poppins",
                  }}
                  align="center"
                >
                  {row.service.reduce((acc, curr) => acc + curr.price, 0)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <Snackbar />
          )}
        </TableBody>
      </Table>
    </div>
  );
}
