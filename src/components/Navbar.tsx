import olx1 from '../assets/olx1.png'
import lens2 from '../assets/lens2.png'
import downArrow from '../assets/downArrow.png'
import lens from '../assets/lens.png'
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { logout } from '../firebase';


type searchProp={
  setSearch:any
}

const Navbar = (props:searchProp) => {


    //  const navigate =useNavigate()


    //  const Handleaddproduct = ()=>{
    //   navigate('/Addproduct')
    //  }

  return (
    <>
    <div className='flex p-4 bg-slate-100 shadow-md'>
      <img src={olx1} alt=""  className='w-19 h-10 outline-none'/>
      <div className='flex border-2 border-spacing-1 w-64 p-2 h-12 border-black ml-5'>
         <img src={lens2} alt=""  className='w-6 h-5 mt-1'/>
         <input type="text"  placeholder=' Enter Location' className='ml-3 outline-none'/>
         <img src={downArrow} alt=""  className='w-6 h-4 mt-2'/>
      </div>
      <div className='flex h-12 ml-4 border-2 border-black bg-white ml-5 bg-white'>
        <input onChange={(e)=>props?.setSearch(e.target.value)} type="text"  placeholder='Find Cars,Mobile phones and more.' className='pl-3 w-96 outline-none'/>
        <img src={lens} alt="" className='w-12'/>
      </div>
      <div className='flex h-12 p-3 ml-10 cursor-pointer'>
        <h1 className='font-semibold'>ENGLISH</h1>
        <img src={downArrow} alt="" className='w-6 h-5 m-1'/>
      </div>
      <div className="w-28 flex h-12 p-2 ml-10 cursor-pointer rounded-full border border-yellow-500">
      <button
      onClick={logout}
      className="flex items-center justify-center px-5 py-3 bg-red-500 text-white font-semibold rounded-full shadow-lg transform transition duration-300 ease-in-out hover:bg-red-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
    >
      <span>Logout</span>
    </button>  
       </div>

      <div  className='w-28 flex h-12 p-2 ml-10 cursor-pointer rounded-full border border-yellow-500'>
      <h1 className='flex items-center justify-center px-8 py-3 bg-red-500 text-white font-semibold rounded-full shadow-lg transform transition duration-300 ease-in-out hover:bg-red-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'>SELL</h1>
      </div>
    </div>
    </>
  )
}

export default Navbar
