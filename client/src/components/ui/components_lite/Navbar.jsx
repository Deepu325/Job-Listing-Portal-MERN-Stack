import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { Button } from '../button'
import { Avatar, AvatarImage, AvatarFallback } from '../avatar'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'


const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();



    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hide if scrolling down and moved more than 10px to avoid jitter, and not at the very top
            if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
                setVisible(false);
            } else {
                // Show if scrolling up
                setVisible(true);
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const logoutHandler = () => {
        dispatch(setUser(null));
        navigate("/");
        toast.success("Logged out successfully");
    }

    return (
        <div className={`fixed left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-500 ease-in-out ${visible ? "top-6 opacity-100" : "-top-24 opacity-0 pointer-events-none"}`}>
            <div className='bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-full h-16 px-6 flex items-center justify-between'>
                <div>
                    <h1 className="text-3xl font-bold">
                        Job <span className="text-[#16A34A]">Portal</span>
                    </h1>
                </div>
                <div className='flex item-center gap-10'>
                    <ul className="flex font-medium items-center gap-8 text-sm">
                        {["/", "/jobs"].map((path, index) => {
                            const labels = ["Home", "Jobs"];
                            // Hide "Jobs" link for Employers
                            if (path === "/jobs" && user?.role === "Employer") return null;

                            const isActive = location.pathname === path;
                            return (
                                <li key={path}>
                                    <Link
                                        to={path}
                                        className={`relative group transition-colors duration-300 font-semibold tracking-wide ${isActive ? "text-green-600" : "text-gray-700 hover:text-green-600"}`}
                                    >
                                        {labels[index]}
                                        <span className={`absolute left-0 -bottom-1 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full ${isActive ? "w-full" : ""}`}></span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                    <div className='flex items-center gap-2'>
                        {
                            !user ? (
                                <div className='flex items-center gap-3'>
                                    <Link to={"/login"}>
                                        {" "}
                                        <Button variant="outline" className="rounded-full border-gray-300 hover:border-green-500 hover:bg-green-50 hover:text-green-600 transition-all duration-300">Login</Button>
                                    </Link>
                                    <Link to={"/register"}>
                                        {" "}
                                        <Button className="rounded-full bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20">Register</Button>
                                    </Link>
                                </div>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className='cursor-pointer border border-gray-200'>
                                            <AvatarImage
                                                src={
                                                    (user?.profile?.profilePicture && `http://localhost:4000/${user?.profile?.profilePicture}`) ||
                                                    (user?.profile?.logo && `http://localhost:4000/${user?.profile?.logo}`) ||
                                                    "https://github.com/shadcn.png"
                                                }
                                                alt="@shadcn"
                                            />
                                            <AvatarFallback>{(user?.fullname || user?.name || "U")[0].toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className='flex items-center gap-4 space-y-2'>
                                            <Avatar className='cursor-pointer border border-gray-200'>
                                                <AvatarImage
                                                    src={
                                                        (user?.profile?.profilePicture && `http://localhost:4000/${user?.profile?.profilePicture}`) ||
                                                        (user?.profile?.logo && `http://localhost:4000/${user?.profile?.logo}`) ||
                                                        "https://github.com/shadcn.png"
                                                    }
                                                    alt="@shadcn"
                                                />
                                                <AvatarFallback>{(user?.fullname || user?.name || "U")[0].toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className='font-medium'>{user?.fullname || user?.name}</h3>
                                                <p className='text-sm text-muted-foreground'>{user?.email}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <div className='flex w-fit items-center gap-2 cursor-pinter'>
                                                <Button variant="link">
                                                    {" "}
                                                    <Link to={"/profile"}> Profile</Link>{" "}
                                                </Button>
                                            </div>
                                            <div className='flex w-fit items-center gap-2 cursor-pinter'>
                                                <Button variant="link" onClick={logoutHandler}>Logout</Button>
                                            </div>
                                        </div>

                                    </PopoverContent>
                                </Popover>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
