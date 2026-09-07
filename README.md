# Tezda Sotdim — sayt

Next.js 14 (App Router) + Tailwind CSS. Vercel'ga joylash uchun mo'ljallangan.

## Mahalliy ishga tushirish

```bash
npm install
cp .env.example .env.local
# .env.local ichida API_BASE_URL ni serveringiz manziliga o'zgartiring
npm run dev
```

## Vercel'ga joylash

1. Bu loyihani GitHub'ga yuklang (yangi repository yarating, kodni push qiling)
2. https://vercel.com ga kirib, GitHub akkauntingiz bilan ro'yxatdan o'ting
3. "Add New Project" → GitHub repositoryingizni tanlang → "Import"
4. "Environment Variables" bo'limida qo'shing:
   - `API_BASE_URL` = `http://SIZNING_SERVER_IP` (masalan `http://157.173.98.41`)
5. "Deploy" tugmasini bosing — bir necha daqiqada sayt tayyor bo'ladi
6. Sayt manzili: `https://loyiha-nomi.vercel.app`

## Keyinchalik haqiqiy domen ulash

Vercel loyihasida Settings → Domains → domeningizni kiriting va DNS sozlamalarini
domen provayderingizda (masalan Cloudflare) ko'rsatilganidek sozlang.
