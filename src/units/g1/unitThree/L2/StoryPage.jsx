import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Subtitles,
  Maximize2,
  Minimize2,
  MessageSquareText,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import "../../shared/StoryPage.css";
import ValidationAlert from "../../shared/ValidationAlert";

import video1 from "./assets/1.mp4";
import video2 from "./assets/2.mp4";
import video3 from "./assets/3.mp4";
import video4 from "./assets/4.mp4";
import video5 from "./assets/5.mp4";
import img from "./assets/img.png";

export const StoryPage = () => {
  const [showCaption, setShowCaption] = useState(true);
  const [extraBubble, setExtraBubble] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const [selectedWords, setSelectedWords] = useState([]);
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const [showFeedback, setShowFeedback] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const availableSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenContainerRef = useRef(null);

  const videos = [
    {
      url: video1,
      title: "Section 1",
      subtitles: [
        {
        },
      ],
    },

    {
      url: video2,
      title: "Section 2",
      subtitles: [
        {
          start: 0,
          end: 1.2,
          words: [
            { text: "‘Hello,", start: 0.2, end: 0.4 },
            { text: "what’s", start: 0.4, end: 0.6 },
            { text: "your", start: 0.6, end: 0.8 },
            { text: "name?’", start: 0.8, end: 1.0 },
          ],
        },
        {},
        {},
        {
          start: 9.0,
          end: 10.9,
          words: [
            { text: "‘Your", start: 9.0, end: 9.3 },
            { text: "shop", start: 9.3, end: 9.6 },
            { text: "is", start: 9.6, end: 9.9 },
            { text: "boring!’", start: 9.9, end: 10.6 },
          ],
        },
        {},
        {},
      ],
    },

    {
      url: video3,
      title: "Section 3",
      subtitles: [
        {},
        {},
        {},
        {
          start: 10.9,
          end: 13.6,
          words: [
            { text: "I’m", start: 11.0, end: 11.2 },
            { text: "sorry,", start: 11.2, end: 11.4 },
            { text: "I", start: 12.2, end: 12.6 },
            { text: "was", start: 12.6, end: 12.8 },
            { text: "rude", start: 12.8, end: 13.0 },
            { text: "before.", start: 13.0, end: 13.2 },
          ],
        },
        {
          start: 13.9,
          end: 20.6,
          words: [
            { text: "I", start: 15.7, end: 16.0 },
            { text: "was", start: 16.0, end: 16.3 },
            { text: "feeling", start: 16.3, end: 16.6 },
            { text: "angry", start: 16.6, end: 16.9 },
            { text: "with", start: 16.9, end: 17.2 },
            { text: "waiting", start: 17.2, end: 17.5 },
            { text: "around", start: 17.5, end: 17.8 },
            { text: "and", start: 17.8, end: 18.1 },
            { text: "I", start: 18.1, end: 18.4 },
            { text: "should", start: 18.4, end: 18.7 },
            { text: "not", start: 18.7, end: 19.0 },
            { text: "have", start: 19.0, end: 19.3 },
            { text: "spoken", start: 19.3, end: 19.6 },
            { text: "rudely", start: 19.6, end: 19.9 },
            { text: "to", start: 19.9, end: 20.2 },
            { text: "you.", start: 20.2, end: 20.5 },
          ],
        },
        {
          start: 21.6,
          end: 23.2,
          words: [
            { text: "It", start: 22.5, end: 22.7 },
            { text: "was", start: 22.7, end: 22.9 },
            { text: "wrong,", start: 22.9, end: 23.1 },
          ],
        },
        {
          start: 26.0,
          end: 28.5,
          words: [
            { text: "‘That’s", start: 26.0, end: 26.3 },
            { text: "okay,", start: 26.3, end: 26.6 },
            { text: "I", start: 26.6, end: 26.9 },
            { text: "understand", start: 26.9, end: 27.2 },
            { text: "you", start: 27.2, end: 27.5 },
            { text: "were", start: 27.5, end: 27.8 },
            { text: "becoming", start: 27.8, end: 28.1 },
            { text: "angry", start: 28.1, end: 28.4 },
          ],
        },
        {
          start: 28.5,
          end: 32.2,
          words: [
            { text: "and", start: 28.8, end: 29.1 },
            { text: "I’m", start: 29.1, end: 29.4 },
            { text: "sure", start: 29.4, end: 29.7 },
            { text: "you", start: 29.7, end: 30.0 },
            { text: "don’t", start: 30.0, end: 30.3 },
            { text: "speak", start: 30.3, end: 30.6 },
            { text: "like", start: 30.6, end: 30.9 },
            { text: "that", start: 30.9, end: 31.2 },
            { text: "all", start: 31.2, end: 31.5 },
            { text: "the", start: 31.5, end: 31.8 },
            { text: "time,’", start: 31.8, end: 32.1 },
          ],
        },
        {},
      ],
    },

    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 0,
          end: 3.2,
          words: [
            { text: "I’m", start: 0.2, end: 0.4 },
            { text: "happy", start: 0.4, end: 0.6 },
            { text: "you", start: 0.6, end: 0.8 },
            { text: "were", start: 0.8, end: 1.0 },
            { text: "able", start: 1.0, end: 1.2 },
            { text: "to", start: 1.2, end: 1.4 },
            { text: "see", start: 1.4, end: 1.6 },
            { text: "how", start: 1.6, end: 1.8 },
            { text: "your", start: 1.8, end: 2.0 },
            { text: "words", start: 2.0, end: 2.2 },
            { text: "hurt", start: 2.2, end: 2.4 },
            { text: "Mr.", start: 2.4, end: 2.6 },
            { text: "Harrison", start: 2.6, end: 3.2 },
          ],
        },

        {
          start: 3.8,
          end: 5.6,
          words: [
            { text: "and", start: 4.0, end: 4.3 },
            { text: "that", start: 4.3, end: 4.6 },
            { text: "you", start: 4.6, end: 4.8 },
            { text: "apologised.’", start: 4.8, end: 5.4 },
          ],
        },
      ],
    },

    {
      url: video5,
      title: "Section 5",
      subtitles: [
        {},
        {
          start: 3.3,
          end: 5.1,
          words: [
            { text: "‘I", start: 4.1, end: 4.3 },
            { text: "like", start: 4.3, end: 4.5 },
            { text: "your", start: 4.5, end: 4.7 },
            { text: "window", start: 4.7, end: 4.9 },
            { text: "display", start: 4.9, end: 5.1 },
          ],
        },
        {
          start: 5.1,
          end: 8.9,
          words: [
            { text: "and", start: 6.5, end: 6.7 },
            { text: "I", start: 6.7, end: 6.9 },
            { text: "like", start: 6.9, end: 7.1 },
            { text: "your", start: 7.1, end: 7.3 },
            { text: "nice", start: 7.3, end: 7.5 },
            { text: "chairs", start: 7.5, end: 7.7 },
            { text: "by", start: 7.7, end: 7.9 },
            { text: "the", start: 7.9, end: 8.1 },
            { text: "changing", start: 8.1, end: 8.3 },
            { text: "rooms,’", start: 8.3, end: 8.5 },
          ],
        },
        {
          start: 10.0,
          end: 11.8,
          words: [
            { text: "‘Well,", start: 10.6, end: 10.8 },
            { text: "thank", start: 10.8, end: 11.0 },
            { text: "you,’", start: 11.0, end: 11.2 },
          ],
        },
        {},
      ],
    },

    {
      url: img,
      title: "Section 6",
      subtitles: [],
    },
  ];

  const cloudPositions = {
    0: [
      // { bottom: '35rem', left: '50%', transform: 'translateX(-50%)', isFlipped: true }
    ],

    1: [
      { top: "40%", left: "0%" },
      { top: "10%", left: "15%" },
      { top: "10%", left: "5%" },
      { top: "20%", left: "65%", isFlipped: true },
      { top: "10%", left: "5%" },
      { top: "10%", left: "5%" },
      { top: "10%", left: "5%" },
      { top: "10%", left: "5%" },
      { top: "10%", left: "5%" },
    ],

    2: [
      { top: "60%", right: "35%", isFlipped: true },
      { top: "5%", left: "50%", isFlipped: true },
      { top: "5%", left: "50%", isFlipped: true },
      { top: "5%", left: "50%", isFlipped: true },
      { top: "5%", left: "50%", isFlipped: true },
      { top: "5%", left: "50%", isFlipped: true },
      { top: "30%", left: "30%", isFlipped: false },
      { top: "30%", left: "30%", isFlipped: false },
      { top: "5%", left: "10%", isFlipped: false },
      { top: "1%", left: "45%", isFlipped: true },
    ],

    3: [
      { bottom: "75%", left: "40%", isFlipped: true },
      { bottom: "75%", left: "40%", isFlipped: true },
      { top: "10%", left: "40%", isFlipped: false },
      { top: "10%", left: "35%" },
    ],

    4: [
      { top: "15%", left: "35%", isFlipped: true },
      { top: "10%", left: "10%" },
      { top: "10%", left: "10%" },
      { top: "30%", left: "20%" },
      { top: "10%", left: "10%" },
      { top: "10%", left: "10%" },
      { top: "5%", left: "4%" },
    ],
  };
  const extraBubblesData = [
    {
      videoIndex: 1,
      start: 1.2,
      end: 5.0,
      words: [
        { text: "Ellen", start: 2.8, end: 3.0 },
        { text: "does", start: 3.0, end: 3.2 },
        { text: "not", start: 3.2, end: 3.4 },
        { text: "respond", start: 3.4, end: 3.6 },
        { text: "and", start: 3.6, end: 4.0 },
        { text: "does", start: 4.0, end: 4.3 },
        { text: "not", start: 4.3, end: 4.6 },
        { text: "smile", start: 4.6, end: 4.9 },
      ],
    },
    {
      videoIndex: 1,
      start: 5.0,
      end: 7.6,
      words: [
        { text: "The", start: 6.0, end: 6.2 },
        { text: "shopkeeper", start: 6.2, end: 6.4 },
        { text: "asks", start: 6.4, end: 6.6 },
        { text: "what", start: 6.6, end: 6.8 },
        { text: "the", start: 6.8, end: 7.0 },
        { text: "matter", start: 7.0, end: 7.2 },
        { text: "is.", start: 7.2, end: 7.4 },
      ],
    },
    {
      videoIndex: 1,
      start: 10.9,
      end: 15.8,
      words: [
        { text: "she", start: 12.7, end: 13.0 },
        { text: "answers", start: 13.0, end: 13.3 },
        { text: "rudely", start: 13.3, end: 13.6 },
        { text: "as", start: 13.6, end: 13.9 },
        { text: "she", start: 13.9, end: 14.2 },
        { text: "turns", start: 14.2, end: 14.5 },
        { text: "around", start: 14.5, end: 14.8 },
        { text: "to", start: 14.8, end: 15.1 },
        { text: "walk", start: 15.1, end: 15.4 },
        { text: "away.", start: 15.4, end: 15.7 },
      ],
    },

    {
      videoIndex: 1,
      start: 15.8,
      end: 20.3,
      words: [
        { text: "The", start: 15.7, end: 16.1 },
        { text: "shopkeeper", start: 16.1, end: 16.5 },
        { text: "does", start: 16.5, end: 16.9 },
        { text: "not", start: 16.9, end: 17.3 },
        { text: "look", start: 17.3, end: 17.7 },
        { text: "happy.", start: 17.7, end: 18.1 },
        { text: "Ellen", start: 18.1, end: 18.5 },
        { text: "has", start: 18.5, end: 18.9 },
        { text: "hurt", start: 18.9, end: 19.3 },
        { text: "his", start: 19.3, end: 19.7 },
        { text: "feelings.", start: 19.7, end: 20.1 },
      ],
    },
    {
      videoIndex: 2,
      start: 0,
      end: 1.8,
      words: [
        { text: "Ellen", start: 0.2, end: 0.4 },
        { text: "notices", start: 0.4, end: 0.6 },
        { text: "the", start: 0.6, end: 0.8 },
        { text: "shopkeeper’s", start: 0.8, end: 1.0 },
        { text: "surprised", start: 1.0, end: 1.4 },
        { text: "face,", start: 1.4, end: 1.8 },
      ],
    },
    {
      videoIndex: 2,
      start: 1.8,
      end: 6.9,
      words: [
        { text: "and", start: 2.8, end: 3.1 },
        { text: "she", start: 3.1, end: 3.4 },
        { text: "realises", start: 3.4, end: 3.7 },
        { text: "she", start: 3.7, end: 4.0 },
        { text: "has", start: 4.0, end: 4.3 },
        { text: "hurt", start: 4.3, end: 4.6 },
        { text: "his", start: 4.6, end: 4.9 },
        { text: "feelings", start: 4.9, end: 5.5 },
        { text: "by", start: 5.8, end: 6.1 },
        { text: "being", start: 6.1, end: 6.4 },
        { text: "rude", start: 6.4, end: 6.7 },
      ],
    },

    {
      videoIndex: 2,
      start: 6.7,
      end: 9.5,
      words: [
        { text: "and", start: 8.4, end: 8.9 },
        { text: "feels", start: 8.9, end: 9.2 },
        { text: "bad.", start: 9.2, end: 9.4 },
      ],
    },
    {
      videoIndex: 2,
      start: 32.1,
      end: 35.0,
      words: [
        { text: "Ellen’s", start: 32.1, end: 32.4 },
        { text: "father", start: 32.4, end: 32.7 },
        { text: "walks", start: 32.7, end: 33.0 },
        { text: "up", start: 33.0, end: 33.3 },
        { text: "to", start: 33.3, end: 33.6 },
        { text: "the", start: 33.6, end: 33.9 },
        { text: "shopkeeper", start: 33.9, end: 34.2 },
        { text: "and", start: 34.2, end: 34.5 },
        { text: "Ellen.", start: 34.5, end: 34.8 },
      ],
    },
    {
      videoIndex: 4,
      start: 0,
      end: 3.3,
      words: [
        { text: "Dad", start: 0.2, end: 0.4 },
        { text: "buys", start: 0.4, end: 0.6 },
        { text: "a", start: 0.6, end: 0.8 },
        { text: "coat,", start: 0.8, end: 1.0 },
        { text: "and", start: 1.0, end: 1.2 },
        { text: "they", start: 1.2, end: 1.4 },
        { text: "start", start: 1.4, end: 1.6 },
        { text: "to", start: 1.6, end: 1.8 },
        { text: "make", start: 1.8, end: 2.0 },
        { text: "their", start: 2.0, end: 2.2 },
        { text: "way", start: 2.2, end: 2.4 },
        { text: "out", start: 2.4, end: 2.6 },
        { text: "of", start: 2.6, end: 2.8 },
        { text: "the", start: 2.8, end: 3.0 },
        { text: "store.", start: 3.0, end: 3.2 },
      ],
    },
    {
      videoIndex: 4,
      start: 12.0,
      end: 14.9,
      words: [
        { text: "Ellen", start: 12.0, end: 12.3 },
        { text: "feels", start: 12.3, end: 12.6 },
        { text: "happy", start: 12.6, end: 12.9 },
        { text: "she", start: 12.9, end: 13.2 },
        { text: "apologised", start: 13.2, end: 13.5 },
        { text: "to", start: 13.5, end: 13.8 },
        { text: "the", start: 13.8, end: 14.1 },
        { text: "shopkeeper", start: 14.1, end: 14.4 },
      ],
    },
  ];
  useEffect(() => {
    const bubbleToShow = extraBubblesData.find(
      (bubble) =>
        bubble.videoIndex === currentVideo &&
        currentTime >= bubble.start &&
        currentTime < bubble.end
    );

    setExtraBubble(bubbleToShow || null);
  }, [currentVideo, currentTime]);
  const currentVideoData = videos[currentVideo];
  const activeSubtitleIndex = currentVideoData.subtitles.findIndex(
    (sub) => currentTime >= sub.start && currentTime < sub.end
  );

  const isImage = (url) => {
    return /\.(jpeg|jpg|gif|png)$/.test(url);
  };

  const activeSubtitle =
    activeSubtitleIndex !== -1
      ? currentVideoData.subtitles[activeSubtitleIndex]
      : null;

  const activeCloudPosition =
    activeSubtitleIndex !== -1
      ? cloudPositions[currentVideo]?.[activeSubtitleIndex]
      : null;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsLoading(true);
    video.load();
    setCurrentTime(0);
    setShowBubble(true);

    const handleCanPlay = () => {
      setIsLoading(false);
      if (!showBanner) video.play().catch(() => {});
    };
    video.addEventListener("canplay", handleCanPlay);
    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [currentVideo]);

  // Preload next video
  useEffect(() => {
    const nextVideoIndex = currentVideo + 1;
    if (nextVideoIndex < videos.length) {
      const nextVideoUrl = videos[nextVideoIndex].url;
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.href = nextVideoUrl;
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [currentVideo, videos]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleLoadedData = () => setDuration(video.duration);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("loadeddata", handleLoadedData);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      setCurrentTime(0);
      setShowBubble(true);

      if (showBanner) {
        videoRef.current.pause();
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    }
  }, [currentVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (currentVideo === 4 && isPlaying) {
      console.log(`Current Time: ${currentTime}, Duration: ${duration}`);
      if (duration > 0 && currentTime >= duration - 0.3) {
        video.pause();
        // video.currentTime = 5.0;
        // setCurrentTime(5.0);
        setShowBanner(true);
      }
    }
  }, [currentTime, currentVideo, isPlaying, duration]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [currentVideo, isPlaying, playbackSpeed]);

  const handlePrevious = () => {
    setShowBanner(false);
    setCurrentVideo((prev) => (prev > 0 ? prev - 1 : videos.length - 1));
  };

  const handleNext = () => {
    setShowBanner(false);
    setCurrentVideo((prev) => (prev < videos.length - 1 ? prev + 1 : 0));
  };

  const handleEnded = useCallback(() => {
    if (currentVideo === videos.length - 1) {
      ValidationAlert.storyEnd(() => {
        navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
      });
    } else if (currentVideo !== 4) {
      setShowBanner(false);
      setCurrentVideo((prev) => prev + 1);
    }
  }, [currentVideo, videos.length, navigate, unitId, lessonId]);

  useEffect(() => {
    if (
      currentVideo === videos.length - 1 &&
      !currentVideoData.url.endsWith(".mp4")
    ) {
      const timer = setTimeout(() => {
        ValidationAlert.storyEnd(() => {
          navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
        });
      }, 500); // نصف ثانية لتأكد من ظهور الصورة

      return () => clearTimeout(timer);
    }
  }, [currentVideo, currentVideoData, navigate, unitId, lessonId]);

  const toggleWordSelection = (wordText) => {
    const correctWords = ["You tried"];
    const cleanedWord = wordText.replace(".", "");

    if (correctWords.includes(cleanedWord)) {
      setSelectedWords((prev) =>
        prev.includes(wordText)
          ? prev.filter((w) => w !== wordText)
          : [...prev, wordText]
      );
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 2000);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        if (currentVideo === 4 && showBanner) {
          setShowBanner(false);
          videoRef.current.play();
        } else {
          videoRef.current.play();
        }
      }
    }
  };

  const toggleMute = () => setIsMuted((prev) => !prev);

  const selectPlaybackSpeed = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleFullscreen = () => {
    const container = fullscreenContainerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="story-page-container">
      <div className="w-full max-w-6xl">
        <div ref={fullscreenContainerRef} className="video-wrapper">
          {videos.map(
            (vid, index) =>
              !isImage(vid.url) && (
                <video
                  key={index}
                  src={vid.url}
                  preload="auto"
                  style={{ display: "none" }}
                />
              )
          )}

          {isImage(currentVideoData.url) ? (
            <img
              src={currentVideoData.url}
              alt={currentVideoData.title}
              className="w-full aspect-video object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              muted={isMuted}
              onEnded={handleEnded}
              preload="auto"
              src={currentVideoData.url}
            >
              Your browser does not support the video tag.
            </video>
          )}

          {showFeedback && <div className="feedback-popup">Good Job! 👍</div>}

          {currentVideo === 4 && showBanner && (
            <div className="instruction-banner show">
              <p style={{ fontSize: "1.8em", textAlign: "left" }}>
                Highlight a sentence in the story that shows
              </p>
              {
                <p style={{ fontSize: "1.8em", textAlign: "left" }}>
                  Ellen making things right.
                </p>
              }
            </div>
          )}

          {activeSubtitle &&
            activeCloudPosition &&
            showBubble &&
            showSubtitles && (
              <div className="subtitle-container" style={activeCloudPosition}>
                <div
                  className={`bubble-cloud animate__animated animate__fadeIn ${
                    activeCloudPosition.isFlipped ? "flipped" : ""
                  }`}
                >
                  <p>
                    {activeSubtitle.words.map((word, index) => {
                      const isHighlighted =
                        currentTime >= word.start && currentTime < word.end;
                      return (
                        <span
                          key={index}
                          onClick={() => {
                            if (currentVideo === 4)
                              toggleWordSelection(word.text);
                          }}
                          className={`
                word-span
                ${isHighlighted ? "active-word" : ""}
                ${
                  currentVideo === 4 && selectedWords.includes(word.text)
                    ? "selected-word"
                    : ""
                }
                ${currentVideo === 4 ? "clickable-word" : ""}
              `}
                        >
                          {word.text}{" "}
                        </span>
                      );
                    })}
                  </p>
                  <button
                    className="close"
                    onClick={() => setShowBubble(false)}
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          {showCaption && extraBubble && extraBubble.words && (
            <div
              className="subtitle-container"
              style={{
                bottom: "0%",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 101,
              }}
            >
              <div className="extra-cloud animate\_\_animated animate\_\_fadeIn">
                <p>
                  {extraBubble.words.map((word, index) => {
                    const isHighlighted =
                      currentTime >= word.start && currentTime < word.end;
                    return (
                      <span
                        key={index}
                        className={`word-span ${
                          isHighlighted ? "active-word" : ""
                        }`}
                      >
                        {word.text}{" "}
                      </span>
                    );
                  })}
                </p>
              </div>
            </div>
          )}

          <div className="video-overlay" />
          <div className="controls-container">
            <div className="controlbbtn">
              <button
                onClick={handlePrevious}
                className="control-btn left-nav-btn"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={handleNext}
                className="control-btn right-nav-btn"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            <div className="controls-wrapper-new">
              <div className="controls-row">
                <div className="controls-group-left">
                  <button
                    onClick={() => setShowSubtitles(!showSubtitles)}
                    className="control-btn"
                    title="Subtitles"
                  >
                    <Subtitles className="w-6 h-6" />
                    <span className="control-label">Subtitle</span>
                  </button>

                  <button
                    onClick={() => setShowCaption(!showCaption)}
                    className="control-btn"
                    title="Caption"
                  >
                      <MessageSquareText className="w-6 h-6" /> 
                    <span className="control-label">Caption</span> 
                  </button>
                  <div
                    className="volume-control"
                    onMouseEnter={() => setShowVolumeSlider(true)}
                    onMouseLeave={() => setShowVolumeSlider(false)}
                  >
                    <button onClick={toggleMute} className="control-btn">
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-6 h-6" />
                      ) : (
                        <Volume2 className="w-6 h-6" />
                      )}
                    </button>
                    {showVolumeSlider && (
                      <div className="volume-slider-container">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="volume-slider"
                          orient="vertical"
                        />
                      </div>
                    )}
                  </div>
                  <div className="speed-control-container">
                    <button
                      onClick={() => setShowSpeedMenu((prev) => !prev)}
                      className="control-btn speed-btn"
                      title="Playback Speed"
                    >
                      <span className="speed-label">{playbackSpeed}x</span>
                    </button>
                    {showSpeedMenu && (
                      <ul className="speed-dropdown-list">
                        {availableSpeeds.map((speed) => (
                          <li
                            key={speed}
                            onClick={() => selectPlaybackSpeed(speed)}
                            className={
                              playbackSpeed === speed ? "active-speed" : ""
                            }
                          >
                            {speed}x
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="controls-group-center">
                  <button onClick={togglePlay} className="control-btn play-btn">
                    {isPlaying ? (
                      <Pause className="w-12 h-12" fill="white" />
                    ) : (
                      <Play className="w-12 h-12" fill="white" />
                    )}
                  </button>
                </div>

                <div className="controls-group-right">
                  <button onClick={toggleFullscreen} className="control-btn">
                    {isFullscreen ? (
                      <Minimize2 className="w-6 h-6" />
                    ) : (
                      <Maximize2 className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="progress-indicator-container">
            {videos.map((_, index) => (
              <div
                key={index}
                className={`progress-dot ${
                  index === currentVideo ? "active" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default StoryPage;
