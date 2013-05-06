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

We want to display different things in function of the user log in state. If he is logged, we will show him a form if he isn't we will show him a sign in button.

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

Now, we need to declare a template.

### Declaring template

Our `wrapper` widget will have one template. It will contain a welcome message, our log in button if the user is not logged or our registration widget if he isn't.

Let's create it:

```html
<head>
  <!-- Code omitted on purpose -->

  <script type="text/x-template" data-hull-template="wrapper/intro">
    {{#if loggedIn}}
      <p>Hello {{me.name}} – <a href="#" data-hull-action="logout">Logout</a></p>
      <div data-hull-widget="registration@hull"></div>
    {{else}}
      <p>Hello visitor</p>
      <div data-hull-widget="login_button@hull"></div>
    {{/if}}
  </script>
</head>
```

As you can see we have prefixed our template name with "wrapper/" because it will be owned by the `wrapper` widget.

Now, we need to specify this template in `wrapper` widget.

```html
<head>
  <!-- Code omitted on purpose -->

  <script>
  Hull.widget('wrapper', {
    templates: ['intro']
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

Refresh your browser, you should see a sign in button.

## Step 3 - Detecting if user is logged

As you see clicking on the sign in button doesn't show the form. To fix this, we need to set a `refreshEvents` property to refresh (re-render) the widget when the user changes.

```html
<head>
  <!-- Code omitted on purpose -->

  <script>
  Hull.widget('wrapper', {
    templates: ['intro'],
    refreshEvents: ['model.hull.me.change']
  });
  </script>

  <!-- Code omitted on purpose -->
</head>
```

### Setting a refresh event.

```js
refreshEvents: ['model.hull.me.change']
```

Here we set `refreshEvents` property to `['model.hull.me.change']`. This say to the widget to refresh itself each time the current user changes.

Now, clicking on the sign in button should show the form.
