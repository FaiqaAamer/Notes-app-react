import { useState } from 'react';
import NoteCard from './NoteCard.jsx'
import "./NoteCard.css"

function NoteList(){
    const [openMenuId, setOpenMenuId] = useState(null)
    const dummyNotes = [
        {
        id: 1,
        title: "Hello",
        content: "This card has only the dummy note for notes app with React and I am making it",
        date: "11/6/2026",
        },
        {
        id: 2,
        title: "Meeting Minutes",
        content: "Discuss project milestones and next steps.",
        date: "11/8/2026",
        },
        {
        id: 3,
        title: "Shopping List",
        content: "Milk, eggs, bread, fruits.",
        date: "11/10/2026",
        },
        {
        id: 4,
        title: "Workout Plan",
        content: "Morning jog, 20 push-ups, and 10 minutes of stretching.",
        date: "11/10/2026",
        },
        {
        id: 5,
        title: "Recipe Ideas",
        content: "Try making creamy pasta with mushrooms and garlic bread.",
        date: "11/11/2026",
        },
        {
        id: 6,
        title: "Book Notes",
        content: "Summarize chapters 3–5 of 'Atomic Habits' for study reference.",
        date: "11/12/2026",
        },
        {
        id: 7,
        title: "Weekend Plans",
        content: "Visit the park, watch a movie, and relax with coffee.",
        date: "11/13/2026",
        },
        {
        id: 8,
        title: "Project Tasks",
        content: "Finish UI design, test API integration, and push to GitHub.",
        date: "11/14/2026",
        },
        {
        id: 9,
        title: "Learning Goals",
        content: "Practice React hooks and build a small CRUD app.",
        date: "11/15/2026",
        },
        {
        id: 10,
        title: "Shopping Reminder",
        content: "Buy cat food, detergent, and new notebooks.",
        date: "11/16/2026",
        },
        {
        id: 11,
        title: "Birthday Gift Ideas",
        content: "Personalized mug, scented candles, or a photo frame.",
        date: "11/17/2026",
        },
        {
        id: 12,
        title: "Coding Practice",
        content: "Solve 3 JavaScript problems on arrays and objects.",
        date: "11/18/2026",
        },
        {
        id: 13,
        title: "Daily Journal",
        content: "Reflect on today’s progress and note key learnings.",
        date: "11/19/2026",
        }
    ];
    const styles = {
        display : "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap : "0.5rem",
        padding: "1rem",
        boxSizing : "border-box"
    }
    return(<div style={styles} className='node-list'>
        {dummyNotes.map((note) => (<NoteCard key={note.id} note={note}
                                    isMenuOpen={openMenuId === note.id}
                                    onToggleMenu={() => setOpenMenuId (prev => (prev === note.id ? null : note.id))}
                                />))}
    </div>)
}

export default NoteList