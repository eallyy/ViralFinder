"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { ReelsCard } from "@/components/reels-card";
import { getWinnerReelsClientWithCount } from "@/lib/supabase/winner_reels";
import { LoaderCircle } from 'lucide-react';

const PAGE_SIZE = 24;

export default function ClientReels({ initialReels }: { initialReels: any[] }) {
  const [reels, setReels] = useState(initialReels);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const offset = page * PAGE_SIZE;

    const { data, count } = await getWinnerReelsClientWithCount(PAGE_SIZE, offset);

    if (totalCount === null) setTotalCount(count);

    if (data.length > 0) {
      setReels((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);

      if (offset + data.length >= count) {
        setHasMore(false);
      }
    } else {
      setHasMore(false); // hiçbir veri gelmediyse zaten son
    }

    setLoading(false);
  }, [page, loading, hasMore, totalCount]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    const current = loaderRef.current;
    observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loaderRef, loadMore, hasMore, loading]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {reels.map((reel: any) => (
          <ReelsCard key={reel.id} reel={reel} />
        ))}
      </div>

      <div ref={loaderRef} className="text-center py-6 text-gray-500">
        {loading && <span><LoaderCircle className="h-5 w-5 animate-spin inline-block mr-2 text-indigo-500"/>Yeni İçerikler Yükleniyor...</span>}
        {!hasMore && <span>Tüm içerikler yüklendi! 🎉</span>}
      </div>
    </>
  );
}
