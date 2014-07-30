The Local Ground Web Kit
==========
The Local Ground Web Kit is a series of HTML / CSS / JavaScript files that makes it easy to create apps and interact with Local Ground data. Ready for College (R4C) is an example of an app that you can create with the kit.

> R4C is an app to help current high school students plan for college. It was designed and implemented by students from REALM Charter High School and Oakland Technical High School.
 

Features
---------
* A list of California Universities
* Current high school course and grade information
* Announcements
* Favorites
* User Profile

Dependencies
---------
R4C was built with the [Local Ground Data API](https://github.com/LocalGround/localground) and a set of JavaScript / CSS / HTML templates based on the following libraries / tools:

* [Backbone.js](http://backbonejs.org/)
* [Bootstrap.css](http://getbootstrap.com/)
* [FontAwesome.css](http://fortawesome.github.io/Font-Awesome/)
* [Underscore.js](http://underscorejs.org/)

Getting Started
---------
To create your own responsive web app using the Local Ground API and associated script files:

###I. The Database
1. Create an account on Local Ground’s [Test Server](http://dev.localground.org/accounts/register/). Note that this project is still under active development.
2. Create a data table that will serve as your data source [here](http://dev.localground.org/profile/forms/).
3. Add data to the table.

###II. The Web App
The Local Ground Web Kit is essentially a wrapper that sits on top of Backbone.js. It consists of some private JavaScript files, located in the /js/lib directory, and 5 files that are intended to be editable by developers who wish to create simple, data-driven web apps. 

####1. Models
Open the ```/js/models.js``` file and create a new Model class. So, for example, if I had created a table that listed the names and locations of nearby universities in Local Ground, I would create a javascript reference to that table as follows:

```javascript
var University = Model.extend({
	urlRoot: "http://dev.localground.org/api/0/forms/1/data/"
});
```
The Model class extends Backbone.js’s [Model definition](http://backbonejs.org/#Model), but adds a few additional features to make it easier to work with Local Ground data. As you may have figured out, the “urlRoot” property is necessary so that the app will know where to find the data.

####2. Collections
Once you have created a Model class, open the ```/js/collections.js``` file and create a new Collection class that references your Model class. Creating a Collection class is useful if you want to work with multiple data objects (multiple rows in a table). So in this example, if we wanted to make a Collection of Universities, we would do it as follows:

```javascript
var Universities = Collection.extend({
	model: University,
	url: "http://dev.localground.org/api/0/forms/1/data/",
	sort_field: "name"
});
```
The Collection class extends Backbone.js’s [Class definition](http://backbonejs.org/#Collection), but again adds a few additional methods to make it easier to work with Local Ground data. These methods are:

* **collections.sum(field_name)**
Returns a floating point number of the sum of the ```field_name``` over all of the model instances in the collection.

* **collections.average(field_name)**
Returns a floating point number of the average of the ```field_name``` over all of the model instances in the collection.

####3. Templates
The Local Ground Web Kit uses the ```index.html``` file as the harness for your web app. Within this harness, you can replace various containers with dynamic HTML content. In the R4C app, students replaced three sections of the app: 

1. The ```<div id="menu" class="collapse navbar-collapse"></div>``` DIV, which corresponds to the top menu,
2. The  ```<div id="content" class="container"></div>``` DIV, which corresponds to the main content area, and
3. The ```<div class="footer"></div>``` DIV, which corresponds to the footer.

In order to create your own dynamic content for a particular section of the harness, you must first create a new HTML template underneath your ```templates``` directory. Let’s create one called ```MySplashPage.html``` as follows:

```html
<h1>Welcome!</h1>
<p>This is my splash page.</p>
```

####4. Views
Once you have created your template, you may use one of six Local Ground View classes to render your content, listed below. Local Ground View classes extend Backbone’s [View]() class. In addition to the standard Backbone functionality, all views handle the following arguments:

* **context**: A list of additional functions and variables that can be accessed by an HTML template.
* **restricted**: A boolean flag indicating whether a user needs to be authenticated in order to access the particular view.

In the R4C example, views are typically instantiated in the ```js/functions.js``` file and accessed when the particular url route is requested.

#####StaticView
Renders static HTML content without any data.

#####ListView
Renders lists of data. In addition to the standard arguments, **ListView** has two additional arguments:

* **collection** ```required```: An instance of a particular collection, say, ```new Universites()```
* **filter**: An optional string that serves as a server-side Local Ground filter. So, for instance, if we wanted to only return universities that were part of the University of California system, our filter would be: ```filter: "where university_type = 'UC'"```.

#####DetailView
Renders a single data record. **DetailView** has one additional argument:

* **model** ```required```: An instance of a particular model, say, ```new University()```

#####DetailUpdateView
Renders a form of updatable data. Same arguments as **DetailView**.

#####HeaderView
Renders a header view. It takes two additional arguments: 

* **anonymousTemplateName** ```required```: The name of the template to display for unauthenticated users.
* **loggedInTemplateName**: The name of the template to display for authenticated users (if applicable).

#####LoginView
Implements all of the functionality needed to authenticate (if you create a users data table). It takes three additional arguments: 

* **collection** ```required```: An instance of your users table in Local Ground. Any table can be a users table, but it must have a column which stores username, and a column that stores the password for every user. For example, ```collection, = new Users()``` (remember that you also have to define the User class in ```js/models.js``` and the Users class in ```js/collections.js```.
* **field_username**: The field name that corresponds to your username column in your Local Ground users table. Defaults to "username”.
* **field_password**: The field name that corresponds to your password column in your Local Ground users table. Defaults to "password”.

####5. Functions
The Local Ground Web Kit is design so that new content is rendered primarily by 

2. Create a new function and view within the ```js/functions.js``` file (explained below). For now, let’s call this function ```welcome```, where the purpose of the welcome function is to insert the HTML contained within ```MySplashPage.html``` into the ```<div id="content" class="container"></div>``` of the ```index.html``` harness.




####6. The Configuration File
The purpose of the configuration file ```js/config.js``` is to connect everything together.

```javascript
var config = {
	username: "your_localground_username",
	password: "your_localground_username",
	templateNames: [
		"MySplashPage",
		"UniversityList",
		"UniversityDetail"
	],
	urls: {
		"": welcome,
		"universities": universityList,
		"universities/:id": universityDetail
	},
	router: null,
	loginURL: "login",
	user: null
};
```

