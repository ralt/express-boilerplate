Express-Boilerplate
===

Introduction
---

This file explains how the code is structured.

Folder structure
---

Here is the folder structure used:

- project/
    - app.js
    - loader.js
    - package.json
    - controllers/
    - helpers/
    - models/
    - public/
    - routes/
    - validators/
    - views/

Explanation of what each file/folder is for:

- `app.js`: Where the node applications is run. It has the configuration and runs the `loader.js` file. It's also the file that defines the global object `app`.
- `loader.js`: This file loads all the controllers, models, helpers validators and routes onto the `app` global object. This allows us to call `app.controllers.homeController` in the `routes/home.js` file, for example. Basically, this file creates:
    - `app.controllers`
    - `app.helpers`
    - `app.models`
    - `app.routes`
    - `app.validators`
- `package.json`: Some information about the project. Also, dependencies are defined here, this allows us to have `node_modules/` in the `.gitignore` file and just run `npm install` to get the correct dependencies.
- `controllers/`: Folder where each controller's file is stored. They will all be loaded in the `app` object thanks to `loader.js`.
- `helpers/`: Folder where all the views' helpers are stored.
- `models/`: Folder where each model's file is stored.
- `public/`: Public assets. This folder is served through a web server like Apache or Nginx. Should contain CSS/JS/IMG files.
- `routes/`: Folder where each route's file is stored.
- `validators/`: Folder where all the validators are stored. The validators are usually called middlewares in the Express documentation.
- `views/`: Folder where all the views are. Also called templates, they done using EJS.

Code flow
---

### Initialization

The initialization is done in `app.js`. Not much business code there, it just creates an HTTP server using Express. It also defines the session store used (memory if nothing is specified), the view engine to use (EJS in our case) and some petty stuff.

Something to note is that the `app` object is made global. This will allow us to access it from anywhere in the application. This is made this way so that we don't need to pass the object around within parameters and we don't need a dependency injector like ncore. **This is the single global object.**

It is also in this file that the loader is called, and then it runs the server.

### Loading

The `loader.js` file is called by `app.js` when the `app` global object is already defined, so we can access it already.

This file is just there for syntactic sugar: it attaches all the routes, models, controllers, helpers and validators on to the `app` object.

It does this by listing all the files in each specified folder (for now, these folders are `models`, `controllers`, `validators`, `helpers` and `routes`). Once it has the files, it attaches an object onto `app` following these guidelines:

- The name of the property is the name of the folder. For example, for `models/`, it will be `app.models`.
- The name of each sub property is like this: `file (without .js) + folder (capitalized, without s at the end)`. For example, the `home.js` in the `models/` folder will be the `app.models.homeModel` object.

### Routing

Thanks to the loader, routing is made easy. Here is a commented example:

    module.exports = function() {
        // Define the route and the controller
        app.get( '/', app.controllers.homeController );
    }(); // Don't forget to add the parentheses. Or the loader won't load the route.

### Controllers

Controllers are also quite easy. Here is a commented example:

    module.exports = function( req, res ) {
        // Call the model to get the datas
        app.models.homeModel.getDatas( function( err, datas ) {
            // Once the datas are there, render the view
            res.render( 'home', datas );
        });
    };

### Models

Models are different: we're sending an object with the methods we need. Commented example:

    module.exports = {
        // We're not defining the function here, this allows us
        // to gain one level of indentation
        getDatas: getDatas
    };

    function getDatas( callback ) {
        callback( undefined, {
            title: 'Some title',
            text: 'Some text'
        });
    }

### Views

The views are using the [EJS template][1] system. This means that there must be a `layout.ejs` file that will contain the main layout (DOCTYPE, etc).

Each template can then be called using its file name. In the controller's example, it calls the `home.ejs` file.

Basically, there are three special syntax we can use (replace &lt; and &gt; by the correct HTML entity):

- `<% if () { %>`: real javascript code. Available for `if`, `forEach`, etc.
- `<%= variable %>`: displays a javascript variable.
- `<%- body %>`: special syntax used to include a sub template.


   [1]: https://github.com/visionmedia/ejs

