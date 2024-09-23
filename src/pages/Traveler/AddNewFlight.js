
import React, { useState } from 'react'
import { Autocomplet } from '../../components/Autocomplet';
import { createData } from '../../functions/crud';
import F2 from "../../images/f2.webp"
import Modal from '../../components/Modal';
import { globalConstants } from '../../constants/global';

const AddNewFlight = ({user}) => {
    const [departure, setDeparture] = useState("")
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [arrival, setArrival] =useState("");
    const [capacity, setCapacity] = useState("");
    const [price, setPrice] = useState("");

    const [isOpen, setOpen] = useState(false);
    const closeModal = ()=> {
      setOpen(false)
    }
    const flightData = {
        departure,
        destination,
        departureDate,
        createdAt: globalConstants.createdAt,
        arrival,
        capacity,
        price,
        name: user?.firstName + " "  + user?.lastName,
        phone: user?.phone,
        email: user?.email,
    }
    const getDeparture = (data) => {
        setDeparture(data)
    }

    const getDestination = (data) => {
      setDestination(data);
    };

    const clearTextInput = ()=>{
      setCapacity("")
      setDeparture("")
      setDepartureDate("")
      setPrice("")
      setArrival("")
      setDestination("")
    }

    const handleCreateTrip = () => {
      if (!departure) {
        alert("No departure location");
        return;
      } else if (!destination) {
        alert("No destination Location");
        return;
      } else {createData("flight", flightData)}
      setOpen(true)
      clearTextInput()
    };

  return (
    <div className="mx-auto bg-white px-6 py-20 sm:py-32 lg:px-40 grid grid-cols-2">
      <div >
        <div className="space-y-12">
          <div className="mx-auto max-w-2xl grid-cols-2">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Register a new Trip
            </h2>
            <p className='pt-2'>The informations will be loaded to the carriers board for users in need </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="departure"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Departure
                </label>
                <div className="mt-2">
                  <div className=" p-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <Autocomplet
                      sendData={getDeparture}
                      placeholder={"Yaounde, cameroon"}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="destination"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Destination
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md p-2">
                    <Autocomplet
                      sendData={getDestination}
                      placeholder={"Dortmund, Gemany"}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Depature Date
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      01/11/2023/
                    </span>
                    <input
                      name="date"
                      value={departureDate}
                      required
                      onChange={(e) => setDepartureDate(e.target.value)}
                      type="date"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="aDate"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Arrival Date
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      01/11/2023/
                    </span>
                    <input
                      type="date"
                      value={arrival}
                      required
                      onChange={(e) => setArrival(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="Capacity"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Capacity
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      name="capacity"
                      value={capacity}
                      required
                      onChange={(e) => setCapacity(e.target.value)}
                      type="text"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                    <span className="flex select-none items-center pr-3 text-gray-500 sm:text-sm">
                      KG
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      name="price"
                      value={price}
                      required
                      onChange={(e) => setPrice(e.target.value)}
                      type="text"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                    <span className="flex select-none items-center pr-3 text-gray-500 sm:text-sm">
                      $
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-x-6">
              <button
                onClick={handleCreateTrip}
                className="w-2/3 py-2 rounded-md bg-indigo-600 text-xl font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div><img src={F2} className='rounded-xl' alt='flight' /></div>
            <Modal isOpen={isOpen} closeModal={closeModal} title={"Success"}
       message={"Your flight was submitted successfully"}/>
    </div>
  );
}

export default AddNewFlight