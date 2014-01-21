var nconf = require('nconf');
nconf.argv().env().file({ file: 'local.json' });

var twitter = require('twitter-oauth');
var twitterAuth = twitter({
  consumerKey: nconf.get('twitterConsumerKey'),
  domain: nconf.get('twitterDomain'),
  consumerSecret: nconf.get('twitterConsumerSecret'),
  completeCallback: '/'
});

var twitterQuery = '"my nerd story" OR #mynerdstory';
var twitterToken = nconf.get('twitterToken');
var twitterTokenSecret = nconf.get('twitterTokenSecret');

twitterAuth.search(twitterQuery, twitterToken, twitterTokenSecret, function (err, results) {
  if(err) {
    console.log(err);
  } else {
    console.log(results);
  }
});
