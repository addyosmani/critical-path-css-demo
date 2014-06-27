critical-path-css-demo
======================

A critical-path CSS generation example using Oust and Penthouse.

From PageSpeed:

> CSS is required to construct the render tree for your pages and JavaScript will often block on CSS during initial construction of the page. You should ensure that any non-essential CSS is marked as non-critical (e.g. print and other media queries), and that the amount of critical CSS and the time to deliver it is as small as possible.

## Installation

```
cd critical-path-css-demo
npm install
```

## Generating critical-path CSS

Default build for the project:

```
gulp
```

As you can see, Bootstrap's CSS is still 100KB after minification. 

Next, generate the critical path CSS for the project:

```
gulp critical
```

This runs a normal build, followed by running the app and processing it through Phantom via [Penthouse](https://github.com/pocketjoso/penthouse).

The critical path CSS is 4KB.
