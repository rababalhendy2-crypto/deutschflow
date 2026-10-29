/* DeutschFlow – app logic. Plain JS, no build step, so the same file runs in a Claude artifact and in a Capacitor WebView. */
(() => {
"use strict";

/* ================= content ================= */
const LESSONS = (window.DF_LESSONS || []).slice().sort((a, b) => a.n - b.n);
const LMAP = Object.fromEntries(LESSONS.map(l => [l.id, l]));
const BASE_IDS = new Set(LESSONS.map(l => l.id));
const CUSTOM = [];
const GOAL_LESSONS = { daily: [1, 8, 11, 12, 15, 16, 17, 22, 26, 29, 30], work: [2, 3, 4, 9, 10, 14, 18, 19, 21, 23, 27, 28], exam: [5, 6, 7, 8, 13, 14, 19, 20, 24, 25, 28] };
const DAILY_GOAL_MIN = 15;

/* ================= i18n ================= */
const STR = {
  ar: {
    nav_feed: "مقاطع", feed_key: "تعبير اليوم في هذا المقطع", feed_again: "مرة ثانية", feed_practice: "تدرّب", feed_full: "افتح الدرس كاملاً", feed_ex: "التمارين", feed_end: "شاهدت كل المقاطع! تابع بالدروس الكاملة.", feed_auto: "النص مأخوذ من ترجمة يوتيوب التلقائية وصُحّح يدوياً، قد يختلف قليلاً عن الكلام.", feed_auto_short: "· نص تلقائي", nav_home: "الرئيسية", nav_lessons: "الدروس", nav_vocab: "المفردات", nav_stats: "التقدم", nav_profile: "الحساب",
    loading: "جارٍ تحميل حسابك…",
    sync_ok: "محفوظ", sync_pending: "جارٍ الحفظ…", sync_retry: "الاتصال ضعيف، سنحاول مجدداً", sync_error: "تعذّر الحفظ", sync_denied: "لا تملك صلاحية الحفظ هنا", sync_quota: "مساحة الحفظ ممتلئة", sync_local: "محفوظ على هذا الجهاز فقط", retry: "أعد المحاولة",
    gate_title: "سجّل الدخول لحفظ تقدمك",
    gate_body: "DeutschFlow يحفظ دروسك ومفرداتك في حسابك على Claude، بشكل خاص لا يراه أحد غيرك. افتح هذه الصفحة وأنت مسجّل الدخول إلى claude.ai.",
    gate_local: "جرّب بدون حساب (الحفظ على هذا الجهاز فقط)",
    onb_title: "أهلاً في DeutschFlow", onb_sub: "ثلاثة اختيارات سريعة لنضبط التطبيق لك. يمكنك تغييرها لاحقاً من صفحة الحساب.",
    ui_lang: "لغة الواجهة", expl_lang: "لغة الشرح", goal: "هدفك من التعلم", start: "ابدأ",
    g_daily: "الحياة اليومية", g_work: "العمل", g_exam: "التحضير للامتحانات",
    lang_ar: "العربية", lang_de: "الألمانية",
    level_now: "مستواك الحالي", continue: "تابع التعلم", start_first: "ابدأ الدرس الأول",
    last_opened: "آخر درس فتحته", lessons_done: "دروس مكتملة", saved_vocab: "مفردات محفوظة", due_today: "مراجعات اليوم", streak: "أيام متتالية",
    today_goal: "هدف اليوم", minutes: "دقيقة", min_short: "د", last7: "آخر 7 أيام", for_goal: "مقترح لهدفك",
    review_now: "راجع الآن", nothing_due: "لا مراجعات مستحقة",
    all: "الكل", open_l: "غير مكتملة", done_l: "مكتملة", new_l: "جديد", opened_l: "بدأته", completed: "مكتمل", best: "أفضل نتيجة",
    lessons_title: "دروس B2", lessons_sub: "20 درساً أصلياً و10 دروس بمشاهد حقيقية من التلفزيون الألماني. كل درس: حوار، شرح لكل جملة، وتمارين.", real_scenes: "مشاهد حقيقية من التلفزيون الألماني", real_scenes_sub: "مقاطع رسمية من قنوات ARD على يوتيوب، مع نص ألماني وترجمة عربية وتمارين.",
    c1_note: "دروس C1 قيد الإعداد وستُضاف لاحقاً. لا يوجد محتوى لـ A1–B1 لأن التطبيق يبدأ من B2.",
    tab_dialog: "الحوار", tab_ex: "التمارين", tab_expr: "تعبيرات الدرس",
    demo_audio: "صوت مولَّد بقارئ الكلام في جهازك، وليس تسجيلاً بشرياً",
    show_de: "النص الألماني", show_ar: "الترجمة العربية", speed: "السرعة",
    play: "تشغيل", pause: "إيقاف", prev: "السابقة", next: "التالية", repeat: "أعد الجملة",
    tap_line: "اضغط على أي جملة لشرحها وحفظها والتدرّب على نطقها.",
    hidden_de: "النص مخفي، استمع وحاول أن تفهم",
    no_voice: "لم نجد صوتاً ألمانياً على جهازك، فقد يكون النطق غير دقيق. أضف صوتاً ألمانياً من إعدادات الجهاز (تحويل النص إلى كلام).",
    no_tts: "متصفحك لا يدعم قراءة النص بصوت. جرّب Chrome أو Safari.",
    register: "درجة الرسمية", reg_f: "رسمي", reg_n: "محايد", reg_i: "غير رسمي",
    meaning: "المعنى في السياق", vocab_h: "مفردات مهمة", example: "مثال إضافي", listen: "استمع", slow: "ببطء",
    save: "احفظ", saved: "محفوظ ✓", save_sentence: "احفظ الجملة",
    rec_title: "تدرّب على النطق", rec_hint: "استمع للجملة، ثم سجّل صوتك وقارن. على الموبايل يفتح الزر مسجّل الصوت؛ وعلى الحاسوب يمكنك اختيار ملف صوتي.",
    rec_btn: "سجّل صوتك", rec_yours: "تسجيلك", rec_model: "النموذج", rec_note: "لا يوجد تقييم آلي للنطق في هذه النسخة؛ قارن بأذنك.",
    ex_title: "تمارين الدرس", ex_start: "ابدأ التمارين", ex_again: "أعد التمارين", q_of: "سؤال {0} من {1}",
    k_listen: "فهم الحوار", k_gap: "أكمل الجملة", k_expr: "اختر التعبير الصحيح", k_natural: "الصياغة الأكثر طبيعية", k_match: "طابق الكلمات", k_order: "رتّب الكلمات",
    replay_dialog: "استمع للحوار مرة أخرى", check: "تحقّق", correct: "إجابة صحيحة", wrong: "ليست صحيحة", try_again: "حاول مرة أخرى", next_q: "التالي", finish: "أنهِ",
    show_other_de: "اعرض الشرح بالألمانية", show_other_ar: "اعرض الشرح بالعربية", order_hint: "اضغط على الكلمات بالترتيب الصحيح.", match_hint: "اختر كلمة ثم معناها.", reset: "ابدأ من جديد",
    result: "النتيجة", result_sub: "{0} من {1} صحيحة من المحاولة الأولى", back_lesson: "رجوع للحوار", to_lessons: "كل الدروس", next_lesson: "الدرس التالي",
    expr_sub: "أهم التعبيرات في هذا الدرس. احفظها لتظهر في مراجعاتك.",
    vocab_title: "دفتر المفردات", vocab_empty: "لم تحفظ أي مفردات بعد. افتح درساً واضغط على أي جملة لحفظ كلماتها وتعبيراتها.",
    search: "ابحث…", st_new: "جديد", st_learning: "قيد المراجعة", st_mastered: "متقن", from_lesson: "من الدرس", remove: "احذف", confirm_remove: "اضغط مرة أخرى للحذف",
    review_title: "المراجعة", review_sub: "مراجعة متباعدة: كلما تذكرت أكثر، تباعدت المراجعة.", show_meaning: "أظهر المعنى",
    r_again: "لم أتذكر", r_hard: "صعب", r_good: "جيد", r_easy: "سهل", review_done: "انتهت مراجعات اليوم. أحسنت!", next_review: "المراجعة التالية: {0}", review_left: "متبقٍ {0}",
    stats_title: "تقدمك", stats_sub: "كل الأرقام محسوبة من استخدامك الفعلي.", avg_score: "متوسط نتائج التمارين", first_try: "دقة المحاولة الأولى", time_total: "وقت التعلم", vocab_mastered: "مفردات متقنة",
    mistakes: "أكثر الأخطاء تكراراً", mistakes_empty: "لا أخطاء مسجّلة بعد.", wrong_n: "{0} أخطاء من {1}", longest: "أطول سلسلة", last30: "آخر 30 يوماً", no_data: "لا بيانات بعد",
    profile_title: "الحساب والإعدادات", account: "الحساب", acc_cloud: "مسجّل الدخول بحساب Claude. تقدمك محفوظ بشكل خاص.", acc_local: "وضع التجربة: البيانات على هذا الجهاز فقط.",
    logout_note: "تسجيل الدخول والخروج يتمّان من حسابك على claude.ai.",
    theme: "المظهر", th_system: "حسب الجهاز", th_light: "فاتح", th_dark: "داكن", def_speed: "سرعة التشغيل الافتراضية",
    voice: "الصوت الألماني", voice_none: "لا يوجد صوت ألماني على هذا الجهاز", test_voice: "جرّب الصوت",
    reset_all: "امسح كل تقدمي", reset_confirm: "اضغط مرة أخرى لتأكيد المسح النهائي", reset_done: "تم مسح التقدم",
    about: "عن المحتوى", about_body: "كل الحوارات والتمارين مكتوبة خصيصاً لـ DeutschFlow، والأسماء والمواقف خيالية. الصوت حالياً مولَّد بقارئ الكلام في جهازك، وليس فيديو أو تسجيلاً بشرياً.",
    days: ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
    video_loading: "جارٍ تحميل المقطع من يوتيوب…", video_source: "المقطع معروض من", video_badge: "فيديو",
    video_gone: "المقطع غير متاح", video_blocked: "تعذّر تحميل مشغّل يوتيوب هنا", video_gone_sub: "ربما حُذف المقطع أو منع صاحبه عرضه خارج يوتيوب، أو أن هذه الصفحة لا تسمح بتشغيل يوتيوب.",
    video_use_audio: "استمع للحوار بالصوت بدلاً من ذلك", video_fallback: "الفيديو غير متاح، والصوت الآن مولَّد بقارئ الكلام في جهازك",
    add_clip: "أضف مقطعاً", my_clips: "مقاطعي من يوتيوب", my_clips_empty: "أضف أي مقطع ألماني من يوتيوب مع نصه، فيتحوّل إلى درس فيه ترجمة متزامنة وتمارين.",
    add_clip_sub: "الصق رابط فيديو يوتيوب ونصّ الترجمة الألمانية مع التوقيت. يُعرض الفيديو من يوتيوب نفسه، ولا يُنسخ إلى التطبيق.",
    clip_url: "رابط يوتيوب", clip_title: "عنوان الدرس", clip_text: "النص مع التوقيت",
    clip_help: "في يوتيوب: افتح الوصف ← «إظهار النص» ← انسخ الأسطر مع التوقيت. لإضافة ترجمة عربية اكتبها بعد علامة | في نفس السطر.",
    clip_id_ok: "رابط صالح", clip_id_bad: "لم نتعرّف على الرابط", clip_lines: "{0} جملة من {1} إلى {2}", clip_lines_bad: "لم نجد أسطراً تبدأ بتوقيت مثل 0:05",
    clip_save: "أنشئ الدرس", no_ex: "لا توجد تمارين لهذا المقطع.",
    au_login: "تسجيل الدخول", au_signup: "إنشاء حساب", au_reset: "استعادة كلمة المرور", au_newpw: "كلمة مرور جديدة",
    au_login_btn: "ادخل", au_signup_btn: "أنشئ الحساب", au_reset_btn: "أرسل رابط الاستعادة", au_newpw_btn: "احفظ كلمة المرور",
    au_email: "البريد الإلكتروني", au_pw: "كلمة المرور", au_newpw_field: "كلمة المرور الجديدة (8 أحرف على الأقل)",
    au_have: "عندي حساب", au_new: "ليس لديك حساب؟ أنشئ واحداً", au_forgot: "نسيت كلمة المرور؟",
    au_bad_login: "البريد أو كلمة المرور غير صحيحة.", au_not_confirmed: "أكّد بريدك أولاً من الرسالة التي أرسلناها لك.", au_exists: "هذا البريد مسجّل. سجّل الدخول أو استعد كلمة المرور.",
    au_weak: "كلمة المرور يجب أن تكون 8 أحرف على الأقل.", au_rate: "محاولات كثيرة. انتظر قليلاً ثم حاول مجدداً.", au_offline: "لا يوجد اتصال بالإنترنت. تحقق من الشبكة وحاول مجدداً.", au_mail_bad: "اكتب بريداً إلكترونياً صحيحاً.",
    au_check_mail: "أرسلنا لك رسالة تأكيد. افتح الرابط فيها ثم سجّل الدخول.", au_reset_sent: "إذا كان البريد مسجّلاً، وصلتك رسالة فيها رابط لتعيين كلمة مرور جديدة.", au_pw_changed: "تم تغيير كلمة المرور",
    au_logout: "تسجيل الخروج", acc_supa: "تقدمك ومفرداتك محفوظة في حسابك، ولا يستطيع أي مستخدم آخر رؤيتها.",
    saved_toast: "حُفظ في دفتر المفردات", removed_toast: "حُذف من الدفتر", sec: "ث"
  },
  de: {
    nav_feed: "Clips", feed_key: "Ausdruck in diesem Clip", feed_again: "Nochmal", feed_practice: "Üben", feed_full: "Ganze Lektion öffnen", feed_ex: "Übungen", feed_end: "Alle Clips gesehen! Weiter mit den Lektionen.", feed_auto: "Text aus YouTubes automatischen Untertiteln, von Hand korrigiert – kann leicht abweichen.", feed_auto_short: "· Auto-Text", nav_home: "Start", nav_lessons: "Lektionen", nav_vocab: "Wortschatz", nav_stats: "Fortschritt", nav_profile: "Konto",
    loading: "Dein Konto wird geladen …",
    sync_ok: "Gespeichert", sync_pending: "Wird gespeichert …", sync_retry: "Verbindung schwach, neuer Versuch folgt", sync_error: "Speichern fehlgeschlagen", sync_denied: "Keine Speicherberechtigung", sync_quota: "Speicher voll", sync_local: "Nur auf diesem Gerät gespeichert", retry: "Erneut versuchen",
    gate_title: "Melde dich an, um deinen Fortschritt zu speichern",
    gate_body: "DeutschFlow speichert Lektionen und Wortschatz privat in deinem Claude-Konto. Öffne diese Seite, während du bei claude.ai angemeldet bist.",
    gate_local: "Ohne Konto testen (nur auf diesem Gerät)",
    onb_title: "Willkommen bei DeutschFlow", onb_sub: "Drei kurze Einstellungen. Du kannst sie später im Konto ändern.",
    ui_lang: "Sprache der Oberfläche", expl_lang: "Sprache der Erklärungen", goal: "Dein Lernziel", start: "Los geht's",
    g_daily: "Alltag", g_work: "Beruf", g_exam: "Prüfungsvorbereitung",
    lang_ar: "Arabisch", lang_de: "Deutsch",
    level_now: "Dein Niveau", continue: "Weiterlernen", start_first: "Erste Lektion starten",
    last_opened: "Zuletzt geöffnet", lessons_done: "Lektionen abgeschlossen", saved_vocab: "Gespeicherte Wörter", due_today: "Heute fällig", streak: "Tage in Folge",
    today_goal: "Tagesziel", minutes: "Minuten", min_short: "Min.", last7: "Letzte 7 Tage", for_goal: "Passend zu deinem Ziel",
    review_now: "Jetzt wiederholen", nothing_due: "Nichts fällig",
    all: "Alle", open_l: "Offen", done_l: "Abgeschlossen", new_l: "Neu", opened_l: "Begonnen", completed: "Abgeschlossen", best: "Bestes Ergebnis",
    lessons_title: "B2-Lektionen", lessons_sub: "20 eigene Lektionen und 10 Lektionen mit echten Szenen aus dem deutschen Fernsehen – mit Dialog, Satzerklärungen und Übungen.", real_scenes: "Echte Szenen aus dem deutschen Fernsehen", real_scenes_sub: "Offizielle Clips der ARD auf YouTube, mit deutschem Text, arabischer Übersetzung und Übungen.",
    c1_note: "C1-Lektionen sind in Arbeit. Inhalte für A1–B1 gibt es nicht, die App beginnt bei B2.",
    tab_dialog: "Dialog", tab_ex: "Übungen", tab_expr: "Ausdrücke",
    demo_audio: "Synthetische Stimme deines Geräts, keine menschliche Aufnahme",
    show_de: "Deutscher Text", show_ar: "Arabische Übersetzung", speed: "Tempo",
    play: "Abspielen", pause: "Pause", prev: "Zurück", next: "Weiter", repeat: "Satz wiederholen",
    tap_line: "Tippe auf einen Satz für Erklärung, Speichern und Aussprachetraining.",
    hidden_de: "Text ausgeblendet – hör genau hin",
    no_voice: "Keine deutsche Stimme gefunden, die Aussprache kann ungenau sein. Füge in den Geräteeinstellungen (Text-in-Sprache) eine deutsche Stimme hinzu.",
    no_tts: "Dein Browser unterstützt keine Sprachausgabe. Versuche Chrome oder Safari.",
    register: "Register", reg_f: "formell", reg_n: "neutral", reg_i: "informell",
    meaning: "Bedeutung im Kontext", vocab_h: "Wichtige Wörter", example: "Weiteres Beispiel", listen: "Anhören", slow: "Langsam",
    save: "Speichern", saved: "Gespeichert ✓", save_sentence: "Satz speichern",
    rec_title: "Aussprache üben", rec_hint: "Hör dir den Satz an, nimm dich auf und vergleiche. Am Handy öffnet der Knopf die Sprachaufnahme, am Computer kannst du eine Audiodatei wählen.",
    rec_btn: "Aufnehmen", rec_yours: "Deine Aufnahme", rec_model: "Vorbild", rec_note: "In dieser Version gibt es keine automatische Bewertung – vergleiche mit dem Ohr.",
    ex_title: "Übungen", ex_start: "Übungen starten", ex_again: "Übungen wiederholen", q_of: "Frage {0} von {1}",
    k_listen: "Hörverstehen", k_gap: "Lückentext", k_expr: "Richtiger Ausdruck", k_natural: "Natürlichste Formulierung", k_match: "Zuordnen", k_order: "Satzbau",
    replay_dialog: "Dialog noch einmal hören", check: "Prüfen", correct: "Richtig", wrong: "Nicht richtig", try_again: "Noch einmal", next_q: "Weiter", finish: "Abschließen",
    show_other_de: "Erklärung auf Deutsch", show_other_ar: "Erklärung auf Arabisch", order_hint: "Tippe die Wörter in der richtigen Reihenfolge an.", match_hint: "Wähle ein Wort und dann seine Bedeutung.", reset: "Neu beginnen",
    result: "Ergebnis", result_sub: "{0} von {1} beim ersten Versuch richtig", back_lesson: "Zurück zum Dialog", to_lessons: "Alle Lektionen", next_lesson: "Nächste Lektion",
    expr_sub: "Die wichtigsten Ausdrücke dieser Lektion. Speichere sie für deine Wiederholungen.",
    vocab_title: "Wortschatz", vocab_empty: "Noch nichts gespeichert. Öffne eine Lektion und tippe auf einen Satz.",
    search: "Suchen …", st_new: "Neu", st_learning: "In Wiederholung", st_mastered: "Gelernt", from_lesson: "Aus Lektion", remove: "Löschen", confirm_remove: "Zum Löschen erneut tippen",
    review_title: "Wiederholung", review_sub: "Verteilte Wiederholung: Je besser du dich erinnerst, desto größer der Abstand.", show_meaning: "Bedeutung zeigen",
    r_again: "Vergessen", r_hard: "Schwer", r_good: "Gut", r_easy: "Leicht", review_done: "Alles für heute wiederholt. Super!", next_review: "Nächste Wiederholung: {0}", review_left: "Noch {0}",
    stats_title: "Dein Fortschritt", stats_sub: "Alle Werte stammen aus deiner tatsächlichen Nutzung.", avg_score: "Durchschnitt der Übungen", first_try: "Trefferquote beim 1. Versuch", time_total: "Lernzeit", vocab_mastered: "Gelernte Wörter",
    mistakes: "Häufigste Fehler", mistakes_empty: "Noch keine Fehler erfasst.", wrong_n: "{0} Fehler von {1}", longest: "Längste Serie", last30: "Letzte 30 Tage", no_data: "Noch keine Daten",
    profile_title: "Konto und Einstellungen", account: "Konto", acc_cloud: "Angemeldet mit deinem Claude-Konto. Dein Fortschritt ist privat gespeichert.", acc_local: "Testmodus: Daten nur auf diesem Gerät.",
    logout_note: "An- und Abmelden erfolgt über dein Konto auf claude.ai.",
    theme: "Darstellung", th_system: "Wie Gerät", th_light: "Hell", th_dark: "Dunkel", def_speed: "Standardtempo",
    voice: "Deutsche Stimme", voice_none: "Keine deutsche Stimme auf diesem Gerät", test_voice: "Stimme testen",
    reset_all: "Gesamten Fortschritt löschen", reset_confirm: "Zum endgültigen Löschen erneut tippen", reset_done: "Fortschritt gelöscht",
    about: "Über die Inhalte", about_body: "Alle Dialoge und Übungen wurden eigens für DeutschFlow geschrieben; Namen und Situationen sind erfunden. Die Stimme ist derzeit die Sprachausgabe deines Geräts, kein Video und keine menschliche Aufnahme.",
    days: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    video_loading: "Clip wird von YouTube geladen …", video_source: "Clip abgespielt über", video_badge: "Video",
    video_gone: "Clip nicht verfügbar", video_blocked: "YouTube-Player kann hier nicht geladen werden", video_gone_sub: "Vielleicht wurde der Clip gelöscht, das Einbetten verboten oder diese Seite erlaubt kein YouTube.",
    video_use_audio: "Dialog stattdessen als Audio hören", video_fallback: "Video nicht verfügbar – jetzt mit der Sprachausgabe deines Geräts",
    add_clip: "Clip hinzufügen", my_clips: "Meine YouTube-Clips", my_clips_empty: "Füge einen deutschen YouTube-Clip mit Transkript hinzu – daraus wird eine Lektion mit synchronen Untertiteln und Übungen.",
    add_clip_sub: "Füge einen YouTube-Link und das deutsche Transkript mit Zeitstempeln ein. Das Video läuft über YouTube und wird nicht kopiert.",
    clip_url: "YouTube-Link", clip_title: "Titel der Lektion", clip_text: "Transkript mit Zeitstempeln",
    clip_help: "Auf YouTube: Beschreibung öffnen → «Transkript anzeigen» → Zeilen mit Zeitstempeln kopieren. Arabische Übersetzung nach einem | in derselben Zeile.",
    clip_id_ok: "Link erkannt", clip_id_bad: "Link nicht erkannt", clip_lines: "{0} Sätze von {1} bis {2}", clip_lines_bad: "Keine Zeilen mit Zeitstempel wie 0:05 gefunden",
    clip_save: "Lektion erstellen", no_ex: "Für diesen Clip gibt es keine Übungen.",
    au_login: "Anmelden", au_signup: "Konto erstellen", au_reset: "Passwort zurücksetzen", au_newpw: "Neues Passwort",
    au_login_btn: "Anmelden", au_signup_btn: "Konto erstellen", au_reset_btn: "Link senden", au_newpw_btn: "Passwort speichern",
    au_email: "E-Mail", au_pw: "Passwort", au_newpw_field: "Neues Passwort (mind. 8 Zeichen)",
    au_have: "Ich habe ein Konto", au_new: "Noch kein Konto? Jetzt erstellen", au_forgot: "Passwort vergessen?",
    au_bad_login: "E-Mail oder Passwort ist falsch.", au_not_confirmed: "Bitte bestätige zuerst deine E-Mail über den Link, den wir dir geschickt haben.", au_exists: "Diese E-Mail ist schon registriert. Melde dich an oder setze das Passwort zurück.",
    au_weak: "Das Passwort braucht mindestens 8 Zeichen.", au_rate: "Zu viele Versuche. Bitte kurz warten.", au_offline: "Keine Internetverbindung. Bitte Netzwerk prüfen.", au_mail_bad: "Bitte eine gültige E-Mail eingeben.",
    au_check_mail: "Wir haben dir eine Bestätigungs-E-Mail geschickt. Öffne den Link und melde dich dann an.", au_reset_sent: "Falls die E-Mail registriert ist, hast du einen Link für ein neues Passwort bekommen.", au_pw_changed: "Passwort geändert",
    au_logout: "Abmelden", acc_supa: "Fortschritt und Wortschatz sind in deinem Konto gespeichert – niemand sonst kann sie sehen.",
    saved_toast: "Im Wortschatz gespeichert", removed_toast: "Aus dem Wortschatz entfernt", sec: "Sek."
  }
};

/* ================= state ================= */
const DOCS = ["profile", "progress", "vocab", "activity", "custom"];
function defaults() {
  return {
    profile: { uiLang: "ar", explLang: "ar", goal: "daily", theme: "system", rate: 1, showDe: true, showAr: true, onboarded: false, created: Date.now() },
    progress: { lessons: {}, last: null },
    vocab: { items: {} },
    activity: { days: {}, kinds: {}, wrong: {} },
    custom: { items: {} }
  };
}
let S = defaults();
const ui = () => S.profile.uiLang === "de" ? "de" : "ar";
const t = (k, ...a) => { let s = STR[ui()][k] ?? STR.ar[k] ?? k; a.forEach((v, i) => { s = String(s).replace("{" + i + "}", v); }); return s; };
const ex = pair => Array.isArray(pair) ? (S.profile.explLang === "de" ? pair[1] : pair[0]) : pair;
const exOther = pair => Array.isArray(pair) ? (S.profile.explLang === "de" ? pair[0] : pair[1]) : "";

/* ================= helpers ================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const clone = o => JSON.parse(JSON.stringify(o));
const wait = ms => new Promise(r => setTimeout(r, ms));
const DAY = 864e5;
const dayKey = (d = new Date()) => { const x = new Date(d); return x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0"); };
const today = () => { const d = S.activity.days; const k = dayKey(); return d[k] || (d[k] = { sec: 0, ex: 0, ok: 0, lessons: 0 }); };
const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const hashId = s => { let h = 5381; for (const c of s) h = ((h << 5) + h + c.codePointAt(0)) >>> 0; return "v" + h.toString(36); };
function merge(base, extra) {
  if (!extra || typeof extra !== "object") return base;
  for (const k of Object.keys(extra)) {
    if (base[k] && typeof base[k] === "object" && !Array.isArray(base[k]) && typeof extra[k] === "object" && !Array.isArray(extra[k])) merge(base[k], extra[k]);
    else base[k] = extra[k];
  }
  return base;
}
function wordsHTML(text) {
  let out = "", pos = 0;
  text.split(/(\s+)/).forEach(part => {
    if (/^\s+$/.test(part)) out += part;
    else if (part) out += `<span class="w" data-s="${pos}">${esc(part)}</span>`;
    pos += part.length;
  });
  return out;
}
let toastT;
function toast(msg, ms = 2600) { const el = $("#toast"); el.textContent = msg; el.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { el.hidden = true; }, ms); }
function fmtMin(sec) { const m = Math.round(sec / 60); return m < 60 ? `${m} ${t("min_short")}` : `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")} h`; }
function fmtDate(ts) { return new Date(ts).toLocaleDateString(ui() === "de" ? "de-DE" : "ar", { weekday: "short", day: "numeric", month: "short" }); }

const IC = {
  play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.6v14.8a1 1 0 0 0 1.5.86l12-7.4a1 1 0 0 0 0-1.72l-12-7.4A1 1 0 0 0 7 4.6z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4.5" width="4.2" height="15" rx="1.2"/><rect x="13.8" y="4.5" width="4.2" height="15" rx="1.2"/></svg>',
  prev: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5h2v14H6zM20 6.2v11.6a.8.8 0 0 1-1.2.7L9.6 12.7a.8.8 0 0 1 0-1.4l9.2-5.8a.8.8 0 0 1 1.2.7z"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 5h2v14h-2zM4 6.2v11.6a.8.8 0 0 0 1.2.7l9.2-5.8a.8.8 0 0 0 0-1.4L5.2 5.5A.8.8 0 0 0 4 6.2z"/></svg>',
  repeat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11a7 7 0 0 1 12-4.9L19 9M20 13a7 7 0 0 1-12 4.9L5 15"/><path d="M19 4v5h-5M5 20v-5h5"/></svg>',
  speak: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>',
  mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg>',
  bookmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M6 3.5h12v17l-6-4-6 4z"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20h-5.5v-6h-5v6H4z"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20"/></svg>',
  cards: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>'
};

/* ================= persistence ================= */
const backend = { mode: "none", db: null, uid: null, user: null };
const LOCAL_KEY = "deutschflow:";
function localGet(n) { try { const v = localStorage.getItem(LOCAL_KEY + n); return v ? JSON.parse(v) : null; } catch (e) { return null; } }
function localSet(n, v) { try { localStorage.setItem(LOCAL_KEY + n, JSON.stringify(v)); return true; } catch (e) { return false; } }

async function connectCloud() {
  if (!window.claude || typeof window.claude.use !== "function") return false;
  try {
    const [db, user] = await Promise.all([window.claude.use("db"), window.claude.use("user")]);
    if (!db || !user) return false;
    const uid = await user.id();
    if (!uid) return false;
    Object.assign(backend, { mode: "cloud", db, user, uid });
    return true;
  } catch (e) { return false; }
}
/* Supabase (website and Android app): e-mail/password accounts; each user's rows are protected by row level security. */
const SUPA = { url: "https://lcfacnmlmvekggginxyg.supabase.co", key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjZmFjbm1sbXZla2dnZ2lueHlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMyOTk5MzMsImV4cCI6MjEwODg3NTkzM30.fhXkSNRlSrPvQvcdnUjcPqb-HJRe_WXNVp9Z2qFxkMI" };
let sb = null, recovering = false;
function supaClient() {
  if (sb) return sb;
  if (!window.supabase || !window.supabase.createClient) return null;
  sb = window.supabase.createClient(SUPA.url, SUPA.key, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
  sb.auth.onAuthStateChange(ev => { if (ev === "PASSWORD_RECOVERY") recovering = true; if (ev === "SIGNED_OUT" && backend.mode === "supa") location.reload(); });
  return sb;
}
const supaErr = e => {
  const m = String((e && (e.message || e.error_description)) || e || "");
  if (/fetch|network|Failed to fetch|timeout/i.test(m)) return { code: "unavailable", message: m };
  if (/JWT|permission|row-level|401|403/i.test(m)) return { code: "invalid_argument", message: m };
  return { code: "error", message: m };
};
async function supaSession() {
  const c = supaClient(); if (!c) return null;
  try { const { data } = await c.auth.getSession(); return data.session || null; } catch (e) { return null; }
}
function authMsg(e) {
  const m = String((e && e.message) || "");
  if (/Invalid login credentials/i.test(m)) return t("au_bad_login");
  if (/Email not confirmed/i.test(m)) return t("au_not_confirmed");
  if (/already registered|already exists/i.test(m)) return t("au_exists");
  if (/at least|Password should/i.test(m)) return t("au_weak");
  if (/rate limit|too many/i.test(m)) return t("au_rate");
  if (/fetch|network/i.test(m)) return t("au_offline");
  return m || t("sync_error");
}
function showAuth() {
  return new Promise(res => {
    let mode = recovering ? "newpw" : "login";
    const draw = (note, isErr) => {
      applyChrome();
      const title = { login: "au_login", signup: "au_signup", reset: "au_reset", newpw: "au_newpw" }[mode];
      $("#view").innerHTML = `<section class="gate card"><span class="lvl" lang="de">B2 → C1</span><h1 class="h1">${esc(t(title))}</h1>
        <form id="auForm" class="form" novalidate>
          ${mode !== "newpw" ? `<label for="auMail">${esc(t("au_email"))}</label><input class="search" id="auMail" type="email" autocomplete="email" dir="ltr" required>` : ""}
          ${mode !== "reset" ? `<label for="auPw">${esc(t(mode === "newpw" ? "au_newpw_field" : "au_pw"))}</label><input class="search" id="auPw" type="password" minlength="8" autocomplete="${mode === "login" ? "current-password" : "new-password"}" dir="ltr" required>` : ""}
          <button class="btn primary big" id="auGo" type="submit">${esc(t(title + "_btn"))}</button>
        </form>
        <p id="auNote" class="${isErr ? "au-err" : "muted"}" role="status">${esc(note || "")}</p>
        <div class="row wrap">
          ${mode !== "login" ? `<button class="linkbtn" data-m="login">${esc(t("au_have"))}</button>` : `<button class="linkbtn" data-m="signup">${esc(t("au_new"))}</button><button class="linkbtn" data-m="reset">${esc(t("au_forgot"))}</button>`}
        </div>
        <button class="btn ghost" id="gLocal">${esc(t("gate_local"))}</button></section>`;
      $$("[data-m]").forEach(b => b.onclick = () => { mode = b.dataset.m; draw(); });
      $("#gLocal").onclick = () => { backend.mode = "local"; res(); };
      $("#auForm").onsubmit = async e => {
        e.preventDefault();
        const c = supaClient(); const go = $("#auGo"); go.disabled = true;
        const mail = $("#auMail") ? $("#auMail").value.trim() : "", pw = $("#auPw") ? $("#auPw").value : "";
        try {
          if (mode !== "newpw" && !/^\S+@\S+\.\S+$/.test(mail)) throw { message: t("au_mail_bad") };
          if ((mode === "signup" || mode === "newpw") && pw.length < 8) throw { message: t("au_weak") };
          if (mode === "login") {
            const { data, error } = await c.auth.signInWithPassword({ email: mail, password: pw }); if (error) throw error;
            Object.assign(backend, { mode: "supa", uid: data.user.id, email: data.user.email }); return res();
          }
          if (mode === "signup") {
            const { data, error } = await c.auth.signUp({ email: mail, password: pw, options: { emailRedirectTo: location.origin + location.pathname } }); if (error) throw error;
            if (data.session) { Object.assign(backend, { mode: "supa", uid: data.user.id, email: data.user.email }); return res(); }
            mode = "login"; return draw(t("au_check_mail"));
          }
          if (mode === "reset") {
            const { error } = await c.auth.resetPasswordForEmail(mail, { redirectTo: location.origin + location.pathname }); if (error) throw error;
            mode = "login"; return draw(t("au_reset_sent"));
          }
          if (mode === "newpw") {
            const { data, error } = await c.auth.updateUser({ password: pw }); if (error) throw error;
            recovering = false; Object.assign(backend, { mode: "supa", uid: data.user.id, email: data.user.email }); toast(t("au_pw_changed")); return res();
          }
        } catch (err) { go.disabled = false; draw(authMsg(err), true); }
      };
    };
    draw();
  });
}

const docRef = n => backend.db.doc("data/users/" + backend.uid + "/" + n);
async function loadAll() {
  S = defaults();
  if (backend.mode === "cloud") {
    const snaps = await Promise.all(DOCS.map(n => docRef(n).get()));
    snaps.forEach((s, i) => { if (s.exists) merge(S[DOCS[i]], clone(s.data())); });
  } else if (backend.mode === "supa") {
    const { data, error } = await sb.from("user_docs").select("name, body");
    if (error) throw supaErr(error);
    (data || []).forEach(r => { if (S[r.name]) merge(S[r.name], r.body); });
  } else {
    DOCS.forEach(n => merge(S[n], localGet(n)));
  }
}
const pending = new Set();
let saveTimer = null, writing = false, syncState = "ok";
function save(...names) { names.forEach(n => pending.add(n)); setSync("pending"); clearTimeout(saveTimer); saveTimer = setTimeout(flush, 700); }
async function flush() {
  if (writing) { clearTimeout(saveTimer); saveTimer = setTimeout(flush, 400); return; }
  if (!pending.size) return;
  writing = true;
  const names = [...pending]; pending.clear();
  try {
    for (const n of names) {
      const body = clone(S[n]);
      if (backend.mode === "cloud") await docRef(n).set(body);
      else if (backend.mode === "supa") {
        let res;
        try { res = await sb.from("user_docs").upsert({ user_id: backend.uid, name: n, body, updated_at: new Date().toISOString() }, { onConflict: "user_id,name" }); }
        catch (e) { throw supaErr(e); }
        if (res.error) throw supaErr(res.error);
      }
      else if (!localSet(n, body)) throw { code: "local" };
    }
    setSync("ok");
  } catch (e) {
    names.forEach(n => pending.add(n));
    const code = e && e.code;
    if (code === "unavailable" || code === "resource_exhausted") { setSync("retry"); clearTimeout(saveTimer); saveTimer = setTimeout(flush, 2500 + Math.random() * 2500); }
    else if (code === "invalid_argument" || code === "not_granted") setSync("denied");
    else if (code === "quota_exceeded") setSync("quota");
    else setSync("error");
  } finally { writing = false; }
}
function setSync(st) {
  syncState = st;
  const el = $("#sync"); if (!el) return;
  const key = st === "ok" && backend.mode === "local" ? "sync_local" : "sync_" + st;
  const bad = ["error", "denied", "quota"].includes(st);
  el.className = "sync " + (bad ? "bad" : st === "ok" ? "ok" : "busy");
  el.innerHTML = `<span class="dot"></span><span>${esc(t(key))}</span>${bad && st === "error" ? ` <button class="linkbtn" id="syncRetry">${esc(t("retry"))}</button>` : ""}`;
  const r = $("#syncRetry"); if (r) r.onclick = () => { setSync("pending"); flush(); };
}

/* ================= time tracking (real active time only) ================= */
let lastInput = Date.now(), pendingSec = 0;
["pointerdown", "keydown", "scroll", "touchstart"].forEach(ev => addEventListener(ev, () => { lastInput = Date.now(); }, { passive: true, capture: true }));
setInterval(() => {
  const r = route().name;
  const learning = r === "lesson" || r === "review" || r === "feed";
  if (learning && document.visibilityState === "visible" && (Date.now() - lastInput < 60000 || speaking)) pendingSec += 5;
  if (pendingSec >= 60) flushTime();
}, 5000);
function flushTime() { if (!pendingSec) return; today().sec += pendingSec; pendingSec = 0; save("activity"); }
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") { flushTime(); flush(); } });

/* ================= speech ================= */
const synth = window.speechSynthesis;
let deVoices = [], speaking = false, voiceWarned = false;
const keepUtter = [];
const FEMALE = /anna|petra|katja|hedda|marlene|vicki|helena|female|amala|seraphina|elke|gisela|katharina|louisa|maja|tanja|sabine/i;
const MALE = /markus|conrad|stefan|yannick|hans|\bmale|killian|florian|bernd|christoph|klaus|ralf|jonas|viktor/i;
function loadVoices() {
  if (!synth) return;
  deVoices = synth.getVoices().filter(v => /^de([-_]|$)/i.test(v.lang))
    .sort((a, b) => (/de[-_]DE/i.test(b.lang) - /de[-_]DE/i.test(a.lang)) || (b.localService - a.localService));
}
if (synth) { loadVoices(); synth.onvoiceschanged = loadVoices; }
function voiceFor(g) {
  if (!deVoices.length) return null;
  const re = g === "f" ? FEMALE : MALE;
  return deVoices.find(v => re.test(v.name)) || deVoices[g === "f" ? 0 : Math.min(1, deVoices.length - 1)];
}
let speechRun = 0;
function stopSpeech() { speechRun++; speaking = false; if (synth) synth.cancel(); document.dispatchEvent(new Event("df:stop")); }
function speak(text, { rate = S.profile.rate, g = "f", onWord } = {}) {
  return new Promise(res => {
    if (!synth) { toast(t("no_tts"), 4000); return res(false); }
    if (!deVoices.length && !voiceWarned) { voiceWarned = true; toast(t("no_voice"), 6000); }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE";
    const v = voiceFor(g); if (v) u.voice = v;
    const distinct = voiceFor("f") !== voiceFor("m");
    u.pitch = distinct ? 1 : (g === "f" ? 1.12 : 0.82);
    u.rate = Math.max(0.4, Math.min(1.6, rate)) * 0.95;
    u.onboundary = e => { if (onWord && (e.name === "word" || !e.name)) onWord(e.charIndex); };
    u.onend = () => { speaking = false; res(true); };
    u.onerror = () => { speaking = false; res(false); };
    keepUtter.push(u); if (keepUtter.length > 30) keepUtter.shift();
    speaking = true; lastInput = Date.now();
    synth.speak(u);
  });
}
function highlighter(container) {
  const spans = $$(".w", container);
  return ci => { let hit = null; spans.forEach(s => { s.classList.remove("on"); if (+s.dataset.s <= ci) hit = s; }); if (hit) hit.classList.add("on"); };
}
function clearHl(container) { $$(".w.on", container).forEach(s => s.classList.remove("on")); }
function sayInto(text, container, opts = {}) { stopSpeech(); return speak(text, { ...opts, onWord: container ? highlighter(container) : null }).then(r => { if (container) clearHl(container); return r; }); }

/* ================= vocab + SRS ================= */
function vocabId(de) { return hashId(de.trim().toLowerCase()); }
function isSaved(de) { return !!S.vocab.items[vocabId(de)]; }
function saveVocab({ de, ar, exDe, lesson, type }) {
  const id = vocabId(de);
  if (S.vocab.items[id]) return false;
  S.vocab.items[id] = { de, ar, ex: exDe || "", lesson, type, added: Date.now(), due: Date.now(), ivl: 0, ease: 2.5, reps: 0, lapses: 0 };
  save("vocab"); toast(t("saved_toast"));
  return true;
}
function vStatus(it) { return !it.reps ? "new" : it.ivl >= 21 ? "mastered" : "learning"; }
function dueItems() { const now = Date.now(); return Object.entries(S.vocab.items).filter(([, it]) => (it.due || 0) <= now); }
function rateItem(it, r) {
  const now = Date.now();
  it.ease = it.ease || 2.5; let ivl = it.ivl || 0;
  if (r === 0) { it.lapses = (it.lapses || 0) + 1; it.ease = Math.max(1.3, it.ease - 0.2); ivl = 0; it.due = now + 10 * 60e3; }
  else {
    if (r === 1) { ivl = ivl ? Math.max(1, Math.round(ivl * 1.2)) : 1; it.ease = Math.max(1.3, it.ease - 0.15); }
    else if (r === 2) ivl = !it.reps ? 1 : it.reps === 1 ? 3 : Math.max(ivl + 1, Math.round(ivl * it.ease));
    else { ivl = !it.reps ? 4 : Math.max(ivl + 2, Math.round(Math.max(ivl, 1) * it.ease * 1.3)); it.ease += 0.15; }
    it.reps = (it.reps || 0) + 1; it.due = now + ivl * DAY;
  }
  it.ivl = ivl; it.last = now;
}

/* ================= progress helpers ================= */
const LP = id => S.progress.lessons[id] || (S.progress.lessons[id] = {});
const doneCount = () => LESSONS.filter(l => S.progress.lessons[l.id]?.done).length;
function nextLesson() {
  const last = S.progress.last && LMAP[S.progress.last];
  if (last && !S.progress.lessons[last.id]?.done) return last;
  const goalNs = GOAL_LESSONS[S.profile.goal] || [];
  return LESSONS.find(l => goalNs.includes(l.n) && !S.progress.lessons[l.id]?.done) || LESSONS.find(l => !S.progress.lessons[l.id]?.done) || LESSONS[0];
}
function activeDay(d) { return d && (d.sec >= 60 || d.ex > 0); }
function streaks() {
  const days = S.activity.days; let cur = 0;
  const d = new Date();
  if (!activeDay(days[dayKey(d)])) d.setDate(d.getDate() - 1);
  while (activeDay(days[dayKey(d)])) { cur++; d.setDate(d.getDate() - 1); }
  const keys = Object.keys(days).filter(k => activeDay(days[k])).sort();
  let longest = 0, run = 0, prev = null;
  keys.forEach(k => { const dt = new Date(k + "T12:00:00"); run = prev && Math.round((dt - prev) / DAY) === 1 ? run + 1 : 1; longest = Math.max(longest, run); prev = dt; });
  return { cur, longest };
}
function lastNDays(n) {
  const out = [];
  for (let i = n - 1; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); const k = dayKey(d); out.push({ k, d, v: S.activity.days[k] || { sec: 0, ex: 0, ok: 0 } }); }
  return out;
}
function statusChip(l) {
  const p = S.progress.lessons[l.id];
  if (p?.done) return `<span class="chip ok">${esc(t("completed"))} · ${p.best}%</span>`;
  if (p?.opened) return `<span class="chip warn">${esc(t("opened_l"))}</span>`;
  return `<span class="chip">${esc(t("new_l"))}</span>`;
}
function lessonCard(l) {
  const p = S.progress.lessons[l.id] || {};
  return `<a class="lcard" href="#lesson-${l.id}">
    <span class="lnum" lang="de">${l.custom ? "▶" : String(l.n).padStart(2, "0")}</span>
    <span class="lbody"><span class="ltopic">${esc(l.topic[ui() === "de" ? 1 : 0])}</span>
      <span class="ltitle" lang="de" dir="ltr">${esc(l.title)}</span>
      <span class="lmeta">${statusChip(l)}${l.video ? `<span class="chip vid">${esc(t("video_badge"))}</span>` : ""}${p.videoError ? `<span class="chip bad">${esc(t("video_gone"))}</span>` : ""}<span class="muted">${l.L.length} · ${l.Q.length} ${ui() === "de" ? "Übungen" : "تمارين"}</span></span></span>
    ${p.done ? `<span class="lbar"><i style="width:${p.best}%"></i></span>` : ""}
  </a>`;
}
function barChart(days, { height = 120 } = {}) {
  const max = Math.max(DAILY_GOAL_MIN * 60, ...days.map(x => x.v.sec));
  const goalPct = DAILY_GOAL_MIN * 60 / max * 100;
  const short = days.length <= 7;
  return `<div class="chart" style="--h:${height}px" dir="ltr" role="img" aria-label="${esc(days.map(x => x.k + ": " + fmtMin(x.v.sec)).join(", "))}">
    <div class="plot"><span class="goal" style="bottom:${goalPct}%"><em>${DAILY_GOAL_MIN} ${esc(t("min_short"))}</em></span>
    ${days.map((x, i) => `<span class="col ${i === days.length - 1 ? "today" : ""}" title="${esc(x.k)}: ${esc(fmtMin(x.v.sec))}"><i style="height:${x.v.sec ? Math.max(2, x.v.sec / max * 100) : 0}%"></i></span>`).join("")}</div>
    <div class="xax">${days.map(x => `<span>${esc(short ? t("days")[x.d.getDay()] : (x.d.getDate() % 5 === 0 ? String(x.d.getDate()) : ""))}</span>`).join("")}</div></div>`;
}

/* ----- clips added by the learner (YouTube link + transcript) ----- */
function ytId(url) {
  const s = String(url || "").trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  const m = s.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
  return m ? m[1] : null;
}
const TS_RE = /^(?:(\d+):)?(\d{1,2}):(\d{2})(?:[.,]\d+)?\s*(.*)$/;
const NOISE_RE = /^(\d+\s*(seconds?|minutes?|hours?|sekunden?|minuten?|stunden?)[, ]*)+$|^\d+\s*(Sekunde|Minute)/i;
function parseTranscript(txt) {
  const out = []; let pendingT = null;
  for (const raw of String(txt || "").split(/\r?\n/)) {
    const ln = raw.trim();
    if (!ln || NOISE_RE.test(ln)) continue;
    const m = ln.match(TS_RE);
    if (m) {
      const tt = (+(m[1] || 0)) * 3600 + (+m[2]) * 60 + (+m[3]);
      if (m[4]) out.push({ t: tt, raw: m[4] }); else pendingT = tt;
    } else if (pendingT !== null) { out.push({ t: pendingT, raw: ln }); pendingT = null; }
    else if (out.length) out[out.length - 1].raw += " " + ln;
  }
  return out.map(x => { const [de, ar] = x.raw.split("|").map(p => p.trim()); return { t: x.t, de: de || "", ar: ar || "" }; })
    .filter(x => x.de && !/^[\[(].*[\])]$/.test(x.de)).sort((a, b) => a.t - b.t).slice(0, 80);
}
function autoQuestions(lines) {
  const Q = [];
  const words = s => s.split(/\s+/).filter(Boolean);
  const clean = w => w.replace(/^[„“"'(]+|[.,!?;:…“"')]+$/g, "");
  const ordered = lines.filter(x => { const n = words(x.de).length; return n >= 4 && n <= 12; });
  shuffle(ordered).slice(0, 3).forEach(x => Q.push({ k: "order", s: x.de.replace(/\s+/g, " ").trim(), w: ["هذه الجملة كما وردت في المقطع.", "So steht der Satz im Clip."] }));
  const pool = [...new Set(lines.flatMap(x => words(x.de).map(clean)).filter(w => w.length >= 5 && /^[A-Za-zÄÖÜäöüß-]+$/.test(w)))];
  shuffle(lines.filter(x => words(x.de).length >= 5)).slice(0, 3).forEach(x => {
    const cand = words(x.de).map(clean).filter(w => w.length >= 5 && /^[A-Za-zÄÖÜäöüß-]+$/.test(w));
    if (!cand.length) return;
    const target = cand.sort((a, b) => b.length - a.length)[0];
    const others = shuffle(pool.filter(w => w.toLowerCase() !== target.toLowerCase())).slice(0, 2);
    if (others.length < 2) return;
    Q.push({ k: "gap", q: x.de.replace(target, "___"), o: [target, ...others], a: 0, w: ["الكلمة الصحيحة هي «" + target + "» كما في المقطع.", "Im Clip heißt es «" + target + "»."] });
  });
  return Q;
}
function customLesson(c) {
  return {
    id: c.id, n: 0, level: "B2", custom: true,
    topic: ["مقطع أضفته", "Eigener Clip"], title: c.title,
    sum: ["مقطع يوتيوب أضفته بنفسك. التمارين مولَّدة تلقائياً من النص.", "Ein YouTube-Clip, den du hinzugefügt hast. Die Übungen entstehen automatisch aus dem Text."],
    sp: { A: ["", "f"] },
    L: c.lines.map(x => ["A", x.de, x.ar || "", "", "", "", [], null]),
    E: [], Q: c.q || [],
    video: { yt: c.yt, start: c.lines[0].t, end: c.end, t: c.lines.map(x => x.t) }
  };
}
function rebuildLessons() {
  Object.keys(LMAP).forEach(k => { if (!BASE_IDS.has(k)) delete LMAP[k]; });
  CUSTOM.length = 0;
  Object.values(S.custom.items).sort((a, b) => a.added - b.added).forEach(c => { const l = customLesson(c); CUSTOM.push(l); LMAP[l.id] = l; });
}
function viewAddClip(v) {
  v.innerHTML = `
  <header class="phead"><a class="iconbtn" href="#lessons">${IC.back}</a><h1 class="h1">${esc(t("add_clip"))}</h1></header>
  <p class="muted">${esc(t("add_clip_sub"))}</p>
  <section class="card block form">
    <label for="cUrl">${esc(t("clip_url"))}</label><input id="cUrl" class="search" dir="ltr" placeholder="https://www.youtube.com/watch?v=…">
    <label for="cTitle">${esc(t("clip_title"))}</label><input id="cTitle" class="search" dir="ltr" lang="de">
    <label for="cText">${esc(t("clip_text"))}</label>
    <textarea id="cText" class="search" rows="9" dir="ltr" lang="de" placeholder="0:05&#10;Na, wie war dein Wochenende? | كيف كانت عطلتك؟&#10;0:08&#10;Ziemlich entspannt."></textarea>
    <p class="muted small">${esc(t("clip_help"))}</p>
    <div id="cPrev" class="muted small"></div>
    <button class="btn primary" id="cSave" disabled>${esc(t("clip_save"))}</button>
  </section>
  ${CUSTOM.length ? `<section class="block"><h2 class="h2">${esc(t("my_clips"))}</h2><ul class="vbook">${CUSTOM.map(l => `<li class="vitem"><a class="vmain" href="#lesson-${l.id}"><b lang="de" dir="ltr">${esc(l.title)}</b><small class="muted">${l.L.length} · ${fmtClock(l.video.t[0])}–${fmtClock(l.video.end)}</small></a>
    <button class="linkbtn danger" data-cdel="${l.id}">${esc(clipConfirm === l.id ? t("confirm_remove") : t("remove"))}</button></li>`).join("")}</ul></section>` : ""}`;
  const url = $("#cUrl", v), title = $("#cTitle", v), text = $("#cText", v), prev = $("#cPrev", v), btn = $("#cSave", v);
  let parsed = [];
  const check = () => {
    const id = ytId(url.value); parsed = parseTranscript(text.value);
    const okId = !!id, okLines = parsed.length >= 2;
    prev.innerHTML = [
      url.value ? (okId ? "✓ " + esc(t("clip_id_ok")) + " <code>" + esc(id) + "</code>" : "✗ " + esc(t("clip_id_bad"))) : "",
      text.value ? (okLines ? "✓ " + esc(t("clip_lines", parsed.length, fmtClock(parsed[0].t), fmtClock(parsed[parsed.length - 1].t))) : "✗ " + esc(t("clip_lines_bad"))) : ""
    ].filter(Boolean).join("<br>");
    btn.disabled = !(okId && okLines && title.value.trim());
  };
  [url, title, text].forEach(el => el.oninput = check);
  btn.onclick = () => {
    const id = "c-" + Date.now().toString(36);
    const last = parsed[parsed.length - 1];
    S.custom.items[id] = { id, yt: ytId(url.value), title: title.value.trim().slice(0, 120), lines: parsed, end: last.t + Math.min(8, Math.max(3, last.de.split(/\s+/).length * 0.45)), q: autoQuestions(parsed), added: Date.now() };
    save("custom"); rebuildLessons();
    location.hash = "lesson-" + id;
  };
  $$("[data-cdel]", v).forEach(b => b.onclick = () => {
    const id = b.dataset.cdel;
    if (clipConfirm !== id) { clipConfirm = id; viewAddClip(v); return; }
    clipConfirm = null; delete S.custom.items[id]; delete S.progress.lessons[id]; save("custom", "progress"); rebuildLessons(); viewAddClip(v);
  });
}
let clipConfirm = null;

/* ================= routing ================= */
function route() {
  const h = decodeURIComponent((location.hash || "#feed").slice(1));
  if (h.startsWith("lesson-")) return { name: "lesson", id: h.slice(7) };
  return { name: ["feed", "home", "lessons", "vocab", "review", "stats", "profile", "addclip"].includes(h) ? h : "feed" };
}
let viewCleanup = null;
function render() {
  stopSpeech(); flushTime(); closeSheet(true);
  if (viewCleanup) { viewCleanup(); viewCleanup = null; }
  if (dialogCleanup) { dialogCleanup(); dialogCleanup = null; }
  const r = route();
  const nav = r.name === "lesson" || r.name === "addclip" ? "lessons" : r.name === "review" ? "vocab" : r.name;
  $$(".nav a").forEach(a => a.classList.toggle("on", a.dataset.r === nav));
  const v = $("#view");
  v.scrollTop = 0; window.scrollTo(0, 0);
  ({ feed: viewFeed, home: viewHome, lessons: viewLessons, lesson: viewLesson, vocab: viewVocab, review: viewReview, stats: viewStats, profile: viewProfile, addclip: viewAddClip })[r.name](v, r);
}
addEventListener("hashchange", render);

function applyChrome() {
  const app = $("#app");
  app.dir = ui() === "de" ? "ltr" : "rtl"; app.lang = ui();
  document.documentElement.lang = ui();
  const th = S.profile.theme;
  if (th === "light" || th === "dark") document.documentElement.dataset.dfTheme = th;
  else delete document.documentElement.dataset.dfTheme;
  $("#nav").innerHTML = [["feed", IC.play, "nav_feed"], ["home", IC.home, "nav_home"], ["lessons", IC.book, "nav_lessons"], ["vocab", IC.cards, "nav_vocab"], ["stats", IC.chart, "nav_stats"], ["profile", IC.user, "nav_profile"]]
    .map(([r, ic, k]) => `<a href="#${r}" data-r="${r}">${ic}<span>${esc(t(k))}</span></a>`).join("");
  setSync(syncState);
}

/* ================= clip feed (whole scenes, subtitles follow the video) ================= */
// One card per video lesson, plus stand-alone scenes in window.DF_FEED ({id, yt, start, end, src, lines:[[t, de, ar]], keys:[[de, ar]], auto}).
let FEED = [];
function buildFeed() {
  const fromLessons = LESSONS.filter(l => l.video).map(l => ({
    id: l.id, yt: l.video.yt, start: l.video.start ?? l.video.t[0], end: l.video.end, src: l.src || ["", ""], title: l.title, lesson: l.id,
    lines: l.L.map((x, i) => [l.video.t[i], x[1], x[2]]), keys: (l.E || []).map(([d, a]) => [d, a])
  }));
  const extra = (window.DF_FEED || []).map(c => ({ ...c, src: c.src || ["", ""], keys: c.keys || [] }));
  FEED = [];
  const n = Math.max(fromLessons.length, extra.length);
  for (let i = 0; i < n; i++) { if (extra[i]) FEED.push(extra[i]); if (fromLessons[i]) FEED.push(fromLessons[i]); }
}
const fmtLen = s => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;
function viewFeed(v) {
  if (!FEED.length) buildFeed();
  const P = S.profile;
  const seen = (S.progress.feed ||= { seen: {} }).seen;
  const first = Math.max(0, FEED.findIndex(it => !seen[it.id]));
  document.body.classList.add("feedmode");
  v.innerHTML = `<div class="feed ${P.showDe ? "" : "hide-de"} ${P.showAr ? "" : "hide-ar"}" id="feed">
    <div class="ftop"><span class="fcount" id="fCount"></span>
      <button class="fchip2 ${P.showDe ? "on" : ""}" id="fDe" lang="de">DE</button><button class="fchip2 ${P.showAr ? "on" : ""}" id="fAr">ع</button></div>
    ${FEED.map((it, i) => `<article class="fcard" data-i="${i}">
      <div class="fvid" style="background-image:url('https://i.ytimg.com/vi/${encodeURIComponent(it.yt)}/hqdefault.jpg')"><div class="fyt"></div>
        <button class="fplay" aria-label="${esc(t("play"))}">${IC.play}</button><div class="fmsg" hidden></div>
        <div class="fbar"><i></i></div></div>
      <div class="finfo">
        <div class="fhead"><span class="fsrc" lang="de" dir="ltr">${esc(it.src.filter(Boolean).join(" · "))}${it.auto ? ` <i>${esc(t("feed_auto_short"))}</i>` : ""}</span><span class="flen">${fmtLen(it.end - it.start)}</span></div>
        <h2 class="ftitle" lang="de" dir="ltr">${esc(it.title || "")}</h2>
        <button class="fline" data-a="info"><p class="fde" lang="de" dir="ltr">${esc(it.lines[0][1])}</p><p class="far" lang="ar" dir="rtl">${esc(it.lines[0][2] || "")}</p></button>
        ${it.keys.length ? `<div class="fkeys">${it.keys.slice(0, 4).map(([d, a]) => `<button class="fk ${isSaved(d) ? "done" : ""}" data-key="${esc(d)}" title="${esc(a)}"><b lang="de" dir="ltr">${esc(d)}</b><span lang="ar" dir="rtl">${esc(a)}</span></button>`).join("")}</div>` : ""}
        <div class="fact">
          <button data-a="rep">${IC.repeat}<span>${esc(t("repeat"))}</span></button>
          <button data-a="slow"><b>0.75×</b><span>${esc(t("slow"))}</span></button>
          <button data-a="save">${IC.bookmark}<span>${esc(t("save_sentence"))}</span></button>
          ${it.lesson ? `<a href="#lesson-${it.lesson}">${IC.book}<span>${esc(t("feed_ex"))}</span></a>` : `<button data-a="info">${IC.mic}<span>${esc(t("feed_practice"))}</span></button>`}
        </div>
      </div></article>`).join("")}
    <article class="fcard fend"><div class="finfo"><h2 class="h2">${esc(t("feed_end"))}</h2><a class="btn primary big" href="#lessons">${esc(t("nav_lessons"))}</a></div></article>
  </div>`;
  const feed = $("#feed", v);
  const fit = () => { feed.style.height = Math.max(320, innerHeight - $(".top").offsetHeight - $("#nav").offsetHeight) + "px"; };
  fit(); addEventListener("resize", fit);
  let cur = -1, yp = null, timer = null, dead = false, rate = 1, li = 0, stopAt = null;
  const card = i => $(`.fcard[data-i="${i}"]`, feed);
  const stopPlayer = () => { clearInterval(timer); timer = null; try { yp && yp.destroy(); } catch (e) {} yp = null; $$(".fcard.playing", feed).forEach(c => c.classList.remove("playing")); };
  const showLine = (c, it, j) => { li = j; const x = it.lines[j]; $(".fde", c).textContent = x[1]; $(".far", c).textContent = x[2] || ""; };
  const lineEnd = (it, j) => it.lines[j + 1] ? it.lines[j + 1][0] : it.end;
  const activate = i => {
    if (i === cur || dead) return;
    stopPlayer(); cur = i; rate = 1; stopAt = null;
    $("#fCount").textContent = `${i + 1} / ${FEED.length}`;
    const it = FEED[i]; const c = card(i); if (!it || !c) return;
    showLine(c, it, 0);
    if (!seen[it.id]) { seen[it.id] = Date.now(); save("progress"); }
    loadYT().then(YT => {
      if (dead || cur !== i) return;
      const box = document.createElement("div"); $(".fyt", c).replaceChildren(box);
      yp = new YT.Player(box, { videoId: it.yt, width: "100%", height: "100%",
        playerVars: { start: Math.floor(it.start), end: Math.ceil(it.end), autoplay: 1, controls: 0, rel: 0, playsinline: 1, modestbranding: 1, cc_load_policy: 0, iv_load_policy: 3, disablekb: 1, fs: 0, hl: ui() },
        events: {
          onStateChange: e => { if (e.data === 1) { c.classList.add("playing"); lastInput = Date.now(); } else if (e.data === 2 || e.data === 0) c.classList.remove("playing"); },
          onError: e => { c.classList.remove("playing"); const m = $(".fmsg", c); m.hidden = false; m.innerHTML = `<b>${esc(t([100, 101, 150].includes(e.data) ? "video_gone" : "video_blocked"))}</b>`; }
        } });
      timer = setInterval(() => {
        try {
          if (!yp || !yp.getCurrentTime) return;
          const tt = yp.getCurrentTime();
          let j = 0; it.lines.forEach((x, k) => { if (x[0] <= tt + 0.08) j = k; });
          if (j !== li) showLine(c, it, j);
          $(".fbar i", c).style.width = Math.min(100, Math.max(0, (tt - it.start) / (it.end - it.start) * 100)) + "%";
          if (stopAt !== null && tt >= stopAt - 0.05) { yp.pauseVideo(); stopAt = null; }
          if (tt >= it.end - 0.05 && yp.getPlayerState() === 1) yp.pauseVideo();
        } catch (x) {}
      }, 200);
    }).catch(() => { if (cur === i) { const m = $(".fmsg", c); m.hidden = false; m.innerHTML = `<b>${esc(t("video_blocked"))}</b>`; } });
  };
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting && e.intersectionRatio > 0.6 && e.target.dataset.i) activate(+e.target.dataset.i); }), { root: feed, threshold: [0.6] });
  $$(".fcard[data-i]", feed).forEach(c => io.observe(c));
  feed.addEventListener("click", e => {
    const c = e.target.closest(".fcard[data-i]"); if (!c) return;
    const i = +c.dataset.i, it = FEED[i];
    if (i !== cur) activate(i);
    const k = e.target.closest("[data-key]");
    if (k) { const x = it.keys.find(([d]) => d === k.dataset.key); if (x && saveVocab({ de: x[0], ar: x[1], exDe: it.lines[li][1], lesson: it.lesson || "", type: "word" })) { k.classList.add("done"); toast(t("saved")); } return; }
    const a = e.target.closest("[data-a]");
    if (!a) {
      if (e.target.closest(".fvid") && yp && yp.getPlayerState) {
        const st = yp.getPlayerState(); stopAt = null;
        if (st === 1) yp.pauseVideo(); else { if (yp.getCurrentTime() >= it.end - 0.3) yp.seekTo(it.start, true); yp.playVideo(); }
      }
      return;
    }
    if (a.dataset.a === "rep" && yp && yp.seekTo) { stopAt = lineEnd(it, li); yp.seekTo(Math.max(0, it.lines[li][0] - 0.15), true); yp.playVideo(); }
    else if (a.dataset.a === "slow") { rate = rate === 0.75 ? 1 : 0.75; try { yp && yp.setPlaybackRate(rate); } catch (x) {} a.classList.toggle("on", rate === 0.75); }
    else if (a.dataset.a === "save") { const x = it.lines[li]; if (saveVocab({ de: x[1], ar: x[2] || "", exDe: "", lesson: it.lesson || "", type: "sentence" })) toast(t("saved")); }
    else if (a.dataset.a === "info") {
      if (yp && yp.pauseVideo) yp.pauseVideo();
      const l = it.lesson && LMAP[it.lesson];
      if (l) openLineSheet(l, li);
      else { const x = it.lines[li]; const sh = openSheet(`<div class="eyebrow" lang="de" dir="ltr">${esc(it.src.filter(Boolean).join(" · "))}</div><p class="big-de" lang="de" dir="ltr">${esc(x[1])}</p><p class="big-ar" lang="ar" dir="rtl">${esc(x[2] || "")}</p>${it.auto ? `<p class="muted small">${esc(t("feed_auto"))}</p>` : ""}${saveBtn(x[1], t("save_sentence"))}${recorderHTML()}`);
        $$("[data-save]", sh).forEach(b => b.onclick = () => { if (saveVocab({ de: x[1], ar: x[2] || "", exDe: "", lesson: "", type: "sentence" })) { b.disabled = true; b.classList.add("done"); } }); bindRecorder(sh, x[1]); }
    }
  });
  const tg = (id, key, cls) => $(id, v).onclick = e => { P[key] = !P[key]; e.currentTarget.classList.toggle("on", P[key]); feed.classList.toggle(cls, !P[key]); save("profile"); };
  tg("#fDe", "showDe", "hide-de"); tg("#fAr", "showAr", "hide-ar");
  requestAnimationFrame(() => { const c = card(first); if (c) feed.scrollTop = c.offsetTop; activate(first); });
  viewCleanup = () => { dead = true; io.disconnect(); stopPlayer(); removeEventListener("resize", fit); document.body.classList.remove("feedmode"); };
}

/* ================= views ================= */
function viewHome(v) {
  const done = doneCount(), due = dueItems().length, nv = Object.keys(S.vocab.items).length;
  const last = S.progress.last && LMAP[S.progress.last];
  const nxt = nextLesson(); const st = streaks();
  const tSec = (S.activity.days[dayKey()]?.sec || 0) + pendingSec;
  const goalPct = Math.min(100, Math.round(tSec / (DAILY_GOAL_MIN * 60) * 100));
  const week = lastNDays(7);
  const goalNs = GOAL_LESSONS[S.profile.goal] || [];
  const rec = LESSONS.filter(l => goalNs.includes(l.n) && !S.progress.lessons[l.id]?.done).slice(0, 3);
  v.innerHTML = `
  <section class="hero">
    <div class="hero-top"><span class="eyebrow">${esc(t("level_now"))}</span><span class="lvl" lang="de">B2</span></div>
    <h1 lang="de" dir="ltr" class="hero-title">${esc(nxt.title)}</h1>
    <p class="hero-sub">${esc(nxt.topic[ui() === "de" ? 1 : 0])} · ${esc(nxt.sum[ui() === "de" ? 1 : 0])}</p>
    <a class="btn primary big" href="#lesson-${nxt.id}">${IC.play}<span>${esc(done || S.progress.last ? t("continue") : t("start_first"))}</span></a>
    <div class="goalbar"><div class="gl"><span>${esc(t("today_goal"))}</span><b>${Math.round(tSec / 60)} / ${DAILY_GOAL_MIN} ${esc(t("min_short"))}</b></div><div class="track"><i style="width:${goalPct}%"></i></div></div>
  </section>
  <section class="tiles">
    <div class="tile"><b>${done}<small>/${LESSONS.length}</small></b><span>${esc(t("lessons_done"))}</span><div class="track sm"><i style="width:${done / LESSONS.length * 100}%"></i></div></div>
    <a class="tile" href="#vocab"><b>${nv}</b><span>${esc(t("saved_vocab"))}</span></a>
    <a class="tile ${due ? "hot" : ""}" href="#review"><b>${due}</b><span>${esc(t("due_today"))}</span></a>
    <div class="tile"><b>${st.cur}</b><span>${esc(t("streak"))}</span></div>
  </section>
  ${last ? `<section class="block"><h2 class="h2">${esc(t("last_opened"))}</h2>${lessonCard(last)}</section>` : ""}
  ${LESSONS.some(l => l.src) ? `<section class="block"><div class="row-between"><h2 class="h2">${esc(t("real_scenes"))}</h2><a class="btn sm" href="#lessons">${esc(t("all"))}</a></div><p class="muted small">${esc(t("real_scenes_sub"))}</p><div class="lgrid">${LESSONS.filter(l => l.src && !S.progress.lessons[l.id]?.done).slice(0, 3).map(lessonCard).join("") || LESSONS.filter(l => l.src).slice(0, 3).map(lessonCard).join("")}</div></section>` : ""}
  <section class="block card">
    <div class="row-between"><h2 class="h2">${esc(t("last7"))}</h2><span class="muted">${fmtMin(week.reduce((a, x) => a + x.v.sec, 0) + pendingSec)}</span></div>
    ${barChart(week)}
  </section>
  ${rec.length ? `<section class="block"><h2 class="h2">${esc(t("for_goal"))}: ${esc(t("g_" + S.profile.goal))}</h2><div class="lgrid">${rec.map(lessonCard).join("")}</div></section>` : ""}`;
}

let lessonFilter = "all";
function viewLessons(v) {
  const goalNs = GOAL_LESSONS[S.profile.goal] || [];
  const list = LESSONS.filter(l => {
    const d = S.progress.lessons[l.id]?.done;
    return lessonFilter === "all" || (lessonFilter === "goal" && goalNs.includes(l.n)) || (lessonFilter === "open" && !d) || (lessonFilter === "done" && d);
  });
  v.innerHTML = `
  <header class="phead"><h1 class="h1">${esc(t("lessons_title"))}</h1><p class="muted">${esc(t("lessons_sub"))}</p>
    <div class="track"><i style="width:${doneCount() / LESSONS.length * 100}%"></i></div></header>
  <div class="chips" role="tablist">${[["all", t("all")], ["goal", t("g_" + S.profile.goal)], ["open", t("open_l")], ["done", t("done_l")]]
    .map(([k, lab]) => `<button class="fchip ${lessonFilter === k ? "on" : ""}" data-f="${k}" role="tab" aria-selected="${lessonFilter === k}">${esc(lab)}</button>`).join("")}</div>
  <div class="lgrid">${list.map(lessonCard).join("") || `<p class="muted">${esc(t("no_data"))}</p>`}</div>
  <section class="block"><div class="row-between"><h2 class="h2">${esc(t("my_clips"))}</h2><a class="btn sm primary" href="#addclip">+ ${esc(t("add_clip"))}</a></div>
    ${CUSTOM.length ? `<div class="lgrid">${CUSTOM.map(lessonCard).join("")}</div>` : `<p class="muted small">${esc(t("my_clips_empty"))}</p>`}</section>
  <p class="note">${esc(t("c1_note"))}</p>`;
  $$(".fchip", v).forEach(b => b.onclick = () => { lessonFilter = b.dataset.f; viewLessons(v); });
}

/* ----- lesson ----- */
const LS = { id: null, cur: 0, playing: false, finished: false, tab: "dialog" };
function viewLesson(v, r) {
  const l = LMAP[r.id];
  if (!l) { location.hash = "lessons"; return; }
  if (LS.id !== l.id) Object.assign(LS, { id: l.id, cur: 0, playing: false, finished: false, tab: "dialog" });
  const p = LP(l.id);
  if (!p.opened) p.opened = Date.now();
  p.lastOpen = Date.now(); S.progress.last = l.id; save("progress");
  const idx = l.custom ? -1 : LESSONS.indexOf(l);
  v.innerHTML = `
  <header class="lhead">
    <a class="iconbtn" href="#lessons" aria-label="${esc(t("to_lessons"))}">${IC.back}</a>
    <div class="lhead-txt"><span class="eyebrow">${l.custom ? "" : "B2 · " + String(l.n).padStart(2, "0") + " · "}${esc(l.topic[ui() === "de" ? 1 : 0])}</span>
      <h1 class="h1" lang="de" dir="ltr">${esc(l.title)}</h1></div>
  </header>
  <p class="muted lsum">${esc(l.sum[ui() === "de" ? 1 : 0])}</p>
  <div class="tabs" role="tablist">
    ${(l.E.length ? ["dialog", "ex", "expr"] : ["dialog", "ex"]).map(k => `<button class="tab ${LS.tab === k ? "on" : ""}" data-tab="${k}" role="tab" aria-selected="${LS.tab === k}">${esc(t("tab_" + k))}</button>`).join("")}
  </div>
  <div id="lbody"></div>
  <nav class="lnav">${idx > 0 ? `<a class="btn ghost" href="#lesson-${LESSONS[idx - 1].id}">${esc(t("prev"))}</a>` : "<span></span>"}
    ${idx >= 0 && idx < LESSONS.length - 1 ? `<a class="btn ghost" href="#lesson-${LESSONS[idx + 1].id}">${esc(t("next_lesson"))}</a>` : ""}</nav>`;
  $$(".tab", v).forEach(b => b.onclick = () => { stopSpeech(); LS.tab = b.dataset.tab; $$(".tab", v).forEach(x => { x.classList.toggle("on", x === b); x.setAttribute("aria-selected", x === b); }); renderLessonTab(l); });
  renderLessonTab(l);
}
function renderLessonTab(l) {
  if (dialogCleanup) { dialogCleanup(); dialogCleanup = null; }
  const box = $("#lbody");
  if (LS.tab === "dialog") renderDialog(l, box);
  else if (LS.tab === "ex") renderExercises(l, box);
  else renderExpr(l, box);
}
let dialogCleanup = null;
function renderDialog(l, box) {
  const P = S.profile;
  const v = l.video && !l._videoFailed ? l.video : null;
  const names = Object.entries(l.sp).filter(([, [n]]) => n);
  const rates = v ? [0.5, 0.75, 1, 1.25] : [0.6, 0.8, 1, 1.2];
  const nearest = rates.reduce((a, r) => Math.abs(r - P.rate) < Math.abs(a - P.rate) ? r : a, 1);
  box.innerHTML = `
  <section class="player ${v ? "vplayer" : ""} ${P.showDe ? "" : "hide-de"} ${P.showAr ? "" : "hide-ar"}" id="player">
    ${v ? `<div class="vbox"><div id="yt"></div><div class="vmsg" id="vmsg">${esc(t("video_loading"))}</div></div>` : ""}
    ${names.length ? `<div class="cast">${names.map(([k, [n]]) => `<span class="who" data-k="${k}"><i lang="de">${esc(n[0])}</i><b lang="de" dir="ltr">${esc(n)}</b></span>`).join("")}</div>` : ""}
    <div class="stage">
      <div class="spk" lang="de" dir="ltr"></div>
      <p class="de-line" lang="de" dir="ltr"></p>
      <p class="de-hidden">${esc(t("hidden_de"))}</p>
      <p class="ar-line" dir="rtl" lang="ar"></p>
    </div>
    <div class="dots" dir="ltr">${l.L.map((_, i) => `<button class="dot" data-i="${i}" aria-label="${i + 1}"></button>`).join("")}</div>
    <div class="pctl" dir="ltr">
      <button class="iconbtn" id="pPrev" aria-label="${esc(t("prev"))}">${IC.prev}</button>
      <button class="iconbtn" id="pRep" aria-label="${esc(t("repeat"))}">${IC.repeat}</button>
      <button class="playbtn" id="pPlay" aria-label="${esc(t("play"))}">${IC.play}</button>
      <button class="iconbtn" id="pNext" aria-label="${esc(t("next"))}">${IC.next}</button>
      <label class="speed"><span class="sr">${esc(t("speed"))}</span><select id="pRate">${rates.map(r => `<option value="${r}" ${nearest === r ? "selected" : ""}>${r}×</option>`).join("")}</select></label>
    </div>
    <div class="toggles">
      <label class="tgl"><input type="checkbox" id="tDe" ${P.showDe ? "checked" : ""}><span>${esc(t("show_de"))}</span></label>
      <label class="tgl"><input type="checkbox" id="tAr" ${P.showAr ? "checked" : ""}><span>${esc(t("show_ar"))}</span></label>
    </div>
    <p class="demo">${v ? `${esc(t("video_source"))} <a href="https://www.youtube.com/watch?v=${encodeURIComponent(v.yt)}&t=${Math.floor(v.start || 0)}s" target="_blank" rel="noopener">YouTube</a>${l.src ? ` · <span lang="de" dir="ltr">${esc(l.src[0])} – ${esc(l.src[1])}</span>` : ""}` : esc(l._videoFailed ? t("video_fallback") : t("demo_audio"))}</p>
  </section>
  <p class="muted hint">${esc(t("tap_line"))}</p>
  <ol class="transcript ${P.showDe ? "" : "hide-de"} ${P.showAr ? "" : "hide-ar"}" id="tr">
    ${l.L.map((x, i) => `<li><button class="tline" data-i="${i}">
      ${l.sp[x[0]][0] ? `<span class="tspk" lang="de" dir="ltr">${esc(l.sp[x[0]][0])}</span>` : v ? `<span class="tspk" dir="ltr">${fmtClock(v.t[i])}</span>` : ""}
      <span class="tde" lang="de" dir="ltr">${wordsHTML(x[1])}</span>
      ${x[2] ? `<span class="tar" lang="ar" dir="rtl">${esc(x[2])}</span>` : ""}</button></li>`).join("")}
  </ol>`;
  const player = $("#player"), tr = $("#tr");
  const show = (i, active) => {
    LS.cur = i; const x = l.L[i];
    $(".spk", player).textContent = l.sp[x[0]][0];
    $(".de-line", player).innerHTML = wordsHTML(x[1]);
    $(".ar-line", player).textContent = x[2];
    $$(".who", player).forEach(w => w.classList.toggle("talk", !!active && w.dataset.k === x[0]));
    $$(".dot", player).forEach((d, j) => { d.classList.toggle("done", j < i); d.classList.toggle("now", j === i); });
    $$(".tline", tr).forEach((b, j) => b.classList.toggle("now", j === i));
  };
  const setPlaying = on => { LS.playing = on; $("#pPlay").innerHTML = on ? IC.pause : IC.play; $("#pPlay").setAttribute("aria-label", t(on ? "pause" : "play")); if (!on) $$(".who", player).forEach(w => w.classList.remove("talk")); };
  const listened = () => { LS.finished = true; const p = LP(l.id); if (!p.listened) { p.listened = Date.now(); save("progress"); } };
  const engine = v ? videoEngine(l, v, { player, show, setPlaying, listened, rate: nearest }) : ttsEngine(l, { player, show, setPlaying, listened });
  const onStop = () => { if (!player.isConnected) { document.removeEventListener("df:stop", onStop); return; } engine.pause(); };
  document.addEventListener("df:stop", onStop);
  dialogCleanup = () => { document.removeEventListener("df:stop", onStop); engine.destroy(); };
  show(LS.cur, false);
  $("#pPlay").onclick = () => { if (LS.playing) return engine.pause(); const from = LS.finished ? 0 : LS.cur; LS.finished = false; engine.play(from); };
  $("#pRep").onclick = () => engine.repeat(LS.cur);
  const jump = i => { if (LS.playing) engine.play(i); else { engine.pause(); show(i); engine.cue(i); } };
  $("#pPrev").onclick = () => jump(Math.max(0, LS.cur - 1));
  $("#pNext").onclick = () => jump(Math.min(l.L.length - 1, LS.cur + 1));
  $$(".dot", player).forEach(d => d.onclick = () => jump(+d.dataset.i));
  $("#pRate").onchange = e => { S.profile.rate = +e.target.value; save("profile"); engine.setRate(+e.target.value); };
  $("#tDe").onchange = e => { S.profile.showDe = e.target.checked; player.classList.toggle("hide-de", !e.target.checked); tr.classList.toggle("hide-de", !e.target.checked); save("profile"); };
  $("#tAr").onchange = e => { S.profile.showAr = e.target.checked; player.classList.toggle("hide-ar", !e.target.checked); tr.classList.toggle("hide-ar", !e.target.checked); save("profile"); };
  $(".stage", player).onclick = () => { engine.pause(); openLineSheet(l, LS.cur); };
  $$(".tline", tr).forEach(b => b.onclick = () => { engine.pause(); show(+b.dataset.i); engine.cue(+b.dataset.i); openLineSheet(l, +b.dataset.i); });
}

function ttsEngine(l, { player, show, setPlaying, listened }) {
  const sayLine = async (i, my) => {
    show(i, true);
    const x = l.L[i]; const deEl = $(".de-line", player);
    await speak(x[1], { g: l.sp[x[0]][1], onWord: highlighter(deEl) });
    if (my === speechRun) clearHl(deEl);
  };
  const play = async i => {
    stopSpeech(); const my = speechRun; setPlaying(true);
    for (let j = i; j < l.L.length; j++) {
      await sayLine(j, my);
      if (my !== speechRun) return;
      await wait(S.profile.rate < 1 ? 650 : 380);
      if (my !== speechRun) return;
    }
    setPlaying(false); listened();
  };
  return {
    play, pause: () => { if (speaking || LS.playing) { speechRun++; if (synth) synth.cancel(); speaking = false; } setPlaying(false); },
    repeat: i => { stopSpeech(); const my = speechRun; sayLine(i, my); },
    cue: () => {}, setRate: () => { if (LS.playing) play(LS.cur); }, destroy: () => {}
  };
}

/* YouTube IFrame player. Only the official embed is used: the clip stays on YouTube's servers. */
let ytApi = null;
function loadYT() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (ytApi) return ytApi;
  ytApi = new Promise((res, rej) => {
    const to = setTimeout(() => rej(new Error("timeout")), 9000);
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { clearTimeout(to); if (prev) prev(); res(window.YT); };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    s.onerror = () => { clearTimeout(to); rej(new Error("blocked")); };
    document.head.appendChild(s);
  });
  ytApi.catch(() => { ytApi = null; });
  return ytApi;
}
function videoEngine(l, v, { player, show, setPlaying, listened, rate }) {
  let yp = null, ready = false, timer = null, stopAt = null, dead = false, pendingPlay = null;
  const msg = $("#vmsg", player);
  const lineEnd = i => v.t[i + 1] ?? v.end ?? null;
  const fail = code => {
    const p = LP(l.id); p.videoError = code; p.videoErrorAt = Date.now(); save("progress");
    const unavailable = [100, 101, 150].includes(code);
    msg.hidden = false;
    msg.innerHTML = `<b>${esc(t(unavailable ? "video_gone" : "video_blocked"))}</b><span>${esc(t("video_gone_sub"))}</span>
      <a class="btn sm" href="https://www.youtube.com/watch?v=${encodeURIComponent(v.yt)}&t=${Math.floor(v.start || 0)}s" target="_blank" rel="noopener">YouTube</a>
      ${l.custom ? "" : `<button class="btn sm" id="vFallback">${esc(t("video_use_audio"))}</button>`}`;
    const fb = $("#vFallback", msg);
    if (fb) fb.onclick = () => { l._videoFailed = true; renderLessonTab(l); };
    setPlaying(false);
  };
  const tick = () => {
    if (!ready || dead) return;
    let tt = 0; try { tt = yp.getCurrentTime(); } catch (e) { return; }
    let i = 0; v.t.forEach((x, j) => { if (x <= tt + 0.08) i = j; });
    if (i !== LS.cur) show(i, LS.playing);
    if (stopAt !== null && tt >= stopAt - 0.05) { yp.pauseVideo(); stopAt = null; }
    if (v.end && tt >= v.end - 0.05) { yp.pauseVideo(); listened(); }
  };
  const seekPlay = (i, only) => {
    if (!ready) { pendingPlay = [i, only]; return; }
    stopSpeech();
    stopAt = only ? lineEnd(i) : (v.end ?? null);
    yp.seekTo(Math.max(0, v.t[i] - 0.15), true); yp.playVideo(); show(i, true);
  };
  loadYT().then(YT => {
    if (dead || !player.isConnected) return;
    yp = new YT.Player($("#yt", player), {
      videoId: v.yt, width: "100%", height: "100%",
      playerVars: { start: Math.floor(v.start ?? v.t[0] ?? 0), end: v.end ? Math.ceil(v.end) : undefined, rel: 0, playsinline: 1, modestbranding: 1, cc_load_policy: 0, iv_load_policy: 3, hl: ui() },
      events: {
        onReady: () => { ready = true; msg.hidden = true; try { yp.setPlaybackRate(rate); } catch (e) {} if (pendingPlay) { const [i, o] = pendingPlay; pendingPlay = null; seekPlay(i, o); } },
        onStateChange: e => { if (e.data === 1) { setPlaying(true); lastInput = Date.now(); } else if (e.data === 2 || e.data === 0) { setPlaying(false); if (e.data === 0) listened(); } },
        onError: e => fail(e.data)
      }
    });
    timer = setInterval(tick, 200);
  }).catch(() => { if (!dead) fail("blocked"); });
  return {
    play: i => seekPlay(i, false),
    pause: () => { stopAt = null; if (ready) yp.pauseVideo(); setPlaying(false); },
    repeat: i => seekPlay(i, true),
    cue: i => { if (ready) yp.seekTo(Math.max(0, v.t[i] - 0.15), true); },
    setRate: r => { if (ready) try { yp.setPlaybackRate(r); } catch (e) {} },
    destroy: () => { dead = true; clearInterval(timer); try { yp && yp.destroy(); } catch (e) {} }
  };
}
function fmtClock(s) { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }

