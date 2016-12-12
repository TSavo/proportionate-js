var proportionate = require("proportionate");

var weightRanks = ["fly", "light", "medium", "heavy", "super-heavy"];
console.log(proportionate(weightRanks, 90, 80, 350));
console.log(proportionate(weightRanks, 180, 80, 350));
console.log(proportionate(weightRanks, 240, 80, 350));
console.log(proportionate(weightRanks, 290, 80, 350));
console.log(proportionate(weightRanks, 330, 80, 350));