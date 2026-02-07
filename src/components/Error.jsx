const ErrorAlert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="alert alert-error shadow-lg my-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01M12 5.5l7 12H5l7-12z"
          />
        </svg>

        <span className="text-sm">{message}</span>
      </div>

      {onClose && (
        <button onClick={onClose} className="btn btn-sm btn-ghost">
          ✕
        </button>
      )}
    </div>
  );
};

export default ErrorAlert;
