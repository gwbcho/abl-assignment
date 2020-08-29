# ABL Space Systems Coding Challenge - Solution


## Instructions

To run the solution code please navigate to the abl-data-app folder and run the following sequence of commands:

    npm install
    ng serve

Note that the solution is written using the Angular framework and so may require you to install additional dependencies before `ng serve` can be executed successfully. Once the Angular solution is running you should be able to find it using any modern web browser by navigating to `localhost:4200`. Note that the solution renders on all modern web browsers but is fastest on chrome, likely due to the browser's tendancy to utilize substantial resources in order to boost performance.

To view only a subset of graphs at any one time simply click on the corresponding graph title in the legend to toggle it on or off. The graphs will continue to load in the background regardless of wheather or not they are shown.


## Solution Overview

The solution is a relatively straight forward moving window graphing function. There is a set window value determined in the app.component.ts file which is measured in seconds. The window value determines the minimum date, relative to the newest entry that can be shown by the graph. When an item is added a series of checks is initiated which iterate through the pertinent data arrays and deletes items which fall outside this window. The smaller the window, the lower the memory cost, and the better the performance of the app overall.


## Bugs and Issues

There is an issue with slow loading on Safari which I could not figure out. The problem appears to originate with the update rate of the graph itself, which is quite high. A potential improvement would be to dictate a set update speed so as to not overload the browser, however, this is not a priority as the new data does eventually load and the only issue performance wise is the lag (which would occur with slower update speeds anyways). I'll investigate this further when I have the time.


## Tests

Even though I'm likely remiss for not doing this part, there are no tests for this solution. I justify this with the fact that it's a practice exercise.
