# Teacher Reacher

# Elevator sentence (brief description of the concept)

A community where you can; Be the Teacher? Be the Student? Be the Teacher-Reacher.

As schools begin to reopen during an uncertain pandemic, the look of classrooms and how they operate are constantly having to adjust to a new normal.  This requires new ideas, technologies and ways of learning - which can be difficult! It also allows the opportunity to level the playing field for many students by opening their resources to learn and quality of education to more than their specific school system or geographic location.  This program will help connect students within a classroom (and beyond!) to other students who can share their notes, work together on assignments, and teach each other.  This is part notetaker, part tutor, part social media site. “By teaching, we learn." 

# User Story

As a teacher:

I want an app where my students can create notes, post assignments, create flashcards, and share resources with their fellow classmates.
And as part of their learning process, I’d like for my students to ask questions, share what they’ve learned, and deepen their understanding through collaboration by scheduling study sessions or tutoring lessons within this app.
I want access to my gradebook so I can enter, edit, save, and view grades for all of my students.
As a student: 
I want an app where I can create, view, and submit notes, assignments, and flashcards as well as schedule tutoring sessions with other students.
I want an app where I can check my updated grades. 





# Wireframe

https://www.figma.com/file/Kl5r6Z5phJ1s9Q3p1HShzy/TEACHER-REACHER?node-id=0%3A1

## Logical Flow

```python

HOME PAGE / LOG IN
USER PROFILE / DASHBOARD / OPTIONS
STUDY AIDS - Dividing by topic?
Notes
Helpful Resources (Links, videos, etc.)
Flashcards
CHAT (BLOG)
GRADES
```


# Mindmap of Models

User Table: 
Type: student/teacher (just to plan for the future)
Name: string of student name
Teacher: self reference id of teacher in same table or null

Document Table:
Note title: string t
Note body: string
Assignment title: string
Grade: Integer (If assignment) or Null (if it’s a note)
Student id: student id foreign key with user table
**Flashcard API?

# Schedule table
Event title: string
Event date: date
User 1 (tutor): foreign key with user table
User 2 (student): foreign key with user table




# List of technologies, libraries
Oauth - google login - after mvp
Express
express-session
Passport
Fs
Path
Bcrypt
Sequelize
mysql2


Which CSS framework?
Bootstrap
Materlize CSS


Data APIs
Flashcard api



Link to project management (Trello, Asana, etc)
https://github.com/jamesrowe1/project2/projects/
