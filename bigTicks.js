if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to bigTicks.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  // event loop timer
  function tickTimer(threshold) {
    var time = process.hrtime();
    setImmediate(function() {
      var diff = process.hrtime(time);
      var ms = (diff[0] * 1e9 + diff[1]) * 1e-6; // ns to ms
  
      if (ms > (threshold || 0))
        Log.warn('WARNING: tick took ' + ms);
  
      tickTimer(threshold);
    });
  }
  
  function speedLoop() {
    // takes around 0.1 of a second on my machine
    for (var i = 0; i < 200000000; i++);
  }
  
  Meteor.startup(function() {
    tickTimer(1000);
    
    speedLoop()
    
    var queue = new Meteor._SynchronousQueue();
    
    _.times(20, function() {
      queue.queueTask(speedLoop)
    })
  });
}
