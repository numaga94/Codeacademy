# Learn Git, Part I

## Goals of this Unit

The goal of this unit is to introduce you to the Git versioning technology. Understanding Git is a crucial tool in your developer toolkit—but don’t
worry if it doesn’t stick right away! Practice is crucial with Git, which is why we’re introducing it early in the Path. Additionally, you’ll
understand how to take the repositories on your computer and put them online with GitHub. Having your work on Github will be important when you apply
for jobs, and crucial to that will be having a solid README.md, which you’ll write with markdown.

After this unit, you will be able to:

- Version control projects using Git
- Host a codebase online using GitHub repositories
- Use markdown to author a good README.md file

You will put all of this knowledge into practice with an upcoming Portfolio Project. You can complete the Portfolio Project either in parallel with or
after taking the prerequisite content—it’s up to you!

Learning is social. Whatever you’re working on, be sure to connect with the Codecademy community in the forums. Remember to check in with the
community regularly, including for things like asking for code reviews on your project work and providing code reviews to others in the
[projects category](https://discuss.codecademy.com/c/project/1833), which can help to reinforce what you’ve learned.

### Hello Git

Git is a software that allows you to keep track of changes made to a project over time. Git works by recording the changes you make to a project,
storing those changes, then allowing you to reference them as needed.

We’ll learn Git by using it to help us write a screenplay called Harry Programmer and the Sorcerer’s Code.

We’ll get started by taking a look at the screenplay project.

In scene-1.txt, add this text:

_Harry Programmer and the Sorcerer’s Code: Scene 1_

### git init

Now that we have started working on the screenplay, let’s turn the sorcerers-code directory into a Git project. We do this with:

_git init_

The word init means initialize. The command sets up all the tools Git needs to begin tracking changes made to the project.

In the terminal, initialize a new Git project.

Notice the output:

Initalized empty Git repository in /home/ccuser/workspace/sorcerers-code/.git/

The Git project was created.

### Git Workflow

Nice! We have a Git project. A Git project can be thought of as having three parts:

A Working Directory: where you’ll be doing all the work: creating, editing, deleting and organizing files A Staging Area: where you’ll list changes
you make to the working directory A Repository: where Git permanently stores those changes as different versions of the project The Git workflow
consists of editing files in the working directory, adding files to the staging area, and saving changes to a Git repository. In Git, we save changes
with a commit, which we will learn more about in this lesson.

### git status

As you write the screenplay, you will be changing the contents of the working directory. You can check the status of those changes with:

_git status_

From the terminal, check the status of the sorcerers-code project.

In the output, notice the file in red under untracked files. Untracked means that Git sees the file but has not started tracking changes yet.

### git add

In order for Git to start tracking scene-1.txt, the file needs to be added to the staging area.

We can add a file to the staging area with:

_git add filename_

The word filename here refers to the name of the file you are editing, such as scene-1.txt.

Add scene-1.txt to the staging area in Git. Recall that you will need to identify the file by its name.

Check the status of the project in Git.

In the output, notice that Git indicates the changes to be committed with “new file: scene-1.txt” in green text.

Here Git tells us the file was added to the staging area.

### git diff

Good work! Now you know how to add a file to the staging area.

Imagine that we type another line in scene-1.txt.

Since the file is tracked, we can check the differences between the working directory and the staging area with:

_git diff filename_

Here, filename is the actual name of the file. If the name of my file was changes.txt the command would be _git diff changes.txt_

In the code editor, add this text to scene-1.txt:

_Dumblediff: I should've known you would be here, Professor McGonagit._

From the terminal, use the new command to check the difference between the working directory and the staging area.

Notice the output:

“Harry Programmer and the Sorcerer’s Code: Scene 1” is in the staging area, as indicated in white. Changes to the file are marked with a + and are
indicated in green.

Add the changes to the staging area in Git. Recall that you will need to identify the file by its name.

### git commit

A commit is the last step in our Git workflow. A commit permanently stores changes from the staging area inside the repository.

git commit is the command we’ll do next. However, one more bit of code is needed for a commit: the option -m followed by a message. Here’s an example:

_git commit -m "Complete first line of dialogue"_

Standard Conventions for Commit Messages:

- Must be in quotation marks
- Written in the present tense
- Should be brief (50 characters or less) when using -m

### git log

Often with Git, you’ll need to refer back to an earlier version of a project. Commits are stored chronologically in the repository and can be viewed
with:

_git log_

From the terminal, log a list of your commits.

In the output, notice:

- A 40-character code, called a SHA, that uniquely identifies the commit. This appears in orange text.
- The commit author (you!)
- The date and time of the commit
- The commit message

### Generalizations

You have now been introduced to the fundamental Git workflow. You learned a lot! Let’s take a moment to generalize:

1. Git is the industry-standard version control system for web developers
2. Use Git commands to help keep track of changes made to a project:
   - git init creates a new Git repository
   - git status inspects the contents of the working directory and staging area
   - git add adds files from the working directory to the staging area
   - git diff shows the difference between the working directory and the staging area
   - git commit permanently stores file changes from the staging area in the repository
   - git log shows a list of all previous commits

## Resource

### Mastering Git

[Thoughtbot](https://thoughtbot.com/upcase/mastering-git)

In this resource, you will learn about more advanced Git topics through a series of short videos and lecture notes. This is helpful if you want to
gain a deeper understanding of Git beyond its basic workflow.

### Git Cheat Sheet

[GitHub](https://education.github.com/git-cheat-sheet-education.pdf)

In this resource, you will learn important and commonly used Git commands. This is helpful if you would like a resource that you can keep referring to
as you get more used to Git commands.

## Tutorial

### Git version control in VS Code

[Visual Studio Code](https://code.visualstudio.com/docs/introvideos/versioncontrol)

In this video, you will learn how to use the basics of Git version control in Visual Studio Code. This is helpful if you use VS Code as your primary
editor and want to take advantage of its Git integration features.

### Backtracking Intro

When working on a Git project, sometimes we make changes that we want to get rid of. Git offers a few eraser-like features that allow us to undo
mistakes during project creation. In this lesson, we’ll learn some of these features.

To start out, let’s review the basic Git workflow.

### head commit

In Git, the commit you are currently on is known as the HEAD commit. In many cases, the most recently made commit is the HEAD commit.

To see the HEAD commit, enter:

_git show HEAD_

The output of this command will display everything the git log command displays for the HEAD commit, plus all the file changes that were committed.

### git checkout

What if you decide to change the ghost’s line in the working directory, but then decide you wanted to discard that change?

You could rewrite the line how it was originally, but what if you forgot the exact wording? The command

_git checkout HEAD filename_

will restore the file in your working directory to look exactly as it did when you last made a commit.

Here, filename again is the actual name of the file. If the file is named changes.txt, the command would be

_git checkout HEAD changes.txt_

### more git add

The hamlet repository we are working on contains five files. In Git, it’s common to change many files, add those files to the staging area, and commit
them to a repository in a single commit.

For example, say you want to change the character “LARRY” to “LAERTES” in the script. The name currently appears in two files. After you change the
name in both files, you could add the changed files to the staging area with:

_git add filename_1 filename_2_

Note the word filename above refers to the name of the file you are adding to the staging area, such as scene-3.txt.

### git reset I

Great! The files you’ve added to the staging area belong in the same commit.

What if, before you commit, you accidentally delete an important line from scene-2.txt? Unthinkingly, you add scene-2.txt to the staging area. The
file change is unrelated to the Larry/Laertes swap and you don’t want to include it in the commit.

We can unstage that file from the staging area using

_git reset HEAD filename_

This command resets the file in the staging area to be the same as the HEAD commit. It does not discard file changes from the working directory, it
just removes them from the staging area.

### git reset II

Creating a project is like hiking in a forest. Sometimes you take a wrong turn and find yourself lost.

Just like retracing your steps on that hike, Git enables you to rewind to the part before you made the wrong turn. You can do this with:

_git reset commit_SHA_

This command works by using the first 7 characters of the SHA of a previous commit. For example, if the SHA of the previous commit is
5d692065cf51a2f50ea8e7b19b5a7ae512f633ba, use:

_git reset 5d69206_

HEAD is now set to that previous commit.

To better understand git reset commit_SHA, notice the diagram on the right. Each circle represents a commit.

_Before reset:_

- HEAD is at the most recent commit After resetting:

_After resetting:_

- HEAD goes to a previously made commit of your choice
- The gray commits are no longer part of your project
- You have in essence rewound the project’s history

### Generalizations

Congratulations! You’ve learned three different ways to backtrack in Git. You can use these skills to undo changes made to your Git project.

Let’s take a moment to review the new commands:

- git checkout HEAD filename: Discards changes in the working directory.
- git reset HEAD filename: Unstages file changes in the staging area.
- git reset commit_SHA: Resets to a previous commit in your commit history.

Additionally, you learned a way to add multiple files to the staging area with a single command:

_git add filename_1 filename_2_
