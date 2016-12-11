proportionate = require("./index");
Array.prototype.proportionate = function(part, whole){
    return proportionate(this, part, whole);
};