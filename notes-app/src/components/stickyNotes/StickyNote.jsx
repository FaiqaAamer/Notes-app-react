import React, { useRef, useState } from "react"
import "./StickyNote.css"

function StickyNote({note, onUpdatePosition, onChange, onDelete}){
    const {id, text, color, x, y} = note
    const offset = useRef({ x: 0, y: 0 })
    const [localPos, setLocalPos] = useState({ x, y })
    const [isDragging, setIsDragging] = useState(false)

    const handleMouseDown = (e) => {
        if (e.target.tagName === "TEXTAREA" || e.target.tagName === "BUTTON") return

        setIsDragging(true)
        offset.current = {
            x: e.clientX - localPos.x,
            y: e.clientY - localPos.y
        }

        const handleMouseMove = (moveEvent) => {
            const newX = moveEvent.clientX - offset.current.x
            const newY = moveEvent.clientY - offset.current.y
            setLocalPos({ x: newX, y: newY })   // update local state only — fast, no parent re-render
        }

        const handleMouseUp = (upEvent) => {
            const finalX = upEvent.clientX - offset.current.x
            const finalY = upEvent.clientY - offset.current.y
            onUpdatePosition(id, finalX, finalY)   // commit to parent ONLY once, at the end
            setIsDragging(false)
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
        }

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    return(
        <div
            className="sticky-note"
            style={{
                backgroundColor: color,
                left: localPos.x,
                top: localPos.y,
                cursor: isDragging ? "grabbing" : "move"
            }}
            onMouseDown={handleMouseDown}
        >
            <textarea value={text} onChange={(e) => onChange(id, e.target.value)}></textarea>
            <button onClick={() => onDelete(id)}>✕</button>
        </div>
    )
}

export default StickyNote