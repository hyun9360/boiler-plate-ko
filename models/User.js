const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken')

// 스키마 정의
// 몽구스를 이용해서 스키마를 정의하면 몽고db에 테이블이 생성됨
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

//mongoose save 하기 전에 동작하는 것
userSchema.pre('save', function (next) {

    var user = this;

    // 유저 비밀번호가 수정될 때만 작동되도록 함
    if (user.isModified('password')) {
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            // 암호화 되기 전의 원본 비밀번호가 들어가야함.
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                // hash 된 비밀번호로 바꿔줌
                user.password = hash
                next()
            });
        });
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function (plainPw, cb) {
    // plain password 를 암호화해서 db 의 비밀번호와 비교함
    bcrypt.compare(plainPw, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch)

    })
}

userSchema.methods.generateToken = function (cb) {
    var user = this;

    //jsonwebtoken 이용하여 토큰 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    // db 에 token 저장
    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user)
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    // token decode
    jwt.verify(token, 'secretToken', function (err, decoded) {
        // user._id 를 이용해서 유저를 찾고 client의 토큰과 db의 토큰 비교
        user.findOne({"_id": decoded, "token": token}, function (err, user) {
            if (err) return cb(err);
            cb(null, user)
        })

    });
}

const User = mongoose.model('User', userSchema) // 스키마를 모델로 감쌈

module.exports = {User} // 다른곳에서도 사용할 수 있게 export