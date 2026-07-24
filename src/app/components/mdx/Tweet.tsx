import { Tweet as ReactTweet } from "react-tweet";

interface TweetProps {
  id: string;
}

export const Tweet = ({ id }: TweetProps) => (
  <div className="react-tweet-theme not-prose my-9">
    <ReactTweet id={id} />
  </div>
);
