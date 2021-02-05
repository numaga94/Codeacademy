# BOOTSTRAP 4: GRID

## Getting Started with Bootstrap

Creating a website from scratch can take a lot of work and require a working knowledge of HTML, CSS, and maybe some
JavaScript. But with Bootstrap, the amount of work and prior knowledge is reduced.

Bootstrap is a framework of readily available code that integrates with HTML to create stylized websites that adapt the
layout to users’ screen sizes. This framework allows us to cut down on the time needed to style a website, simplifies
the complexity of how to layout elements, works across multiple browsers, and reduces the frustration of using plain
CSS. All it takes to use Bootstrap is a few additional lines in our HTML document.

In this lesson, we’ll be working with Bootstrap 4. To incorporate Bootstrap into a project, we have to include two
<_meta_> tags and the Bootstrap CSS library. In the example below, Bootstrap is linked via Content Delivery Network
(CDN) in the <_head_> element, like so:

    <!doctype html>
    <html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">

        <title>Hello, world!</title>
    </head>
    <body>
        <h1>Hello, world!</h1>

        <!-- Optional JavaScript; choose one of the two! -->

        <!-- Option 1: Bootstrap Bundle with Popper -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>

        <!-- Option 2: Separate Popper and Bootstrap JS -->
        <!--
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>
        -->
    </body>
    </html>

