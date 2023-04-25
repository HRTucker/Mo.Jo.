export function addData(dbData){
    return{
        type: 'ADD_DATA',
        data: dbData
    }
}

export function changePage(num){
    return{
        type: 'CHANGE_PAGE',
        currentPage: num
    }
}

export function changeLastContent(url){
    return{
        type: 'CHANGE_LASTCONTENT',
        lastContent: url
    }
}

