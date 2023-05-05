import React from 'react'
import './Payment.css'
import SearchFilter from '../Header/SearchFilter'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const Payment = () => {
    const initialValues = {
        card_number: "",
        email: "",
        password: "",
      };
      const validationSchema = Yup.object({
        name: Yup.string().required("Required Field!"),
        email: Yup.string().email().required("Required Field"),
        password: Yup.string().required("Required Field!"),
      });
  return (
    <div className='Payment'>
        <SearchFilter />
        <div className='container'>
            <div className='credit_card'>
                Card
            </div>
            <div className='information_form'>
                information
            </div>
        </div>
    </div>
  )
}

export default Payment