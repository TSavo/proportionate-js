module.exports = function(array, part, whole){
    if(!(array instanceof  Array)){
        throw new Error("Proportionate only works when indexing into an array.")
    }
    if(part <= 0){
        return array[0];
    }
    if(part >= whole){
        return array[array.length-1];
    }
    var percent = part / whole;
    var where = (array.length - 1) * percent;
    return array[parseInt(Math.min(array.length-2, Math.max(1, where)))];
};

