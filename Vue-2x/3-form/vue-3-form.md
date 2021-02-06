# VUE FORMS

## Overview

Welcome to Vue Forms! In [Vue Data](../2-data/vue-2-data.md), you learned how to store dynamic data and methods on Vue
instances and then display that data using mustache templates. In this lesson, you will learn how to use HTML forms to
modify this data.

The first half of the lesson will discuss how to bind the different types of HTML form fields to the data stored on your
Vue instances. The second half will then cover how to clean, validate, and submit this data allowing you to create
complete, interactive forms for your users.

With these goals in mind, let’s jump into this lesson!

## Text, Textarea, and Select Bindings

In [Vue Data](../data/vue-2-data.md), we learned that there are two main places to store dynamic data in Vue apps:
`data` for known dynamic values and `computed` for dynamic values that are determined using other dynamic values.

In web development, it is very common to add forms to sites to allow users to modify these types of dynamic values. As a
result, Vue has implemented a directive, called `v-model`, that automatically binds form fields to dynamic values on the
Vue app. When a form field is bound to a value, whenever the value in that form field changes, the value on the Vue app
will change to the same value as well. Similarly, if the data on the Vue app changes, the value in the form field will
automatically change to reflect the new value to the user.

    // html
    <input type="text" v-model="username" />

    // js
    const app = new Vue({
    el: '#app',
    data: { username: 'Michael' }
    });

In this example, we bound an `<input>` field to a piece of Vue data called `username`, like so:

- We added a piece of dynamic data to the Vue app called `username`
- We used `v-model` on an `<input>` field to bind the `<input>` to the piece of data with the provided name: `username`.

Now, when this example site is loaded, the `<input>` will already be pre-filled with `'Michael'`, the starting value of
username. Then, whenever the `<input>` is modified by the user, the `username` `data` value will automatically change to
the value typed in by the user.

In this example, we bound the form field to a property on data. However, `v-model` also works with computed properties
as well.

`v-model` works on all HTML form field elements. So, simple form fields such as `<textarea>` elements and `<select>`
elements can be bound to `data` and `computed` properties in the exact same way: adding `v-model="propertyName"` to the
opening tag of the elements.

We will cover slightly more complex form elements in the following exercises.

## Radio Button Bindings

An interesting example of a slightly more complex form field is radio buttons. Radio buttons are a series of buttons
where the user can only select one. When a different button is selected, the previously-selected button becomes
unselected.

In HTML, each radio button is its own `<input>` field. However, they all correspond to the same piece of data in the Vue
app. As a result, each `<input>` field will need its own `v-model `directive. However, the value of `v-model` for each
`<input>` will be the same: the name of the property they all correspond to.

    // html
    <legend>How was your experience?</legend>

    <input type="radio" id="goodReview" value="good" v-model="experienceReview" />
    <label for="goodReview">Good</label>

    <input type="radio" id="neutralReview" value="neutral" v-model="experienceReview" />
    <label for="neutralReview">Neutral</label>

    <input type="radio" id="badReview" value="bad" v-model="experienceReview" />
    <label for="badReview">Bad</label>

    // js
    const app = new Vue({
    el: '#app',
    data: { experienceReview: '' }
    });

In this example, we have three radio button `<input>` elements all bound to the same piece of data using `v-model`:
`experienceReview`.

When one of the three buttons is selected, it’s value becomes the value of `experienceReview`. For example, if the
“Good” radio button is selected, `experienceReview` will become the value of that `<input>`: "good".

