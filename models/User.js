const mongoose = require('mongoose')

// 스키마 정의
// 몽구스를 이용해서 스키마를 정의하면 몽고db에 테이블이 생성됨
const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength : 50
    },
    email:{
        type: String,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        maxlength: 5
    },
    lastname:{
        type: String,
        maxlength: 50
    },
    role:{
        type: Number,
        default: 0
    },
    image: String,
    token:{
        type: String
    },
    tokenExp:{
        type: Number
    }
})


const User = mongoose.model('User', userSchema) // 스키마를 모델로 감쌈

module.exports = {User} // 다른곳에서도 사용할 수 있게 export