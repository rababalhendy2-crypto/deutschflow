// DeutschFlow – B2 lesson 9 on an official Easy German clip (YouTube embed, never re-hosted).
// German lines follow YouTube's automatic German captions of the clip, corrected by hand. The captions of this street scene
// are heavily garbled, so only lines that could be understood with confidence are shown; the rest is marked with "…".
// The lesson uses the acted argument as a "how not to" example: each rude line comes with a polite alternative.
(function () {
  const clip = o => { o.level = "B2"; o.video.t = o.L.map(x => x.shift()); return o; };
  window.DF_LESSONS = (window.DF_LESSONS || []).concat([
clip({
  id: "b2-09", n: 9,
  topic: ["الخلاف: الوقح والمهذّب", "Streiten: unhöflich und höflich"],
  title: "Streit auf der Straße – und wie es höflich geht",
  sum: ["مشهد تمثيلي من Super Easy German: شجاران في الشارع، الأول بعد اصطدام بين شخصين، والثاني بسبب صورة. نتعلّم العبارات الوقحة لنفهمها، ومع كل واحدة البديل المهذب لنعترض بأدب.", "Gespielte Straßenszenen von Super Easy German: zwei Streits. Zu jedem unhöflichen Satz gibt es eine höfliche Alternative."],
  src: ["Easy German", "How to argue in German (Super Easy German 108)"],
  sp: { A: ["", "m"] },
  video: { yt: "MBtXt8VeRUk", start: 27, end: 215 },
  L: [
    [33, "A", "Pass mal auf, Alter! Pass mal auf, Alter!", "انتبه يا رجل! انتبه يا رجل!", "i",
      "«Alter» عامية شوارع بمعنى «يا رجل»، وهنا عدوانية. البديل المهذب في المثال.", "«Alter» = Straßenslang, hier aggressiv.",
      [["aufpassen", "ينتبه"]], ["Entschuldigung, könnten Sie bitte aufpassen?", "عفواً، هل يمكنك أن تنتبه من فضلك؟"]],
    [39, "A", "Ich entschuldige mich ja, aber Sie waren derjenige, der mich angerempelt hat.", "أنا أعتذر، لكنك أنت من صدمني.", "f",
      "اعتراض حازم لكن مهذب: يبدأ بالاعتذار ثم يوضّح موقفه بـ Sie. «derjenige, der …» = الشخص الذي…", "Höflich, aber bestimmt: erst Entschuldigung, dann Widerspruch.",
      [["anrempeln", "يصطدم بأحد"], ["derjenige, der", "الشخص الذي"]], ["Sie waren diejenige, die zuerst angefangen hat.", "أنتِ من بدأ أولاً."]],
    [44, "A", "Das heißt, Sie müssen bitte aufpassen und auch auf andere Menschen achten.", "يعني يجب عليك من فضلك أن تنتبه وتراعي الناس الآخرين.", "f",
      "«auf jemanden achten» = يراعي / ينتبه لأحد.", "«achten auf» = Rücksicht nehmen.",
      [["achten auf", "يراعي / ينتبه لـ"]], null],
    [49, "A", "Sie dürfen nicht einfach …", "لا يحق لك ببساطة أن…", "f", "", "", [], null],
    [60, "A", "Du hast auf dein Handy geguckt! – Nein, ich habe …", "كنت تنظر إلى هاتفك! – لا، أنا…", "i",
      "اتهام مباشر. بديل ألطف: «Kann es sein, dass Sie kurz aufs Handy geschaut haben?»", "Direkter Vorwurf; weicher als Frage formulieren.",
      [], ["Kann es sein, dass Sie kurz aufs Handy geschaut haben?", "هل يمكن أنك نظرت إلى هاتفك للحظة؟"]],
    [63, "A", "Du musst halt gucken, wo du hingehst.", "عليك ببساطة أن تنظر إلى أين تمشي.", "i",
      "«halt» = ببساطة (عامية). «hingehen» = يذهب إلى مكان.", "«halt» = eben (ugs.).",
      [["halt", "ببساطة (عامية)"]], ["Vielleicht passen wir beide nächstes Mal besser auf.", "ربما ننتبه كلانا أكثر في المرة القادمة."]],
    [72, "A", "Ist es nicht ein bisschen normal, wenn du … Du musst gucken, dass du dich ein bisschen normal benimmst.", "أليس من الطبيعي قليلاً أن… عليك أن تحرص على أن تتصرف بشكل طبيعي قليلاً.", "i",
      "«sich benehmen» = يتصرّف. قول «تصرّف بشكل طبيعي» لشخص غريب إهانة.", "«sich benehmen» = sich verhalten.",
      [["sich benehmen", "يتصرّف"]], null],
    [79, "A", "Einfach gucken, wo du hingehst, aufpassen, was du sagst, dann ist alles …", "فقط انظر إلى أين تمشي، وانتبه لما تقول، وعندها كل شيء (بخير)…", "i", "", "", [], null],
    [92, "A", "Verpiss dich!", "انقلع! (كلمة بذيئة)", "i",
      "كلمة بذيئة جداً: لا تستعملها أبداً. تحتاج أن تفهمها فقط. البديل المهذب في المثال.", "Sehr vulgär – nur verstehen, nie benutzen.",
      [], ["Lassen Sie mich bitte in Ruhe.", "دعني وشأني من فضلك."]],
    [94, "A", "Hast du mich gefragt, ob du ein Bild machen darfst?", "هل سألتني إن كان يحق لك أن تلتقط صورة؟", "i",
      "سؤال غير مباشر بـ «ob». بصيغة مهذبة: «Würden Sie mich bitte fragen, bevor Sie mich fotografieren?»", "Indirekte Frage mit «ob».",
      [["ein Bild machen", "يلتقط صورة"]], ["Würden Sie mich bitte fragen, bevor Sie mich fotografieren?", "هل يمكنك أن تسألني قبل أن تصوّرني؟"]],
    [106, "A", "Hast du mich gefragt, ob du ein Bild machen darfst?", "(مرة أخرى) هل سألتني إن كان يحق لك أن تلتقط صورة؟", "i", "", "", [], null],
    [111, "A", "Was? – Ich frage dich, ob du eine Erlaubnis hast, hier zu fotografieren.", "ماذا؟ – أسألك إن كان عندك إذن للتصوير هنا.", "i", "", "",
      [["die Erlaubnis", "الإذن"]], null],
    [122, "A", "Da kann ich dir gleich die Kamera konfiszieren.", "يمكنني أن أصادر كاميرتك فوراً.", "i", "", "", [["konfiszieren", "يصادر"]], null],
    [127, "A", "Bleiben wir ruhig. Bleib mal ruhig. Bleib mal ruhig.", "لنبقَ هادئين. اهدأ قليلاً. اهدأ.", "n",
      "«Bleiben wir ruhig» = لنبقَ هادئين. أفضل جملة لتهدئة أي خلاف.", "Satz zum Deeskalieren.",
      [["ruhig bleiben", "يبقى هادئاً"]], ["Bleiben wir ruhig, wir finden bestimmt eine Lösung.", "لنبقَ هادئين، سنجد حلاً بالتأكيد."]],
    [133, "A", "… ganz offensichtlich vor der Linse, und ab da musst du mich fragen.", "…كنتُ بوضوح أمام العدسة، ومن تلك اللحظة يجب أن تسألني.", "i", "", "",
      [["offensichtlich", "بوضوح / من الواضح"], ["die Linse", "العدسة"]], null],
    [139, "A", "Bist du bescheuert? Bist du bescheuert?", "هل أنت مجنون؟ هل أنت مجنون؟", "i",
      "«bescheuert» = غبي / مجنون، إهانة. البديل: «Ich glaube, da liegt ein Missverständnis vor.»", "Beleidigung; höflich: «Da liegt ein Missverständnis vor.»",
      [["bescheuert", "غبي / مجنون (إهانة)"]], ["Ich glaube, da liegt ein Missverständnis vor.", "أظن أن هناك سوء تفاهم."]],
    [147, "A", "Du bist reingelaufen! Du warst überhaupt nicht im Bild.", "أنت من دخل الصورة! لم تكن في الصورة أصلاً.", "i",
      "اعتراض مباشر جداً. بأدب: «Ich sehe das anders: …»", "Sehr direkt; höflich: «Ich sehe das anders.»",
      [["reinlaufen", "يدخل (ماشياً)"]], ["Ich sehe das anders: Sie sind ins Bild gelaufen.", "أرى الأمر بشكل مختلف: أنت من دخل الصورة."]],
    [155, "A", "Alter, was ist denn mit dir los?", "يا رجل، ما بك؟", "i",
      "«Was ist mit dir los?» = ما بك؟ قد تكون سؤالاً مهتماً أو اتهاماً، حسب النبرة.", "Je nach Ton besorgt oder vorwurfsvoll.",
      [], ["Du bist so still heute. Was ist denn mit dir los?", "أنت هادئ جداً اليوم. ما بك؟"]],
    [170, "A", "Ich will dein komisches Gesicht nicht auf meinem Bild haben! – Ja, tust du aber, weil du reingelaufen bist.", "لا أريد وجهك الغريب في صورتي! – لكنه فيها، لأنك دخلت الصورة.", "i", "", "",
      [["komisch", "غريب"]], null],
    [177, "A", "… Ich laufe immer rein. Jetzt stehe ich vor der Linse. – Ja, dann geh weg!", "…أنا دائماً أدخل. الآن أقف أمام العدسة. – إذن ابتعد!", "i", "", "", [], ["Könnten Sie bitte kurz zur Seite gehen?", "هل يمكنك أن تتنحّى قليلاً من فضلك؟"]],
    [190, "A", "Du bist ein Krimineller! Du bist ein Krimineller!", "أنت مجرم! أنت مجرم!", "i", "", "", [["der Kriminelle", "المجرم"]], null],
    [203, "A", "Bitte geh weiter. Geh mal weiter. Immer weiter.", "من فضلك تابع طريقك. هيا تابع. تابع.", "i", "", "", [["weitergehen", "يتابع طريقه"]], null]
  ],
  E: [
    ["Ich sehe das anders.", "أرى الأمر بشكل مختلف", "Ich sehe das ehrlich gesagt anders."],
    ["Da muss ich widersprechen.", "هنا يجب أن أعترض", "Da muss ich Ihnen leider widersprechen."],
    ["Bleiben wir ruhig.", "لنبقَ هادئين", "Bleiben wir ruhig, wir finden eine Lösung."],
    ["Da liegt ein Missverständnis vor.", "هناك سوء تفاهم", "Ich glaube, da liegt ein Missverständnis vor."],
    ["Könnten Sie bitte aufpassen?", "هل يمكنك أن تنتبه من فضلك؟", "Entschuldigung, könnten Sie bitte aufpassen?"],
    ["Lassen Sie mich bitte in Ruhe.", "دعني وشأني من فضلك", "Lassen Sie mich bitte in Ruhe, ich möchte nicht diskutieren."]
  ],
  Q: [
    { k: "listen", q: "Worum geht es im zweiten Streit?", o: ["Um ein Foto: Jemand ist ins Bild gelaufen.", "Um einen Parkplatz.", "Um zu laute Musik."], a: 0,
      w: ["الخلاف الثاني عن صورة: هل دخل الشخص الصورة أم لا؟", "Es geht um ein Foto."] },
    { k: "gap", q: "Sie waren ___, der mich angerempelt hat.", o: ["derjenige", "dasjenige", "diejenigen"], a: 0,
      w: ["للمذكر المفرد: derjenige, der …", "Maskulin Singular: derjenige, der …"] },
    { k: "expr", q: "Jemand rempelt Sie auf der Straße an. Was ist eine höfliche, aber klare Reaktion?", o: ["Pass mal auf, Alter!", "Entschuldigung, könnten Sie bitte aufpassen?", "Bist du bescheuert?"], a: 1,
      w: ["واضحة ومهذبة. الخياران الآخران من الشجار في المقطع.", "Klar und höflich; die anderen stammen aus dem Streit."] },
    { k: "expr", q: "Ein Kollege hat eine andere Meinung. Wie widersprechen Sie höflich?", o: ["Du spinnst doch.", "Ich sehe das ehrlich gesagt ein bisschen anders.", "Halt den Mund."], a: 1,
      w: ["«Ich sehe das anders» + «ein bisschen» يلطّف الاعتراض.", "«ein bisschen» macht den Widerspruch weicher."] },
    { k: "match", p: [["anrempeln", "يصطدم بأحد"], ["die Erlaubnis", "الإذن"], ["sich benehmen", "يتصرّف"], ["konfiszieren", "يصادر"]],
      w: ["كل الكلمات من المقطع.", "Alle Wörter stammen aus dem Clip."] },
    { k: "order", s: "Hast du mich gefragt, ob du ein Foto machen darfst?",
      w: ["في الجملة الفرعية بعد «ob» يأتي الفعل darfst في النهاية.", "Nach «ob» Verb am Ende."] },
    { k: "natural", q: "Welcher Satz beruhigt einen Streit?", o: ["Du bist ein Krimineller!", "Bleiben wir ruhig.", "Geh weg!"], a: 1,
      w: ["«Bleiben wir ruhig» = لنبقَ هادئين.", "Deeskalation."] }
  ]
})
  ]);
})();
