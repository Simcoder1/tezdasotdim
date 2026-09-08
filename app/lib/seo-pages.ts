export type SeoPage = {
  slug: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  benefits: string[];
  checks: string[];
};

export const SEO_PAGES: SeoPage[] = [
  {
    slug: "sotib-olish",
    title: "Tayyor Telegram bot sotib olish",
    description: "O‘zbekistonda tayyor Telegram bot sotib oling. Biznes vazifangizga mos botni toping, e’lonni ko‘ring va tezroq ishga tushiring.",
    heading: "Tayyor Telegram bot sotib olish",
    intro: "Botni noldan yasatib kutish o‘rniga, sotuvdagi tayyor variantlarni vazifangiz bo‘yicha ko‘ring. Saytdagi aqlli tanlovchi mos e’lonlarni ajratadi va sizni original Telegram e’loniga olib boradi.",
    benefits: ["Tayyor variantlarni bir joyda solishtirish", "Biznes vazifasiga qarab bot tanlash", "Original Telegram e’loniga bevosita o‘tish"],
    checks: ["Botning funksiyalari va demo nusxasi", "Manba kodi va egalik huquqi", "Hosting, domen va texnik yordam shartlari"],
  },
  {
    slug: "biznes-uchun",
    title: "Biznes uchun tayyor Telegram bot",
    description: "Savdo, buyurtma, mijozlar va to‘lov jarayonlarini avtomatlashtirish uchun biznesga mos tayyor Telegram botlarni toping.",
    heading: "Biznes uchun tayyor Telegram bot",
    intro: "Telegram bot buyurtmalarni qabul qilish, mijozlarga javob berish, katalog ko‘rsatish va takroriy ishlarni kamaytirishga yordam beradi. Tayyor loyiha orqali ishni tezroq boshlash mumkin.",
    benefits: ["Mijozlarga 24/7 xizmat ko‘rsatish", "Buyurtmalarni tartibli qabul qilish", "Operatorlarning takroriy ishini kamaytirish"],
    checks: ["Admin panel boshqaruvi", "Kerakli til va to‘lov tizimlari", "Foydalanuvchi bazasini topshirish tartibi"],
  },
  {
    slug: "buyurtma-qabul-qilish",
    title: "Buyurtma qabul qiluvchi Telegram bot",
    description: "Do‘kon, kafe va xizmatlar uchun buyurtma qabul qiluvchi tayyor Telegram botlarni toping va e’lonlarini ko‘ring.",
    heading: "Buyurtma qabul qiluvchi Telegram bot",
    intro: "Mijoz mahsulot yoki xizmatni tanlaydi, ma’lumotlarini qoldiradi va buyurtma mas’ul xodimga yetib boradi. Sizga mos tayyor botni tanlab, uzoq ishlab chiqish jarayonisiz boshlang.",
    benefits: ["Katalog va buyurtma savatchasi", "Operatorga tezkor bildirishnoma", "Buyurtma ma’lumotlarini tartibli yig‘ish"],
    checks: ["Mahsulotlarni tahrirlash imkoniyati", "Yetkazib berish va manzil funksiyasi", "Buyurtmalar tarixi va eksporti"],
  },
  {
    slug: "online-dokon",
    title: "Onlayn do‘kon uchun Telegram bot",
    description: "Mahsulot katalogi, savatcha va buyurtmalar uchun tayyor onlayn do‘kon Telegram botlarini toping.",
    heading: "Onlayn do‘kon uchun tayyor Telegram bot",
    intro: "Telegram ichida katalog ko‘rsatadigan, mahsulot tanlatadigan va buyurtma qabul qiladigan tayyor do‘kon botlarini ko‘ring. Mos variantni topgach, to‘liq e’lon orqali sotuvchi bilan bog‘laning.",
    benefits: ["Mahsulot katalogi va kategoriyalar", "Savatcha hamda buyurtma yuborish", "Aksiya va yangi mahsulotlar haqida xabar"],
    checks: ["Mahsulot soni bo‘yicha cheklovlar", "To‘lov va yetkazib berish integratsiyasi", "Admin paneldan narxlarni yangilash"],
  },
  {
    slug: "kurs-sotish",
    title: "Kurs sotish uchun Telegram bot",
    description: "Onlayn kurs, yopiq kanal va pullik obuna uchun tayyor Telegram botlarni toping.",
    heading: "Kurs va obuna sotish uchun Telegram bot",
    intro: "Darslar, pullik kontent yoki yopiq kanalga kirishni boshqaradigan tayyor bot vaqtni tejaydi. To‘lov, obuna muddati va foydalanuvchilarni boshqarish imkoniyatlarini tekshirib tanlang.",
    benefits: ["Kurs va darslarni tartibli yetkazish", "Obuna muddatini boshqarish", "Foydalanuvchilarga avtomatik xabar yuborish"],
    checks: ["Kontent himoyasi va kirish qoidalari", "To‘lov tasdig‘i qanday ishlashi", "O‘quvchi statistikasi mavjudligi"],
  },
  {
    slug: "tolov-qabul-qilish",
    title: "To‘lov qabul qiluvchi Telegram bot",
    description: "Telegram ichida to‘lov va buyurtmalarni boshqarishga mos tayyor botlarni toping.",
    heading: "To‘lov qabul qiluvchi Telegram bot",
    intro: "Savdo yoki xizmat uchun to‘lov qabul qiladigan bot tanlashda integratsiya, xavfsizlik va to‘lov holatini tekshirish muhim. Mos tayyor variantlarni ko‘rib, e’lon egasi bilan shartlarni aniqlashtiring.",
    benefits: ["To‘lovdan keyingi avtomatik tasdiq", "Buyurtma va to‘lov holatini kuzatish", "Pullik xizmatni tez ishga tushirish"],
    checks: ["Payme, Click yoki boshqa provayder mosligi", "To‘lov ma’lumotlari xavfsizligi", "Chek va qaytarish jarayoni"],
  },
];

export function getSeoPage(slug: string) {
  return SEO_PAGES.find((page) => page.slug === slug);
}
