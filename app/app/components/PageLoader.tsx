'use client';

const LINES = new Array(5).fill(null);

export default function PageLoader() {
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader-inner">
        {LINES.map((_, index) => (
          <div className="loader-line-wrap" key={index}>
            <div className="loader-line" />
          </div>
        ))}
      </div>
    </div>
  );
}
