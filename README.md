# CA3 Group 4 DAT
### Members
* Hallur Við Neyst 
* John David Bloch Hansen 
* Lasse Hougaard Andersen 
* Murched Kayed 
### How far have we come
* New users can register and login.
* Admins can see all system users and delete them if needed.
* All users can see places by clicking on "see places" in the topmenu.
* We have NOT yet implemented a search, filter and sort in "places".


### Documentation for CA-3

What we have implemented so far for this CA.

For Sprint 1 we have implemented:
Backend:
*	Let new users Register
*	Let Admins see all system users, and possibly delete and add/edit users and their roles
*	Let all (non-authenticated) users see info about “places”. Information, should as a minimum include:
○	Address (city, zip, street) (just keep in one Class/Table, no need to normalize)
○	Gps-location (make it nullable, only meant for uploads via an App)
○	A description of the place and why it´s amazing.
○	A rating on the experience from 1-5.
○	A uri to an image


Web:
*	Let new users Register
*	Let Admins see all system users, and possibly delete and add/edit users and their roles
*	Let all (non-authenticated) users see info about “places”. Information, should as a minimum include:
  *	Address (city, zip, street) (just keep in one Class/Table, no need to normalize)
   Gps-location (make it nullable, only meant for uploads via an App)
   A description of the place and why it´s amazing.
   A rating on the experience from 1-5.
   A uri to an image



For Sprint 2 we have implemented: 
Backend: 
*	Add capability via the Rest endpoints to upload images and other information

Web:
*	Registered users must be able to create new locations with picture, address, description

App: 
*	View a list of existing locations

### Link to Expo published app:
-	Link Here:

### How far can we go with the Semester Project:
The first user stories at the list is the highest priorities.
The Web-App:
-	Search for specific locations, filter/sort in list of locations etc.) (7 hours)
-	Registered users can rate (preferably only once) existing locations (5 hours)
-	See/reserve available Holiday Homes (from this company) near a location (15 hours)


The Mobile-App:

*	All users can see existing places and their ratings. Search for specific locations, filter/sort in list of locations (10 hours)
*	Users can add new places (image, GPS-location, address, description, rating)(10 hours)

### How to test our system:
client:
- Copy Paste : -> https://jdbh.dk/ 
- Click on login and type either username: admin, password: test or username: user, password: test

- Now you are logged in as admin:
- Then you can see all users (please  don't delete admin). Here you can delete users, or you can change a user-role to either admin or user.
- Then we have a link "page for admins", that link is only available for admins.
- Then we have a link called "see places" where you can see all the added places.

- Now you are logged in as User:
- Here you can see a link called "Page for users" that only is available for the users. 
- As user you can add a place, where you need to type in the required input fields and upload a image and give the image a rating between 1-5
-There is also a page that just shows a random number for the user

-both user and admin can add places, you just choose a file on your computer and type in the input fields and click "save the place" (if nothing shows up, you need to refresh).

app:
-go to: https://expo.io/@hallur20/seedapp, download the expo app on your phone and scan the code.
-you should then see a table with the same info as in the 'see places' section on the client.
