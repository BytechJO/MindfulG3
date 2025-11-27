import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Subtitles, Maximize2, Minimize2, MessageSquareText } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';
import ValidationAlert from '../../shared/ValidationAlert';

import video1 from "./assets/1.mp4";
import video2 from "./assets/2.mp4";
import video3 from "./assets/3.mp4";
import video4 from "./assets/4.mp4";
import video5 from "./assets/5.mp4";
import img1 from "./assets/nex.png";

export const StoryPage = () => {
  const [showCaption, setShowCaption] = useState(true);
  const [extraBubble, setExtraBubble] = useState(null);

  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // حالات واجهة المستخدم
  const [showBubble, setShowBubble] = useState(true);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const fullscreenContainerRef = useRef(null);

  const mediaItems = [
    {
      type: 'video',
      url: video1,
      title: "Section 1",
      subtitles: [
      ]
    },

    {
      type: 'video',
      url: video2,
      title: "Section 2",
      subtitles: [

        {
          start: 11.0, end: 16.4,
          words: [
            { text: "Wow –", start: 13.5, end: 13.8 },
            { text: "thank", start: 14.0, end: 14.3 },
            { text: "you.", start: 14.5, end: 14.8 },
            { text: "I", start: 15.0, end: 15.3 },
            { text: "love", start: 15.5, end: 15.8 },
            { text: "them,", start: 16.0, end: 16.3 }
          ]
        }
      ]
    },

    {
      type: 'video',
      url: video3,
      title: "Section 3",
      subtitles: [
      ]
    },

    {
      type: 'video',
      url: video4,
      title: "Section 4",
      subtitles: [

      ]
    },

    {
      type: 'video',
      url: video5,
      title: "Section 5",
      subtitles: [
        {
          start: 0.0, end: 4.5,
          words: [
            { text: "Jen’s", start: 0.2, end: 0.5 },
            { text: "aunt", start: 0.5, end: 0.8 },
            { text: "asks", start: 0.8, end: 1.1 },
            { text: "her", start: 1.1, end: 1.3 },
            { text: "if", start: 1.3, end: 1.5 },
            { text: "she", start: 1.5, end: 1.7 },
            { text: "is", start: 1.7, end: 1.9 },
            { text: "done", start: 1.9, end: 2.2 },
            { text: "practising", start: 2.2, end: 2.7 },
            { text: "on", start: 2.7, end: 2.9 },
            { text: "her", start: 2.9, end: 3.1 },
            { text: "rollerblades", start: 3.1, end: 3.7 },
            { text: "for", start: 3.7, end: 3.9 },
            { text: "the", start: 3.9, end: 4.0 },
            { text: "day.", start: 4.0, end: 4.3 }
          ]
        },

        {
          start: 4.8, end: 8.7,
          words: [
            { text: "Jen", start: 5.5, end: 5.8 },
            { text: "looks", start: 5.8, end: 6.1 },
            { text: "at", start: 6.1, end: 6.3 },
            { text: "her", start: 6.3, end: 6.5 },
            { text: "with", start: 6.5, end: 6.7 },
            { text: "a", start: 6.7, end: 6.8 },
            { text: "big", start: 6.8, end: 7.3 },
            { text: "smile,", start: 7.3, end: 7.6 },
            { text: "and", start: 8.0, end: 8.3 },
            { text: "says", start: 8.3, end: 8.6 }
          ]
        },

        {
          start: 8.7, end: 12.5,
          words: [
            { text: "I", start: 9.2, end: 9.4 },
            { text: "am", start: 9.4, end: 9.6 },
            { text: "just", start: 9.6, end: 9.9 },
            { text: "getting", start: 9.9, end: 10.2 },
            { text: "started!", start: 10.2, end: 10.6 },
            { text: "I’m", start: 11.2, end: 11.5 },
            { text: "going", start: 11.5, end: 11.8 },
            { text: "to", start: 11.8, end: 11.9 },
            { text: "keep", start: 11.9, end: 12.2 },
            { text: "trying", start: 12.2, end: 12.6 }
          ]
        },
      ]
    },

    {
      type: 'image',
      url: img1,
      title: "The End",
      subtitles: [

      ]
    }
  ];

  const extraBubblesData = [
    {
      videoIndex: 1,
      start: 0, end: 4.5,
      words: [
        { text: "Jen", start: 0.0, end: 0.4 },
        { text: "gets", start: 0.4, end: 0.7 },
        { text: "a", start: 0.7, end: 0.8 },
        { text: "pair", start: 0.8, end: 1.1 },
        { text: "of", start: 1.1, end: 1.3 },
        { text: "roller", start: 1.3, end: 1.7 },
        { text: "blades", start: 1.7, end: 2.1 },
        { text: "from", start: 2.1, end: 2.4 },
        { text: "her", start: 2.4, end: 2.6 },
        { text: "aunt", start: 2.6, end: 2.9 },
        { text: "and", start: 2.9, end: 3.1 },
        { text: "uncle", start: 3.1, end: 3.5 },
        { text: "for", start: 3.5, end: 3.7 },
        { text: "her", start: 3.7, end: 3.9 },
        { text: "birthday.", start: 3.9, end: 4.3 }
      ]
    },
    {
      videoIndex: 1,
      start: 4.8, end: 8.9,
      words: [
        { text: "She", start: 4.9, end: 5.2 },
        { text: "has", start: 5.2, end: 5.4 },
        { text: "wanted", start: 5.4, end: 5.8 },
        { text: "roller", start: 5.8, end: 6.2 },
        { text: "blades", start: 6.2, end: 6.6 },
        { text: "since", start: 6.6, end: 7.2 },
        { text: "last", start: 7.5, end: 8.2 },
        { text: "year.", start: 8.2, end: 8.8 },
      ]
    },
    {
      videoIndex: 1,
      start: 9.2, end: 10.9,
      words: [
        { text: "Jen", start: 9.5, end: 9.8 },
        { text: "is", start: 9.8, end: 10.1 },
        { text: "very", start: 10.1, end: 10.2 },
        { text: "happy!", start: 10.2, end: 10.7 }
      ]
    },


    {
      videoIndex: 2,
      start: 1.0, end: 7.0,
      words: [
        { text: "Jen", start: 1.5, end: 2.0 },
        { text: "puts", start: 2.0, end: 2.6 },
        { text: "them on", start: 2.6, end: 3.1 },
        { text: "and", start: 3.5, end: 3.7 },
        { text: "goes", start: 3.7, end: 4.0 },
        { text: "outside", start: 4.0, end: 4.4 },
        { text: "to", start: 4.4, end: 4.6 },
        { text: "practise", start: 4.6, end: 5.0 },
        { text: "on", start: 5.0, end: 5.6 },
        { text: "the", start: 5.6, end: 6.2 },
        { text: "sidewalk.", start: 6.2, end: 6.9 }
      ]
    },
    {
      videoIndex: 2,
      start: 7.2, end: 10.9,
      words: [
        { text: "She", start: 7.5, end: 7.8 },
        { text: "has", start: 7.8, end: 8.0 },
        { text: "always", start: 8.0, end: 8.4 },
        { text: "wanted", start: 8.4, end: 8.8 },
        { text: "to", start: 8.8, end: 9.0 },
        { text: "learn", start: 9.0, end: 9.3 },
        { text: "how", start: 9.3, end: 9.5 },
        { text: "to", start: 9.5, end: 9.6 },
        { text: "skate.", start: 9.6, end: 10.5 }
      ]
    },
    {
      videoIndex: 2,
      start: 11.0, end: 14.5,
      words: [
        { text: "It", start: 11.5, end: 11.7 },
        { text: "is", start: 11.7, end: 11.9 },
        { text: "difficult", start: 11.9, end: 12.3 },
        { text: "to", start: 12.3, end: 12.5 },
        { text: "skate", start: 12.5, end: 12.9 },
        { text: "for", start: 12.9, end: 13.1 },
        { text: "the", start: 13.1, end: 13.3 },
        { text: "first", start: 13.3, end: 13.6 },
        { text: "time.", start: 13.6, end: 14.0 }
      ]
    },
    {
      videoIndex: 2,
      start: 14.7, end: 16.5,
      words: [
        { text: "Jen", start: 15.0, end: 15.3 },
        { text: "keeps", start: 15.3, end: 15.6 },
        { text: "falling", start: 15.6, end: 16.0 },
        { text: "over.", start: 16.0, end: 16.3 }
      ]
    },
    {
      videoIndex: 2,
      start: 16.9, end: 19.0,
      words: [
        { text: "She", start: 17.0, end: 17.4 },
        { text: "is", start: 17.4, end: 17.8 },
        { text: "tired.", start: 17.8, end: 18.7 }
      ]
    },
    {
      videoIndex: 2,
      start: 19.5, end: 23.5,
      words: [
        { text: "She", start: 20.0, end: 20.3 },
        { text: "sits", start: 20.3, end: 20.6 },
        { text: "on", start: 20.6, end: 20.8 },
        { text: "the", start: 20.8, end: 21.0 },
        { text: "steps", start: 21.0, end: 21.3 },
        { text: "and", start: 21.3, end: 21.5 },
        { text: "takes", start: 21.5, end: 21.8 },
        { text: "off", start: 21.8, end: 22.0 },
        { text: "her", start: 22.0, end: 22.2 },
        { text: "roller", start: 22.2, end: 22.6 },
        { text: "blades.", start: 22.6, end: 23.0 }
      ]
    },

    {
      videoIndex: 3,
      start: 0, end: 6.8,
      words: [
        { text: "Jen", start: 0.0, end: 0.5 },
        { text: "knows", start: 0.5, end: 1.0 },
        { text: "it is", start: 1.0, end: 1.4 },
        { text: "sometimes", start: 1.4, end: 1.8 },
        { text: "difficult", start: 1.8, end: 2.5 },
        { text: "to", start: 2.5, end: 2.8 },
        { text: "learn", start: 2.8, end: 3.1 },
        { text: "new", start: 3.1, end: 3.4 },
        { text: "things", start: 3.4, end: 3.7 },
        { text: "and", start: 4.5, end: 4.7 },
        { text: "it", start: 4.7, end: 4.9 },
        { text: "takes", start: 4.9, end: 5.2 },
        { text: "effort", start: 5.2, end: 5.5 },
        { text: "to", start: 5.5, end: 5.6 },
        { text: "achieve", start: 5.6, end: 6.0 },
        { text: "goals.", start: 6.0, end: 6.4 }
      ]
    },
    {
      videoIndex: 3,
      start: 6.9, end: 12.0,
      words: [
        { text: "Jen", start: 7.5, end: 7.8 },
        { text: "sits", start: 7.8, end: 8.1 },
        { text: "for", start: 8.1, end: 8.3 },
        { text: "a", start: 8.3, end: 8.4 },
        { text: "few", start: 8.4, end: 8.6 },
        { text: "minutes", start: 8.6, end: 8.9 },
        { text: "–", start: 8.9, end: 9.0 },
        { text: "she", start: 9.0, end: 9.3 },
        { text: "finishes", start: 9.3, end: 9.7 },
        { text: "her", start: 9.7, end: 9.9 },
        { text: "piece", start: 9.9, end: 10.2 },
        { text: "of", start: 10.2, end: 10.3 },
        { text: "cake", start: 10.3, end: 10.6 },
        { text: "and", start: 10.6, end: 10.8 },
        { text: "lemonade.", start: 10.8, end: 11.3 }
      ]
    },
  ];


  useEffect(() => {
    const bubbleToShow = extraBubblesData.find(bubble =>
      bubble.videoIndex === currentItemIndex &&
      currentTime >= bubble.start &&
      currentTime < bubble.end
    );

    setExtraBubble(bubbleToShow || null);

  }, [currentItemIndex, currentTime]);

  const currentItem = mediaItems[currentItemIndex];
  const availableSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const cloudPositions = {
    0: [
      // { bottom: '35rem', left: '50%', transform: 'translateX(-50%)', isFlipped: true }
    ],
    1: [
      { top: '15%', left: '10%' },
      { top: '10%', left: '45%', isFlipped: true },
      { top: '15%', left: '15%' },
      { top: '15%', left: '15%' }
    ],
    2: [
      { top: '10%', right: '5%', isFlipped: true },
      { top: '1%', left: '45%', isFlipped: true },
      { top: '1%', left: '25%', isFlipped: true },
      { top: '10%', right: '5%', isFlipped: true },
      { top: '1%', left: '45%', isFlipped: true },
      { top: '1%', left: '25%', isFlipped: true }
    ],
    3: [
      { bottom: '80%', left: '28%' },
      { top: '30%', left: '35%', isFlipped: true },
      { bottom: '80%', left: '28%' },
      { top: '30%', left: '35%', isFlipped: true },
      { top: '30%', left: '35%', isFlipped: true }
    ],
    4: [
      { top: '20%', left: '50%', transform: 'translateX(-50%)' },
      { top: '20%', left: '50%', transform: 'translateX(-50%)' },
      { top: '20%', left: '50%', transform: 'translateX(-50%)' }
    ]
  };

  const activeSubtitleIndex = currentItem.type === 'video' ? currentItem.subtitles.findIndex(sub => currentTime >= sub.start && currentTime < sub.end) : 0;
  const activeSubtitle = activeSubtitleIndex !== -1 ? currentItem.subtitles[activeSubtitleIndex] : null;
  const activeCloudPosition = activeSubtitleIndex !== -1 ? cloudPositions[currentItemIndex]?.[activeSubtitleIndex] : null;

  // --- دوال التحكم بالوسائط ---
  const handleNext = useCallback(() => {
    if (currentItemIndex === mediaItems.length - 1) {
      ValidationAlert.storyEnd(() => {
        navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
      });
    } else {
      setCurrentItemIndex(prev => prev + 1);
    }
  }, [currentItemIndex, mediaItems.length, navigate, unitId, lessonId]);

  const handlePrevious = () => {
    setCurrentItemIndex(prev => (prev > 0 ? prev - 1 : mediaItems.length - 1));
  };

  const togglePlay = () => {
    if (currentItem.type !== 'video' || !videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  useEffect(() => {
    setShowBubble(true);

    if (currentItem.type === 'image') {
      setIsPlaying(false);
      const timer = setTimeout(handleNext, 1000); // الانتقال بعد 5 ثوانٍ
      return () => clearTimeout(timer);
    }

    if (currentItem.type === 'video' && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => setIsPlaying(false));
      setCurrentTime(0);
    }
  }, [currentItemIndex, currentItem.type, handleNext]);

  // useEffect لربط مستمعات الأحداث للفيديو فقط
  useEffect(() => {
    const video = videoRef.current;
    if (currentItem.type !== 'video' || !video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleLoadedData = () => setDuration(video.duration);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [currentItem.type, currentItemIndex]); // يعتمد على نوع العنصر وفهرسه

  // useEffect للتحكم بملء الشاشة
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // --- دوال أخرى ---
  const toggleMute = () => setIsMuted(!isMuted);
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };
  const selectPlaybackSpeed = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) videoRef.current.playbackRate = speed;
    setShowSpeedMenu(false);
  };
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      fullscreenContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="story-page-container">
      <div className="w-full max-w-6xl">
        <div ref={fullscreenContainerRef} className="video-wrapper">

          {currentItem.type === 'video' ? (
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              src={currentItem.url}
              muted={isMuted}
              onEnded={handleNext}
              preload="auto"
              style={{ display: 'block' }}
            />
          ) : (
            <img
              src={currentItem.url}
              alt={currentItem.title}
              className="w-full aspect-video object-cover"
            />
          )}

          {/* --- عرض الفقاعات (Subtitles) --- */}
          {activeSubtitle && activeCloudPosition && showBubble && showSubtitles && (
            <div className="subtitle-container" style={activeCloudPosition}>
              <div className={`bubble-cloud animate__animated animate__fadeIn ${activeCloudPosition.isFlipped ? 'flipped' : ''}`}>
                <p>
                  {activeSubtitle.words.map((word, index) => {
                    const isHighlighted = currentItem.type === 'video' && currentTime >= word.start && currentTime < word.end;
                    return (
                      <span key={index} className={`word-span ${isHighlighted ? 'active-word' : ''}`}>
                        {word.text}{' '}
                      </span>
                    );
                  })}
                </p>
                {/* <button className="close" onClick={() => setShowBubble(false)}>×</button> */}
              </div>
            </div>
          )}

          {showCaption && extraBubble && extraBubble.words && (
            <div
              className="subtitle-container"
              style={{ bottom: '0%', left: '50%', transform: 'translateX(-50%)', zIndex: 101 }}
            >
              <div className="extra-cloud animate\_\_animated animate\_\_fadeIn">
                <p>
                  {extraBubble.words.map((word, index) => {
                    const isHighlighted = currentTime >= word.start && currentTime < word.end;
                    return <span key={index} className={`word-span ${isHighlighted ? 'active-word' : ''}`}>{word.text}{' '}</span>;
                  })}
                </p>
              </div>
            </div>
          )}

          {/* --- أزرار التحكم --- */}
          <div className="video-overlay" />
          <div className="controls-container">
            <div className="controlbbtn">
              <button onClick={handlePrevious} className="control-btn left-nav-btn"><ChevronLeft className="w-8 h-8" /></button>
              <button onClick={handleNext} className="control-btn right-nav-btn"><ChevronRight className="w-8 h-8" /></button>
            </div>

            <div className="controls-wrapper-new">
              <div className="controls-row">
                <div className="controls-group-left">
                  {/* --- 5. تعطيل الأزرار عند عرض الصورة --- */}
                  <button onClick={() => setShowSubtitles(!showSubtitles)} className="control-btn" title="Subtitles">
                    <Subtitles className="w-6 h-6" />
                    <span className="control-label">Subtitle</span>
                  </button>
                  <button onClick={() => setShowCaption(!showCaption)} className="control-btn" title="Caption">
                    <MessageSquareText className="w-6 h-6" />
                    <span className="control-label">Caption</span>
                  </button>
                  <div className="volume-control" onMouseEnter={() => setShowVolumeSlider(true)} onMouseLeave={() => setShowVolumeSlider(false)}>
                    <button onClick={toggleMute} className="control-btn" disabled={currentItem.type === 'image'}>
                      {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                    </button>
                    {showVolumeSlider && currentItem.type === 'video' && (
                      <div className="volume-slider-container">
                        <input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange} className="volume-slider" orient="vertical" />
                      </div>
                    )}
                  </div>
                  <div className="speed-control-container">
                    <button onClick={() => setShowSpeedMenu(!showSpeedMenu)} className="control-btn speed-btn" title="Playback Speed" disabled={currentItem.type === 'image'}>
                      <span className="speed-label">{playbackSpeed}x</span>
                    </button>
                    {showSpeedMenu && currentItem.type === 'video' && (
                      <ul className="speed-dropdown-list">
                        {availableSpeeds.map(speed => (
                          <li key={speed} onClick={() => selectPlaybackSpeed(speed)} className={playbackSpeed === speed ? 'active-speed' : ''}>{speed}x</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="controls-group-center">
                  <button onClick={togglePlay} className="control-btn play-btn" disabled={currentItem.type === 'image'}>
                    {isPlaying ? <Pause className="w-12 h-12" fill="white" /> : <Play className="w-12 h-12" fill="white" />}
                  </button>
                </div>

                <div className="controls-group-right">
                  <button onClick={toggleFullscreen} className="control-btn">
                    {isFullscreen ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* --- مؤشر التقدم --- */}
          <div className="progress-indicator-container">
            {mediaItems.map((_, index) => (
              <div key={index} className={`progress-dot ${index === currentItemIndex ? 'active' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