/* ----- line detail sheet ----- */
function saveBtn(de, label) { const s = isSaved(de); return `<button class="btn sm ${s ? "done" : ""}" data-save="${esc(de)}" ${s ? "disabled" : ""}>${IC.bookmark}<span>${esc(s ? t("saved") : label || t("save"))}</span></button>`; }
function openLineSheet(l, i) {
  const [k, de, ar, reg, xa, xd, vocab, exa] = l.L[i];
  const g = l.sp[k][1];
  const expl = S.profile.explLang === "de" ? xd : xa;
  const sh = openSheet(`
    <div class="eyebrow" lang="de" dir="ltr">${l.sp[k][0] ? esc(l.sp[k][0]) + " · " : ""}${esc(l.title)}</div>
    <p class="big-de" lang="de" dir="ltr" id="shDe">${wordsHTML(de)}</p>
    ${ar ? `<p class="big-ar" lang="ar" dir="rtl">${esc(ar)}</p>` : ""}
    <div class="row wrap">
      <button class="btn sm" id="shPlay">${IC.speak}<span>${esc(t("listen"))}</span></button>
      <button class="btn sm" id="shSlow">${IC.speak}<span>${esc(t("slow"))}</span></button>
      ${saveBtn(de, t("save_sentence"))}
      ${reg ? `<span class="reg reg-${reg}">${esc(t("register"))}: ${esc(t("reg_" + reg))}</span>` : ""}
    </div>
    ${expl ? `<h3 class="h3">${esc(t("meaning"))}</h3><p lang="${S.profile.explLang}">${esc(expl)}</p>` : ""}
    ${vocab && vocab.length ? `<h3 class="h3">${esc(t("vocab_h"))}</h3><ul class="vlist">${vocab.map(([vd, va]) => `<li><span><b lang="de" dir="ltr">${esc(vd)}</b><small lang="ar" dir="rtl">${esc(va)}</small></span>${saveBtn(vd)}</li>`).join("")}</ul>` : ""}
    ${exa ? `<h3 class="h3">${esc(t("example"))}</h3><div class="exbox"><p lang="de" dir="ltr" id="shEx">${wordsHTML(exa[0])}</p><p class="muted" lang="ar" dir="rtl">${esc(exa[1])}</p><button class="btn sm" id="shExPlay">${IC.speak}<span>${esc(t("listen"))}</span></button></div>` : ""}
    ${recorderHTML()}`);
  const deEl = $("#shDe", sh);
  $("#shPlay", sh).onclick = () => sayInto(de, deEl, { g });
  $("#shSlow", sh).onclick = () => sayInto(de, deEl, { g, rate: 0.6 });
  if (exa) $("#shExPlay", sh).onclick = () => sayInto(exa[0], $("#shEx", sh), { g });
  $$("[data-save]", sh).forEach(b => b.onclick = () => {
    const d = b.dataset.save;
    const v = (vocab || []).find(x => x[0] === d);
    const item = v ? { de: v[0], ar: v[1], exDe: de, lesson: l.id, type: "word" } : { de, ar, exDe: exa ? exa[0] : "", lesson: l.id, type: "sentence" };
    if (saveVocab(item)) { b.disabled = true; b.classList.add("done"); $("span", b).textContent = t("saved"); }
  });
  bindRecorder(sh, de, g);
}
function recorderHTML() {
  return `<section class="rec"><h3 class="h3">${IC.mic} ${esc(t("rec_title"))}</h3><p class="muted small">${esc(t("rec_hint"))}</p>
    <div class="row wrap"><label class="btn sm primary" for="recFile">${IC.mic}<span>${esc(t("rec_btn"))}</span></label>
    <input type="file" id="recFile" accept="audio/*" capture class="visually-hidden"></div>
    <div id="recOut" hidden></div><p class="muted small">${esc(t("rec_note"))}</p></section>`;
}
let recUrl = null;
function bindRecorder(root, de, g) {
  const input = $("#recFile", root), out = $("#recOut", root);
  input.onchange = () => {
    const f = input.files && input.files[0]; if (!f) return;
    if (recUrl) URL.revokeObjectURL(recUrl);
    recUrl = URL.createObjectURL(f);
    out.hidden = false;
    out.innerHTML = `<div class="cmp"><div><span class="eyebrow">${esc(t("rec_model"))}</span><p lang="de" dir="ltr" class="cmp-de">${esc(de)}</p><button class="btn sm" id="recModel">${IC.speak}<span>${esc(t("listen"))}</span></button></div>
      <div><span class="eyebrow">${esc(t("rec_yours"))}</span><audio controls src="${recUrl}"></audio></div></div>`;
    $("#recModel", out).onclick = () => sayInto(de, null, { g });
    input.value = "";
  };
}

