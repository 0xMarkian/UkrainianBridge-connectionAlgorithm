export default (personToPairEmail, videoPlatformLink, imageSrc='cid:mainImage') => `
<h2>Добрий день!</h2>
<p>Команда Ukrainian Bridge  дякує Вам за зацікавленість у проекті.<br>
У період з 7 по 11 квітня Ви матимете можливість поспілкуватися за цим посиланням: ${videoPlatformLink}</p>
 
<p>Щодо точного часу бесіди Ви зможете домовитися на пошті: ${personToPairEmail}.<br>
Просимо Вас якнайшвидше вийти на зв’язок з Вашим партнером та обрати зручний для вас час для спілкування!</p>

<p>Якщо у Вас виникли проблеми і ви не змогли вийти на звя’зок зі своїм співрозмовником, заповніть анкету:<br>
https://docs.google.com/forms/d/e/1FAIpQLSd_ps1Iig5EfEYsyVmbFzCu6-vKweaLJXRXDWk93CprJI4Xlw/viewform</p>

<p>Звертайтеся з питаннями та побажаннями до нас на пошту:
info@ycg.org.ua</p>

<p>З повагою та найкращими побажаннями, YCG, supported by OSCE Project Co-ordinator in Ukraine.</p>

<p>
  Долучайтеся до нас у соціальних мережах:<br>
  https://www.facebook.com/youth.contact.group<br>
  https://vk.com/youth.contact.group
</p>
<img src="${imageSrc}" style="width: 500px;"></img>
`
