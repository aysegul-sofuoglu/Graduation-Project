import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import  Validation  from './loginValidation'

function Login() {

  const [values, setValues]=useState({
    mail:'',
    password:''
  });

  const [errors, setErrors]=useState({})

  const handleSubmit =(event)=>{
    event.preventDefault();
    setErrors(Validation(values));
  }

  const handleInput=(event)=>{
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }


  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>GİRİŞ YAP</h2>
        <form action='' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='mail'><strong>Email</strong></label>
            <input type='mail' placeholder='Email' name='mail' onChange={handleInput} className='form-control rounded-0'></input>
            {errors.mail && <span className='text-danger'>{errors.mail}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='password'><strong>Şifre</strong></label>
            <input type='password' placeholder='Şifre' name='password' onChange={handleInput} className='form-control rounded-0'></input>
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>GİRİŞ</button>
          <Link to="/signup"className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>ÜYE OL</Link>
        </form>
      </div>
    </div>
  )
}

export default Login
