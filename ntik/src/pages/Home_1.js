import React, { useEffect, useState } from "react";
import "../assets/css/app.css";
import Video from "../components/Video";
import Swiper, { Navigation } from "swiper";
import "swiper/swiper-bundle.css";
Swiper.use([Navigation]);


// const { networkId } = getConfig(process.env.NODE_ENV || 'development')



function Home() {
  const [showNotification, setShowNotification] = useState(false)
  const [loading, setload] = useState(null);
  const [data, setData] = useState([
    {
      video: [],
      author: [],
      title: [],
    },
  ]);

  useEffect(() => {
    const mySwiper = new Swiper(".swiper-container", {
      loop: true,
      // spaceBetween: 830,
      direction: "vertical",
      slidesPerView: 1,
      speed: 600,
      preloadImages: true,
      observer: true,
      observeParents: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      // preventInteractionOnTransition: true,

      // direction: 'vertical',
      // spaceBetween: 0,
      // hashNavigation: true,
      // mousewheel: true,
      // speed: 600,
      // loop: true
    });

    console.log("init swiper");
  }, []);

  //fetch videos 
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://www.reddit.com/r/tiktokcringe/.json?limit=100"
      );

      const data = await response.json();
      const video = [];
      const author = [];
      const title = [];
      const mediaData = data.data.children;
      try {
        for (var i = 7; i < mediaData.length; i++) {
          if (
            mediaData[i].data.media !== null &&
            mediaData[i].data.secure_media.reddit_video.bitrate_kbps < 2500 &&
            mediaData[i].data.secure_media.reddit_video.duration < 45
          ) {
            video.push(mediaData[i].data.media);
            author.push(mediaData[i].data.author);
            title.push(mediaData[i].data.title);
          }
        }
        setData([
          {
            video: video,
            author: author,
            title: title,
          },
        ]);
        setload(true);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div id="video-scroll">
      {data.map(({ video, author, title }) => {
        return (
          <div className="swiper-container" key={Math.random() + "_" + Date.now()}>
            <div className="swiper-wrapper">
              {video.map((v, index) => (
                <div className="swiper-slide" key={Math.random()}>
                  {loading ? (
                    <Video
                      className="lazy"
                      source={v.reddit_video.fallback_url}
                    />
                  ) : (
                    <p>Loading...</p>
                  )}
                  <p id="author">@{author[index]}</p>
                  <p id="title">
                    {title[index].length < 30
                      ? title[index]
                      : title[index].substring(0, 30) + "..."}{" "}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;

