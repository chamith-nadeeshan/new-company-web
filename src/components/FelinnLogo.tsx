// Felinn wordmark. Sized in `em`, so set font-size on the parent (or via
// `className`) to scale it.
export function FelinnLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`felinn-logo ${className}`}>
      <span className="felinn-text">
        <span className="felinn-fel">Fel</span>
        <span className="felinn-inn">inn</span>
      </span>
    </span>
  );
}
