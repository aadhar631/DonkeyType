    import React from "react";
    import { IoIosArrowForward } from "react-icons/io";
    import { FiRefreshCw } from "react-icons/fi";
    import { FaExclamationTriangle } from "react-icons/fa";
    import { CgMenuLeftAlt } from "react-icons/cg";
    import { FaBackward } from "react-icons/fa6";
    import { FaImage } from "react-icons/fa";
    import Charts from "./Charts";


    const Result = ({correctCharCount, incorrectCharCount, isTimer, setIsTimer, isNumber, isPunctuation, setCompleted}) => {
        const totalCharCount = correctCharCount + incorrectCharCount;
        const elapsedMinutes = Math.floor(isTimer / 60);
        const wpm = Math.floor((correctCharCount / 5) / (elapsedMinutes + 1)) || 0;
        const accuracy = Math.floor((correctCharCount / (correctCharCount + incorrectCharCount)) * 100) || 0;
        const consistency = Math.floor((correctCharCount / (totalCharCount + correctCharCount)) * 100) || 0;

        return (
            <div className="font-Roboto total-result w-full bg-transparent flex flex-col gap-7">
                <div className="result flex gap-10">
                    <div className="stats w-[100px] flex flex-col">
                    <div className="group-wpm flex flex-col items-start">
                        <div className="top text-[#5e6063] text-3xl">wpm</div>

                        <div className="bottom text-[#e2b714] text-6xl">{wpm}</div>
                    </div>

                    <div className="group-acc flex flex-col items-start">
                        <div className="text-[#5e6063] text-3xl">acc</div>

                        <div className="text-[#e2b714] text-6xl">{accuracy}%</div>
                    </div>
                    </div>

                    <div className="chart flex-1 bg-transparent">
                        <Charts isTimer={isTimer} correctCharCount={correctCharCount} incorrectCharCount={incorrectCharCount}/>
                    </div>
                </div>

                <div className="stats morestats flex justify-between">
                    <div className="group testType">
                    <div className="top">test type</div>
                    <div className="bottom flex flex-col">
                        time {isTimer} <br /> english <br /> 
                        {isNumber && !isPunctuation && <span> numbers</span>}
                        {!isNumber && isPunctuation && <span> punctuation</span>}
                        {isNumber && isPunctuation && <span> numbers <br /> punctuation</span>}
                    </div>
                    </div>
                    <div className="group other">
                        <div className="top">other</div>
                        <div className="bottom">{correctCharCount + incorrectCharCount == 0 ? "invalid" : "valid"}</div>
                    </div>
                    <div className="group raw">
                        <div className="top">raw</div>
                        <div className="bottom size">{correctCharCount}</div>
                    </div>
                    <div className="group characters">
                        <div className="top">characters</div>
                        <div className="bottom size">{correctCharCount}/{incorrectCharCount}/0/0</div>
                    </div>
                    <div className="group consistency">
                        <div className="top">consistency</div>
                        <div className="bottom size">{consistency}%</div>
                    </div>
                    <div className="group time">
                        <div className="top">time</div>
                        <div className="bottom size">{isTimer}s</div>
                    </div>
                </div>

                <div className="links w-full flex justify-center gap-20 text-[#5e6063] text-xl">
                    <button><IoIosArrowForward className="dark:hover:text-[white] hover:text-black ease-in-out duration-300"/></button>
                    <button><FiRefreshCw onClick={() => {setCompleted(false); setIsTimer(0)}} className="dark:hover:text-[white] hover:text-black ease-in-out duration-300"/></button>
                    <button><FaExclamationTriangle className="dark:hover:text-[white] hover:text-black ease-in-out duration-300"/></button>
                    <button><CgMenuLeftAlt className="dark:hover:text-[white] hover:text-black ease-in-out duration-300"/></button>
                    <button><FaBackward className="dark:hover:text-[white] hover:text-black ease-in-out duration-300"/></button>
                    <button><FaImage className="dark:hover:text-[white] hover:text-black ease-in-out duration-300"/></button>
                </div>

                <div className="loginTip w-full text-center text-[#5e6063]">
                    <a href="/" className="login">Sign in</a> to save your result
                </div>
            </div>
        );
    };

    export default Result;
