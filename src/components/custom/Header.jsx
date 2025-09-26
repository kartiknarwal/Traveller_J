import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useNavigate } from "react-router-dom";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import { FcGoogle } from "react-icons/fc";



function Header() {

    const [openDialog, setOpenDialog] = useState(false);
  
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate =useNavigate()

  useEffect(()=>{
    console.log(user)
  },[])
   const login = useGoogleLogin({
    onSuccess: (tokenInfo) => fetchUserProfile(tokenInfo),
    onError: (error) => console.log("Login error:", error),
  });

   const fetchUserProfile = async (tokenInfo) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      setOpenDialog(false);
      window.location.reload()

      // Call GenerateTrip now that user is logged in
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      toast("Failed to login, please try again.");
    }
  };


  return(
//     <div className='p-3 shadow-sm flex justify-between items-center px-5'>
//       <img src='/logo.svg' alt=""   onClick={() => navigate("/")}
//  />
//       <div>
//         {user ? (
//           <div className="flex items-center gap-3">
//             <a href="/my-trips">
//             <Button variant="outline" className="rounded-full">My Trips</Button>
//             </a>

//             <a href="/create-trip">
//             <Button variant="outline" className="rounded-full">+ Create Trip</Button>
//             </a>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <img src={user?.picture} alt="" className='h-[35px] w-[35px] rounded-full' />
//               </PopoverTrigger>
//               <PopoverContent>
//                  <h2 
//                  className='cursor-pointer'
//                   onClick={()=>{
//                   googleLogout()
//                   localStorage.clear()
//                   navigate('/')
//                  }}>Logout</h2>
//               </PopoverContent>
//             </Popover>
//           </div>
//         ) : (
//           <Button onClick={()=>setOpenDialog(true)}>Sign In</Button>
//         )}
//       </div>
//             <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogDescription>
//               <img src="/logo.svg" alt="logo" />
//               <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
//               <p>Sign in to the app securely using Google authentication.</p>

//               <Button
//                 onClick={login}
//                 className="w-full mt-5 flex gap-4 items-center"
//               >
//                 <FcGoogle className="h-7 w-7" />
//                 Sign In with Google
//               </Button>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
    <div className='p-3 flex justify-between items-center px-5 bg-white shadow-md'>
  <img
    src='/logo.svg'
    alt="TravelAI Logo"
    onClick={() => navigate("/")}
    className="h-10 cursor-pointer hover:scale-105 transition-transform"
  />

  <div>
    {user ? (
      <div className="flex items-center gap-3">
        <a href="/my-trips">
          <Button className="rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all">My Trips</Button>
        </a>
        <a href="/create-trip">
          <Button className="rounded-full border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all">+ Create Trip</Button>
        </a>
        <Popover>
          <PopoverTrigger asChild>
            <img
              src={user?.picture}
              alt="Profile"
              className='h-[35px] w-[35px] rounded-full border-2 border-blue-400 hover:shadow-md transition-shadow'
            />
          </PopoverTrigger>
          <PopoverContent className="bg-white text-gray-800 border border-gray-300 shadow-md">
            <h2
              className='cursor-pointer hover:text-red-500'
              onClick={() => {
                googleLogout()
                localStorage.clear()
                navigate('/')
              }}
            >
              Logout
            </h2>
          </PopoverContent>
        </Popover>
      </div>
    ) : (
      <Button
        onClick={() => setOpenDialog(true)}
        className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
      >
        Sign In
      </Button>
    )}
  </div>

  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
    <DialogContent className="bg-white text-gray-800 border border-gray-300 shadow-md">
      <DialogHeader>
        <DialogDescription className="flex flex-col items-center">
          <img src="/logo.svg" alt="logo" />
          <h2 className="font-bold text-lg mt-7 text-blue-500">Sign In with Google</h2>
          <p className="text-gray-600 text-center">Sign in to the app securely using Google authentication.</p>

          <Button
            onClick={login}
            className="w-full mt-5 flex gap-4 items-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
          >
            <FcGoogle className="h-7 w-7" />
            Sign In with Google
          </Button>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</div>


  )
}

export default Header
