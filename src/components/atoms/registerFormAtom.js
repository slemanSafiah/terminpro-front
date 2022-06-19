import { atom } from "jotai";

const personalInfoAtmo = atom({
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  type: "customer",
});
const passwordAtom = atom({
  password: "",
  confirmPassword: "",
});
const instiutionInfoAtom = atom({
  category: "",
  description: "",
  institutionName: "",
  location: "",
  paypal: "",
});

export default {
  personalInfoAtmo,
  passwordAtom,
  instiutionInfoAtom,
};
