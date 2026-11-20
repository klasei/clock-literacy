/**
 * Every word the student or the class reads, in each language on offer.
 *
 * English is the source: its keys are the type every other language must
 * fill, so a missing translation is a type error rather than a blank button.
 * Lithuanian is the default (the page is prerendered in it); the choice is
 * remembered on this computer, like the rest of the settings.
 */

const isBrowser = typeof window !== "undefined";

export type LanguageCode = "lt" | "en";

const en = {
	"brand.name": "Clock Literacy",
	"brand.home": "Clock Literacy home",

	"nav.about": "about",
	"nav.privacy": "privacy",
	"nav.nav_aria": "About and privacy links",

	"footer.builtBy": "Built by the EdTech-a-thon",

	"language.change": "Change language",
	"language.lt": "Lietuvių",
	"language.en": "English",

	"home.hero_a": "Practice Reading",
	"home.hero_b": "an Analog Clock.",
	"home.hero_sub": "Choose a level and get started.",
	"home.start": "Start practicing",
	"home.clock_aria": "An analog clock face showing ten past ten",
	"home.badge": "Take your time",
	"home.levels_title": "Three levels of difficulty",
	"home.level_easy": "Easy",
	"home.level_easy_desc": "The clock only shows quarter hours.",
	"home.level_medium": "Medium",
	"home.level_medium_desc": "The clock only shows times on five-minute marks.",
	"home.level_hard": "Hard",
	"home.level_hard_desc": "The clock can show any time.",
	"home.qtypes_title": "Two kinds of questions",
	"home.qtypes_body":
		"Students enter the time shown on a clock, or choose the clock face that matches a given time.",
	"home.report_title": "Save or print a report",
	"home.report_body": "Save the Practice Report as a PDF to upload or email to a teacher.",

	"practice.level_title": "What level practice do you want?",
	"practice.level_easy": "Easy",
	"practice.level_easy_blurb":
		"Questions and answers use times ending in :00, :15, :30, or :45, like 2:00 and 2:15.",
	"practice.level_medium": "Medium",
	"practice.level_medium_blurb":
		"Questions and answers use times in 5-minute steps, like 2:05, 2:10, and 2:15.",
	"practice.level_hard": "Hard",
	"practice.level_hard_blurb":
		"Questions and answers can use any minute, like 2:07 or 2:43.",
	"practice.how_many": "How many questions?",
	"practice.start": "Start practicing",
	"practice.question_of": "Question {n} of {total}",
	"practice.resume_title": "Resume your round?",
	"practice.resume_body": "{level} level · {answered} of {total} questions completed",
	"practice.resume_yes": "Yes, resume",
	"practice.resume_no": "No, start a new round",
	"practice.correct": "Yes — {time}",
	"practice.your_answer": "Your answer:",
	"practice.hour_sronly": "Hour: ",
	"practice.minutes_sronly": "Minutes: ",
	"practice.hand_correct": "correct",
	"practice.hand_incorrect": "incorrect",
	"practice.got_it": "Got it",
	"practice.what_time": "What time is it?",
	"practice.which_clock": "Which clock shows {time}?",
	"practice.clock_aria": "Clock {n} of {total}",
	"practice.hour_error": "The hour needs to be a number from 1 to 12.",
	"practice.minute_error": "The minutes need to be a number from 00 to 59.",
	"practice.score": "{right} out of {total}",
	"practice.review_title": "The ones to look at again",
	"practice.you_said": "you said {time}",
	"practice.all_correct": "Every one right. That's the whole round.",
	"practice.again": "Practice again",
	"practice.print_report": "Print my report",
	"practice.unprinted": "You didn't print your last round. It's still here if you want it.",

	"input.hour": "Hour",
	"input.minute": "Minute",
	"input.check": "Check",

	"feedback.hour_on_hour": "The short hand points to {hour}, so the hour is {hour}.",
	"feedback.hour_between": "The short hand is between {hour} and {next}. It has passed {hour}, so the hour is still {hour}.",
	"feedback.minute_on_12": "The long minute hand points to 12. That means 00 minutes.",
	"feedback.minute_fives": "The long minute hand points to {num}. Each number is 5 minutes, so count by fives from 12 to get {minute} minutes.",
	"feedback.minute_ticks": "The long minute hand is {ticks} small {ticks_word} past {start}. Start at {whole} minutes and count the small ticks: add {ticks} to get {minute} minutes.",
	"feedback.tick_one": "tick",
	"feedback.tick_many": "ticks",
	"feedback.time_is": "The time is {time}.",
	"feedback.swapped_prefix": "The short hand shows the hour; the long hand shows the minutes.",

	"clockface.describe_prefix": "An analog clock.",
	"clockface.hour_pointing": "The hour hand points at the {num}.",
	"clockface.hour_between": "The hour hand is between the {hour} and the {next}.",
	"clockface.minute_pointing": "The minute hand points at the {num}.",
	"clockface.minute_between": "The minute hand is between the {before} and the {after}.",
	"clockface.answer":
		"Your answer: {answer}. Correct time: {correct}. Hour {hour_status}. Minutes {minute_status}. Colored hands show your answer; black hands show the correct positions.",
	"clockface.hand_correct": "correct",
	"clockface.hand_incorrect": "incorrect",

	"about.title": "About",
	"about.subtitle": "A focused practice tool for students learning to read analog clocks.",
	"about.from": "From the EdTech-a-thon",
	"about.project": "Clock Literacy is a project from the {edtechathon}, a community of builders making free tools for classrooms. Learn more about who we are and what else we're building at {link}.",
	"about.participants_aria": "Participants of the 2026 EdTech-a-thon",
	"about.caption": "EdTech-a-thon 2026",
	"about.promise": "Our promise",
	"about.promise_1": "Zero paywalls.",
	"about.promise_2": "Zero ads.",
	"about.promise_3": "Zero tracking of personal data.",
	"about.feedback": "Feedback & ideas",
	"about.feedback_body":
		"We'd love to hear from you. Tell us what's working, what's not, or pitch us an idea for a tool you wish existed. We're here to help.",
	"about.email": "Email support@teacher.dev",

	"privacy.title": "Privacy",
	"privacy.subtitle": "What we collect, what we don't, and why.",
	"privacy.body":
		"Clock Literacy does not collect personal information from visitors or students. We use Cloudflare Web Analytics to anonymously count visits, which helps us understand how it is being used in classrooms. Cloudflare Web Analytics is cookieless, does not fingerprint visitors, and does not track users across other sites. See {link} for details. We do not share, sell, or otherwise transfer any visitor data to third parties. Practice progress and the name entered for a report are stored in your browser's local storage, and that information never leaves your device.",
	"privacy.questions": "Questions or concerns? Email {email}.",

	"report.back": "Back to practice",
	"report.loading": "Loading your round…",
	"report.empty_title": "Nothing to report yet",
	"report.empty_body": "Finish a round of practice and it will show up here, ready to print.",
	"report.start": "Start practicing",
	"report.name_label": "Your name",
	"report.name_placeholder": "Type your name",
	"report.this_round": "This round",
	"report.last_round": "Your last round ({level}, {score}/{total})",
	"report.print": "Print / Save as PDF",
	"report.header_brand": "Clock Literacy · Practice report",
	"report.name_blank": "Name: ________________",
	"report.level_questions": "{level} · {total} questions",
	"report.score_line": "{score} out of {total}",
	"report.correct_section": "Questions answered correctly",
	"report.review_section": "Questions to look at again",
	"report.answered": "answered {time}",
	"report.more": "and {n} more",
	"report.out_of": "out of {n}",
	"report.all_correct": "Every question correct.",
	"report.choice_clock": "Multiple choice (clock)",
	"report.typed": "Typed input",
	"report.choice_time": "Multiple choice (time)",
	"report.level_easy": "Easy",
	"report.level_medium": "Medium",
	"report.level_hard": "Hard",

	"home.seo_title": "Practice Reading an Analog Clock — Clock Literacy",
	"home.choose": "Choose a level",
	"home.seo_description": "Build confidence reading analog clocks with focused, self-paced practice.",
	"practice.seo_title": "Practice — Clock Literacy",
	"report.seo_title": "Practice report — Clock Literacy",
	"about.seo_title": "About — Clock Literacy",
	"about.seo_description": "Learn about Clock Literacy and the EdTech-a-thon community that built it.",
	"privacy.seo_title": "Privacy — Clock Literacy",
	"privacy.seo_description": "What Clock Literacy collects, what it doesn't, and why.",
	"seo.og_image_alt": "Clock Literacy: practice reading an analog clock, beside a clock face showing ten past ten.",
};

