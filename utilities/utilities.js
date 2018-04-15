function getNumbersForRoute(route) {    
    var returnArray = [];
    for(var i = 0; i < route.length; i++) {
        returnArray.push(route[i].number)
    }
    return returnArray;
}