# الصور المولّدة بالذكاء الاصطناعي — روابط التنزيل

وُلّدت الصور التالية خصيصاً لهذه المنصة (هوية إماراتية، احتشام، بلا أي نص داخل الصورة،
وتدرّج لوني متناسق: رملي، كحلي، ذهبي).

**تعذّر حفظها تلقائياً داخل المستودع** لأن سياسة الشبكة في بيئة التشغيل تحجب نطاق
التنزيل `d8j0ntlcm91z4.cloudfront.net`. التثبيت يدوي ولا يتطلب أي تعديل في الكود:

| # | الوجهة داخل المشروع | المقاس | الرابط |
|---|---|---|---|
| 1 | `public/assets/images/fujairah/hero-main.jpg` | 2752×1536 | [تنزيل](https://d8j0ntlcm91z4.cloudfront.net/user_3Eru39zWyKZthPhLibiDzPyFuLs/hf_20260929_151826_4ad6c812-cffd-4b4e-a6fb-67140025c034.png) |
| 2 | `public/assets/images/students/students-school.jpg` | 1376×768 | [تنزيل](https://d8j0ntlcm91z4.cloudfront.net/user_3Eru39zWyKZthPhLibiDzPyFuLs/hf_20260929_152006_e2cb5c7a-3f9a-41b0-ac17-0a71e9ddf3ac.png) |
| 3 | `public/assets/images/beneficiaries/adults-city.jpg` | 1376×768 | [تنزيل](https://d8j0ntlcm91z4.cloudfront.net/user_3Eru39zWyKZthPhLibiDzPyFuLs/hf_20260929_152007_19b1f9b2-2938-48ed-839d-3f4990ee3d8c.png) |
| 4 | `public/assets/images/beneficiaries/training-workshop.jpg` | 1200×896 | [تنزيل](https://d8j0ntlcm91z4.cloudfront.net/user_3Eru39zWyKZthPhLibiDzPyFuLs/hf_20260929_152006_8e47f3b6-4f87-480b-81ae-78df47f848a4.png) |
| 5 | `public/assets/images/beneficiaries/advisor-session.jpg` | 1200×896 | [تنزيل](https://d8j0ntlcm91z4.cloudfront.net/user_3Eru39zWyKZthPhLibiDzPyFuLs/hf_20260929_152006_b9b4a166-5abe-4b4f-b31d-5fb367121a78.png) |

## خطوات التثبيت

1. نزّل كل صورة من الرابط المقابل.
2. حوّلها إلى `.jpg` (أو احفظها كما هي بامتداد `.png` — كلاهما مدعوم).
3. ضعها في المسار المذكور بالاسم نفسه.
4. أعد تحميل الصفحة — تظهر الصور تلقائياً وتختفي علامة «صورة مؤقتة».

> `classroom.jpg` في مجلد `students/` يعود تلقائياً إلى `students-school.jpg` إن لم يُرفع،
> و`advisor-session.jpg` يعود إلى `training-workshop.jpg`. لا حاجة لرفع كل ملف.

## أين تُستخدم كل صورة

| الصورة | مواضع الاستخدام |
|---|---|
| `hero-main` | خلفية الواجهة الرئيسية في الصفحة الرئيسية |
| `students-school` | بطاقة «المرحلة الأولى» + صفحات المسارات المدرسية الأربعة |
| `adults-city` | بطاقة «المرحلة الثانية» |
| `training-workshop` | صفحات مسارات المرحلة الثانية الستة |
| `advisor-session` | قسم «احجز موعداً مع مستشار مالي» في الرئيسية + صفحة `/advisor` |