type LangDict = typeof en;

const lt: LangDict = {
	"brand.name": "Laikrodis",
	"brand.home": "„Laikrodžio“ pradinis puslapis",

	"nav.about": "apie",
	"nav.privacy": "privatumas",
	"nav.nav_aria": "Apie ir privatumo nuorodos",

	"footer.builtBy": "Sukūrė „EdTech-a-thon“",

	"language.change": "Keisti kalbą",
	"language.lt": "Lietuvių",
	"language.en": "English",

	"home.hero_a": "Laikrodžiai",
	"home.hero_b": "",
	"home.hero_sub": "Pasirinkite lygį ir pradėkite.",
	"home.start": "Pradėti mokytis",
	"home.clock_aria": "Analoginio laikrodžio skaitmenys, rodantys 10:10",
	"home.badge": "Neskubėkite",
	"home.levels_title": "Trys sunkumo lygiai",
	"home.level_easy": "Lengva",
	"home.level_easy_desc": "Laikrodis rodo tik laikus, baigiančius :00, :15, :30 ar :45.",
	"home.level_medium": "Vidutiniškai",
	"home.level_medium_desc": "Laikrodis rodo tik laikus, baigiančius :05, :10, :15 ir kt.",
	"home.level_hard": "Sunku",
	"home.level_hard_desc": "Laikrodis gali rodyti bet kokią valandą.",
	"home.qtypes_title": "Du klausimų tipai",
	"home.qtypes_body":
		"Mokinys įrašo laiką, rodomą laikrodyje, arba pasirenka laikrodžio skaitmenis, atitinkančius duotą laiką.",
	"home.report_title": "Išsaugokite arba spausdinkite ataskaitą",
	"home.report_body": "Išsaugokite praktikos ataskaitą PDF failu, kad ją atsiųstumėte mokytojui.",

	"practice.level_title": "Kokio lygio praktiką norite?",
	"practice.level_easy": "Lengva",
	"practice.level_easy_blurb":
		"Klausimai ir atsakymai naudoja laikus, baigiančius :00, :15, :30 arba :45, pavyzdžiui, 2:00 ir 2:15.",
	"practice.level_medium": "Vidutiniškai",
	"practice.level_medium_blurb":
		"Klausimai ir atsakymai naudoja laikus 5 minučių žingsniais, pavyzdžiui, 2:05, 2:10 ir 2:15.",
	"practice.level_hard": "Sunku",
	"practice.level_hard_blurb":
		"Klausimai ir atsakymai gali naudoti bet kokias minutes, pavyzdžiui, 2:07 ar 2:43.",
	"practice.how_many": "Kiek klausimų?",
	"practice.start": "Pradėti mokytis",
	"practice.question_of": "Klausimas {n} iš {total}",
	"practice.resume_title": "Tęsti jūsų seriją?",
	"practice.resume_body": "{level} · atlikta {answered} iš {total} klausimų",
	"practice.resume_yes": "Taip, tęsti",
	"practice.resume_no": "Ne, pradėti naują",
	"practice.correct": "Taip — {time}",
	"practice.your_answer": "Jūsų atsakymas:",
	"practice.hour_sronly": "Valandos: ",
	"practice.minutes_sronly": "Minutės: ",
	"practice.hand_correct": "teisingai",
	"practice.hand_incorrect": "klaidingai",
	"practice.got_it": "Supratau",
	"practice.what_time": "Kokį laiką rodo laikrodis?",
	"practice.which_clock": "Kuris laikrodis rodo {time}?",
	"practice.clock_aria": "Laikrodis {n} iš {total}",
	"practice.hour_error": "Valanda turi būti skaičius nuo 1 iki 12.",
	"practice.minute_error": "Minutės turi būti skaičius nuo 00 iki 59.",
	"practice.score": "{right} iš {total}",
	"practice.review_title": "Kad verta peržiūrėti",
	"practice.you_said": "jūs atsakėte {time}",
	"practice.all_correct": "Visi teisingai. Tai visa serija.",
	"practice.again": "Mokykitis dar kartą",
	"practice.print_report": "Spausdinti ataskaitą",
	"practice.unprinted": "Paskutinės serijos nespaudėte. Ji vis dar čia, jei norite.",

	"input.hour": "Valandos",
	"input.minute": "Minutės",
	"input.check": "Patikrinti",

	"feedback.hour_on_hour": "Trumpesnė rodyklė rodo {hour}, todėl valanda yra {hour}.",
	"feedback.hour_between": "Trumpesnė rodyklė yra tarp {hour} ir {next}. Ji jau praėjo {hour}, todėl valanda vis dar {hour}.",
	"feedback.minute_on_12": "Ilga minučių rodyklė rodo 12. Tai yra 00 minučių.",
	"feedback.minute_fives": "Ilga minučių rodyklė rodo {num}. Kiekvienas skaičius yra 5 minutės, todėl skaičiuokite penketais nuo 12 ir gausite {minute} minučių.",
	"feedback.minute_ticks": "Ilga minučių rodyklė yra {ticks} maža {ticks_word} praėjusi {start}. Pradėkite nuo {whole} minučių ir skaičiuokite mažas rodykles: pridėkite {ticks} ir gausite {minute} minučių.",
	"feedback.tick_one": "žymą",
	"feedback.tick_many": "žymus",
	"feedback.time_is": "Laikas yra {time}.",
	"feedback.swapped_prefix": "Trumpesnė rodyklė rodo valandas, ilgesnė — minutes.",

	"clockface.describe_prefix": "Analoginis laikrodis.",
	"clockface.hour_pointing": "Valandų rodyklė rodo {num}.",
	"clockface.hour_between": "Valandų rodyklė yra tarp {hour} ir {next}.",
	"clockface.minute_pointing": "Minučių rodyklė rodo {num}.",
	"clockface.minute_between": "Minučių rodyklė yra tarp {before} ir {after}.",
	"clockface.answer":
		"Jūsų atsakymas: {answer}. Teisingas laikas: {correct}. Valandos {hour_status}. Minutės {minute_status}. Spalvotos rodyklės rodo jūsų atsakymą; juodos — teisingą padėtį.",
	"clockface.hand_correct": "teisingai",
	"clockface.hand_incorrect": "klaidingai",

	"about.title": "Apie",
	"about.subtitle": "Suskoncentruotas įrankis mokiniams, mokantiems skaityti analoginius laikrodžius.",
	"about.from": "Iš „EdTech-a-thon“",
	"about.project":
		"„Laikrodis“ yra „{edtechathon}“ projektas — kūrėjų bendruomenė, kuri gamina nemokamus įrankius klasėms. Sužinokite daugiau apie mus ir kitus projektus {link}.",
	"about.participants_aria": "2026 m. „EdTech-a-thon“ dalyviai",
	"about.caption": "EdTech-a-thon 2026",
	"about.promise": "Mūsų pažadas",
	"about.promise_1": "Be mokamų apribojimų.",
	"about.promise_2": "Be reklamos.",
	"about.promise_3": "Be asmens duomenų stebėjimo.",
	"about.feedback": "Atsiliepimai ir idėjos",
	"about.feedback_body":
		"Mums norisi sužinoti jūsų nuomonę. Pasakykite, kas veikia, kas ne, arba siūlykite įrankio, kurio norėtumėte, idėją. Mes čia, kad padėtume.",
	"about.email": "Rašykite support@teacher.dev",

	"privacy.title": "Privatumas",
	"privacy.subtitle": "Ką renkame, ko nerenkame ir kodėl.",
	"privacy.body":
		"„Laikrodis“ nerenka lankytojų ar mokinių asmeninės informacijos. Naudojame „Cloudflare Web Analytics“, kad anonimiškai skaičiuotume lankymąsi, todėl suprantame, kaip įrankis naudojamas klasėse. „Cloudflare Web Analytics“ nesinaudoja slapukais, nenešioja lankytojų pėdsakų ir nestebi vartotojų tarp kitų svetainių. Plačiau — {link}. Jokių lankytojų duomenų nedalijame, neparduodame ar kitaip neturime trečiosioms šalims. Praktikos progresas ir įvestas ataskaitos vardas saugomi naršyklės vietinėje laikmenoje, ir ta informacija niekada nepalieka jūsų įrenginio.",
	"privacy.questions": "Klausimai ar susirūpinimas? Rašykite {email}.",

	"report.back": "Grįžti į praktiką",
	"report.loading": "Kraunama jūsų serija…",
	"report.empty_title": "Dar nieko, ką pranešti",
	"report.empty_body": "Užbaikite praktikos seriją, ir ji atsiras čia, paruošta spausdinti.",
	"report.start": "Pradėti mokytis",
	"report.name_label": "Jūsų vardas",
	"report.name_placeholder": "Įrašykite savo vardą",
	"report.this_round": "Ši serija",
	"report.last_round": "Jūsų paskutinė serija ({level}, {score}/{total})",
	"report.print": "Spausdinti / Išsaugoti PDF",
	"report.header_brand": "Laikrodis · Praktikos ataskaita",
	"report.name_blank": "Vardas: ________________",
	"report.level_questions": "{level} · {total} klausimų",
	"report.score_line": "{score} iš {total}",
	"report.correct_section": "Teisingai atsakyti klausimai",
	"report.review_section": "Klausimai, verti peržiūros",
	"report.answered": "atsakė {time}",
	"report.more": "ir dar {n}",
	"report.out_of": "iš {n}",
	"report.all_correct": "Visi klausimai teisingi.",
	"report.choice_clock": "Pasirinkimas iš laikrodžių",
	"report.typed": "Rašomoji įvestis",
	"report.choice_time": "Pasirinkimas iš laiko",
	"report.level_easy": "Lengva",
	"report.level_medium": "Vidutiniškai",
	"report.level_hard": "Sunku",

	"home.seo_title": "Mokymasis skaityti analoginį laikrodį — Laikrodis",
	"home.choose": "Pasirinkite lygį",
	"home.seo_description": "Užsibaigkite pasitikėjimą skaitydami analoginius laikrodžius su savarankišku mokymu.",
	"practice.seo_title": "Praktika — Laikrodis",
	"report.seo_title": "Praktikos ataskaita — Laikrodis",
	"about.seo_title": "Apie — Laikrodis",
	"about.seo_description": "Sužinokite apie „Laikrodį“ ir „EdTech-a-thon“ bendruomenę, kuri ją sukūrė.",
	"privacy.seo_title": "Privatumas — Laikrodis",
	"privacy.seo_description": "Ką „Laikrodis“ renkasi, ko nerenka ir kodėl.",
	"seo.og_image_alt": "„Laikrodis“: mokymasis skaityti analoginį laikrodį, šalia laikrodžio skaitmenų, rodančių 10:10.",
};

