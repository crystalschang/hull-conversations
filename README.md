# User Registration Tutorial

For this tutorial, we'll create a registration workflow. It's a two-step process:

* Log the user in with his/her Facebook account
* Let him/her fill a form to complete his profile

[Here's a live demo](http://hull.github.io/hull-registration-tutorial/).

The code for this project can be found on
[GitHub](https://github.com/hull/hull-registration-tutorial).

## What you will need

- A hull.io application. [Create one](http://hullapp.io/) if you haven’t
  already.
- An authentication provider linked to your app, so users can log in. Here we
  will use Facebook but you can use any other supported by hull. [See our
  documentation](http://hull.io/docs/services) for more details.
- An HTTP server, to serve the files included in this repository. If you're not
  sure how to do it, check out [our
  guide](https://github.com/hull/minimhull/wiki/Setup-an-HTTP-server).

## Step 1 - Bootstrap your app

First, create an `index.html`. Add jQuery, and `hull.js` to your page. For the
sake of this tutorial, we will also use Twitter Bootstrap, though it is not
mandatory.

    <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js" type="text/javascript"></script>
    <script src="//hull-js.s3.amazonaws.com/0.4.3/hull.js" type="text/javascript"></script>

Now initialize hull.

    <script type="text/javascript">
      Hull.init({
        appId: 'APPLICATION_ID',
        orgUrl: 'ORGANIZATION_URL'
      });
    </script>

Replace `APPLICATION_ID` and `ORGANIZATION_URL` with the correct values from
your [admin](http://hullapp.io).

## Step 2 - Create the wrapper widget

Depending on the user being logged in or not, we want to display a form (if
logged in) or a login button (resp. if not logged in).

For this we create a `wrapper` widget. Insert the following code in your HTML
document:

    <script type="text/javascript">
      Hull.widget('wrapper', {
        templates: ['intro']
      });
    </script>


    <script type="text/x-template">
      {{#if loggedIn}}
        <p>Hello {{me.name}} – <a href="#" data-hull-action="logout">Logout</a></p>
        <div data-hull-widget="registration@hull"></div>
      {{else}}
        <p>Hello visitor</p>
        <div data-hull-widget="login_button@hull"></div>
      {{/if}}
    </script>

By the way, Congrats! You've just created your first widget! Let's add it to our
HTML document.

    <div data-hull-widget="wrapper"></div>

Refresh your browser, you should see the sign in button.

## Step 3 - Update the template when the user logs in.

As you can see, clicking on the sign in button doesn't show the form. To fix
this, we need to set a `refreshEvents` property to refresh (re-render) the
widget when the user is updated (logged in/out, changed properties).

Here's our updated wrapper widget:

    <script type="text/javascript">
      Hull.widget('wrapper', {
        templates: ['intro'],
        refreshEvents: ['model.hull.me.change']
      });
    </script>

Here we set `refreshEvents` property to `['model.hull.me.change']`. This is for
the widget to refresh itself every time the current user changes.

Now, clicking on the sign in button should show a form that contains two fields
(name and email).

These are the default fields for this widget, but you probably want to know more
about your user.

## Step 4 - Customize the form

What about asking the user his/her gender, website and agreement to the "terms"?

For this, we need to build an admin page containing the `registration_admin`
widget. It will let us change the form's fields, We will put it in a new HTML
document that we call `admin.html`

Since it contains your App Secret, you will want to keep this page private. You
can for example keep it on your local machine, or protect it with a password.

    <html>
      <head>
        <title>Hull Registration Admin</title>

        <link rel="stylesheet" href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css">
        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
        <script src="//hull-js.s3.amazonaws.com/0.4.3/hull.js"></script>

        <script>
          Hull.init({
            appId: 'APPLICATION_ID',
            appSecret: 'APPLICATION_SECRET',
            orgUrl: 'ORGANIZATION_URL'
          });
        </script>
      </head>
      <body>
        <div data-hull-widget="registration_admin@hull"></div>
      </body>
    </html>

Replace `APPLICATION_ID`, `APPLICATION_SECRET` and `ORGANIZATION_URL` with the
correct values which you can find in your [admin](http://hullapp.io).

Open this new file in your browser and fill the textarea with:

    [
      {
        "name": "gender",
        "type": "select",
        "label": "Gender",
        "options": [
          { "value": "mr", "label": "Mr." },
          { "value": "mrs", "label": "Mrs." },
          { "value": "ms", "label": "Ms." }
        ],
        "error": "Please choose a gender",
        "required": true
      },
      {
        "name": "name",
        "type": "text",
        "label": "Name",
        "placeholder": "Your name",
        "error": "Please enter your name",
        "required": true
      },
      {
        "name": "email",
        "type": "email",
        "label": "Email",
        "placeholder": "you@provider.com",
        "error": "Please enter a valid email adress",
        "required": true
      },
      {
        "name": "website",
        "type": "url",
        "label": "Website",
        "placeholder": "http://website.com",
        "error": "Please enter a valid URL"
      },
      {
        "name": "terms",
        "type": "checkbox",
        "checkboxLabel": "I agree to the terms",
        "error": "You need to agree to the rules to participate",
        "required": true
      }
    ]

- `"name"`: the name of the field. this will be the key in the user profile.
- `"type"`: the type of the `<input />`. You can use HTML5 input type.
- `"label"`: the label of the field. It will be visible by the user.
- `"placeholder"`: the value of the input `placeholder` attribute.
- `"error"`: the error message that will be displayed if the field validation fails.
- `"required"`: boolean value that indicates whether the field is required or not.

Go back to your `index.html` you should see the website field.

Now that you know how to save information in the user profile, you probably want
to list your users and their profile informations.

## Step 5 - Listing users

In your `admin.html` add the `users_admin` widget.

    <div data-hull-widget="registration_admin@hull"></div>
    <div data-hull-widget="users_admin@hull"></div>

Refresh your browser and you're done.

## Conclusion

What did we learn here?

- Creating a widget.
- Customizing a registration form.
- Saving informations in the user profile.
- Listing users.
