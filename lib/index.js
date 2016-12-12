var proportionate = function(array, part, startOrWhole, whole){
    if(!(array instanceof  Array)){
        throw new Error("Proportionate only works when indexing into an array.")
    }
    var min = 0;
    var max = startOrWhole || 99;
    if(whole){
        min = startOrWhole;
        max = whole;
    }
    var percent = (part - min) / (max - min);
    var where = Math.round((array.length) * percent) - 1;
    return array[Math.min(array.length-1, Math.max(0, where))];
};

proportionate.arrays = function(){
    Array.prototype.proportionate = function(part, startOrWhole, whole){
        return module.exports(this, part, startOrWhole, whole);
    };
};

module.exports = proportionate;