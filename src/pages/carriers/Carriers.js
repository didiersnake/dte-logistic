import React, { useEffect, useState } from 'react'
import { TripPreviews } from '../home/TripPreviews'
import { Autocomplet } from '../../components/Autocomplet';
import moment from 'moment';
import { readAllData } from '../../functions/crud';

export const Carriers = ({user}) => {
  const [allData, setAllData] = useState([])
  const [isFiltering, setIsFiltering] = useState(false)
  const [filteredData, setFilteredData] = useState([]);


  const handleFilter = (departure, destination, arrival) => {
    setIsFiltering(true)
    let filterdData = allData.filter((item) => {
        let s_go = item?.departure === departure; // const [allData, setAllData] = useState([])

        let a_arr = item?.destination === destination;
        let isGoing = moment(item?.arrival).isAfter(moment(arrival));
      return s_go && a_arr && isGoing})
    setFilteredData(filterdData)
      
  };

  useEffect(() => {
    if(!isFiltering){
        async function allFlights() {
          const data = await readAllData("flight");
          setAllData(data);
        }
        allFlights();
    }

  }, []);

  const FilterForm = ({ callback }) => {
    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [arrival, setArrival] = useState("");

    const getDeparture = (data) => {
      setDeparture(data);
    };

    const getDestination = (data) => {
      setDestination(data);
    };

    const clearTextInput = () => {
      setDeparture("");
      setDepartureDate("");
      setArrival("");
      setDestination("");
    };

    return (
      <div>
        <div className="mx-24 mt-16">
          <div className="text-center text-2xl font-bold text-gray-900">
            <h2 className="text-2xl font-bold text-gray-900">Filter</h2>
          </div>
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

          {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
            </div> */}

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
          <div className="mt-6 flex items-center gap-x-6">
            <button
              onClick={()=>callback(departure, destination, arrival)}
              className="w-2/3 py-2 rounded-md bg-indigo-600 text-xl font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="grid grid-cols-3">
      <div>
        <FilterForm callback={handleFilter}/>
      </div>
      <div className="col-span-2">
        <TripPreviews allData={isFiltering? filteredData : allData} user={user}/>
      </div>
    </div>
  );
}
