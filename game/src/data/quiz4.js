// Quiz gate 4: The Voyage to Rome (Acts 21:17–28:31). Same question types as quiz1.js.

export const quiz4 = {
  id: 'quiz4',
  title: { en: 'Quiz: The voyage to Rome', ro: 'Test: Călătoria spre Roma' },
  subtitle: { en: '10 questions · Acts 21–28', ro: '10 întrebări · Faptele Apostolilor 21–28' },
  intro: {
    en: '"We survived a shipwreck together," says Father, wrapping you in a dry blanket. "Now let\'s see if you remember it all. Get 7 out of 10 right, and you will be my First Mate!"',
    ro: '„Am scăpat împreună dintr-un naufragiu”, spune tata și te învelește cu o pătură uscată. „Acum să vedem dacă ții minte tot. Răspunde corect la 7 din 10, și vei fi secundul meu!”',
  },
  pass: 7,
  rank: { en: 'First Mate', ro: 'Secund' },
  replay: 'paul-4',
  questions: [
    {
      type: 'mc',
      q: { en: 'Why did the crowd in the Temple attack Paul?', ro: 'De ce l-a atacat mulțimea pe Pavel în Templu?' },
      options: [
        { en: 'They thought he had brought a Greek into the Temple', ro: 'Credeau că a băgat un grec în Templu' },
        { en: 'He had stolen something from the Temple', ro: 'Furase ceva din Templu' },
        { en: 'He was singing too loudly', ro: 'Cânta prea tare' },
        { en: 'He had insulted the Emperor', ro: 'Îl insultase pe împărat' },
      ],
      explain: {
        en: 'They had seen him in the city with Trophimus from Ephesus, and thought Paul had taken him past the wall where gentiles were not allowed. But he hadn\'t!',
        ro: 'Îl văzuseră în oraș cu Trofim din Efes și credeau că Pavel l-a dus dincolo de zidul unde neamurile n-aveau voie. Dar nu era adevărat!',
      },
    },
    {
      type: 'mc',
      q: { en: 'More than forty men swore not to eat until they had killed Paul. Who found out about their plot?', ro: 'Peste patruzeci de oameni s-au jurat să nu mănânce până nu-l vor omorî pe Pavel. Cine a aflat de uneltirea lor?' },
      options: [
        { en: "Paul's nephew, the son of his sister", ro: 'Nepotul lui Pavel, fiul surorii lui' },
        { en: 'King Agrippa', ro: 'Regele Agripa' },
        { en: 'Grandfather Eli', ro: 'Bunicul Eli' },
        { en: 'The high priest', ro: 'Marele preot' },
      ],
      explain: {
        en: 'The boy bravely told Paul and the Roman commander, and that same night Paul was taken to Caesarea with almost five hundred soldiers.',
        ro: 'Băiatul le-a spus cu curaj lui Pavel și comandantului roman, iar chiar în noaptea aceea Pavel a fost dus la Cezareea cu aproape cinci sute de soldați.',
      },
    },
    {
      type: 'mc',
      q: { en: 'Paul said: "I appeal to Caesar!" Why was he allowed to ask to be judged by the Emperor?', ro: 'Pavel a spus: „Cer să fiu judecat de Cezar!” De ce avea dreptul să ceară să fie judecat de împărat?' },
      options: [
        { en: 'He was a Roman citizen', ro: 'Era cetățean roman' },
        { en: 'He was a friend of the Emperor', ro: 'Era prieten cu împăratul' },
        { en: 'He paid the governor', ro: 'L-a plătit pe guvernator' },
        { en: 'He was a soldier', ro: 'Era soldat' },
      ],
      explain: {
        en: '"You have appealed to Caesar: to Caesar you shall go!" said Festus. And so Paul went to Rome, as the Lord had promised him.',
        ro: '„Ai cerut să fii judecat de Cezar: la Cezar te vei duce!”, a spus Festus. Și așa a ajuns Pavel la Roma, cum îi făgăduise Domnul.',
      },
    },
    {
      type: 'mc',
      q: { en: 'At Fair Havens, on Crete, why did Paul say the ship should not sail on?', ro: 'La Limanuri Bune, în Creta, de ce a spus Pavel că corabia nu trebuie să mai plece?' },
      options: [
        { en: 'It was too late in the year: winter storms were coming', ro: 'Era prea târziu în an: veneau furtunile de iarnă' },
        { en: 'He wanted to see the mountains of Crete', ro: 'Voia să vadă munții Cretei' },
        { en: 'The ship had no more food', ro: 'Corabia nu mai avea mâncare' },
        { en: 'There were pirates near Phoenix', ro: 'Erau pirați lângă Fenix' },
      ],
      explain: {
        en: 'The Fast was already over, and the sailing season was ending. But the centurion believed the captain, and soon the Northeaster came down on us.',
        ro: 'Postul trecuse, iar vremea bună pentru navigat se sfârșea. Dar centurionul l-a crezut pe cârmaci, și curând s-a năpustit asupra noastră Eurachilonul.',
      },
    },
    {
      type: 'mc',
      q: { en: 'In the storm, an angel spoke to Paul. What did he promise?', ro: 'În furtună, un înger i-a vorbit lui Pavel. Ce i-a făgăduit?' },
      options: [
        { en: 'Paul would stand before Caesar, and everyone on the ship would live', ro: 'Pavel va sta înaintea Cezarului, iar toți cei de pe corabie vor scăpa cu viață' },
        { en: 'The storm would stop the next morning', ro: 'Furtuna se va opri a doua zi dimineață' },
        { en: 'The ship would reach Rome without any damage', ro: 'Corabia va ajunge la Roma fără nicio stricăciune' },
        { en: 'Paul would be set free at once', ro: 'Pavel va fi eliberat pe loc' },
      ],
      explain: {
        en: '"Keep up your courage, men! I believe God," said Paul. The ship was lost, but not one person.',
        ro: '„Îndrăzniți, bărbaților! Căci eu cred lui Dumnezeu”, a spus Pavel. Corabia s-a pierdut, dar niciun om.',
      },
    },
    {
      type: 'mc',
      q: { en: 'How many people were on the grain ship, and how many reached the shore safely?', ro: 'Câte suflete erau pe corabia cu grâu și câte au ajuns teferi la țărm?' },
      options: [
        { en: '276, and every single one was saved', ro: '276, și au scăpat toți, până la unul' },
        { en: '276, but only half were saved', ro: '276, dar a scăpat doar jumătate' },
        { en: '12, and all were saved', ro: '12, și au scăpat toți' },
        { en: '1,000, and most were lost', ro: '1.000, și cei mai mulți s-au pierdut' },
      ],
      explain: {
        en: 'Some swam, others floated on planks, and Father counted us three times on the beach. Nobody was missing!',
        ro: 'Unii au înotat, alții au plutit pe scânduri, iar tata ne-a numărat de trei ori pe plajă. Nu lipsea nimeni!',
      },
    },
    {
      type: 'pick',
      q: {
        en: 'After fourteen days adrift, we were shipwrecked on an island. Find Malta on the map!',
        ro: 'După paisprezece zile purtați de furtună, am naufragiat pe o insulă. Găsește Malta pe hartă!',
      },
      at: [14.40, 35.90],
      radiusKm: 30,
      focus: ['kaloilimenes', 'melita', 'syracusae', 'carthago', 'rhegium'],
      answer: { en: 'Malta', ro: 'Malta' },
      explain: {
        en: 'Malta is a small island south of Sicily. The storm drove us all the way there from Crete, about 800 km across the open sea!',
        ro: 'Malta e o insulă mică la miazăzi de Sicilia. Furtuna ne-a purtat până acolo din Creta, cam 800 de km prin largul mării!',
      },
    },
    {
      type: 'mc',
      q: { en: 'On Malta, a viper bit Paul\'s hand by the fire. What happened?', ro: 'În Malta, lângă foc, o năpârcă i s-a prins lui Pavel de mână. Ce s-a întâmplat?' },
      options: [
        { en: 'He shook it off into the fire and was not harmed', ro: 'A scuturat-o în foc și n-a pățit nimic' },
        { en: 'He was very sick for a week', ro: 'A fost foarte bolnav o săptămână' },
        { en: 'Luke the doctor cut the bite open', ro: 'Doctorul Luca i-a tăiat mușcătura' },
        { en: 'He kept the snake as a pet', ro: 'Și-a păstrat șarpele ca animal de companie' },
      ],
      explain: {
        en: 'The islanders first thought he was a murderer, then that he was a god! Then Paul healed the father of Publius, and many other sick people.',
        ro: 'Localnicii au crezut mai întâi că e un ucigaș, apoi că e un zeu! Apoi Pavel l-a vindecat pe tatăl lui Publius și pe mulți alți bolnavi.',
      },
    },
    {
      type: 'order',
      q: { en: 'Put the places of the voyage in order:', ro: 'Pune în ordine locurile din călătorie:' },
      items: [
        { en: 'Caesarea', ro: 'Cezareea' },
        { en: 'Myra', ro: 'Mira' },
        { en: 'Fair Havens', ro: 'Limanuri Bune' },
        { en: 'Malta', ro: 'Malta' },
        { en: 'Rome', ro: 'Roma' },
      ],
      explain: {
        en: 'From Caesarea to Myra, where we changed to the grain ship; along Crete to Fair Havens; the storm and the shipwreck on Malta; and in spring, by Syracuse and Puteoli, to Rome.',
        ro: 'De la Cezareea la Mira, unde am trecut pe corabia cu grâu; de-a lungul Cretei, la Limanuri Bune; furtuna și naufragiul în Malta; iar primăvara, prin Siracuza și Puteoli, la Roma.',
      },
    },
    {
      type: 'mc',
      q: { en: 'How did Paul live in Rome?', ro: 'Cum a trăit Pavel la Roma?' },
      options: [
        { en: 'In a rented house, guarded by a soldier, welcoming everyone and preaching boldly', ro: 'Într-o casă cu chirie, păzit de un soldat, primindu-i pe toți și propovăduind cu îndrăzneală' },
        { en: 'In the Emperor\'s palace, as his guest', ro: 'În palatul împăratului, ca oaspete' },
        { en: 'Hidden in the catacombs, speaking to no one', ro: 'Ascuns în catacombe, fără să vorbească cu nimeni' },
        { en: 'He went home to Tarsus at once', ro: 'S-a întors imediat acasă, la Tars' },
      ],
      explain: {
        en: 'For two whole years, "with all boldness, and no one stopped him". That is how the book of Acts ends.',
        ro: 'Doi ani întregi, „cu toată îndrăzneala și fără nicio piedică”. Așa se încheie cartea Faptele Apostolilor.',
      },
    },
  ],
  cheers: {
    en: ['Thalia: "Land ho!"', 'Nikias: "Steady on the rudder!"', 'Father: "A true sailor!"', 'Thalia: "You remember everything!"'],
    ro: ['Thalia: „Pământ la orizont!”', 'Nikias: „Ții bine cârma!”', 'Tata: „Marinar adevărat!”', 'Thalia: „Ții minte tot!”'],
  },
  oops: {
    en: ['Nikias: "Not quite…"', 'Thalia: "Almost! Look:"', 'Nikias: "Hmm, the storm must have washed that out of the logbook."'],
    ro: ['Nikias: „Nu chiar…”', 'Thalia: „Aproape! Uite:”', 'Nikias: „Hmm, furtuna trebuie să fi șters asta din jurnal.”'],
  },
  done: {
    pass: {
      en: 'Father shakes your hand like a grown-up sailor. "First Mate of the Euploia! When we get home, you will stand beside me at the rudder."',
      ro: 'Tata îți strânge mâna ca unui marinar în toată firea. „Secundul Euploiei! Când ajungem acasă, vei sta lângă mine la cârmă.”',
    },
    fail: {
      en: '"After a storm like that, who could remember everything?" laughs Thalia. "Let\'s sail to Rome once more, then try again!"',
      ro: '„După o furtună ca asta, cine ar putea să țină minte tot?”, râde Thalia. „Hai să mai mergem o dată până la Roma, apoi mai încearcă!”',
    },
  },
};
