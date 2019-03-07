# Syllaboard
A dashboard for instructors at GA.
Immersive courses are just that: immersive. When you have multiple things going on, it can be easy to let somethings slip through the cracks: laundry, personal care, and more often than not, the outcomes homework that is also a part of the course. This webapp aims to help both the outcomes instructors and the students to stay organised and on-top of the work.

#### Minimum Viable Product
* Outcomes instructors will be able to log on and add assignments to students in a particular cohort (ie. Web Development Immersive - 22). The assignment will have a name, requirements, and a due date. They will be able to edit and delete assignments as well.
* All students in that cohort will receive the Assignment so that they can see what they need to do and when they need to do it.
* There will be an Admin dashboard to edit users (for example, if a student decides to change cohorts, or a student becomes a teacher) 

#### Additional user Stories
* Students can submit assignments as a URL (e.g. to a google doc) or upload a file (only allow .docx, .pdf, and verify not virusy)
* Instructors and students can leave comments on assignments.

#### Stretch Goals
* Instructors can send an email with a key that will automatically assign cohort key to the user that logs in.
* Ability for users to reset their passwords.
* Ability to determine if a homework is completed or not (for both student and instructor)
* Email and/or Slack notifications when assignments are imminently due


## Sprints

### Sprint One (Weekend One + Monday)
*The Plan*
Decide a project, organise our tables and force some sweet schema onto MongoDB. We also want our server up and running by the end of Monday (via Postman and fake data).

*The Application*
###### Weekend
We met up on Sunday to discuss our plan for the project and kick off our sprint one. Here's what we accomplished:
* Our gitmasters are: James for the server side and Parker for the client side. Sarah will be acting as a kind of scrum-master/project manager/cool leader, not like those other leaders.
* We are using Prettier - Code Formatter to homongonise our code so it looks like a cohesive project done by a cohesive team
* Parker help set up the tslint
###### Monday
* Server-side — Made our Database schemas and fleshed out the auth routes. 
* Client-side — Boilerplate up and running, mostly fully typed.
* User-design — Mobile and Web wireframes for instructor sign-up, student sign-up, and admin dashboard.


### Sprint Two (Tuesday-Wednesday)
*The Plan*
If we're still using fake data, fix that and get the server running 100% by end of day Tuesday. This sprint will kick off out client side extravaganza. Thus commences the wireframes. User stories are our stories. 
MVP by end of day Wednesday will mean that we have all been MVPs.

*The Application*
###### Tuesday
Servers and Clients and Erros OH MY! Tuesday was spent debugging server routes and getting the client side working with said routes.
###### Wednesday
Well, we're not at MVP, but we're getting closer to functionality.
* Server-Side—Added cohort/add and cohort/delete post and delete routes, hammered out some more schema updates
* Client-Side—Added materialize UI an got forms working
* User-Side—wireframes for everything

### Sprint Three (Thursday-Friday)
*The Plan*
Time to add those sweet sweet features like sending auto alerts via slack/email. Also designing and doing visual stuff will be during sprint three.

*The Application*
Turns out, the "Boilerplate" that we needed for the app was pretty much just the app. This sprint was spent hammering out which routes we actually need. This sprint was also spent wishing we had just done it all in GraphQL (as most of the answers to our questions were answered online by "just do it in GraphQL") and nesting components in components in components in components in components and so on and so forth ad infinitum.

### Sprint Four (Weekend Two)
*The Plan*
Clean up code, polish some stuff up, congratulate ourselves on perfect implemination and definitely sticking to our sprints.

*The Application*
For the week, we kept saying "Once we get over this hill, it's all just downhill copying and pasting" only to discover another hill and to say the same thing. Three hills and 5 or so days later, we finally got the momentum we had been predicting so inaccurately the days before. There were certainly hills to overcome, but we had finally found the formula for the app (at least 70% of it) and could now just copy and paste what we need. DRY? Not even a little bit. Functional, hell yea.


## Necessary Technologies

* Yarn (*[Install](https://yarnpkg.com/lang/en/docs/install/)*)
* Redux
* React
* TypeScript
* TypeORM
* Material UI