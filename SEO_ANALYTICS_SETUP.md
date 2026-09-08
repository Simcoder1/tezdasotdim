# SEO va analitika ulash

## 1. Domen

`.env` faylida `NEXT_PUBLIC_SITE_URL` qiymatini saytingizning haqiqiy HTTPS domeniga o‘rnating.

## 2. Google Search Console

1. Domenni Search Console’ga qo‘shing va tasdiqlang.
2. HTML meta usulidan foydalansangiz, tasdiqlash kodini `GOOGLE_SITE_VERIFICATION` ga yozing.
3. `https://domeningiz.uz/sitemap.xml` manzilini Search Console’ga yuboring.
4. Performance bo‘limida Google’dan kelgan qidiruv so‘zlari, ko‘rinishlar, bosishlar, CTR va o‘rtacha pozitsiyani kuzating.

## 3. Google Analytics 4

1. GA4 property va Web data stream yarating.
2. `G-...` Measurement ID’ni `NEXT_PUBLIC_GA_MEASUREMENT_ID` ga yozing.
3. GA4 Admin ichida `telegram_click` hodisasini Key event sifatida belgilang.
4. Realtime va DebugView orqali hodisalar kelayotganini tekshiring.

Sayt quyidagilarni o‘lchaydi:

- `goal_selected`: qaysi tayyor yo‘nalish tanlandi;
- `search`: erkin matn yoki boshqariladigan oqimdan qidiruv yuborildi;
- `recommendations_viewed`: nechta tavsiya ko‘rsatildi;
- `telegram_click`: qaysi joydan Telegram kanal yoki e’longa o‘tildi.

Maxfiylik uchun erkin yozilgan qidiruv matnining o‘zi Google Analytics’ga yuborilmaydi. Faqat qidiruv turi va matn uzunligi yuboriladi.
