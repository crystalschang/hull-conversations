# User Registration Tutorial

For this tutorial, we'll create a registration tunel. First, we will ask the user to log in with his Facebook account, them we will ask him to fill his profile. And finally we'll show him his profile and an edit button that will allow him to edit his profile.

## Prerequisites

- An organization and application. [Create one](http://hullapp.io/) if you haven’t already.
- An authentication provider linked to your app, so users can log in. For this tutorial I will use Facebook but you can use another if you want. [See our documentation](http://hull.io/docs/services) for more details.
- An HTTP server, to serve the files included in this repository. If you're not sure how to do it, check out [our guide](https://github.com/hull/minimhull/wiki/Setup-an-HTTP-server).

## Step 1 - Bootstraping your app

First, create an `index.html`. Add jQuery, and hull.js to your page. You can also add Bootstrap if you do not like browsers default CSS.

```html
<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script src="https://hull-js.s3.amazonaws.com/0.4.0/hull.js"></script>
```

Now initialize hull.

```html
<script>
Hull.init({
  appId: 'APPLICATION_ID',
  orgUrl: 'ORGANIZATION_URL'
});
</script>
```

Replace `APPLICATION_ID` and `ORGANIZATION_ID` with the correct values which you can find in your [admin]().

## Step 2 - Creating wrapper widget

We want to display different template in function of the user log in state. If he is a visitor we will show him an `intro` template, if he is logged, we will show him a `logged_in` template.

To do that we need to create a `wrapper` widget.

```html
<head>
  <!-- Code omitted on purpose -->

  <script>
  Hull.widget('wrapper', {

  });
  </script>
</head>
```

Now, we need to declare our templates.

### Declaring templates

Our `wrapper` widget will have two templates, one for each state:

- `intro`: will be displayed when the user isn't logged, it will contain a welcome message and our identity widget.
- `logged_in`: will be displayed when the user is logged, it will contain a welcome message, our registration widget and a logout link.

Let's create them:

```html
<head>
  <!-- Code omitted on purpose -->

  <script type="text/x-template" data-hull-template="wrapper/intro">
    <h1>Hello visitor</h1>
    <div data-hull-widget="identity@hull"></div>
  </script>

  <script type="text/x-template" data-hull-template="wrapper/logged_in">
    <h1>Hello {{me.name}}</h1>
    <div data-hull-widget="registration@hull"></div>
  </script>
</head>
```

As you can see we have prefixed our template name with "wrapper/" because those template will be owned by the `wrapper` widget.

Now, we need to specify those templates in `wrapper` widget.

```html
<head>
  <!-- Code omitted on purpose -->

  <script>
  Hull.widget('wrapper', {
    templates: [
      'intro',
      'logged_in'
    ]
  });
  </script>

  <!-- Code omitted on purpose -->
</head>
```

Congratualations! You've just created your first widget! Let's add it to our HTML document.

```html
<body>
  <div data-hull-widget="wrapper"></div>
</body>
```

Refresh your browser, you should see a "Sign In with Facebook" button.

## Step 3 - Detecting if user is logged

As you see clicking on "Sign In with Facebook" doesn't show the form. To fix this, we need to:

- Add `beforeRender` method that will determine which template to render.
- Set a `refreshEvents` property to refresh (re-render) the widget when the user changes.

```html
<head>
  <!-- Code omitted on purpose -->

  <script>
  Hull.widget('wrapper', {
    templates: [
      'intro',
      'logged_in'
    ],

    refreshEvents: ['model.hull.me.change'],

    beforeRender: function() {
      this.template = this.loggedIn() ? 'logged_in' : 'intro';
    }
  });
  </script>

  <!-- Code omitted on purpose -->
</head>
```

### Determining which template to render

```js
this.template = this.loggedIn() ? 'logged_in' : 'intro';
```

Here we use `this.loggedIn()` to check if the user is logged in, we set `this.template` to `'logged_in'`, `'intro'` if he isn't.

### Setting a refresh event.

```js
refreshEvents: ['model.hull.me.change']
```

Here we set `refreshEvents` property to `['model.hull.me.change']`. This say to the widget to refresh itself each time the current user changes.

Now, clicking on the "Sign In with Facebook" button should show the form.
