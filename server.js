const http = require("http");
const mongoose = require('mongoose');

// 連接資料庫
mongoose.connect('mongodb://localhost:27017/hotel')
    .then(() => {
        console.log('資料庫連線成功');
    })
    .catch((error) => {
        console.log('資料庫連線失敗');
        console.log(error);
    });


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


Room.create({
    name: "美麗大圓房9",
    price: 3800,
    rating: 4.8
}).then(() => {
    console.log('資料新增成功');
}).catch((error) => {
    console.log(`資料儲存失敗，錯誤訊息：${error}`);
});



// // 實例化model（新增資料）
// const beautyRoom = new Room({
//     name: "美麗大圓房8",
//     price: 3800,
//     rating: 4.8
// });


// // 儲存資料
// beautyRoom.save().then(() => {
//     console.log("資料儲存成功");
// }).catch((error) => {
//     console.log(`資料儲存失敗，錯誤訊息：${error}`);
// });





// const init = async () => {
//     const AllPost = await Post.find();  // 非同步語法，會等資料庫回傳資料後，才會繼續往下執行
//     // find()語法，他本身就是一個非同步語法

//     console.log(AllPost)
// }
// init();

// schema 結束


const requestListener = (req, res) => {
    console.log(req.url);
    res.end();
}

const server = http.createServer(requestListener);
server.listen(3005);