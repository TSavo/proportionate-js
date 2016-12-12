# The Proportionate Javascript Library
[![build status](https://gitlab.com/TSavo/proportionate-js/badges/master/build.svg)](https://gitlab.com/TSavo/proportionate-js/commits/master) [![coverage report](https://gitlab.com/TSavo/proportionate-js/badges/master/coverage.svg)](https://gitlab.com/TSavo/proportionate-js/commits/master)

[![Code Climate](https://codeclimate.com/github/TSavo/proportionate-js/badges/gpa.svg)](https://codeclimate.com/github/TSavo/proportionate-js) [![Test Coverage](https://codeclimate.com/github/TSavo/proportionate-js/badges/coverage.svg)](https://codeclimate.com/github/TSavo/proportionate-js/coverage) [![Issue Count](https://codeclimate.com/github/TSavo/proportionate-js/badges/issue_count.svg)](https://codeclimate.com/github/TSavo/proportionate-js)[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a1e37f3a37a3433290c3a5180c6c0457)](https://www.codacy.com/app/evilgenius/proportionate-js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=TSavo/proportionate-js&amp;utm_campaign=Badge_Grade) [![Codacy Badge](https://api.codacy.com/project/badge/Coverage/a1e37f3a37a3433290c3a5180c6c0457)](https://www.codacy.com/app/evilgenius/proportionate-js?utm_source=github.com&utm_medium=referral&utm_content=TSavo/proportionate-js&utm_campaign=Badge_Coverage) [![CircleCI](https://circleci.com/gh/TSavo/proportionate-js.svg?style=svg)](https://circleci.com/gh/TSavo/proportionate-js) 

Convenience methods for dealing with proportions (a part, share, or number considered in comparative relation to a whole).

Specifically it allows you to select something from an array indexed by the proportion of a number in a bounded range.

Useful when you need to select from a small list of things given a broad range of options.

It uses the formula:

index = sampleSize * Math.round((part - rangeMin) / (rangeMax - rangeMin)) - 1

It takes the form: proportionate(sampleArray, part, [rangeMax(orMin), [rangeMax]]) => sample

For example:

Given the sampleArray:
    [1, 2, 3]
    
And the (default) range:
    0, 99
    
The expected truth table would be:

| Input | Output |
|:---:|:---:|
| 0-32 | 1 |
| 33-65 | 2 |
| 66-99 | 3 |

## Variation: Clamped Proportionate

Clamped proportionate has the exact same interface, but only returns the extreme values when the input is equal to the extreme of the range:

| Input | Output |
|:---:|:---:|
| 0 | 1 |
| 1-98 | 2 |
| 99 | 3 |


# Installation

    npm install --save proportionate 

# Usage

#### As a module:
```javascript
var proportionate = require("proportionate");

var weightRanks = ["fly", "light", "medium", "heavy", "super-heavy"];

//Default range of 0..99
proportionate(weightRanks, 10); // "fly"
proportionate(weightRanks, 25); // "light"
proportionate(weightRanks, 45); // "medium"
proportionate(weightRanks, 65); // "heavy"
proportionate(weightRanks, 85); // "super-heavy"

//Range of 0..500
proportionate(weightRanks, 50, 500); // "fly"
proportionate(weightRanks, 150, 500); // "light"
proportionate(weightRanks, 250, 500); // "medium"
proportionate(weightRanks, 350, 500); // "heavy"
proportionate(weightRanks, 450, 500); // "super-heavy"

//Range of 80..350
proportionate(weightRanks, 90, 80, 350); // "fly"
proportionate(weightRanks, 180, 80, 350); // "light"
proportionate(weightRanks, 240, 80, 350); // "medium"
proportionate(weightRanks, 290, 80, 350); // "heavy"
proportionate(weightRanks, 330, 80, 350); // "super-heavy"
```

#### As a prototype on Array:
```javascript
// This installs .proportionate on Array.prototype:
require("proportionate/arrays"); 
//This also works:
require("proportionate").arrays();


var weightRanks = ["fly", "light", "medium", "heavy", "super-heavy"];

//Default range of 0..99
weightRanks.proportionate(10); // "fly"
weightRanks.proportionate(25); // "light"
weightRanks.proportionate(45); // "medium"
weightRanks.proportionate(65); // "heavy"
weightRanks.proportionate(85); // "super-heavy"

//Range of 0..500
weightRanks.proportionate(50, 500); // "fly"
weightRanks.proportionate(150, 500); // "light"
weightRanks.proportionate(250, 500); // "medium"
weightRanks.proportionate(350, 500); // "heavy"
weightRanks.proportionate(450, 500); // "super-heavy"

//Range of 80..350
weightRanks.proportionate(90, 80, 350); // "fly"
weightRanks.proportionate(180, 80, 350); // "light"
weightRanks.proportionate(240, 80, 350); // "medium"
weightRanks.proportionate(290, 80, 350); // "heavy"
weightRanks.proportionate(330, 80, 350); // "super-heavy"
```

## Clamped variation:

#### As a module:
```javascript
var proportionate = require("proportionate/clamped");

var tankFullness = ["empty", "almost empty", "half-full", "mostly full", "completely full"];

//Default range of 0..99
proportionate(tankFullness, 0); // "empty"
proportionate(tankFullness, 1); // "almost empty"
proportionate(tankFullness, 45); // "half-full"
proportionate(tankFullness, 98); // "mostly full"
proportionate(tankFullness, 99); // "completely full"
```

#### As a prototype on Array:
```javascript
// This installs .proportionate on Array.prototype:
require("proportionate/clamped/arrays"); 
//This also works:
require("proportionate/clamped").arrays();

var tankFullness = ["empty", "almost empty", "half-full", "mostly full", "completely full"];

//Default range of 0..99
tankFullness.proportionate(0); // "empty"
tankFullness.proportionate(1); // "almost empty"
tankFullness.proportionate(45); // "half-full"
tankFullness.proportionate(98); // "mostly full"
tankFullness.proportionate(99); // "completely full"
```
