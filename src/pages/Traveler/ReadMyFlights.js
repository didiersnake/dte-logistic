import React, { useEffect, useState } from 'react'
import { readAllData, updateData} from '../../functions/crud';
import moment from 'moment';
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export const ReadMyFlights = ({user}) => {
    const [data, setData] = useState([])
    let [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState("")

    function closeModal() {
      setIsOpen(false);
    }

    function openModal() {
      setIsOpen(true);
    }



    async function allFlights() {
      const data = await readAllData("flight");
      setData(() => {
       let result = data.filter((item)=> item.email === user.email)
       return result.sort((a, b)=> {
        return moment(b.createdAt) - moment(a.createdAt)
       })
      });
    }


    useEffect(() => {
      allFlights();
    },[]);

      // const handleUpdateFlight = (id, data) => {
      //   console.log(newFirstName);
      //   updateData("users", id, );
      //   setNewFirstName("");
      // };


      const Modal = ({closeModal, isOpen, editData}) => {
        const [departure, setDeparture] = useState(editData.departure);
        const [destination, setDestination] = useState(editData.destination);
        const [departureDate, setDepartureDate] = useState(editData?.departureDate);
        const [arrival, setArrival] = useState(editData?.arrival);
        const [capacity, setCapacity] = useState(editData?.capacity);
        const [price, setPrice] = useState(editData?.price);

        const flightData = {
          departure,
          destination,
          departureDate,
          arrival,
          capacity,
          price,
        };

        const handleUpdateFlight = () => {
          // console.log(newFirstName);
          updateData("flight", editData.id, flightData);
          closeModal()
        };

        return (
          <>
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Update Flight
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className=' text-base '>{departure} / {destination}</div>
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
                                  <input
                                    name="date"
                                    value={departureDate}
                                    required
                                    onChange={(e) =>
                                      setDepartureDate(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                      setCapacity(e.target.value)
                                    }
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
                        </div>

                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={handleUpdateFlight}
                          >
                            Save
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </>
        );
      }
 
  return (
    <div className="mx-auto max-w-5xl min-h-screen">
      <div className="my-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
          My Flights
        </h2>
      </div>

      <ul className="divide-y divide-gray-100 pb-10">
        {data.map((person) => (
          <li key={person.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-8">
              <div className="flex items-center justify-between gap-3">
                {moment(person.departureDate).isAfter(moment.now()) ? (
                  <button>
                    <span
                      onClick={() => {
                        setEditData(person)
                        setIsOpen(true)}}
                      className="inline-flex items-center rounded-md bg-yellow-50 px-4 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"
                    >
                      Edit
                    </span>
                  </button>
                ) : (
                  <button disabled className="opacity-65">
                    <span
                      onClick={""}
                      className="inline-flex items-center rounded-md bg-yellow-50 px-4 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"
                    >
                      Edit
                    </span>
                  </button>
                )}

                <button>
                  <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                    Delete
                  </span>
                </button>
              </div>
              <div className='flex items-center'>
                <p className="text-sm leading-6 text-gray-900">
                  {moment(person?.createdAt).toJSON()}
                </p>
              </div>
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <span className="font-normal">Available Capacity</span>{" "}
                  {person.capacity}KG
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  Price per KG{" "}
                  <span className="font-bold text-sm">${person.price}</span>
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">
                {person?.departure} / {person?.destination}
              </p>
              {moment(person.departureDate).isAfter(moment.now()) ? (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">
                    {person?.departureDate} / {person?.arrival}
                  </p>
                </div>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  {/* <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div> */}
                  <p className="text-xs leading-5 text-gray-500">
                    {person?.departureDate} / {person?.arrival}
                  </p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      <Modal isOpen={isOpen} closeModal={closeModal} editData={editData} />
    </div>
  );
}
