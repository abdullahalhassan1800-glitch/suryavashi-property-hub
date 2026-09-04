# HANDBOOK.md — Client Handoff Guide (Suryavashi Property Hub)

Ye website ek **static site** hai jo **GitHub Pages** pe host hai. Isme koi server /
database nahi — sab content `js/data.js` me hai, isliye content update karna 2 minute
ka kaam hai. Neeche sab kuch step-by-step.

---

## 1. Website kahan hai (URLs)

- **Live site:** https://abdullahalhassan1800-glitch.github.io/suryavashi-property-hub/
- **Repo (code):** https://github.com/abdullahalhassan1800-glitch/suryavashi-property-hub
- **Pages:** Dept kaise bhi, naya push hone ke baad ~1 minute me update hota hai

## 2. Files ka structure

```
website/
├── index.html            → Home page
├── projects.html         → Projects listing
├── project-detail.html   → Har project ka detail page
├── about.html            → About page
├── blog.html             → Insights (blog)
├── contact.html          → Contact + form
├── css/style.css         → Saari styling (colors, layout)
├── js/data.js            → *** SAB CONTENT YAHI HAI ***
├── js/main.js            → Behaviour (rendering, forms, sliders)
└── images/               → Saare images
```

## 3. Content change kaise karein (sabse ahem file: `js/data.js`)

`js/data.js` me ek `VIHAAN` object hai. Har project ek entry hai. Example — Green Heaven:

```js
{
  id: "green-heaven",
  name: "Green Heaven",
  type: "Residential",
  location: "Sector 16, Greater Noida West (near Sparsh Global School)",
  configs: ["2 BHK", "3 BHK"],
  price: "Call for Price",
  callForPrice: true,
  image: "images/projects/green-heaven-1.jpg",
  ...
}
```

### Price change
- Asli price aa jaye to `price: "Call for Price"` ki jagah likho, e.g. `price: "Starting at ₹65 Lakh*"`
- Aur `callForPrice: true` wali line **hata do** (taki "Call for Price" button na dikhe)

### Photo change
- Naya photo `images/projects/` me daalo, phir `image:` aur `gallery:` me path update karo
- `project-detail` page pe jo "?v=12" jaise cache-buster hai uso **badalna** (e.g. `?v=13`) — warna purana photo cache me atka dikhega

### Contact details
- Phone/adresa/email `data.js` me `VIHAAN` object ke top pe hain

### Blog post
- `blogs:` array me nayi entry add karo (title, image, cat, date, read, excerpt)

## 4. Form / Leads (Google Sheets)

Form submit karne pe leads WhatsApp + Google Sheet dono me milte hain.
Setup aur test: `FORM-SETUP.md` padho.
Har new-row Sheet me "Date, Form, Page, Name, Phone, Email, Interested In, Message" aa jaate hain.

## 5. Push / Deploy (agar khud karna ho)

```bash
git add -A
git commit -m "content update"
git push origin main
```

Push ke baad 1 minute me live ho jata hai. Agar changes dikh na rahe hain to
**hard refresh** (Ctrl+Shift+R) — browser purana version cache karta hai.

## 6. Scope / Limitations (client ko batana)

- Ye ek **marketing/brochure website** hai — abhi blog ke "Continue Reading" contact page
  pe lead deta hai, blog artikel pages abhi nahi hain
- **Custom domain** abhi nahi laga (github.io pe hai). Domain kharide to
  https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site follow karo
- RERA / disclaimers: sab pages ke footer me disclaimer hain
- Koi maintenance contract is document ka hissa nahi hai

## 7. Troubleshooting

| Problem | Fix |
|---|---|
| Page 404 | URL me `suryavashi-property-hub` hoon ya purana `vihaan-group`? Sirf naya use karo |
| Photo purani dikh rahi | cache-buster `?v=X` badalo |
| Form se Sheet me row nahi | `formEndpoint` URL check karo, Apps Script deploy "Anyone" access hai kya |
| Layout toot gaya | `css/style.css` ka koi `.container`, `.proj-card` waghera selectors match karo |