# Reddit Client

## Overview

For this project, you will build an application for Reddit using everything you’ve learned, including React and Redux.
Reddit is a website where people share links to articles, media and other things on the web. The Reddit API provides
data which you will integrate into your application. The application will allow users to view and search posts and
comments provided by the API.

[Example Project: Reddit client example](https://reddit-client.netlify.app/)

- Project Requirements:
- Build the application using React and Redux
- Version control your application with Git and host the repository on GitHub
- Use a project management tool (GitHub Projects, Trello, etc.) to plan your work
- Write a README (using Markdown) that documents your project including:
- Wireframes Technologies used Features Future work Write unit tests for your components using Jest and Enzyme
- Write end-to-end tests for your application
- Users can use the application on any device (desktop to mobile)
- Users can use the application on any modern browser
- Users can access your application at a URL
- Users see an initial view of the data when first visiting the app
- Users can search the data using terms
- Users can filter the data based on categories that are predefined
- Users are shown a detail view (modal or new page/route) when they select an item
- Users are delighted with a cohesive design system
- Users are delighted with animations and transitions
- Users are able to leave an error state
- Get 90+ scores on Lighthouse

  - We understand you cannot control how media assets like videos and images are sent to the client. It is okay to have
    a score below 90 for Performance if they are related to the media from Reddit.

- OPTIONAL: Get a custom domain name and use it for your application
- OPTIONAL: Set up a CI/CD workflow to automatically deploy your application when the master branch in the repository
  changes
- OPTIONAL: Make your application a progressive web app

Prerequisites:

- HTML
- CSS
- JavaScript
- React
- Redux
- Jest, Enzyme, and Selenium
- Git and GitHub
- Command line and file navigation
- Wireframing

## Setup

### Going off platform

You will be doing this project outside of the Codecademy platform, on your own computer.

For this particular project, you will be using your own text editor (we suggest VS Code) and Git version control. If you
need help setting up your text editor, read our article about setting up a text editor for web development. If you need
a refresher on how to work with Git for version control, review the Git lesson or look at this
[cheat sheet](https://education.github.com/git-cheat-sheet-education.pdf).

### Reddit API

For this project, we will be using the [Reddit JSON API](https://github.com/reddit-archive/reddit/wiki/JSON). There is
no maintained documentation but the API is simple enough to use. We will provide you with some pointers on how to use
it.

Note that Reddit has 2 APIs: the [official API](https://www.reddit.com/dev/api/) and an
[undocumented JSON API](https://github.com/reddit-archive/reddit/wiki/JSON). You are welcome to use either APIs but we
recommend using the JSON API because it doesn’t require an OAuth workflow. Using the JSON API does have limitations such
as no write operations. For the purposes of this project, we find the JSON API adequate.

You can take any Reddit URL, add .json at the end of it, and get JSON. For example, if you want to get the Popular page
data in JSON:

- Original URL: https://www.reddit.com/r/popular/
- JSON URL: https://www.reddit.com/r/popular.json

If you want to search for “cake recipes”:

- Original URL: https://www.reddit.com/search?q=cake%20recipes
- JSON URL: https://www.reddit.com/search.json?q=cake%20recipes

Notice here you didn’t add .json at the end of the URL. You actually added it before the start of the query string.
Refer to this article for a breakdown of the structure of a URL.

The Reddit API will return some user content (comments) in Markdown. You should find a way to display the Markdown in
your application.

## Debugging Tips + Helpful Resources

#### Feeling stuck? Try the following:

- Google your question: oftentimes, someone has had the same question as you! Check out websites like StackOverflow and
  Quora to see how other folks have found solutions.
- Read the documentation: make sure to carefully read through the documentation for any languages and libraries that you
  are using. Oftentimes they’ll have examples of what you’re looking for!
- Rubber ducking: try to explain a problem to a friend or co-worker. Oftentimes you’ll figure out the solution as you’re
  trying to explain it. And if not, getting another pair of eyes on your code can be helpful.

#### Check out these helpful resources:

- [Thinking About Errors in Your Code Differently](https://www.codecademy.com/content-items/673d70052fe5627f2222ab7840b4c5db)
- [Intro to Chrome Devtools](https://www.codecademy.com/content-items/8e57b181e3c4a62b70476bd76ab11624)
- [CSS Visual Rules in Chrome Inspector](https://www.codecademy.com/content-items/73ce848773660b8f73086a073113c3fe)
- [Documentation and Research](https://www.codecademy.com/content-items/8219be05381030feb2d9530fedb457fd)
- [Debugging JavaScript Code](https://www.codecademy.com/content-items/e8a7f4f36eae1c4ee642af3cea4bfb4a)
- [React Developer Tools](https://www.codecademy.com/paths/build-web-apps-with-react/tracks/bwa-intro-to-react/modules/ravenous-part-one/informationals/ready-react-developer-tools)
- [Redux DevTools Extension](https://www.codecademy.com/content-items/698c535e3cdf6ce8484bd34138341767)

#### Example Code

Want to see an example of how someone else has completed this project? Click this
[link](https://static-assets.codecademy.com/Paths/front-end-career-path/reddit-client/reddit-client-master.zip) to
download a zip file containing one example solution to this project. Remember: your project doesn’t have to look
anything like this! It should be unique to your vision.
