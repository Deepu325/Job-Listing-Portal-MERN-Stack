import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { Link } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { Button } from '../button'
import { Avatar, AvatarImage } from '../avatar'


const Navbar = () => {
    const { isAuth, logout } = useContext(AuthContext);
    const user = isAuth; //if user then popover otherwise login and register 
    return (
        <div className="bg-white">
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className="text-3xl font-bold">
                        Job <span className="text-[#16A34A]">Portal</span>
                    </h1>
                </div>
                <div className='flex item-center gap-10'>
                    <ul className="flex font medium items-center gap-7">
                        <li>Home</li>
                        <li>Browse</li>
                        <li>Job</li>
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to={"/login"}>
                                    {" "}
                                    <Button variant="outline">Login</Button>
                                </Link>
                                <Link to={"/register"}>
                                    {" "}
                                    <Button className="bg-green-700 hover:bg-blue-800">Register</Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className='flex items-center gap-4 space-y-2'>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h3 className='font-medium'>Arkasmit Sengupta</h3>
                                            <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, illum?</p>
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
                                            <Button variant="link" onClick={logout}>Logout</Button>
                                        </div>
                                    </div>

                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
