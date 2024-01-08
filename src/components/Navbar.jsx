import React from 'react';
import { GiAbstract049} from 'react-icons/gi';
import { FaRegKeyboard } from "react-icons/fa";
import { FaChessKing } from "react-icons/fa6";
import { IoInformation } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { PiBellRingingFill } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";


function Navbar({ isNotification, setIsNotification }) {
    return (
        <div className='w-[100%] flex items-center'>
            <a href="/" className='flex gap-3 cursor-pointer'>
                <div className="icon items-center">
                    <GiAbstract049 style={{ width: '30px', height: '50px', color: '#E2B714' }} />
                </div>

                <h1 className="text relative flex items-center text-3xl dark:text-[#d1d0c5] text-black">
                    <div className="absolute -top-[5%] left-[5%] text-xs text-[#646669]">donkey see</div>
                    <span className='font-medium'>donkeytype</span>
                </h1>
            </a>


            <div className="nav flex flex-1 justify-between ml-5">
                <div className="links flex w-[180px] items-center gap-6 text-[#646669]">
                        <FaRegKeyboard className='icons cursor-pointer hover:text-black dark:hover:text-white transition-all ease-in-out duration-500'/>
                        <FaChessKing className='icons cursor-pointer hover:text-black dark:hover:text-white transition-all ease-in-out duration-500 '/>
                        <IoInformation className='icons cursor-pointer hover:text-black dark:hover:text-white transition-all ease-in-out duration-500 '/>
                        <IoMdSettings className='icons cursor-pointer hover:text-black dark:hover:text-white transition-all ease-in-out duration-500 '/>
                </div>

                <div className="account-info flex items-center gap-6 text-[#646669]">
                    <PiBellRingingFill onClick={() => setIsNotification(!isNotification)} className='icons cursor-pointer hover:text-black dark:hover:text-white transition-all ease-in-out duration-500 '/>
                    <IoPersonOutline className='icons cursor-pointer hover:text-black dark:hover:text-white transition-all ease-in-out duration-500 '/>
                </div>
            </div>
        </div>
    );
}

export default Navbar;