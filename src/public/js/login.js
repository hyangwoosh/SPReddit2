window.addEventListener("DOMContentLoaded", function () {

    //login account
    var loginuser = document.getElementById("loginacc");
    loginuser.addEventListener("click", function() {

        var logemail = document.getElementById("login-email").value;
        var logpassword = document.getElementById("login-password").value;

        axios.post('/api/users/login', {
                email: logemail,
                password: logpassword
        })
        .then(function (res) {

            if(res.data.message == "Incorrect Credentials"){
                alert(res.data.message);
            }
            else {
                console.log(res.data.jwt);
                sessionStorage.setItem("jwt", res.data.jwt);
                window.location.href = "../html/main.html"
                
            }
            
          })
        .catch(function (err) {
            console.log(err);
          })
    })
});