// "How it all began": the prologue before Paul's journeys (Acts 1–12, c. AD 30–46),
// told by Grandfather Eli, an eyewitness and believer (baptized at Pentecost).
//
// Each step:
//   place   — title shown on the card;  year — label for the cartouche
//   focus   — city ids or [lon, lat] points to frame ('all' = whole map)
//   light   — city ids whose lamp is lit at this step
//   arrows  — [{ from, to, label, style }]; from/to are city ids or [lon, lat];
//             style: 'spread' (solid, animated) | 'tradition' (dotted)
//   note    — optional "What historians say" fold-out, as on the journey cards

const JERUSALEM = 'hierosolyma';

export const intro = {
  title: { en: 'How it all began', ro: 'Cum a început totul' },
  years: { en: 'c. AD 30–46 · Acts 1–12', ro: 'cca. 30–46 d.Hr. · Faptele Apostolilor 1–12' },
  steps: [
    {
      place: { en: 'Before the journey', ro: 'Înainte de călătorie' },
      year: { en: 'AD 46', ro: '46 d.Hr.' },
      focus: 'all',
      narrator: true,
      en: "\"Come here, Nikias and Thalia, and sit by the lamp,\" says Grandfather Eli. \"Before you meet Paul, you must know how it all began. It wasn't long ago, only about fifteen years. My beard was just turning grey, and your mother was a young woman, not yet married. I saw it all with my own eyes…\"",
      ro: "„Veniți aici, Nikias și Thalia, și stați lângă candelă”, spune bunicul Eli. „Înainte să-l cunoașteți pe Pavel, trebuie să știți cum a început totul. Nu a fost demult, doar vreo cincisprezece ani. Barba mea abia începea să încărunțească, iar mama voastră era o tânără încă nemăritată. Am văzut totul cu ochii mei…”",
    },
    {
      place: { en: 'Galilee and Jerusalem', ro: 'Galileea și Ierusalim' },
      year: { en: 'c. AD 30', ro: 'cca. 30 d.Hr.' },
      focus: ['capernaum', JERUSALEM, 'caesarea'],
      en: "\"I saw him once, at Passover in Jerusalem: Jesus of Nazareth. He healed the sick, ate with the poor, with tax collectors and sinners whom others called unclean, and proclaimed: 'The Kingdom of God has come near!' Then, at Bethany, he raised Lazarus, who had been dead for four days, and many believed in him. But the chief priests and the Pharisees met in council: 'What are we to do? This man performs many signs. If we let him go on like this, everyone will believe in him!' And from that day on they planned to kill him. They handed him over to the Romans to be crucified. We thought it was all over. His friends hid, full of fear.\"",
      ro: "„L-am văzut o dată, de Paști, la Ierusalim: Iisus din Nazaret. Îi vindeca pe bolnavi, mânca împreună cu cei săraci, cu vameșii și cu păcătoșii, pe care alții îi socoteau necurați, și propovăduia: «S-a apropiat Împărăția lui Dumnezeu!» Apoi, la Betania, l-a înviat pe Lazăr, care era mort de patru zile, și mulți au crezut în El. Dar arhiereii și fariseii s-au adunat în sfat: «Ce facem? Omul acesta face multe minuni. Dacă-L lăsăm așa, toți vor crede în El!» Și din ziua aceea au hotărât să-L omoare. L-au dat în mâinile romanilor, ca să fie răstignit. Credeam că totul s-a sfârșit. Prietenii Lui s-au ascuns, plini de frică.”",
      note: {
        en: "The raising of Lazarus is told only in the Gospel of John (chapter 11). There it is the event that leads straight to the decision to put Jesus to death.",
        ro: "Învierea lui Lazăr este povestită doar în Evanghelia după Ioan (capitolul 11). Acolo, ea este chiar pricina care duce la hotărârea de a-L omorî pe Iisus.",
      },
    },
    {
      place: { en: 'The empty tomb', ro: 'Mormântul gol' },
      year: { en: 'c. AD 30', ro: 'cca. 30 d.Hr.' },
      focus: ['nazareth', JERUSALEM, 'caesarea'],
      light: [JERUSALEM],
      en: "\"But on the third day, the women went to the tomb, and it was empty! Jesus had risen from the dead! Peter, John and the others saw him alive. They ate with him, and Thomas touched his wounds. Death could not hold him! This is the good news we carry across the sea. And here, in Jerusalem, the very first lamp was lit.\"",
      ro: "„Dar a treia zi, femeile au mers la mormânt, și mormântul era gol! Iisus înviase din morți! Petru, Ioan și ceilalți L-au văzut viu. Au mâncat cu El, iar Toma I-a atins rănile. Moartea nu L-a putut ține! Aceasta este vestea cea bună pe care o ducem peste mare. Și aici, la Ierusalim, s-a aprins prima candelă.”",
    },
    {
      place: { en: 'Pentecost', ro: 'Cincizecimea' },
      year: { en: 'c. AD 30', ro: 'cca. 30 d.Hr.' },
      focus: 'all',
      card: 'left',
      narrator: true,
      en: "\"Fifty days later, I was in Jerusalem for the feast. Suddenly we heard a sound like a mighty wind, and the Holy Spirit came down on the apostles like tongues of fire! Peter spoke to the crowd, and each of us heard him in our own language: Parthians, Egyptians, Romans, Cretans… That day, 3,000 of us were baptized. I was one of them! Then the pilgrims carried the good news home.\"",
      ro: "„După cincizeci de zile, eram la Ierusalim pentru sărbătoare. Deodată s-a auzit un vuiet ca de vânt puternic, iar Duhul Sfânt a coborât peste apostoli ca niște limbi de foc! Petru a vorbit mulțimii și fiecare dintre noi îl auzea în limba lui: parți, egipteni, romani, cretani… În ziua aceea ne-am botezat 3.000. Eu am fost unul dintre ei! Apoi pelerinii au dus vestea cea bună acasă.”",
      // Acts 2:9–11
      arrows: [
        { to: [44.4, 33.9], label: { en: 'Parthians', ro: 'Parți' }, anchor: 'end' },
        { to: [45.6, 36.3], label: { en: 'Medes', ro: 'Mezi' }, anchor: 'end' },
        { to: [45.8, 31.9], label: { en: 'Elamites', ro: 'Elamiți' }, anchor: 'end' },
        { to: [41.4, 36.4], label: { en: 'Mesopotamia', ro: 'Mesopotamia' } },
        { to: [35.6, 38.9], label: { en: 'Cappadocia', ro: 'Capadocia' } },
        { to: [36.3, 40.9], label: { en: 'Pontus', ro: 'Pont' } },
        { to: [28.0, 38.7], label: { en: 'Asia', ro: 'Asia' } },
        { to: [30.6, 39.2], label: { en: 'Phrygia', ro: 'Frigia' } },
        { to: [31.0, 37.15], label: { en: 'Pamphylia', ro: 'Pamfilia' } },
        { to: [31.0, 29.6], label: { en: 'Egypt', ro: 'Egipt' } },
        { to: [21.9, 32.6], label: { en: 'Libya, near Cyrene', ro: 'Libia, lângă Cirene' } },
        { to: [12.49, 41.89], label: { en: 'Rome', ro: 'Roma' } },
        { to: [24.9, 35.25], label: { en: 'Crete', ro: 'Creta' } },
        { to: [37.6, 29.4], label: { en: 'Arabia', ro: 'Arabia' } },
      ],
    },
    {
      place: { en: 'The first community', ro: 'Prima comunitate' },
      year: { en: 'c. AD 30–33', ro: 'cca. 30–33 d.Hr.' },
      focus: ['nazareth', JERUSALEM, 'ioppe'],
      narrator: true,
      en: "\"We met in each other's houses. We prayed together and broke bread together, as Jesus had taught us, and we shared everything we had, so that no one went hungry. Widows who had no one were fed every day. People in Jerusalem said: look how they love one another!\"",
      ro: "„Ne adunam unii în casele altora. Ne rugam împreună și frângeam pâinea împreună, așa cum ne învățase Iisus, și împărțeam tot ce aveam, ca nimeni să nu flămânzească. Văduvele care nu aveau pe nimeni primeau mâncare în fiecare zi. Oamenii din Ierusalim spuneau: uitați-vă cât se iubesc unii pe alții!”",
    },
    {
      place: { en: 'Stephen, and the scattering', ro: 'Ștefan și împrăștierea' },
      year: { en: 'c. AD 34', ro: 'cca. 34 d.Hr.' },
      focus: [JERUSALEM, 'damascus', 'antiochia', 'salamis', [33.6, 27.5]],
      light: ['samaria', 'damascus', 'tyrus'],
      en: "\"Then came hard days. Our brother Stephen, full of grace and courage, was killed because he spoke about Jesus. As he died, he forgave the men who killed him, just as Jesus did. He was the first martyr, the first witness. Many of us had to flee Jerusalem. But wherever we went, we told the good news: in Samaria, in Damascus, along the coast. Philip even baptized a royal official from far-away Ethiopia!\"",
      ro: "„Au urmat zile grele. Fratele nostru Ștefan, plin de har și de curaj, a fost ucis pentru că vorbea despre Iisus. Când murea, i-a iertat pe cei care l-au ucis, așa cum a făcut și Iisus. A fost primul martir, primul mărturisitor. Mulți dintre noi a trebuit să fugim din Ierusalim. Dar oriunde mergeam, vesteam vestea cea bună: în Samaria, la Damasc, pe coastă. Filip a botezat chiar un dregător al reginei din îndepărtata Etiopie!”",
      arrows: [
        { to: 'samaria' },
        { to: 'damascus' },
        { to: 'tyrus', label: { en: 'Phoenicia', ro: 'Fenicia' } },
        { to: [33.4, 27.6], label: { en: '↓ to Ethiopia', ro: '↓ spre Etiopia' } },
      ],
    },
    {
      place: { en: 'The road to Damascus', ro: 'Drumul Damascului' },
      year: { en: 'c. AD 34–36', ro: 'cca. 34–36 d.Hr.' },
      focus: [JERUSALEM, 'damascus', 'tarsus'],
      en: "\"Our fiercest enemy was Saul of Tarsus. He wanted to put every follower of Jesus in prison. But on the road to Damascus, a light from heaven flashed around him, and the risen Jesus spoke to him: 'Saul, Saul, why are you persecuting me?' Saul was blind for three days, until our brother Ananias prayed for him. The hunter became our brother! Later he went home to Tarsus.\"",
      ro: "„Cel mai aprig dușman al nostru era Saul din Tars. Voia să-i bage în temniță pe toți ucenicii lui Iisus. Dar pe drumul Damascului, o lumină din cer a strălucit în jurul lui, iar Iisus cel înviat i-a vorbit: «Saule, Saule, de ce Mă prigonești?» Saul a fost orb trei zile, până când fratele nostru Anania s-a rugat pentru el. Vânătorul a devenit fratele nostru! Mai târziu s-a întors acasă, la Tars.”",
      arrows: [
        { from: JERUSALEM, to: 'damascus', label: { en: '', ro: '' } },
        { from: 'damascus', to: 'tarsus', label: { en: 'home to Tarsus', ro: 'acasă, la Tars' } },
      ],
    },
    {
      place: { en: 'Peter and the Roman officer', ro: 'Petru și ofițerul roman' },
      year: { en: 'c. AD 37–40', ro: 'cca. 37–40 d.Hr.' },
      focus: [JERUSALEM, 'ioppe', 'caesarea', 'nazareth'],
      light: ['ioppe', 'caesarea'],
      en: "\"In Joppa, God showed Peter a vision: no person is unclean in God's eyes. Then a Roman centurion called Cornelius, a good man who prayed to our God, sent for him from Caesarea. While Peter was still speaking, the Holy Spirit came down on Cornelius and his whole family, and they were baptized, even though they were not Jews! So the good news is for every people under heaven.\"",
      ro: "„La Iope, Dumnezeu i-a arătat lui Petru o vedenie: niciun om nu este necurat în ochii lui Dumnezeu. Apoi un centurion roman numit Corneliu, un om bun care se ruga Dumnezeului nostru, a trimis după el de la Cezareea. Pe când Petru încă vorbea, Duhul Sfânt a coborât peste Corneliu și peste toată familia lui, iar ei s-au botezat, deși nu erau iudei! Așadar, vestea cea bună este pentru toate popoarele de sub cer.”",
      arrows: [
        { from: JERUSALEM, to: 'ioppe', label: { en: '', ro: '' } },
        { from: 'ioppe', to: 'caesarea', label: { en: '', ro: '' } },
      ],
    },
    {
      place: { en: 'Antioch', ro: 'Antiohia' },
      year: { en: 'c. AD 40–45', ro: 'cca. 40–45 d.Hr.' },
      focus: ['antiochia', 'tarsus', 'salamis', 'cyrene', JERUSALEM],
      light: ['antiochia'],
      en: "\"In great Antioch, brothers from Cyprus and Cyrene told the good news to the Greeks too, and so many believed! Barnabas, a good man full of the Holy Spirit, came to help, and he fetched Saul from Tarsus. For a whole year they taught together. And it was here, in Antioch, that people first called us 'Christians', the people of Christ.\"",
      ro: "„În marea Antiohie, frați din Cipru și din Cirene le-au vestit și grecilor vestea cea bună, și foarte mulți au crezut! Barnaba, un om bun, plin de Duh Sfânt, a venit să ajute și l-a adus pe Saul din Tars. Un an întreg au învățat împreună. Și tot aici, în Antiohia, am fost numiți pentru prima dată «creștini», oamenii lui Hristos.”",
      arrows: [
        { from: JERUSALEM, to: 'antiochia', label: { en: 'Barnabas', ro: 'Barnaba' } },
        { from: 'tarsus', to: 'antiochia', label: { en: 'Saul', ro: 'Saul' } },
        { from: 'salamis', to: 'antiochia', label: { en: '', ro: '' } },
        { from: 'cyrene', to: 'antiochia', label: { en: '', ro: '' } },
      ],
    },
    {
      place: { en: 'Where did the apostles go?', ro: 'Unde au mers apostolii?' },
      year: { en: 'the following years', ro: 'în anii următori' },
      focus: 'all',
      card: 'left',
      tradition: true,
      en: "Many years later, Nikias wrote in the family logbook: \"Jesus told the apostles: 'Go and make disciples of all nations!' And they went. Peter went to Rome, John to Ephesus, Mark to Alexandria. Thomas went all the way to India, and Andrew to Scythia, by the Black Sea, where our cousins live (today's Dobrogea, in Romania!). Some of this we only heard from travellers, but one thing is sure: the lamps kept spreading.\"",
      ro: "Mulți ani mai târziu, Nikias a scris în jurnalul familiei: „Iisus le-a spus apostolilor: «Mergeți și învățați toate neamurile!» Și ei au mers. Petru a mers la Roma, Ioan la Efes, Marcu în Alexandria. Toma a ajuns până în India, iar Andrei în Sciția, lângă Marea Neagră, unde trăiesc verii noștri (Dobrogea de azi, în România!). Unele lucruri le-am aflat doar de la călători, dar un lucru e sigur: candelele s-au tot aprins.”",
      arrows: [
        { from: 'antiochia', to: 'roma', label: { en: 'Peter', ro: 'Petru' }, style: 'tradition' },
        { to: 'ephesus', label: { en: 'John', ro: 'Ioan' }, style: 'tradition' },
        { to: 'alexandria', label: { en: 'Mark', ro: 'Marcu' }, style: 'tradition' },
        { to: [45.6, 30.6], label: { en: 'Thomas → India', ro: 'Toma → India' }, style: 'tradition', anchor: 'end' },
        { to: [28.9, 44.6], label: { en: 'Andrew → Scythia', ro: 'Andrei → Sciția' }, style: 'tradition' },
        { to: [44.3, 40.0], label: { en: 'Bartholomew → Armenia', ro: 'Bartolomeu → Armenia' }, style: 'tradition', anchor: 'end' },
        { to: 'edessa', label: { en: 'Thaddeus', ro: 'Tadeu' }, style: 'tradition' },
        { to: [29.12, 37.93], label: { en: 'Philip → Hierapolis', ro: 'Filip → Hierapole' }, style: 'tradition' },
      ],
    },
    {
      place: { en: 'Antioch, AD 46', ro: 'Antiohia, 46 d.Hr.' },
      year: { en: 'AD 46', ro: '46 d.Hr.' },
      focus: 'all',
      narrator: true,
      en: "\"And that is where things stand today,\" says Eli. \"In Antioch, the church is praying and fasting. I think the Holy Spirit is about to send Barnabas and Paul far away, across the sea. And your father's ship sails from Seleucia soon… Keep your eyes open, children. You will see great things.\"",
      ro: "„Și așa stau lucrurile astăzi”, spune Eli. „În Antiohia, comunitatea se roagă și postește. Cred că Duhul Sfânt e gata să-i trimită pe Barnaba și pe Pavel departe, peste mare. Iar corabia tatălui vostru pleacă în curând din Seleucia… Țineți ochii deschiși, copii. Veți vedea lucruri mari.”",
    },
  ],
};
