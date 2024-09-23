import React, { useState } from "react";
import { signUp } from "../functions/auth";
import { Autocomplet } from "../components/Autocomplet";
import { globalConstants } from "../constants/global";
import { useNavigate } from "react-router-dom";
import DTE from "../images/dts.jpeg"


export default function CreateUSer() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate()

  const userData = {
    firstName,
    lastName,
    email,dob,
    country,
    city,
    phone, 
    role: role === "" ? setRole("user") : role,
    createdAt: globalConstants.createdAt
  };

  const handleCreateUser = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    } else if (!email) {
      alert("Email is required");
      return;
    } else if (!password) {
      alert("Password is required");
      return;
    } else if (!dob) {
      alert("Date of birth is required");
      return;
    } else if (!phone) {
      alert("Phone is required");
      return;
    } else if (!country) {
      alert("Country is required");
      return;
    } else if (!city) {
      alert("City is required");
      return;
    } else signUp(email, password, userData);
      navigate("/")
  };

   const getCountry = (data) => {
     setCountry(data);
   };
   const getCity = (data) => {
     setCity(data);
   };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <img
          alt="Your Company"
          src={DTE}
          className="mx-auto h-20"
        />
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-4 max-w-5xl mx-auto mb-16">
        <div className="mt-2">
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            placeholder="First Name"
            required
            name="first name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div className="mt-2">
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            placeholder="Last Name"
            required
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div className="mt-2">
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="email"
            placeholder="Email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mt-2">
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            placeholder="Phone"
            required
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
        <div className="mt-2">
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="date"
            placeholder="Birth date"
            required
            onChange={(e) => {
              setDob(e.target.value);
            }}
          />
        </div>
        <div className="mt-2">
          <Autocomplet sendData={getCountry} placeholder="Country" />
        </div>
        <div className="mt-2">
          <Autocomplet sendData={getCity} placeholder="City" />
        </div>
        <div className="mt-2">
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="password"
            required
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="mt-2">
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="password"
            required
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleCreateUser}
        >
          Register
        </button>
      </div>
    </>
  );
}
