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
import video6 from "./assets/6.mp4";



export const StoryPage = () => {
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
  const [showCaption, setShowCaption] = useState(true);
  const [extraBubble, setExtraBubble] = useState(null);

  const availableSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenContainerRef = useRef(null);

  const videos = [
    {
      url: video1,
      title: "Section 1",
      subtitles: [
      ]
    },

    {
      url: video2,
      title: "Section 2",
      subtitles: [
        {
          start: 0, end: 1.8,
          words: [
            { text: "Peter", start: 0.4, end: 0.7 },
            { text: "finds", start: 0.7, end: 1.0 },
            { text: "spelling", start: 1.0, end: 1.4 },
            { text: "difficult.", start: 1.4, end: 1.8 },

          ]
        },
        {
          start: 1.8, end: 7.0,
          words: [
            { "text": "This", "start": 3.2, "end": 3.5 },
            { "text": "week", "start": 3.5, "end": 3.8 },
            { "text": "he", "start": 3.8, "end": 4.1 },
            { "text": "gets", "start": 4.1, "end": 4.4 },
            { "text": "all", "start": 4.4, "end": 4.7 },
            { "text": "the", "start": 4.7, "end": 5.0 },
            { "text": "spelling", "start": 5.0, "end": 5.3 },
            { "text": "words", "start": 5.3, "end": 5.6 },
            { "text": "wrong", "start": 5.6, "end": 5.9 },
            { "text": "in", "start": 5.9, "end": 6.2 },
            { "text": "the", "start": 6.2, "end": 6.5 },
            { "text": "test.", "start": 6.5, "end": 6.8 }
          ]
        },
        {
          start: 7.0, end: 10.4,
          words: [
            { "text": "The", "start": 7.0, "end": 7.3 },
            { "text": "children", "start": 7.3, "end": 7.6 },
            { "text": "sitting", "start": 7.6, "end": 7.9 },
            { "text": "next", "start": 7.9, "end": 8.2 },
            { "text": "to", "start": 8.2, "end": 8.5 },
            { "text": "Peter", "start": 8.5, "end": 8.8 },
            { "text": "are", "start": 8.8, "end": 9.1 },
            { "text": "not", "start": 9.1, "end": 9.4 },
            { "text": "being", "start": 9.4, "end": 9.7 },
            { "text": "kind.", "start": 9.7, "end": 10.0 }
          ]
        },
        {
          start: 10.8, end: 12.0,
          words: [
            { "text": "They", "start": 11.0, "end": 11.3 },
            { "text": "are", "start": 11.3, "end": 11.6 },
            { "text": "laughing.", "start": 11.6, "end": 11.9 }
          ]
        },
        {
          start: 12.0, end: 15.0,
          words: [
            { "text": "One", "start": 12.4, "end": 12.7 },
            { "text": "boy", "start": 12.7, "end": 13.0 },
            { "text": "even", "start": 13.0, "end": 13.3 },
            { "text": "calls", "start": 13.3, "end": 13.6 },
            { "text": "him", "start": 13.6, "end": 13.9 },
            { "text": "names.", "start": 13.9, "end": 14.8 }
          ]
        },
        {
          start: 15.8, end: 18.8,
          words: [
            { "text": "Rose", "start": 16.0, "end": 16.3 },
            { "text": "notices", "start": 16.3, "end": 16.6 },
            { "text": "what", "start": 16.6, "end": 16.9 },
            { "text": "is", "start": 16.9, "end": 17.2 },
            { "text": "happening", "start": 17.2, "end": 17.5 },
            { "text": "and", "start": 17.5, "end": 17.8 },
            { "text": "doesn’t", "start": 17.8, "end": 18.1 },
            { "text": "like", "start": 18.1, "end": 18.4 },
            { "text": "it.", "start": 18.4, "end": 18.7 }
          ]
        },
        {
          start: 18.8, end: 20.8,
          words: [
            { "text": "She", "start": 19.0, "end": 19.3 },
            { "text": "thinks,", "start": 19.3, "end": 20.0 }
          ]
        },
        {
          start: 23.8, end: 25.8,
          words: [
            { "text": "How", "start": 24.0, "end": 24.3 },
            { "text": "can", "start": 24.3, "end": 24.6 },
            { "text": "I", "start": 24.6, "end": 24.9 },
            { "text": "help?", "start": 24.9, "end": 25.2 }
          ]
        },
        {
          start: 25.8, end: 27.6,
          words: [
            { "text": "She", "start": 25.4, "end": 25.7 },
            { "text": "knows", "start": 25.7, "end": 26.0 },
            { "text": "she", "start": 26.0, "end": 26.3 },
            { "text": "should", "start": 26.3, "end": 26.6 },
            { "text": "tell", "start": 26.6, "end": 26.9 },
            { "text": "the", "start": 26.9, "end": 27.2 },
            { "text": "teacher,", "start": 27.2, "end": 27.5 }
          ]
        },
        {
          start: 27.6, end: 34.0,
          words: [
            { "text": "but", "start": 28.8, "end": 29.1 },
            { "text": "she", "start": 29.1, "end": 29.4 },
            { "text": "doesn’t", "start": 29.4, "end": 29.7 },
            { "text": "want", "start": 29.7, "end": 30.0 },
            { "text": "to", "start": 30.0, "end": 30.3 },
            { "text": "become", "start": 30.3, "end": 30.6 },
            { "text": "known", "start": 30.6, "end": 30.9 },
            { "text": "in", "start": 30.9, "end": 31.2 },
            { "text": "the", "start": 31.2, "end": 31.5 },
            { "text": "class", "start": 31.5, "end": 31.8 },
            { "text": "as", "start": 31.8, "end": 32.1 },
            { "text": "the", "start": 32.1, "end": 32.4 },
            { "text": "girl", "start": 32.4, "end": 32.7 },
            { "text": "who", "start": 32.7, "end": 33.0 },
            { "text": "always", "start": 33.0, "end": 33.3 },
            { "text": "tells", "start": 33.3, "end": 33.6 },
            { "text": "tales.", "start": 33.6, "end": 33.9 }
          ]
        },
      ]
    },

    {
      url: video3,
      title: "Section 3",
      subtitles: [
        {
          start: 0, end: 5.2,
          words: [
            { "text": "Rose", "start": 0.0, "end": 0.3 },
            { "text": "is", "start": 0.3, "end": 0.6 },
            { "text": "scared", "start": 0.6, "end": 0.9 },
            { "text": "that", "start": 0.9, "end": 1.2 },
            { "text": "if", "start": 1.2, "end": 1.5 },
            { "text": "she", "start": 1.5, "end": 1.8 },
            { "text": "tells", "start": 1.8, "end": 2.1 },
            { "text": "the", "start": 2.1, "end": 2.4 },
            { "text": "teacher", "start": 2.4, "end": 2.7 },
            { "text": "the", "start": 2.7, "end": 3.0 },
            { "text": "other", "start": 3.0, "end": 3.3 },
            { "text": "children", "start": 3.3, "end": 3.6 },
            { "text": "will", "start": 3.6, "end": 3.8 },
            { "text": "make", "start": 3.8, "end": 4.0 },
            { "text": "fun", "start": 4.0, "end": 4.2 },
            { "text": "of", "start": 4.2, "end": 4.4 },
            { "text": "her", "start": 4.4, "end": 4.6 },
            { "text": "too.", "start": 4.6, "end": 4.8 }
          ]
        },
        {
          start: 5.2, end: 9.6,
          words: [
            { "text": "She", "start": 5.4, "end": 5.7 },
            { "text": "thinks", "start": 5.7, "end": 6.0 },
            { "text": "about", "start": 6.0, "end": 6.3 },
            { "text": "how", "start": 6.3, "end": 6.6 },
            { "text": "Peter", "start": 6.6, "end": 6.9 },
            { "text": "must", "start": 6.9, "end": 7.2 },
            { "text": "be", "start": 7.2, "end": 7.5 },
            { "text": "feeling", "start": 7.5, "end": 7.8 },
            { "text": "and", "start": 7.8, "end": 8.1 },
            { "text": "decides", "start": 8.1, "end": 8.4 },
            { "text": "to", "start": 8.4, "end": 8.7 },
            { "text": "help", "start": 8.7, "end": 9.0 },
            { "text": "him.", "start": 9.0, "end": 9.3 }
          ]
        },
        {
          start: 9.6, end: 11.5,
          words: [
            { "text": "She", "start": 9.7, "end": 10.0 },
            { "text": "raises", "start": 10.0, "end": 10.3 },
            { "text": "her", "start": 10.3, "end": 10.6 },
            { "text": "hand.", "start": 10.6, "end": 10.9 }
          ]
        },
        {
          start: 12.5, end: 15.6,
          words: [
            { "text": "Rose", "start": 13.2, "end": 13.5 },
            { "text": "tells", "start": 13.5, "end": 13.8 },
            { "text": "the", "start": 13.8, "end": 14.1 },
            { "text": "teacher", "start": 14.1, "end": 14.4 },
            { "text": "what", "start": 14.4, "end": 14.7 },
            { "text": "is", "start": 14.7, "end": 15.0 },
            { "text": "happening.", "start": 15.0, "end": 15.3 }
          ]
        },
        {
          start: 16.8, end: 24.8,
          words: [
            { "text": "Thank", "start": 17.0, "end": 17.3 },
            { "text": "you", "start": 17.3, "end": 17.6 },
            { "text": "for", "start": 17.6, "end": 17.9 },
            { "text": "telling", "start": 17.9, "end": 18.2 },
            { "text": "me", "start": 18.2, "end": 18.5 },
            { "text": "Rose,", "start": 18.5, "end": 19.5 },
            { "text": "Children", "start": 19.7, "end": 20.0 },
            { "text": "you", "start": 20.0, "end": 20.3 },
            { "text": "can", "start": 20.3, "end": 20.6 },
            { "text": "go", "start": 20.6, "end": 20.9 },
            { "text": "outside", "start": 20.9, "end": 21.2 },
            { "text": "to", "start": 21.2, "end": 21.5 },
            { "text": "play,", "start": 21.5, "end": 21.8 },
            { "text": "Josh", "start": 22.4, "end": 22.7 },
            { "text": "and", "start": 22.7, "end": 23.0 },
            { "text": "Anya", "start": 23.0, "end": 23.3 },
            { "text": "stay", "start": 23.3, "end": 23.6 },
            { "text": "with", "start": 23.6, "end": 23.9 },
            { "text": "me,", "start": 23.9, "end": 24.8 }
          ]
        },
        {
          start: 24.8, end: 27.8,
          words: [
            { "text": "speaking", "start": 24.8, "end": 25.1 },
            { "text": "to", "start": 25.1, "end": 25.4 },
            { "text": "the", "start": 25.4, "end": 25.7 },
            { "text": "children", "start": 25.7, "end": 26.0 },
            { "text": "who", "start": 26.0, "end": 26.3 },
            { "text": "were", "start": 26.3, "end": 26.6 },
            { "text": "being", "start": 26.6, "end": 26.9 },
            { "text": "mean.", "start": 26.9, "end": 27.2 }
          ]
        },
      ]
    },

    {
      url: video4,
      title: "Section 4",
      subtitles: [
        {
          start: 0, end: 2.0,
          words: [
            { "text": "In", "start": 0.2, "end": 0.5 },
            { "text": "the", "start": 0.5, "end": 0.8 },
            { "text": "playground,", "start": 0.8, "end": 1.1 },
            { "text": "Peter", "start": 1.1, "end": 1.4 },
            { "text": "says,", "start": 1.4, "end": 1.7 }
          ]
        },
        {
          start: 2.0, end: 5.0,
          words: [
            { "text": "Thank", "start": 2.2, "end": 2.5 },
            { "text": "you", "start": 2.5, "end": 2.8 },
            { "text": "for", "start": 2.8, "end": 3.1 },
            { "text": "helping", "start": 3.1, "end": 3.4 },
            { "text": "me", "start": 3.4, "end": 3.7 },
            { "text": "and", "start": 3.7, "end": 4.0 },
            { "text": "telling", "start": 4.0, "end": 4.3 },
            { "text": "the", "start": 4.3, "end": 4.6 },
            { "text": "teacher.", "start": 4.6, "end": 4.9 }
          ]
        },
        {
          start: 5.0, end: 8.2,
          words: [
            { "text": "Yes,", "start": 5.4, "end": 5.7 },
            { "text": "I’m", "start": 5.7, "end": 6.0 },
            { "text": "glad", "start": 6.0, "end": 6.3 },
            { "text": "I", "start": 6.3, "end": 6.6 },
            { "text": "asked", "start": 6.6, "end": 6.9 },
            { "text": "the", "start": 6.9, "end": 7.2 },
            { "text": "teacher", "start": 7.2, "end": 7.5 },
            { "text": "for", "start": 7.5, "end": 7.8 },
            { "text": "help,", "start": 7.8, "end": 8.1 }
          ]
        },
        {
          start: 9.0, end: 13.0,
          words: [
            { "text": "It", "start": 9.0, "end": 9.3 },
            { "text": "wasn’t", "start": 9.3, "end": 9.6 },
            { "text": "nice", "start": 9.6, "end": 9.9 },
            { "text": "at", "start": 9.9, "end": 10.2 },
            { "text": "all", "start": 10.2, "end": 10.5 },
            { "text": "what", "start": 10.5, "end": 10.8 },
            { "text": "they", "start": 10.8, "end": 11.1 },
            { "text": "were", "start": 11.1, "end": 11.4 },
            { "text": "doing", "start": 11.4, "end": 11.7 },
            { "text": "to", "start": 11.7, "end": 12.0 },
            { "text": "you.", "start": 12.0, "end": 12.3 }
          ]
        },

      ]
    },

    {
      url: video5,
      title: "Section 5",
      subtitles: [
        {
          start: 0, end: 5.6,
          words: [
            { "text": "Then", "start": 0.2, "end": 0.5 },
            { "text": "something", "start": 0.5, "end": 0.8 },
            { "text": "surprising", "start": 0.8, "end": 1.1 },
            { "text": "happens.", "start": 1.1, "end": 2.4 },
            { "text": "Josh", "start": 3.2, "end": 3.5 },
            { "text": "and", "start": 3.5, "end": 3.8 },
            { "text": "Anya", "start": 3.8, "end": 4.1 },
            { "text": "walk", "start": 4.1, "end": 4.4 },
            { "text": "towards", "start": 4.4, "end": 4.7 },
            { "text": "Rose.", "start": 4.7, "end": 5.0 }


          ]
        },

        {
          start: 6.0, end: 7.0,
          words: [
            { "text": "Josh", "start": 6.2, "end": 6.5 },
            { "text": "says,", "start": 6.5, "end": 6.8 }
          ]
        },

        {
          start: 8.8, end: 12.0,
          words: [
            { "text": "We’re", "start": 9.0, "end": 9.3 },
            { "text": "not", "start": 9.3, "end": 9.6 },
            { "text": "going", "start": 9.6, "end": 9.9 },
            { "text": "to", "start": 9.9, "end": 10.2 },
            { "text": "laugh", "start": 10.2, "end": 10.5 },
            { "text": "at", "start": 10.5, "end": 10.8 },
            { "text": "other", "start": 10.8, "end": 11.1 },
            { "text": "people", "start": 11.1, "end": 11.4 },
            { "text": "now.", "start": 11.4, "end": 11.7 }
          ]
        },

        {
          start: 12, end: 17.6,
          words: [

            { "text": "The", "start": 12.2, "end": 12.5 },
            { "text": "teacher", "start": 12.5, "end": 12.8 },
            { "text": "talked", "start": 12.8, "end": 13.1 },
            { "text": "to", "start": 13.1, "end": 13.4 },
            { "text": "us", "start": 13.4, "end": 13.7 },
            { "text": "about", "start": 13.7, "end": 14.0 },
            { "text": "bullying.", "start": 14.0, "end": 14.3 },
            { "text": "and", "start": 14.3, "end": 14.6 },
            { "text": "we’re", "start": 14.6, "end": 14.9 },
            { "text": "going", "start": 14.9, "end": 15.2 },
            { "text": "to", "start": 15.2, "end": 15.5 },
            { "text": "stop", "start": 15.5, "end": 15.8 },
            { "text": "it", "start": 15.8, "end": 16.1 },
            { "text": "and", "start": 16.1, "end": 16.4 },
            { "text": "be", "start": 16.4, "end": 16.7 },
            { "text": "kind.", "start": 16.7, "end": 17.4 }


          ]
        },

        {
          start: 18.6, end: 21.8,
          words: [
            { "text": "Josh", "start": 19.1, "end": 19.4 },
            { "text": "and", "start": 19.4, "end": 19.7 },
            { "text": "Anya", "start": 19.7, "end": 20.0 },
            { "text": "say", "start": 20.0, "end": 20.3 },
            { "text": "sorry", "start": 20.3, "end": 20.6 },
            { "text": "to", "start": 20.6, "end": 20.9 },
            { "text": "Peter", "start": 20.9, "end": 21.2 },
            { "text": "for", "start": 21.2, "end": 21.5 },
            { "text": "laughing.", "start": 21.5, "end": 21.8 }
          ]
        },

        {
          start: 21.8, end: 25.0,
          words: [
            { "text": "We’re not going to laugh at other people now The teacher talked to us about bullying", "start": 22.0, "end": 23.0 },
            { "text": "and we’re going to stop it and be kind", "start": 23.0, "end": 25.0 },
          ]
        },
      ]
    },

    {
      url: video6,
      title: "Section 6",
      subtitles: [
        {
          start: 0, end: 2.5,
          words: [
            { "text": "The", "start": 0.2, "end": 0.5 },
            { "text": "children", "start": 0.5, "end": 0.8 },
            { "text": "play", "start": 0.8, "end": 1.1 },
            { "text": "together.", "start": 1.1, "end": 2.4 },
          ]
        },

        {
          start: 2.8, end: 7.5,
          words: [
            { text: "Rose", start: 2.9, end: 3.2 },
            { text: "is", start: 3.2, end: 3.4 },
            { text: "glad", start: 3.4, end: 3.7 },
            { text: "that", start: 3.7, end: 3.9 },
            { text: "she", start: 3.9, end: 4.1 },
            { text: "helped", start: 4.1, end: 4.4 },
            { text: "Peter", start: 4.4, end: 4.7 },
            { text: "and", start: 4.7, end: 4.9 },
            { text: "she", start: 4.9, end: 5.1 },
            { text: "helped", start: 5.1, end: 5.4 },
            { text: "the", start: 5.4, end: 5.6 },
            { text: "other", start: 5.6, end: 5.8 },
            { text: "children", start: 5.8, end: 6.0 },
            { text: "be", start: 6.0, end: 6.2 },
            { text: "kind.", start: 6.2, end: 6.4 }
          ]
        }
      ]
    },
  ];


  const cloudPositions = {
    0: [
    ],
    1: [
      { top: '15%', left: '70%', isFlipped: true },
      { top: '15%', left: '15%' },
      { top: '10%', left: '40%', isFlipped: true },
      { top: '10%', left: '40%' },
      { top: '10%', left: '40%' },
      { top: '30%', left: '45%' },
      { top: '30%', left: '45%' },
      { top: '10%', left: '20%' },
      { top: '10%', left: '40%' },
      { top: '10%', left: '40%' },
      { top: '10%', left: '40%' },
      { top: '10%', left: '40%' },
      { top: '10%', left: '40%' },
    ],
    2: [
      { top: '10%', right: '50%', isFlipped: false },
      { top: '15%', right: '60%', isFlipped: false },
      { top: '10%', left: '15%' },
      { top: '10%', right: '15%' },
      { bottom: '60%', left: '50%', isFlipped: true },
      { bottom: '30%', left: '20%' },
    ],
    3: [
      { top: '10%', right: '10%', isFlipped: true },
      { top: '10%', right: '50%', isFlipped: true },
      { top: '10%', right: '20%', isFlipped: false },
      { top: '10%', right: '20%', isFlipped: false },
      { top: '10%', left: '15%' },
      { top: '10%', left: '15%' },
      { top: '10%', left: '15%' },
      { top: '10%', left: '15%' },
      { top: '10%', left: '15%' },
    ],
    4: [
      { top: '15%', left: '75%', isFlipped: true },
      { top: '15%', left: '25%', isFlipped: true },
      { top: '15%', left: '25%', isFlipped: true },
      { top: '15%', left: '25%', isFlipped: true },
      { top: '15%', left: '75%', isFlipped: true },
      { top: '15%', left: '75%', isFlipped: true },
    ],
    5: [
      { bottom: '80%', left: '48%', },
      { top: '20%', left: '25%' },
      { top: '10%', left: '50%', isFlipped: true },
      { top: '70%', left: '50%', isFlipped: true }
    ],
  };

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
    setShowBanner(false);
    setCurrentVideo(prev => (prev < videos.length - 1 ? prev + 1 : 0));
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


  const toggleWordSelection = (wordText) => {
    const correctWords = ["We’re not going to laugh at other people now The teacher talked to us about bullying"];
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

          {currentVideo === 4 && showBanner && (
            <div className="instruction-banner show">
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                Highlight the sentence that shows what
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                Josh and Anya learned about kindness and
              </p>
              <p style={{ fontSize: '1.8em', textAlign: 'left' }}>
                bullying.
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
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default StoryPage;
