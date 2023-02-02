import React, {useEffect, useRef} from "react";
import { useCssHandles } from "vtex.css-handles";
import { Link } from "vtex.render-runtime";

// CSS Handles
const CSS_HANDLES = [
  "CustomVideoInfocardContainer",
  "ButtonVideoInfocardContainer",
  "ButtonVideoInfocard",
  "CustomVideoInfocard",
  "customPlayIcon"
];

interface customVideoInfocardProps {
  width: string;
  maxHeight: string;
  src: string;
  // blockClass: string;
  autoPlay: boolean;
  loop: boolean;
  controls: boolean;
  muted: boolean;
  customPlayIcon: string;
  listButton: {
    title: string;
    href: string;
  }[];
}
const CustomVideoInfocard: StorefrontFunctionComponent<customVideoInfocardProps> = ({
  width,
  maxHeight,
  src,
  listButton,
  // blockClass,
  autoPlay = true,
  loop = true,
  controls = false,
  muted = true,
  customPlayIcon
}) => {
  const handles = useCssHandles(CSS_HANDLES);  
  const videoEl = useRef<HTMLVideoElement>(null);
  const playIconEl = useRef<HTMLDivElement>(null);
  const pbStyle:object = {
    backgroundImage: `url(${customPlayIcon})`,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100px',
    height: '100px',
    zIndex: 1,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    cursor: 'pointer'
  }

  const handleVideo = (e:any) => {
    let video = e.currentTarget;
    if (video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2) {
      if (playIconEl && playIconEl.current) playIconEl.current.style.display = "block";
    } else {
      if (playIconEl && playIconEl.current) playIconEl.current.style.display = "none";
    }
  }

  const handleEnd = () => {
    if (playIconEl && playIconEl.current) {
      playIconEl.current.style.display = "block";
    }
  }
  const handlePlayFromIcon = (e:any) => {
    if (videoEl && videoEl.current) {
      videoEl.current.play();
      e.currentTarget.style.display = "none";
    }
  }

  useEffect(() => {
    if (videoEl && videoEl.current) {      
      videoEl.current.addEventListener('ended', handleEnd);
    }
    return () =>  {
      if (videoEl && videoEl.current) {
        videoEl.current.removeEventListener('ended', handleEnd)
      }
    };
  }, [])



  return (
    <div
      className={`${handles.CustomVideoInfocardContainer}`}
      style={{ position: "relative" }}
    >
      <video ref={videoEl} onClick={(e) => handleVideo(e)}
        className={handles.CustomVideoInfocard}
        autoPlay={autoPlay}
        loop={loop}
        controls={controls}
        muted={muted}
        width={width}
        style={{ maxHeight: maxHeight }}
        playsInline
      >
        <source src={src} type="video/mp4" />
        <source src="movie.ogg" type="video/ogg" />
        Your browser does not support the video tag.
      </video>
      {customPlayIcon && <div ref={playIconEl} onClick={(e) => handlePlayFromIcon(e)} className={handles.customPlayIcon} style={pbStyle}></div>}
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className={handles.ButtonVideoInfocardContainer}
      >
        {listButton
          ? listButton.map((item: any, index: any) => (
              <Link to={item.href}>
                <button
                  className={handles.ButtonVideoInfocard}
                  key={index}
                  style={{ margin: "0 1rem" }}
                >
                  {item.title}
                </button>
              </Link>
            ))
          : null}
      </div>
    </div>
  );
};
CustomVideoInfocard.schema = {
  title: "Infocard",
  description: "Infocard custom",
  type: "object",
  properties: {
    width: {
      title: "Width Infocard",
      description: "Example 100% or 100px",
      type: "string",
      default: "100%",
    },
    maxHeight: {
      title: "MaxHeight Infocard",
      description: "Example 100% or 100px",
      type: "string",
      default: "auto",
    },
    src: {
      title: "SRC Infocard",
      description: "Example 100% or 100px",
      type: "string",
      default: "auto",
    },
  },
};

export default CustomVideoInfocard;
