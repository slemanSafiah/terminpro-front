import { atom } from "jotai";

const appointmentAtom = atom({
  date: "",
  history: "",
  service: [],
  institution: "",
  user: "",
});

export default appointmentAtom;