/* ----- expressions tab ----- */
function renderExpr(l, box) {
  box.innerHTML = `<p class="muted">${esc(t("expr_sub"))}</p><ul class="exprs">${l.E.map(([d, a, e], i) => `
    <li class="card"><div class="row-between"><b class="xde" lang="de" dir="ltr">${esc(d)}</b>${saveBtn(d)}</div>
    <p lang="ar" dir="rtl">${esc(a)}</p><p class="muted" lang="de" dir="ltr" id="xe${i}">${wordsHTML(e)}</p>
    <button class="btn sm" data-x="${i}">${IC.speak}<span>${esc(t("listen"))}</span></button></li>`).join("")}</ul>`;
  $$("[data-x]", box).forEach(b => b.onclick = () => { const i = +b.dataset.x; sayInto(l.E[i][2], $("#xe" + i, box)); });
  $$("[data-save]", box).forEach(b => b.onclick = () => {
    const e = l.E.find(x => x[0] === b.dataset.save);
    if (saveVocab({ de: e[0], ar: e[1], exDe: e[2], lesson: l.id, type: "expression" })) { b.disabled = true; b.classList.add("done"); $("span", b).textContent = t("saved"); }
  });
}

/* ----- exercises ----- */
const ES = {};
function renderExercises(l, box) {
  const st = ES[l.id];
  const p = S.progress.lessons[l.id] || {};
  if (!l.Q.length) { box.innerHTML = `<p class="muted">${esc(t("no_ex"))}</p>`; return; }
  if (!st) {
    box.innerHTML = `<section class="card center"><h2 class="h2">${esc(t("ex_title"))}</h2>
      <p class="muted">${l.Q.map(q => esc(t("k_" + q.k))).join(" · ")}</p>
      ${p.done ? `<p>${esc(t("best"))}: <b>${p.best}%</b></p>` : ""}
      <button class="btn primary" id="exGo">${esc(p.done ? t("ex_again") : t("ex_start"))}</button></section>`;
    $("#exGo").onclick = () => { ES[l.id] = { i: 0, first: [], tries: 0 }; renderExercises(l, box); };
    return;
  }
  if (st.i >= l.Q.length) return renderResult(l, box);
  const q = l.Q[st.i];
  const qid = l.id + ":" + st.i;
  box.innerHTML = `<section class="excard">
    <div class="row-between"><span class="eyebrow">${esc(t("q_of", st.i + 1, l.Q.length))} · ${esc(t("k_" + q.k))}</span></div>
    <div class="track"><i style="width:${st.i / l.Q.length * 100}%"></i></div>
    <div id="qbody"></div><div id="fb" class="fb" hidden></div>
    <div class="row-end" id="qnav"></div></section>`;
  const qb = $("#qbody", box), fb = $("#fb", box), nav = $("#qnav", box);
  const record = ok => {
    if (st.tries === 0) {
      st.first[st.i] = ok;
      const d = today(); d.ex++; if (ok) d.ok++;
      const kk = S.activity.kinds[q.k] || (S.activity.kinds[q.k] = { n: 0, wrong: 0 });
      kk.n++; if (!ok) { kk.wrong++; S.activity.wrong[qid] = (S.activity.wrong[qid] || 0) + 1; }
      flushTime(); save("activity");
    }
    st.tries++;
  };
  const feedback = (ok, retry) => {
    fb.hidden = false; fb.className = "fb " + (ok ? "good" : "bad");
    fb.innerHTML = `<b>${esc(ok ? t("correct") : t("wrong"))}</b><p lang="${S.profile.explLang}">${esc(ex(q.w))}</p>
      <button class="linkbtn" id="fbOther">${esc(t(S.profile.explLang === "de" ? "show_other_ar" : "show_other_de"))}</button><p class="other" hidden lang="${S.profile.explLang === "de" ? "ar" : "de"}">${esc(exOther(q.w))}</p>`;
    $("#fbOther", fb).onclick = e => { e.target.hidden = true; $(".other", fb).hidden = false; };
    nav.innerHTML = (ok ? "" : `<button class="btn ghost" id="qRetry">${esc(t("try_again"))}</button>`) +
      `<button class="btn primary" id="qNext">${esc(st.i === l.Q.length - 1 ? t("finish") : t("next_q"))}</button>`;
    if (!ok) $("#qRetry", nav).onclick = retry;
    $("#qNext", nav).onclick = () => { st.i++; st.tries = 0; renderExercises(l, box); };
  };
  if (q.o) {
    const opts = shuffle(q.o.map((o, i) => ({ o, i })));
    qb.innerHTML = `${q.k === "listen" ? `<button class="btn sm" id="qListen">${IC.speak}<span>${esc(t("replay_dialog"))}</span></button>` : ""}
      <p class="qtext" lang="de" dir="ltr">${esc(q.q).replace("___", '<span class="gap">_____</span>')}</p>
      <div class="opts">${opts.map(x => `<button class="opt" data-i="${x.i}" lang="de" dir="ltr">${esc(x.o)}</button>`).join("")}</div>`;
    if (q.k === "listen") $("#qListen", qb).onclick = async () => { stopSpeech(); const my = speechRun; for (const x of l.L) { await speak(x[1], { g: l.sp[x[0]][1] }); if (my !== speechRun) return; await wait(300); } };
    const reset = () => { fb.hidden = true; nav.innerHTML = ""; $$(".opt", qb).forEach(b => { b.disabled = false; b.className = "opt"; }); };
    $$(".opt", qb).forEach(b => b.onclick = () => {
      stopSpeech();
      const ok = +b.dataset.i === q.a; record(ok);
      $$(".opt", qb).forEach(x => { x.disabled = true; if (+x.dataset.i === q.a && ok) x.classList.add("right"); });
      b.classList.add(ok ? "right" : "wrongpick");
      if (ok && q.k === "gap") { const g = $(".gap", qb); if (g) g.textContent = q.o[q.a]; }
      feedback(ok, reset);
    });
  } else if (q.p) {
    const left = shuffle(q.p.map((x, i) => ({ s: x[0], i }))), right = shuffle(q.p.map((x, i) => ({ s: x[1], i })));
    const rightIsDe = !/[؀-ۿ]/.test(q.p[0][1]);
    qb.innerHTML = `<p class="muted">${esc(t("match_hint"))}</p><div class="match">
      <div class="col">${left.map(x => `<button class="mt" data-side="l" data-i="${x.i}" lang="de" dir="ltr">${esc(x.s)}</button>`).join("")}</div>
      <div class="col">${right.map(x => `<button class="mt" data-side="r" data-i="${x.i}" ${rightIsDe ? 'lang="de" dir="ltr"' : 'lang="ar" dir="rtl"'}>${esc(x.s)}</button>`).join("")}</div></div>`;
    let sel = null, matched = 0, anyWrong = false;
    $$(".mt", qb).forEach(b => b.onclick = () => {
      if (b.classList.contains("locked")) return;
      if (b.dataset.side === "l") { $$('.mt[data-side="l"]', qb).forEach(x => x.classList.remove("sel")); b.classList.add("sel"); sel = b; return; }
      if (!sel) { b.classList.add("shake"); setTimeout(() => b.classList.remove("shake"), 400); return; }
      if (sel.dataset.i === b.dataset.i) { sel.classList.remove("sel"); sel.classList.add("locked"); b.classList.add("locked"); sel.disabled = b.disabled = true; sel = null; matched++; }
      else { anyWrong = true; b.classList.add("shake", "wrongpick"); setTimeout(() => b.classList.remove("shake", "wrongpick"), 600); }
      if (matched === q.p.length) { record(!anyWrong); feedback(true, null); if (anyWrong) { fb.className = "fb mixed"; } }
    });
  } else if (q.s) {
    const words = q.s.split(" ");
    let pool = shuffle(words.map((w, i) => ({ w, i })));
    for (let n = 0; n < 5 && pool.map(x => x.w).join(" ") === q.s; n++) pool = shuffle(pool);
    const picked = [];
    const draw = () => {
      qb.innerHTML = `<p class="muted">${esc(t("order_hint"))}</p>
        <div class="answer" lang="de" dir="ltr">${picked.map((x, j) => `<button class="tok on" data-j="${j}">${esc(x.w)}</button>`).join("") || '<span class="muted">…</span>'}</div>
        <div class="pool" lang="de" dir="ltr">${pool.map((x, j) => `<button class="tok" data-p="${j}" ${x.used ? "disabled" : ""}>${esc(x.w)}</button>`).join("")}</div>
        <div class="row-end"><button class="btn ghost sm" id="oReset">${esc(t("reset"))}</button><button class="btn primary sm" id="oCheck" ${picked.length === words.length ? "" : "disabled"}>${esc(t("check"))}</button></div>`;
      $$("[data-p]", qb).forEach(b => b.onclick = () => { const x = pool[+b.dataset.p]; x.used = true; picked.push(x); draw(); });
      $$("[data-j]", qb).forEach(b => b.onclick = () => { const x = picked.splice(+b.dataset.j, 1)[0]; x.used = false; draw(); });
      $("#oReset", qb).onclick = () => { picked.length = 0; pool.forEach(x => { x.used = false; }); fb.hidden = true; nav.innerHTML = ""; draw(); };
      $("#oCheck", qb).onclick = () => {
        const ok = picked.map(x => x.w).join(" ") === q.s; record(ok);
        $$(".tok", qb).forEach(b => { b.disabled = true; });
        $(".answer", qb).classList.add(ok ? "right" : "wrongpick");
        if (!ok) $(".answer", qb).insertAdjacentHTML("afterend", `<p class="solution" lang="de" dir="ltr">✓ ${esc(q.s)}</p>`);
        feedback(ok, () => { picked.length = 0; pool.forEach(x => { x.used = false; }); fb.hidden = true; nav.innerHTML = ""; draw(); });
        if (ok) sayInto(q.s, null);
      };
    };
    draw();
  }
}
function renderResult(l, box) {
  const st = ES[l.id];
  const right = st.first.filter(Boolean).length, total = l.Q.length, pct = Math.round(right / total * 100);
  if (!st.saved) {
    st.saved = true;
    const p = LP(l.id), firstTime = !p.done;
    p.done = true; p.attempts = (p.attempts || 0) + 1; p.last = pct; p.best = Math.max(p.best || 0, pct); p.doneAt = p.doneAt || Date.now();
    if (firstTime) today().lessons++;
    flushTime(); save("progress", "activity");
  }
  const idx = LESSONS.indexOf(l);
  box.innerHTML = `<section class="card center result">
    <span class="eyebrow">${esc(t("result"))}</span>
    <div class="ring" style="--p:${pct}"><b>${pct}%</b></div>
    <p>${esc(t("result_sub", right, total))}</p>
    <div class="row wrap center-row">
      <button class="btn ghost" id="rAgain">${esc(t("ex_again"))}</button>
      ${idx < LESSONS.length - 1 ? `<a class="btn primary" href="#lesson-${LESSONS[idx + 1].id}">${esc(t("next_lesson"))}</a>` : `<a class="btn primary" href="#lessons">${esc(t("to_lessons"))}</a>`}
    </div></section>`;
  // the next visit to this tab starts with the intro card again
  delete ES[l.id];
  $("#rAgain").onclick = () => { ES[l.id] = { i: 0, first: [], tries: 0 }; renderExercises(l, box); };
}

