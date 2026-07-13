import React, { useRef, useState } from "react";
import "./StickyNote.css";

function StickyNote({ note, onUpdatePosition, onChange, onDelete }) {
  const { id, text, color, x, y } = note;
  const offset = useRef({ x: 0, y: 0 });
  const [localPos, setLocalPos] = useState({ x, y });
  const [isDragging, setIsDragging] = useState(false);

  const startDrag = (clientX, clientY) => {
    setIsDragging(true);
    offset.current = {
      x: clientX - localPos.x,
      y: clientY - localPos.y,
    };
  };

  const moveDrag = (clientX, clientY) => {
    const newX = clientX - offset.current.x;
    const newY = clientY - offset.current.y;
    setLocalPos({ x: newX, y: newY });
  };

  const endDrag = (clientX, clientY) => {
    const finalX = clientX - offset.current.x;
    const finalY = clientY - offset.current.y;
    onUpdatePosition(id, finalX, finalY);
    setIsDragging(false);
  };

  // Mouse events
  const handleMouseDown = (e) => {
    if (e.target.tagName === "TEXTAREA" || e.target.tagName === "BUTTON") return;
    startDrag(e.clientX, e.clientY);

    const handleMouseMove = (moveEvent) => moveDrag(moveEvent.clientX, moveEvent.clientY);
    const handleMouseUp = (upEvent) => {
      endDrag(upEvent.clientX, upEvent.clientY);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Touch events
  const handleTouchStart = (e) => {
    if (e.target.tagName === "TEXTAREA" || e.target.tagName === "BUTTON") return;
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    e.preventDefault(); // stop the page from scrolling while dragging
    const touch = e.touches[0];
    moveDrag(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    endDrag(touch.clientX, touch.clientY);
  };

  return (
    <div
      className="sticky-note"
      style={{
        backgroundColor: color,
        left: localPos.x,
        top: localPos.y,
        cursor: isDragging ? "grabbing" : "move",
        touchAction: "none", // disables browser's default touch gestures on this element
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <textarea value={text} onChange={(e) => onChange(id, e.target.value)} />
      <button onClick={() => onDelete(id)}>✕</button>
    </div>
  );
}

export default StickyNote;