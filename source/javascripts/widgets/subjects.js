Hull.widget('subjects', {
  // Specify template.
  templates: ['list'],
  
  subjects: [
    {name: 'facebook', color: '#3B5998'},
    {name: 'twitter', color: '#00A0D1'},
    {name: 'pinterest', color: '#C8232C'},
    // {name: 'dropbox', color: '#3D9AE8'},
    // {name: 'evernote', color: '#5BA525'},
    {name: 'youtube', color: '#CC181E'}
    // {name: 'spotify', color: '#81B71A'}
  ],

  initialize: function() {
    this.sandbox.on('hull.conversation.pick', this.pickConvo,this);
  },

  pickConvo: function(e){

    var col = $('[data-hull-id="'+e+'"]').parents('.cols');
    var icon = col.parents('.topic');
    this.chooseTopic(icon.data('hull-topic'));
    // var topics = $('.topic');
    // var inactive = topics.not(icon);
    // inactive.removeClass('active').addClass('hidden');
    // icon.removeClass('hidden').addClass('active');
    col.addClass('selected');
  },

  beforeRender: function(data) {
    data.subjects = this.subjects;
    return data;
  },
  
  chooseTopic: function(topic){
    var $body = $('body');
    var color = '';
    if(topic){
      this.subjects.forEach(function(s) {
        if(s.name == topic) {
          color = s.color;
        }
      })
      // Change background color
      $body.css({
        backgroundColor: color
      });
      $('.topic').each(function() {
        var t = $(this);
        if(t.hasClass(topic)) {
          t.addClass('active').removeClass('hidden');
        }
        else {
          t.removeClass('active').addClass('hidden');
        }
      });
    } else{
      $body.css({
        backgroundColor: ''
      });
      $('.topic').removeClass('hidden active')
    }

  },

  actions: {
    back: function(e,data){
      this.chooseTopic('');
    },
    select: function(e, data) {
      
      var id = '~'+btoa(data.data.uid);
      // this.sandbox.emit('hull.conversation.reload', id);
      // this.sandbox.emit('hull.conversation.reset_form', id);
      this.chooseTopic(data.data.uid);

    }
  }
});
