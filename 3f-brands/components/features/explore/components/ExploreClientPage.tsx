'use client';

import dynamic from 'next/dynamic';
import { ExploreSkeleton } from "./ExploreSkeleton";

const CategoryDropdowns = dynamic(
  () => import("./CategoryDropdowns"),
  {
    loading: () => <ExploreSkeleton />,
    ssr: false
  }
);

export default function ExploreClientPage() {
  return <CategoryDropdowns />;
}
