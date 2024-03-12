"use client";

import { setCookie } from "@/helpers/login.helper";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleLogin = () => {
    const { email, password } = formData;
    if (!email && !password) return;
    axios
      .post("http://localhost:8080/user/login", formData)
      .then((res) => {
        setCookie("magic-mind-auth-token", res.data.token, 365);
        router.push("/todo");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="loginContainer">
      <div className="loginDiv">
        <input
          type="text"
          placeholder="Enter email"
          className="emailInput"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Enter password"
          className="passwordInput"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button className="loginBtn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
