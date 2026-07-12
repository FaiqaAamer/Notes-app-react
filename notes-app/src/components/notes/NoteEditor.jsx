import React, {useState, useEffect} from "react"
import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css"
import "./NoteEditor.css"

function NoteEditor({note, onSave, onClose}){
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    useEffect(() => {
        setTitle(note ? note.title : "")
        setContent(note ? note.content : "")
    }, [note])

    function HandleTitle(event){
        setTitle(event.target.value)
    }

    function HandleContent(event){
        setContent(event.target.value)
    }

    const HandleSave = () => {
        if(!title.trim() || !content.trim()){
            alert("Please enter title and content")
            return
        }
        const updatedNote = {
            ...note,
            title,
            content,
            date: new Date().toLocaleDateString(),
        };
        onSave(updatedNote)
        setTitle("")
        setContent("")
        onClose()
    }

    const modules = {
        toolbar: [
        [{ header: [1, 2, 3, false] }],  
        ["bold", "italic", "underline", "strike"], 
        [{ color: [] }, { background: [] }],        
        [{ list: "ordered" }, { list: "bullet" }], 
        [{ list: "check" }],
        [{ align: [] }],                            
        ["blockquote", "code-block"],                 // quotes, code snippets
        ["link", "image"],                            // insert links/images
        ["clean"],                                   
    ] }

    return(<div className="note-editor">
        <input type="text" value={title} placeholder="Note Title..." onChange={HandleTitle} className="note-title"/>
        <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
            placeholder="Write a note here..."
            className="note-content"
        />
        <button className="save-btn" onClick={HandleSave}>Save</button>
    </div>)
}

export default NoteEditor