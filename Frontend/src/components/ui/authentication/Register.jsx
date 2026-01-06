import React, { useState } from 'react'
import Navbar from '../components_lite/Navbar'
import { Label } from '../label'
import { Input } from '../input'
import { RadioGroup, RadioGroupItem } from '../radio-group'
import { Link } from 'react-router-dom'

const Register = () => {

  const[input , setInput] = useState({
  fullname:"",
  email: "",
  password:"",
  role: " ",
  phoneNumber: "",
});

const changeEventHandler = (e) =>{
  setInput({...input,[e.target.name]: e.target.value});
}

const submitHandler =  async (e)=>{
  e.preventDefault();
  console.log(input);
}



  return (
    <div>
      <Navbar></Navbar>
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-grey-500 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5 text-center text-green-900'>Register</h1>
          <div className=' my-2'>
            <Label>Fullname</Label>
            <Input type='text' value={input.fullname} name='fullname' onChange={changeEventHandler} placeholder='Sam Walker'></Input>
          </div>
          <div className=' my-2'>
            <Label>Email</Label>
            <Input type='email' value={input.email} name='email' onChange={changeEventHandler} placeholder='samWalker@gmail.com'></Input>
          </div>
          <div className=' my-2'>
            <Label>Phonne Number</Label>
            <Input type='tel' value={input.phoneNumber} name='phoneNumber' onChange={changeEventHandler} placeholder='+1234567890'></Input>
          </div>
          <div className=' my-2'>
            <Label>Password</Label>
            <Input type='password'value={input.password} name='password' onChange={changeEventHandler} placeholder='********'></Input>
          </div>
          <div className='flex item-center justify-between'>
            
            <RadioGroup className='flex items-center gap-4 my-5'>
              <div className="flex items-center space-x-2">
                <Input type='radio' name='role' value='Student'
                  checked= {input.role === 'Student'}
                  onChange ={changeEventHandler}
                  className='cursor-pinter' />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                 <Input type='radio' name='role' value='Recruiter'
                  checked= {input.role === 'Recruiter'}
                  onChange ={changeEventHandler}
                 className='cursor-pinter' />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <button type="submit" className='block w-full py-3 my-3 text-white bg-lime-700 hover:bg-primary/90 rounded-md'>
            Register
          </button>
          {/* already account then login */}
          <p className='text-green-700 text-md my-2'>
            Already have an acount? 
            <Link to="/login" className='text-blue-950 font-bold'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register
