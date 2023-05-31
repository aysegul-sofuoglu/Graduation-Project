import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignUpValidation";
import axios from "axios";

function SignUp() {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    mail: "",
    user_password: "",
    role: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    if (
      errors.first_name === "" &&
      errors.last_name === "" &&
      errors.mail === "" &&
      errors.user_password === "" &&
      errors.role === ""
    ) {
      axios
        .post("http://localhost:8000/sign-up", values)
        .then((res) => {
          navigate("/login");
        })
        .catch((err) => console.log(err));
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100" >
      <div className="bg-white p-4 rounded w-50" >
        <h2>ÜYE OL</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="first_name">
              <strong>İSİM</strong>
            </label>
            <input
              type="name"
              placeholder="İsim giriniz"
              name="first_name"
              onChange={handleInput}
              className="form-control rounded-0"
            ></input>
            {errors.first_name && (
              <span className="text-danger">{errors.first_name}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="last_name">
              <strong>SOYAD</strong>
            </label>
            <input
              type="name"
              placeholder="Soyad giriniz"
              name="last_name"
              onChange={handleInput}
              className="form-control rounded-0"
            ></input>
            {errors.last_name && (
              <span className="text-danger">{errors.last_name}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="mail">
              <strong>Email</strong>
            </label>
            <input
              type="mail"
              placeholder="Email"
              name="mail"
              onChange={handleInput}
              className="form-control rounded-0"
            ></input>
            {errors.mail && <span className="text-danger">{errors.mail}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="user_password">
              <strong>Şifre</strong>
            </label>
            <input
              type="password"
              placeholder="Şifre"
              name="user_password"
              onChange={handleInput}
              className="form-control rounded-0"
            ></input>
            {errors.user_password && (
              <span className="text-danger">{errors.user_password}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="role">
              <strong>KULLANICI TİPİ</strong>
            </label>
            <select
              type="role"
              placeholder="Kullanıcı tipi belirtiniz"
              name="role"
              onChange={handleInput}
              className="form-control rounded-0"
            >
              <option value="">Seçiniz...</option>
              <option value="admin">Admin</option>
              <option value="customer">Müşteri</option>
              <option value="seller">Satıcı</option>
            </select>

            {errors.role && <span className="text-danger">{errors.role}</span>}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            ÜYE OL
          </button>
          <Link
            to="/login"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none mt-3"
          >
            GİRİŞ
          </Link>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
