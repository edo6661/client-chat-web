export interface LoginState {
  email: string;
  password: string;
}

export interface LoginInput {
  name: keyof LoginState;
  label: string;
  type: string;
  placeholder: string;
}
export const initialLoginState: LoginState = {
  email: "",
  password: "",
};

export const loginInputs: LoginInput[] = [
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
];
