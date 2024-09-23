import React, { useEffect, useState } from 'react'
import F1 from "../../images/f2.webp"
import { readAllData } from '../../functions/crud'
import {
  geocodeByAddress,
} from "react-places-autocomplete";
import ReactCountryFlag from 'react-country-flag';
import moment from 'moment';
import Modal from '../../components/Modal';
import emailjs from "@emailjs/browser"
import { useNavigate } from 'react-router-dom';

export const TripPreviews = ({allData, user}) => {

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const navigate = useNavigate()

  const handleContactCarrier = async (from, recipient, recipient_name, data) => {

    if(!user){
      navigate("/login")
      return
    }
    
    const serviceId = "service_sigld6q";
    const templateId = "template_a4yd3od";

    try {
      await emailjs.send(serviceId, templateId, {
        "name": from,
        "recipient": recipient,
        "recipient_name": recipient_name,
        "data_name": data.name,
        "data_email": data.email,
        "data_phone": data.phone,
        "data_departure": data.departure,
        "data_destination" : data.destination,
        "data_departureDate": data.departureDate,
        "data_arrival": data.arrival,
        "data_price" : "$" + data.price + "/KG"
      });
      // alert("email successfully sent check inbox");
      openModal()
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => emailjs.init("LvnnvzP61DZzX_aNi"), [])

  const getCountryFlag = async (address, callback) => {
    const addressComponent = await geocodeByAddress(address);
    const countryCode = addressComponent[0].address_components[3]?.short_name;
    callback(countryCode)
    return countryCode;
  };

  const Flag = ({address})=> { 
    const [code, setCode] = useState("")  
    const getCode = (data)=> {
      setCode(data)
    }

     getCountryFlag(address, getCode)
    return (
      <ReactCountryFlag
        style={{
          fontSize: "1em",
          backgroundColor: "white"
          
        }}
        countryCode={code}
      />
    );
  } 


  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-32">
        <div className="mx-auto max-w-2xl py-10 sm:py-24 lg:max-w-none lg:py-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Carriers Flights
          </h2>
          <p className="mt-2 text-center text-lg leading-8 text-gray-600">
            Welcome to our flight search page! You're just a few clicks away
            from finding your perfect Carrier. On this page, you can search and
            book your carriers with ease.
          </p>
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {allData?.map((item) => (
              <div className="group relative" key={item.id}>
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-black sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-85 sm:h-64">
                  <img
                    src={F1}
                    alt="plane"
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute top-0 left-0 p-2 font-extrabold text-white rounded-br text-2xl bg-black opacity-60">
                    <p className="text-lg font-light">from</p>
                    <p>{item?.departure}</p>
                    <Flag address={item?.departure} />
                    <br />
                    <br />
                    <p className="text-lg font-light">To</p>
                    <p>{item?.destination}</p>
                    <Flag address={item?.destination} />
                    <div className="flex items-center justify-between">
                      <h4 className="mt-6 text-gray-200">
                        <div>
                          <span className="absolute inset-0"></span>
                          {item?.departureDate}
                        </div>
                      </h4>
                      <div>
                        <span className="absolute inset-0"></span>
                        <p className="text-2xl font-semibold text-white">
                          ${item?.price} /kg
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-white">
                      {item?.capacity} Kg
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-x-6">
                  <button
                    onClick={() => {
                      // alert(item.id)
                      // console.log(item?.email);
                      handleContactCarrier("DTE Logistics", user?.email, user?.firstName, item)
                    }}
                    className="w-full py-2 rounded-md bg-indigo-600 text-xl font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Contact Carrier
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Modal closeModal={closeModal} isOpen={isOpen} title={"Email sent"} message={"The necessary details to book the carrier has been transfered to your mail"} />
        </div>
      </div>
    </div>
  );
}
