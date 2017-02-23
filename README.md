# ActoKidsApp

Download Guide

Start by downloading react-native and android studio according to this link: https://facebook.github.io/react-native/docs/getting-started.html
Download the appropriate version of postgresql for your computer from https://www.postgresql.org/download/  Make sure to get pgAdmin to run it with(if you want more GUI).
Set up a database in there with whatever name you wish, using these instructions. http://stackoverflow.com/questions/8200917/postgresql-create-a-new-db-through-pgadmin-ui 
You may need to create a role for your computer username.
Clone the git repository from https://github.com/uwcse481h-2017/ActoKidsApp/tree/dev --the dev branch is our app.
Download Android Studio. https://developer.android.com/studio/index.html. 
Open Android Studio and open the AVD Manager. Run an emulator (by pressing the green play button). You can also download a different “phone” emulator if you want. 
Open a command line and cd into the folder ActoKidsApp/ActoKids. 
Run        react-native start  . 
Leave that open and open a command line and cd into the folder ActoKidsApp/server/activity-server . 
Run     psql -d “name_of_your_database” -f create_activity_prod_db.sql     
to populate the database. 
Then run      npm start    to start the server. 
Open up one last command line and cd into ActoKidsApp/ActoKids  and run       
react-native start-android . This should fetch the JavaScripts and run the app. 

User Guide
Open the app. 
If you want to enter a new activity into the database, click “Enter an Activity” 
Go through and enter the required fields and any other optional fields you would like and then press submit. If there is an error in your data, the app will prompt you to fix it. Fix it according to the prompt and try to submit again. Repeat until the submission goes through. 
If you want to search for an activity in the database, click “Search for an Activity”
A list of activities will show up. If you want to find an activity that matches a specification, click the filter button. Fill out the filter buttons according to your specific desires, then click submit. It will take you back to the search page but this time only with events that match your filters. Scroll through and repeat as you wish. 
