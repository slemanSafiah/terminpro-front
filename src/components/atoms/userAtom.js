import { atom } from "jotai";

const userAtom = atom({
  firstName: "",
  lastName: "",
  type: "",
  loggedIn: false,
});

export default userAtom;
