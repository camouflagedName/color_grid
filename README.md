# Color Grid

This was built quickly one evening before bed, so, sadly, the UI is lacking flourish.

I decided to build this after reading an article on cryptography where an image can be hidden inside of a pixel of another image. While this app has completely nothing to do with any of that, I became intrigued with the idea of generating a gride of colored boxes or pixels using random values that corresponded with RBG color codes and thought this woudl be a simple enough project that could be created in a short period of time. Plus, in my head, I imagined cool and interesting patterns or designs emerging. While it was a quick project, it definitely did not produce the amazing Bansky-level artowrk I was hoping for.


### Stack
React and Bootstrap

### Method
The app takes user input that is used to determine how big the grid will be (a square of that number). When thsi is submitted, it calls a draw function on an interval (currently 100 ms). This function calls a hex converter function which generates 3 random numbers (r, b, g), converts each into a hex value, and then concatenates them into a hex color code. A dynamic for loop (size is based on user input) inserts graphic into a canvas element. Each graphic has a random hex color code assigned to its fillstyle. And voila! Art...

The start button also changes to a pause button. Fancy, I know.


### To Do
- value checking on input (i.e. numbers only)
- UI improvements
- additional features including adding a speed controller
- I was thinking it might be cool to create a chart that tracks how many times the same color is called. Cool is currently being defined by the same person who thought a simple program could create modern art.

### Issues
Going past 200, which is 40,000 "rectangles" results in performance issues. I successfully entered in 1000 as an input, or 1,000,000 rectangles and nothing broke. Of course I added in an extra 0 quickly after which seemed to eat up all the memory, though addmitedly, I never saw a "kill page" alert.
