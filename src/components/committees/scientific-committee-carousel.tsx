"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type MouseEvent,
} from "react";
import type { CommitteeMember } from "@/data/committees";

const AUTO_SLIDE_INTERVAL_MS = 5500;
const SCROLL_NORMALIZE_DELAY_MS = 140;
const LOOP_SEGMENT_COUNT = 3;
const MIDDLE_SEGMENT_INDEX = 1;
const NAME_PREFIX_PATTERN = /^(?:(?:prof\.|dr\.|ms\.|mr\.|mrs\.)\s*)+/i;

interface ScientificCommitteeCarouselProps {
  members: CommitteeMember[];
  title: string;
}

function getMemberDetails(member: CommitteeMember) {
  const affiliationDetails =
    member.affiliation
      ?.split("\n")
      .map((line) => line.trim())
      .filter(Boolean) ?? [];

  if (affiliationDetails.length > 0) {
    return affiliationDetails;
  }

  return member.titleLines.map((line) => line.trim()).filter(Boolean);
}

function getSortableMemberName(member: CommitteeMember) {
  return member.name.replace(NAME_PREFIX_PATTERN, "").trim();
}

function compareMembersByName(
  firstMember: CommitteeMember,
  secondMember: CommitteeMember,
) {
  const nameComparison = getSortableMemberName(firstMember).localeCompare(
    getSortableMemberName(secondMember),
    "en",
    { sensitivity: "base" },
  );

  if (nameComparison !== 0) {
    return nameComparison;
  }

  return firstMember.name.localeCompare(secondMember.name, "en", {
    sensitivity: "base",
  });
}

function getCardStep(track: HTMLDivElement) {
  const firstCard = track.querySelector<HTMLElement>("[data-member-card]");
  const gap = Number.parseFloat(getComputedStyle(track).columnGap || "0");

  return firstCard ? firstCard.offsetWidth + gap : track.clientWidth;
}

function getLoopSpan(track: HTMLDivElement, memberCount: number) {
  if (memberCount === 0) {
    return 0;
  }

  return getCardStep(track) * memberCount;
}

function jumpToScrollPosition(track: HTMLDivElement, left: number) {
  const previousScrollBehavior = track.style.scrollBehavior;

  track.style.scrollBehavior = "auto";
  track.scrollLeft = left;
  track.style.scrollBehavior = previousScrollBehavior;
}

