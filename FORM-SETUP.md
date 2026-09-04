# FORM-SETUP.md — Google Sheets Lead Capturing (Sirf 5 minute)

Har enquiry (Contact page + Har project ka "Request Project Details" form) ko ek
Google Sheet me save karna hai. WhatsApp popup pehle jaisa **bhi chalega** — dono
se leads milenge (double backup).

`js/data.js` me ek field hai:

```js
formEndpoint: "",
```

Yahan aapka Google Apps Script Web App ka URL ayega. Jab tak khaali hai, form
normal chalta hai (sirf WhatsApp khulta hai). URL daalne ke baad har submission
Sheet me bhi save hogi.

---

## Steps

### 1. Google Spreadsheet banao
- https://sheets.new kholo
- Sheet 1 ka naam `Leads` rakh do (ya jo bhi chaho)

### 2. Apps Script khulo
- Menu: **Extensions → Apps Script** (nayi tab khulegi)

### 3. Code paste karo
Editor me jo `function myFunction() {}` hai, use poora delete karke ye paste karo:

```javascript
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Leads") || ss.insertSheet("Leads");

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Date", "Form", "Page", "Name", "Phone", "Email", "Interested In", "Message"]);
  }

  var d;
  try { d = JSON.parse(e.postData.contents); } catch (err) { d = {}; }

  sheet.appendRow([
    d.date || new Date().toLocaleString("en-IN"),
    d.form || "",
    d.page || "",
    d.name || "",
    d.phone || "",
    d.email || "",
    d.interested || "",
    d.message || ""
  ]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### 4. Deploy karo
- Top-right **Deploy → New deployment**
- Type: **Web app**
- Execute as: **Me**
- Who has access: **Anyone**
- **Deploy** dabao, auth confirm karo (Google prompt aayega)

### 5. URL copy karo
Deploy ke baad **Web app URL** milta hai, kuch aisa:

```
https://script.google.com/macros/s/AKfycb.../exec
```

### 6. Website me daalo
`js/data.js` me:

```js
formEndpoint: "https://script.google.com/macros/s/AKfycb.../exec",
```

Phir site ko GitHub pe push karo. Bas!

---

## Test kaise karein
1. Contact page kholo, form bharo aur submit karo
2. Google Sheet khol ke dekho — nayi row aayi ho gi
3. WhatsApp window bhi khulegi (yei expected hai)

## Note
- Ye FREE hai (Apps Script ki gaadi unlimited submissions ke liye)
- Agar kabhi URL badalna ho to sirf `formEndpoint` update karo
- Sheet delete mat karna warna leads chale jayenge