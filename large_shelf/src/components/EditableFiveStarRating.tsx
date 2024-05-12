import { Fragment, MouseEvent, useState } from "react";
import "../styles/editable_five_star_rating_styles.css";

interface EditableFiveStarRatingProps {
    id: string;
    starCount: number;
    onStarClick: (starCount: number) => void;
}

export function EditableFiveStarRating(
    {
        id,
        starCount,
        onStarClick
    }: EditableFiveStarRatingProps
) {
    /*
    
        soruce: https://codepen.io/hesguru/pen/BaybqXv
    
    */
    return (
        <div 
            id = {id}
            className = "rate"
        >
            <input 
                type = "radio" 
                id = "star5" 
                name="rate" 
                value="5" 
                checked = {starCount === 5}
                onClick = {
                    () => {
                        onStarClick(5);
                    }
                }
            />
            
            <label 
                htmlFor = "star5" 
                title="text"
            >
                5 stars
            </label>
            
            <input 
                type = "radio" 
                id="star4" 
                name="rate" 
                value="4" 
                checked = {starCount === 4}
                onClick = {
                    () => {
                        onStarClick(4);
                    }
                }
            />
            <label 
                htmlFor = "star4" 
                title="text"
            >
                4 stars
            </label>

            <input 
                type = "radio" 
                id="star3" 
                name="rate" 
                value="3" 
                checked = {starCount === 3}
                onClick = {
                    () => {
                        onStarClick(3);
                    }
                }
            />
            <label
                htmlFor = "star3" 
                title="text"
            >
                3 stars
            </label>
            
            <input 
                type = "radio" 
                id="star2" 
                name="rate" 
                value="2"
                checked = {starCount === 2}
                onClick = {
                    () => {
                        onStarClick(2);
                    }
                }
            />
            <label 
                htmlFor = "star2" 
                title="text"
            >
                2 stars
            </label>
            
            <input 
                type = "radio" 
                id="star1" 
                name="rate" 
                value="1" 
                checked = {starCount === 1}
                onClick = {
                    () => {
                        onStarClick(1);
                    }
                }
                />
            <label 
                htmlFor = "star1" 
                title="text"
            >
                1 star
            </label>
        </div>
    )
}