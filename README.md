critical-path-css-demo
======================

Generate and inline critical-path CSS example using [Oust](http://github.com/addyosmani/oust], [Penthouse](https://github.com/pocketjoso/penthouse) and [gulp-inline](https://github.com/ashaffer/gulp-inline/).

### Why is critical-path CSS important?

> CSS is required to construct the render tree for your pages and JavaScript will often block on CSS during initial construction of the page. You should ensure that any non-essential CSS is marked as non-critical (e.g. print and other media queries), and that the amount of critical CSS and the time to deliver it is as small as possible.

### Why should critical-path CSS be inlined?

> For best performance, you may want to consider inlining the critical CSS directly into the HTML document. This eliminates additional roundtrips in the critical path and if done correctly can be used to deliver a “one roundtrip” critical path length where only the HTML is a blocking resource.

## Installation

```
cd critical-path-css-demo
npm install
```

## Generating and inlining critical-path CSS

The default (minify, concat) build for the project can be run with:

```
gulp
```

As you can see, Bootstrap's CSS is still 100KB after minification. 

The complete (critical-path) build can be run with:

```
gulp critical
```

This performs the normal build, then generates and inlines critical-path CSS for the page, taking the CSS down to 4KB.