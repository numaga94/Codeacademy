# Bootstrap Utilities and Components

The Bootstrap framework allows us to streamline webpage layout and styling. In this lesson, we’re going to focus on
using Bootstrap’s utility classes that provide additional styling and components that each serve distinct purposes.

Throughout this lesson, we’re going to become acquainted with Bootstrap’s extensive documentation. Bootstrap’s
documentation offers a lot of important information and examples. For instance, we can follow
[Bootstrap’s Getting Started - Starter template](https://getbootstrap.com/docs/5.0/getting-started/introduction/#starter-template)
to add the Bootstrap framework to our project!

After we’ve incorporated the necessary Bootstrap files, we can quickly style our elements using Bootstrap’s predefined
CSS classes and take advantage of Bootstrap’s JavaScript files to incorporate a level of interactivity to our webpages.

Now that we’ve got the basics covered, we can bootstrap up our site!

## Adding Colors

Bootstrap utility classes provide an element with styling and purpose. Let’s get acquainted with utility classes by
styling the color of our elements.

Let’s say we want to change the text color of our paragraph element from the default black to blue. We would add a class
of `"text-primary"`, like so:

    <p class="text-primary">This text is blue!</p>

According to the documentation, the `"text"` portion of the class targets the element’s text styling. Appending
`"primary"` after `"text"` changes the text color to blue. The name of the class, `"text-primary"`, also signifies that
this `<p>` element conveys information that appears first, i.e, is the primary text.

We could have used any of the classes provided in
[Bootstrap’s color example](https://getbootstrap.com/docs/5.0/utilities/colors/#color) to change the text color of our
`<p>` element.

Similarly, we can also change the background color:

    <div class="bg-success">
        Green! This signifies success!
    </div>

In the example above, we’ve assigned the `<div>` element a class of `"bg-success"`. The `"bg"` part references the
element’s background and `"success"` changes the background color to green. We can also tell from the name of the class
that this `<div>` element is meant to be used when something happened/worked. We can find more background utility
classes at
[Bootstrap’s background color examples](https://getbootstrap.com/docs/5.0/utilities/colors/#background-color).

To get the full range of what we can do with Bootstrap’s color utility classes, check out
[Bootstrap’s colors documentation](https://getbootstrap.com/docs/5.0/utilities/colors). Now, let’s add some color to our
own examples.

## Styling Text

If we want to style and format text, we can use
[Bootstrap’s text utility classes.](https://getbootstrap.com/docs/5.0/utilities/text/)

For instance, if we want our text to be bold, we could add a class of `"font-weight-bold"` like so:

    <p class="font-weight-bold">
        This rendered text is bold.
    </p>

We can also combine Bootstrap classes for additional styling. Let’s say we wanted our text to also be uppercased. We
would add `"text-uppercase"` to the class attribute:

    <p class="fw-bold text-uppercase">
        This rendered text is both bold and uppercased.
    </p>

Let’s make use of these text utility classes!

## Element Positioning

When considering the layout of a webpage, we have to think about how to position our elements. Conveniently, Bootstrap
provides positioning utility classes.

We can apply CSS positioning styling by assigning an element a utility class found in
[Bootstrap’s positioning documentation](https://getbootstrap.com/docs/5.0/utilities/position/). It would also be worth
knowing [how these position are rendered on a webpage](https://developer.mozilla.org/en-US/docs/Web/CSS/position).

For example, if we want an element that is fixed to the top, we can apply a `"fixed-top"` class:

    <!-- bootstrap 4 -->
    <div class="fixed-top">
        This div will be fixed at the top of the screen.
    </div>

    <!-- bootstrap 5 -->
    <div class="position-absolute top-50 start-50">
        This div will be fixed at the top of the screen.
    </div>

There are a few other positioning utility classes, so let’s explore how to use them!

## The Navigation Component

In addition to useful utility classes, Bootstrap offers a collection of components, such as a navbar, buttons, a
carousel/slideshow for images, and much more! Each Bootstrap component serves a distinct purpose and we can find
examples and code snippets directly from the documentation — then, we can tweak the components to our personal needs.

The first component we’ll investigate is the navigation (nav) component which offers our users a collection of links.
The nav component is slightly different from a navbar component. The nav component is often specific to one or a few
webpages, whereas a navbar often appears on all the pages of a website.

There are many ways to create a basic nav component. Here’s one example:

    <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>

In the above example:

We created a navigation component using an `<ul>` that has a class of `"nav"`. The `<ul>` has nested `<li>` elements
which each have a class of `"nav-item"`. Inside each `<li>` is an `<a>` which has a class of `"nav-link"`.
Alternatively, for a simpler nav component of only links:

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="nav-link" href="#">First Link</a>
        <a class="nav-link" href="#">Second Link</a>
    </nav>

Notice that we still have the parent element with a class of "nav" and the children elements with a class of "nav-link".
Both examples render the same links, but we might choose one example over the other depending on how we want our layout
to look.

Read through [Bootstrap’s nav documentation](https://getbootstrap.com/docs/5.0/components/navbar/#nav) for more
information.

## The Button Component

Another common component we see on websites are buttons. Buttons represent a clickable object that does something else
in return like navigating to a different page, submitting a form, or opening a popup, just to name a few.

By default, the `<button>` element doesn’t have much styling. But, with Bootstrap we can make button components that
have more styling. Here’s an example from
[Bootstrap’s button documentation](https://getbootstrap.com/docs/5.0/components/buttons/) :

    <button type="button" class="btn btn-danger">Danger</button>

The example above will render a red button that has the text `Danger` inside the button:

- It has a type of `"button"`.
- It has two classes, `"btn"` and `"btn-danger"`.
  - The `"btn"` class provides Bootstrap’s default button styling.
  - The `"btn-danger"` turns the button red and conveys the purpose of the button, i.e. clicking this button might not
    be safe!

Visit [Bootstrap’s button documentation](https://getbootstrap.com/docs/5.0/components/buttons/) for a comprehensive list
of how to create and use button components.

## Collapsing a Component

Bootstrap also allows us to quickly add interactivity to a webpage. One way to include interactivity is to toggle the
visibility of an element.

To add such a feature, we need two elements and a few attributes — one element with content and another element that
switches the visibility of the previous element. For example:

    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    This button controls the following div's visibility.
    </button>

    <div class="collapse" id="collapseExample">
    <p>This content's visibility gets toggled</p>
    </div>

In the example above, we have a `<button>` element that toggles the visibility of the `<div>` element below it.

The button has an attribute `data-toggle="collapse"` which enables button’s toggle ability. Another attribute,
`data-target="#collapseExample"`, means that this button toggles the visibility of the element with the id of
`"collapseExample"`. The `aria-expanded` and `aria-controls` attributes are information for screen readers and other
accessibility means.

Focusing our attention on the `<div>` below the button, notice that it has a class of `"collapse"`, which hides the
content when the webpage initially renders. Our `<div>` also has an id of "`collapseExample"` which corresponds to the
value of the button’s `data-target`.

With both elements set up, we’ve made our page interactive! Look up
[Bootstrap’s collapse documentation](https://getbootstrap.com/docs/5.0/components/collapse/) for additional ways of
incorporating collapse.

### Creating a Navbar

Let’s combine our knowledge of collapse, buttons, and the nav component to make a responsive navbar! We often find
navbars at the top of websites and we can use a navbar to quickly navigate to useful/important pages on the website.

Below is an example from [Bootstrap’s Navbar documentation](https://getbootstrap.com/docs/5.0/components/navbar/) that
we’ve modified:

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Brand Goes Here</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
        <li class="nav-item active">
            <a class="nav-link" href="#">Current Page Link <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Another Page Link</a>
        </li>
        </ul>
    </div>
    </nav>

There’s a lot going on, so let’s break it down before we use it in our own code:

- We have a `<nav>` element with multiple classes:

  1. `"navbar"` makes this `<nav>` a Bootstrap navbar.
  2. `"navbar-expand-lg"` renders the `<div class="collapse navbar-collapse">` element on large (and extra large
     screens). The `"lg"` portion is called a breakpoint and refers to screen size widths. We can append one of any
     breakpoint value at the end, i.e. `"sm"`, `"md"`, `"lg"`, or `"xl"`.
  3. `"navbar-light"` assigns a color scheme to the navbar.
  4. `"bg-light"` assigns a background color to the navbar.

- Inside the `<nav>` is an `<a>` with a class of `"navbar-brand"` which can be an image or text that represents the
  brand/logo of the website.
- There is a `<button>` that renders when a user’s screen size is smaller than the breakpoint value in
  `"navbar-expand-{breakpoint}"` and toggles the visibility of the navbar menu to save space.
  - If the user’s screen size matches the breakpoint (or is bigger), then the `<div>`, with the nav component and its
    links, renders instead of the button.
- The `<ul>` and the nested `<li>` make up a nav component.
- The first `<li>` has a class of `"active"` which highlights the user’s current page.

### The Jumbotron Component

In arenas and stadiums, there are giant screens called jumbotrons which display the main event for everyone in the crowd
to see. Bootstrap also offers a jumbotron component that serves a similar function and makes content stand out.

Here’s an example of a basic jumbotron that only contains text:

    <div class="jumbotron">
        <h1>Wow this stands out!</h1>
    </div>

In the example above we included an `<h1>` element, but we could add images or a variety of Bootstrap components. Look
over [Bootstrap’s jumbotron documentation](https://getbootstrap.com/docs/4.2/components/jumbotron/) for more elaborate
examples.

`Migration V5: In Bootstarp 5, the jumbotron component is removed in favor of utility classes like .bg-light for the background color and .p-\* classes to control padding.`

## Adding a Card

Bootstrap also has a card component that serves as a container for smaller customized content. Card components are often
grouped together to display a collection of similar content in manageable chunks. We can draw a comparison of the card
component to playing cards in deck — in both cases, there are cards grouped together and each one contains something
different.

Below is an example modified from
[Bootstrap’s card documentation](https://getbootstrap.com/docs/5.0/components/card/#example):

    <div class="card" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
    </div>

Let’s highlight a few key points from the example:

- To make a card component we need to assign a class of `"card"` to an element.
- Inside the card component, there are two children, an `<img>` and a `<div>` element.
- The `<img>` has a class of `"card-img-top"` which adds styling and formatting to the image.
- The `<div>` has a class of `"card-body"` which adds a section with default padding.
- The content inside the card body all have classes with `"card-{value}"` which adds styling to these elements specific
  for Bootstrap cards.
- By default, this card will take up the entire width of its parent element.

Let’s add some of our own cards, remember to check
[Bootstrap’s card documentation](https://getbootstrap.com/docs/5.0/components/card) for more customizations!

## The Carousel Component

There are times that we want to showcase a group of images but not want to have our users scroll through one picture on
top of another. Instead, we could fit our images into a slideshow using Bootstrap’s carousel component.

[Bootstrap has many carousel examples](https://getbootstrap.com/docs/5.0/components/carousel/) but let’s go through a
basic example together:

    <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
        <div class="carousel-item active">
        <img class="d-block w-100" src="example_slide_1.png" alt="First slide">
        </div>
        <div class="carousel-item">
        <img class="d-block w-100" src="example_slide_2.png" alt="Second slide">
        </div>
    </div>
    </div>

The example above will render a slideshow that loops through two images, displaying one at a time. In the actual code:

- The parent `<div>` element has an id of `"carouselExampleSlidesOnly"`, two classes `"carousel"` and `"slide"`, and the
  attribute `data-ride="carousel"`.

  1. The id is used later when we want to add controls to click between slides.
  2. The classes provide the styling and formatting.
  3. The data-ride attribute provides the interactivity and slide transitions.

- We also have a nested `<div class="carousel-inner"> ` element that contains other `<div>` elements with images.
- Nested inside the 2nd `<div>` is yet another `<div>` with a class of `"carousel-item"` and `"active"` (only one image
  needs the active class, if none have active, no images are shown).
- Each `<div>` with `.carousel-item` has a nested `<img>` element which have the usual src and alt attributes.
  - The `<img>` elements use two utility classes `"d-block"` sets its display as block and the `"w-100"` is to take up
    100% of the width.

Now, let’s implement a carousel with arrows that control the slideshow.

## Review

Go ahead and give yourself that well-deserved pat on the back, you’ve worked your way through Bootstrap utility classes
and components!

Remember, it is extremely important to check Bootstrap documentation for instructions on component implementation!

Because we checked documentation we were able to use:

- animations and interactivity that requires the addition of Bootstrap’s JavaScript files.
- utility classes which affect the styling and position of elements.
- the nav component provides default Bootstrap styling to links.
- the responsive navbar component to quickly navigate between webpages.
- the jumbotron component which prominently displays an image or text.
- the card component that acts as a stylized content container.
- collapse to toggle component visibility.
- the carousel component to create a slideshow which displays images or text.

Now, go forth and see what else you can bootstrap to your site!

## [Complete exmaple of homepage for a garden](./garden.html)