const dicts: Record<LanguageCode, LangDict> = { en, lt };

const STORAGE_KEY = "clock-literacy:language";

function initialLanguage(): LanguageCode {
	if (isBrowser) {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored === "en" || stored === "lt") return stored;
		} catch {
			// Private browsing may refuse storage; the default still applies.
		}
	}
	return "lt";
}

let code = $state<LanguageCode>(initialLanguage());

/** The active language as a bindable { code } object (Svelte 5 runes). */
export const language = {
	get code() {
		return code;
	},
	set code(value: LanguageCode) {
		setLanguage(value);
	},
};

export const languageOptions = [
	{ code: "lt", name: "Lietuvių" },
	{ code: "en", name: "English" },
] as const;

/** Switch language, remember the choice, and update <html lang>. */
export function setLanguage(next: LanguageCode): void {
	if (next === code) return;
	code = next;
	if (isBrowser) {
		try {
			localStorage.setItem(STORAGE_KEY, next);
		} catch {
			// Not remembered; the choice still applies for this visit.
		}
		if (typeof document !== "undefined") document.documentElement.lang = next;
	}
}

function fill(text: string, values: Record<string, string | number>): string {
	return text.replace(/\{(\w+)\}/g, (match, name) =>
		values[name] === undefined ? match : String(values[name]),
	);
}

/** Translate a key for the current language, filling in {params}. */
export function t(key: keyof LangDict, values: Record<string, string | number> = {}): string {
	return fill(dicts[code][key] ?? en[key], values);
}
