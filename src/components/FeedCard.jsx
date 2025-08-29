import { useMemo, useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useAnimationControls,
} from "framer-motion";

export default function FeedCard({ feedData = [], onInterested, onIgnored }) {
  const [stack, setStack] = useState(() => [...feedData]);

  const isAnimatingRef = useRef(false);

  useEffect(() => {
    setStack([...feedData]); // or [...feedData].reverse() if you want reverse order
  }, [feedData]);

  const handleDecision = (dir, user) => {
    if (dir === "right" && onInterested) onInterested(user);
    if (dir === "left" && onIgnored) onIgnored(user);
  };

  const removeTop = (user) => {
    setStack((s) => s.filter((u) => u !== user));
  };

  const dragX = useMotionValue(0);

  const onDragEnd = (info, user, controls) => {
    const offsetX = info.offset.x ?? 0;
    const velocityX = info.velocity.x ?? 0;
    const power = Math.abs(offsetX) + Math.abs(velocityX) * 0.25;

    if (power > 300 && Math.abs(offsetX) > 40) {
      const dir = offsetX > 0 ? "right" : "left";
      isAnimatingRef.current = true;
      controls
        .start({
          x: dir === "right" ? window.innerWidth : -window.innerWidth,
          rotate: dir === "right" ? 20 : -20,
          opacity: 0,
          transition: { duration: 0.25 },
        })
        .then(() => {
          handleDecision(dir, user);
          removeTop(user);
          isAnimatingRef.current = false;
          dragX.set(0);
        });
    } else {
      // snap back
      controls.start({
        x: 0,
        y: 0,
        rotate: 0,
        transition: { type: "spring", stiffness: 500, damping: 28 },
      });
      dragX.set(0);
    }
  };

  const programmaticSwipe = (dir) => {
    const user = stack[stack.length - 1];
    if (!user || isAnimatingRef.current) return;
    // Simple instant remove (could animate similarly with controls if you want)
    handleDecision(dir, user);
    removeTop(user);
    dragX.set(0);
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Card stack */}
      <div className="relative w-[min(92vw,420px)] h-[560px] select-none">
        <AnimatePresence initial={false}>
          {stack.map((user, i) => {
            const isTop = i === stack.length - 1;

            return (
              <DraggableCard
                key={user._id}
                user={user}
                zIndex={100 + i}
                offset={stack.length - 1 - i}
                isTop={isTop}
                onDragEnd={onDragEnd}
                dragX={dragX}
                programmaticSwipe={programmaticSwipe}
              />
            );
          })}
        </AnimatePresence>
        {stack.length === 0 && (
          <div className="absolute inset-0 grid place-items-center rounded-2xl border border-base-300 text-base-content/70">
            No more profiles 🎉
          </div>
        )}
      </div>

      {/* Actions */}
    </div>
  );
}

function DraggableCard({
  user,
  zIndex,
  offset,
  isTop,
  onDragEnd,
  dragX,
  programmaticSwipe,
}) {
  const controls = useAnimationControls();

  // Lower cards "peek" as top card moves
  const absX = useTransform(dragX, (v) => Math.abs(v));
  const lift = useTransform(absX, [0, 200], [0, 14]);
  const widen = useTransform(absX, [0, 200], [0, 0.02]);

  const baseY = offset * 8;
  const baseScale = 1 - offset * 0.015;
  const liftedY = useTransform(lift, (v) => baseY - v);
  const scaled = useTransform(widen, (w) => baseScale + w);

  return (
    <motion.div
      layout
      style={{
        zIndex,
        y: isTop ? baseY : liftedY,
        scale: isTop ? 1 : scaled,
      }}
      className={`absolute inset-0 ${
        isTop ? "pointer-events-auto" : "pointer-events-none"
      } select-none`}
      initial={{ scale: baseScale, y: baseY, rotate: 0, opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card
        user={user}
        draggable={isTop}
        onDragEnd={(event, info) => onDragEnd(info, user, controls)}
        controls={controls}
        dragX={isTop ? dragX : null}
        programmaticSwipe={programmaticSwipe}
      />
    </motion.div>
  );
}

function Card({
  user,
  draggable,
  onDragEnd,
  controls,
  dragX,
  programmaticSwipe,
}) {
  const { name, age, role, bio, avatar } = user;
  const fallback = `https://api.dicebear.com/8.x/thumbs/svg?seed=${encodeURIComponent(
    name || "coder"
  )}`;

  // Rotate whole card with drag
  const zero = useMotionValue(0); // fallback MV
  const mv = dragX ?? zero; // always a motion value
  const rotate = useTransform(mv, [-300, 0, 300], [-12, 0, 12]); // ✅ always called

  const style = dragX
    ? { x: dragX, rotate } // top card
    : { x: 0, rotate };

  return (
    <motion.div
      drag={draggable ? "x" : false}
      dragListener={draggable}
      dragMomentum={false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      style={style}
      onDragEnd={onDragEnd}
      animate={controls}
      className="h-full w-full rounded-2xl overflow-hidden border border-base-300 bg-base-100 shadow-2xl select-none"
    >
      {/* top media */}
      <div className="h-2/3 relative bg-base-200">
        <img
          src={user?.photo_url || fallback}
          alt={user?.firstName}
          className="h-full  w-full object-cover select-none pointer-events-none"
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* details */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {user?.firstName} {user?.lastName}
            {user?.age ? (
              <span className="opacity-70">, {user?.age}</span>
            ) : null}
          </h3>
          {role ? <span className="badge badge-outline">{role}</span> : null}
        </div>
        {user?.about ? (
          <p className="text-sm opacity-80 line-clamp-3">{user?.about}</p>
        ) : (
          <p className="text-sm opacity-60">No bio provided.</p>
        )}
        {Array.isArray(user?.skills) && user?.skills?.length > 0 && (
          <div className="mt-2 flex gap-2 flex-wrap">
            {user?.skills.slice(0, 6).map((s) => (
              <span key={s} className="badge badge-ghost">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center gap-4">
        <button
          className="btn btn-outline btn-error"
          onClick={() => programmaticSwipe("left")}
        >
          Ignore
        </button>
        <button
          className="btn btn-primary"
          onClick={() => programmaticSwipe("right")}
        >
          Interested
        </button>
      </div>
    </motion.div>
  );
}
