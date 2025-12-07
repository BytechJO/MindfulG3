import React, { useState, useRef, useEffect, useCallback } from 'react';
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
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';
import ValidationAlert from '../../shared/ValidationAlert';

import video1 from "./assets/1.mp4";
import video2 from "./assets/2.mp4";
import video3 from "./assets/3.mp4";
import video4 from "./assets/4.mp4";
import video5 from "./assets/5-1.mp4";
import video6 from "./assets/5-2.mp4";
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
  const [playbackSpeed, setPlaybackSpeed] = useState(0.75);
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
      ]
    },

    {
      url: video2,
      title: "Section 2",
      subtitles: [
        {
         

        },
        {
       


        },
        {
      

        },
        {
     

        },
      ]
    },

    {
      url: video3,
      title: "Section 3",
      subtitles: [
        {
      
        },
        {
          start: 3.5, end: 5.3,
          words: [
            { text: "How", start: 3.8, end: 4.0 },
            { text: "do", start: 4.0, end: 4.2 },
            { text: "they", start: 4.2, end: 4.4 },
            { text: "do", start: 4.6, end: 4.8 },
            { text: "it?", start: 4.8, end: 5.0 },

          ]
        },
        {
      

        },
        {
   

        },
        {
       

        },
        {
   
        },
        {
     

        },
      ]
    },

    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
    
        },
        {
         
        },
        {
       

        },
        {
          start: 12.0, end: 16.8,
          words: [
            { text: "We", start: 14.5, end: 14.8 },
            { text: "played", start: 14.8, end: 15.1 },
            { text: "your", start: 15.1, end: 15.4 },
            { text: "game", start: 15.4, end: 15.7 },
            { text: "first", start: 15.7, end: 16.0 },
            { text: "last", start: 16.0, end: 16.3 },
            { text: "time,", start: 16.3, end: 16.6 }
          ]


        },
        {
          start: 17.0, end: 19.2,
          words: [
            { text: "Your", start: 17.0, end: 17.3 },
            { text: "game", start: 17.3, end: 17.6 },
            { text: "will", start: 17.6, end: 17.9 },
            { text: "take", start: 17.9, end: 18.2 },
            { text: "longer", start: 18.2, end: 18.5 },
            { text: "than", start: 18.5, end: 18.8 },
            { text: "mine,", start: 18.8, end: 19.1 }
          ]

        },
        {
          start: 19.2, end: 23.6,
          words: [
            { text: "We", start: 19.1, end: 19.4 },
            { text: "need", start: 19.4, end: 19.7 },
            { text: "a", start: 19.7, end: 20.0 },
            { text: "fair", start: 20.0, end: 20.3 },
            { text: "way", start: 20.3, end: 20.6 },
            { text: "to", start: 20.6, end: 20.9 },
            { text: "help", start: 20.9, end: 21.2 },
            { text: "us", start: 21.2, end: 21.5 },
            { text: "decide", start: 21.5, end: 21.8 },
            { text: "which", start: 21.8, end: 22.1 },
            { text: "game", start: 22.1, end: 22.4 },
            { text: "we", start: 22.4, end: 22.7 },
            { text: "should", start: 22.7, end: 23.0 },
            { text: "play", start: 23.0, end: 23.3 },
            { text: "first,", start: 23.3, end: 23.6 }
          ]

        },
        {
          start: 23.6, end: 28.5,
          words: [
            { text: "Let’s", start: 25.7, end: 26.0 },
            { text: "play", start: 26.0, end: 26.3 },
            { text: "rock,", start: 26.3, end: 26.6 },
            { text: "paper,", start: 26.6, end: 26.9 },
            { text: "scissors,", start: 26.9, end: 27.2 },
            { text: "best", start: 27.2, end: 27.5 },
            { text: "out", start: 27.5, end: 27.8 },
            { text: "of", start: 27.8, end: 28.1 },
            { text: "three.", start: 28.1, end: 28.4 }
          ]


        },
      ]
    },

    {
      url: video5,
      title: "Section 5",
      subtitles: [
        {
      
        },
        {
          start: 2.0, end: 4.0,
          words: [
            { text: "That’s", start: 2.0, end: 2.3 },
            { text: "a", start: 2.3, end: 2.6 },
            { text: "great", start: 2.6, end: 2.9 },
            { text: "idea,’", start: 2.9, end: 3.2 }
          ]
        },
        {
          start: 4.1, end: 8.2,
          words: [
            { text: "Also,", start: 4.4, end: 4.7 },
            { text: "try", start: 4.7, end: 5.0 },
            { text: "to", start: 5.0, end: 5.3 },
            { text: "have", start: 5.3, end: 5.6 },
            { text: "fun", start: 5.6, end: 5.9 },
            { text: "when", start: 5.9, end: 6.2 },
            { text: "you’re", start: 6.2, end: 6.5 },
            { text: "playing", start: 6.5, end: 6.8 },
            { text: "your", start: 6.8, end: 7.1 },
            { text: "friend’s", start: 7.1, end: 7.4 },
            { text: "game", start: 7.4, end: 7.7 },
            { text: "too", start: 7.7, end: 8.1 },
          ]
        },
        {
          start: 8.2, end: 11.0,
          words: [
            { text: "you", start: 9.2, end: 9.5 },
            { text: "should", start: 9.5, end: 9.8 },
            { text: "enjoy", start: 9.8, end: 10.1 },
            { text: "each", start: 10.1, end: 10.4 },
            { text: "other’s", start: 10.4, end: 10.7 },
            { text: "favourite", start: 10.7, end: 11.0 },
            { text: "games.", start: 11.0, end: 11.6 }
          ]

        },
      ]
    },

    {
      url: video6,
      title: "Section 6",
      subtitles: [
        {
       
        },

        {
          start: 4.1, end: 6.5,
          words: [
            { text: "OK,", start: 4.5, end: 5.0 },
            { text: "that’s", start: 5.2, end: 5.7 },
            { text: "fair.", start: 5.7, end: 6.3 }
          ]
        },

        {
          start: 6.8, end: 10.5,
          words: [
            { text: "We", start: 7.0, end: 7.3 },
            { text: "can", start: 7.3, end: 7.6 },
            { text: "play", start: 7.6, end: 7.9 },
            { text: "your", start: 7.9, end: 8.2 },
            { text: "game", start: 8.2, end: 8.5 },
            { text: "first", start: 8.5, end: 8.8 },
            { text: "David", start: 8.8, end: 9.1 },
            { text: "and", start: 9.1, end: 9.4 },
            { text: "then", start: 9.4, end: 9.7 },
            { text: "play", start: 9.7, end: 10.0 },
            { text: "mine,", start: 10.0, end: 10.3 }
          ]
        },

        {
       
        },

        {
      
        }
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

    0: [
    ],

    1: [
      { top: '20%', left: '40%', isFlipped: true },
      { top: '10%', left: '55%', isFlipped: true },
      { top: '10%', left: '25%' },
      { top: '10%', left: '25%' },
      { top: '10%', left: '0%' },
      { top: '10%', right: '30%', isFlipped: true },
    ],

    2: [
      { top: '10%', right: '10%', isFlipped: true },
      { top: '15%', left: '70%', isFlipped: true },
      { top: '10%', left: '70%', isFlipped: true },
      { top: '10%', left: '15%' },
      { top: '10%', left: '15%' },
      { top: '10%', left: '15%' },
      { top: '10%', left: '15%' },

    ],

    3: [
      { bottom: '60%', left: '60%', isFlipped: true },
      { top: '20%', left: '5%' },
      { top: '10%', left: '35%', isFlipped: true },
      { top: '15%', left: '45%', isFlipped: false },
      { top: '10%', left: '30%', isFlipped: true },
      { top: '10%', left: '45%', isFlipped: false },
      { top: '10%', left: '45%', isFlipped: false },
    ],

    4: [
      { top: '15%', right: '25%' },
      { top: '15%', left: '35%', isFlipped: true },
      { top: '15%', left: '40%', isFlipped: true },
      { top: '15%', right: '25%', isFlipped: false },
    ],

    5: [
      { top: '15%', right: '25%' },
      { top: '15%', left: '35%', isFlipped: true },
      { top: '15%', left: '40%', isFlipped: true },
      { top: '15%', right: '25%', isFlipped: false },
      { top: '15%', left: '25%', isFlipped: true },
    ],
  };

   const extraBubblesData = [
      {
        videoIndex: 1,
           start: 0, end: 3.0,
          words: [
            { text: "David", start: 0.2, end: 0.5 },
            { text: "and", start: 0.5, end: 0.8 },
            { text: "Milo", start: 0.8, end: 1.1 },
            { text: "live", start: 1.1, end: 1.4 },
            { text: "next", start: 1.4, end: 1.7 },
            { text: "door", start: 1.7, end: 2.0 },
            { text: "to", start: 2.0, end: 2.3 },
            { text: "each", start: 2.3, end: 2.6 },
            { text: "other.", start: 2.6, end: 2.9 }
          ]
      },
      {
        videoIndex: 1,
            start: 3.6, end: 8.5,
          words: [
            { text: "David", start: 4.0, end: 4.3 },
            { text: "likes", start: 4.3, end: 4.6 },
            { text: "watching", start: 4.6, end: 4.9 },
            { text: "TV,", start: 4.9, end: 5.9 },
            { text: "and", start: 6.1, end: 6.4 },
            { text: "Milo", start: 6.4, end: 6.7 },
            { text: "likes", start: 6.7, end: 7.0 },
            { text: "playing", start: 7.0, end: 7.3 },
            { text: "computer", start: 7.3, end: 7.6 },
            { text: "games.", start: 7.6, end: 7.9 }

          ]
      },
          {
        videoIndex: 1,
           start: 8.5, end: 13.4,
          words: [
            { text: "David", start: 9.0, end: 9.3 },
            { text: "likes", start: 9.3, end: 9.6 },
            { text: "playing", start: 9.6, end: 9.9 },
            { text: "cricket,", start: 9.9, end: 10.2 },
            { text: "while", start: 11.7, end: 12.0 },
            { text: "Milo", start: 12.0, end: 12.6 },
            { text: "prefers", start: 12.6, end: 12.9 },
            { text: "basketball.", start: 12.9, end: 13.2 },


          ]
      },
  
      {
        videoIndex: 1,
                start: 14.4, end: 16.8,
          words: [
            { text: "They", start: 15.0, end: 15.3 },
            { text: "have", start: 15.3, end: 15.6 },
            { text: "lots", start: 15.6, end: 15.9 },
            { text: "of", start: 15.9, end: 16.2 },
            { text: "differences.", start: 16.2, end: 16.6 }
          ]
      },
      {
        videoIndex: 2,
        start: 0, end: 2.5,
          words: [
            { text: "David", start: 0.2, end: 0.5 },
            { text: "and", start: 0.5, end: 0.8 },
            { text: "Milo", start: 0.8, end: 1.1 },
            { text: "are", start: 1.1, end: 1.4 },
            { text: "very", start: 1.4, end: 1.7 },
            { text: "good", start: 1.7, end: 2.0 },
            { text: "friends!", start: 2.0, end: 2.3 },
          ]
      },
      {
        videoIndex: 2,
          start: 5.5, end: 10.0,
          words: [
            { text: "David", start: 5.8, end: 6.1 },
            { text: "and", start: 6.1, end: 6.4 },
            { text: "Milo", start: 6.4, end: 6.7 },
            { text: "know", start: 6.7, end: 7.0 },
            { text: "they", start: 7.0, end: 7.3 },
            { text: "have", start: 7.3, end: 7.6 },
            { text: "more", start: 7.6, end: 7.9 },
            { text: "fun", start: 7.9, end: 8.2 },
            { text: "playing", start: 8.2, end: 8.5 },
            { text: "together", start: 8.5, end: 8.8 },
            { text: "than", start: 8.8, end: 9.1 },
            { text: "on", start: 9.1, end: 9.4 },
            { text: "their", start: 9.4, end: 9.7 },
            { text: "own.", start: 9.7, end: 10.0 }
          ]
      },
      {
        videoIndex: 2,
          start: 10.0, end: 13.8,
          words: [

            { text: "Even", start: 10.5, end: 10.8 },
            { text: "if", start: 10.8, end: 11.0 },
            { text: "they", start: 11.0, end: 11.3 },
            { text: "are", start: 11.3, end: 11.6 },
            { text: "not", start: 11.6, end: 11.9 },
            { text: "doing", start: 11.9, end: 12.2 },
            { text: "their", start: 12.2, end: 12.5 },
            { text: "favourite", start: 12.5, end: 12.9 },
            { text: "activity.", start: 12.9, end: 13.6 }
          ]
      },
  
      {
        videoIndex: 2,
   start: 14.4, end: 18.7,
          words: [
            { text: "David", start: 15.0, end: 15.3 },
            { text: "and", start: 15.3, end: 15.6 },
            { text: "Milo", start: 15.6, end: 15.9 },
            { text: "work", start: 15.9, end: 16.2 },
            { text: "together", start: 16.2, end: 16.5 },
            { text: "during", start: 16.5, end: 16.8 },
            { text: "their", start: 16.8, end: 17.1 },
            { text: "favourite", start: 17.1, end: 17.4 },
            { text: "activities.", start: 17.4, end: 18.7 }
          ]
      },
      {
        videoIndex: 2,
             start: 18.7, end: 25.5,
          words: [
            { text: "Milo", start: 19.8, end: 20.1 },
            { text: "watches", start: 20.1, end: 20.4 },
            { text: "TV", start: 20.4, end: 20.7 },
            { text: "with", start: 20.7, end: 21.0 },
            { text: "David", start: 21.0, end: 21.3 },
            { text: "and", start: 22.2, end: 22.5 },
            { text: "waits", start: 22.5, end: 22.8 },
            { text: "for", start: 22.8, end: 23.1 },
            { text: "his", start: 23.1, end: 23.4 },
            { text: "turn", start: 23.4, end: 23.7 },
            { text: "to", start: 23.7, end: 24.0 },
            { text: "play", start: 24.0, end: 24.3 },
            { text: "computer", start: 24.3, end: 24.6 },
            { text: "games.", start: 24.6, end: 24.9 }
          ]
      },
       {
        videoIndex: 2,
               start: 25.0, end: 29.5,
          words: [
            { text: "David", start: 25.2, end: 25.5 },
            { text: "plays", start: 25.5, end: 25.8 },
            { text: "basketball", start: 25.8, end: 26.1 },
            { text: "with", start: 26.1, end: 26.4 },
            { text: "Milo", start: 26.4, end: 26.7 },
            { text: "and", start: 26.7, end: 27.0 },
            { text: "waits", start: 27.0, end: 27.3 },
            { text: "for", start: 27.3, end: 27.6 },
            { text: "his", start: 27.6, end: 27.9 },
            { text: "turn", start: 27.9, end: 28.2 },
            { text: "to", start: 28.2, end: 28.5 },
            { text: "play", start: 28.5, end: 28.8 },
            { text: "cricket.", start: 28.8, end: 29.1 }
          ]
      },
      {
        videoIndex: 3,
          start: 0, end: 5.1,
          words: [
            { text: "One", start: 0.2, end: 0.6 },
            { text: "day,", start: 0.6, end: 1.0 },
            { text: "the", start: 1.0, end: 1.4 },
            { text: "boys", start: 1.4, end: 1.8 },
            { text: "cannot", start: 1.8, end: 2.2 },
            { text: "decide", start: 2.2, end: 2.6 },
            { text: "which", start: 2.6, end: 3.0 },
            { text: "game", start: 3.0, end: 3.4 },
            { text: "they", start: 3.4, end: 3.6 },
            { text: "will", start: 3.6, end: 4.8 },
            { text: "play", start: 3.8, end: 4.0 },
            { text: "first,", start: 4.0, end: 4.8 }
          ]
      
      
      },
        {
        videoIndex: 3,
      
       start: 5.2, end: 9.1,
          words: [
            { text: "they", start: 5.4, end: 5.7 },
            { text: "begin", start: 5.7, end: 6.0 },
            { text: "to", start: 6.0, end: 6.3 },
            { text: "disagree", start: 6.3, end: 6.6 },
            { text: "about", start: 6.6, end: 6.9 },
            { text: "which", start: 6.9, end: 7.2 },
            { text: "game", start: 7.2, end: 7.5 },
            { text: "to", start: 7.5, end: 7.8 },
            { text: "play.", start: 7.8, end: 8.1 }
          ]
      
      
      },
      {
        videoIndex: 3,
          start: 9.0, end: 12.0,
          words: [
            { text: "Milo", start: 9.0, end: 9.3 },
            { text: "wants", start: 9.3, end: 9.6 },
            { text: "to", start: 9.6, end: 9.9 },
            { text: "play", start: 9.9, end: 10.2 },
            { text: "tag", start: 10.2, end: 10.5 },
            { text: "and", start: 10.5, end: 10.8 },
            { text: "David", start: 10.8, end: 11.1 },
            { text: "wants", start: 11.1, end: 11.4 },
            { text: "to", start: 11.4, end: 11.7 },
            { text: "race.", start: 11.7, end: 12.0 }
          ]
      
      
      },
      {
        videoIndex: 4,
   
           start: 0, end: 2.0,
          words: [
            { text: "Milo’s", start: 0.2, end: 0.5 },
            { text: "mum", start: 0.5, end: 0.8 },
            { text: "hears", start: 0.8, end: 1.1 },
            { text: "the", start: 1.1, end: 1.4 },
            { text: "boys.", start: 1.4, end: 1.7 }
          ]
      
      
      },
      {
        videoIndex: 5,
         start: 0.2, end: 4.0,
          words: [
            { text: "They", start: 0.5, end: 0.8 },
            { text: "play", start: 0.8, end: 1.1 },
            { text: "rock,", start: 1.1, end: 1.4 },
            { text: "paper,", start: 1.4, end: 1.7 },
            { text: "scissors,", start: 1.7, end: 2.0 },
            { text: "and", start: 2.5, end: 2.8 },
            { text: "David’s", start: 2.8, end: 3.1 },
            { text: "game", start: 3.1, end: 3.4 },
            { text: "wins.", start: 3.4, end: 3.7 }
          ]
      
      
      },
      {
        videoIndex: 5,
     start: 10.8, end: 12.8,
          words: [
            { text: "The", start: 11.0, end: 11.3 },
            { text: "boys", start: 11.3, end: 11.6 },
            { text: "play", start: 11.6, end: 11.9 },
            { text: "happily", start: 11.9, end: 12.2 },
            { text: "together.", start: 12.2, end: 12.5 }
          ]
      
      },
       {
        videoIndex: 5,
          start: 12.9, end: 18.6,
          words: [
            { text: "David", start: 13.8, end: 14.1 },
            { text: "and", start: 14.1, end: 14.4 },
            { text: "Milo", start: 14.4, end: 14.7 },
            { text: "are", start: 14.7, end: 15.0 },
            { text: "happy", start: 15.0, end: 15.3 },
            { text: "they", start: 15.3, end: 15.6 },
            { text: "found", start: 15.6, end: 15.9 },
            { text: "a", start: 15.9, end: 16.2 },
            { text: "fair", start: 16.2, end: 16.5 },
            { text: "way", start: 16.5, end: 16.8 },
            { text: "to", start: 16.8, end: 17.1 },
            { text: "play", start: 17.1, end: 17.4 },
            { text: "together.", start: 17.4, end: 17.7 }
          ]
      
      
      },
    ];
       useEffect(() => {
            const bubbleToShow = extraBubblesData.find(bubble =>
              bubble.videoIndex === currentVideo &&
              currentTime >= bubble.start &&
              currentTime < bubble.end
            );
        
            setExtraBubble(bubbleToShow || null);
        
          }, [currentVideo, currentTime]);

  const currentVideoData = videos[currentVideo];
  const activeSubtitleIndex = currentVideoData.subtitles.findIndex(
    sub => currentTime >= sub.start && currentTime < sub.end
  );


  const isImage = (url) => {
    return /\.(jpeg|jpg|gif|png)$/.test(url);
  };

  const activeSubtitle = activeSubtitleIndex !== -1
    ? currentVideoData.subtitles[activeSubtitleIndex]
    : null;

  const activeCloudPosition = activeSubtitleIndex !== -1
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
      if (!showBanner) video.play().catch(() => { });
    };
    video.addEventListener('canplay', handleCanPlay);
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [currentVideo]);

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
      videoRef.current.load();
      setCurrentTime(0);
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

    if (currentVideo === 3 && isPlaying) {
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




  const handlePrevious = () => {
    setShowBanner(false);
    setCurrentVideo(prev => (prev > 0 ? prev - 1 : videos.length - 1));
  };

 const handleNext = () => {
    if (currentVideo === videos.length - 1) {
      navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
    } else {
      setCurrentVideo(prev => prev + 1);
    }
  };

  const handleEnded = useCallback(() => {
    if (currentVideo === videos.length - 1) {
      ValidationAlert.storyEnd(() => {
        navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
      });
    } else if (currentVideo !== 4) {
      setShowBanner(false);
      setCurrentVideo(prev => prev + 1);
    }
  }, [currentVideo, videos.length, navigate, unitId, lessonId]);

  useEffect(() => {
    // تحقق إذا كانت الصورة آخر عنصر
    if (currentVideo === videos.length - 1 && !currentVideoData.url.endsWith(".mp4")) {
      const timer = setTimeout(() => {
        ValidationAlert.storyEnd(() => {
        navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
      });
      }, 500); // نصف ثانية لتأكد من ظهور الصورة

      return () => clearTimeout(timer);
    }
  }, [currentVideo, currentVideoData, navigate, unitId, lessonId]);


  useEffect(() => {
    if (currentVideo === videos.length - 1 && !currentVideoData.url.endsWith(".mp4")) {
      const timer = setTimeout(() => {
        ValidationAlert.storyEnd(() => {
        navigate(`/unit/${unitId}/lesson/${lessonId}/quiz`);
      });
      }, 500); 

      return () => clearTimeout(timer);
    }
  }, [currentVideo, currentVideoData, navigate, unitId, lessonId]);

  const toggleWordSelection = (wordText) => {
    const correctWords = ["play","rock,","paper,","scissors,"];
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
        if (currentVideo === 3 && showBanner) {
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
            <video key={index} src={vid.url} preload="auto" style={{ display: 'none' }} />
          ))}
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
              autoPlay
              playsInline
              src={currentVideoData.url}
            >
              Your browser does not support the video tag.
            </video>
          )}

          {showFeedback && (
            <div className="feedback-popup">
              Good Job! 👍
            </div>
          )}

          {currentVideo === 3 && showBanner && (
            <div className="instruction-banner show">
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                Highlight how do David and Milo manage
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                to maintain their friendship despite their
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                different preferences for activities.
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
                          if (currentVideo === 3) toggleWordSelection(word.text);
                        }}
                        className={`
                word-span
                ${isHighlighted ? 'active-word' : ''}
                ${currentVideo === 3 && selectedWords.includes(word.text) ? 'selected-word' : ''}
                ${currentVideo === 3 ? 'clickable-word' : ''}
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

                  <button
                    onClick={() => setShowCaption(!showCaption)}
                    className={`control-btn ${!showCaption ? "disabled-btn" : ""}`}
                    title="Caption"
                  >
                    <MessageSquareText className="w-6 h-6" />
                    <span className="control-label">Caption</span>
                  </button>
                  
                  <button
                    onClick={() => setShowSubtitles(!showSubtitles)}
                    className={`control-btn ${!showSubtitles ? "disabled-btn" : ""}`}
                    title="Subtitles"
                  >
                    <Subtitles className="w-6 h-6" />
                    <span className="control-label">Subtitle</span>
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
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default StoryPage;
