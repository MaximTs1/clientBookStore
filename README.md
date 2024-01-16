Hi !

My name is Maxim Tsvetkov and welcome to my ecommerce shop and my final HackerU Full-Stack project !

- Interduction:
  This project is designed for a neighbor of mine - Ariella, that long time ago asked me to create a new project that will help her sell her many books that she read and collected among the years.
  Ariella is huge reading fan that within the years read thousands of books and it was time to make room in the house and also a new place for all new books that should be purchased.
  Common platforms like Facebook Market and Yad2 created difficulties with the purchase proccess because of the great variety, therefore a website was needed to make the purchase much more simple.

- About this project:
  I created 2 different websites - one for the clients and one for the admin. <br/>
  The admin will be able to controll the inventory and easily upload new items and control the orders. <br/>
  Both the admin and the client web sites are synchronized and live information between the seller and the client will be available.

I opened a sever with Kamatera Cloud Solutions to learn how to create a server and upload it, so Ill could learn more and beyond the local host.
The server will be olways on and if there will be any problem and the server will off for some reason .. please contact me right away and ill fix that ! <br/>
**052-774-1590**

about project assignments and documentation: <br/>

Client side technology requirements:

1. Design and Responsiveness:
   It is recommended to use the Bootstrap or Design Material library. <br/>
   **I used bootstarp and MUI in this project.**

2. The design file:
   If the design file (css) is over 100 lines, it must be divided into files
   separate according to the subjects. For this purpose it is recommended to use the scss library. <br/>
   **I used separated css files and also included the design inside the files using wrappers.**

3. Icons:
   It is recommended to use sample icons from the fontawesome material bootstrap library
   and the like.. <br/>
   **I used MUI icons and fontawesome icons.**

4. An entry page:
   Should include a main title, a secondary title, an image text that will match the nature of the site/the app.
   If it is a website of any online store, a search field must be displayed on the opening page with at least three card codes.
   The landing page should be clear for what type of website/app we have arrived to and should be designed in such a way that invites the users to register. <br/>
   **I have completed all the necessary in this part.**

5. Navigation menu:
   On the website/application to contain a dynamic navigation menu that is common to all website pages. <br/>
   **This project has a navbar and a side bar for this project.**

6. Footer:
   On the website / application to contain a footer with a logo, copyright and means of contacting the site.
   If necessary, also add links to social media or anything else in the navigation menu to match this area in the application/site. <br/>
   **This project has a footer with all the necessary instructions.**

7. Accessibility:
   Put the name of the application in the title tag in the forms index file, as well as an image/
   Logo in favicon: link.
   Each image must include the alt attribute with a caption that describes the image. <br/>
   **This project has a all the necessary as described in this part.**

8. About page:
   You must create an about page in which you provide an in-depth explanation of the site and how to deal with it. <br/>
   **This project has a all the necessary as described in this part.**

9. Forms:
   Uniformity must be maintained in the design of all forms on the site. <br/>
   Validations must be made on all fields. <br/>
   A visual indication must be given below the field being entered if the user is standing or does not meet the field validation requirements.
   Sending of the forms should be allowed only after reason mandatory fields are complete.  
    The user must be updated on the success or failure of sending from the form and in case of success, it should be moved to the relevant page. <br/>
   **This project has a all the necessary as described in this part.**

