// Quiz gate 2: Paul's Second Journey (Acts 15–18). Same question types as quiz1.js.

export const quiz2 = {
  id: 'quiz2',
  title: { en: 'Quiz: The second journey', ro: 'Test: A doua călătorie' },
  subtitle: { en: '10 questions · Acts 15–18', ro: '10 întrebări · Faptele Apostolilor 15–18' },
  intro: {
    en: '"A real sailor remembers every harbour, and now we have sailed all the way to Europe!" says Nikias. "Get 7 out of 10 right, and Father will make you a sailor of the Euploia."',
    ro: '„Un marinar adevărat ține minte fiecare port, iar acum am navigat până în Europa!”, spune Nikias. „Răspunde corect la 7 din 10, și tata te face marinar pe Euploia.”',
  },
  pass: 7,
  rank: { en: 'Sailor', ro: 'Marinar' },
  replay: 'paul-2',
  questions: [
    {
      type: 'mc',
      q: { en: 'What did the apostles and elders decide at the Council of Jerusalem?', ro: 'Ce au hotărât apostolii și presbiterii la Sinodul de la Ierusalim?' },
      options: [
        { en: 'Gentiles do not have to become Jews first: we are all saved through the grace of the Lord Jesus', ro: 'Neamurile nu trebuie să devină mai întâi iudei: toți ne mântuim prin harul Domnului Iisus' },
        { en: 'Only Jews can follow Jesus', ro: 'Doar iudeii Îl pot urma pe Iisus' },
        { en: 'Everyone must move to Jerusalem', ro: 'Toți trebuie să se mute la Ierusalim' },
        { en: 'Paul must stop travelling', ro: 'Pavel trebuie să nu mai călătorească' },
      ],
      explain: {
        en: 'Peter said it, and James agreed: "We should not make it difficult for the gentiles who are turning to God." A letter carried the good news back to Antioch.',
        ro: 'Petru a spus-o, iar Iacov a fost de acord: „Să nu le facem greutăți celor dintre neamuri care se întorc la Dumnezeu.” O scrisoare a dus vestea cea bună înapoi la Antiohia.',
      },
    },
    {
      type: 'mc',
      q: { en: 'Why did Paul and Barnabas go separate ways?', ro: 'De ce s-au despărțit Pavel și Barnaba?' },
      options: [
        { en: 'They disagreed about taking John Mark with them again', ro: 'Nu s-au înțeles dacă să-l ia din nou pe Ioan Marcu' },
        { en: 'Barnabas was afraid of the sea', ro: 'Lui Barnaba îi era frică de mare' },
        { en: 'Paul wanted to stay in Antioch', ro: 'Pavel voia să rămână în Antiohia' },
        { en: 'The Romans put Barnabas in prison', ro: 'Romanii l-au închis pe Barnaba' },
      ],
      explain: {
        en: 'Barnabas took Mark to Cyprus, and Paul chose Silas. As Father said: now the good news went two ways instead of one!',
        ro: 'Barnaba l-a luat pe Marcu în Cipru, iar Pavel l-a ales pe Sila. Cum a zis tata: acum vestea cea bună mergea pe două drumuri în loc de unul!',
      },
    },
    {
      type: 'mc',
      q: { en: 'In Lystra, Paul took a young believer with him. His mother was Jewish and his father Greek, like ours. Who was he?', ro: 'La Listra, Pavel a luat cu el un tânăr credincios. Mama lui era iudeică, iar tatăl grec, ca la noi. Cine era?' },
      options: [
        { en: 'Timothy', ro: 'Timotei' },
        { en: 'Luke', ro: 'Luca' },
        { en: 'Silas', ro: 'Sila' },
        { en: 'Jason', ro: 'Iason' },
      ],
      explain: {
        en: 'Timothy! Everyone spoke well of him, and he became like a son to Paul.',
        ro: 'Timotei! Toți vorbeau frumos despre el, iar el a ajuns pentru Pavel ca un fiu.',
      },
    },
    {
      type: 'mc',
      q: { en: 'In Troas, Paul saw a man from Macedonia in a vision. What did the man say?', ro: 'La Troa, Pavel a văzut într-o vedenie un bărbat macedonean. Ce i-a spus acesta?' },
      options: [
        { en: '"Come over to Macedonia and help us!"', ro: '„Treci în Macedonia și ajută-ne!”' },
        { en: '"Go back home to Antioch!"', ro: '„Întoarce-te acasă, în Antiohia!”' },
        { en: '"Build a ship!"', ro: '„Construiește o corabie!”' },
        { en: '"Go to Rome at once!"', ro: '„Mergi chiar acum la Roma!”' },
      ],
      explain: {
        en: 'And at once we set sail! Luke the doctor came with us, and the good news crossed the sea into Europe.',
        ro: 'Și îndată am pornit pe mare! Doctorul Luca a venit cu noi, iar vestea cea bună a trecut marea, în Europa.',
      },
    },
    {
      type: 'pick',
      q: {
        en: 'We landed at Neapolis and walked to the Roman colony where Paul first preached in Europe: Philippi. Can you find it? Click on the map!',
        ro: 'Am ajuns la Neapole și am mers pe jos până la colonia romană unde Pavel a predicat prima dată în Europa: Filipi. O găsești? Dă clic pe hartă!',
      },
      at: [24.28, 41.01],
      radiusKm: 25,
      focus: ['troas', 'thessalonica', 'philippi', 'samothrace', 'beroea'],
      answer: { en: 'Philippi', ro: 'Filipi' },
      explain: {
        en: 'Philippi is a little way inland from the harbour of Neapolis, on the great Roman road, the Via Egnatia.',
        ro: 'Filipi este puțin mai înăuntrul uscatului față de portul Neapole, pe marele drum roman, Via Egnatia.',
      },
    },
    {
      type: 'mc',
      q: { en: 'Lydia, the first believer in Philippi, was a merchant. What did she sell?', ro: 'Lidia, prima credincioasă din Filipi, era negustoreasă. Ce vindea?' },
      options: [
        { en: 'Purple cloth', ro: 'Porfiră (stofă purpurie)' },
        { en: 'Olive oil', ro: 'Ulei de măsline' },
        { en: 'Tents', ro: 'Corturi' },
        { en: 'Fish', ro: 'Pește' },
      ],
      explain: {
        en: 'Purple cloth from Thyatira, very expensive, because the dye came from thousands of sea snails. And Father carried it on the Euploia!',
        ro: 'Porfiră din Tiatira, foarte scumpă, pentru că vopseaua se făcea din mii de melci de mare. Iar tata o ducea cu Euploia!',
      },
    },
    {
      type: 'order',
      q: { en: 'Put what happened in Philippi in the right order:', ro: 'Pune în ordine ce s-a întâmplat la Filipi:' },
      items: [
        { en: 'Lydia is baptized by the river', ro: 'Lidia se botează lângă râu' },
        { en: 'The slave girl is set free from the spirit', ro: 'Slujnica e eliberată de duh' },
        { en: 'Paul and Silas are thrown into prison', ro: 'Pavel și Sila sunt aruncați în temniță' },
        { en: 'An earthquake at midnight', ro: 'Un cutremur la miezul nopții' },
        { en: 'The jailer and his family are baptized', ro: 'Temnicerul și familia lui se botează' },
      ],
      explain: {
        en: 'And they sang hymns in the prison before the earthquake came! "Believe in the Lord Jesus, and you will be saved, you and your household."',
        ro: 'Iar în temniță au cântat laude înainte să vină cutremurul! „Crede în Domnul Iisus și te vei mântui tu și casa ta.”',
      },
    },
    {
      type: 'order',
      q: { en: 'Put the cities in the order Paul visited them:', ro: 'Pune orașele în ordinea în care le-a vizitat Pavel:' },
      items: [
        { en: 'Philippi', ro: 'Filipi' },
        { en: 'Thessalonica', ro: 'Tesalonic' },
        { en: 'Berea', ro: 'Bereea' },
        { en: 'Athens', ro: 'Atena' },
        { en: 'Corinth', ro: 'Corint' },
      ],
      explain: {
        en: 'Along the Via Egnatia to Thessalonica, then to Berea, where people searched the Scriptures every day, then on our ship to Athens, and over land to Corinth.',
        ro: 'Pe Via Egnatia până la Tesalonic, apoi la Bereea, unde oamenii cercetau Scripturile în fiecare zi, apoi cu corabia noastră la Atena și pe uscat până la Corint.',
      },
    },
    {
      type: 'mc',
      q: { en: 'In Athens, Paul found an altar with some words written on it. What were they?', ro: 'La Atena, Pavel a găsit un altar pe care era scris ceva. Ce scria?' },
      options: [
        { en: 'TO AN UNKNOWN GOD', ro: 'DUMNEZEULUI NECUNOSCUT' },
        { en: 'TO THE EMPEROR', ro: 'ÎMPĂRATULUI' },
        { en: 'TO THE GOD OF THE SEA', ro: 'ZEULUI MĂRII' },
        { en: 'TO ALL THE GODS', ro: 'TUTUROR ZEILOR' },
      ],
      explain: {
        en: 'Paul started from what the Athenians already knew: "The one you worship without knowing, I proclaim to you!"',
        ro: 'Pavel a pornit de la ce știau deja atenienii: „Pe Cel pe Care voi Îl cinstiți fără să-L cunoașteți, pe Acela vi-L vestesc eu!”',
      },
    },
    {
      type: 'mc',
      q: { en: 'In Corinth, Paul lived and worked with Priscilla and Aquila. What was their work?', ro: 'La Corint, Pavel a locuit și a lucrat la Priscila și Acvila. Ce meserie aveau?' },
      options: [
        { en: 'They made tents, just like Paul', ro: 'Făceau corturi, ca și Pavel' },
        { en: 'They were Roman soldiers', ro: 'Erau soldați romani' },
        { en: 'They built ships', ro: 'Construiau corăbii' },
        { en: 'They sold purple cloth', ro: 'Vindeau porfiră' },
      ],
      explain: {
        en: 'They had come from Rome, because the Emperor Claudius sent the Jews away. Paul stayed in Corinth a year and a half, and later Priscilla and Aquila kept the lamp burning in Ephesus.',
        ro: 'Veniseră de la Roma, pentru că împăratul Claudiu îi izgonise pe iudei. Pavel a rămas la Corint un an și jumătate, iar mai târziu Priscila și Acvila au ținut aprinsă candela din Efes.',
      },
    },
  ],
  cheers: {
    en: ['Thalia: "Exactly!"', 'Nikias: "Steady on the rudder!"', 'Thalia: "You were listening!"', 'Nikias: "Father would be proud!"'],
    ro: ['Thalia: „Exact!”', 'Nikias: „Ții bine cârma!”', 'Thalia: „Ai fost atent!”', 'Nikias: „Tata ar fi mândru!”'],
  },
  oops: {
    en: ['Nikias: "Not quite…"', 'Thalia: "Almost! Look:"', 'Nikias: "Hmm, let\'s check the logbook."'],
    ro: ['Nikias: „Nu chiar…”', 'Thalia: „Aproape! Uite:”', 'Nikias: „Hmm, hai să ne uităm în jurnal.”'],
  },
  done: {
    pass: {
      en: '"Well done!" Father laughs and hands you a rope. "From today you are a real sailor of the Euploia!"',
      ro: '„Bravo!”, râde tata și îți întinde o frânghie. „De azi ești marinar adevărat pe Euploia!”',
    },
    fail: {
      en: '"Even the best sailors miss a harbour sometimes," says Thalia. "Let\'s sail the second journey once more, then try again!"',
      ro: '„Și cei mai buni marinari ratează uneori un port”, spune Thalia. „Hai să mai facem o dată a doua călătorie, apoi încearcă din nou!”',
    },
  },
};
