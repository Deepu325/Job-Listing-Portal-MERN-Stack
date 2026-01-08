import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Button } from '../button';
import { Avatar, AvatarImage } from '../avatar';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/authSlice';
import { LogOut, User2 } from 'lucide-react';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <div>
                    <Link to="/">
                        <h1 className="text-2xl font-bold">
                            Job <span className="text-[#16A34A]">Portal</span>
                        </h1>
                    </Link>
                </div>
                <div className='flex items-center gap-10'>
                    <ul className="hidden md:flex font-medium items-center gap-7 text-gray-600">
                        <li className="hover:text-green-600 cursor-pointer transition-colors">Home</li>
                        <li className="hover:text-green-600 cursor-pointer transition-colors">Browse</li>
                        <li className="hover:text-green-600 cursor-pointer transition-colors">Jobs</li>
                    </ul>
                    {!user ? (
                        <div className='flex items-center gap-3'>
                            <Link to="/login">
                                <Button variant="outline" className="border-gray-300 hover:bg-gray-50">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button className="bg-green-600 hover:bg-green-700 text-white">Register</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer border-2 border-green-100 hover:border-green-400 transition-all'>
                                    <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt={user?.name} />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-4 shadow-lg rounded-xl border-gray-100">
                                <div className='flex items-center gap-4 mb-4 border-b pb-4'>
                                    <Avatar className='h-12 w-12'>
                                        <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt={user?.name} />
                                    </Avatar>
                                    <div className='overflow-hidden'>
                                        <h3 className='font-semibold text-gray-900 truncate'>{user?.name}</h3>
                                        <p className='text-xs text-gray-500 truncate'>{user?.role === 'Employer' ? 'Company Administrator' : 'Job Seeker'}</p>
                                    </div>
                                </div>
                                <div className='space-y-1'>
                                    <div className='flex w-full items-center gap-2 rounded-md hover:bg-gray-50 transition-colors'>
                                        <Button variant="link" className="text-gray-700 font-medium px-2 py-1 h-auto flex gap-2">
                                            <User2 className="w-4 h-4" />
                                            View Profile
                                        </Button>
                                    </div>
                                    <div className='flex w-full items-center gap-2 rounded-md hover:bg-red-50 transition-colors'>
                                        <Button
                                            onClick={handleLogout}
                                            variant="link"
                                            className="text-red-500 font-medium px-2 py-1 h-auto flex gap-2 hover:no-underline"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
