import React, { useState } from "react";
import { ReactComponent as Icons } from "./Icon.svg";
import "./drag.css";

function Drag (props) {
    const [order, setOrder] = useState(["Have a Quiet Night in", "Try a New Restaurant", "Go to a Concert/Show", "Watch Sports"])
    const [drag, setDrag] =useState({});
    
    const onDragStart = (e, index) => {
        console.log("order[index]: ", order[index]);
        setDrag(order[index]);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    };

    const onDragOver = index => {
        const draggedOverItem = order[index];

        // if the item is dragged over itself, ignore
        if (drag === draggedOverItem) {
            return;
        }

        // filter out the currently dragged item
        let newOrder = order.filter(item => item !== drag);

        // add the dragged item after the dragged over item
        newOrder.splice(index, 0, drag);

        setOrder(newOrder)

        console.log(order);
    };

    const onDragEnd = () => {
        console.log(order);
        props.onChange(order);
        setDrag({});
    };

    console.log(order);
    return (
        <div className="AboutUser">
            <main>
                <h3>How would you most like to spend your free time?</h3>
                <h5>(List in Order)</h5>
                <ul>
                    {order.map((item, idx) => (
                        <li key={item} onDragOver={() => onDragOver(idx)}>
                            <div
                                className="drag"
                                draggable
                                onDragStart={e => onDragStart(e, idx)}
                                onDragEnd={onDragEnd}
                                >
                                <Icons />
                            </div>
                            <span className="content">{item}</span>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}


export default Drag;