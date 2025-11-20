import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Subtitles, Maximize2, Minimize2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';
import ValidationAlert from '../../shared/ValidationAlert';

import video1 from "./assets/1.mp4";
import video2 from "./assets/2.mp4";
import video3 from "./assets/3.mp4";
import video4 from "./assets/4.mp4";
import video5 from "./assets/5.mp4";
import video6 from "./assets/6.mp4";
import video7 from "./assets/7+8.mp4";
import img from "./assets/nex.png";

import questionGif from './assets/question.gif';

export const StoryPage = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const [selectedWords, setSelectedWords] = useState([]);
  const navigate = useNavigate();
  const { unitId, lessonId } = useParams();
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
          // start: 0, end: 3.5, 
          // words: [
          //   { text: "A", start: 0.2, end: 0.7 },
          //   { text: "Clean", start: 0.7, end: 1.3 },
          //   { text: "Place", start: 1.3, end: 2.0 },
          //   { text: "is", start: 2.1, end: 2.3 },
          //   { text: "a", start: 2.3, end: 2.5 },
          //   { text: "Safe", start: 2.5, end: 2.9 }, // تعديل طفيف
          //   { text: "Place.", start: 2.9, end: 3.3 }, // تعديل طفيف
          // ]
        },
      ]
    },

    {
      url: video2,
      title: "Section 2",
      subtitles: [
        {
          start: 0, end: 3.5,
          words: [
            { text: "We’re", start: 0.1, end: 0.4 },
            { text: "going", start: 0.4, end: 0.7 },
            { text: "to", start: 0.7, end: 0.9 },
            { text: "walk", start: 0.9, end: 1.2 },
            { text: "over", start: 1.2, end: 1.5 },
            { text: "to", start: 1.5, end: 1.7 },
            { text: "the", start: 1.7, end: 1.8 },
            { text: "auditorium", start: 1.8, end: 2.3 },
            { text: "now", start: 2.3, end: 2.5 },
            { text: "for", start: 2.5, end: 2.7 },
            { text: "the", start: 2.7, end: 2.8 },
            { text: "concert", start: 2.8, end: 3.2 }
          ]
        },

        {
          start: 4.0, end: 7.0,
          words: [
            { text: "Mrs", start: 4.5, end: 4.8 },
            { text: "Bell", start: 4.8, end: 5.2 },
            { text: "announces", start: 5.2, end: 5.8 },
            { text: "to", start: 5.8, end: 6.0 },
            { text: "her", start: 6.0, end: 6.4 },
            { text: "class.", start: 6.4, end: 6.8 }
          ]
        },

        {
          start: 7.0, end: 9.8,
          words: [
            { text: "Kylie", start: 7.1, end: 7.5 },
            { text: "and", start: 7.5, end: 7.8 },
            { text: "her", start: 7.8, end: 8.1 },
            { text: "friends", start: 8.1, end: 8.6 },
            { text: "are", start: 8.6, end: 9.0 },
            { text: "excited.", start: 9.0, end: 9.5 }
          ]
        },

        {
          start: 10.0, end: 12.3,
          words: [
            { text: "They", start: 10.1, end: 10.4 },
            { text: "are", start: 10.4, end: 10.6 },
            { text: "looking", start: 10.6, end: 10.9 },
            { text: "forward", start: 10.9, end: 11.2 },
            { text: "to", start: 11.2, end: 11.4 },
            { text: "the", start: 11.4, end: 11.6 },
            { text: "concert.", start: 11.6, end: 12.0 }
          ]
        },

        {
          start: 12.4, end: 15.6,
          words: [
            { text: "I", start: 13.1, end: 13.3 },
            { text: "want", start: 13.3, end: 13.6 },
            { text: "you", start: 13.6, end: 13.8 },
            { text: "all", start: 13.8, end: 14.0 },
            { text: "to", start: 14.0, end: 14.2 },
            { text: "be", start: 14.2, end: 14.4 },
            { text: "on", start: 14.4, end: 14.6 },
            { text: "your", start: 14.6, end: 14.8 },
            { text: "best", start: 14.8, end: 15.1 },
            { text: "behaviour", start: 15.1, end: 15.6 }
          ]
        },

        {
          start: 16.0, end: 18.0,
          words: [
            { text: "There", start: 16.0, end: 16.3 },
            { text: "are", start: 16.3, end: 16.5 },
            { text: "enough", start: 16.5, end: 16.9 },
            { text: "seats", start: 16.9, end: 17.2 },
            { text: "for", start: 17.2, end: 17.4 },
            { text: "everyone", start: 17.4, end: 17.9 }
          ]
        },

        {
          start: 18.2, end: 21.5,
          words: [
            { text: "so", start: 18.5, end: 18.7 },
            { text: "no", start: 18.7, end: 18.9 },
            { text: "pushing", start: 18.9, end: 19.3 },
            { text: "or", start: 19.3, end: 19.5 },
            { text: "running", start: 19.5, end: 19.9 },
            { text: "when", start: 19.9, end: 20.1 },
            { text: "you’re", start: 20.1, end: 20.3 },
            { text: "in", start: 20.3, end: 20.5 },
            { text: "the", start: 20.5, end: 20.7 },
            { text: "auditorium.", start: 20.7, end: 21.2 }
          ]
        },

        {
          start: 21.8, end: 23.5,
          words: [
            { text: "Do", start: 22.0, end: 22.2 },
            { text: "you", start: 22.2, end: 22.4 },
            { text: "all", start: 22.4, end: 22.6 },
            { text: "understand", start: 22.6, end: 23.0 },
            { text: "me?", start: 23.0, end: 23.2 }
          ]
        },

        {
          start: 24.0, end: 26.0,
          words: [
            { text: "Yes", start: 25.0, end: 25.4 },
            { text: "Mrs", start: 25.4, end: 25.8 },
            { text: "Bell", start: 25.8, end: 26.3 }
          ]
        },


      ]
    },

    {
      url: video3,
      title: "Section 3",
      subtitles: [
        {
          start: 0, end: 3.3,
          words: [
            { text: "The", start: 0.1, end: 0.3 },
            { text: "students", start: 0.3, end: 0.7 },
            { text: "get", start: 0.7, end: 0.9 },
            { text: "up", start: 0.9, end: 1.0 },
            { text: "to", start: 1.0, end: 1.3 },
            { text: "leave", start: 1.3, end: 1.6 },
            { text: "the", start: 1.6, end: 1.9 },
            { text: "classroom", start: 1.9, end: 2.2 },
            { text: "and", start: 2.2, end: 2.5 },
            { text: "line", start: 2.5, end: 2.8 },
            { text: "up.", start: 2.8, end: 3.1 }
          ]
        },

        {
          start: 3.3, end: 8.0,
          words: [
            { text: "Kylie", start: 3.5, end: 3.9 },
            { text: "is", start: 3.9, end: 4.2 },
            { text: "pushed", start: 4.2, end: 4.6 },
            { text: "against", start: 4.6, end: 5.0 },
            { text: "the", start: 5.0, end: 5.3 },
            { text: "bookshelf", start: 5.3, end: 5.8 },
            { text: "as", start: 5.8, end: 6.1 },
            { text: "some", start: 6.1, end: 6.4 },
            { text: "classmates", start: 6.4, end: 6.9 },
            { text: "hurry", start: 6.9, end: 7.3 },
            { text: "past her.", start: 7.3, end: 7.9 },
          ]
        },

        {
          start: 10.8, end: 12.9,
          words: [
            { text: "Ow!", start: 11.0, end: 12.3 },
          ]
        },

        {
          start: 13.5, end: 18.0,
          words: [
            { text: "She", start: 14.5, end: 14.8 },
            { text: "cries", start: 14.8, end: 15.2 },
            { text: "as", start: 15.2, end: 15.4 },
            { text: "she", start: 15.4, end: 15.7 },
            { text: "bumps", start: 15.7, end: 16.1 },
            { text: "her", start: 16.1, end: 16.4 },
            { text: "elbow", start: 16.4, end: 16.8 },
            { text: "on", start: 16.8, end: 17.1 },
            { text: "the", start: 17.1, end: 17.4 },
            { text: "bookshelf.", start: 17.4, end: 17.9 }
          ]
        },

        {
          start: 18.5, end: 20.5,
          words: [
            { text: "Are", start: 18.8, end: 19.1 },
            { text: "you", start: 19.1, end: 19.4 },
            { text: "okay,", start: 19.4, end: 19.7 },
            { text: "Kylie?", start: 19.7, end: 20.1 }
          ]
        },

        {
          start: 20.8, end: 22.5,
          words: [
            { text: "Someone", start: 21.0, end: 21.4 },
            { text: "bumped", start: 21.4, end: 21.8 },
            { text: "me", start: 21.8, end: 22.1 }
          ]
        },

        {
          start: 22.8, end: 24.5,
          words: [
            { text: "But", start: 23.0, end: 23.3 },
            { text: "let’s", start: 23.3, end: 23.7 },
            { text: "hurry", start: 23.7, end: 24.1 }

          ]
        },

        {
          start: 24.8, end: 28.0,
          words: [
            { text: "we", start: 25.0, end: 25.3 },
            { text: "don’t", start: 25.3, end: 25.6 },
            { text: "want", start: 25.6, end: 25.9 },
            { text: "to", start: 25.9, end: 26.2 },
            { text: "be", start: 26.2, end: 26.5 },
            { text: "last", start: 26.5, end: 26.8 },
            { text: "in", start: 26.8, end: 27.1 },
            { text: "line.", start: 27.1, end: 27.5 }
          ]
        },

        {
          start: 28.3, end: 33.9,
          words: [
            { text: "Kylie", start: 28.5, end: 28.9 },
            { text: "and", start: 28.9, end: 29.2 },
            { text: "Stacy", start: 29.2, end: 29.6 },
            { text: "line", start: 29.6, end: 29.9 },
            { text: "up", start: 29.9, end: 30.2 },
            { text: "outside", start: 30.2, end: 30.6 },
            { text: "the", start: 30.6, end: 30.9 },
            { text: "classroom", start: 30.9, end: 31.4 },
            { text: "and", start: 31.4, end: 31.7 },
            { text: "when", start: 31.7, end: 32.0 },
            { text: "all", start: 32.0, end: 32.3 },
            { text: "the", start: 32.3, end: 32.6 },
            { text: "students", start: 32.6, end: 33.1 },
            { text: "are", start: 33.1, end: 33.4 },
            { text: "out", start: 33.4, end: 33.7 }
          ]
        },

        {
          start: 34.5, end: 37.9,
          words: [
            { text: "Mrs.", start: 35.0, end: 35.3 },
            { text: "Bell", start: 35.3, end: 35.7 },
            { text: "leads", start: 35.7, end: 36.1 },
            { text: "them", start: 36.1, end: 36.4 },
            { text: "towards", start: 36.4, end: 36.9 },
            { text: "the", start: 36.9, end: 37.2 },
            { text: "auditorium.", start: 37.2, end: 37.8 }


          ]
        },

        {
          start: 38.0, end: 39.9,
          words: [
            { text: "Hurry", start: 38.3, end: 38.7 },
            { text: "up,", start: 38.7, end: 39.0 },
            { text: "Kylie", start: 39.0, end: 39.4 }
          ]
        },

        {
          start: 40.0, end: 43.0,
          words: [
            { text: "someone", start: 40.5, end: 40.9 },
            { text: "tells", start: 40.9, end: 41.2 },
            { text: "her", start: 41.2, end: 41.4 },
            { text: "as", start: 41.4, end: 41.6 },
            { text: "they", start: 41.6, end: 41.8 },
            { text: "bump", start: 41.8, end: 42.1 },
            { text: "into", start: 42.1, end: 42.4 },
            { text: "her.", start: 42.4, end: 42.7 }
          ]
        },

        {
          start: 43.7, end: 49.0,
          words: [
            { text: "Kylie", start: 44.0, end: 44.4 },
            { text: "trips", start: 44.4, end: 44.7 },
            { text: "and", start: 44.7, end: 45.0 },
            { text: "is", start: 45.0, end: 45.2 },
            { text: "still", start: 45.2, end: 45.5 },
            { text: "rubbing", start: 45.5, end: 45.9 },
            { text: "her", start: 45.9, end: 46.1 },
            { text: "elbow", start: 46.1, end: 46.5 },
            { text: "as", start: 46.5, end: 46.7 },
            { text: "she", start: 46.7, end: 46.9 },
            { text: "tries", start: 46.9, end: 47.2 },
            { text: "to", start: 47.2, end: 47.4 },
            { text: "keep", start: 47.4, end: 47.7 },
            { text: "up.", start: 47.7, end: 48.0 }
          ]
        },
      ]
    },

    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 0, end: 4.5,
          words: [
            { text: "Kylie", start: 0.1, end: 0.5 },
            { text: "balls up", start: 0.5, end: 1.0 },
            { text: "her", start: 1.0, end: 1.3 },
            { text: "fists", start: 1.3, end: 1.7 },
            { text: "and", start: 2.3, end: 2.6 },
            { text: "knows", start: 2.6, end: 2.9 },
            { text: "that", start: 2.9, end: 3.2 },
            { text: "she", start: 3.2, end: 3.5 },
            { text: "is", start: 3.5, end: 3.8 },
            { text: "getting", start: 3.8, end: 4.1 },
            { text: "angry.", start: 4.1, end: 4.4 }
          ]
        },

        {
          start: 5.0, end: 13.5,
          words: [
            { text: "The", start: 5.3, end: 5.6 },
            { text: "class", start: 5.6, end: 5.9 },
            { text: "is", start: 5.9, end: 6.2 },
            { text: "almost", start: 6.2, end: 6.5 },
            { text: "at", start: 6.5, end: 6.8 },
            { text: "the", start: 6.8, end: 7.1 },
            { text: "auditorium", start: 7.1, end: 7.4 },
            { text: "when", start: 7.8, end: 8.1 },
            { text: "two", start: 8.1, end: 8.4 },
            { text: "girls", start: 8.4, end: 8.7 },
            { text: "go", start: 8.7, end: 9.0 },
            { text: "around", start: 9.0, end: 9.3 },
            { text: "Kylie", start: 9.3, end: 9.6 },
            { text: "and", start: 9.9, end: 10.2 },
            { text: "get", start: 10.2, end: 10.5 },
            { text: "into", start: 10.5, end: 10.8 },
            { text: "the", start: 10.8, end: 11.1 },
            { text: "line", start: 11.1, end: 11.4 },
            { text: "in", start: 11.4, end: 11.7 },
            { text: "front", start: 11.7, end: 12.0 },
            { text: "of", start: 12.0, end: 12.3 },
            { text: "her", start: 12.3, end: 12.6 },
            { text: "and", start: 12.6, end: 12.9 },
            { text: "Stacy.", start: 12.9, end: 13.2 }
          ]
        },

        {
          start: 16.0, end: 17.0,
          words: [
            { text: "Hey!’", start: 16.5, end: 17.0 },
          ]
        },

        {
          start: 17.5, end: 19.5,
          words: [
            { text: "You’re", start: 17.5, end: 17.8 },
            { text: "too", start: 17.8, end: 18.1 },
            { text: "slow,", start: 18.1, end: 18.4 },
            { text: "Kylie", start: 18.4, end: 18.7 }
          ]
        },

        {
          start: 18.8, end: 23.2,
          words: [
            { text: "they", start: 18.8, end: 19.2 },
            { text: "tell", start: 19.2, end: 19.6 },
            { text: "her", start: 19.6, end: 19.9 },
            { text: "and", start: 21.0, end: 21.3 },
            { text: "turn", start: 21.3, end: 21.6 },
            { text: "back", start: 21.6, end: 21.9 },
            { text: "to", start: 21.9, end: 22.2 },
            { text: "face", start: 22.2, end: 22.5 },
            { text: "the", start: 22.5, end: 22.8 },
            { text: "line.", start: 22.8, end: 23.1 }

          ]
        },

        {
          start: 23.3, end: 26.8,
          words: [
            { text: "Kylie", start: 23.5, end: 23.8 },
            { text: "feels", start: 23.8, end: 24.1 },
            { text: "her", start: 24.1, end: 24.4 },
            { text: "face", start: 24.4, end: 24.7 },
            { text: "getting", start: 24.7, end: 25.0 },
            { text: "red", start: 25.0, end: 25.3 },
            { text: "as", start: 25.3, end: 25.6 },
            { text: "she", start: 25.6, end: 25.9 },
            { text: "gets", start: 25.9, end: 26.2 },
            { text: "angrier.", start: 26.2, end: 26.5 }
          ]
        },

        {
          start: 26.9, end: 33.0,
          words: [
            { text: "Her", start: 27.0, end: 27.3 },
            { text: "elbow", start: 27.3, end: 27.6 },
            { text: "still", start: 27.6, end: 27.9 },
            { text: "hurts", start: 27.9, end: 28.2 },
            { text: "and", start: 28.2, end: 28.5 },
            { text: "now", start: 28.5, end: 28.8 },
            { text: "she’s", start: 28.8, end: 29.1 },
            { text: "almost", start: 29.1, end: 29.4 },
            { text: "at", start: 30.5, end: 30.8 },
            { text: "the", start: 30.8, end: 31.1 },
            { text: "back", start: 31.1, end: 31.4 },
            { text: "of", start: 31.4, end: 31.7 },
            { text: "the", start: 31.7, end: 32.0 },
            { text: "line.", start: 32.0, end: 32.3 }
          ]
        }
      ]
    },

    {
      url: video5,
      title: "Section 5",
      subtitles: [
        {
          start: 0.0, end: 2.0,
          words: [
            { text: "Kylie", start: 0.1, end: 0.4 },
            { text: "takes", start: 0.4, end: 0.7 },
            { text: "a", start: 0.7, end: 0.9 },
            { text: "few", start: 0.9, end: 1.2 },
            { text: "deep", start: 1.2, end: 1.5 },
            { text: "breaths.", start: 1.5, end: 1.9 }

          ]
        },

        {
          start: 2.3, end: 6.0,
          words: [
            { text: "She", start: 2.5, end: 2.8 },
            { text: "knows", start: 2.8, end: 3.3 },
            { text: "her", start: 3.5, end: 3.8 },
            { text: "anger", start: 3.8, end: 4.2 },
            { text: "is", start: 4.2, end: 4.4 },
            { text: "almost", start: 4.4, end: 4.8 },
            { text: "at", start: 4.8, end: 5.0 },
            { text: "boiling", start: 5.0, end: 5.4 },
            { text: "point", start: 5.4, end: 5.8 }
          ]
        },

        {
          start: 6.6, end: 9.5,
          words: [
            { text: "Kylie", start: 7.5, end: 7.8 },
            { text: "turns", start: 7.8, end: 8.1 },
            { text: "to", start: 8.1, end: 8.4 },
            { text: "Stacy", start: 8.4, end: 8.7 },
            { text: "and", start: 8.7, end: 9.0 },
            { text: "says", start: 9.0, end: 9.3 }
          ]
        },

        {
          start: 10.0, end: 17.5,
          words: [
            { text: "I", start: 11.8, end: 12.0 },
            { text: "felt", start: 12.0, end: 12.3 },
            { text: "so", start: 12.3, end: 12.6 },
            { text: "angry", start: 12.6, end: 12.9 },

            { text: "I", start: 13.4, end: 13.7 },
            { text: "almost", start: 13.7, end: 14.0 },
            { text: "pushed", start: 14.0, end: 14.3 },
            { text: "them,", start: 14.3, end: 14.6 },

            { text: "but", start: 15.0, end: 15.3 },
            { text: "I", start: 15.3, end: 15.6 },
            { text: "calmed", start: 15.6, end: 15.9 },
            { text: "myself", start: 15.9, end: 16.2 },
            { text: "before", start: 16.2, end: 16.5 },
            { text: "I", start: 16.5, end: 16.8 },
            { text: "did", start: 16.8, end: 17.1 },
            { text: "anything.", start: 17.1, end: 17.4 }
          ]
        },
      ]
    },

    {
      url: video6,
      title: "Section 6",
      subtitles: [
        {
          start: 0, end: 1.5,
          words: [
            { text: "Good", start: 0.3, end: 0.6 },
            { text: "for", start: 0.6, end: 0.9 },
            { text: "you", start: 0.9, end: 1.2 }
          ]
        },

        {
          start: 1.9, end: 5.5,
          words: [
            { text: "Stacy", start: 2.3, end: 2.6 },
            { text: "tells", start: 2.6, end: 2.9 },
            { text: "her", start: 2.9, end: 3.2 },
            { text: "as", start: 3.2, end: 3.5 },
            { text: "they", start: 3.5, end: 3.8 },
            { text: "walk", start: 3.8, end: 4.1 },
            { text: "into", start: 4.1, end: 4.4 },
            { text: "the", start: 4.4, end: 4.7 },
            { text: "auditorium.", start: 4.7, end: 5.2 }
          ]
        },
      ]
    },

    {
      url: video7,
      title: "Section 7",
      subtitles: [
        {
          start: 0.0, end: 3.0,
          words: [
            { text: "Look,", start: 0.3, end: 0.6 },
            { text: "there", start: 0.6, end: 0.9 },
            { text: "are", start: 0.9, end: 1.2 },
            { text: "still", start: 1.2, end: 1.5 },
            { text: "plenty", start: 1.5, end: 1.9 },
            { text: "of", start: 1.9, end: 2.1 },
            { text: "seats", start: 2.1, end: 2.4 },
            { text: "free", start: 2.4, end: 2.7 }

          ]
        },

        {
          start: 3.5, end: 5.9,
          words: [
            { text: "I’m", start: 3.8, end: 4.1 },
            { text: "so", start: 4.1, end: 4.3 },
            { text: "excited", start: 4.3, end: 4.7 },
            { text: "about", start: 4.7, end: 5.0 },
            { text: "the", start: 5.0, end: 5.2 },
            { text: "concert!", start: 5.2, end: 5.6 }
          ]
        },

        {
          start: 7.4, end: 9.0,
          words: [
            { text: "Me", start: 7.5, end: 8.3 },
            { text: "too!", start: 8.3, end: 8.8 }
          ]
        },

        {
          start: 9.5, end: 14.0,
          words: [
            { text: "Kylie", start: 10.0, end: 10.3 },
            { text: "replies,", start: 10.3, end: 10.7 },
            { text: "for", start: 10.7, end: 11.0 },
            { text: "getting", start: 11.0, end: 11.4 },
            { text: "about", start: 11.4, end: 11.7 },
            { text: "the", start: 11.7, end: 12.0 },
            { text: "girls", start: 12.0, end: 12.3 },
            { text: "who", start: 12.3, end: 12.6 },
            { text: "made", start: 12.6, end: 12.9 },
            { text: "her", start: 12.9, end: 13.2 },
            { text: "angry.", start: 13.2, end: 13.6 }
          ]
        },

        {
          start: 14.3, end: 17.5,
          words: [
            { text: "There’s", start: 14.5, end: 14.8 },
            { text: "Sunita.", start: 14.8, end: 15.2 },
            { text: "Let’s", start: 15.2, end: 15.5 },
            { text: "go", start: 15.5, end: 15.7 },
            { text: "and", start: 15.7, end: 16.0 },
            { text: "sit", start: 16.0, end: 16.3 },
            { text: "with", start: 16.3, end: 16.6 },
            { text: "her", start: 16.6, end: 17.0 }
          ]
        },

        {
          start: 17.9, end: 21.0,
          words: [
            { text: "Kylie", start: 18.0, end: 18.3 },
            { text: "is", start: 18.3, end: 18.5 },
            { text: "happy", start: 18.5, end: 18.9 },
            { text: "she", start: 18.9, end: 19.1 },
            { text: "did", start: 19.1, end: 19.3 },
            { text: "not", start: 19.3, end: 19.5 },
            { text: "reach", start: 19.5, end: 19.8 },
            { text: "her", start: 19.8, end: 20.0 },
            { text: "boiling", start: 20.0, end: 20.4 },
            { text: "point.", start: 20.4, end: 20.8 }
          ]
        },
      ]
    },

    {
      url: img,
      title: "Section 6",
      subtitles: [
      ]
    },


  ];


  const cloudPositions = {

    0: [{ bottom: '35rem', left: '50%', transform: 'translateX(-50%)', isFlipped: true }],

    1: [
      { top: '15%', left: '10%' },
      { top: '15%', left: '15%' },
      { top: '15%', left: '15%' },
      { top: '15%', left: '10%' },
      { top: '15%', left: '15%' },
      { top: '15%', left: '15%' },
      { top: '15%', left: '15%' },
      { top: '15%', left: '15%' },
      { top: '15%', left: '15%' }
    ],

    2: [
      { top: '10%', right: '5%', isFlipped: true },
      { top: '1%', left: '45%', isFlipped: true },
      { top: '1%', left: '45%', isFlipped: true },
      { top: '10%', right: '5%', isFlipped: true },
      { top: '1%', left: '45%', isFlipped: true },
      { top: '1%', left: '45%', isFlipped: true },
      { top: '10%', right: '5%', isFlipped: true },
      { top: '1%', left: '45%', isFlipped: true },
      { top: '1%', left: '45%', isFlipped: true },
      { top: '10%', right: '5%', isFlipped: true },
      { top: '1%', left: '45%', isFlipped: true },
      { top: '1%', left: '45%', isFlipped: true },
      { top: '1%', left: '45%', isFlipped: true }
    ],

    3: [
      { bottom: '80%', left: '28%', isFlipped: true },
      { top: '10%', left: '45%' },
      { bottom: '80%', left: '28%', isFlipped: true },
      { top: '10%', left: '45%' },
      { bottom: '80%', left: '28%', isFlipped: true },
      { top: '10%', left: '45%' },
      { bottom: '80%', left: '28%', isFlipped: true }
    ],

    4: [
      { top: '10%', left: '30%', isFlipped: true },
      { top: '5%', left: '35%' },
      { top: '10%', left: '30%', isFlipped: true },
      { top: '5%', left: '35%' },
      { top: '10%', left: '30%', isFlipped: true }
    ],
    5: [
      { bottom: '80%', left: '48%', },
      { top: '20%', left: '25%' },
      { top: '10%', left: '50%', isFlipped: true },
      { top: '70%', left: '50%', isFlipped: true }
    ],
    6: [
      { bottom: '80%', left: '48%', transform: 'translateX(-50%)' },
      { top: '10%', left: '10%' },
      { top: '10%', left: '50%', isFlipped: true },

      { bottom: '80%', left: '48%', transform: 'translateX(-50%)' },
      { top: '10%', left: '10%' },
      { top: '10%', left: '50%', isFlipped: true },
    ],
  };

  const currentVideoData = videos[currentVideo];
  const activeSubtitleIndex = currentVideoData.subtitles.findIndex(
    sub => currentTime >= sub.start && currentTime < sub.end
  );


  const activeSubtitle = activeSubtitleIndex !== -1
    ? currentVideoData.subtitles[activeSubtitleIndex]
    : null;

  const activeCloudPosition = activeSubtitleIndex !== -1
    ? cloudPositions[currentVideo]?.[activeSubtitleIndex]
    : null;
  const handleEnded = useCallback(() => {
    const isLast = currentVideo === videos.length - 1;
    const currentItem = videos[currentVideo];

    // إذا آخر عنصر أو العنصر صورة
    if (isLast || !currentItem.url.endsWith(".mp4")) {
      ValidationAlert.storyEnd(() => {
        navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
      });
    } else {
      setShowBanner(false);
      setCurrentVideo(prev => prev + 1);
    }
  }, [currentVideo, videos, navigate, unitId, lessonId]);
  // Preload next video
  useEffect(() => {
    const nextVideoIndex = currentVideo + 1;
    if (nextVideoIndex < videos.length) {
      const nextVideoUrl = videos[nextVideoIndex].url;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = nextVideoUrl;
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [currentVideo, videos]);

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

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
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      // videoRef.current.load();
      // setCurrentTime(0);
      setShowBubble(true);

      if (showBanner) {
        videoRef.current.pause();
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => { });
        }
      }
    }
  }, [currentVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (currentVideo === 4 && isPlaying) {
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
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);


  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [currentVideo, isPlaying, playbackSpeed]);


  useEffect(() => {
    const currentItem = videos[currentVideo];
    if (!currentItem.url.endsWith(".mp4")) {
      handleEnded();
    }
  }, [currentVideo, handleEnded]);



  const handlePrevious = () => {
    setShowBanner(false);
    setCurrentVideo(prev => (prev > 0 ? prev - 1 : videos.length - 1));
  };

  const handleNext = () => {
    setShowBanner(false);
    setCurrentVideo(prev => (prev < videos.length - 1 ? prev + 1 : 0));
  };






  const toggleWordSelection = (wordText) => {
    const correctWords = ["calmed", "myself"];
    const cleanedWord = wordText.replace('.', '');

    if (correctWords.includes(cleanedWord)) {
      setSelectedWords(prev =>
        prev.includes(wordText)
          ? prev.filter(w => w !== wordText)
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

  const toggleMute = () => setIsMuted(prev => !prev);

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
      container.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };


  return (
    <div className="story-page-container">
      <div className="w-full max-w-6xl">

        <div ref={fullscreenContainerRef} className="video-wrapper">
          {videos.map((vid, index) => (
            <link key={index} rel="preload" as="video" href={vid.url} />
          ))}
          {currentVideoData.url.endsWith(".mp4") ? (
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
          ) : (
            <img
              src={currentVideoData.url}
              alt={currentVideoData.title || "Image"}
              className="w-full aspect-video object-cover"
            />
          )}

          {showFeedback && (
            <div className="feedback-popup">
              Good Job! 👍
            </div>
          )}

          {currentVideo === 4 && showBanner && (
            <div className="instruction-banner show">
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                Highlight how Kylie manages her anger.
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                
              </p>
            </div>
          )}

          {activeSubtitle && activeCloudPosition && showBubble && showSubtitles && (
            <div
              className="subtitle-container"
              style={activeCloudPosition}
            >
              <div className={`bubble-cloud animate__animated animate__fadeIn ${activeCloudPosition.isFlipped ? 'flipped' : ''}`}>
                <p>
                  {activeSubtitle.words.map((word, index) => {
                    const isHighlighted = currentTime >= word.start && currentTime < word.end;
                    return (
                      <span
                        key={index}
                        onClick={() => {
                          if (currentVideo === 4) toggleWordSelection(word.text);
                        }}
                        className={`
                word-span
                ${isHighlighted ? 'active-word' : ''}
                ${currentVideo === 4 && selectedWords.includes(word.text) ? 'selected-word' : ''}
                ${currentVideo === 4 ? 'clickable-word' : ''}
              `}
                      >
                        {word.text}{' '}
                      </span>
                    );
                  })}
                </p>
                <button className="close" onClick={() => setShowBubble(false)}>×</button>
              </div>
            </div>
          )}

          <div className="video-overlay" />
          <div className="controls-container">
            <div className="controlbbtn">
              <button onClick={handlePrevious} className="control-btn left-nav-btn">
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button onClick={handleNext} className="control-btn right-nav-btn">
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            <div className="controls-wrapper-new">
              <div className="controls-row">
                <div className="controls-group-left">
                  <button onClick={() => setShowSubtitles(!showSubtitles)} className="control-btn" title="Subtitles">
                    <Subtitles className="w-6 h-6" />
                    <span className="control-label">Subtitle</span>
                  </button>
                  <div
                    className="volume-control"
                    onMouseEnter={() => setShowVolumeSlider(true)}
                    onMouseLeave={() => setShowVolumeSlider(false)}
                  >
                    <button onClick={toggleMute} className="control-btn">
                      {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
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
                      onClick={() => setShowSpeedMenu(prev => !prev)}
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
                            className={playbackSpeed === speed ? 'active-speed' : ''}
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

          <div className="progress-indicator-container">
            {videos.map((_, index) => (
              <div key={index} className={`progress-dot ${index === currentVideo ? 'active' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
