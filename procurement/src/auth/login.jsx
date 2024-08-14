import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImFacebook } from "react-icons/im";
import { FaGooglePlusG } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { useFrappeAuth } from "frappe-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // ? LOGIN HOOK
  const {
    currentUser,
    isValidating,
    isLoading,
    login,
    logout,
    error,
    updateCurrentUser,
    getUserCookie,
  } = useFrappeAuth();

  //? TOAST HOOK
  const { toast } = useToast();

  // ? NAVIGATE HOOK
  const navigate = useNavigate();

  //? LOG IN DETAILS
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // ? EMAIL HANDLER
  const handleEmail = (e) => {
    setLoginEmail(e.currentTarget.value);
  };

  // ? PASSWORD HANDLER
  const handlePassword = (e) => {
    setLoginPassword(e.currentTarget.value);
  };

  //? SIGN IN HANDLER
  const handleLogin = (e) => {
    // ? PREVENT DEFAULT BEHAVIOR
    e.preventDefault();

    // ? CALL LOGIN HOOK
    const setLoginData = login({
      username: loginEmail,
      password: loginPassword,
    })
      .then((data) => {
        toast({
          description: `Successfully Logged In As: ${data.full_name}`,
        });
        navigate("/dashboard");
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Something went wrong!",
          description: `${err.message}`,
        });
      });
  };

  // ? REDIRECT IF THE USER IS LOGGED IN SUCCESSFULLY
//   useEffect(() => {
//     // ? IF THE CURRENT USER EXISTS
//     if (currentUser) {
//       navigate("/dashboard");
//     }
//   }, [currentUser]);

  return (
    <>
      <div className="main-container w-[100dvw] h-[100dvh] flex justify-center items-center text-[#333] login-container p-5">
        <Card className="!bg-[white] !border-[white] shadow-[0px_0px_15px_1px_rgba(0,0,0,0.2)] flex justify-center col-2 w-[450px] py-16 rounded-lg">
          <form
            className="w-full"
            id="signInForm"
            onSubmit={(e) => {
              handleLogin(e);
            }}
          >
            <CardHeader>
              <CardTitle className="text-4xl text-[#333] text-center !font-extrabold">
                Sign In
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="flex flex-col w-full items-center gap-2">
                <div className="social-media-login text-[#333] text-xl flex justify-between w-full max-w-40">
                  <a
                    href=""
                    className="facebook bg-white shadow-[0px_0px_15px_1px_rgba(0,0,0,0.1)] border p-2.5 rounded-full"
                  >
                    <ImFacebook />
                  </a>
                  <a
                    href=""
                    className="google-plus bg-white shadow-[0px_0px_15px_1px_rgba(0,0,0,0.1)] border p-2.5 rounded-full"
                  >
                    <FaGooglePlusG />
                  </a>
                  <a
                    href=""
                    className="facebook bg-white shadow-[0px_0px_15px_1px_rgba(0,0,0,0.1)] border p-2.5 rounded-full"
                  >
                    <FaLinkedinIn />
                  </a>
                </div>
                <div className="form-content flex flex-col w-full">
                  <span className="form-heading text-[#333] text-sm text-center mt-2">
                    or use your account
                  </span>
                  <div className="loginEmail py-3">
                    <Input
                      className="w-full loginEmail !bg-[#F2F0ED] text-[#333] border-none"
                      id="loginEmail"
                      placeholder="Email"
                      type="text"
                      value={loginEmail}
                      onChange={(e) => {
                        handleEmail(e);
                      }}
                    />
                  </div>
                  <div className="loginPassword py-3">
                    <Input
                      className="w-full loginPassword !bg-[#F2F0ED] text-[#333] border-none"
                      id="loginPassword"
                      placeholder="Password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => {
                        handlePassword(e);
                      }}
                    />
                  </div>
                  <div className="forgot-password text-center text-sm">
                    <a
                      className="text-center text-[#333] cursor-pointer"
                      onClick={(e) => {
                        navigate("/auth/forgot-password");
                      }}
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <div
                    className="already-user text-center text-sm"
                    onClick={(e) => {
                      navigate("/auth/register");
                    }}
                  >
                    <a className="text-center text-[#333] cursor-pointer">
                      Register user?
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col justify-center gap-2">
              <Button
                variant="outline"
                className="rounded-3xl py-[12px] px-[50px] !bg-[#000] border-none font-bold text-white hover:text-white"
              >
                SIGN IN
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Login;