## Contents

ThreeJS component can be found at /src/components/Display/Display.js
Orbit.js is also required, do not delete
Node_modules archive is provided, so please unzip it in your working dir
Main ThreeJS engine code is located in node_modules/three folder, it is a custom build, so if you have the need to run npm install, you will need to copy existing threejs folder from node_modules.zip over to your updated node_modules folder.
There are 2 3D models in 3d models folder, which you can place on your server and change paths on lines 227 and 311 in Display.js

## USE

For instant use, you can upload all files from build folder to your server and it will work

To rebuild the code after making changes, you need to extract node_modules.zip archive and use npm run build command, this will rebuild all files in build folder.
Once this is done, you need to replace all occurances of /static/ to ./static/ in index.html inside build folder (react build tools produce an incorrect path during build for some reason)

## Code

To track changes which were made to your code (besides Display.js), the best way would be to upload a default version of your app to github (without unnecessary folders like node_modules or build folder) and commit a new change with updated code, this way you can see all changes very easily.

But as a quick recap, I just had to add a function which could pick up config changes from ExteriorSelectionComponent.js, pass those changes up to App.js and then pass it down to Display.js. This function is called updateConfiguration() and its passed to Dropdown.js ExteriorContent.js ExteriorInnerContent.js and ExteriorSelectionComponent.js.

Rest of the code is limited to Display.js and App.js (passing props), so it should be pretty self-explanatory, but if you need to make some changes to Display.js and its not working as you expect, let me know and I will help you out.
