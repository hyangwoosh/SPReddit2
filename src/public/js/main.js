window.addEventListener("DOMContentLoaded", function () {

    //logout
    var logout = document.getElementById("logoutacc");
    logout.addEventListener("click", function () {

        window.location.href = "../"
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("password");
        
    })

    // Create post
    const addPostButton = document.getElementById("add-post-button");
    addPostButton.onclick = function () {
        const postCreator = sessionStorage.getItem("username");
        const postTitle = document.getElementById("post-title").value;
        const postContent = document.getElementById("post-content").value;
        addPostButton.disabled = true;
        alert("Please wait while we are creating your post");
        axios.post("http://localhost:8000/api/posts", {
            creator: postCreator,
            title: postTitle,
            content: postContent
        }).then((response) => {
            // console.log(response.data);
            return response.data;
        }).then((data) => {
            // console.log(data);
            console.log("Successfully added post");
            alert("Successfully added post");
            window.location.reload();
        }).catch((error) => {
            // console.log(error);
            console.log("Error occurred while adding post");
            alert("Error occurred while adding post");
        })
        addPostButton.disabled = false;
    };

    // Retrieve all posts
    axios.get("http://localhost:8000/api/posts").then((response) => {
        // console.log(response.data);
        return response.data;
    }).then((data) => {
        // console.log(data);
        console.log("Successfully retrieved posts");
        for (let i = 0; i < data.result.length; i++) {
            document.getElementById("posts").innerHTML += "<table>" +
                "<thead>" +
                "<tr>" +
                "<th id='post-id' hidden>" + data.result[i].post_id + "</th>" +
                "<th id='post-title'>" + data.result[i].title + "</th>" +
                "</tr>" +
                "</thead>" +
                "<tbody>" +
                "<tr>" +
                "<td id='post-content'>" + data.result[i].content + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td id='post-last-updated'>Last updated: " + data.result[i].updated_at + "</td>" +
                "</tr>" +
                "</tbody>" +
                "<tfoot>" +
                "<tr>" +
                "<td>" +
                "<a href='post.html?post_id=" + data.result[i].post_id + "'><button id='view-post-button'>View post</button></a>" +
                "</td>" +
                "</tr>" +
                "</tfoot>" +
                "</table>" +
                "<br>";
        };
    }).catch((error) => {
        // console.log(error);
        console.log("Error occurred while retrieving posts");
    })

    // Retrieve specific post
    const editPostButton = document.getElementById("post-edit-button");
    editPostButton.onclick = function () { 
        const postID = document.getElementById("post-id").value;
        axios.get("http://localhost:8000/api/posts/" + postID).then((response) => {
            // console.log(response.data);
            return response.data;
        }).then((data) => {
            // console.log(data);
            console.log("Successfully retrieved post");
            document.getElementById("current-post").innerHTML = "<table>" +
                "<thead>" +
                "<tr>" +
                "<th id='current-post-id'>Post ID: " + data.result.post_id + "</th>" +
                "</tr>" +
                "<tr>" +
                "<th>" +
                "<input type='text' id='current-post-title'>" + data.result.title + "</input>" +
                "</th>" +
                "</tr>" +
                "</thead>" +
                "<tbody>" +
                "<tr>" +
                "<input type='text' id='current-post-content'>" + data.result.content + "</input>" +
                "</tr>" +
                "<tr>" +
                "<td id='current-post-last-updated'>Last updated: " + data.result.updated_at + "</td>" +
                "</tr>" +
                "</tbody>" +
                "<tfoot>" +
                "<tr>" +
                "<td>" +
                "<button id='update-post-button'>Update</button>" +
                "</td>" +
                "</tr>" +
                "</tfoot>" +
                "</table>";
        }).catch((error) => {
            // console.log(error);
            console.log("Error occurred while retrieving post");
        })
    };

    // Update post
    const postID = document.getElementById("current-post-id").value;
    const updatePostButton = document.getElementById("update-post-button");
    updatePostButton.onclick = function () {
        const newTitle = document.getElementById("current-post-title").value;
        const newContent = document.getElementById("current-post-content").value;
        axios.put("http://localhost:8081/api/posts/" + postID, {
            title: newTitle,
            content: newContent
        }).then((response) => {
            // console.log(response)
            return response.data
        }).then((data) => {
            // console.log(data)
            console.log("Successfully updated post");
            alert("Successfully updated post");
        }).catch((error) => {
            // console.log(error)
            console.log("Error occurred while updating post");
            alert("Error occurred while updating post");
        })
    };

    //register account
    var adduser = document.getElementById("registerbutton");
    adduser.addEventListener("click", function() {
        // Get the input value from the input field
        var regusername = document.getElementById("register-username").value;
        var regpassword = document.getElementById("register-password").value;
        var regemail = document.getElementById("register-email").value;

        // Send the name to the server via params
        axios.post('http://localhost:8000/api/users/', {
                username: regusername,
                email: regemail,
                password: regpassword
        })
        .then(function (res) {
            alert(res.data);
          })
        .catch(function (err) {
            console.log(err);
          })
    })
});
