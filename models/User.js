const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10;

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
        maxlength: 5
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

const User = mongoose.model('User', userSchema) // 스키마를 모델로 감쌈

module.exports = {User} // 다른곳에서도 사용할 수 있게 export