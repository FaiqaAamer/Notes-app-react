import React from "react"

function NoteCard({note  : {title, content, date}}){
    const styles = {
        height : "250px",
        width : "220px",
        border : "2px solid #6B4226",
        borderRadius : "5px",
        margin : "5px",
        padding : "5px",
        backgroundColor : "#FAF0E6"
    }
    const h2 = {
        margin : "5px",
        textAlign : "center",
        fontFamily : "Cambria",
        fontSize : "25px"
    }
    const p = {
        marginLeft : "15px",
        marginRight : "15px",
        margin : "10px",
        paddingLeft : "20px",
        paddingRight : "20px",
        paddingTop : "10px",
        paddingBottom : "10px",
        backgroundColor : "#F4E1D5",
        border : "2px solid #8b592b3a",
        borderRadius : "5px",
        height : "150px"
    }
    const p2 = {
        textAlign : "right",
        marginRight : "15px"
    }

    return(<div style={styles}>
        <h2 style={h2}>{title}</h2>
        <p style={p}>{content}</p>
        <p style={p2}>{date}</p>
    </div>)
}

export default NoteCard