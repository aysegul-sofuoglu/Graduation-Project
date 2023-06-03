import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import  Validation  from './loginValidation'
import axios from 'axios';


function Login() {

  const navigate = useNavigate();

  const [values, setValues]=useState({
    mail:"",
    user_password:""
  });

  const [errors, setErrors]=useState({})

  const handleSubmit =(event)=>{
    event.preventDefault();
    setErrors(Validation(values));

    if(errors.mail === "" && errors.user_password ===""){
      
      
      console.log(values);
      axios.post('http://localhost:8000/login', values)
      
      .then(res => {
      

        if(res.data.token){
          localStorage.setItem('token', res.data.token);
         
          navigate("/");
          window.location.reload();
          

        }else{
          alert("giriş yapılamadı")
          
        }
      })
      .catch(err => {
        console.log(err)
        alert("hata oluştu" + err.message)
      })
    }
  }

  const handleInput=(event)=>{
    const { name, value } = event.target;
    setValues(prev => ({...prev, [name]: value,}))
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
            <label htmlFor='user_password'><strong>Şifre</strong></label>
            <input type='password' placeholder='Şifre' name='user_password' onChange={handleInput} className='form-control rounded-0'></input>
            {errors.user_password && <span className='text-danger'>{errors.user_password}</span>}
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>GİRİŞ</button>
          <Link to="/signup"className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>ÜYE OL</Link>
        </form>
      </div>
    </div>
  )
}

export default Login