export function ScientificCommitteeCarousel({
  members,
  title,
}: ScientificCommitteeCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollStopTimerRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const sortedMembers = useMemo(
    () => members.slice().sort(compareMembersByName),
    [members],
  );
  const canSlide = sortedMembers.length > 1;
  const renderedMembers = useMemo(() => {
    if (!canSlide) {
      return sortedMembers.map((member, index) => ({
        index,
        member,
        segmentIndex: 0,
      }));
    }

    return Array.from({ length: LOOP_SEGMENT_COUNT }, (_, segmentIndex) =>
      sortedMembers.map((member, index) => ({
        index,
        member,
        segmentIndex,
      })),
    ).flat();
  }, [canSlide, sortedMembers]);

  const normalizeScrollPosition = useCallback(() => {
    const track = trackRef.current;

    if (!track || !canSlide) {
      return;
    }

    const loopSpan = getLoopSpan(track, sortedMembers.length);

    if (loopSpan <= 0) {
      return;
    }

    if (track.scrollLeft < loopSpan) {
      jumpToScrollPosition(track, track.scrollLeft + loopSpan);
      return;
    }

    if (track.scrollLeft >= loopSpan * 2) {
      jumpToScrollPosition(track, track.scrollLeft - loopSpan);
    }
  }, [canSlide, sortedMembers.length]);

  const scheduleScrollNormalize = useCallback(() => {
    if (!canSlide) {
      return;
    }

    if (scrollStopTimerRef.current !== null) {
      window.clearTimeout(scrollStopTimerRef.current);
    }

    scrollStopTimerRef.current = window.setTimeout(() => {
      scrollStopTimerRef.current = null;
      normalizeScrollPosition();
    }, SCROLL_NORMALIZE_DELAY_MS);
  }, [canSlide, normalizeScrollPosition]);

  const scrollCards = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const scrollAmount = getCardStep(track);

    track.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    scheduleScrollNormalize();
  }, [scheduleScrollNormalize]);

  useEffect(() => {
    const track = trackRef.current;

    if (!track || !canSlide) {
      return;
    }

    const centerActiveLoop = () => {
      const loopSpan = getLoopSpan(track, sortedMembers.length);

      if (loopSpan <= 0) {
        return;
      }

      const normalizedLeft =
        ((track.scrollLeft % loopSpan) + loopSpan) % loopSpan;

      jumpToScrollPosition(track, loopSpan + normalizedLeft);
    };

    centerActiveLoop();
    window.addEventListener("resize", centerActiveLoop);

    return () => window.removeEventListener("resize", centerActiveLoop);
  }, [canSlide, sortedMembers.length]);

  useEffect(() => {
    return () => {
      if (scrollStopTimerRef.current !== null) {
        window.clearTimeout(scrollStopTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!canSlide || isPaused) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      scrollCards(1);
    }, AUTO_SLIDE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [canSlide, isPaused, scrollCards]);

  const pauseCarousel = (
    event: FocusEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>,
  ) => {
    if (event.type === "focus" || event.type === "mouseenter") {
      setIsPaused(true);
    }
  };

  const resumeCarousel = (
    event: FocusEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>,
  ) => {
    if (event.type === "blur" || event.type === "mouseleave") {
      setIsPaused(false);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={pauseCarousel}
      onMouseLeave={resumeCarousel}
      onFocus={pauseCarousel}
      onBlur={resumeCarousel}
    >
      <div className="mb-8 flex items-center justify-between gap-4 border-b border-[#2260AD]/20 pb-4">
        <h2 className="text-2xl font-black text-[#2260AD]">{title}</h2>
        {canSlide && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollCards(-1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#2260AD]/15 bg-white/95 text-[#2260AD] shadow-sm shadow-[#2260AD]/10 transition-colors hover:bg-[#EAF2FB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2260AD]"
              aria-label="Previous scientific committee members"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollCards(1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#2260AD]/15 bg-white/95 text-[#2260AD] shadow-sm shadow-[#2260AD]/10 transition-colors hover:bg-[#EAF2FB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2260AD]"
              aria-label="Next scientific committee members"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      <div
        ref={trackRef}
        data-carousel-track
        onScroll={scheduleScrollNormalize}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {renderedMembers.map(({ member, segmentIndex }) => {
          const memberDetails = getMemberDetails(member);
          const isDuplicate = canSlide && segmentIndex !== MIDDLE_SEGMENT_INDEX;

          return (
            <article
              key={`${segmentIndex}-${member.name}`}
              aria-hidden={isDuplicate || undefined}
              data-member-card
              data-member-name={member.name}
              data-loop-segment={segmentIndex}
              className="flex-none basis-[85%] snap-start bg-white/80 px-5 py-6 text-center shadow-sm shadow-[#2260AD]/5 sm:basis-[calc((100%_-_1.25rem)/2)] xl:basis-[calc((100%_-_3.75rem)/4)]"
            >
              {member.image && (
                <div className="mx-auto mb-5 h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-[#E8F1FA] shadow-md shadow-[#2260AD]/15 ring-1 ring-[#2260AD]/15">
                  <div className="relative h-full w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              <h2 className="text-lg font-black leading-7 text-[#2260AD]">
                {member.name}
              </h2>
              {memberDetails.length > 0 && (
                <ul className="mt-4 space-y-2 border-t border-[#2260AD]/10 pt-4 text-left text-sm leading-6 text-[#263D5C]">
                  {memberDetails.map((detail) => (
                    <li key={detail} className="flex gap-2">
                      <span
                        className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#80AF41]"
                        aria-hidden="true"
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
