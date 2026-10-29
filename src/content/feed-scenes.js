// DeutschFlow – whole scenes for the clip feed. Official YouTube uploads, embedded only.
// German follows the uploader's own German subtitles (spelling lightly corrected); Arabic is ours.
// Scene: { id, yt, start, end, src, title, lesson?, keys, lines: [[startSec, German, Arabic]] }
(function () {
  const all = window.DF_LESSONS || [];
  const from = id => { const l = all.find(x => x.id === id); return l ? l.L.map((x, i) => [l.video.t[i], x[1], x[2]]) : []; };
  const keysOf = id => { const l = all.find(x => x.id === id); return l ? (l.E || []).map(([d, a]) => [d, a]) : []; };

  window.DF_FEED = (window.DF_FEED || []).concat([
{
  id: "s-gags-arzt", yt: "-uRvB_0fmSI", start: 1, end: 178.5, src: ["ARD", "GAGS – Comedy Deluxe"], title: "Der Arzt googelt", lesson: "b2-26", keys: keysOf("b2-26"),
  lines: from("b2-26").concat([
    [88.1, "Nee, bei Bing gleiche Diagnose. Yahoo auch, und ChatGPT meint, es könnte auch ein Hirntumor sein oder eine Nahrungsmittelunverträglichkeit.", "لا، في Bing نفس التشخيص. وYahoo أيضاً، وChatGPT يقول إنه قد يكون ورماً في الدماغ أو عدم تحمّل لطعام ما."],
    [102.0, "Hirntumor? Gott.", "ورم في الدماغ؟ يا إلهي."],
    [107.4, "Sie haben auch Fußpilz? Ich habe da was, womit dieses Problem der Vergangenheit angehört.", "عندك أيضاً فطريات القدم؟ عندي شيء يجعل هذه المشكلة من الماضي."],
    [115.7, "Hallo?", "ألو؟"],
    [117.8, "Sind Sie privat versichert oder …?", "هل عندك تأمين خاص أم…؟"],
    [119.9, "Nee, Kasse.", "لا، تأمين صحي حكومي."],
    [121.4, "Na, dann müssen wir leider noch den Werbeclip anschauen.", "إذاً للأسف علينا أن نشاهد الإعلان أولاً."],
    [129.6, "Ist Fußpilz bei Ihnen zufällig auch ein Thema?", "هل فطريات القدم مشكلة عندك بالصدفة؟"],
    [131.6, "Gott sei Dank nicht, nein.", "الحمد لله لا."],
    [133.6, "Schlimm ist das.", "هذا شيء سيئ."],
    [134.8, "Hallo, ihr Lieben, kleiner Tipp bei Darmkrebs …", "مرحباً يا أعزائي، نصيحة صغيرة لسرطان الأمعاء…"],
    [139.4, "Ja, „Jakob Lichtkraft 85“, ich liebe diesen Typen. Ich guck den so oft. Das ist wie so ein Guru.", "نعم، «ياكوب ليشتكرافت 85»، أحب هذا الرجل. أشاهده كثيراً. إنه مثل معلّم روحي."],
    [146.8, "Sich nur noch von Sonnenlicht ernähren, das funktioniert super, wirklich, das ist so.", "أن تتغذى فقط من ضوء الشمس، هذا ينجح جداً، حقاً."],
    [154.3, "Ich kann Ihnen den Link zum Video auch schicken.", "أستطيع أن أرسل لك رابط الفيديو أيضاً."],
    [156.5, "Wir haben noch kein Internet gerade.", "ليس عندنا إنترنت الآن."],
    [160.6, "Ich verschreib Ihnen einfach einen neuen Router und eine 5G-Datenflatrate.", "سأصف لك ببساطة راوتر جديداً وباقة 5G غير محدودة."],
    [166.2, "Und dann können wir die Diagnosen wieder selber googeln, Schatz.", "وبعدها نستطيع أن نبحث عن التشخيصات بأنفسنا يا حبيبي."],
    [170.5, "Moment, 5G, das ist doch krebserregend, oder nicht?", "لحظة، 5G، أليس مسبباً للسرطان؟"],
    [176.5, "Muss ich googeln.", "يجب أن أبحث في غوغل."]
  ])
},
{
  id: "s-kroymann-lord", yt: "Jk6_jziT_yY", start: 14, end: 224, src: ["ARD", "KROYMANN"], title: "Der kleine Lord im Coaching", lesson: "b2-27",
  keys: keysOf("b2-27").concat([["Ich kündige.", "أنا أستقيل"]]),
  lines: [
    [15.2, "Sir?", "سيدي؟"],
    [29.0, "Alle Wetter, was ist los, Maurice? Sie wissen, mein Powernap ist mir heilig.", "يا للعجب، ما الأمر يا موريس؟ تعرف أن قيلولتي مقدسة عندي."],
    [33.0, "Ihr Powernap ging bereits in die fünfte Stunde, Sir. Tee?", "قيلولتك دخلت ساعتها الخامسة يا سيدي. شاي؟"],
    [37.0, "Danke. Und meine Schritte?", "شكراً. وخطواتي؟"],
    [41.1, "10.000 Schritte, wie jeden Tag, Sir.", "عشرة آلاف خطوة، كل يوم يا سيدي."]
  ].concat(from("b2-27"), [
    [86.0, "Warum, glauben Sie, ergötzen sich nach wie vor, Jahr um Jahr, so viele Millionen Menschen an diesem Kitschfilm?", "برأيك لماذا ما زال ملايين الناس يستمتعون كل سنة بهذا الفيلم المبتذل؟"],
    [93.2, "Nun ja, Sir, die Zeiten sind hart, und der kleine Lord ist so eine Art weihnachtliche Wellness für die Seele.", "حسناً يا سيدي، الأوقات صعبة، و«اللورد الصغير» نوع من الراحة النفسية في عيد الميلاد."],
    [99.2, "Das soll Wellness sein? Ein Achtjähriger, der von einem Soziopathen zum Adligen gedrillt wird, seine Mutter nur zum Teetrinken trifft und seine eigenen Bedürfnisse unterdrückt, damit die Erwachsenen glücklich sind?", "هذه راحة نفسية؟ طفل في الثامنة يدرّبه شخص معتلّ ليصبح نبيلاً، لا يرى أمه إلا لشرب الشاي، ويكبت حاجاته لكي يسعد الكبار؟"],
    [110.0, "Zumindest ist Ihre Familie nicht ohne Sie in den Urlaub geflogen und hat Sie alleine zu Hause zurückgelassen.", "على الأقل عائلتك لم تسافر في عطلة بدونك وتتركك وحدك في البيت."],
    [114.6, "Jetzt kommen Sie mir nicht schon wieder mit diesem Kevin, es geht jetzt mal um meinen Mental Load, Maurice.", "لا تبدأ مجدداً بقصة كيفن هذه، الموضوع الآن هو عبئي النفسي يا موريس."],
    [123.4, "Ich sehe Sie, Maurice.", "أنا أراك يا موريس."],
    [125.3, "Ich Sie auch, und alle Ihre Bedürfnisse.", "وأنا أراك أيضاً، وأرى كل حاجاتك."],
    [128.4, "Nein, Sie spiegeln sich in der Kanne.", "لا، صورتك تنعكس في الإبريق."],
    [130.3, "Pardon, Sir.", "عفواً يا سيدي."],
    [131.6, "Ach, Maurice, Sie haben es gut.", "آه يا موريس، أنت محظوظ."],
    [133.8, "Sie wissen ja gar nicht, wie es sich anfühlt, derart benachteiligt aufzuwachsen.", "أنت لا تعرف أبداً كيف يكون شعور أن تكبر محروماً بهذا الشكل."],
    [137.8, "Nur wenigen gelingt es, sich trotz der toxischen Fesseln der Aristokratie frei auszuleben.", "قليلون فقط ينجحون في أن يعيشوا بحرية رغم القيود السامّة للأرستقراطية."],
    [143.2, "Ach, Sie sprechen von Prinz Andrew.", "آه، تتكلم عن الأمير أندرو."],
    [144.5, "Nein, von mir selbst – also auf eine andere Art als Andrew natürlich.", "لا، عن نفسي، لكن بطريقة مختلفة عن أندرو طبعاً."],
    [152.9, "Das hier habe ich im Retreat getöpfert.", "هذه صنعتها من الفخار في الخلوة."],
    [156.4, "Wunderschön.", "رائعة الجمال."],
    [158.9, "Das ist mein inneres Kind. Kleiner Lord, du musst gar nichts beweisen. Du bist richtig so, wie du bist. Und jetzt Sie.", "هذا طفلي الداخلي. أيها اللورد الصغير، لست مضطراً لإثبات أي شيء. أنت جيد كما أنت. والآن دورك."],
    [169.5, "Kleiner Lord, du musst gar nichts beweisen. Du bist genau …", "أيها اللورد الصغير، لست مضطراً لإثبات أي شيء. أنت بالضبط…"],
    [172.9, "Falsch, Sie müssen Ich-Botschaften formulieren, aber das lernen Sie schon noch von mir.", "خطأ، يجب أن تصوغ رسائل بصيغة «أنا»، لكنك ستتعلم ذلك مني."],
    [178.0, "Wenn ich ihm das noch unter die Nase reiben könnte: Großvater, ich habe das Schloss verkauft. Es ist jetzt eine Burnout-Klinik.", "لو أستطيع أن أفرك هذا في وجهه: يا جدّي، بعت القصر. صار الآن عيادة للاحتراق النفسي."],
    [184.2, "Ich habe lebenslanges Mietrecht und komme gratis in alle Kurse, und niemand zwingt mich mehr, Lieder über hässliche goldene Slipper zu singen. Guter Deal, oder?", "عندي حق السكن مدى الحياة وأدخل كل الدورات مجاناً، ولا أحد يجبرني بعد الآن على غناء أغانٍ عن خُفّ ذهبي قبيح. صفقة جيدة، صح؟"],
    [193.9, "Toll, ja. Da wäre noch etwas, Sir. Ich kündige.", "رائع. وهناك شيء آخر يا سيدي: أنا أستقيل."],
    [199.4, "Bitte?", "عفواً؟"],
    [200.0, "Nun ja, Sie bestehen ja darauf, dass ich die Feiertage durcharbeite, und ich würde so gerne mal wieder Weihnachten mit Mutti feiern. Sie ist so traurig …", "حسناً، أنت تصرّ أن أعمل في كل الأعياد، وأنا أودّ كثيراً أن أحتفل بالميلاد مع أمي من جديد. إنها حزينة جداً…"],
    [206.4, "Und mein Weihnachten?", "وميلادي أنا؟"],
    [207.8, "Nun ja, Sie könnten sich ja Freunde suchen, mit denen Sie Weihnachten feiern. Oder mit Ihrem inneren Kind.", "حسناً، يمكنك أن تبحث عن أصدقاء تحتفل معهم بالميلاد. أو مع طفلك الداخلي."],
    [214.8, "Mein inneres Kind feiert hier gar nichts mehr! Ist doch alles Kacke hier! Alex, starte Sissi.", "طفلي الداخلي لن يحتفل بشيء هنا بعد الآن! كل شيء هنا سيئ! أليكس، شغّل «سيسي»."]
  ])
},
{
  id: "s-kurzschluss-silvester", yt: "UniPvTMWykE", start: 1.5, end: 128, src: ["ARD", "Kurzschluss hoch drei"], title: "Silvester im Aufzug",
  keys: [["feststecken", "يعلق"], ["Apropos …", "بالحديث عن…"], ["Hinterher ist man immer schlauer.", "بعد فوات الأوان يصبح الإنسان أذكى"], ["Ist das dein Ernst?", "هل أنت جاد؟"]],
  lines: [
    [2.1, "Die Karte steckt fest.", "البطاقة عالقة."],
    [4.9, "Die Tür auch.", "والباب أيضاً."],
    [6.0, "Echt jetzt?", "بجد؟"],
    [6.7, "Ich muss hier raus. Ich muss zu meiner Tochter.", "يجب أن أخرج من هنا. يجب أن أذهب إلى ابنتي."],
    [8.1, "Hallo? Ist da jemand?", "ألو؟ هل هناك أحد؟"],
    [9.3, "Drei!", "ثلاثة!"],
    [10.3, "Geh weg da! Scheißdreck!", "ابتعد من هناك! يا للقرف!"],
    [14.2, "Ein Mitschüler von mir wollte mal mit einem Böller den Mülleimer an der Bushaltestelle sprengen. Von da an hieß er bei uns nur noch Doofmann.", "زميل لي في المدرسة أراد مرة أن يفجّر سلة القمامة عند موقف الباص بمفرقعة. ومن يومها صرنا نسميه «دوفمان» (الأحمق)."],
    [21.1, "Martin Hofmann. – Ja.", "مارتن هوفمان. – نعم."],
    [24.8, "Nein? Oh.", "لا؟ أوه."],
    [25.9, "Apropos Schicksal: Alte Tradition von mir – an Silvester verteile ich Glückskekse.", "بالحديث عن القدر: عادة قديمة عندي، في ليلة رأس السنة أوزّع كعك الحظ."],
    [31.3, "„Wenn sich eine Tür schließt, öffnet sich eine neue.“", "«عندما يُغلق باب، يُفتح باب جديد.»"],
    [38.4, "Nicht erschrecken! Sorry.", "لا تفزعي! آسف."],
    [40.9, "Martin … – Wer ist er denn?", "مارتن… – من هذا؟"],
    [42.9, "Was machst du hier?", "ماذا تفعل هنا؟"],
    [44.0, "Ich habe gedacht, vielleicht treffe ich dich hier. Also ehrlich gesagt habe ich das sogar gehofft.", "فكرت أنني ربما ألتقيك هنا. وبصراحة، كنت أتمنى ذلك."],
    [47.5, "Ich gehe jetzt zu Peter und sage ihm, dass er der blöden Kuh und ihrem Heini nichts ausschenken soll.", "سأذهب الآن إلى بيتر وأقول له ألا يقدّم شيئاً لتلك الغبية وصاحبها."],
    [51.9, "Hat er dich gerade blöde Kuh genannt?", "هل سمّاك للتو «بقرة غبية»؟"],
    [53.4, "Oh Shit! – Olli!", "يا للمصيبة! – أولي!"],
    [54.8, "Wir müssen hier weg. – Der war voll aggressiv.", "يجب أن نخرج من هنا. – كان عدوانياً جداً."],
    [57.8, "Machen Sie die Tür auf, Bettina. Wir brauchen unser Feuerwerk.", "افتحي الباب يا بيتينا. نحتاج ألعابنا النارية."],
    [61.2, "Das ist das Feuerwerk von diesem Jahr?", "هذه ألعاب هذه السنة النارية؟"],
    [63.2, "Die Tür, Bettina. – Wird es bald?!", "الباب يا بيتينا. – هل ستفتحين أم لا؟!"],
    [66.9, "Jetzt sitzen wir hier wieder. Scheint eine Silvestertradition zu werden. Apropos Tradition.", "ها نحن عالقون هنا مجدداً. يبدو أنها ستصبح عادة رأس السنة. وبالحديث عن العادات…"],
    [74.0, "„Hinterher ist man immer schlauer.“", "«بعد فوات الأوان يصبح الإنسان دائماً أذكى.»"],
    [76.2, "Was ist mit deiner Tochter? Kann die nicht kommen?", "وماذا عن ابنتك؟ ألا تستطيع أن تأتي؟"],
    [78.7, "Was soll die machen?", "وماذا ستفعل؟"],
    [80.6, "Bereit? – Nein.", "جاهزة؟ – لا."],
    [81.8, "Drei, zwei, eins.", "ثلاثة، اثنان، واحد."],
    [92.5, "Der ruckelt manchmal und bleibt dann stecken.", "هو يهتز أحياناً ثم يعلق."],
    [96.8, "Ist das dein Ernst? Nach allem, was wir durchgemacht haben?", "هل أنت جاد؟ بعد كل ما مررنا به؟"],
    [100.5, "Noch fährt er ja.", "ما زال يتحرك على الأقل."],
    [104.9, "Brauchst du eine Haarnadel? Es meldet sich nie einer.", "هل تحتاجين دبوس شعر؟ لا أحد يرد أبداً."],
    [109.3, "Ja? Hallo?", "نعم؟ ألو؟"],
    [111.0, "Hallo, wir stecken hier fest im Aufzug. Wir fahren wieder. Wir fahren wieder.", "ألو، نحن عالقون في المصعد. عاد يتحرك. عاد يتحرك."],
    [118.4, "Das ist die Dachterrasse? – Ja, genau.", "هذه هي شرفة السطح؟ – نعم، بالضبط."],
    [122.7, "Ist dann eher ein Dach. – Im Sommer ist es hier ganz schön.", "إذاً هي سطح بالأحرى. – في الصيف المكان جميل جداً."],
    [125.8, "Aber runter nehmen wir die Treppe.", "لكن للنزول سنأخذ الدرج."]
  ]
},
{
  id: "s-kranitz", yt: "fy2pPJu668M", start: 1.5, end: 111, src: ["ARD", "Kranitz"], title: "Der Schläger mit Liebeskummer",
  keys: [["etwas versauen", "يُفسد شيئاً (عامية)"], ["Kinderspiel!", "لعبة أطفال / سهل جداً"], ["der Liebeskummer", "حسرة الحب"], ["Moin!", "مرحباً (شمال ألمانيا)"]],
  lines: [
    [2.0, "Sag mal, das kann jetzt wohl nicht wahr sein, Mann. Wie oft habe ich dir das schon gesagt? Du steigst jetzt wieder ein, du fährst mit der Kiste zurück.", "قل لي، هذا لا يُصدَّق يا رجل. كم مرة قلت لك؟ اركب الآن من جديد وارجع بهذه السيارة."],
    [8.0, "Hast du neue Schuhe?", "هل عندك حذاء جديد؟"],
    [9.4, "Moin. – Moin. – Du musst mir helfen!", "مرحباً. – مرحباً. – يجب أن تساعدني!"],
    [13.0, "Ich hab zwei Jobs schon versaut.", "أفسدتُ مهمّتين حتى الآن."],
    [15.9, "Du kennst doch das Blue Bangkok. – Blue Bangkok? – Bramfelder Chaussee, Holtkamp, die Ecke. – Jaja! – War ja Rudis Laden immer gewesen.", "تعرف «بلو بانكوك»، صح؟ – بلو بانكوك؟ – شارع برامفلدر، عند زاوية هولتكامب. – نعم نعم! – كان دائماً محل رودي."],
    [23.8, "Ja, genau. So, dann sollte ich rein gehen und dem Koch die Finger brechen. Hab ich schon ein paar Mal gemacht. – Ist ja ein Standard, klar.", "بالضبط. فكان عليّ أن أدخل وأكسر أصابع الطباخ. فعلتها عدة مرات من قبل. – عمل روتيني، طبعاً."],
    [29.3, "Ja, dann komm ich da rein: Sitzt die ganze Familie da am Tisch, und die haben gefragt, ob ich schon gegessen hätte.", "فدخلت: العائلة كلها جالسة على الطاولة، وسألوني إن كنت قد أكلت."],
    [34.0, "Ja, und dann bist du mit ihm raus, seinen Finger gebrochen. – Ne, ich hatte noch nicht gegessen.", "ثم أخرجته وكسرت إصبعه. – لا، لم أكن قد أكلت بعد."],
    [37.0, "Ja. Und dann hast du ihm die Finger gebrochen. – Nein. Hab ich nicht gemacht. – Wieso denn nicht?", "طيب، ثم كسرت أصابعه. – لا. لم أفعل. – ولماذا لا؟"],
    [40.5, "Weil die gesagt haben, wenn ich ihm die Finger breche, kann der nicht mehr kochen, und dann verdienen sie noch weniger Geld.", "لأنهم قالوا إنني إذا كسرت أصابعه فلن يستطيع الطبخ، وعندها سيكسبون مالاً أقل."],
    [44.6, "Ist doch nicht dein Problem, ob er … – Ich weiß nicht, was los ist!", "هذه ليست مشكلتك إن كان… – لا أعرف ما الذي يحدث لي!"],
    [47.3, "Und dann letzten Donnerstag, ne. Hatte ich die zwei in Nienstedten, im Bungalow. Das war total easy. Ich sollte nur reingehen, ins Kinderzimmer,", "ثم الخميس الماضي، صح. كان عندي هذان الاثنان في نينشتيدن، في البنغالو. كان الأمر سهلاً جداً. كان عليّ فقط أن أدخل غرفة الأطفال،"],
    [54.9, "da ist ein Meerschweinchen im Käfig. Ich sollte das Meerschweinchen wegmachen und einen Zettel hinlegen:", "هناك خنزير غينيا في قفص. كان عليّ أن أتخلص منه وأترك ورقة:"],
    [60.0, "„Heute das Meerschweinchen und morgen seid ihr dran!“ – Ja, schön, ist ein Klassiker. – Schlüssel lag draußen unter der Matte, ich musste nicht mal einbrechen.", "«اليوم خنزير الغينيا وغداً دوركم!» – جميل، كلاسيكية. – المفتاح كان تحت الدواسة في الخارج، لم أضطر حتى للاقتحام."],
    [66.8, "Mein Gott! – Kinderspiel! – Ja, klar. – Aber ich konnte das nicht! Ich hatte das Meerschweinchen schon in der Hand.", "يا إلهي! – لعبة أطفال! – طبعاً. – لكنني لم أستطع! كان خنزير الغينيا في يدي."],
    [71.9, "Und dann hab ich am Ende einfach nur frisches Wasser in die Schale reingemacht, und dann bin ich raus.", "وفي النهاية وضعت فقط ماءً نظيفاً في الصحن وخرجت."],
    [76.7, "Auf dem Zettel hatte ich das „heute“ durchgestrichen und hab geschrieben: „Bald das Meerschweinchen und dann ihr!“", "وعلى الورقة شطبت كلمة «اليوم» وكتبت: «قريباً خنزير الغينيا ثم أنتم!»"],
    [83.0, "Schwierig … – Klaus, was ist denn los mit mir? Was hab ich denn? Ich hab doch was!", "صعب… – كلاوس، ما الذي يحدث لي؟ ما بي؟ أكيد بي شيء!"],
    [86.5, "Weißt du noch meine letzte Diagnose? – Ja. – Verliebt. – Ja. – So. Weißt du, was meine jetzige Diagnose ist? – Ne. – Liebeskummer.", "أتذكر تشخيصي الأخير؟ – نعم. – واقع في الحب. – نعم. – طيب. أتعرف ما تشخيصي الآن؟ – لا. – حسرة الحب."],
    [96.5, "Ach Scheiße … – Ja.", "يا للأسف… – نعم."],
    [98.8, "Du musst doch nicht gleich wieder ins Körperliche gehen bei den alten Männern. – Aber das wäre doch die Gelegenheit.", "لا داعي أن تلجأ للعنف فوراً مع العجائز. – لكنها ستكون فرصة."],
    [104.5, "Bringst du mir noch einmal mit, bitte? Salami und Zwiebeln. Over! – Ich brauch mal die Nummer von deinem Chef. – Ne!", "هل تحضر لي واحدة أخرى من فضلك؟ سلامي وبصل. حوّل! – أحتاج رقم مديرك. – لا!"]
  ]
},
{
  id: "s-soerensen-neu", yt: "AEiJkwMeco4", start: 11, end: 207.5, src: ["ARD", "Sörensen hat Angst"], title: "Neu im Dorf", lesson: "b2-21", keys: keysOf("b2-21").concat(keysOf("b2-22")),
  lines: [
    [11.8, "Ich bin übrigens Ole.", "بالمناسبة، أنا أوله."],
    [14.8, "Sörensen … aber ich hab jetzt kein Bock, die ganze Zeit zu quatschen.", "سورنسن… لكن ليس لدي مزاج أن أثرثر طوال الوقت."],
    [23.7, "War ein gutes Gespräch, Sörensen. – Ja, fand ich auch.", "كانت محادثة جيدة يا سورنسن. – نعم، وأنا أيضاً."],
    [26.8, "Und Sie ganz alleine hier? Ohne Frau? Ich bin ja getrennt. – Weiß ich jetzt gar nicht …", "وأنت وحدك هنا؟ بدون زوجة؟ أنا منفصل. – لا أعرف بالضبط…"],
    [33.3, "Oder Mann? Ohne Mann hier? – Ne, ohne Frau bin ich hier.", "أو زوج؟ بدون زوج هنا؟ – لا، أنا هنا بدون زوجة."],
    [37.3, "Kann ja jeder halten, wie er will. Kann ja jeder ohne Mann oder ohne Frau irgendwo alleine sein heutzutage. – Ich muss jetzt wirklich mal los.", "كل واحد حرّ كما يريد. في هذه الأيام يستطيع أي أحد أن يكون وحده بدون زوج أو زوجة. – يجب أن أذهب الآن فعلاً."],
    [44.1, "Dann mal guten Einzug. – Jo, danke.", "إذاً انتقالاً موفقاً. – نعم، شكراً."]
  ].concat(from("b2-21"), [
    [98.6, "Das ja 'n Ding.", "يا لها من قصة."],
    [99.6, "Was denn?", "ماذا هناك؟"],
    [101.0, "Kuchen ist nicht.", "لا كعكة اليوم."],
    [102.8, "Der Henry ist jetzt tot in seinem Stall.", "هنري (الأرنب) مات الآن في حظيرته."],
    [106.9, "Na, wie geht's? Ich mein … geht's irgendwie? Ah, ist auch 'ne scheiß Frage, ne.", "كيف حالك؟ أقصد… هل الأمور ماشية؟ آه، سؤال سيئ، صح."],
    [117.8, "Ach, ist manchmal aber auch schwer, das Richtige zu sagen, oder?", "لكن أحياناً من الصعب أن تقول الشيء الصحيح، صح؟"],
    [122.2, "Sie wissen selber, dass Sie gerade Quatsch reden, Herr Sörensen.", "أنت تعرف بنفسك أنك تقول كلاماً فارغاً الآن يا سيد سورنسن."],
    [124.2, "Ja, natürlich red ich Quatsch, das mach ich meistens, wenn ich wütend bin.", "طبعاً أقول كلاماً فارغاً، هذا ما أفعله غالباً عندما أكون غاضباً."],
    [126.6, "Ich merk das dann auch selber, aber immer erst am nächsten Tag. In dem Moment, wo ich das sage, kann ich das nicht stoppen, verstehen Sie das?", "ألاحظ ذلك بنفسي، لكن دائماً في اليوم التالي. في اللحظة التي أقوله فيها لا أستطيع أن أوقفه، أتفهم ذلك؟"],
    [132.6, "Jaa. Ich verstehe das.", "نعم. أفهم ذلك."]
  ], from("b2-22"))
},
{
  id: "s-soerensen-floskeln", yt: "JaXf1ahcRa0", start: 0, end: 158, src: ["ARD", "Sörensen fängt Feuer"], title: "Floskeln, Tofu und ein leises Meer", lesson: "b2-24", keys: keysOf("b2-24"),
  lines: from("b2-24").concat([
    [58.6, "Sörensen, wieder Bratkartoffeln?", "سورنسن، بطاطا مقلية مجدداً؟"],
    [62.7, "Ja, du hast ja sonst nichts. – Ich hab Tofu gekauft für dich. – Hör auf. Für mich?", "نعم، فليس عندك غيرها. – اشتريت لك توفو. – لا تمزح. لي أنا؟"],
    [67.5, "Für dich. Weil dich hier keiner leiden kann. Ich kann dich leiden, deshalb habe ich Tofu gekauft. Kann ich was draus machen, zum Beispiel Tofu. – Mensch.", "لك أنت. لأن لا أحد هنا يحبك. أنا أحبك، لذلك اشتريت التوفو. أستطيع أن أصنع منه شيئاً، مثلاً… توفو. – يا رجل."],
    [80.0, "Du bist doch der Teufel. Du säst Zweifel. – Ich säe gar nichts. Und keine Hörner habe ich, keinen großen Mund und keine langen Finger. Ich habe eher kurze. – Ziemlich kurze. – Jetzt mal nicht übertreiben, ne. – Winzig und wurstig.", "أنت الشيطان بعينه. تزرع الشك. – لا أزرع شيئاً. وليس عندي قرون، ولا فم كبير، ولا أصابع طويلة. أصابعي قصيرة بالأحرى. – قصيرة جداً. – لا تبالغ الآن. – صغيرة ومنتفخة كالنقانق."],
    [100.5, "Was ist das hier? – Deich ist das. Der schützt uns vor dem Meer.", "ما هذا؟ – هذا سدّ. يحمينا من البحر."],
    [108.0, "Was heißt jetzt „das Meer“? – Ja, klar. – Ich hör gar nichts. – Ist ein sehr leises Meer.", "ماذا تقصد بـ«البحر»؟ – طبعاً. – لا أسمع شيئاً. – إنه بحر هادئ جداً."],
    [118.5, "Im Ernst, Sörensen, Soja ist nicht gesund. Dein Körper verändert sich.", "بجدّ يا سورنسن، الصويا ليست صحية. جسمك يتغير."],
    [124.5, "Also ich habe noch nie jemanden gesehen, wo ich gedacht hätte: „Ach du Scheiße, zu viel Soja.“ Bei Bier zum Beispiel ist das was anderes, aber da regt sich ja auch keiner auf.", "أنا لم أرَ أبداً أحداً وقلت: «يا للهول، صويا أكثر من اللازم». مع البيرة مثلاً الأمر مختلف، لكن لا أحد ينزعج من ذلك."],
    [133.0, "Ich verstehe einfach nicht, dass die Leute nicht miteinander reden. Man hätte sich doch alles sparen können, aber alle haben einfach Angst, miteinander zu reden. Also gibt's Missverständnisse und Lügen und noch mehr Angst, und am Ende steht man alleine da.", "لا أفهم ببساطة لماذا لا يتكلم الناس مع بعضهم. كان يمكن تجنّب كل شيء، لكن الجميع يخاف أن يتكلم مع الآخر. فتحدث سوء تفاهمات وأكاذيب ومزيد من الخوف، وفي النهاية يبقى الإنسان وحيداً."],
    [145.0, "Nee! – Nee? – Ich finde, die Menschen sollten einfach viel weniger miteinander reden, dann passiert auch nichts. Kein Kontakt, kein Streit, kein Tod, alle glücklich.", "لا! – لا؟ – أنا أرى أن على الناس أن يتكلموا مع بعضهم أقل بكثير، وعندها لا يحدث شيء. لا تواصل، لا خلاف، لا موت، والجميع سعداء."]
  ])
},
{
  id: "s-soerensen-angst", yt: "71LsxVgLzjg", start: 4, end: 174, src: ["ARD", "Sörensen hat Angst"], title: "Angst und Bratkartoffeln", lesson: "b2-23", keys: keysOf("b2-23").concat(keysOf("b2-30")),
  lines: from("b2-30").concat(from("b2-23"), [
    [137.3, "Wenn du ganz viel Glück hast, dann kommt irgendwann mal einer und sagt:", "إذا كنت محظوظاً جداً، يأتي أحدهم في وقت ما ويقول:"],
    [139.6, "„Wissen Sie was, das ist nicht der Körper, das ist die Psyche, und deshalb ist das der Körper. Sie haben Angst.“", "«أتعرف؟ المشكلة ليست الجسد، إنها النفس، ولهذا يتأثر الجسد. عندك قلق.»"],
    [144.4, "Ja, und dann stehst du da. – Deswegen wolltest du nach Gartenbühl.", "وعندها تقف هناك مذهولاً. – لهذا أردت المجيء إلى غارتنبول."],
    [147.8, "Zwei Jahre war ich jetzt krank. Zwei Jahre.", "كنت مريضاً سنتين. سنتين."],
    [153.0, "Meine Frau ist ausgezogen mit meiner Tochter. Lotta heißt die.", "زوجتي خرجت من البيت مع ابنتي. اسمها لوتا."],
    [159.2, "Die ist jetzt sechs.", "عمرها الآن ست سنوات."],
    [161.2, "Ja, und ich hab gedacht, ich muss ja mal irgendwann mit irgendwas anfangen,", "وفكرت أنه يجب أن أبدأ بشيء ما في وقت ما،"],
    [164.6, "und dann komm ich hierhin, und nach zwei Minuten ist der Hinrichs tot. Das ist ja nicht normal.", "ثم آتي إلى هنا، وبعد دقيقتين يموت هينريكس. هذا ليس طبيعياً."],
    [167.8, "Normal? Was ist denn normal? Nichts ist normal.", "طبيعي؟ ما هو الطبيعي؟ لا شيء طبيعي."],
    [170.2, "So, hier, Bratkartoffeln. – Die sind ja mit Speck. – Schmeckt doch sonst nicht!", "تفضلوا، البطاطا المقلية. – لكنها مع لحم مقدد! – بدونه لا طعم لها!"]
  ])
}
  ]);
})();
