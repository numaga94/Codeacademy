# STYLING ELEMENTS WITH VUE

## Overview

Welcome to Styling Elements with Vue! The name of this course may be slightly misleading — the only way to style HTML
elements is still CSS. However, now that we know how to create dynamic web pages, we need our CSS to dynamically change
too. Luckily, Vue contains features for making this essential functionality easy to implement.

In the first half of this lesson, we will learn how to dynamically add inline styles to HTML elements based on the data
in our Vue applications. Then, in the second half of the lesson, we will learn how to refactor this work to dynamically
add classes instead.

This lesson is fairly short, but the information in it is essential for making professional front-end web apps. Enjoy!

## Inline Styles

We will start this lesson by demonstrating how to dynamically add inline styles to HTML elements in your Vue
application.

As you might recall from early on in learning CSS, inline styles are CSS style rules added directly to HTML elements.
You apply inline `styles` by using the style attribute on HTML elements, like so:

    <h2 style="color:red">Breaking News</h2>

In the past, we have advocated against the use of inline styles, since they make CSS harder to debug and make HTML
harder to read. However, front-end frameworks actually make inline styling a powerful tool due to their ability to
contain CSS to small, reusable pieces of front-end code. We will use them extensively later on in your Vue journey.

Here is the syntax for adding dynamic inline styles using Vue:

    // html
    <h2 v-bind:style="{ color: breakingNewsColor, 'font-size': breakingNewsFontSize }">Breaking News</h2>

    // js
    const app = new Vue({
    data: {
        breakingNewsColor: 'red',
        breakingNewsFontSize: '32px'
    }
    });

In this example, we use the `v-bind:style` directive to set the value of two inline styles to two Vue app properties.
The value of the `v-bind:style` directive is an object where the keys are CSS properties and the values are dynamic
properties on the Vue app.

In this case, we set the color property on an `<h2>` element to the value of `breakingNewsColor` on the Vue app,
`'red'`, and the `font-size` property to `breakingNewsFontSize`, `'32px'`.

Note in the example that if we want to set a value for a hyphenated CSS property, such as `font-size`, we need to put
the property name in quotes in order to construct a valid JavaScript object.

This example only used values stored in `data`, however `computed` properties can be used for `v-bind:style` and all of
the other directives covered in this lesson in the same way.

While dynamic inline styles are only used to make our HTML slightly more readable in this example, we will have more
impressive uses for inline styling in the next exercise.

## Computed Style Objects

A common pattern for adding dynamic inline style objects is to add a dynamic Vue app property that generates the style
object. For example, we could refactor the previous example as follows:

    ex1 with data:
    // html
    <h2 v-bind:style="breakingNewsStyles">Breaking News</h2>

    // js
    const app = new Vue({
    data: {
        breakingNewsStyles: {
        color: 'red',
        'font-size': '32px'
        }
    }
    });

    ex2 with computed:
    // html
    <button type="submit" v-bind:disabled="!formIsValid" v-bind:style="submitButtonStyles">Confirm Tickets</button>

    //js
    const app = new Vue({
        computed: {
            submitButtonStyles: function() {
                if (this.formIsValid) {
                    return {
                        'background-color': '#4c7ef3',
                        cursor: 'pointer'
                    }
                } else {
                    return {
                        'background-color': 'gray',
                        cursor: 'default'
                    }
                }
            }
        }
    });

In this example, we store the style object, `breakingNewsStyles`, as a Vue app property and then make that object the
value of `v-bind:style`. Using this pattern, we can make style objects for specific, reusable use cases.

This pattern also allows us to consolidate similar style-computing logic to a single computed property instead of
computing styles on a rule-by-rule basis. Instead of creating a computed property for every rule that we want to apply
to an element if it passes a certain condition, we can instead create a single computed property that checks the
condition and then returns an object with all of the relevant style rules.

## Multiple Style Objects

Another powerful aspect of v-bind:style is that it can also take an array of style objects as a value.

    ex1 with data
    // js
    const app = new Vue({
    data: {
        newsHeaderStyles: {
        'font-weight': 'bold',
        color: 'grey'
        },
        breakingNewsStyles: {
        color: 'red'
        }
    }
    });

    // html
    <h2 v-bind:style="[newsHeaderStyles, breakingNewsStyles]">Breaking News</h2>

    ex2 with computed
    //js
    const app = new Vue({
        data: {
            email: ''
        },
        computed: {
            emailIsValid: function() {
                return this.email.includes('@');
            },
            touchedEmailStyles: function() {
                if (this.email) {
                    return {
                    'border-color': '#bdbcbc',
                    'border-width': '2px'
                    }
                } else {
                    return {
                    'border-color': '#e0e0e0',
                    'border-width': '2px'
                    }
                }
            },
            invalidEmailStyles: function() {
                if (this.email && !this.emailIsValid) {
                    return {
                    'background-color': '#ffeded',
                    'border-color': '#da5252'
                    }
                }
            }
        }
    })

    // html
    <label for="email">Email</label>
    <input type="text" id="email" v-model.trim="email" v-bind:style="[touchedEmailStyles, invalidEmailStyles]" />

