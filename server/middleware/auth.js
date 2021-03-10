const {User} = require('../models/User');

let auth = (req, res, next) => {
    // 인증 처리

    //client cookie 에서 token 가져옴
    let token = req.cookies.x_auth;

    //token decode 후 user._id 가져와서 db에서 유저 정보를 가져옴
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth : false, error : true })
        // request 에서 해당 정보를 사용할 수 있도록 넣어줌
        req.token = token;
        req.user = user;
        next(); // middleware 에서 다음 동작으로 갈 수 있도록 함
    })


}

module.exports = {auth};