import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import CommonForm from "components/common/form";
import { toast } from "sonner";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";

type AuthState = {
  userName: string;
  email: string;
  password: string;
};
const initialState: AuthState = {
  userName: "",
  email: "",
  password: "",
};

export default function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data: any) => {
      console.log(data);
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        navigate("/auth/login");
      } else {
        toast.error(data?.payload?.message);
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have a account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={"Sign Up"}
      />
    </div>
  );
}
