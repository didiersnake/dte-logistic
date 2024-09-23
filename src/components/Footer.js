
import React, { useState } from 'react'
import { BsTwitter } from 'react-icons/bs';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { createData } from '../functions/crud';
import Modal from './Modal';
import { globalConstants } from '../constants/global';
import { useNavigate } from 'react-router-dom';

export const Footer = ({isLoggedOut, user}) => {
  const [text, setText] = useState("")
  let [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const data = {
    message: text,
    user: user?.uid,
    name: user?.firstName + " " + user?.lastName,
    createdAt: globalConstants.createdAt
  };
  const handleSubmitTestimony = () => {
    if (text === "") {
    } else if (data.user) {
      createData("testimony", data);
      openModal();
      setText("");
    } else {
      // alert("you are not logged in");
      navigate("/login")
    }
    
  }
  return (
    <>
      <footer className="bg-gray-800 h-1/4 p-4 text-white">
        <div className="container mx-auto p-4 pt-6 md:p-6">
          <div className="flex flex-wrap justify-center mb-4">
            <div className="w-full md:w-1/2 xl:w-1/4 p-6">
              <img src="logo.png" alt="logo" className="w-48 mb-4" />
              <p className="text-white text-sm mb-4">
                Get your packages delivered quickly and efficiently, no matter
                where you are in the world.
              </p>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/4 p-6">
              <ul className="list-none mb-4">
                <li className="mb-2">
                  <a href="/" className="text-white hover:text-gray-900">
                    Home
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href={isLoggedOut ? "/login" : "/carriers"}
                    className="ttext-white hover:text-gray-900"
                  >
                    Carriers
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href={isLoggedOut ? "/login" : "/orders"}
                    className="text-white hover:text-gray-900"
                  >
                    Bookings
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#about" className="text-white hover:text-gray-900">
                    About Us
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#contact" className="text-white hover:text-gray-900">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/4 p-6">
              <ul className="list-none mb-4">
                <li className="mb-4">
                  <a href="/" className="text-white hover:text-gray-900">
                    <FaFacebookF size={20} />
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/" className="text-white hover:text-gray-900">
                    <FaInstagram size={20} />
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/" className="text-white hover:text-gray-900">
                    <BsTwitter size={20} />
                  </a>
                </li>
              </ul>
            </div>

            <div className="w-full md:w-1/2 xl:w-1/4 ">
              <div className="sm:col-span-2">
                <label
                  htmlFor="feedback"
                  className="block text-sm font-semibold leading-6 text-white"
                >
                  Feedback
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="feedback"
                    name="feedback"
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                    value={text}
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleSubmitTestimony}
                  className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <p className="text-white text-sm">
              &copy; 2024 DTE Logistics. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      <Modal isOpen={isOpen} closeModal={closeModal} title={"Success"}
       message={"Feedback message submitted successfully"}/>
    </>
  );
}
