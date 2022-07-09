import React from 'react';
import './Home.css';
import OutCome from './OutCome/OutCome';
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';

const Home = () => {
    const navigate = useNavigate();
    const handleAdd = () =>{
        navigate('/details')
    };
   
    return (
       <div>
         <div className='d-flex justify-content-center align-items-center mt-3'>
            <h2 className='me-4'>Tax Dashboard</h2>
            <button onClick={()=>{handleAdd()}} class="custom-btn btn-11">Add Data<div class="dot"></div></button>
            </div>
            
        <OutCome></OutCome>
       </div>
    );
};

export default Home;