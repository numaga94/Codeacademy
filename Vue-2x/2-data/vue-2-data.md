# VUE DATA

## Getting Started with Vue

Welcome to Vue Data! In [Introduction to Vue](../1-intro/vue-1-intro.md), we briefly covered some of the most exciting
features of Vue. In this lesson, we will start by reviewing how to create Vue apps and display dynamic data. We will
then explore the different types of data that Vue can store and display in far more depth.

The first step to beginning any Vue project is to import the Vue library. For simple projects, we do this by adding the
following `<script>` tag to the `<head>` of the HTML file that will contain the Vue app:

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" defer></script>

## Vue App Instantiation

Now that we have the Vue library available to use, we need to create our Vue app. All Vue apps are instances of the
`Vue` class provided by the imported Vue library. As with all classes, we must use the `new` keyword to make an instance
of this class, like so:

    const app = new Vue({});

As seen in this example, the only parameter the Vue constructor takes is an object, called the `options object`, that
will contain all the information (options) the Vue app needs to function. We will cover many of the options you can add
to this object in the following exercises.

## Attaching Vue Instances

The first property you will usually need to add to your Vue app’s options object is `el`. The `el` property corresponds
to the HTML element that should be turned into a Vue app. The value of this key is a string containing a CSS selector
that targets a single element in your HTML file. As a result, it is a good idea to always use an ID for this selector.

    <div id="app"></div>

    const app = new Vue({ el: '#app' });

In this example, we added a `<div>` element with an ID of app to our HTML file that will surround all of the HTML of our
Vue app.

We then added an `el` attribute to our Vue app’s options object with a value of `'#app'`. This will find the element
with an ID of `app` in the HTML file and transform it into a Vue app.

Adding a `<div>` that surrounds the template code of a Vue app and then using that `<div>` as the value of `el` is
common practice in setting up a Vue app.

## Data

Now that our Vue app is hooked up to our HTML, we are ready to generate and display dynamic data. As discussed in
Introduction to Vue, displaying and updating dynamic data for users is essential functionality for most front-ends.

Most values on the web can change at any moment, such as the number of likes on a post or the current set of posts to
display. We call constantly-changing data values like this `dynamic data`. We need a place to store dynamic data values
so that we can still use them in our HTML even when we don’t know what their values will be at any given moment. There
are many different ways to do this in Vue.

The simplest way is the `data` property on the options object. The value of `data` is an object. Each key-value pair in
this object corresponds to a piece of data to be displayed in the template. The key is the name of the data to use in
the template and the value is the value to display when the template is rendered.

We then use mustache syntax to display this data in our HTML template.

    // js

    const app = new Vue({
    el: '#app',
    data: {
        language: 'Spanish',
        hoursStudied: 274
    }
    });

    // html

    <div id="app">
        <p>You have been studying {{ language }} for {{ hoursStudied }} hours</p>
    </div>

Looking at this example, we see that two pieces of dynamic data were added to `data` on our Vue instance: `language` and
`hoursStudied` with values of 'Spanish' and 274 respectively. These values are then displayed in our template using
mustache syntax, displaying the text `You have been studying Spanish for 274 hours` to our user. If these values are
changed later on by our app, such as if the language is changed or the number of hours studied increases, our template
will automatically display this new value for the user.

## Computed Properties

We can use the values in the `data` object with the mustache templating syntax to display information in our HTML. Doing
this requires named data to be stored in the `data` object, but some data can be calculated based on information already
stored and doesn’t require it’s own key-value pair in the `data` object.

For example, if I know a month, April for example, I can calculate the season, spring, in response. Trying to store
these values separately on data would require us to constantly update one whenever the other changes, potentially
allowing the values to get out of sync from each other if we’re not careful. Vue allows us to store data that can be
calculated using values from the `data` object at a separate property called `computed`.

Instead of storing computed data as key-value pairs in our `data` object, we store key-value pairs in a separate
`computed` object. Each key in the `computed` object is the name of the property and the value is a function that can be
used to generate a value rather than a specific value.

    // js
    const app = new Vue({
    el: '#app',
    data: {
        hoursStudied: 274
    },
    computed: {
        languageLevel: function() {
            if (this.hoursStudied < 100) {
                return 'Beginner';
            } else if (this.hoursStudied < 1000) {
                return 'Intermediate';
            } else {
                return 'Expert';
            }
        }
    }
    });

    // html
    <div id="app">
        <p>You have studied for {{ hoursStudied }} hours. You have {{ languageLevel }}-level mastery.</p>
    </div>

In this example, we need to know how many hours the user has studied in order to determine their language mastery. The
number of hours is known, so we store it in `data`. However, we need to use `hoursStudied` in order to compute
`languageLevel`, so languageLevel must be stored in `computed`.

The Vue app determines the value of `languageLevel` using the provided function. In this case, `hoursStudied` is `274`,
so `languageLevel` will be `'Intermediate'`. The template will display
`You have studied for 274 hours. You have Intermediate-level mastery.`. If `numberOfHours` were to change,
`languageLevel` would automatically be recomputed as well.

In order to reference a value from `data` in this function, we treat that value as an instance property using `this`.
followed by the name of the data — in our example, `this.hoursStudied`.

Finally, in order to display `computed` values in our template, we use mustaches surrounding the name of the computed
property just as we did for `data`.

## Computed Property Setters

Being able to generate `computed` properties based on data is super useful. But why limit ourselves by only allowing
this data flow to only go one way?

