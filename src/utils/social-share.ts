export interface ShareData {
  title: string;
  text: string;
  url: string;
}

export class SocialShare {
  private static readonly shareData: ShareData = {
    title: 'Carlos Gonzalez | Interactive 3D CV',
    text: 'Check out this amazing interactive 3D CV! Experience a unique portfolio in an immersive 3D environment.',
    url: window.location.href,
  };

  static async share(): Promise<boolean> {
    // Use native Web Share API if available (mobile browsers)
    if (navigator.share) {
      try {
        await navigator.share(this.shareData);
        return true;
      } catch (error) {
        console.warn('Native sharing failed:', error);
      }
    }

    // Fallback to clipboard
    return this.copyToClipboard();
  }

  static async copyToClipboard(): Promise<boolean> {
    try {
      const shareText = `${this.shareData.title}\n${this.shareData.text}\n${this.shareData.url}`;
      await navigator.clipboard.writeText(shareText);
      return true;
    } catch (error) {
      console.warn('Clipboard copy failed:', error);
      return false;
    }
  }

  static shareToTwitter(): void {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `${this.shareData.text} ${this.shareData.url}`
    )}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  }

  static shareToLinkedIn(): void {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      this.shareData.url
    )}`;
    window.open(linkedInUrl, '_blank', 'width=550,height=420');
  }

  static shareToFacebook(): void {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      this.shareData.url
    )}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
  }

  static shareViaEmail(): void {
    const subject = encodeURIComponent(this.shareData.title);
    const body = encodeURIComponent(`${this.shareData.text}\n\n${this.shareData.url}`);
    const emailUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = emailUrl;
  }
}