import React, { useRef, useState, useEffect }  from "react";
import './CategoryBar.css';
import { connect } from "react-redux";

/*
function ScrollBar({contentRef}){
    const [thumbPos, setThumbPos] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const thumbRef = useRef(null);

    useEffect(() => {
        const contentEl = contentRef.current;
    });

    function handleMouseDown(e){
        e.preventDefault();
        setIsDragging(true);

        var thumb = thumbRef.current.getBoundingClientRect();
        console.log(thumb.left);

    };

    function handleThumbDrag(){
        e.preventDefault();
    }

    return(
        <div className="scrollbar">
            <div className="scrollbar-track"/>
            <div className="scrollbar-thumb" ref={thumbRef} onMouseDown={handleMouseDown}/>
        </div>
    )
}
 //<ScrollBar contentRef={contentRef} width={200}/>

*/

function CategoryBar(props){
    const contentRef = useRef(null);
    const data = props.data;
    const catHead = props.catHead;
    if(data == []){return}

    function LandscapeFrame(props){
        const entry = props.entry;//data.film needs renaming
        const index = props.index;

        return(
            <div className="entry-frame-border" key={index}>
                {(entry.poster_path && entry.backdrop_path)?(
                    <div className="entry-frame" style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w500/${entry.backdrop_path || entry.poster_path}')` }}>
                        <div className="entry-content">
                            <p className="entry-title">{entry.title || entry.name}</p>
                        </div>
                    </div>
                ) : (<p visibility="hidden"></p>)}
            </div>
        )
    }

    function handleArrowClick(direction){
        const scrollAmount = 1600;
        const {current} = contentRef;
        if(current){
            if(direction === "left" ? current.scrollLeft -= scrollAmount : current.scrollLeft += scrollAmount);
        }
        
    }

    function handleArrowRight(){
        handleArrowClick("right");
    }
    function handleArrowLeft(){
        handleArrowClick("left");
    }

    const handleScroll = (event) => {
        event.preventDefault();
        const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
        const element = document.getElementById(event.target.id);
        element.scrollLeft -= (delta * 40); // change this value to adjust the scroll speed
    };

    const arr = props.data;
    const entryList = arr.map((entry, index)=>
        <div className="scroll-item" key={index}>
            <LandscapeFrame entry={entry} index={index} />
        </div>
    )

    return (
        <div className="category-container">
            <div className="category-head">
                <p>{catHead}</p>
            </div>
            <div className="category-bar" >
                <div className="category-bar-left" onClick={handleArrowLeft}>⇠</div>
                <div className="category-bar-right" onClick={handleArrowRight}>⇢</div>
                <div className="scroll-list" ref={contentRef}>
                    {entryList}
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state){
    return{
        data: state.data
    }
}

export default connect(mapStateToProps)(CategoryBar);