Note: The `<legend>` and `<label>` elements and the id properties on the `<input>`s used in this example are used for
site accessiblity. These are not Vue features and, thus, are outside the scope of this course. Please take our lesson on
[HTML Forms](https://www.codecademy.com/courses/learn-html/lessons/html-forms/exercises/forms-intro) if you’d like more
information on this topic.

## Array Checkbox Bindings

Another interesting form field example is checkboxes. Checkboxes are used in situations where users can select multiple
options for a form field. Unlike radio buttons, previous selections won’t be unselected when new selections are added.
Instead, users can select all of the relevant checkboxes they’d like.

As a result, the dynamic piece of data bound to these types of checkboxes must be an array. This array stores all of the
values checked in the list of checkboxes.

    // html
    <legend>Which of the following features would you like to see added?</legend>

    <input type="checkbox" id="search-bar" value="search" v-model="requestedFeatures">
    <label for="search-bar">Search Bar</label>

    <input type="checkbox" id="ads" value="ads" v-model="requestedFeatures">
    <label for="ads">Ads</label>

    <input type="checkbox" id="new-content" value="content" v-model="requestedFeatures">
    <label for="new-content">New Content</label>

    // js
    const app = new Vue({
        el: '#app',
        data: { requestedFeatures: [] }
    });

In this example, we have a set of checkbox fields where users can select all of the features they want to see added to
the site. Each checkbox `<input>` field has the same `v-model` added to it: `requestedFeatures`. All of the values of
the checked `<input>` elements will be added to the `requestedFeatures` array on `data`.

For example, if the “Search Bar” and “New Content” checkboxes were selected by the user, the value of
`requestedFeatures` would be `['search', 'content']`.

## Boolean Checkbox Bindings

You may not always use a list of checkboxes. Sometimes you may only need a single checkbox to indicate whether a user
has or has not checked a single option. In this case, we need to change the type of Vue data bound to the checkbox.

As seen in the previous example, if you are using a list of checkboxes with values, they need to be bound to an array to
store all of the checked values. A single checkbox, however, can be represented by a boolean value. If the checkbox is
checked, the value is `true` — if the value is unchecked, the value is `false`.

    // html
    <legend>Would you recommend this site to a friend?</legend>
    <input type="checkbox" v-model="wouldRecommend" />

    // js
    const app = new Vue({
        el: '#app',
        data: { wouldRecommend: false }
    });

In this example, we’ve add `v-model` to a single checkbox. If the user would recommend this site to their friends, they
will check the box and the value of `wouldRecommend` will be set to `true`. If they uncheck the box or leave it
unchecked, the value of `wouldRecommend` will be `false`.

## Form Event Handlers

As you may have seen previously in your learning journey, every web app experience consists of a series of events and
responses to those events. Everything that can happen in a web app, from a user clicking a button to a piece of
information coming back from a database, is considered an event. As seen in
[MDN’s list of events](https://developer.mozilla.org/en-US/docs/Web/Events#Form_Events), forms have two built-in events
that we need to handle: `submit` events (when a submit button is pressed to submit the final form) and `reset` events
(when a reset button is pressed to reset the form to its initial state).

As we saw briefly in Introduction to Vue, Vue uses the `v-on` directive to add event handlers. Event handlers will
respond to the specified event by calling the specified method.

We can use the `v-on` directive on `<form>` elements to add form event handling functionality, like so:

    // html
    <form v-on:reset="resetForm">
        ...
        <button type="reset">Reset</button>
    </form>

    // js
    const app = new Vue({
        el: '#app',
        methods: { resetForm: function() { ... } }
    });

In this example, we added a `reset` event handler to our form. We specify the type of event to respond to after a colon,
`:`, and then specify the method to call as the value of the directive. When a user clicks the “Reset” button, a `reset`
event will be triggered (because the `type` of the button is `reset`), the `<form>` event handler will see this event
appear, and the `resetForm` method will be called in response.

Note: A common shorthand for event handlers involves replacing v-on: with @, like so:

    // shorthand
    <form @reset="resetForm">
    ...
    </form>

Both syntaxes are acceptable and used in Vue applications.

## Form Event Modifiers

If you have prior front-end development experience, you might have some familiarity with common event-handling
boilerplate. If not, don’t fret — Vue has you covered!

In order to ensure a great web experience, browsers set up default actions to perform in response to events. That way
even if a web app doesn’t know how to handle an event, the browser will still respond to it. You saw this in the
previous exercise when your app refreshed the page in response to a form submit event.

Event objects have built-in methods to modify this behavior, such as
[Event.preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) (which stops the browser
from performing its default event-handling behavior) and
[Event.stopPropagation()](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation) (which stops the event
from continuing to be handled beyond the current handler).

Vue gives developers access to these methods in the form of `modifiers`. Modifiers are properties that can be added to
directives to change their behavior. Vue includes modifiers for many common front-end operations, such as event
handling.

    <form v-on:submit.prevent="submitForm">
    ...
    </form>

In this example, we added the `prevent` modifier to a form `submit` event handler directive. This will automatically
call `Event.preventDefault()` whenever our event handler is triggered — in the case of form submit events, this will
prevent the page from reloading.

Similarly, if we had used the `stop` modifier, it would call `Event.stopPropagation()`. You can find
a[ list of available modifiers in the Vue documentation.](https://vuejs.org/v2/api/#v-on)

## Input Modifiers

Modifiers are incredibly useful tools for quickly adding essential front-end logic to directives. Vue offers modifiers
for many of their directives, including the main topic of this lesson: `v-model`. Yes, that’s right, we can use
modifiers to make our form fields even more versatile.

    <input type="text" id="first-name" v-model.trim="firstName" />
    <textarea id="requests" v-model.trim="specialRequests"></textarea>

    <select id="ticket-quantity" v-model.number="ticketQuantity">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
    </select>

Vue offers the following three modifiers for `v-model`:

- `.number` — automatically converts the value in the form field to a number
- `.trim` — removes whitespace from the beginning and ends of the form field value
- `.lazy` — only updates data values when `change` events are triggered (often when a user moves away from the form
  field rather than after every keystroke)

You can find out more information about these modifiers in the [Vue documentation.](https://vuejs.org/v2/api/#v-model)

## Form Validation

There is one last piece of functionality we must cover to round out your Vue form knowledge — validation.

Form validation is the process in which we ensure all required information has been provided by the user and provided in
the proper format. We don’t want a user to forget an important piece of information, like their last name, and never be
informed about it!

There are many ways to implement form validation in Vue — we will cover one of the more common methods.

This method makes heavy use of the `disabled` `<button>` property. In brief, if `disabled` is present (or set to `true`)
on a `<button>` element, that` <button>` will not do anything when pressed. Whereas if `disabled` is not present (or set
to `false`), the button will work as expected. You can find more information about the `disabled` property in the
[MDN `<button> `documentation.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Attributes)

    // html
    <button type="submit" v-bind:disabled="!formIsValid">Submit</button>

    // js
    const app = new Vue({
    el: '#app',
    computed: {
        formIsValid: function() { ... }
    }
    });

In this example:

- We use the `v-bind` directive to set the value of the `disabled` property on a “Submit” button to the value of a
  computed property called `formIsValid`
- `formIsValid` will contain some logic that checks the values stored on the Vue app and returns a boolean representing
  whether or not the form is valid
- If the form is valid, `formIsValid` will return `true` and the `disabled` property will not be present on the “Submit”
  button, keeping the button enabled
- If the form is not valid, `formIsValid` will return `false` and the button will be disabled

This solution may seem somewhat complex. It is important to note that this is not a technique we would expect you to
come up with on your own at this stage in your learning journey. However, it is incredibly important to know how to
implement form validation, so we wanted to introduce it to you at this stage. Take some time reviewing this code and
memorizing it so that you can feel confident implementing validation as you build Vue forms in the future.

## Review

Congratulations, you now know how to bind HTML forms to Vue data and listen to events in Vue! Let’s review the major
takeaways from this lesson:

- Form fields can be bound to Vue data using the `v-model` directive — how `v-model` is used depends on the type of
  field it is being added to
- Form event handlers can be added using `v-on:submit` and `v-on:reset`
- Modifiers can be used to add functionality to directives — most importantly preventing page reload on form submission
  using `v-on:submit.prevent` and cleaning up form field values using `.number` and `.trim`
- Form validation can be implemented by setting the value of the disabled attribute on a `<button>` to the value of a
  computed property using `v-bind`

Good job on tackling all of this material! You can now create a pretty significant front-end using Vue. You should be
proud of how far you’ve come in such a short period of time. Good work!
