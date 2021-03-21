# Flashcards

## Overview

Instead of a step-by-step tutorial, this project contains a series of open-ended requirements which describe the project
you’ll be building. There are many possible ways to correctly fulfill all of these requirements, and you should expect
to use the internet, Codecademy, and other resources when you encounter a problem that you cannot easily solve.

## Project Goals

In this project, you will practice using Redux and Redux Toolkit to manage the complex state of a flashcard-style quiz
app. Users will be able to create their own topics, quizzes for those topics, and flashcards for those quizzes. Users
will also be able to interact with their quizzes by flipping flashcards over.

The following task descriptions will walk through implementing the app’s Redux logic starting with topics, then quizzes,
and then cards. If you would like to implement it in a different order feel free to do what is comfortable for you.

## Setup Instructions

If you choose to do this project on your computer instead of Codecademy, you can download what you’ll need by clicking
the “Download” button below. Make sure you have Node installed on your computer and then, inside the project’s root
directory, run npm install. Finally, run npm start which will automatically open up a new tab in your browser with your
running application. If a new tab does not appear, you can visit http://localhost:3000/.

At a high level, your application will be able to handle the following URL routes, each with their own functionality:

1. On the '/topics/new' page:
    - Users can create topics

2. On the '/topics' page:
    - Users can view all topics
    - Users can click on an individual topic and be redirected to the page for that topic

3. On the /topics/:topicId page:
    - Users can view an individual topic and all quizzes for that topic
    - Users can click on a quiz associated with a topic and be redirected to that quiz’s page

4. On the 'quizzes/new' page:
    - Users can create quizzes that are associated with topics and contain lists of flashcards
    - Users can add and remove card fields in the new quiz form

5. On the '/quizzes' page:
    - Users can view all quizzes
    - Users can click on an individual quiz and be redirected to that quiz’s page

6. On the '/quizzes/:quizId' page:
    - Users can view an individual quiz and flip cards over