import Image from "next/image";
import { Tweet as ReactTweet } from "react-tweet";

// react-tweet theme CSS lives in globals.css (imported once at the
// global level). Importing it here made Turbopack dev fork-bomb
// PostCSS workers on every MDX recompile.

interface TweetProps {
  id: string;
}

const AvatarImg = ({
  src,
  alt,
  width = 48,
  height = 48,
  ...props
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={props.className}
  />
);

const MediaImg = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <Image
    src={src}
    alt={alt}
    fill
    sizes="(max-width: 768px) 100vw, 650px"
    className={className}
  />
);

export const Tweet = ({ id }: TweetProps) => (
  <div className="react-tweet-theme not-prose my-9">
    <ReactTweet id={id} components={{ AvatarImg, MediaImg }} />
  </div>
);
