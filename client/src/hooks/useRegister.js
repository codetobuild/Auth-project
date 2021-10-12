import { useState, useEffect } from "react";
import useError from "./useError";

const useRegister = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobileNumber] = useState("");

  return {
    username,
    setUsername,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmpassword,
    setConfirmPassword,
    address,
    setAddress,
    mobile,
    setMobileNumber,
  };
};

export default useRegister;
