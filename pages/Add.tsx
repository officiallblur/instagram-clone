import React, { useState, useEffect, useRef } from 'react';
import type { Page } from '../App';
import { CloseIcon, SwitchCameraIcon, GalleryIcon, ChevronLeftIcon } from '../components/Icons';

interface AddProps {
  setActivePage: (page: Page) => void;
}

const Add: React.FC<AddProps> = ({ setActivePage }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<'post' | 'story' | 'reel'>('post');
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  
  useEffect(() => {
    let stream: MediaStream | null = null;
    
    const getCameraStream = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
        setError("Could not access the camera. Please check permissions.");
      }
    };

    if (!mediaPreview) {
      getCameraStream();
    }

    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [mediaPreview]);

  const handleClose = () => {
    setActivePage('home');
  };

  const handleTakePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setMediaPreview(dataUrl);
        setMediaType('image');
      }
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMediaPreview(url);
      if (file.type.startsWith('video/')) {
        setMediaType('video');
        setActiveMode('reel');
      } else {
        setMediaType('image');
      }
    }
  };

  const handleRetake = () => {
    if (mediaPreview && mediaType === 'video') {
        URL.revokeObjectURL(mediaPreview);
    }
    setMediaPreview(null);
    setMediaType(null);
  };
  
  const handleShare = () => {
    console.log('Sharing:', { mediaType, mediaPreview });
    // In a real app, you would upload this media.
    setActivePage('home');
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-black text-white p-4">
        <p className="text-center">{error}</p>
        <button onClick={handleClose} className="mt-4 bg-gray-800 px-4 py-2 rounded-lg">Go Back</button>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full bg-black">
      {mediaPreview ? (
        <>
            <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/50 to-transparent">
                <button onClick={handleRetake} aria-label="Go back"><ChevronLeftIcon className="h-7 w-7" /></button>
                <h1 className="text-xl font-bold capitalize">New {activeMode}</h1>
                <button onClick={handleShare} className="font-semibold text-blue-400 text-lg">Share</button>
            </header>
            <div className="h-full w-full flex items-center justify-center">
                {mediaType === 'image' ? (
                    <img src={mediaPreview} alt="Preview" className="max-h-full max-w-full" />
                ) : (
                    <video src={mediaPreview} controls autoPlay loop className="max-h-full max-w-full" />
                )}
            </div>
        </>
      ) : (
        <>
          <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
          <canvas ref={canvasRef} className="hidden" />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept={activeMode === 'reel' ? 'video/*' : 'image/*,video/*'}
            className="hidden"
          />
          
          <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
            <button onClick={handleClose} aria-label="Close"><CloseIcon className="h-7 w-7" /></button>
            <h1 className="text-xl font-bold">New post</h1>
            <div className="w-7"></div>
          </header>

          <footer className="absolute bottom-0 left-0 right-0 p-4 pb-6 flex flex-col items-center bg-gradient-to-t from-black/50 to-transparent">
            <div className="flex w-full justify-between items-center px-4">
                <button onClick={() => fileInputRef.current?.click()} className="p-2" aria-label="Open gallery">
                    <GalleryIcon className="h-8 w-8" />
                </button>
                <button onClick={handleTakePhoto} className="w-20 h-20 rounded-full bg-white/30 border-4 border-white flex items-center justify-center" aria-label="Take photo">
                    <div className="w-16 h-16 rounded-full bg-white"></div>
                </button>
                <button className="p-2" aria-label="Switch camera">
                    <SwitchCameraIcon className="h-8 w-8" />
                </button>
            </div>
            <div className="flex space-x-6 text-lg font-semibold mt-4">
                <button onClick={() => setActiveMode('post')} className={activeMode === 'post' ? 'text-white' : 'text-gray-400'}>POST</button>
                <button onClick={() => setActiveMode('story')} className={activeMode === 'story' ? 'text-white' : 'text-gray-400'}>STORY</button>
                <button onClick={() => setActiveMode('reel')} className={activeMode === 'reel' ? 'text-white' : 'text-gray-400'}>REEL</button>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default Add;