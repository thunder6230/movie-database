import React from "react"

export default function RatingModal(props){
    const rating = props.rating
    const circumference = 20 * 2 * Math.PI
    const offset = circumference - rating / 100 * circumference
    
    
    return(
        <div className="box-lg">
            <div className="percent-lg">
                <svg
                strokeDasharray={`${circumference} ${circumference}`}
                >
                    <circle cx="20" cy="20" r="20"></circle>
                    <circle
                      strokeDashoffset={offset}
                      stroke={props.rating >= 75 ? "#3bff00" : "#d2d531"}
                      cx="20"
                      cy="20"
                      r="20"></circle>
                </svg>
                <div className="number-lg">
                    {props.rating === 0 ? 
                    <p>NA</p> : <p>{props.rating}<span>%</span></p>}
                </div>
            </div>
        </div>
        
    )
}