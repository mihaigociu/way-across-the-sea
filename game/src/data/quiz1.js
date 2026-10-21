// Quiz gate 1: "The story so far" + Paul's First Journey (Acts 1–14).
// Question types:
//   mc    — options[0] is the correct one (shown shuffled)
//   order — items listed in the correct order (shown shuffled)
//   pick  — click the place on the map: `at` [lon, lat] within `radiusKm`; `focus` frames the map
// `explain` is shown after answering, right or wrong.

export const quiz1 = {
  id: 'quiz1',
  title: { en: 'Quiz: The first journey', ro: 'Test: Prima călătorie' },
  subtitle: { en: '10 questions · Acts 1–14', ro: '10 întrebări · Faptele Apostolilor 1–14' },
  intro: {
    en: '"Father says a good sailor must remember every harbour," says Nikias. "Let\'s see what you remember from Grandfather Eli\'s story and Paul\'s journey! Get 7 out of 10 right to earn your first sailor\'s rank."',
    ro: '„Tata zice că un marinar bun trebuie să țină minte fiecare port”, spune Nikias. „Hai să vedem ce-ți amintești din povestea bunicului Eli și din călătoria lui Pavel! Răspunde corect la 7 din 10 ca să primești primul tău grad de marinar.”',
  },
  pass: 7,
  rank: { en: 'Deckhand', ro: 'Mus' },
  questions: [
    {
      type: 'mc',
      q: { en: 'In which city did Jesus die and rise again?', ro: 'În ce oraș a murit și a înviat Iisus?' },
      options: [
        { en: 'Jerusalem', ro: 'Ierusalim' },
        { en: 'Rome', ro: 'Roma' },
        { en: 'Antioch', ro: 'Antiohia' },
        { en: 'Athens', ro: 'Atena' },
      ],
      explain: {
        en: 'In Jerusalem! That is where the tomb was found empty, and where the very first lamp was lit.',
        ro: 'La Ierusalim! Acolo a fost găsit mormântul gol și tot acolo s-a aprins prima candelă.',
      },
    },
    {
      type: 'order',
      q: { en: 'Put these events in the right order:', ro: 'Pune aceste întâmplări în ordinea corectă:' },
      items: [
        { en: 'Jesus rises from the dead', ro: 'Iisus învie din morți' },
        { en: 'Pentecost: the Holy Spirit comes', ro: 'Cincizecimea: vine Duhul Sfânt' },
        { en: 'Stephen, the first martyr', ro: 'Ștefan, primul martir' },
        { en: 'Saul meets Jesus on the road to Damascus', ro: 'Saul Îl întâlnește pe Iisus pe drumul Damascului' },
        { en: 'In Antioch, believers are first called "Christians"', ro: 'În Antiohia, credincioșii sunt numiți pentru prima dată „creștini”' },
      ],
      explain: {
        en: 'That is how it happened, from about AD 30 to AD 45: in only fifteen years, from Jerusalem to great Antioch!',
        ro: 'Așa s-au întâmplat, cam între anii 30 și 45: în doar cincisprezece ani, de la Ierusalim până în marea Antiohie!',
      },
    },
    {
      type: 'pick',
      q: {
        en: 'Jesus lived and taught in a town by the Sea of Galilee: Capernaum. Can you find it? Click on the map!',
        ro: 'Iisus a trăit și a învățat într-un oraș de lângă Marea Galileii: Capernaum. Îl găsești? Dă clic pe hartă!',
      },
      at: [35.575, 32.881],
      radiusKm: 14,
      focus: ['capernaum', 'nazareth', 'caesarea', 'caesareaphilippi'],
      answer: { en: 'Capernaum', ro: 'Capernaum' },
      explain: {
        en: 'Capernaum is on the north shore of the Sea of Galilee. Peter and Andrew were fishermen there.',
        ro: 'Capernaum este pe malul de nord al Mării Galileii. Petru și Andrei erau pescari acolo.',
      },
    },
    {
      type: 'mc',
      q: { en: 'What happened at Pentecost?', ro: 'Ce s-a întâmplat la Cincizecime?' },
      options: [
        { en: 'The Holy Spirit came, and everyone heard the apostles in their own language', ro: 'A venit Duhul Sfânt, iar fiecare îi auzea pe apostoli în limba lui' },
        { en: 'A great storm sank all the ships in the harbour', ro: 'O furtună mare a scufundat toate corăbiile din port' },
        { en: 'The emperor came to visit Jerusalem', ro: 'Împăratul a venit în vizită la Ierusalim' },
        { en: 'The apostles built a big new temple', ro: 'Apostolii au construit un templu nou și mare' },
      ],
      explain: {
        en: 'The Holy Spirit came down like tongues of fire. That day 3,000 people were baptized, and Grandfather Eli was one of them!',
        ro: 'Duhul Sfânt a coborât ca niște limbi de foc. În ziua aceea s-au botezat 3.000 de oameni, iar bunicul Eli a fost unul dintre ei!',
      },
    },
    {
      type: 'mc',
      q: { en: 'Who was Cornelius?', ro: 'Cine era Corneliu?' },
      options: [
        { en: 'A Roman centurion who was baptized with his whole family', ro: 'Un centurion roman care s-a botezat cu toată familia' },
        { en: 'A fisherman from Galilee', ro: 'Un pescar din Galileea' },
        { en: 'The king of Cyprus', ro: 'Regele Ciprului' },
        { en: 'A sailor on Father\'s ship', ro: 'Un marinar de pe corabia tatei' },
      ],
      explain: {
        en: 'Cornelius was a Roman officer in Caesarea. He was not a Jew, and so everyone understood that the good news is for every people.',
        ro: 'Corneliu era un ofițer roman din Cezareea. Nu era iudeu, și așa au înțeles toți că vestea cea bună este pentru toate popoarele.',
      },
    },
    {
      type: 'mc',
      q: { en: 'In which city were the believers first called "Christians"?', ro: 'În ce oraș au fost numiți credincioșii pentru prima dată „creștini”?' },
      options: [
        { en: 'Antioch', ro: 'Antiohia' },
        { en: 'Jerusalem', ro: 'Ierusalim' },
        { en: 'Rome', ro: 'Roma' },
        { en: 'Tarsus', ro: 'Tars' },
      ],
      explain: {
        en: 'In Antioch, one of the three greatest cities of the Empire. Barnabas and Saul taught there for a whole year.',
        ro: 'În Antiohia, unul dintre cele mai mari trei orașe ale Imperiului. Barnaba și Saul au învățat acolo un an întreg.',
      },
    },
    {
      type: 'pick',
      q: {
        en: 'The first stop of the journey was Barnabas\'s home island. Click on it!',
        ro: 'Prima oprire a călătoriei a fost insula natală a lui Barnaba. Dă clic pe ea!',
      },
      at: [33.2, 35.1],
      radiusKm: 110,
      focus: ['antiochia', 'tarsus', 'perga', 'salamis', 'paphos', 'caesarea'],
      answer: { en: 'Cyprus', ro: 'Cipru' },
      explain: {
        en: 'Cyprus! Father\'s ship sailed from Seleucia to Salamis, and then they crossed the island to Paphos.',
        ro: 'Ciprul! Corabia tatei a plecat din Seleucia spre Salamina, iar apoi au traversat insula până la Pafos.',
      },
    },
    {
      type: 'mc',
      q: {
        en: 'In Lystra, Paul healed a man who had never walked. What did the crowd think?',
        ro: 'La Listra, Pavel a vindecat un om care nu umblase niciodată. Ce a crezut mulțimea?',
      },
      options: [
        { en: 'That Paul and Barnabas were the gods Zeus and Hermes', ro: 'Că Pavel și Barnaba sunt zeii Zeus și Hermes' },
        { en: 'That they were Roman spies', ro: 'Că sunt spioni romani' },
        { en: 'That they were magicians from Egypt', ro: 'Că sunt magicieni din Egipt' },
        { en: 'Nobody noticed anything', ro: 'Nimeni nu a observat nimic' },
      ],
      explain: {
        en: '"No! We are human, just like you," they cried. "We bring you good news of the living God!"',
        ro: '„Nu! Suntem oameni ca și voi”, au strigat ei. „Vă aducem vestea cea bună a Dumnezeului celui viu!”',
      },
    },
    {
      type: 'order',
      q: { en: 'Put the stops of the first journey in order:', ro: 'Pune opririle primei călătorii în ordine:' },
      items: [
        { en: 'Salamis', ro: 'Salamina' },
        { en: 'Paphos', ro: 'Pafos' },
        { en: 'Perga', ro: 'Perga' },
        { en: 'Iconium', ro: 'Iconia' },
        { en: 'Derbe', ro: 'Derbe' },
      ],
      explain: {
        en: 'Across Cyprus from Salamis to Paphos, by sea to Perga, then up into the mountains: Pisidian Antioch, Iconium, Lystra, and finally Derbe.',
        ro: 'Prin Cipru, de la Salamina la Pafos, pe mare până la Perga, apoi sus, în munți: Antiohia Pisidiei, Iconia, Listra și, la urmă, Derbe.',
      },
    },
    {
      type: 'mc',
      q: {
        en: 'On the way home, why did Paul and Barnabas go back through the towns where they had been attacked?',
        ro: 'La întoarcere, de ce au trecut Pavel și Barnaba din nou prin orașele în care fuseseră atacați?',
      },
      options: [
        { en: 'To encourage the new believers and choose elders for each church', ro: 'Ca să-i încurajeze pe noii credincioși și să aleagă presbiteri pentru fiecare biserică' },
        { en: 'Because they got lost', ro: 'Pentru că s-au rătăcit' },
        { en: 'To take revenge on their enemies', ro: 'Ca să se răzbune pe dușmani' },
        { en: 'To sell the tents they had made', ro: 'Ca să vândă corturile pe care le făcuseră' },
      ],
      explain: {
        en: 'They were brave because they loved the new churches. "Stay strong in the faith!" they told them.',
        ro: 'Au fost curajoși pentru că iubeau noile biserici. „Rămâneți tari în credință!”, le-au spus.',
      },
    },
  ],
  // What the children say after each answer (cycled).
  cheers: {
    en: ['Thalia: "Exactly!"', 'Nikias: "Well done, sailor!"', 'Thalia: "You remembered!"', 'Nikias: "Father would be proud!"'],
    ro: ['Thalia: „Exact!”', 'Nikias: „Bravo, marinarule!”', 'Thalia: „Ți-ai amintit!”', 'Nikias: „Tata ar fi mândru!”'],
  },
  oops: {
    en: ['Nikias: "Not quite…"', 'Thalia: "Almost! Look:"', 'Nikias: "Hmm, let\'s look again."'],
    ro: ['Nikias: „Nu chiar…”', 'Thalia: „Aproape! Uite:”', 'Nikias: „Hmm, hai să ne mai uităm o dată.”'],
  },
  done: {
    pass: {
      en: '"You did it!" Thalia laughs. "Father says you can join the crew. From today you are a real deckhand on the Euploia!"',
      ro: '„Ai reușit!”, râde Thalia. „Tata zice că poți intra în echipaj. De azi ești mus adevărat pe Euploia!”',
    },
    fail: {
      en: '"Don\'t worry," says Nikias. "Even Father didn\'t learn the sea in one day. Listen to Grandfather Eli\'s story again, then try once more!"',
      ro: '„Nu-i nimic”, spune Nikias. „Nici tata n-a învățat marea într-o zi. Mai ascultă o dată povestea bunicului Eli și încearcă din nou!”',
    },
  },
};
