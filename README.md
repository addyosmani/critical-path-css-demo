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
async load in your [site-wide](https://github.com/addyosmani/critical-path-css-demo/blob/gh-pages/output/critical/index.html#L71) styles.

### Why is critical-path CSS important?

> CSS is required to construct the render tree for your pages and JavaScript will often block on CSS during initial construction of the page. You should ensure that any non-essential CSS is marked as non-critical (e.g. print and other media queries), and that the amount of critical CSS and the time to deliver it is as small as possible.

### Why should critical-path CSS be inlined?

> For best performance, you may want to consider inlining the critical CSS directly into the HTML document. This eliminates additional roundtrips in the critical path and if done correctly can be used to deliver a “one roundtrip” critical path length where only the HTML is a blocking resource.

## Installation

```sh
$ cd critical-path-css-demo
$ npm install && bower install
```

## Generating and inlining critical-path CSS

**Note: There are two build commands available. This allows you to compare the difference
between the output of a normal build and the output with critical-path CSS.**

The default (minify, concat) build for the project can be run with:

```sh
$ gulp
```

The complete (critical-path) build can be run with:

```sh
$ gulp critical
```

This performs the normal build, then generates and inlines critical-path CSS for the page. It automatically async loads in the site-wide styles using [loadCSS](https://github.com/filamentgroup/loadCSS/) as part of the workflow offered by the module.

## Tutorial

Follow the next few lines to install and scaffold a project using [Yeoman](http://yeoman.io) and Gulp:

```sh
$ mkdir myapp && cd myapp
$ npm install -g yo generator-gulp-webapp
$ yo gulp-webapp

# Select Bootstrap and say no to Modernizr & Sass
```

You should now have a valid set of source files, including a `Gulpfile.js`. 

The first thing we're going to do is install the Critical module which can generate and inline your critical-path CSS for you. 

This can be installed as follows:

```sh
$ cd myapp
$ npm install critical --save-dev
```

Great. Next, add a reference to Critical at the top of your `Gulpfile.js`:

```js
var critical = require('critical');
```

We can now use it in our build process. Let's write a new task called `critical`.

Our workflow for critical-path CSS is to first run a normal `build`, which will generate the optimized CSS (`dist/styles/main.css`) and resources needed for our app. We pass the `build` command as the second argument below:

```js
gulp.task('critical', ['build'], function () {

});
```

Next, we'll add in our configuration for the `critical` module:

```js
gulp.task('critical', ['build'], function (cb) {
    critical.generate({
        inline: true,
        base: 'dist/',
        src: 'index.html',
        dest: 'dist/index-critical.html',
        minify: true,
        width: 320,
        height: 480
    });
});
```

That's it. You can now run `gulp critical` to generate a complete build where `dist/index-critical.html` will contain your final output files. Above I've passed in a `width` and `height` which represent the viewports I'm targeting with my above-the-fold CSS. `minify` ensures that the inlined CSS gets minified.

## Disclaimer

Note that this sample project is just that - a sample. It does not demonstrate how well these tools and
techniques work on a complex site nor a site making heavy use of dynamic styles. Your mileage may vary
and I encourage testing the tools available before making a decision about whether Critical makes sense
for you.
