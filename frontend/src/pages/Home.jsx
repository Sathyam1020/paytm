import React from 'react'
import {useNavigate} from "react-router-dom";

const Home = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        {
            token ? <div className='text-center py-4 px-6 bg-black text-white rounded-md shadow-sm cursor-pointer' onClick={() => navigate('/dashboard')}>
                Go to dashboard
            </div> : <div>
                <div className='text-center py-4 px-6 bg-black text-white rounded-md shadow-sm cursor-pointer mb-4' onClick={() => navigate('/signup')}>Sign up</div>
                <div className='text-center py-4 px-6 bg-black text-white rounded-md shadow-sm cursor-pointer mb-4' onClick={() => navigate('/signin')}>Sign in</div>
            </div>
        }
    </div>
  )
}

export default Home; 