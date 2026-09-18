"use client";

import dynamic from "next/dynamic";
import { GitHubSectionSkeleton } from "./GitHubSectionSkeleton";

const GitHubSection = dynamic(
  () => import("./GitHubSection").then((mod) => mod.GitHubSection),
  {
    ssr: false,
    loading: () => <GitHubSectionSkeleton />,
  },
);

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
