# The Proportionate Javascript Library

[![build status](https://gitlab.com/TSavo/proportionate-js/badges/master/build.svg)](https://gitlab.com/TSavo/proportionate-js/commits/master) [![coverage report](https://gitlab.com/TSavo/proportionate-js/badges/master/coverage.svg)](https://gitlab.com/TSavo/proportionate-js/commits/master) [![dependencies Status](https://david-dm.org/tsavo/proportionate-js/status.svg)](https://david-dm.org/tsavo/proportionate-js)

[ ![Codeship Status for TSavo/proportionate-js](https://app.codeship.com/projects/1315bfa0-a2d7-0134-9096-3678712ede07/status?branch=master)](https://app.codeship.com/projects/190098) [![Code Climate](https://codeclimate.com/github/TSavo/proportionate-js/badges/gpa.svg)](https://codeclimate.com/github/TSavo/proportionate-js) [![Test Coverage](https://codeclimate.com/github/TSavo/proportionate-js/badges/coverage.svg)](https://codeclimate.com/github/TSavo/proportionate-js/coverage) [![Issue Count](https://codeclimate.com/github/TSavo/proportionate-js/badges/issue_count.svg)](https://codeclimate.com/github/TSavo/proportionate-js)[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a1e37f3a37a3433290c3a5180c6c0457)](https://www.codacy.com/app/evilgenius/proportionate-js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=TSavo/proportionate-js&amp;utm_campaign=Badge_Grade) [![Codacy Badge](https://api.codacy.com/project/badge/Coverage/a1e37f3a37a3433290c3a5180c6c0457)](https://www.codacy.com/app/evilgenius/proportionate-js?utm_source=github.com&utm_medium=referral&utm_content=TSavo/proportionate-js&utm_campaign=Badge_Coverage) [![CircleCI](https://circleci.com/gh/TSavo/proportionate-js.svg?style=svg)](https://circleci.com/gh/TSavo/proportionate-js) 


- [The Proportionate Javascript Library](#the-proportionate-javascript-library)
  * [What it does](#what-it-does)
  * [How it does it](#how-it-does-it)
  * [Expected output](#expected-output)
- [Variation: Clamped Proportionate](#variation-clamped-proportionate)
  * [What it does](#what-it-does-1)
  * [How it does it](#how-it-does-it-1)
  * [Expected output](#expected-output-1)
- [Why do I need it?](#why-do-i-need-it)
- [Installation](#installation)
- [Example Usage](#example-usage)
  * [As a module](#as-a-module)
  * [As a prototype on Array](#as-a-prototype-on-array)
- [Clamped variation](#clamped-variation)
  * [As a module](#as-a-module-1)
  * [As a prototype on Array](#as-a-prototype-on-array-1)


## What it does

Convenience methods for dealing with proportions (a part, share, or number considered in comparative relation to a whole).

Specifically it allows you to select something from an array indexed proportionate to a number within an arbitrary range.

Useful when you need to select from a small list of things given a broad range of options.

## How it does it

It takes the form: 

    proportionate(sampleArray, valueInRange, [rangeMax(orMin), [rangeMax]]) => sample

It uses the formula:

    index = max(sampleSize, min(0, sampleSize * round((part - rangeMin) / (rangeMax - rangeMin)) - 1))

SampleArray and valueInRange are required arguments. SampleArray must be an array. RangeMin and rangeMax default to 0 and 99, respectively. If you specify one range argument, it's 0..rangeMax, but if you specify both, it's rangeMin..rangeMax.

## Expected output

Given the sampleArray:
    [1, 2, 3]
    
And the (default) range:
    0, 99
    
Or in functional notation:

    [0..99].map(x -> proportionate([1, 2, 3], x))
    
The expected truth table would be:

| Input | Output |
|:---:|:---:|
| 0-32 | 1 |
| 33-65 | 2 |
| 66-99 | 3 |

# Variation: Clamped Proportionate

## What it does

Clamped proportionate has the exact same interface, but only returns the extreme values when the input is equal to the extreme of the range.

## How it does it

It uses the formula:

    index = actual <= 0 ? 0 : actual >= max ? sampleSize - 1 : max(sampleSize, min(1, sampleSize * round((valueInRange - rangeMin) / (rangeMax - rangeMin)) - 2))

## Expected output

Given the sampleArray:
    [1, 2, 3]
    
And the (default) range:
    0, 99
    
Or in functional notation:

    [0..99].map(x -> proportionate([1, 2, 3], x))
    
The expected truth table would be:

| Input | Output |
|:---:|:---:|
| 0 | 1 |
| 1-98 | 2 |
| 99 | 3 |

# Why do I need it?

It's shorthand for the following rather unreadable code, seen many times in the wild:

    array[Math.max(array.length, Math.min(0, array.length * Math.round((actual - min) / (max - min)) - 1))]
    
It replaces it with:

    proportionate(array, actual, min, max)
    
Or, assuming a min of 0:

    proportionate(array, actual, max)
    
Or, assuming a range of 0..99:

    proportionate(array, actual)
    
Or, when using the Array.prototype option:

    array.proportionate(actual, min, max)
    array.proportionate(actual, max)
    array.proportionate(actual)

# Installation

    npm install --save proportionate 

# Example Usage

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

## Clamped variation

#### As a module:
```javascript
var proportionate = require("proportionate/clamped");

var tankFullness = ["empty", "almost empty", "half-full", "mostly full", "completely full"];

//Default range of 0..99
tankFullness.proportionate(0); // "empty"
tankFullness.proportionate(1); // "almost empty"
tankFullness.proportionate(45); // "half-full"
tankFullness.proportionate(98); // "mostly full"
tankFullness.proportionate(99); // "completely full"
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

Pull requests are welcome, please file any bugs on https://github.com/tsavo/proportionate-js