$(document).ready(function() {
  // Update tweet char count on textarea input
  $('#tweet-text').on('input', () => {
    let tweetLength = $('#tweet-text').val().length;
    let charsLeft = 140 - tweetLength;
    $('.counter').text(charsLeft);

    // Add tweet-error class if tweet is over 140 characters, remove it when less than 140 
    if(charsLeft < 0) {
      $('.counter').addClass('tweet-char-error');
    } else {
      $('.counter').removeClass('tweet-char-error');
    }
  })
});
