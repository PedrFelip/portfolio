import { GitHubSection } from "./GitHubSection";

interface GitHubSectionLoaderProps {
  title: string;
  subtitle: string;
  description: string;
  swipeHint: string;
  less: string;
  more: string;
  tapHint: string;
  commitLabel: string;
  commitsLabel: string;
  commitsLastYearLabel: string;
}

export function GitHubSectionLoader(props: GitHubSectionLoaderProps) {
  return <GitHubSection {...props} />;
}
