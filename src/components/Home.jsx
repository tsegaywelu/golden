import React, { useEffect, useState, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Homeslider.css";
import { LanguageContext } from "../components/contextprovider/Language";

import API from "./Utility/API";

// Define NextArrow and PrevArrow components outside of the Home component
const NextArrow = ({ onClick }) => {
  return (
    <div className="slick-arrow slick-next" onClick={onClick}>
      Next
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="slick-arrow slick-prev" onClick={onClick}>
      Prev
    </div>
  );
};

const Home = () => {
  const { contextData } = useContext(LanguageContext);
  const [news, setNews] = useState([]);
  const [events,setevents]=useState([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [sliderAutoplay, setSliderAutoplay] = useState(true);
 //to load videos and images from post database 
  useEffect(() => {
    API.getnews()
      .then((res) => {
        console.log(res);
        setNews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //to load events and advertisments from event database
  useEffect(() => {
    API.getevents()
      .then((res) => {
        console.log(res);
        setevents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: sliderAutoplay, // Autoplay controlled by sliderAutoplay state
    autoplaySpeed: 1000,
    pauseOnHover: false, // Disable hover pause behavior
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (oldIndex, newIndex) => {
      // Check if video is playing and pause the slider
      if (isVideoPlaying) {
        setSliderAutoplay(false); // Pause autoplay if video is playing
      }
    },
    afterChange: () => {
      // Resume slider after video is finished playing
      if (!isVideoPlaying) {
        setSliderAutoplay(true); // Resume autoplay if video is not playing
      }
    },
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    setSliderAutoplay(false); // Pause autoplay when video starts playing
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
    setSliderAutoplay(true); // Resume autoplay when video pauses
  };

  return (
    <div>
      <div className="overflow-hidden flex gap-3">
        <Slider {...settings} className="overflow-hidden w-2/3">
          {news.map((n, index) => (
            <div key={index}>
              {n?.imageUrl.includes("mp4") || n?.imageUrl.includes("mkv") ? (
                <video
                  className="w-full"
                  style={{
                    height: "auto",
                    maxWidth: "100%",
                    maxHeight: "400px",
                  }}
                  src={`http://localhost:3000/public/${n?.imageUrl}`}
                  controls
                  onMouseEnter={() => setSliderAutoplay(false)} // Pause autoplay on mouse enter
                  onMouseLeave={() => setSliderAutoplay(true)} // Resume autoplay on mouse leave
                  onClick={handleVideoPlay}
                  onPause={handleVideoPause} // Handle pause event
                ></video>
              ) : (
                <img
                  className="w-full"
                  style={{
                    height: "auto",
                    maxWidth: "100%",
                    maxHeight: "400px",
                  }}
                  src={`http://localhost:3000/public/${n?.imageUrl}`}
                  alt={n.Title}
                  onMouseEnter={() => setSliderAutoplay(false)} // Pause autoplay on mouse enter
                  onMouseLeave={() => setSliderAutoplay(true)} // Resume autoplay on mouse leave
                />
              )}
              {/* <h3 className="text-2xl font-bold text-gray-950  float-center mb-2 ml-5">{n?.Title}</h3> 
              <p className="text-xl">{n?.description}    <i className="float-end text-sm">7 days ago</i></p> */}
            {/*   <textarea
                name="comment"
                id="comments"
                cols="20"
                rows="2"
                placeholder={
                  contextData.Language == "English"
                    ? "  write your comment here"
                    : "ረኢቶኦም አብዚ ይጽሓፍልና"
                }
                className="bg-gray-50 w-full text-black font-bold rounded-lg p-2 border-blue-200 border-x-2"
              ></textarea>
              <button
                className="w-full flex justify-center py-2 px-4 border
             border-transparent text-sm font-medium rounded-md text-white
              bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 
              focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150
               ease-in-out"
              >
                post
              </button> */}
            </div>
          ))}
        </Slider>

        <div className="  w-1/3  h-full p-2">{/* for advertisment  */}
          <h3 className="text-lg font-bold flex justify-center align-middle relative ">
            {contextData.Language == "English"
              ? "  new notifications"
              : "ሓዱሽ ሓበሬታ"}
          </h3>
          <div>
           
         {/* display here the title from event database  */}
         <a href="">
              <p className=" ">
              {events.map((k)=>(
         <ul><li className="flex justify-center align-middle text-blue-700 hover:text-green-600 hover:font-bold">
          {k?.Title} click here to show more !
          
          </li></ul>

         ))}
              </p>
         </a>
         
          </div>
        </div>
      </div>

      <div>
        <ul className="grid gap-8 grid-cols-2 lg:grid-cols-3 overflow-hidden mt-14 ">
          {news?.map((n) => (
            <li className="relative bg-white flex flex-col border rounded shadow-md hover:shadow-primary-400">
              <a className="relative" href="#">
                <div className="relative w-full aspect-video">
                  {n?.imageUrl.includes("mp4") ||
                  n?.imageUrl.includes("mkv") ? (
                    <video
                      src={`http://localhost:3000/public/${n?.imageUrl}`}
                      controls
                    ></video>
                  ) : (
                    <img
                      className="rounded w-full h-full object-cover"
                      src={`http://localhost:3000/public/${n?.imageUrl}`}
                    />
                  )}
                </div>
              </a>

              <div className="flex flex-col justify-beetween gap-3 px-4 py-2">
                <h3 className="text-lg font-bold">{n?.Title}</h3>

                <p className="text-gray-600 two-lines">{n?.description}</p>

                <ul className="flex flex-wrap items-center justify-start text-sm gap-2">
                  <li
                    title="Pricing type"
                    className="flex items-center cursor-pointer gap-0.5 bg-gray-100 text-black px-2 py-0.5 rounded-full"
                  >
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13 3.5C13 2.94772 12.5523 2.5 12 2.5C11.4477 2.5 11 2.94772 11 3.5V4.0592C9.82995 4.19942 8.75336 4.58509 7.89614 5.1772C6.79552 5.93745 6 7.09027 6 8.5C6 9.77399 6.49167 10.9571 7.5778 11.7926C8.43438 12.4515 9.58764 12.8385 11 12.959V17.9219C10.2161 17.7963 9.54046 17.5279 9.03281 17.1772C8.32378 16.6874 8 16.0903 8 15.5C8 14.9477 7.55228 14.5 7 14.5C6.44772 14.5 6 14.9477 6 15.5C6 16.9097 6.79552 18.0626 7.89614 18.8228C8.75336 19.4149 9.82995 19.8006 11 19.9408V20.5C11 21.0523 11.4477 21.5 12 21.5C12.5523 21.5 13 21.0523 13 20.5V19.9435C14.1622 19.8101 15.2376 19.4425 16.0974 18.8585C17.2122 18.1013 18 16.9436 18 15.5C18 14.1934 17.5144 13.0022 16.4158 12.1712C15.557 11.5216 14.4039 11.1534 13 11.039V6.07813C13.7839 6.20366 14.4596 6.47214 14.9672 6.82279C15.6762 7.31255 16 7.90973 16 8.5C16 9.05228 16.4477 9.5 17 9.5C17.5523 9.5 18 9.05228 18 8.5C18 7.09027 17.2045 5.93745 16.1039 5.17721C15.2467 4.58508 14.1701 4.19941 13 4.0592V3.5ZM11 6.07814C10.2161 6.20367 9.54046 6.47215 9.03281 6.8228C8.32378 7.31255 8 7.90973 8 8.5C8 9.22601 8.25834 9.79286 8.79722 10.2074C9.24297 10.5503 9.94692 10.8384 11 10.9502V6.07814ZM13 13.047V17.9263C13.7911 17.8064 14.4682 17.5474 14.9737 17.204C15.6685 16.7321 16 16.1398 16 15.5C16 14.7232 15.7356 14.1644 15.2093 13.7663C14.7658 13.4309 14.0616 13.1537 13 13.047Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span>50</span>
                  </li>
                </ul>

                <ul className="flex flex-wrap text-sm gap-2 my-1">
                  <li className="flex items-center gap-2">
                    <span>Content Generation,</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>
                      <a href="" className="text-green-800">
                        see more
                      </a>
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>SEO,</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>Writing</span>
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