Vue allows us to not only determine `computed` values based on data values but to also update the necessary data values
if a `computed` value ever changes! This allows our users to potentially edit `computed` values in the front-end and
have all of the corresponding data properties get changed in response so that the `computed` property will re-calculate
to the user’s chosen value.

    // js
    const app = new Vue({
    el: '#app',
    data: {
        hoursStudied: 274
    },
    computed: {
        languageLevel: {
        get: function() {
            if (this.hoursStudied < 100) {
                return 'Beginner';
            } else if (this.hoursStudied < 1000) {
                return 'Intermediate';
            } else {
                return 'Expert';
            }
        },
        set: function(newLanguageLevel) {
            if (newLanguageLevel === 'Beginner') {
                this.hoursStudied = 0;
            } else if (newLanguageLevel === 'Intermediate') {
                this.hoursStudied = 100;
            } else if (newLanguageLevel === 'Expert') {
                this.hoursStudied = 1000;
            }
        }
        }
    }
    });

    // html
    <div id=“app”>
        <p>You have studied for {{ hoursStudied }} hours. You have {{ languageLevel }}-level mastery.</p>
        <span>Change Level:</span>
        <select v-model="languageLevel">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Expert</option>
        </select>
    </div>

In this example:

- We modified our `computed` `languageLevel` value to contain both a `getter` and a `setter` method. We did this by
  making the value of `languageLevel` an object with two keys, `get` and `set`, each with a value of a function.
- The `get` function is the same function we used earlier, computing the value of `languageLevel` based on
  `hoursStudied`.
- The `set` function updates other data whenever the value of `languageLevel` changes. `set` functions take one
  parameter, the new value of the `computed` value. This value can then be used to determine how other information in
  your app should be updated. In this case, whenever `languageLevel` changes, we `set` the value of `hoursStudied` to be
  the minimum number of hours needed to achieve that mastery level.
- Finally, we added a `<select>` field to our template that allows users to change their mastery level. Don’t worry
  about this part of the logic yet, we will cover this information in Vue Forms.

## Watchers

So far we’ve learned that data is used to store known dynamic `data` and computed is used to store dynamic `data` that
is computed using other pieces of dynamic `data`. However, there is one caveat.

A `computed` value will only recompute when a dynamic value used inside of its getter function changes. For example, in
our previous examples `languageLevel` would only be recomputed if `hoursStudied` changed. But what do we do if we want
to make app updates without explicitly using a value in a `computed` function? We use the `watch` property.

    // js
    const app = new Vue({
    el: '#app',
    data: {
        currentLanguage: 'Spanish',
        supportedLanguages: ['Spanish', 'Italian', 'Arabic'],
        hoursStudied: 274
    },
    watch: {
        currentLanguage: function (newCurrentLanguage, oldCurrentLanguage) {
        if (supportedLanguages.includes(newCurrentLanguage)) {
            this.hoursStudied = 0;
        } else {
            this.currentLanguage = oldCurrentLanguage;
        }
        }
    }
    });

In this example, we want to set the number of hours studied to `0` whenever the user changes languages to a new
supported language. If the language is not supported, it reverts the language back to the previously-selected language.

This functionality is not a `computed` value because we do not actually need to continually use this information to
compute a new dynamic property: we just need to update existing properties whenever the change happens.

The value of watch is an object containing all of the properties to watch. The keys of this object are the names of the
properties to watch for changes and the values are functions to run whenever the corresponding properties change. These
functions take two parameters: the new value of that property and the previous value of that property.

Note: It may seem like you could use `watch` in many instances where you could use `computed`. The Vue team encourages
developers to use `computed` in these situations as `computed` values update more efficiently than `watch`ed values.

## Instance Methods

Throughout this lesson, we have covered many options object properties that allow us to store and generate dynamic
values to use in our template. But where do we store any methods we need to make our app work? As you might guess, there
is an options object property called `methods`.

The `methods` property is where Vue apps store their instance methods. These methods can be used in many situations,
such as helper functions used in other methods or event handlers (functions that are called in response to specific user
interactions).

    // js
    const app = new Vue({
    el: "#app",
    data: {
        hoursStudied: 300
    },
    methods: {
        resetProgress: function () {
            this.hoursStudied = 0;
        }
    }
    });

    // html
    <button v-on:click="resetProgress">Reset Progress</button>

In this example, we added an instance method called `resetProgress` to our Vue app using `methods`. This method sets the
value of `hoursStudied` to `0`.

We then added this method as an event handler to a `<button> `so that whenever the button is clicked, the method will be
called. Don’t worry about the `v-on:click` code for this lesson — we will cover it in Vue Forms.

The value of methods is an object where the keys of the object are the names of the `methods` and the values are the
corresponding instance methods.

## Review

In this lesson, we learned four different techniques for displaying and updating dynamic data in our Vue apps. Here’s a
brief recap of the Vue app options object properties we covered and the use cases for each.

- `data` - used for storing known dynamic values
- `computed` - used for computing dynamic values based on known dynamic values — can additionally specify a setter by
  specifying `get` and `set` functions — the setter will update other dynamic values when the computed value changes
- `watch` - used for performing functionality when a specified dynamic value changes
- `methods` - used for storing instance methods to be used throughout the app If you want to learn more about each of
  these properties, check out the
  [Options / Data section of the Vue.js documentation](https://vuejs.org/v2/api/#Options-Data).

Congratulations on learning all of these new techniques! It may be overwhelming right now, but you will get more adept
at determining which situations are best-suited to each technique as you spend more time building Vue apps. After taking
[Vue Forms](../3-form/vue-3-form.md) and [Styling Elements](../4-styling-elements/vue-4-styling-elements.md) with Vue,
you will have a full understanding of how these pieces of data are used to make fully-functioning Vue form apps. Good
luck!
