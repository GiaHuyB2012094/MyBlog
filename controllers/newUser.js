module.exports = (req,res) => {
    var username = "";
    var password = "";
    var confirmPassword = "";
    const data = req.flash('data')[0];

    if (typeof data != "undefined"){
        username = data.username
        password = data.password
        confirmPassword = data.confirmPassword
    }
    res.render('register',{
        //errors: req.session.registrationErrors
        errors: req.flash('validationErrors'),
        username: username,
        password: password,
        confirmPassword: confirmPassword,
    })
}