In this example, we’ve added another Vue app property, `newsHeaderStyles`. This is a style object that will presumably
be used to style all news item headers. Then, using an array with `v-bind:style`, we add both of these style objects to
our `Breaking News` element.

You may notice that both of these style objects contain a `color` value. When this happens, the style object added later
in the array gets priority. So, `Breaking News` will be `bold` and `red`. The `grey` color rule will be overridden and
not used.

## Classes

As we mentioned earlier, you will use inline styles more often later in your Vue journey when you learn how to use
components.

Currently, our Vue apps all live in one file. Filling that file with lots of style rules is likely going to produce
difficult to read code. In this case, it is best that we still use CSS classes to keep most of our style information in
our CSS files.

Let’s check out how to dynamically add CSS classes instead of inline styles.

    // html
    <span v-bind:class="{ unread: hasNotifications }">Notifications</span>

    // css
    .unread {
        background-color: blue;
    }

    // js
    const app = new Vue({
    data: { notifications: [ ... ] },
    computed: {
        hasNotifications: function() {
        return notifications.length > 0;
        }
    }
    }

In this example, we are using the `v-bind:class` directive to dynamically add a class called `unread` to a
“Notifications” `<span>` element if the `computed` property `hasNotifications` returns true.

`v-bind:class` takes an object as its value — the keys of this object are class names and the values are Vue app
properties that return a truthy or falsy value. If the value is truthy, the class will be added to the element —
otherwise it will not be added.

In this example, if there are notifications in the `notifications` array, the `unread` class will be added to the
“Notifications” element causing the element to be styled `blue`.

Similar to before with `v-bind:style`, you can also set the value of `v-bind:class` to a Vue app property that returns a
class object instead of writing the object out in your HTML file.

## Class Arrays

As was the case when we were applying style objects, sometimes we need to apply multiple class objects to a single
element. To accommodate this, `v-bind:class` can take an array as its value.

This array can take class objects as its contents and will apply the classes to the element in the order of the class
objects in the array. However, this array can also take one other type of element.

While class objects are good for conditionally adding classes to elements, sometimes we need to just add a class to an
element regardless of conditions. When this is the case, you can add the class name to the array and it will always be
applied to the element. These class names must be stored as properties on your Vue app.

Let’s clarify this with an example:

    ex1:
    // html
    <span v-bind:class="[{ unread: hasNotifications }, menuItemClass]">Notifications</span>

    // js
    const app = new Vue({
        data: {
            notifications: [ ... ],
            menuItemClass: 'menu-item'
        },
        computed: {
            hasNotifications: function() {
                return notifications.length > 0;
            }
        }
    }

    // css
    .menu-item {
    font-size: 12px;
    }
    .unread {
    background-color: blue;
    }

    ex2:
    // html
    <label for="email">Email</label>
    <input type="text" id="email" v-model.trim="email" v-bind:class="[requiredFieldClass, emailClasses]" />

    //js
    emailClasses: function() {
      return {
        touched: this.email.length !== 0,
        invalid: this.email && !this.emailIsValid
      };
    }

    // css
    input.required {
        border-width: 2px;
    }

    input.touched {
        border-color: #bdbcbc;
    }

    input.invalid {
        background-color: #ffeded;
        border-color: #da5252;
    }

In this code, we have modified our previous example by changing the value of `v-bind:class` to be an array. We then
added a Vue app property to the end of the array that will add the `menu-item` class to the element. The object at the
beginning of the array will still conditionally add the `unread` class based on whether there are `unread`
`notifications`. However, we now always add the class stored at `menuItemClass`, `menu-item`, to our “Notifications”
element.

Using an array with `v-bind:class` is useful for adding non-conditional classes, like the `menu-item` class above, in
addition to our conditional classes. We can also use this array to add multiple class objects like we did with our
inline style objects earlier in the lesson.

## Review

Congratulations on completing this lesson! In this lesson, we covered a number of different techniques for dynamically
styling Vue elements.

We learned how to dynamically add inline styles using `v-bind:style` with a style object or an array of style objects.
We then learned how to dynamically add classes using `v-bind:class` with a class object or an array of class objects and
class name strings.

It may seem like any one of these techniques would be sufficient for dynamically styling a front-end app — and that’s
true! As you continue learning about Vue, you will see advantages and use cases for each technique.

The important thing to take away at this stage in your learning journey is that you should aim to use the technique that
keeps your code the most readable and leaves your app with the least repetitive code.
