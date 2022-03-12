# In The Moment Weather Reports

A dynamic HTML, CSS and JavaScript web application for people who want to keep track of a city's weather, and create their own personal weather reports with images to either agree, disagree or somewhat agree with the local forecast.  

Long are the days over where one has to second guess the local weather station's accuracy; In The Moment Weather Reports lets **you** be the weatherman!

This idea was my primary motivation for building this application - growing up I'd always look forward to forecasts by my local weather channel stating that "**HOORAH** school is closed tomorrow! 12 inch snowfall expected overnight!", only to be dissapointed by a blaring alarm at 6 in the morning with less than a feather's worth of snow on the ground, and school being open after all; ruing the idea of ever depending on a weather channel's accuracy in the first place.

## Technologies Used 

- JavaScript (ES5 + ES6)
- CSS3
- HTML5
- jquery
- Node.js
- Watchify
- [Weather API](https://www.weatherapi.com/docs/)


## Live Demo 

Try the application live at https://neldaza.github.io/In-The-Moment-Weather-Reports/

## Features

- User can search for a specific city's current weather
- User can view the current weather for a single location
- User can create a personal weather report for the current weather in a searched city 
- User can view all personal weather reports 
- User can delete a report 

## Preview 

![Screen Recording 2022-02-03 at 10 38 09 PM](https://user-images.githubusercontent.com/88061673/152468940-50842a6f-c498-4d45-afc6-941f0cb49878.gif)
![Screen Recording 2022-02-03 at 10 43 50 PM](https://user-images.githubusercontent.com/88061673/152469036-daf25569-3646-4a14-bcef-e64fdd69de82.gif)


## Future Stretch Features

- User photo submission optional
- User can create an account 
- User can look at other users' reports
- User can view a live feed of other user's reports

## Development 

### System Requirements

- Node.js 10 or higher
- NPM 6 or higher

### Instructions 

1.  Clone the repository

    ```shell
    git clone https://github.com/neldaza/In-The-Moment-Weather-Reports
    cd In-The-Moment-Weather-Reports
    ```



2.  npm install watchify
    ```shell
    npm install
    ```




3.  add a "watchify" script to package.json
    ```shell
    "scripts": {
      "watchify": "watchify"
    }
    ```



4.  cd into the project's js folder
    ```
    cd In-The-Moment-Weather-Reports/js 
    ```



5.  Enter the following command into the terminal that is currently cd'd in the project's js folder
    ```
    watchify main.js -o bundle/bundle.js -v
    ```
    ##### **This is so that any changes you make to any of the modules or main.js are rebuilt into bundle.js in real time upon saving**




6. Open a seperate terminal and cd into the project
   ```
   cd In-The-Moment-Weather-Reports
   ```
   ##### **This will be the terminal you use to commit any changes, and push to origin on GitHub**

7. Open the project either by right clicking index.html and opening in your default browser, or by initiating VSCode's Live Server