There are also some optional JavaScript libraries if we want to add some interactivity to our website and these are
inserted at the end of our <_body_> element. Check out
[Bootstrap’s Getting Started documentation](https://getbootstrap.com/docs/5.0/getting-started/introduction/) for more
insight. We’ve also added the optional JavaScript links in the code editor.

If you’re ready, strap on those boots and let’s get started!

### Intro to the Grid

![demo](https://content.codecademy.com/courses/learn-bootstrap-4/layout-diagram.svg)

Take a look at the provided diagram and key — container, rows, columns are color coded.

The Basic Layout shows the fundamental structure. The Nested Layers shows how to build a more complex layout by nesting
rows inside a column. Lastly, the Entire Webpage shows how a webpage can be laid out as a system of containers, rows,
and columns.

Bootstrap simplifies the layout of a website using a grid system. For us to fully take advantage of Bootstrap’s grid
system, we need to understand how to structure our HTML.

At the heart of it, containers are the basis of Bootstrap’s grid. Inside containers, we nest rows as immediate children.
Then, nested inside rows are columns. Inside columns, we put our actual content. Take a look below at an example of this
nesting pattern. Don’t worry about the syntax of rows and columns just yet, but do take note of how our HTML is
organized:

    <div class="container">
    <div class="row">
        <div class="col">
        <!-- A column inside a row inside a container! -->
        </div>
    </div>
    </div>

We can gain even more control of our layout once we start nesting rows inside columns and setting widths for our
columns! But, first, let’s review how to create a layout using Bootstrap.

### Bootstrap Containers

Bootstrap uses a grid system based on
[CSS Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) which organizes content in rows or
columns. As seen in the previous exercise, Bootstrap also uses rows and columns and in this exercise we’ll learn about
the essential Bootstrap container. Using the Bootstrap grid also allows for responsive design, in other words, a
website’s layout can change based on the user’s screen size. Read more about grid at
[Bootstrap’s grid documentation](https://getbootstrap.com/docs/4.1/layout/grid/).

Bootstrap uses classes to apply CSS rulesets — these rulesets dictate the layout and styling of the element. To create a
container, necessary for Bootstrap’s grid, we assign a class of "container" to a <_div_> like so:

    <div class="container"></div>

The <_div_> from the example above becomes a Bootstrap container which has a width relative to a user’s screen size,
becomes horizontally centered, and has a left and right margin.

If we wanted the container to take up the entire width of the screen we can assign a class of "container-fluid":

    <div class="container-fluid"></div>

Knowing how to use documentation is important. We can always check what classes to add using
[Bootstrap’s grid documentation](https://getbootstrap.com/docs/4.1/layout/grid/).

**Note**: the Bootstrap site uses CSS notation for classes, which entails having a `.` before a class name like
`.example-class-name`.

### Rows

Now that we have an understanding of how the layout works in Bootstrap and how to use containers, let’s focus our
attention to rows.

As mentioned in the previous exercise, rows are nested within containers. Also, we can add as many rows as we want
inside a container. By default, a row will take up the entire width of its parent container. To create a row we assign a
`class` of `"row"` to an element. Take a look at the provided example with a nested row inside a container:

    <div class="container">
    <div class="row">
    </div>
    </div>

### Columns

We’ve covered containers and rows, now we have to go one level deeper and explore Bootstrap’s columns.

Columns are the immediate children of rows and store content. By default, a column will take up the entire width of its
parent row. As we add more columns inside a row, the default behavior is for each column’s width to be readjusted to fit
in the row — each column will have the same width. At most, a row will accommodate 12 columns. Study the diagram below
to see how column sizing works:

![Diagram outlining Bootstrap rows of columns and the sizing of each column](https://content.codecademy.com/courses/learn-bootstrap-4/simple-12-grid.svg)

Notice the first row in the diagram has 1 column and it takes up the entire width of the row. We could say that this
column takes up the width of 12 individual columns. The width of an individual column can be seen in the last row of the
diagram.

To create a column, we assign an element with the `class` of `"col"`. Take a look at the provided example with a
container that has a nested row which has a nested column:

    <div class="container">
    <div class="row">
        <div class="col">
        </div>
    </div>
    </div>

### Setting Column Widths

In the previous exercise, we saw how columns take on a default width based on the size of the row. However, Bootstrap
gives us more customization options so that we can make columns of varying widths. Take a look at 4th and 5th row of the
diagram for examples of rows containing columns of differing widths:

![Bootstrap columns can have different widths](https://content.codecademy.com/courses/learn-bootstrap-4/12-col-grid-diff-widths.svg)

We can decide the width of a column by appending a hyphen and a number to the `"col"` class like so:

    <div class="col-8">
    <p>This is the width of 8 columns.</p>
    </div>

In our example, our row still has 4 columns worth of space. If we decide to add an adjacent column, we could also set
our desired width like so:

    <div class="row">
    <div class="col-8">
        <p>This is the width of 8 columns.</p>
    </div>
    <div class="col-4">
        <p>This has the width of 4 columns.</p>
    </div>
    </div>

If we didn’t specify a desired width for the second column, it would still resize itself to fill in the remaining space
in the row. But, by adding `"-4"`, we make our code more readable and allow other developers to clearly know our
intentions.

### Setting Column Width with Content

Another option we could use to set the width of a column is the content inside the column.

If we want to use the content to set a column’s width, we append `"auto"` to the class of the column, for example:

    <div class="col-auto">
        <p>This content determines the width of the parent column</p>
    </div>

In the example above, the width of the column is determined by the text inside the <_p_> element.

### Bootstrap Breakpoints

![example](https://content.codecademy.com/courses/learn-bootstrap-4/Film-Festival-Responive-updated.gif)

One benefit of using Bootstrap is that it incorporates responsive design. With responsive design, the layout of the
content changes to accommodate a user’s screen size.

Bootstrap categorizes screen sizes into 5 categories or as breakpoints: extra small, small, medium, large, and extra
large. Each breakpoint has a range measured in pixels. The range of these breakpoints and accompanying device types are
marked in the following table:

    Category        Breakpoint  Breakpoint Range    Device Type
    Extra small	    default     < 576 px            portrait smartphones
    Small           sm          ≥ 576 px            landscape smartphones
    Medium	        md          ≥ 768 px            tablets
    Large	        lg          ≥ 992 px            desktops
    Extra Large	    xl          ≥ 1200 px           large desktop

By using these breakpoints in combination with Bootstrap’s grid, we can customize the layout of our content for
different screens.

### Breakpoint Naming Convention

Using Bootstrap, we can freely change the layout of our content using grid. We can even customize how our content on the
grid changes based on breakpoints (extra small, small, medium, large, extra large). To incorporate these breakpoints
into our code, we have to follow Bootstrap’s class naming convention.

The naming convention follows a pattern of `"col-{breakpoint}-{width}"`. Let’s break this pattern down:

- As seen before `"col"` refers to a column.
- `{breakpoint}` can be `sm`, `md`, `lg`, or `xl`. Notice that there is no extra small or `xs` breakpoint. If we omit
  `{breakpoint}`, it is by default for extra small screens.
- `{width}` can be set from 1 to 12 and assigns a width to the column.
- When we set a `{breakpoint}-{width}`, it means that we want our column to have that set width for screens that fit in
  the specified breakpoint range and other larger screens.

For instance:

    <div class="col-sm-8">
    </div>

The column in the example will be as wide as 8 individual columns on small screen sizes and also any larger screens
(medium, large, and extra large). In the next exercise, we’ll go over how to customize our layout for every breakpoint.
For now, let’s get comfortable with Bootstrap’s naming convention. To get even more information check out
[Bootstrap’s grid options documentation](https://getbootstrap.com/docs/5.0/layout/grid/#grid-options).

### Combining Bootstrap Classes

In the previous exercise, we went over how to follow Bootstrap naming conventions to add breakpoint requirements for a
column. We can go one step further and add multiple classes to our columns for additional control over the rendering of
our content.

Let’s walk through the syntax and thought process using an example:

First, we’d want to think about how our column looks like on extra small screens. Since we don’t have much space, we
would want to have our column take up the entirety of the row and assign a class of `"col-12"`. We don’t include an `xs`
breakpoint, it’s implicitly applied for us! Our column looks like:

    <div class="col-12">
    </div>

Then we decide that for medium-sized screens we don’t want the column to take up so much space, so we could set the
width to `8`. We use the Bootstrap naming convention and add an additional class to the column like so:

    <div class="col-12 col-md-8">
    </div>

For large screen sizes, we want the column to take up even less relative space and we set the width to `6`. We have to
add another class to the column:

    <div class="col-12 col-md-8 col-xl-6">
    </div>

From the example, we have a column that renders a different width based on a user’s screen size. On extra small and
small sized screens, the column has a width of 12 individual columns. For medium and large sized screens, the column has
a width of 8 individual columns. Lastly, for extra large screens, the column has a width of 6 individual columns. We
could’ve even used up all of Bootstrap’s provided breakpoints! Read
[Bootstrap’s grid mix and match documentation](https://getbootstrap.com/docs/5.0/layout/grid/#mix-and-match) for more
information.

Example from Bootstrap documentation:

    <div class="container">
        <!-- Stack the columns on mobile by making one full-width and the other half-width --> <div class="row">
        <div class="col-md-8">.col-md-8</div> <div class="col-6 col-md-4">.col-6 .col-md-4</div> </div>

        <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
        <div class="row">
            <div class="col-6 col-md-4">.col-6 .col-md-4</div>
            <div class="col-6 col-md-4">.col-6 .col-md-4</div>
            <div class="col-6 col-md-4">.col-6 .col-md-4</div>
        </div>

        <!-- Columns are always 50% wide, on mobile and desktop -->
        <div class="row">
            <div class="col-6">.col-6</div>
            <div class="col-6">.col-6</div>
        </div>
    </div>

### Bootstrap 4 Grid Review

Let’s review some key concepts:

- When in doubt, check [Bootstrap’s documentation](https://getbootstrap.com/docs/5.0/getting-started/introduction/).
- There are a few required links to use Bootstrap (the CSS file and two <_meta_> tags)
- Bootstrap 4 has a grid system implemented using flexbox
- The grid system is made of containers, rows, and columns that work together to make a web page’s layout.
- Containers are needed to implement the grid.
- Containers hold rows which hold columns.
- Bootstrap’s grid follows a 12 column system.
- Bootstrap uses responsive design and is built around breakpoints related to device screen sizes.
- To manually set the width of a column we have to follow Bootstrap’s naming convention.
- We can add multiple classes to a column to determine how wide a column should be on specific breakpoints.
