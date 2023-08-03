import React, { useRef, useState, useEffect }  from "react";
import './CategoryBar.css';
import { connect } from "react-redux";
import IconArrowLeft from "../Icons/IconArrowLeft";
import IconArrowRight from "../Icons/IconArrowRight";
import tmdb_api from "../API/TMDB_API";
import { Link } from "react-router-dom";

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
    const type = props.type;
    const Title = props.title;
    const data = props.data;

    useEffect(() => {
        //setData(props.data);
    }, []);


    function LandscapeFrame(props){
        const entry = props.entry;//data.film needs renaming
        const index = props.index;

        return(
            <div className="entry-frame-border" key={index}>
                {(entry.poster_path && entry.backdrop_path)?(
                    <div className="entry-frame" style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w500/${entry.backdrop_path || entry.poster_path}')` }}>
                        <div className="entry-content">
                            <Link to={`/entry/${type}/${entry.id}`}><p className="entry-title">{entry.title || entry.name}</p></Link>
                        </div>
                    </div>
                ) : (<p visibility="hidden"></p>)}
            </div>
        )
    }

    function FrameDecoration(){
        return (
            <div className="entry-frame-decoration">
                <div className="entry-frame-decoration-group">
                    <div className="entry-frame-decoration-spacer"></div>
                    <div className="entry-frame-decoration-spacer"></div>
                    <div className="entry-frame-decoration-spacer"></div>
                    <div className="entry-frame-decoration-spacer"></div>
                    <div className="entry-frame-decoration-spacer"></div>
                    <div className="entry-frame-decoration-spacer"></div>
                    <div className="entry-frame-decoration-spacer"></div>
                    <div className="entry-frame-decoration-spacer"></div>
                    <div className="entry-frame-decoration-spacer"></div>
                    <div className="entry-frame-decoration-spacer"></div>
                </div>
            </div>
        )
    }

    const handleArrowClick = (direction)=>{
        const {current} = contentRef;
        //console.log(current.offsetWidth);
        const scrollAmount = 19*(current.offsetWidth/20);
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

    const handleScroll = (event) => {//DEPRECATED NOT USED
        event.preventDefault();
        const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
        const element = document.getElementById(event.target.id);
        element.scrollLeft -= (delta * 40); // change this value to adjust the scroll speed
    };

    var entryList = [];

    if(!data){return}else{
        const arr = data;
        entryList = arr.map((entry, index)=>
            <div className="scroll-item" key={index}>
                <FrameDecoration/>
                <LandscapeFrame entry={entry} index={index} />
                <FrameDecoration/>
            </div>
        )
    }
    
    return (
        <div className="category-container">
            <div className="category-head">
                <p>{Title}</p>
            </div>
            <div className="category-bar" >
                <div className="category-bar-left" onClick={handleArrowLeft}><IconArrowLeft className='category-arrow-icon'/></div>
                <div className="category-bar-right" onClick={handleArrowRight}><IconArrowRight className='category-arrow-icon'/></div>
                <div id={Title} className="scroll-list" ref={contentRef}>
                    {entryList}
                </div>
            </div>
        </div>
    );
}

export default CategoryBar;