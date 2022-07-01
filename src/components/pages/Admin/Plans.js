import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Navigation } from "swiper";
import { AddRounded } from "@mui/icons-material";
import Plan from "./Plan";
import { Controller, useForm } from "react-hook-form";
import {
  Modal,
  Fade,
  Box,
  Backdrop,
  TextField,
  Button,
  FormControl,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Empty } from "antd";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";

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

const styleInp = {
  width: "50%",
  margin: "10px 0px",
};

export default function Plans() {
  const [open, setOpen] = useState(false);
  const [plans, setPlans] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios({
      url: "https://terminpro2022.herokuapp.com/api/plan",
      method: "GET",
    }).then((res) => {
      setPlans(res.data);
    });
  }, []);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      sku: "",
      plan: "",
      price: "0.00",
      services: 0,
      length: 0,
    },
    resolver: yupResolver(
      yup.object({
        sku: yup.string().required(),
        plan: yup.string().required(),
        price: yup.string().required(),
        services: yup.number().required(),
        length: yup.number().required(),
      })
    ),
  });

  function onSubmit(formData) {
    axios({
      url: "https://terminpro2022.herokuapp.com/api/plan",
      method: "POST",
      data: {
        sku: formData.sku,
        name: formData.plan,
        price: formData.price,
        serviceLimit: formData.services,
        length: formData.length,
      },
    }).then((res) => {
      setPlans((prev) => [...prev, res.data.data]);
    });
    handleClose();
  }

  return (
    <div className="container">
      <div>
        <div className="title">Plans</div>
        <div className="plans-swiper-container">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            pagination={{
              clickable: true,
            }}
          >
            {plans?.length > 0 ? (
              <>
                {plans.map((plan) => {
                  return (
                    <SwiperSlide>
                      <Plan plan={plan} setPlans={setPlans} />
                    </SwiperSlide>
                  );
                })}
              </>
            ) : (
              <Empty
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50% , -50%)",
                }}
              />
            )}
          </Swiper>
        </div>
        <Button
          onClick={handleOpen}
          sx={{
            marginTop: "32px",
            marginLeft: "50%",
            transform: "translateX(-50%)",
          }}
          variant="contained"
          color="secondary"
          size="large"
        >
          Add New{" "}
          <AddRounded
            sx={{
              marginLeft: "12px",
            }}
          />
        </Button>
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
              <div
                style={{
                  color: "rgba(100, 100 ,100, 1)",
                  fontSize: "1.3rem",
                  textAlign: "center",
                  width: "100%",
                  fontFamily: "Poppins",
                }}
              >
                Add new Plan
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <form
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    flexDirection: "column",
                  }}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Controller
                    name="sku"
                    control={control}
                    render={({ field }) => {
                      return (
                        <FormControl
                          sx={styleInp}
                          error={errors?.sku}
                          {...field}
                        >
                          <TextField
                            label="SKU"
                            placeholder="SKU"
                            error={errors?.sku}
                            helperText={errors?.sku ? errors.sku.message : ""}
                          />
                        </FormControl>
                      );
                    }}
                  />
                  <Controller
                    name="plan"
                    control={control}
                    render={({ field }) => {
                      return (
                        <FormControl
                          sx={styleInp}
                          error={errors?.plan}
                          {...field}
                        >
                          <TextField
                            label="Plan"
                            placeholder="Plan"
                            error={errors?.plan}
                            helperText={errors?.plan ? errors.plan.message : ""}
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
                          sx={styleInp}
                          error={errors?.price}
                          {...field}
                        >
                          <TextField
                            label="Price"
                            placeholder="Price"
                            error={errors?.price}
                            helperText={
                              errors?.price ? errors.price.message : ""
                            }
                          />
                        </FormControl>
                      );
                    }}
                  />
                  <Controller
                    name="services"
                    control={control}
                    render={({ field }) => {
                      return (
                        <FormControl
                          sx={styleInp}
                          error={errors?.services}
                          {...field}
                        >
                          <TextField
                            label="Services"
                            placeholder="Services"
                            error={errors?.services}
                            helperText={
                              errors?.services ? errors.services.message : ""
                            }
                          />
                        </FormControl>
                      );
                    }}
                  />
                  <Controller
                    name="length"
                    control={control}
                    render={({ field }) => {
                      return (
                        <FormControl
                          sx={styleInp}
                          error={errors?.length}
                          {...field}
                        >
                          <TextField
                            label="Length"
                            placeholder="Length"
                            error={errors?.length}
                            helperText={
                              errors?.length ? errors.length.message : ""
                            }
                          />
                        </FormControl>
                      );
                    }}
                  />
                  <Button
                    sx={{ ...styleInp, mb: 3 }}
                    variant="contained"
                    color="secondary"
                    type="submit"
                  >
                    Add
                  </Button>
                </form>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}
