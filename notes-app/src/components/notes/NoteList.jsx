import NoteCard from './NoteCard.jsx'

function NoteList(){
    const dummyNotes = [
        {
        id: 1,
        title: "Hello",
        content: "This card has only the dummy note for notes app with React and I am making it",
        date: "11/7/2026",
        },
        {
        id: 2,
        title: "Meeting Notes",
        content: "Discuss project milestones and next steps.",
        date: "11/8/2026",
        },
        {
        id: 3,
        title: "Shopping List",
        content: "Milk, eggs, bread, fruits.",
        date: "11/9/2026",
        },
    ];
    const styles = {
        display : "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap : "0.5rem",
        padding: "1rem"
    }
    return(<div style={styles}>
        {dummyNotes.map((note) => (<NoteCard key={note.id} note={note}/>))}
    </div>)
}

export default NoteList