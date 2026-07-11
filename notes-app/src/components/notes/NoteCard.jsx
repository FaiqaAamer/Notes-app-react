import { MoreVertical } from "lucide-react";
import React, { useState } from "react"

function NoteCard({note  : {title, content, date}, isMenuOpen, onToggleMenu}){
    const styles = {
        height : "250px",
        width : "220px",
        border : "2px solid #7B6A55",
        borderRadius : "5px",
        margin : "5px",
        padding : "5px",
        backgroundColor : "#fdf9f5"
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
        backgroundColor : "#f6eae2",
        border : "2px solid #8b592b3a",
        borderRadius : "5px",
        height : "150px"
    }
    const footer = {
        display : "flex",
        alignItems : "center",
        justifyContent : "space-between",
        marginLeft : "15px",
        marginTop : "-10px",
        position : "relative"
    }
    const p2 = {
        fontWeight : "bold",
        paddingBottom : "25px"
    }
    const menuBtn = {
        background : "none",
        border : "none",
        cursor : "pointer",
        paddingBottom : "25px",
        color : "#7B6A55"
    }
    const dropdown = {
        position : "absolute",
        right : "10px",
        top : "35px",
        backgroundColor : "#fff",
        border : "1px solid #ccc",
        borderRadius : "5px",
        boxShadow : "0 2px 6px rgba(0,0,0,0.15)",
        display : "flex",
        flexDirection : "column",
        zIndex : 10,
        minWidth : "120px"
    }
    const dropdownItem = {
        padding : "8px 12px",
        background : "none",
        border : "none",
        textAlign : "left",
        cursor : "pointer",
        fontSize : "14px"
    }

    return(<div style={styles}>
        <h2 style={h2}>{title}</h2>
        <p style={p}>{content}</p>
        <div style={footer}>
            <p style={p2}>{date}</p>
            <button style={menuBtn} onClick={onToggleMenu}> 
                <MoreVertical size={18} />
            </button>
            {isMenuOpen && (
                <div style={dropdown}>
                    <button style={dropdownItem}>Pin</button>
                    <button style={dropdownItem}>Archive</button>
                    <button style={dropdownItem}>Delete</button>
                </div>
            )}
        </div>
    </div>)
}

export default NoteCard