10. Registration and membership:
    On the client side interface to display the login page and the title membership registration page eligibility and a form for registration/login.<br/>
    Regex must be used for password fields in forms, which requires entering a password with at least one uppercase and one lowercase letter in English, at least four
    numbers and a special sign from among the following signs (!@%$#^&\_-\_\_) In addition, all passwords must include at least 8 characters. <br/>
    **This project has a all the necessary as described in this part.**

11. Token:
    After a successful login, you must receive a token from the server with an encrypted value using the library
    jwt and save it in localStorage. The information encrypted within it must be used in order to determine the
    The user's permissions.
    A visual indication must be given according to the user's login status.
    Do not save sensitive user information such as email and password inside the token even if it is encrypted. <br/>
    **This project has a all the necessary as described in this part.**
    **The client side has the token login, and the admin side for now has only regular login because i want to continue my reseach and later add maybe stronger login option.**

12. Crud:
    After logging in, the user must allow the crud operations, i.e.: read, create, update and deletion of content.
    The content you create should be available in different parts of the site.
    For example if it is in an online store, after you add a product it should appear on the forms page or the products page.
    There is to give a visual indication to the user about the success/failure of performing the crud operations.
    **In this project, the user can create, read, and update data, but doesnt have an option to delete.**
    **The admin web side has the option to delete "cards" and for now I dont want to able the admin to delete users.**

13. Favorites/Input to shopping basket:
    The user must be given the option to save content (card/code/user) etc. in favorites.
    A visual indication must be given that the content is preferred by the user.
    The preferences must be saved in a database so that it doesn't matter from which device a user accesses the site/content application he preferred will continue to be preferred.
    A page of favorite content must be created, where the user can see everything.
    The details he has marked as favorites and if he wants he can get favorite items from the page.
    **This project has a all the necessary as described in the client site.**

14. Content details page:
    By clicking on a card/user/content, the user will go to a dynamic page where details will be given to the content item the user clicked on.
    **This project has a all the necessary as described in "edit info" part.**

15. Search field:
    A search field must be created for the content (card/code/user, etc.)
    **This project has a all the necessary as described in "products" part and also in the admin site in "cards" and "users".**

16. Privileges:
    The creation of at least two types of users must be allowed, the first when it is a regular user and the other is admin.
    Only a user defined as an admin will be able to create, edit and delete content, while that a normal user can only see or mark content as their favorite.
    **It is possible to create regular users, that can read the data and edit their info,**
    **and the admin site allows to delete and update all the products and add new items.**

17. HTTP calls:
    HTTP calls must be made on the server side from the client side and through them send information from the server.
    For this purpose the Axios library must be used.
    The catch and try mechanism must be used in readings server-side asynchronicity in case you use asynchronous functions, or substitutes in the mechanism
    ()catch.()then. And this is so that the code does not break by chance and a critical error is returned from the server.
    **This project has a all the necessary as described in this part.**

18. Architecture:
    A logical and industry-accepted order of files must be maintained.
    The code must be clean and readable, With correct division into folders and components.
    **This project has a all the necessary as described in this part.**

19. Console:
    Be sure to work correctly with the console.
    The consul must be free of warning notes, errors and content, so critical errors can be easily seen from the server.
    **This project has a all the necessary as described in this part.**

20. Content filtering:
    The client has the option to filter the content displayed on a certain page according to different parameters.
    **This project has a all the necessary as described in the client -> products part.**

21. Display modes:
    It must be possible to switch between different information displays of the content displayed to the client.
    (the content display in the table or tabs)
    **This project has a all the necessary as described in the client -> products part and also in the admin -> order table.**

**Bonus on the client side:**

1. Logout:
   The application/site must be allowed to disconnect the user and not use the site/another app from 4 hours.
   **This project has a all the necessary as described and logs out after 1 hour.**

2. Limiting requests:
   The number of calls to the server that a user can make in 24 hours must be limited
   Protection of the server from an attack designed to slow down/destroy it.

3. User management interface:
   A user management page that will display the users registered in the database in a table
   Site on site.
   On this page it will be possible to edit or delete users, it will also be possible to change the permissions user from normal user to admin.

4. Management of orders/favorites:
   A page that will show the user the type of content admin according to the number of people they defined same as favorite.

5. Inventory management:
   In the case of an online store, a store inventory management page. A certain product is out of stock
   From the inventory, an indication must be given to the client that the product is out of stock.

6. User profile picture:
   User details with a profile picture that will be uploaded to a folder on the computer
   on which the project is located

7. Password update:
   A page must be created that will allow a user who has forgotten his password to change his password and this
   Only after verifying that it is indeed a user trying to change his password and not a hacker. For that matter
   It is recommended to send an email to the user with a link to the password change page.

**Server-side technology requirements**

1. package.json:
   In the json.package file, put nodemon in devDependencies, and let inside the "main" key be the name of the file to run the application.

2. Listening to HTTP requests:
   A rest API interface must be built that allows requests to be received, to create, edit,<br/>
   displaying and deleting information from the database according to client side requests.
   For this purpose the library must be used express.

3. Authentication:
   The request must go through an authentication process in order to verify that the client is indeed
   The one who sent the request and not a hacker trying to break into the database through the server.

4. Authorization:
   On the server side, only a user logged in and defined as admin should be allowed to add, delete or editing information from the database.

5. Database:
   The information in the project must be saved in the MongoDB database either locally or on
   cloud. It is also necessary to allow adding, editing and deleting details from the database. in the folder you are in
   You must submit an env file if you saved the keys to connect with the cloud server in it

6. Server-side validations:
   Server-side validations must be done with the joi library or a similar library, and in the case of
   There are errors and stop the functions before sending the object to mongoos validation and saving
   in the database.

7. Models & Routes:
   The code must be divided into modules to keep the code clean and readable.

8. Logger:
   You must use a library for managing http requests such as Morgan or alternatively create a logger
   Your own that will print in the console readings from the client side to the server side

9. Comments:
   On the names of the variables and functions to be logical and tell a story about the code. If necessary
   Concise notes for programmers should be added if there are complex functions or there is a page with multiples
   functions within it.
