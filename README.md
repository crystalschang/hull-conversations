# Conversations Tutorial

For this tutorial, we'll create a conversation workflow. It's a two-step process:

* Allow a person to create a new conversation
* Update related widgets with the new information

[Here's a live demo](http://hull.github.io/hull-conversations/).

The code for this project can be found on
[GitHub](https://github.com/hull/hull-conversations).

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
    <script src="//hull-js.s3.amazonaws.com/0.4.4/hull.js" type="text/javascript"></script>

Now initialize hull.

    <script type="text/javascript">
      Hull.init({
        appId: 'APPLICATION_ID',
        orgUrl: 'ORGANIZATION_URL'
      });
    </script>

Replace `APPLICATION_ID` and `ORGANIZATION_URL` with the correct values from
your [admin](http://hullapp.io).

## Step 2 - Create the conversation form widget

Depending on the user being logged in or not, we want to display a form (if
logged in) or a login button (resp. if not logged in).

For this we create a `conversation_form` widget. Insert the following code in your HTML
document:

    <script type="text/javascript">
      Hull.widget('conversation_form', {
        templates: ['form']
      });
    </script>


    <script type="text/x-template" data-hull-template="conversation_form/form">
      <div class="convoForm">
        <button class="btn startBtn pull-right" data-hull-action="startConvo">Start a new conversation</button>
        {{#if loggedIn}}
          <form class="newConvo">
            <input type="text" name="name" placeholder="Title"></input>
            <textarea name="message_body" placeholder="Start talking!"></textarea>
            <div class="convoActions pull-right">
              <button data-hull-action="create" class="btn">Submit</button>
              <span data-hull-action="cancel">Cancel</span>
            </div>
          </form>
        {{else}}
          Login to start a new conversation
          <div data-hull-widget="identity@hull"></div>
        {{/if}}
      </div>
    </script>


By the way, Congrats! You've just created your first widget! Let's add it to our
HTML document.

    <div data-hull-widget="wrapper"></div>

Refresh your browser, you should see the sign in button.

## Step 3 - Update the template when the user logs in.

As you can see, clicking on the sign in button doesn't show the form. To fix
this, we need to set a `refreshEvents` property to refresh (re-render) the
widget when the user is updated (logged in/out, changed properties).

Here's our updated conversation_form widget:

    <script type="text/javascript">
      Hull.widget('conversation_form', {
        templates: ['form'],
        refreshEvents: ['model.hull.me.change']
      });
    </script>

Here we set `refreshEvents` property to `['model.hull.me.change']`. This is for
the widget to refresh itself every time the current user changes.

Now, clicking on the sign in button should show a conversation form that contains two fields.

## Step 4 - Handle actions on the form
You may have noticed that there are `data-hull-action` attributes in the template that we created in Step 2.



## Step 5 - Listing users

In your `admin.html` add the `admin/users` widget.

    <div data-hull-widget="admin/registration@hull"></div>
    <div data-hull-widget="admin/users@hull"></div>

Refresh your browser and you're done.

## Conclusion

What did we learn here?

- Creating a widget.
- Customizing a conversation form.
- Saving informations in the user profile.
- Listing users.
