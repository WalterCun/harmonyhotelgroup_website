import React, { useState } from "react";

interface TruncatedTextProps {
  text: string;
  maxLines?: number;
  readMoreText?: string;
  className?: string;
}

export default function TruncatedText({
  text,
  maxLines = 4,
  readMoreText = "Leer más",
  className = "",
}: TruncatedTextProps) {
  const [expanded, setExpanded] = useState(false);

  // Creamos un objeto con clases para los diferentes números de líneas
  const lineClampClasses = {
    1: "line-clamp-1",
    2: "line-clamp-2",
    3: "line-clamp-3",
    4: "line-clamp-4",
    5: "line-clamp-5",
    6: "line-clamp-6",
  };

  // Seleccionamos la clase adecuada según maxLines, con fallback a line-clamp-4
  const lineClampClass =
    lineClampClasses[maxLines as keyof typeof lineClampClasses] ||
    "line-clamp-4";

  return (
    <div className={className}>
      <p
        className={`relative ${
          !expanded ? `${lineClampClass} overflow-hidden` : ""
        }`}
      >
        {text}
        {!expanded && (
          <span
            className="inline-block ml-1 text-blue-500 cursor-pointer hover:underline"
            onClick={() => setExpanded(true)}
            // biome-ignore lint/a11y/useSemanticElements: <explanation>
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setExpanded(true);
              }
            }}
          >
            {readMoreText}
          </span>
        )}
      </p>
      {expanded && (
        <button
          onClick={() => setExpanded(false)}
          className="mt-2 text-sm text-blue-500 hover:underline"
          type="button"
        >
          Mostrar menos
        </button>
      )}
    </div>
  );
}
