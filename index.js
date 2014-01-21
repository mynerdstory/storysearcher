var nconf = require('nconf');
nconf.argv().env().file({ file: 'local.json' });

var twitterText = require('twitter-text');
var twitter = require('twitter-oauth');
var twitterAuth = twitter({
  consumerKey: nconf.get('twitterConsumerKey'),
  domain: nconf.get('twitterDomain'),
  consumerSecret: nconf.get('twitterConsumerSecret'),
  completeCallback: '/'
});
var unshortener = require('unshortener');

var twitterQuery = '"my nerd story" OR #mynerdstory';
var twitterToken = nconf.get('twitterToken');
var twitterTokenSecret = nconf.get('twitterTokenSecret');


// ~~~


doTwitterSearch();

function doTwitterSearch() {

  twitterAuth.search(twitterQuery, twitterToken, twitterTokenSecret, function (err, results) {
    if(err) {
      console.log(err);
    } else {

      var tweets = results.tweets;

      tweets.forEach(function(tweet) {
        var urls = getURLs(tweet.text);
        tweet.urls = urls;
      });

      var tweetsWithURLs = tweets.filter(hasURL);

      tweetsWithURLs.forEach(function(t) {
        console.log(t.text);
        console.log(t.urls);
      });

      var firstURL = tweetsWithURLs[0].urls[0].url;
      unshortener.expand(firstURL, function(err, url) {

        if(err) {
          console.log(err);
          return;
        }

        console.log(firstURL, url);

      });

    }
  });

}


function getURLs(text) {
  return twitterText.extractUrlsWithIndices(text);
}

function hasURL(tweet) {
  return (tweet.urls.length > 0);
}
