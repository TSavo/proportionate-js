# proportionate-js
Convenience methods for dealing with proportions (a part, share, or number considered in comparative relation to a whole).

Specifically it allows you to select something from an array indexed by the proportion of a number in a bounded range.

Useful when you need to select from a small list of things given a broad range of options.

For example:

Given the sample:
    [1, 2, 3]
    
And the bounded range:
    0..100
    
The expected truth table would be:

| Input | Output |
|:---:|:---:|
| 0-32 | 1 |
| 33-65 | 2 |
| 66-100 | 3 |

#Installation

    npm install

#Usage

proportionate(sample, part, whole)
 
Sample is an array of things to select from.
Part is the
  returns the sample that lies at the index of 'part' relative to the range 0..whole.
####As a module:
```coffeescript
proportionate = require("proportionate");

var weightRanks= ["fly", "light", "medium", "heavy", "super-heavy"];
                 

proportionate(weightRanks)
```