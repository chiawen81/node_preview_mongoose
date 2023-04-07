const mongoose = require('mongoose');

// 設置schema
const roomSchema = new mongoose.Schema({
    // 定義資料的型態、是否必填、預設值、是否要顯示在回傳的資料中
    name: String,
    price: {
        type: Number,                     // 定義資料型態
        default: 0,                       // 定義預設值
        required: [true, '價格未填寫'],     // 定義是否必填，並且可以自訂錯誤訊息
        select: false                     // 定義是否要顯示在回傳的資料中
    },
    rating: Number,
    creatTime: {
        type: Date,
        default: Date.now,                // 定義預設值為當下時間
        select: false                     // 定義是否要顯示在回傳的資料中
    }
}, {
    // 變更schema預設值的設定
    versionKey: false,                    // 移除___v欄位
});


// 建立model
const Room = mongoose.model("Room", roomSchema);
//                        ^^^^^^  ^^^^^^^^^^
//          model名稱/collection  schema名稱
// note：model的變數通常會大寫開頭

module.exports = Room;