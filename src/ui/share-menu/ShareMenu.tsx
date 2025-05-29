import {useState} from 'react';
import {SocialShare} from '../../utils/social-share';

export function ShareMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleShare = async () => {
    const success = await SocialShare.share();
    if (success && !navigator.share) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleSocialShare = (platform: string) => {
    console.log('handling sharing -> ', platform);
    switch (platform) {
      case 'twitter':
        SocialShare.shareToTwitter();
        break;
      case 'linkedin':
        SocialShare.shareToLinkedIn();
        break;
      case 'facebook':
        SocialShare.shareToFacebook();
        break;
      case 'email':
        SocialShare.shareViaEmail();
        break;
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Share Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="z-10 p-3 text-white bg-black w-auto border-white select-none opacity-60 border-4 text-xl transition-colors hover:opacity-80"
        aria-label="Share this CV"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
        </svg>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}

      {/* Share Menu */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 z-10 p-8 text-white bg-black w-full border-white select-none opacity-60 border-8 text-xl min-w-[200px] z-50">
          <div className="mb-3">
            Share this CV
          </div>

          {/* Native Share (Mobile) */}
          <button
            onClick={handleShare}
            className="w-full flex items-center gap-3 p-2 hover:bg-white hover:text-black rounded text-left cursor-pointer"
          >
            <span className="text-xl">📱</span>
            {navigator.share ? 'Share...' : 'Copy Link'}
          </button>

          {copySuccess && (
            <div className="text-green-600 text-xs mt-1 ml-8">Link copied!</div>
          )}

          <hr className="my-2" />

          {/* Social Platforms */}
          <button
            onClick={() => handleSocialShare('twitter')}
            className="w-full flex items-center gap-3 p-2 hover:bg-white hover:text-black rounded text-left cursor-pointer"
          >
            <span className="text-xl">🐦</span>
            Twitter
          </button>

          <button
            onClick={() => handleSocialShare('linkedin')}
            className="w-full flex items-center gap-3 p-2 hover:bg-white hover:text-black rounded text-left cursor-pointer"
          >
            <span className="text-xl">💼</span>
            LinkedIn
          </button>

          <button
            onClick={() => handleSocialShare('facebook')}
            className="w-full flex items-center gap-3 p-2 hover:bg-white hover:text-black rounded text-left cursor-pointer"
          >
            <span className="text-xl">📘</span>
            Facebook
          </button>

          <button
            onClick={() => handleSocialShare('email')}
            className="w-full flex items-center gap-3 p-2 hover:bg-white hover:text-black rounded text-left cursor-pointer"
          >
            <span className="text-xl">✉️</span>
            Email
          </button>
        </div>
      )}
    </div>
  );
}

