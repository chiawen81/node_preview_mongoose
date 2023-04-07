const http = require("http");
const mongoose = require('mongoose');
const Room = require("./models/room");
const { ObjectId } = require('mongoose').Types;
let body = "";

// 連接資料庫
mongoose.connect('mongodb://localhost:27017/hotel')
    .then(() => {
        console.log('資料庫連線成功');
    })
    .catch((error) => {
        console.log('資料庫連線失敗');
        console.log(error);
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



const requestListener = async (req, res) => {
    // 設定表頭
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
        'Content-Type': 'application/json'
    };

    // 取得body資料
    req.on('data', chunk => {
        body += chunk;
    });
    console.log('body', body);

    if ((req.url == "/rooms") && (req.method == "GET")) {
        const rooms = await Room.find();
        res.writeHead(200, headers);
        res.write(JSON.stringify({
            "status": "SUCCESS",
            rooms
        }));
        res.end();

    } else if ((req.url == "/rooms") && (req.method == "POST")) {
        req.on("data", async () => {
            try {
                const data = JSON.parse(body);
                console.log('data', data);

                // 創建資料
                const newRoom = await Room.create({
                    name: data.name,
                    price: data.price,
                    rating: data.rating
                });

                res.writeHead(200, headers);
                res.write(JSON.stringify({
                    "status": "SUCCESS",
                    newRoom
                }));
                res.end();

            } catch (error) {
                console.log(`新增資料有誤，請見錯誤訊息:${error}`);
                res.end();
            };
        });

    } else if ((req.url == "/rooms") && (req.method == "DELETE")) {
        const room = await Room.deleteMany({});
        res.writeHead(200, headers);
        res.write(JSON.stringify({
            "status": "SUCCESS",
            room: []
        }));
        res.end();

    } else if ((req.url.includes("/rooms/")) && (req.method == "DELETE")) {
        console.log(1213);
        const targetId = "642f945df69cc9edc1789c25";

        Room.findByIdAndUpdate(targetId, { "name": 'test2' }).then(() => {
            console.log('test success');
            res.writeHead(200, headers);
            res.write(JSON.stringify({
                "status": "SUCCESS",
            }));
            res.end();

        }).catch((error) => {
            res.writeHead(200, headers);
            res.write(JSON.stringify({
                "status": "FAILD",
                "emg": error
            }));
            res.end();
        });
    };


};

const server = http.createServer(requestListener);
server.listen(3005);