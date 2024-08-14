import React from "react";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa6";
import Cookies from "js-cookie"; 

const Profile = () => {
    // Fetching the user image from cookies
    const cookieImageURL = Cookies.get("user_image");

    return (
        <div className="w-[100px] flex justify-between items-center">
            <HiOutlineBellAlert size={26} />
            <div>
                {cookieImageURL ? (
                    <div
                        className="rounded-[50%] bg-cover bg-center w-10 h-10 bg-no-repeat"
                        style={{ backgroundImage: `url(${cookieImageURL})` }}
                    ></div>
                ) : (
                    <FaRegUser size={26} />
                )}
            </div>
        </div>
    );
};

export default Profile;
