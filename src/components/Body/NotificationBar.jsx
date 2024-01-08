import { GrAnnounce } from "react-icons/gr";
import { IoChatbox } from "react-icons/io5";

const NotificationBar = ({ isNotification }) => {
  return (
   <div className={`${isNotification ? 'right-0' : '-right-[380px]'} absolute top-0 w-[380px] min-h-[100vh] max-h-[100vh] dark:bg-[#323437] bg-[#D1D5DB] rounded-l-[10px] rounded-b-[10px] ease-in-out duration-300`}>
    <h1 className="flex mt-[30px] ml-[30px] items-center text-2xl font-Roboto gap-[10px] text-[#646669]" ><GrAnnounce /> Annuncements</h1>
    <p className="font-Roboto text-[#B5B4AC] text-[12px] text-center py-[50px] mx-[30px] relative after:absolute after:-bottom-[5px] after:left-0 after:w-[100%] after:h-[3px] dark:after:bg-[#646669] after:rounded-2xl after:bg-[#939393]" >Nothing to show</p>
    <h1 className="flex mt-[30px] ml-[30px] items-center text-2xl font-Roboto gap-[10px] text-[#646669]" ><IoChatbox /> Notifications</h1>
    <p className="font-Roboto text-[#B5B4AC] text-[12px] text-center py-[50px] mx-[30px]" >Nothing to show</p>
   </div>
  )
}

export default NotificationBar