/* ----- vocab notebook ----- */
let vFilter = "all", vQuery = "", vConfirm = null;
function viewVocab(v) {
  const items = Object.entries(S.vocab.items).sort((a, b) => b[1].added - a[1].added);
  const due = dueItems().length;
  const counts = { new: 0, learning: 0, mastered: 0 };
  items.forEach(([, it]) => counts[vStatus(it)]++);
  v.innerHTML = `
  <header class="phead"><h1 class="h1">${esc(t("vocab_title"))}</h1>
    <a class="btn ${due ? "primary" : "ghost"}" href="#review">${IC.cards}<span>${esc(due ? t("review_now") + " (" + due + ")" : t("nothing_due"))}</span></a></header>
  ${items.length ? `
  <div class="chips">${[["all", t("all") + " " + items.length], ["new", t("st_new") + " " + counts.new], ["learning", t("st_learning") + " " + counts.learning], ["mastered", t("st_mastered") + " " + counts.mastered]]
    .map(([k, lab]) => `<button class="fchip ${vFilter === k ? "on" : ""}" data-f="${k}">${esc(lab)}</button>`).join("")}</div>
  <input class="search" id="vSearch" type="search" placeholder="${esc(t("search"))}" value="${esc(vQuery)}">
  <ul class="vbook" id="vList"></ul>` : `<p class="empty">${esc(t("vocab_empty"))}</p><a class="btn primary" href="#lessons">${esc(t("nav_lessons"))}</a>`}`;
  if (!items.length) return;
  const list = $("#vList", v);
  const draw = () => {
    const q = vQuery.trim().toLowerCase();
    const rows = items.filter(([, it]) => (vFilter === "all" || vStatus(it) === vFilter) && (!q || it.de.toLowerCase().includes(q) || (it.ar || "").includes(q)));
    list.innerHTML = rows.map(([id, it]) => {
      const st = vStatus(it), l = LMAP[it.lesson];
      return `<li class="vitem"><div class="vmain"><b lang="de" dir="ltr" id="vd-${id}">${wordsHTML(it.de)}</b><span lang="ar" dir="rtl">${esc(it.ar)}</span>
        ${it.ex && it.ex !== it.de ? `<small class="muted" lang="de" dir="ltr">${esc(it.ex)}</small>` : ""}
        <span class="vmeta"><span class="chip st-${st}">${esc(t("st_" + st))}</span>${l ? `<a href="#lesson-${l.id}" class="muted">${esc(t("from_lesson"))} ${l.n}</a>` : ""}</span></div>
        <div class="vact"><button class="iconbtn" data-say="${id}" aria-label="${esc(t("listen"))}">${IC.speak}</button>
        <button class="linkbtn danger" data-del="${id}">${esc(vConfirm === id ? t("confirm_remove") : t("remove"))}</button></div></li>`;
    }).join("") || `<li class="muted">${esc(t("no_data"))}</li>`;
    $$("[data-say]", list).forEach(b => b.onclick = () => { const it = S.vocab.items[b.dataset.say]; sayInto(it.de, $("#vd-" + b.dataset.say, list)); });
    $$("[data-del]", list).forEach(b => b.onclick = () => {
      const id = b.dataset.del;
      if (vConfirm !== id) { vConfirm = id; draw(); return; }
      delete S.vocab.items[id]; vConfirm = null; save("vocab"); toast(t("removed_toast")); viewVocab(v);
    });
  };
  $$(".fchip", v).forEach(b => b.onclick = () => { vFilter = b.dataset.f; viewVocab(v); });
  $("#vSearch", v).oninput = e => { vQuery = e.target.value; draw(); };
  draw();
}

