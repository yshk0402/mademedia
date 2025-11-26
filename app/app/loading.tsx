import './globals.css';

export default function Loading() {
  return (
    <div className="loader" aria-label="ページを読み込み中">
      <div className="loader-inner">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="loader-line-wrap" key={index}>
            <div className="loader-line" />
          </div>
        ))}
      </div>
    </div>
  );
}
