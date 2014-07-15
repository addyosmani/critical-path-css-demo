critical-path-css-demo
======================

Generate and inline critical-path CSS example using [Critical](http://github.com/addyosmani/critical).

Live demo of [before](http://addyosmani.github.io/critical-path-css-demo/output/normal) and [after](http://addyosmani.github.io/critical-path-css-demo/output/critical) critical-path CSS generation and inlining.

*PageSpeed Insights results of before and after*

Before:

![](http://i.imgur.com/3vB2xRB.png)

After:

![](http://i.imgur.com/Kk6kCqn.png)

*WebPageTest results*

Before:

![](http://i.imgur.com/21Nrffy.png)

After:

![](http://i.imgur.com/GtINgPj.png)

### Great. So, what are your recommendations?

Use [Critical](https://github.com/addyosmani/critical) for generating and inlining your critical-path CSS and [loadCSS](https://github.com/filamentgroup/loadCSS/) to
async load in your [site-wide](https://github.com/addyosmani/critical-path-css-demo/blob/gh-pages/output/critical/index.html#L61) styles.

### Why is critical-path CSS important?

> CSS is required to construct the render tree for your pages and JavaScript will often block on CSS during initial construction of the page. You should ensure that any non-essential CSS is marked as non-critical (e.g. print and other media queries), and that the amount of critical CSS and the time to deliver it is as small as possible.

### Why should critical-path CSS be inlined?

> For best performance, you may want to consider inlining the critical CSS directly into the HTML document. This eliminates additional roundtrips in the critical path and if done correctly can be used to deliver a “one roundtrip” critical path length where only the HTML is a blocking resource.

## Installation

```sh
$ cd critical-path-css-demo
$ npm install
```

## Generating and inlining critical-path CSS

**Note: There are two build commands available. This allows you to compare the difference
between the output of a normal build and the output with critical-path CSS.**

The default (minify, concat) build for the project can be run with:

```sh
$ gulp
```

As you can see, Bootstrap's CSS is still 100KB after minification.

The complete (critical-path) build can be run with:

```sh
$ gulp critical
```

This performs the normal build, then generates and inlines critical-path CSS for the page,
taking the total size of HTML + CSS in index.html down to 7KB.

I then manually async load in the site-wide styles using [loadCSS](https://github.com/filamentgroup/loadCSS/).

## Disclaimer

Note that this sample project is just that - a sample. It does not demonstrate how well these tools and
techniques work on a complex site nor a site making heavy use of dynamic styles. Your mileage may vary
and I encourage testing the tools available before making a decision about whether Critical makes sense
for you.
