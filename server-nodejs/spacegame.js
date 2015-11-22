
var Firebase = require('firebase');

var dbUrl = "https://boiling-inferno-5911.firebaseio.com/spacegame";
var db = new Firebase( dbUrl );

var processUser = function( game, obj ){
  console.log( 'Processing User', obj.key() );
  var val = obj.val();

  val.xpos += val.xspeed;
  val.ypos += val.yspeed;

  var xbounce = false;
  var ybounce = false;
  if( val.xpos < 0 ){
    xbounce = true;
    val.xpos = 0;
  }
  if( val.xpos > 1000 ){
    xbounce = true;
    val.xpos = 1000;
  }
  if( val.ypos < 0 ){
    ybounce = true;
    val.ypos = 0;
  }
  if( val.ypos > 1000 ){
    ybounce = true;
    val.ypos = 1000;
  }

  var objChanges = {
    xpos: val.xpos,
    ypos: val.ypos
  };
  if( xbounce ){
    objChanges.xspeed = -val.xspeed;
  }
  if( ybounce ){
    objChanges.yspeed = -val.yspeed;
  }

  var objDb = obj.ref();
  objDb.update( objChanges );
};

var processObject = function( game, obj ){
  var key = obj.key();
  if( key === 'target' ){
    // TODO - handle
  } else {
    processUser( game, obj );
  }
};

var processGame = function( game ){
  console.log( 'Processing Game', game.key() );
  game.forEach( function(obj){
    processObject( game, obj );
  });
};

var processAll = function( data ){
  console.log( 'Processing All' );
  data.forEach( processGame );
};

var process = function(){
  db.once( 'value', processAll );
};

var changedThrust = function( thrust ){
  var thrustVal = thrust.val();
  if( thrustVal === true ){
    var thrustDb = thrust.ref();
    thrustDb.set( false );

    var userDb = thrustDb.parent();
    userDb.once('value',function(user){
      var userVal = user.val();
      var rotate = userVal.rotate;
      var radians = rotate * Math.PI / 180;
      var changes = {
        xspeed: userVal.xspeed + Math.sin( radians ),
        yspeed: userVal.yspeed - Math.cos( radians )
      };
      if( changes.xspeed < -5 ){
        changes.xspeed = -5;
      } else if( changes.xspeed > 5 ){
        changes.xspeed = 5;
      }
      if( changes.yspeed < -5 ){
        changes.yspeed = -5;
      } else if( changes.yspeed > 5 ){
        changes.yspeed = 5;
      }

      userDb.update( changes );
    });
  }
};

var addedUser = function( user ){
  console.log( 'Added User', user.key() );
  user.ref().orderByKey().startAt('target').endAt('thrust').on('child_changed',changedThrust);
};

var addedObject = function( obj ){
  var key = obj.key();
  if( key === 'target' ){
    // Probably do nothing
  } else {
    addedUser( obj );
  }
};

var addedGame = function( game ){
  console.log( 'Added game', game.key() );
  game.ref().on( 'child_added', addedObject );
};

// Setup callbacks
db.on( 'child_added', addedGame );

// Update ships periodically
var processInterval = setInterval( process, 1000 / 30 );