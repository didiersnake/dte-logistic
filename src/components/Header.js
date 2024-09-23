
import HeaderPicture from "../images/header.webp"
import H1 from "../images/header2.webp"
import H2 from "../images/header3.webp";
import H3 from "../images/header4.webp";
import H4 from "../images/header5.webp";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Text = ({isLoggedOut})=> {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        Reliable Package Transport Across the Globe
      </h1>
      <p className="mt-6 text-xl leading-8 font-semibold text-white">
        Get your packages delivered quickly and efficiently, no matter where you
        are in the world.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a
          href={!isLoggedOut ? "/carriers" : "/login"}
          className="rounded-md bg-indigo-600 px-4 py-2.5 text-2xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Search Carriers
        </a>
      </div>
    </div>
  );
}

const Img = ({pic})=> {
  return (
    <div
      style={{
        backgroundImage: `url(${pic})`,
        backdropFilter: "blur(5px)",
        backgroundColor: 'rgba(0, 0, 0, 0)',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "650px",
        width: "",
      }}
    ></div>
  );
}

const CarouselComponent = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },

      items: 5,
    },

    desktop: {
      breakpoint: { max: 3000, min: 1024 },

      items: 3,
    },

    tablet: {
      breakpoint: { max: 1024, min: 464 },

      items: 1,
    },

    mobile: {
      breakpoint: { max: 464, min: 0 },

      items: 1,
    },
  };

  return (
    <Carousel
      swipeable={true}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      customTransition="transform 300ms ease-in-out"
      transitionDuration={300}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
    >
      <Img pic={H1} />
      <Img pic={HeaderPicture}/>
      <Img pic={H2} />
      <Img pic={H4} />
      <Img pic={H3} />
    
    </Carousel>
  );
};

export const Header = ({isLoggedOut}) => {

  return (
    <div>
      <CarouselComponent />
       <Text isLoggedOut={isLoggedOut} />
    </div>
  );
};
