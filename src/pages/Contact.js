import React from "react";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { Button, FormControl, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import emailjs from "@emailjs/browser";

import "./contact.css";

const schema = yup.object({
  name: yup.string().min(5).required(),
  email: yup.string().email().required(),
  mobile: yup.string().required(),
  message: yup.string().min(10).required(),
});

let initValues = {
  name: "",
  email: "",
  mobile: "",
  message: "",
};

export default function Contact() {
  const {
    handleSubmit,
    control,
    formState,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initValues,
    resolver: yupResolver(schema),
  });

  const mediaQuery = window.matchMedia("(max-width: 600px)");

  function onSubmit(formData) {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute("6LdjnIkgAAAAAOBJX4J2k-Ir3YPDu_Of32E7AT45", {
          action: "submit",
        })
        .then(() => {
          emailjs
            .send(
              "service_xeju0rk",
              "template_p2ssu4q",
              {
                Name: formData.name,
                Email: formData.email,
                Number: formData.mobile,
                Message: formData.message,
              },
              "user_qCv6fHInwGWyS1oSahpy9"
            )
            .then(
              function (response) {
                console.log("SUCCESS!", response.status, response.text);
              },
              function (error) {
                console.log("FAILED...", error);
              }
            );
        })
        .catch((err) => {
          console.log("Error in Recaptcha");
        });
    });
  }

  return (
    <>
      <Header />
      <img
        src="assets/contact.jpg"
        alt="contact terminpro"
        className="contact-background"
      />
      <div className="contact-container">
        <h1 className="contact-title">Contact US</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
          <Controller
            name="name"
            control={control}
            render={({ field }) => {
              return (
                <FormControl
                  sx={{
                    width: "100%",
                    mb: 2,
                  }}
                  {...field}
                  error={errors.name}
                >
                  <TextField
                    label="Full Name"
                    placeholder="Full Name"
                    error={errors.name}
                    helperText={errors.name ? errors.name.message : ""}
                  />
                </FormControl>
              );
            }}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => {
              return (
                <FormControl
                  sx={{
                    width: "100%",
                    mb: 2,
                  }}
                  {...field}
                  error={errors.email}
                >
                  <TextField
                    label="Email"
                    type="email"
                    placeholder="Email"
                    error={errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                  />
                </FormControl>
              );
            }}
          />
          <Controller
            name="mobile"
            control={control}
            render={({ field }) => {
              return (
                <FormControl
                  sx={{
                    width: "100%",
                    mb: 2,
                  }}
                  {...field}
                  error={errors.mobile}
                >
                  <TextField
                    label="Mobile Number"
                    placeholder="Mobile Number"
                    error={errors.mobile}
                    helperText={errors.mobile ? errors.mobile.message : ""}
                  />
                </FormControl>
              );
            }}
          />
          <Controller
            name="message"
            control={control}
            render={({ field }) => {
              return (
                <FormControl
                  sx={{
                    width: "100%",
                    mb: 2,
                  }}
                  {...field}
                  error={errors.message}
                >
                  <TextField
                    label="Message"
                    placeholder="Message"
                    error={errors.message}
                    helperText={errors.message ? errors.message.message : ""}
                    rows={4}
                    multiline
                  />
                </FormControl>
              );
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="large"
            sx={
              mediaQuery.matches
                ? {}
                : {
                    ml: "100%",
                    mt: 1,
                    transform: "translateX(-100%)",
                  }
            }
          >
            Send
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
}
