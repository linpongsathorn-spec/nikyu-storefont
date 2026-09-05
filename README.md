# NIKYU — เว็บไซต์ร้านค้าออนไลน์

Static landing page สร้างจาก UI handoff ของ Claude Design (`NIKYU ร้านค้าออนไลน์-handoff.zip`)
โดยยึดตามไฟล์ `NIKYU Landing.dc.html` และ NIKYU Design System แบบ 1:1

## โครงสร้างไฟล์

| ไฟล์ | รายละเอียด |
| --- | --- |
| `index.html` | หน้า Landing ทั้งหมด (header, hero, แคตตาล็อก, cold-chain, LINE, footer) |
| `css/styles.css` | สไตล์ของหน้า แปลงจาก inline style + React component ในไฟล์ handoff |
| `css/tokens/*.css` | Design tokens ต้นฉบับจาก NIKYU Design System (สี, ตัวอักษร, ระยะ, รูปทรง, motion) |
| `js/app.js` | เรนเดอร์การ์ดสินค้า, กรองหมวดหมู่, เลื่อน rail, สลับภาษา, ตัวเลขตะกร้า |
| `assets/img/` | รูปสินค้าและ hero (เปลี่ยนชื่อเป็น kebab-case จาก `uploads/` เดิม) |
| `serve.ps1` | เว็บเซิร์ฟเวอร์ static เล็ก ๆ สำหรับรันในเครื่อง |

## รันในเครื่อง

```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```

แล้วเปิด http://localhost:8123/ — หรือจะเปิด `index.html` ผ่านเว็บเซิร์ฟเวอร์ static ตัวใดก็ได้

## สิ่งที่ทำตามข้อมูลใน handoff

- **ฟอนต์**: โหลด Shippori Mincho / Noto Serif Thai / IBM Plex Sans Thai / IBM Plex Mono
  จาก Google Fonts (เป็นฟอนต์แทนที่ — ยังไม่ได้รับไฟล์ฟอนต์จริง)
- **โลโก้**: ใช้ wordmark เซ็ตด้วยตัวอักษร + ตัว 和 ตามที่ระบุใน design system (ยังไม่มีไฟล์โลโก้จริง)
- **วิดีโอเมนู**: ไฟล์ `*-clip.mp4` ไม่ได้แนบมา จึงแสดงเฉพาะป้าย `▶ คลิปเมนู` บนการ์ดเนื้อ
- ข้อความ, ราคา, โครงสร้างหมวดหมู่ และข้อมูลสินค้า คัดลอกตรงจากไฟล์ handoff

## ยังไม่ได้ทำ (ไม่มีในไฟล์ handoff ที่แนบ)

`NIKYU Landing.dc.html` เป็นหน้าเดียวใน bundle — หน้า set builder / about / sign-in / cart drawer
ที่กล่าวถึงใน design system ไม่ได้อยู่ในไฟล์ที่แนบมา จึงยังไม่ได้สร้าง
