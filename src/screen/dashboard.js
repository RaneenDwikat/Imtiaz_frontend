// import { useLocation } from "react-router-dom";
import Main from "../component/main";
import Sidebar from "../component/sidebar";
import background from "../images/kindergarten.jpg";
import background0 from '../images/kindergrten0.jpg'
import background1 from '../images/kindergarten1.jpg'
import { useState,useEffect,useRef } from "react";
export default function Dashboard() {

    const imgs = [background, background0, background1];
    const delay = 5000;

    function Slideshow() {
        const [index, setIndex] = useState(0);
        const timeoutRef = useRef(null);
      
        function resetTimeout() {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        }
        useEffect(() => {
          resetTimeout();
          timeoutRef.current = setTimeout(
            () =>
              setIndex((prevIndex) =>
                prevIndex === imgs.length - 1 ? 0 : prevIndex + 1
              ),
            delay
          );
      
          return () => {
            resetTimeout();
          };
        }, [index]);
      
        return (
          <div className="slideshow">
            <div
              className="slideshowSlider"
              style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
              {imgs.map((src, index) => (
                <img
                  className="slide"
                  key={index}
                  src={src}
                  alt="background"
                />
              ))}
            </div>
      
            <div className="slideshowDots">
              {imgs.map((_, idx) => (
                <div
                  key={idx}
                  className={`slideshowDot${index === idx ? " active" : ""}`}
                  onClick={() => {
                    setIndex(idx);
                  }}
                ></div>
              ))}
            </div>
          </div>
        );
      }

//   const location = useLocation();
//   let response = location.state.response;
  return (
    <div className="body">
      <Sidebar token={window.token} />
      <Slideshow/>
      <Main />
    </div>
  );
}
