/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  // Creates JQuery object for a single tweet
  const createTweetElement = (tweet) => {
    const tweetTemplate = `<article class='tweet'>
      <header>
        <div>
          <img src="${tweet.user.avatars}" alt="${tweet.user.name} Profile Picture">
          <h5>${tweet.user.name}</h5>
        </div>
        <span>${tweet.user.handle}</span>
      </header>
      <p>${tweet.content.text}</p>
      <footer>
        <span>
          ${timeago.format(tweet.created_at)}
        </span>
        <div>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>`;
    const $tweet = $(tweetTemplate);
    return $tweet;
  };

  // Renders all tweets from an array of tweets fetched from loadTweets
  const renderTweets = (tweets) => {
    const $tweetsContainer = $('#tweets-container');
    tweets.forEach((tweet) => {
      // Use createTweetElement to create a JQuery object for current tweet
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.append($tweet);
    });
  };

  // Fetch tweets from database
  const loadTweets = () => {
    $.get('/tweets', (tweets) => {
      renderTweets(tweets);
    })
    .fail((err) => {
      console.log(`Error getting tweets: ${err.message}`);
    });
  };

  // Handles form submission for new tweet
  $('#new-tweet-form').submit(function(event) {
    event.preventDefault();
    const tweetData = $(this).serialize();
    $.post('/tweets', tweetData, (res) => {
      console.log(res);
    })
    .fail((err) => {
      console.log(`Error posting tweet: ${err.message}`);
    })
  });

  // Load all the tweets when document finishes loading
  loadTweets();
});