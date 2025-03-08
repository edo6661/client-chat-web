import { User } from "@/types/user.type";

export interface UserInput {
  name: keyof User;
  label: string;
  type: string;
  placeholder: string;
}
export const initialUserState: User = {
  email: "",
  fullname: "",
  profilePic: "",
};

export const userInputs: UserInput[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "fullname",
    label: "Fullname",
    type: "text",
    placeholder: "Enter your fullname",
  },
];
