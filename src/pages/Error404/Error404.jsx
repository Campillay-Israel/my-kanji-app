import React from 'react'
import img404 from "../../assets/images/404.svg";
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
      <img src={img404} alt="No Kotobas" className='w-80' />
      
      <p className="text-sm text-center mt-4 ">

              <Link to="/dashboard" className="text-sm text-center mt-4 btn-primary">
                Pagina Principal
              </Link>
            </p>
    </div>
  )
}

export default Error404
