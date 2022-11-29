import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import Header from '../../components/Header';

const GetProducts = () => {
const navigate = useNavigate();
navigate("/getProducts")
  return (
    <div>
        <p>en construcción</p>
    </div>
  )
}
export default GetProducts