/* ----- review (SRS) ----- */
let reviewQueue = null;
function viewReview(v) {
  if (!reviewQueue) reviewQueue = shuffle(dueItems().map(([id]) => id));
  reviewQueue = reviewQueue.filter(id => S.vocab.items[id]);
  if (!reviewQueue.length) {
    reviewQueue = null;
    const nextDue = Object.values(S.vocab.items).map(it => it.due).sort((a, b) => a - b)[0];
    v.innerHTML = `<header class="phead"><a class="iconbtn" href="#vocab">${IC.back}</a><h1 class="h1">${esc(t("review_title"))}</h1></header>
      <section class="card center"><p class="big">${esc(Object.keys(S.vocab.items).length ? t("review_done") : t("vocab_empty"))}</p>
      ${nextDue ? `<p class="muted">${esc(t("next_review", fmtDate(nextDue)))}</p>` : ""}<a class="btn primary" href="#home">${esc(t("nav_home"))}</a></section>`;
    return;
  }
  const id = reviewQueue[0], it = S.vocab.items[id];
  v.innerHTML = `<header class="phead"><a class="iconbtn" href="#vocab">${IC.back}</a><h1 class="h1">${esc(t("review_title"))}</h1><span class="muted">${esc(t("review_left", reviewQueue.length))}</span></header>
    <p class="muted">${esc(t("review_sub"))}</p>
    <section class="flash card">
      <p class="fde" lang="de" dir="ltr" id="fDe">${wordsHTML(it.de)}</p>
      <button class="btn sm" id="fSay">${IC.speak}<span>${esc(t("listen"))}</span></button>
      <div id="fBack" hidden><p class="far" lang="ar" dir="rtl">${esc(it.ar)}</p>${it.ex && it.ex !== it.de ? `<p class="muted" lang="de" dir="ltr">${esc(it.ex)}</p>` : ""}</div>
      <button class="btn primary" id="fShow">${esc(t("show_meaning"))}</button>
      <div class="rates" id="fRates" hidden>
        ${[["r_again", 0], ["r_hard", 1], ["r_good", 2], ["r_easy", 3]].map(([k, r]) => `<button class="rate r${r}" data-r="${r}">${esc(t(k))}</button>`).join("")}
      </div></section>`;
  const deEl = $("#fDe", v);
  $("#fSay", v).onclick = () => sayInto(it.de, deEl);
  sayInto(it.de, deEl);
  $("#fShow", v).onclick = () => { $("#fBack", v).hidden = false; $("#fRates", v).hidden = false; $("#fShow", v).hidden = true; };
  $$(".rate", v).forEach(b => b.onclick = () => {
    rateItem(it, +b.dataset.r); save("vocab");
    reviewQueue.shift();
    if (+b.dataset.r === 0) reviewQueue.push(id);
    flushTime(); viewReview(v);
  });
}

