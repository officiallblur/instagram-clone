import React from 'react';
import { REELS_DATA } from '../constants';
import { HeartIcon, CommentIcon, ShareIcon, MoreIcon, VerifiedBadge, MusicNoteIcon } from '../components/Icons';

const Reels: React.FC = () => {
  return (
    <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar relative">
      {REELS_DATA.map((reel) => (
        <div key={reel.id} className="h-full w-full snap-start flex-shrink-0 relative bg-black">
          <img src={reel.videoUrl} className="w-full h-full object-cover" alt={`Reel by ${reel.username}`} />
          
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
            <h2 className="text-xl font-bold">Reels</h2>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex items-center space-x-2">
              <img src={reel.avatarUrl} className="h-8 w-8 rounded-full" alt={reel.username} />
              <p className="font-bold text-sm flex items-center">{reel.username} {reel.isVerified && <VerifiedBadge className="h-3 w-3 ml-1" />}</p>
              <button className="border border-white rounded px-2 py-0.5 text-xs">Follow</button>
            </div>
            <p className="text-sm mt-2 truncate">{reel.caption}</p>
            <div className="flex items-center space-x-2 mt-2">
                <MusicNoteIcon className="h-4 w-4" />
                <p className="text-sm truncate">{reel.song}</p>
            </div>
          </div>
          
          <div className="absolute bottom-20 right-2 flex flex-col items-center space-y-5 text-white">
            <button className="flex flex-col items-center">
              <HeartIcon className="h-8 w-8"/>
              <span className="text-xs font-semibold">{reel.likes}</span>
            </button>
            <button className="flex flex-col items-center">
              <CommentIcon className="h-8 w-8"/>
              <span className="text-xs font-semibold">{reel.comments}</span>
            </button>
            <button className="flex flex-col items-center">
              <ShareIcon className="h-8 w-8"/>
            </button>
             <button>
              <MoreIcon className="h-8 w-8" />
            </button>
             <img src={reel.avatarUrl} className="h-8 w-8 rounded-lg border-2 border-white object-cover" alt="song artwork"/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reels;
