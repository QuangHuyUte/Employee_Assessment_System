const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// 1. Cấu hình thư mục Public chứa file tĩnh (CSS, Client JS, Images)
// Giúp file style.css trong thư mục public/css nhận diện được
app.use(express.static(path.join(__dirname, 'public')));

// 2. Cấu hình Middleware xử lý dữ liệu từ Form (POST methods)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 3. Cấu hình View Engine (Handlebars)
// Import helpers nếu bạn có viết custom helpers trong helpers.js
// const hbs_helpers = require('./helpers/helpers'); 

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main', // Đảm bảo bạn có file main.hbs trong thư mục views/layouts
    // helpers: hbs_helpers 
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// 4. Gọi các Route (Ví dụ với users.route.js)
const usersRoute = require('./route/users.route.js');
app.use('/users', usersRoute);

// Route mặc định trang chủ
app.get('/', (req, res) => {
    res.render('home'); // Sẽ render file home.hbs (bạn cần tạo file này)
});

// 5. Khởi động Server
app.listen(port, () => {
    console.log(`Hệ thống đang chạy tại http://localhost:${port}`);
});