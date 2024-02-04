import React from 'react'

export default function ButtonFillInside(props) {
    const mystyle = {
        color: props.textColor,
        outline: "3px solid",
        outlineColor: props.color,
        backgroundColor: props.color,
        fontFamily: "poppins-regular",
        height: "48%",
        width: "30%",
        borderRadius: "0.4em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "15px",
        fontWeight: "800",
        userSelect: "none"
    };
    return (
        <div style={mystyle} className="buttonFillInside" onClick={() => props.function(props.link)}>
            <div>{props.text}</div>
        </div>
    )
}
