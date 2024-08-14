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
import { SITE_URL } from "@/App";

const register = () => {

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
    const { toast } = useToast()

    // ? NAVIGATE HOOK
    const navigate = useNavigate();

    //? REGISTER DETAILS
    const [registerFullName, setRegisterFullName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword1, setRegisterPassword1] = useState("");
    const [registerPassword2, setRegisterPassword2] = useState("");

    //? SIGN IN REGISTER 
    const handleRegister = (e) => {

        // ? PREVENT DEFAULT BEHAVIOR
        e.preventDefault();

        console.log(registerFullName);
        console.log(registerEmail);
        console.log(registerPassword1);
        console.log(registerPassword2);


        // ? CREATE USER API
        const createUserAPI = (full_name, email, password) => {
            fetch(`${SITE_URL}/api/method/procurement_ai.utils.register_user.register_user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    full_name: full_name,
                    email: email,
                    password: password,
                }),
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            }).then((data) => {
                console.log("resppp",data.message);
                toast({
                    description: `Successfully Logged In As: ${data.full_name}`,
                });
                // navigate("/dashboard");
            }).catch((err) => {
                toast({
                    variant: "destructive",
                    title: "Something went wrong!",
                    description: `${err.message}`,
                });
            });
        }

        // ? CALL THE API TO CRETE USER
        createUserAPI(registerFullName, registerEmail, registerPassword1);
    }


    // ? REDIRECT IF THE USER IS LOGGED IN SUCCESSFULLY
    // useEffect(() => {

    //     // ? IF THE CURRENT USER EXISTS
    //     if (currentUser) {
    //         // navigate("/dashboard");

    //     }
    // }, [currentUser])


    return (
        <>
            <div className="main-container w-[100dvw] h-[100dvh] flex justify-center items-center text-[#333] login-container p-5">
                <Card className="!bg-[white] !border-[white] shadow-[0px_0px_15px_1px_rgba(0,0,0,0.2)] flex justify-center col-2 w-[450px] py-16 rounded-lg">
                    <form className="w-full" id="signInForm" onSubmit={(e) => { handleRegister(e) }}>
                        <CardHeader>
                            <CardTitle className="text-4xl text-[#333] text-center !font-extrabold">
                                Sign Up
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="">
                            <div className="flex flex-col w-full items-center gap-2">
                                <div className="social-media-login text-[#333] text-xl flex justify-between w-full max-w-40">
                                    <a href="" className="facebook bg-white shadow-[0px_0px_15px_1px_rgba(0,0,0,0.1)] border p-2.5 rounded-full">
                                        <ImFacebook />
                                    </a>
                                    <a href="" className="google-plus bg-white shadow-[0px_0px_15px_1px_rgba(0,0,0,0.1)] border p-2.5 rounded-full">
                                        <FaGooglePlusG />
                                    </a>
                                    <a href="" className="facebook bg-white shadow-[0px_0px_15px_1px_rgba(0,0,0,0.1)] border p-2.5 rounded-full">
                                        <FaLinkedinIn />
                                    </a>
                                </div>
                                <div className="form-content flex flex-col w-full">
                                    <span className="form-heading text-[#333] text-sm text-center mt-2">
                                        or use your email for registration
                                    </span>
                                    <div className="registerFullName py-2">
                                        <Input className="w-full registerFullName !bg-[#F2F0ED] text-[#333] border-none" id="registerFullName" placeholder="Full Name" type="text" value={registerFullName} onChange={(e) => { setRegisterFullName(e.currentTarget.value) }} />
                                    </div>
                                    <div className="registerEmail py-2">
                                        <Input className="w-full registerEmail !bg-[#F2F0ED] text-[#333] border-none" id="registerEmail" placeholder="Email" type="text" value={registerEmail} onChange={(e) => { setRegisterEmail(e.currentTarget.value) }} />
                                    </div>
                                    <div className="registerPassword1 py-2">
                                        <Input className="w-full registerPassword1 !bg-[#F2F0ED] text-[#333] border-none" id="registerPassword1" placeholder="Password" type="password" value={registerPassword1} onChange={(e) => { setRegisterPassword1(e.currentTarget.value) }} />
                                    </div>
                                    <div className="registerPassword2 py-2">
                                        <Input className="w-full registerPassword2 !bg-[#F2F0ED] text-[#333] border-none" id="registerPassword2" placeholder="Password" type="password" value={registerPassword2} onChange={(e) => { setRegisterPassword2(e.currentTarget.value) }} />
                                    </div>
                                    <div className="forgot-password text-center text-sm cursor-pointer">
                                        <a className="text-center text-[#333] cursor-pointer" onClick={(e) => { navigate("/auth/forgot-password") }}>
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <div className="already-user text-center text-sm cursor-pointer">
                                        <a className="text-center text-[#333] cursor-pointer" onClick={(e) => { navigate("/auth/login") }}>
                                            Already a user?
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col justify-center gap-2">
                            <Button variant="outline" className="rounded-3xl py-[12px] px-[50px] !bg-[#000] border-none font-bold text-white hover:text-white">SIGN UP</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </>
    )
}

export default register