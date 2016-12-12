var proportionate  = function(array, part, startOrWhole, whole){
    if(!(Array.isArray(array))){
        throw new Error("Proportionate only works when indexing into an array.")
    }
    var min = 0;
    var max = startOrWhole || 99;
    if(whole){
        min = startOrWhole;
        max = whole;
    }
    if(part <= min){
        return array[0];
    }
    if(part >= max){
        return array[array.length-1];
    }
    var percent = (part - min) / (max - min);
    var where = Math.round((array.length) * percent) - 1;
    return array[Math.min(array.length-2, Math.max(1, where))];
};

proportionate.arrays = function(){
    Array.prototype.proportionate = function(part, startOrWhole, whole){
        return proportionate(this, part, startOrWhole, whole);
    };
};

module.exports = proportionate;