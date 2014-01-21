var nconf = require('nconf');
nconf.argv().env().file({ file: 'local.json' });

var twitter = require('twitter-oauth');
var twitterAuth = twitter({
  consumerKey: nconf.get('twitterConsumerKey'),
  domain: nconf.get('twitterDomain'),
  consumerSecret: nconf.get('twitterConsumerSecret'),
  completeCallback: '/'
});

twitterAuth.search('"my nerd story" OR #mynerdstory', nconf.get('twitterToken'), nconf.get('twitterTokenSecret'), function (err, results) {
  if(err) {
    console.log(err);
  } else {
    console.log(results);
  }
});
