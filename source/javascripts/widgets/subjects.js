Hull.widget('subjects', {
  templates: ['list'],
  
  subjects: [
    {name: 'facebook', color: '#3B5998'},
    {name: 'twitter', color: '#00A0D1'},
    {name: 'pinterest', color: '#C8232C'},
    {name: 'Prism', color: '#CC181E'}
  ],

  beforeRender: function(data) {
    data.subjects = this.subjects;
    return data;
  },
  
  chooseTopic: function(topic){

  },

  actions: {
    select: function(e, data) {
      if(data.data.uid){
        var id = '~'+btoa(data.data.uid);
      } else {
        var id=false;
        //Todo Make this work
      }
      this.sandbox.emit('hull.conversation.reload', id);
      this.sandbox.emit('hull.conversation.reset_form', id);
    }
  }
});
