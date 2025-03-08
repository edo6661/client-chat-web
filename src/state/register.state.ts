export interface RegisterState {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterInput {
  name: keyof RegisterState;
  label: string;
  type: string;
  placeholder: string;
}
export const initialRegisterState: RegisterState = {
  fullname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const registerInputs: RegisterInput[] = [
  {
    name: "fullname",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password",
  },
];
