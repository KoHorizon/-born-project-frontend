import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { login } from "../api/auth";
import { Credential } from '../types/credential';
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
  
  let navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Credential>();
  const onSubmit: SubmitHandler<Credential> =async loginData => {
    try {
      const {data} = await login(loginData);
      localStorage.setItem('token', data.access_token);
      window.location.replace("http://localhost:3001/home");
      // navigate('/home')
    } catch (error) {
      navigate('/login')
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/home')
  },[])

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="test" {...register("name",{ required: true })} />
      {errors.name && <span>This field is required</span>}
      
      {/* include validation with required or other standard HTML validation rules */}
      <input type="number" {...register("pincode", { required: true , min: 0, max: 10000 } )} />
      {/* errors will return when field validation fails  */}
      {errors.pincode && <span>This field is required</span>}
      
      <input type="submit" />
    </form>
  );
}