/**
 * ============================================================================
 *  Youtube Component (Kavia AI refactored)
 *  Embeds a horizontally scrolling row of YouTube travel recommendation videos.
 *  Uses local static data for consistency in UI. Follows idiomatic React.
 * ============================================================================
 */
import { useEffect, useState } from "react";
import videoData from "../utils/videoData.json";

// PUBLIC_INTERFACE
/**
 * Renders travel-related YouTube video embeds as horizontal scroll gallery.
 * Loads static list from videoData.json for demo/stability.
 */
const Youtube = () => {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    if (videoData?.items) {
      setVideoList(videoData.items);
    }
  }, []);

  if (!Array.isArray(videoList) || !videoList.length) return null;

  return (
    <div className="m-10 flex video-player gap-7 overflow-x-auto">
      {videoList.map((video, idx) => (
        <iframe
          key={video.id?.videoId || idx}
          className="rounded-xl"
          width="300"
          height="415"
          src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=0&loop=1`}
          title={video.snippet?.title || "Travel Video"}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ))}
    </div>
  );
};

Youtube.propTypes = {};

export default Youtube;