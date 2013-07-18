Hull.widget('conversation_form', {
  // Specify template.
  templates: ['form'],

  // Re-render the widget each time the user changes.
  refreshEvents: ['model.hull.me.change'],

  initialize: function() {
    this.sandbox.on('hull.conversation.reset_form', function(id) {
      this.options.id = id;
      this.render();
    }, this)
  },
  
  actions: {
    create: function(e, action) {
      e.preventDefault();
      var formData = this.sandbox.dom.getFormData($('.newConvo'));
      
      formData.public = true;
      
      var url = this.options.id ? this.options.id : 'app';
      url += '/conversations';
      this.api(url, 'post', formData).then(_.bind(function(convo) {
        self.conversationId = convo.id;

        this.sandbox.emit('hull.conversation.pick', convo.id);
        this.sandbox.emit('hull.conversation.reload', this.options.id);
        this.render();
      }, this));
    }
  }
});
