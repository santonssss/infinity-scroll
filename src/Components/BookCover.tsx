import React, { useEffect, useRef } from "react";
import html2canvas from "html2canvas";

function generateColorFromTitle(title: string): string {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `#${((hash >> 24) & 0xff).toString(16).padStart(2, "0")}${(
    (hash >> 16) &
    0xff
  )
    .toString(16)
    .padStart(2, "0")}${((hash >> 8) & 0xff).toString(16).padStart(2, "0")}`;
  return color.slice(0, 7);
}

const BookCover: React.FC<{ title: string }> = ({ title }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = canvasRef.current;
    if (element) {
      html2canvas(element).then((canvas) => {
        const image = canvas.toDataURL("image/png");
        const imgElement = element.querySelector("img");
        if (imgElement) {
          imgElement.src = image;
        }
      });
    }
  }, []);

  const backgroundColor = generateColorFromTitle(title);

  return (
    <div
      ref={canvasRef}
      style={{
        position: "relative",
        width: 150,
        height: 200,
        background: backgroundColor,
      }}
    >
      <p
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "16px",
          fontWeight: "bold",
          textAlign: "center",
          color: "#fff",
        }}
      >
        {title}
      </p>
      <img alt={`Обложка книги: ${title}`} style={{ display: "none" }} />
    </div>
  );
};

export default BookCover;
