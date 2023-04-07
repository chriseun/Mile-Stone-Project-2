import React, { useState } from "react";
//replacement for fetch API, easier to handle
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

