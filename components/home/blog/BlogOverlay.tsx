export function BlogOverlay() {
  return (
    <>
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
    </>
  );
}
