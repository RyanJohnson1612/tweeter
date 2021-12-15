/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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

  // Renders all tweets from an array of tweets
  const renderTweets = (tweets) => {
    const $tweetsContainer = $('#tweets-container');
    tweets.forEach((tweet) => {
      // Use createTweetElement to create a JQuery object for current tweet
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.append($tweet);
    })
  };

  // Handles form submission for new tweet
  $('#new-tweet-form').submit(function(event) {
    event.preventDefault();
    const tweetData = $(this).serialize();
    $.post('/tweets', tweetData, (res) => {
      console.log(res);
    })
  });

  renderTweets(data);
});