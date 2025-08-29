// ProfileCard.jsx
export default function ProfileCard({ user, variant = "large" }) {
  if (!user) return null;

  const fallback = `https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=`;

  const cardWidth =
    variant === "small"
      ? "w-[min(92vw,280px)]" // smaller width for grid
      : "w-[min(92vw,420px)]";
  const imageHeight = variant === "small" ? "h-[220px]" : "h-[360px]";

  return (
    <div
      className={`${cardWidth} rounded-2xl overflow-hidden border border-base-300 bg-base-100 shadow-xl`}
    >
      {/* top media */}
      <div className={`${imageHeight} bg-base-200`}>
        <img
          src={user?.photo_url || fallback}
          alt={user?.firstName || "profile"}
          className="h-full w-full object-cover select-none"
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
          {user?.role ? (
            <span className="badge badge-outline">{user?.role}</span>
          ) : null}
        </div>

        {user?.about ? (
          <p className="text-sm opacity-80">{user?.about}</p>
        ) : (
          <p className="text-sm opacity-60">No bio provided.</p>
        )}

        {/* example skills list if you have it */}
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
    </div>
  );
}
