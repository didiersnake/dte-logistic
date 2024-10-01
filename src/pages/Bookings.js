import moment from "moment";
import React, { useEffect, useState } from "react";
import { readAllData } from "../functions/crud";

export const Bookings = ({ user }) => {
  const [data, setData] = useState([]);

  async function allFlights() {
    const data = await readAllData("bookings");
    setData(() => {
      let result = data.filter((item) => item.traveler_email === user.email);
      return result.sort((a, b) => {
        return moment(b.createdAt) - moment(a.createdAt);
      });
    });
  }

  useEffect(() => {
    allFlights();
  }, []);

  return (
    <div className="mx-auto max-w-5xl min-h-screen">
      <div className="my-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
          My Bookings
        </h2>
      </div>

      <ul className="divide-y divide-gray-100 pb-10">
        {data.map((person) => (
          <li key={person.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-8">
              <div className="flex items-center">
                <p className="text-sm leading-6 text-gray-900">
                  {moment(person?.createdAt).toJSON()}
                </p>
              </div>
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <span className="font-normal">Traveler -</span>{" "}
                  {person.traveler_name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  Price per KG -
                  <span className="font-bold text-sm">{person.price}</span>
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
                  <p className="text-xs leading-5 text-gray-500">
                    {person?.departureDate} / {person?.arrival}
                  </p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
