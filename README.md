# Academic Hub (PWA)

ไฟล์ทั้งหมดในโฟลเดอร์นี้ต้องวางไว้บนเว็บที่เป็น HTTPS จึงจะติดตั้งเป็นแอปได้

## วิธีที่ 1: Firebase Hosting (ใช้บัญชีเดิมที่ทำ *.web.app)
1. ติดตั้ง Node.js แล้วรัน `npm i -g firebase-tools` และ `firebase login`
2. เข้าโฟลเดอร์นี้ รัน `firebase init hosting` เลือกโปรเจกต์ ตอบ public directory = `.` และตอบ No กับ single-page app / overwrite index.html
3. รัน `firebase deploy` จะได้ลิงก์ `https://ชื่อโปรเจกต์.web.app`

## วิธีที่ 2: GitHub Pages
สร้าง repo อัปโหลดไฟล์ทั้งหมด แล้วเปิด Settings > Pages > Deploy from branch

## ติดตั้งในมือถือ
- Android (Chrome): เปิดลิงก์ > เมนู ⋮ > "ติดตั้งแอป" หรือ "เพิ่มลงในหน้าจอหลัก"
- iPhone (Safari): เปิดลิงก์ > ปุ่มแชร์ > "เพิ่มลงในหน้าจอโฮม"

## แก้ข้อมูล
แก้รายการในตัวแปร `LINKS` ใน index.html แล้วเปลี่ยน `VERSION` ใน sw.js (เช่น v2) ก่อน deploy เพื่อให้แอปที่ติดตั้งแล้วอัปเดตตาม
