import React from "react";

/**
 * Card
 * - titleClassName is appended after defaults so Tailwind classes override defaults
 * - titleStyle allows direct inline-style overrides (use sparingly)
 */
export const Card = ({
  title,
  children,
  className = "",
  headerSlot,
  titleAlign = "left",
  titleClassName = "",
  titleStyle = {},
}) => {
  const isCenter = titleAlign === "center";
  const headerLayout = isCenter
    ? "mb-4 flex items-center justify-center"
    : "mb-4 flex items-center";

  return (
    <div className={`bg-white rounded-xl shadow p-4 sm:p-6 ${className}`}>
      {(title || headerSlot) && (
        <div className={headerLayout}>
          {title && (
            // default classes come first, override classes appended after
            <h3
              className={`text-lg font-semibold text-gray-900 w-full ${
                isCenter ? "text-center" : ""
              } ${titleClassName}`}
              style={titleStyle}
            >
              {title}
            </h3>
          )}

          {headerSlot && !isCenter && (
            <div className="ml-auto">{headerSlot}</div>
          )}
        </div>
      )}

      <div className="text-sm text-gray-800">{children}</div>
    </div>
  );
};