/* ----- stats ----- */
function viewStats(v) {
  const done = LESSONS.filter(l => S.progress.lessons[l.id]?.done);
  const avg = done.length ? Math.round(done.reduce((a, l) => a + (S.progress.lessons[l.id].best || 0), 0) / done.length) : null;
  const allDays = Object.values(S.activity.days);
  const exN = allDays.reduce((a, d) => a + (d.ex || 0), 0), okN = allDays.reduce((a, d) => a + (d.ok || 0), 0);
  const secs = allDays.reduce((a, d) => a + (d.sec || 0), 0) + pendingSec;
  const items = Object.values(S.vocab.items);
  const vc = { new: 0, learning: 0, mastered: 0 }; items.forEach(it => vc[vStatus(it)]++);
  const st = streaks();
  const kinds = Object.entries(S.activity.kinds).filter(([, k]) => k.n).map(([k, x]) => ({ k, ...x, rate: x.wrong / x.n })).sort((a, b) => b.rate - a.rate || b.wrong - a.wrong);
  const topWrong = Object.entries(S.activity.wrong).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([qid, n]) => {
    const [lid, qi] = [qid.slice(0, qid.lastIndexOf(":")), +qid.slice(qid.lastIndexOf(":") + 1)];
    const l = LMAP[lid], q = l && l.Q[qi]; return q ? { l, q, n } : null;
  }).filter(Boolean);
  const month = lastNDays(30);
  v.innerHTML = `
  <header class="phead"><h1 class="h1">${esc(t("stats_title"))}</h1><p class="muted">${esc(t("stats_sub"))}</p></header>
  <section class="tiles">
    <div class="tile"><b>${done.length}<small>/${LESSONS.length}</small></b><span>${esc(t("lessons_done"))}</span></div>
    <div class="tile"><b>${avg === null ? "–" : avg + "%"}</b><span>${esc(t("avg_score"))}</span></div>
    <div class="tile"><b>${exN ? Math.round(okN / exN * 100) + "%" : "–"}</b><span>${esc(t("first_try"))} · ${exN}</span></div>
    <div class="tile"><b>${fmtMin(secs)}</b><span>${esc(t("time_total"))}</span></div>
    <div class="tile"><b>${st.cur}</b><span>${esc(t("streak"))} · ${esc(t("longest"))} ${st.longest}</span></div>
    <div class="tile"><b>${vc.mastered}<small>/${items.length}</small></b><span>${esc(t("vocab_mastered"))}</span></div>
  </section>
  <section class="card block"><div class="row-between"><h2 class="h2">${esc(t("last30"))}</h2><span class="muted">${fmtMin(month.reduce((a, x) => a + x.v.sec, 0))}</span></div>${barChart(month, { height: 130 })}</section>
  <section class="card block"><h2 class="h2">${esc(t("nav_vocab"))}</h2>
    ${items.length ? `<div class="stack" dir="ltr">${["new", "learning", "mastered"].map(k => vc[k] ? `<i class="s-${k}" style="flex:${vc[k]}" title="${esc(t("st_" + k))}"></i>` : "").join("")}</div>
    <div class="legend">${["new", "learning", "mastered"].map(k => `<span><i class="s-${k}"></i>${esc(t("st_" + k))} ${vc[k]}</span>`).join("")}</div>` : `<p class="muted">${esc(t("no_data"))}</p>`}</section>
  <section class="card block"><h2 class="h2">${esc(t("mistakes"))}</h2>
    ${kinds.length ? `<ul class="kbars">${kinds.map(k => `<li><span>${esc(t("k_" + k.k))}</span><span class="kb"><i style="width:${Math.round(k.rate * 100)}%"></i></span><small class="muted">${esc(t("wrong_n", k.wrong, k.n))}</small></li>`).join("")}</ul>` : `<p class="muted">${esc(t("mistakes_empty"))}</p>`}
    ${topWrong.length ? `<ul class="wlist">${topWrong.map(x => `<li><a href="#lesson-${x.l.id}"><span class="muted">${x.l.n} · ${esc(t("k_" + x.q.k))} · ${x.n}×</span><span lang="de" dir="ltr">${esc(x.q.q || x.q.s || x.q.p.map(p => p[0]).join(", "))}</span></a></li>`).join("")}</ul>` : ""}
  </section>`;
}

