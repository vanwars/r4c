Ready4College (R4C) via the Local Ground Web Kit
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
Open the /js/models.js file and create a new Model class. So, for example, if I had created a table that listed the names and locations of nearby universities in Local Ground, I would create a javascript reference to that table as follows:

```javascript
var University = Model.extend({
	urlRoot: “http://dev.localground.org/api/0/forms/1/data/”
});
```
The Model class extends Backbone.js’s [Model definition](http://backbonejs.org/#Model), but adds a few additional features to make it easier to work with Local Ground data. As you may have figured out, the “urlRoot” property is necessary so that the app will know where to find the data.

####2. Collections
Once you have created a Model class, open the /js/collections.js file and create a new Collection class that references your Model class. Creating a Collection class is useful if you want to work with multiple data objects (multiple rows in a table). So in this example, if we wanted to make a Collection of Universities, we would do it as follows:

```javascript
var Universities = Collection.extend({
	model: University,
	url: “http://dev.localground.org/api/0/forms/1/data/”,
	sort_field: “name”
});
```
The Collection class extends Backbone.js’s [Class definition](http://backbonejs.org/#Collection), but again adds a few additional methods to make it easier to work with Local Ground data. These methods are:

* **collections.sum(field_name)**
Returns a floating point number of the sum of the ```field_name``` over all of the model instances in the collection.

* **collections.average(field_name)**
Returns a floating point number of the average of the ```field_name``` over all of the model instances in the collection.

####3. The Configuration File

```javascript
var config = {
	username: 'your_localground_username',
	password: 'your_localground_username',
	templateNames: [
		‘MySplashPage’,
		'UniversityList',
		'UniversityDetail’
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
