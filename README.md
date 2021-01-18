

# Plagerism Detection Tool

 
### Introduction
 This was a semester long project in my Foundations of Software Engineering course. This was a group project where I had the pleasure of working with Mathew Gurman and Amanda Dupell. The simple goal of this project was to build a plagiarism detection tool for comparing code based projects. 

**Language Used:** Typescript
**Tools Used:** Front End : [React-Typescript, Ant Design, Bootstrap], Back End : [NodeJs, ExpressJS]

### Approach
We chose to separate our project into a front and back end. The front end would be built using React-Typescript and would be responsible for allowing users to upload projects, submit the comparison, and then view/intereact with the results. We chose to build the back end using NodeJs and ExpressJs which allowed us to create a simple end point for the client to submit projects to be compared. The back end is responsible for all of the actual processing and comparison of the projects, this way we can most of the computation out of the browser. 

### UML
![UML](https://i.imgur.com/qLS2d4d.png)

Although we never got to implementing the user authentication (login, register, etc) We chose to keep it in our UML as it would be a necessary part of the project in a real-world application. 

### UI Mockups

**Upload and Create Submission**
![Upload](https://i.imgur.com/OOPwS5r.png)
This is the page that a user will be able to choose files for upload and submit the projects for comparison. In our final Implementation we added a few features bot followed the same general layout. 


**Results**
![enter image description here](https://i.imgur.com/FlleJTg.png)

Our Results Page is displayed to the user after they choose to submit their comparisons. Although some of the specifics of this page were changed we stuck with the main layout. We chose our design to try to present as much information to the user and let them make the ultimate goal on whether or not plagiarism has been detected.

**Match View**
![enter image description here](https://i.imgur.com/tTrTfMO.png)

The Match View allows the user to look through each individual match, which was found in the code (More on this in the next section). We wanted to give the user the ability to accept or reject some of the matches as some matches might be acceptable and should not count towards the similarity score. 

## Algorithm for Plagiarism Detection
For our plagiarism detection engine we have three different metrics to compare projects with the extensibility to add more as the tool development moves forward.

### 1 & 2. Identifier Values Similarity, Literal Values Similarity
The first two values are created from parsing the files into AST's. We chose to use the AST's to collect all the Identifiers and Literals in each project and compare them. Although these values alone do not perfectly correlate with plagiarism, we believe that they do provide insight into the overall similarity of the projects. Identifiers can represent a lot of information in a project such as methods used, functions called, etc. A similarity of literals provides even more insight on the similarity of the projects as literals are much more unique. To calculate these similarity values we decided to use the Jaccard Index: a token based similarity.

![jaccard Index](https://www.gstatic.com/education/formulas2/-1/en/jaccard_index.svg)

Once each file has been parsed into its respective AST we can travel down the AST adding each Identifier to its project set. Once each set of identifiers has been created we can calculate the sim value using the formula above. The Jaccard- Index will give a value of 0.0 1.0 which we converted to a percentage to display to the end user. The Literal Value is calculated in the same manner.

### 3. Similarity Matches
The first and most descriptive form of comparison is done by a line x line comparison via a token-based string comparison. The string comparison that we have implemented right now is the Sorensen-Dice index.

![Sorensen-Dice Index](https://wikimedia.org/api/rest_v1/media/math/render/svg/a80a97215e1afc0b222e604af1b2099dc9363d3b)

Two strings are read into the comparator, they are then split on empty space, cleaned (i.e trimmed and translated to lowercase), and are then separated into their respective sets. The Formula above is then calculated on the two sets to give a 0.0 - 1.0 similarity value.

The Sorensen-Dice Similarity class implements an IStringSimilarity Interface which will allow for easy interchangeability of different similarity calculators. Other similarity calculators we played with were Longest Common Substring, and Jaccard Index, but we ultimately found that the Sorensen-Dice Similarity calculator gave the most relevant value.

In future iterations it might be beneficial to use multiple string similarity calculators and average the values, or perhaps give the user control over which calculator(s) they might want to use. As previously mentioned, the string sim calculator will be used to compare each line of project A to each line of project B. There is however some pre-processing to fine-tune these results.

**Pre-Processing**
Influencing our pre-processing was a CodeMatch research paper that used this same method for pre-processing, which involved splitting any given file into an array of code and an array of comments, so these could be analyzed separately.

As a file is parsed we first determine whether or not a line is a line of code or a line of comment (including block comments). This way can only compare comment lines to comment lines and code lines to code lines. There are also lines which we will want to ignore, i.e lines that consist of only a closing bracket. To do this we are going to check that line contains an alpha character, if not : ignore it.

**Removal of Keywords and the Given Ignore File.**
We might also want to ignore language keywords, as they will certainly increase the similarity value. To do this we simply take in a file which holds the keywords for the specified language, and remove any of these words from the lines before the comparison is executed.

Using this same functionality we are able to offer a parameter for the user to upload a file of words or lines of code that will also be ignored from the matches. This is a particularly nice feature for teachers, as many assignments often come with starter code. In order to get the plagiarism tool to ignore the starter code all the user needs to do is upload a file containing that code.

**Creating Matches**
Now that our lines have been pre-processed, we can continue to compare each line of code and comments respectively. We chose to have our results class hold an array of IMatches, an interface that represents a certain type of match between the two projects. We also implemented an IMatchFactory so that we may easily extend the detectionEngine to create different types of matches. A commentMatch or codeMatch are created if the two compared lines have a simValue greater than the user-given threshold. This gives the user the ability to adjust the sensitivity of the similarity matches to best fit their expectations.

We also included the functionality to combine matches if there were successive matches in a row in both projects. This way the number of matches is decreased and matching snippets of code or comments will all be included as its own match.

**Removal of Matches**
Once these matches are passed to the front-end the the user is given more control in the ability to keep or discard any of these matches. keeping a match will of course keep the match and discarding the match will be accepting the similarity of the two lines and will allow the presented values to update automatically with that match removed. Our goal in this project was to capture as much information about the similarities of the project and simply display the information to the user to make the final decision on whether or not plagiarism might have taken place. That is why we focused on keeping as much control and customization in the hands of the user.



## Instructions to run project locally:

After unzipping our project release, you will see that our project consists of two typescript projects. 1: das-yarn : our React front end. 2: das-yarn-express-ts : our express backend API server.

It is important to start the backend server first as it needs to be running on port 3000. To do this please navigate to the root directory of das-yarn-express-ts (make sure you have yarn installed) and enter the command 'yarn install'. This should install all the dependencies neccessary for the project. You may then enter the command 'yarn start' this should fire up the server, again it is important that this server is running on port 3000. If the server is running correctly you should see:

'Express server has started on port 3000. Open  http://localhost:3000/ to see results Listening...'

You can now open a new terminal window and navigate to the das-yarn root directory. You should now follow the same steps as above:

1.  'yarn install'
2.  'yarn start'

Here you should see be prompted to ask if its okay to start the server on port 3001 as port 3000 is already taken. You can type 'Y' to give the okay and the front-end will build and should automatically open your browser to the project.

The home page will be the point of submission. please hover over any of the inputs that might not be clear for further explination.

**Troubleshooting:** if for some reason you cannot get the server to run on port 3000 but you can get it to run on another port you can edit the url for api endpoint in the front end. to do this navigate to 'das-yarn/src/services/SubmissionService.ts' you can then edit the paramter 'url' to match the port you are able to run the server on.