/* ----- profile / settings ----- */
let resetArmed = false;
async function viewProfile(v) {
  const P = S.profile;
  const sel = (id, val, opts) => `<select id="${id}">${opts.map(([k, lab]) => `<option value="${k}" ${String(val) === String(k) ? "selected" : ""}>${esc(lab)}</option>`).join("")}</select>`;
  v.innerHTML = `
  <header class="phead"><h1 class="h1">${esc(t("profile_title"))}</h1></header>
  <section class="card block"><h2 class="h2">${esc(t("account"))}</h2>
    <p id="accName" class="accname"></p>
    ${backend.mode === "supa" ? `<p dir="ltr" class="accname">${esc(backend.email || "")}</p><p>${esc(t("acc_supa"))}</p><button class="btn" id="sLogout">${esc(t("au_logout"))}</button>`
      : `<p>${esc(backend.mode === "cloud" ? t("acc_cloud") : t("acc_local"))}</p>${backend.mode === "cloud" ? `<p class="muted small">${esc(t("logout_note"))}</p>` : (supaClient() ? `<button class="btn" id="sLogin">${esc(t("au_login"))}</button>` : "")}`}</section>
  <section class="card block form">
    <label>${esc(t("ui_lang"))}${sel("sUi", P.uiLang, [["ar", "العربية"], ["de", "Deutsch"]])}</label>
    <label>${esc(t("expl_lang"))}${sel("sExpl", P.explLang, [["ar", t("lang_ar")], ["de", t("lang_de")]])}</label>
    <label>${esc(t("goal"))}${sel("sGoal", P.goal, [["daily", t("g_daily")], ["work", t("g_work")], ["exam", t("g_exam")]])}</label>
    <label>${esc(t("theme"))}${sel("sTheme", P.theme, [["system", t("th_system")], ["light", t("th_light")], ["dark", t("th_dark")]])}</label>
    <label>${esc(t("def_speed"))}${sel("sRate", P.rate, [[0.6, "0.6×"], [0.8, "0.8×"], [1, "1×"], [1.2, "1.2×"]])}</label>
  </section>
  <section class="card block"><h2 class="h2">${esc(t("voice"))}</h2>
    <p>${deVoices.length ? esc(deVoices.slice(0, 3).map(x => x.name).join(" · ")) : esc(t("voice_none"))}</p>
    <button class="btn sm" id="sVoice">${IC.speak}<span>${esc(t("test_voice"))}</span></button></section>
  <section class="card block"><h2 class="h2">${esc(t("about"))}</h2><p>${esc(t("about_body"))}</p></section>
  <section class="block"><button class="btn danger" id="sReset">${esc(resetArmed ? t("reset_confirm") : t("reset_all"))}</button></section>`;
  const bind = (id, key, num, after) => { $(id, v).onchange = e => { P[key] = num ? +e.target.value : e.target.value; save("profile"); if (after) after(); }; };
  bind("#sUi", "uiLang", false, () => { applyChrome(); viewProfile(v); });
  bind("#sExpl", "explLang");
  bind("#sGoal", "goal");
  bind("#sTheme", "theme", false, applyChrome);
  bind("#sRate", "rate", true);
  if ($("#sLogout", v)) $("#sLogout", v).onclick = async () => { await flush(); try { await sb.auth.signOut(); } catch (e) {} location.hash = "home"; location.reload(); };
  if ($("#sLogin", v)) $("#sLogin", v).onclick = () => { location.hash = "home"; location.reload(); };
  $("#sVoice", v).onclick = () => sayInto("Da muss ich noch einmal eine Nacht drüber schlafen.", null);
  $("#sReset", v).onclick = () => {
    if (!resetArmed) { resetArmed = true; viewProfile(v); return; }
    resetArmed = false;
    const keep = S.profile; S = defaults(); S.profile = keep;
    reviewQueue = null; Object.keys(ES).forEach(k => delete ES[k]);
    save("progress", "vocab", "activity"); toast(t("reset_done")); viewProfile(v);
  };
  if (backend.mode === "cloud" && backend.user) {
    try { const me = await backend.user.me(); const el = $("#accName", v); if (el && me && me.name) el.textContent = me.name; } catch (e) {}
  }
}

