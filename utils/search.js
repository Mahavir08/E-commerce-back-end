exports.search = (query, queryStr) => {

    const keyword = queryStr.keyword ? {
        name:{
            $regex : queryStr.keyword,
            $options : 'i'
        }
    } : {}
        
    result = query.find(keyword)    
    return result;
}