import axios from "axios";
import { useState, useEffect } from "react";

const useLogin = (history) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return { email, setEmail, password, setPassword };
};

export default useLogin;
