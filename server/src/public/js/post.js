window.addEventListener('DOMContentLoaded', function () {
  // Retrieve specific post
  const postID = post_id;
  axios.get('http://localhost:8000/api/posts/v1/' + postID).then((response) => {
    // console.log(response.data);
    return response.data;
  }).then((data) => {
    // console.log(data);
    console.log('Successfully retrieved post');
    document.getElementById('current-post-title').innerHTML = data.result[0].title;
    document.getElementById('current-post-content').innerHTML = data.result[0].content;
    document.getElementById('current-post-creator').innerHTML = 'By: ' + data.result[0].creator;
    document.getElementById('current-post-created-at').innerHTML = 'Created at: ' + data.result[0].created_at;
    document.getElementById('current-post-updated-at').innerHTML = 'Last updated at: ' + data.result[0].updated_at;
  }).catch((error) => {
    // console.log(error);
    console.log('Error occurred while retrieving post');
  });

  // Retrieve likes from post
  axios.get('http://localhost:8000/api/posts/v1/likes/post/' + postID).then((response) => {
    // console.log(response.data.result);
    let totalLikes = 0;
    if (response.data.result.length == 0) {
      totalLikes = 0;
    } else {
      for (let i = 0; i < response.data.result.length; i++) {
        totalLikes += response.data.result[i].action;
      }
    }
    response.data = [totalLikes, response.data.result.length];
    return response.data;
  }).then((data) => {
    // console.log(data);
    console.log('Successfully retrieved post likes');
    document.getElementById('post-likes-amount').innerHTML += data[0];
    document.getElementById('post-likes-users').innerHTML += 'Rated by ' + data[1] + ' user(s)';
  }).catch((error) => {
    // console.log(error);
    console.log('Error occurred while retrieving post likes');
  });

  // Like/dislike/reset (Post)
  const likePostButton = document.getElementById('like-post-button');
  const dislikePostButton = document.getElementById('dislike-post-button');
  const resetPostLikeButton = document.getElementById('reset-post-like-button');

  likePostButton.onclick = function () {

    // Retrieve likable ID from post ID
    axios.get('http://localhost:8000/api/posts/v1/likable/post/' + postID).then((response) => {
      // console.log(response.data);
      return response.data;
    }).then((data) => {
      // console.log(data);
      console.log('Successfully retrieved likable ID');

      const userID = parseInt(sessionStorage.getItem('id'));
      const likableID = data.result[0].likable_id;
      const action = 1;

      axios.post('http://localhost:8000/api/posts/v1/likes', {
        user_id: userID,
        likable_id: likableID,
        action: action,
      }).then((response) => {
        // console.log(response.data);
        return response.data;
      }).then((data) => {
        // console.log(data);
        console.log('Successfully liked post');
        window.location.reload();
      }).catch((error) => {
        // console.log(error);
        console.log('Error occurred while liking post');
      });

    }).catch((error) => {
      // console.log(error);
      console.log('Error occurred while retrieving likable ID');
    });
  };

  dislikePostButton.onclick = function () {

    // Retrieve likable ID from post ID
    axios.get('http://localhost:8000/api/posts/v1/likable/post/' + postID).then((response) => {
      // console.log(response.data);
      return response.data;
    }).then((data) => {
      // console.log(data);
      console.log('Successfully retrieved likable ID');

      const userID = parseInt(sessionStorage.getItem('id'));
      const likableID = data.result[0].likable_id;
      const action = -1;

      axios.post('http://localhost:8000/api/posts/v1/likes', {
        user_id: userID,
        likable_id: likableID,
        action: action,
      }).then((response) => {
        // console.log(response.data);
        return response.data;
      }).then((data) => {
        // console.log(data);
        console.log('Successfully disliked post');
        window.location.reload();
      }).catch((error) => {
        // console.log(error);
        console.log('Error occurred while disliking post');
      });

    }).catch((error) => {
      // console.log(error);
      console.log('Error occurred while retrieving likable ID');
    });
  };

  resetPostLikeButton.onclick = function () {

    // Retrieve likable ID from post ID
    axios.get('http://localhost:8000/api/posts/v1/likable/post/' + postID).then((response) => {
      // console.log(response.data);
      return response.data;
    }).then((data) => {
      // console.log(data);
      console.log('Successfully retrieved likable ID');

      const userID = parseInt(sessionStorage.getItem('id'));
      const likableID = data.result[0].likable_id;
      const action = 0;

      axios.post('http://localhost:8000/api/posts/v1/likes', {
        user_id: userID,
        likable_id: likableID,
        action: action,
      }).then((response) => {
        // console.log(response.data);
        return response.data;
      }).then((data) => {
        // console.log(data);
        console.log('Successfully reset post like');
        window.location.reload();
      }).catch((error) => {
        // console.log(error);
        console.log('Error occurred while resetting post like');
      });

    }).catch((error) => {
      // console.log(error);
      console.log('Error occurred while retrieving likable ID');
    });
  };

  // Create comment
  const addCommentButton = document.getElementById('add-comment-button');
  addCommentButton.onclick = function () {
    const postID = post_id;
    const commentCreator = sessionStorage.getItem('username');
    const commentContent = document.getElementById('comment-content').value;
    addCommentButton.disabled = true;
    alert('Please wait while we are creating your comment');
    axios.post('http://localhost:8000/api/posts/v1/comments', {
      post_id: postID,
      creator: commentCreator,
      content: commentContent,
    }).then((response) => {
      // console.log(response.data);
      return response.data;
    }).then((data) => {
      // console.log(data);
      console.log('Successfully added comment');
      alert('Successfully added comment');
      window.location.reload();
    }).catch((error) => {
      // console.log(error);
      console.log('Error occurred while adding comment');
      alert('Error occurred while adding comment');
    });
    addCommentButton.disabled = false;
  };

  // Retrieve all comments from post
  axios.get('http://localhost:8000/api/posts/v1/comments/posts/' + postID).then((response) => {
    // console.log(response.data);
    return response.data;
  }).then((data) => {
    // console.log(data);
    console.log('Successfully retrieved comments');
    for (let i = 0; i < data.result.length; i++) {

      axios.get('http://localhost:8000/api/posts/v1/likes/comment/' + data.result[i].comment_id).then((response) => {
        // console.log(response.data);
        let totalLikes = 0;
        if (response.data.result.length == 0) {
          totalLikes = 0;
        } else {
          for (let i = 0; i < response.data.result.length; i++) {
            totalLikes += response.data.result[i].action;
          }
        }
        response.data = [totalLikes, response.data.result.length];
        return response.data;
      }).then((data) => {
        // console.log(data);
        console.log('Successfully retrieved comment likes');
        document.getElementById('comment-likes-' + (i + 1) + '').innerHTML += data[0];
        document.getElementById('users-comment-likes-' + (i + 1) + '').innerHTML += 'Rated by ' + data[1] + ' user(s)';
      }).catch((error) => {
        // console.log(error);
        console.log('Error occurred while retrieving comment likes');
      });

      document.getElementById('comments').innerHTML +=
        `<table>
        <thead>
        <tr>
        <th id='comment-id' hidden>` + data.result[i].comment_id + `</th>
        <th id='post-id' hidden>` + data.result[i].post_id + `</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td id='comment-content'>` + data.result[i].content + `</td>
        </tr>
        <tr>
        <td id='comment-creator' style='font-size: 13px'>> ` + data.result[i].creator + `</td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
        <td>` +

        // Like (+) button
        `<a onClick="

        axios.get('http://localhost:8000/api/posts/v1/likable/comment/' + ` + data.result[i].comment_id + `).then((response) => {
          return response.data;
        }).then((data) => {
          console.log('Successfully retrieved likable ID');

          const userID = parseInt(sessionStorage.getItem('id'));
          const likableID = data.result[0].likable_id;
          const action = 1;

          axios.post('http://localhost:8000/api/posts/v1/likes', {
            user_id: userID,
            likable_id: likableID,
            action: action,
          }).then((response) => {
            return response.data;
          }).then((data) => {
            console.log('Successfully liked comment');
            window.location.reload();
          }).catch((error) => {
            console.log('Error occurred while liking comment');
          });

        }).catch((error) => {
          console.log('Error occurred while retrieving likable ID');
        });

        "><button id='comment-like-button' style='font-size: 13px'>+</button></a>` +

        // Number of likes
        `<div id='comment-likes-` + (i + 1) + `' style='font-size: 13px'></div>` +

        // Dislike (-) button
        `<a onClick="

        axios.get('http://localhost:8000/api/posts/v1/likable/comment/' + ` + data.result[i].comment_id + `).then((response) => {
          return response.data;
        }).then((data) => {
          console.log('Successfully retrieved likable ID');

          const userID = parseInt(sessionStorage.getItem('id'));
          const likableID = data.result[0].likable_id;
          const action = -1;

          axios.post('http://localhost:8000/api/posts/v1/likes', {
            user_id: userID,
            likable_id: likableID,
            action: action,
          }).then((response) => {
            return response.data;
          }).then((data) => {
            console.log('Successfully liked comment');
            window.location.reload();
          }).catch((error) => {
            console.log('Error occurred while liking comment');
          });

        }).catch((error) => {
          console.log('Error occurred while retrieving likable ID');
        });

        "><button id='comment-dislike-button' style='font-size: 13px'>-</button></a>

        <br>` +

        // Reset button
        `<a onClick="

        axios.get('http://localhost:8000/api/posts/v1/likable/comment/' + ` + data.result[i].comment_id + `).then((response) => {
          return response.data;
        }).then((data) => {
          console.log('Successfully retrieved likable ID');

          const userID = parseInt(sessionStorage.getItem('id'));
          const likableID = data.result[0].likable_id;
          const action = 0;

          axios.post('http://localhost:8000/api/posts/v1/likes', {
            user_id: userID,
            likable_id: likableID,
            action: action,
          }).then((response) => {
            return response.data;
          }).then((data) => {
            console.log('Successfully liked comment');
            window.location.reload();
          }).catch((error) => {
            console.log('Error occurred while liking comment');
          });

        }).catch((error) => {
          console.log('Error occurred while retrieving likable ID');
        });

        "><button id='comment-like-reset-button' style='font-size: 13px'>Reset</button></a>` +

        // Number of users that liked
        `<div id='users-comment-likes-` + (i + 1) + `' style='font-size: 13px'></div>` +

        `</td>
        </tr>
        </tfoot>
        </table>
        <br>`;
    };
  }).catch((error) => {
    // console.log(error);
    console.log('Error occurred while retrieving comments');
  });
});