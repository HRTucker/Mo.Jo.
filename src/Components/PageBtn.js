import React from "react";
import "./PageBtn.css";
import { addData, changePage} from "../Redux/actions";
import { connect } from "react-redux";

function PageBtn(props) {
    var pageNum = props.currentPage;
    console.log(props.lastContent);

    function getNewPageDB(url){
        fetch(url + `&page=${pageNum}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                console.log(JSON.parse(data));
                console.log(JSON.parse(data).results);
                props.addData(JSON.parse(data).results);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function getPreviousPage() {
        if (pageNum != 1) {
            props.changePage(pageNum -= 1);
            getNewPageDB(props.lastContent);
        }
    }
    function getNextPage() {
        if (pageNum != 1000) {
            props.changePage(pageNum += 1)
            getNewPageDB(props.lastContent);
        }
    }

    return <div className='page-bar'>
        <input type='button' className='page-btn' value="<" onClick={getPreviousPage} />
        <p className='page-num'>Page: {pageNum}</p>
        <input type='button' className='page-btn' value=">" onClick={getNextPage} />
    </div>
}

const mapDispatchToProps = {
    changePage,
    addData
}

function mapStateToProps(state){
    return{
        data: state.data,
        currentPage: state.currentPage,
        lastContent: state.lastContent
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PageBtn);

