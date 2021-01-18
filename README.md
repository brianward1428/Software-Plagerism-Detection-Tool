# Software-Plagerism-Detection-Tool


Term Project Repository for Team 7

DasYarn: Matthew Gurman, Amanda Dupell, Brian Ward

INSTRUCTIONS TO RUN PROJECT:

After unzipping our project release, you will see that our project consists of two typescript projects. 1: das-yarn : our React front end. 2: das-yarn-express-ts : our express backend API server.

It is important to start the backend server first as it needs to be running on port 3000. To do this please navigate to the root directory of das-yarn-express-ts (make sure you have yarn installed) and enter the command 'yarn install'. This should install all the dependencies neccessary for the project. You may then enter the command 'yarn start' this should fire up the server, again it is important that this server is running on port 3000. If the server is running correctly you should see:

'Express server has started on port 3000. Open http://localhost:3000/ to see results Listening...'

You can now open a new terminal window and navigate to the das-yarn root directory. You should now follow the same steps as above:

'yarn install'
'yarn start'
Here you should see be prompted to ask if its okay to start the server on port 3001 as port 3000 is already taken. You can type 'Y' to give the okay and the front-end will build and should automatically open your browser to the project.

The home page will be the point of submission. please hover over any of the inputs that might not be clear for further explination.

Troubleshooting: if for some reason you cannot get the server to run on port 3000 but you can get it to run on another port you can edit the url for api endpoint in the front end. to do this navigate to 'das-yarn/src/services/SubmissionService.ts' you can then edit the paramter 'url' to match the port you are able to run the server on.
