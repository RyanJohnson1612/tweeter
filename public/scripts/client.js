/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  // Escapes input to prevent XSS attacks
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  

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
      <p>${escape(tweet.content.text)}</p>
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
      // Prepend so newer tweets are display first
      $tweetsContainer.prepend($tweet);
    });
  };

  // Fetch tweets from database
  const loadTweets = () => {
    $.get('/tweets', (tweets) => {
      renderTweets(tweets);
    })
    .fail((err) => {
      console.log(`Error getting tweets: ${err.responseJSON.error}`);
    });
  };

  // Handles form submission for new tweet
  $('#new-tweet-form').submit(function(event) {
    event.preventDefault();
    const $tweetData = $(this).serialize();
    const $tweetText = $('#tweet-text');
    $('.tweet-error').slideUp();  
    // Check that tweet is valid (shorter than 140 characters and longer than 0)
    if ($tweetText.val().length <= 140 && $tweetText.val()) {
      $.post('/tweets', $tweetData, (res) => {
        // Clear textarea on succesful submission and trigger input event, so that remaining character count changes to 140
        $tweetText.val('').trigger('input');
        $('#tweets-container').empty();
        loadTweets();
      })
      .fail((err) => {
        console.log(`Error posting tweet: ${err.responseJSON.error}`);
      })
    } else if ($tweetText.val().length > 140) {
      setTimeout(() => {
        $('.error-message').text('Tweet is longer than 140 characters');    
        $('.tweet-error').slideDown();  
      }, 500);
    } else {
      setTimeout(() => {
        $('.error-message').text('Please enter a valid tweet');    
        $('.tweet-error').slideDown(); 
      }, 500);
    }
  });

  // Load all the tweets when document finishes loading
  loadTweets();
});