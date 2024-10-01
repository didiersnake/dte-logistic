
import { Header } from "../../components/Header";
import { Contact } from "./Contact";
import { About } from "./About";
import { Testimonials } from "./Testimonials";
import { TripPreviews } from "./TripPreviews";
import { FloatingButton } from "../../components/FloatingButton";
import { globalConstants } from "../../constants/global";
import { useEffect, useState } from "react";
import { readAllData } from "../../functions/crud";

export default function Home({ isLoggedOut, user }) {
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function allFlights() {
      const data = await readAllData("flight");
      setAllData(data);
      setData(data.slice(2));
    }
    allFlights();
  }, []);

  return (
    <div className="m-auto items-start justify-center">
      <Header isLoggedOut={isLoggedOut} />
      <TripPreviews allData={data} user={user} />
      <Testimonials />
      <About />
      <Contact />
    </div>
  );
}
