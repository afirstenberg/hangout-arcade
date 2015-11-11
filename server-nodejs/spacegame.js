
var Firebase = require('firebase');

var dbUrl = "https://boiling-inferno-5911.firebaseio.com/spacegame";
var db = new Firebase( dbUrl );

var processUser = function( obj ){
  console.log( 'Processing User', obj.key() );
  var val = obj.val();

  val.xpos += val.xspeed;
  val.ypos += val.yspeed;

  var bounce = false;
  if( val.xpos < 0 ){
    bounce = true;
    val.xpos = 0;
  }
  if( val.xpos > 1000 ){
    bounce = true;
    val.xpos = 1000;
  }
  if( val.ypos < 0 ){
    bounce = true;
    val.ypos = 0;
  }
  if( val.ypos > 1000 ){
    bounce = true;
    val.ypos = 1000;
  }

  var objChanges = {
    xpos: val.xpos,
    ypos: val.ypos
  };
  if( bounce ){
    objChanges.xspeed = -val.xspeed;
    objChanges.yspeed = -val.yspeed;
  }

  var objDb = obj.ref();
  objDb.update( objChanges );
};

var processObject = function( obj ){
  var key = obj.key();
  if( key === 'target' ){
    // TODO - handle
  } else {
    processUser( obj );
  }
};

var processGame = function( game ){
  console.log( 'Processing Game', game.key() );
  game.forEach( processObject );
};

var processAll = function( data ){
  console.log( 'Processing All' );
  data.forEach( processGame );
};

var process = function(){
  db.once( 'value', processAll );
};

var processInterval = setInterval( process, 1000 / 30 );