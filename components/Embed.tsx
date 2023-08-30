import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

const getYouTubeId = (url: string) => {
  if (/youtu\.?be/.test(url)) {
    // Look first for known patterns
    const patterns = [
      /youtu\.be\/([^#\&\?]{11})/, // youtu.be/<id>
      /\?v=([^#\&\?]{11})/, // ?v=<id>
      /\&v=([^#\&\?]{11})/, // &v=<id>
      /embed\/([^#\&\?]{11})/, // embed/<id>
      /\/v\/([^#\&\?]{11})/, // /v/<id>
    ];
    // If any pattern matches, return the ID
    for (const pattern of patterns) {
      if (pattern.test(url)) {
        return pattern.exec(url)?.[1];
      }
    }
  }
  return null;
};

const Embed = (props: any) => {
  if (props.attrs?.providerNameSlug === 'youtube') {
    const youtubeId = getYouTubeId(props.attrs?.url);

    if (typeof youtubeId === 'string') {
      return (
        <LiteYouTubeEmbed
          id={youtubeId}
          title="YouTube Embed"
          adNetwork={false}
          noCookie={true}
          params="enablejsapi=1"
        />
      );
    }
  }

  return <p>Embed component</p>;
};

export default Embed;
