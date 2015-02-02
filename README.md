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

This performs the normal build, then generates and inlines critical-path CSS for the page.

We then manually async load in the site-wide styles using [loadCSS](https://github.com/filamentgroup/loadCSS/).

## Tutorial

Follow the next few lines to install and scaffold a project using [Yeoman](http://yeoman.io) and Gulp:

```sh
$ mkdir myapp && cd myapp
$ npm install -g yo generator-gulp-webapp
$ yo gulp-webapp

# Select Bootstrap and say no to Modernizr & Sass
```

You should now have a valid set of source files, including a `Gulpfile.js`. 

The first thing we're going to do is install the Critical module which can generate and inline your critical-path CSS for you. We'll also be using a [Rename](https://npmjs.org/package/gulp-rename/) module, which we'll explain the need for shortly. 

These can be installed as follows:

```sh
$ cd myapp
$ npm install critical gulp-rename --save-dev
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

Critical will overwrite your optimized CSS with critical-path CSS, so we'll want to copy the `dist` styles to a new file called `site.css` so we can load it later on. We'll do this in a separate task called `copystyles` and reference it in our task. Note that we're using the rename module below to rename our output:

```js
gulp.task('copystyles', function () {
    return gulp.src(['dist/styles/main.css'])
        .pipe($.rename({
            basename: "site" // site.css
        }))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('critical', ['build', 'copystyles'], function () {

});
```

Note: Before continuing, open up `app/index.html` and update the styles block in the `<head>` so that both Bootstrap and your custom styles are output to a single file:

```html
<!-- build:css styles/main.css -->
<!-- bower:css -->
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css" />
<link rel="stylesheet" href="styles/main.css">
<!-- endbuild -->
```

This makes things more straight-forward when it comes to inlining later on.

We'll then read the app's `index.html` file and generate the critical-path (above the fold) CSS, finally inlining it in our `index.html` file.

```js
gulp.task('critical', ['build', 'copystyles'], function () {
    critical.generateInline({
        base: 'dist/',
        src: 'index.html',
        styleTarget: 'styles/main.css',
        htmlTarget: 'index.html',
        width: 320,
        height: 480,
        minify: true
    });
});
```

Above I've passed in a `width` and `height` which represent the viewports I'm targeting with my above-the-fold CSS. Great. So when we run `gulp critical` now we should be able to successfully generate critical-path CSS.

Generating and inlining above-the-fold CSS is not enough as we'll also want to load in our site-wide styles which will cover the below-the-fold CSS amongst other things. Critical takes care of this, too. A small script inspired by the [loadCSS](https://github.com/filamentgroup/loadCSS/) function by FilamentGroup will asyncronously load your site styles for you.

## Disclaimer

Note that this sample project is just that - a sample. It does not demonstrate how well these tools and
techniques work on a complex site nor a site making heavy use of dynamic styles. Your mileage may vary
and I encourage testing the tools available before making a decision about whether Critical makes sense
for you.