/* ================= sheet ================= */
function openSheet(html) {
  const sh = $("#sheet");
  sh.innerHTML = `<div class="grab"></div><button class="iconbtn sheet-x" id="sheetX" aria-label="close">${IC.close}</button>${html}`;
  sh.dir = ui() === "de" ? "ltr" : "rtl";
  sh.hidden = false; $("#scrim").hidden = false; sh.scrollTop = 0;
  $("#sheetX").onclick = () => closeSheet();
  return sh;
}
function closeSheet(silent) { if (!silent) stopSpeech(); $("#sheet").hidden = true; $("#scrim").hidden = true; }
document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("#sheet").hidden) closeSheet(); });

/* ================= onboarding / gate ================= */
function showGate() {
  return new Promise(res => {
    $("#view").innerHTML = `<section class="gate card"><span class="lvl" lang="de">B2</span><h1 class="h1">${esc(t("gate_title"))}</h1><p>${esc(t("gate_body"))}</p>
      <button class="btn ghost" id="gLocal">${esc(t("gate_local"))}</button></section>`;
    $("#gLocal").onclick = () => { backend.mode = "local"; res(); };
  });
}
function showOnboarding() {
  return new Promise(res => {
    const P = S.profile;
    const draw = () => {
      applyChrome();
      const opt = (name, val, lab) => `<label class="pick"><input type="radio" name="${name}" value="${val}" ${P[name] === val ? "checked" : ""}><span>${esc(lab)}</span></label>`;
      $("#view").innerHTML = `<section class="onb card"><span class="lvl" lang="de">B2 → C1</span><h1 class="h1">${esc(t("onb_title"))}</h1><p class="muted">${esc(t("onb_sub"))}</p>
        <fieldset><legend>${esc(t("ui_lang"))}</legend>${opt("uiLang", "ar", "العربية")}${opt("uiLang", "de", "Deutsch")}</fieldset>
        <fieldset><legend>${esc(t("expl_lang"))}</legend>${opt("explLang", "ar", t("lang_ar"))}${opt("explLang", "de", t("lang_de"))}</fieldset>
        <fieldset><legend>${esc(t("goal"))}</legend>${opt("goal", "daily", t("g_daily"))}${opt("goal", "work", t("g_work"))}${opt("goal", "exam", t("g_exam"))}</fieldset>
        <button class="btn primary big" id="oGo">${esc(t("start"))}</button></section>`;
      $$("input[type=radio]").forEach(r => r.onchange = () => { P[r.name] = r.value; if (r.name === "uiLang") draw(); });
      $("#oGo").onclick = () => { P.onboarded = true; save("profile"); res(); };
    };
    draw();
  });
}

/* ================= boot ================= */
async function boot() {
  applyChrome();
  $("#view").innerHTML = `<div class="splash"><span class="lvl" lang="de">DeutschFlow</span><p class="muted">${esc(t("loading"))}</p></div>`;
  const inClaude = !!(window.claude && typeof window.claude.use === "function");
  const cloud = inClaude && await connectCloud();
  if (!cloud) {
    const session = !inClaude && supaClient() ? await supaSession() : null;
    if (session && !recovering) Object.assign(backend, { mode: "supa", uid: session.user.id, email: session.user.email });
    else if (!inClaude && supaClient()) await showAuth();
    else await showGate();
  }
  try { await loadAll(); }
  catch (e) { toast(t("sync_error"), 5000); }
  rebuildLessons();
  if (backend.mode === "supa" && recovering) { await showAuth(); }
  applyChrome();
  if (!S.profile.onboarded) await showOnboarding();
  applyChrome();
  render();
}
boot();
})();
