import React from 'react';
import { VideoProvider } from '../types';

interface VideoPlayerProps {
  videoId: string;
  provider: VideoProvider;
  title: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, provider, title }) => {
  let src = '';

  switch (provider) {
    case VideoProvider.YouTube:
      src = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
      break;
    case VideoProvider.Vimeo:
      src = `https://player.vimeo.com/video/${videoId}`;
      break;
    case VideoProvider.Loom:
      src = `https://www.loom.com/embed/${videoId}`;
      break;
    default:
      return <div className="aspect-video bg-slate-200 flex items-center justify-center text-slate-500">Video provider not supported</div>;
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-black shadow-lg" style={{ paddingTop: '56.25%' }}>
      <iframe
        className="absolute top-0 left-0 bottom-0 right-0 w-full h-full"
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
