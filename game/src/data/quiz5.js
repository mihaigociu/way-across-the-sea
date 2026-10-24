// Quiz for the bonus chapter ★: In the Footsteps of St Andrew (Tomis, AD 62). Same question types as quiz1.js.
// It gives a badge instead of a rank: the ranks belong to the main story.

export const quiz5 = {
  id: 'quiz5',
  title: { en: 'Quiz: By the Black Sea', ro: 'Test: La Marea Neagră' },
  subtitle: { en: '10 questions · St Andrew and Dobrogea', ro: '10 întrebări · Sfântul Andrei și Dobrogea' },
  intro: {
    en: 'Ana holds up her new logbook: "Before you leave, I want to check you were listening to my stories! Get 7 out of 10 right, and you will be a true Friend of the Black Sea."',
    ro: 'Ana își ridică jurnalul cel nou: „Până să plecați, vreau să văd dacă ați fost atenți la poveștile mele! Răspunde corect la 7 din 10, și vei fi un adevărat Prieten al Mării Negre.”',
  },
  pass: 7,
  badge: { en: 'Friend of the Black Sea', ro: 'Prieten al Mării Negre' },
  replay: 'andrew-1',
  questions: [
    {
      type: 'mc',
      q: { en: 'Who was Andrew?', ro: 'Cine a fost Andrei?' },
      options: [
        { en: 'A fisherman from Galilee, the brother of Simon Peter', ro: 'Un pescar din Galileea, fratele lui Simon Petru' },
        { en: 'A Roman soldier from Tomis', ro: 'Un soldat roman din Tomis' },
        { en: 'A Greek poet sent away by the Emperor', ro: 'Un poet grec trimis departe de împărat' },
        { en: 'The captain of the Euploia', ro: 'Cârmaciul Euploiei' },
      ],
      explain: {
        en: 'Andrew and Simon were fishermen at the Sea of Galilee. Jesus told them: "Follow me, and I will make you fishers of people!"',
        ro: 'Andrei și Simon erau pescari la Marea Galileii. Iisus le-a spus: „Veniți după Mine și vă voi face pescari de oameni!”',
      },
    },
    {
      type: 'mc',
      q: { en: 'What did Andrew do as soon as he met Jesus?', ro: 'Ce a făcut Andrei îndată ce L-a întâlnit pe Iisus?' },
      options: [
        { en: 'He ran to his brother: "We have found the Messiah!"', ro: 'A alergat la fratele său: „L-am găsit pe Mesia!”' },
        { en: 'He went back to his nets', ro: 'S-a întors la năvoadele lui' },
        { en: 'He sailed to Rome', ro: 'A plecat cu corabia la Roma' },
        { en: 'He kept it a secret', ro: 'A ținut totul în taină' },
      ],
      explain: {
        en: 'Andrew brought Simon to Jesus, and Jesus gave Simon a new name: Peter, "the rock".',
        ro: 'Andrei l-a adus pe Simon la Iisus, iar Iisus i-a dat lui Simon un nume nou: Petru, „piatra”.',
      },
    },
    {
      type: 'mc',
      q: { en: 'Five thousand people were hungry. What did Andrew find?', ro: 'Cinci mii de oameni erau flămânzi. Ce a găsit Andrei?' },
      options: [
        { en: 'A boy with five loaves and two fish', ro: 'Un băiat cu cinci pâini și doi pești' },
        { en: 'A boat full of grain', ro: 'O barcă plină cu grâu' },
        { en: 'A bag of silver coins', ro: 'O pungă cu arginți' },
        { en: 'A fig tree full of figs', ro: 'Un smochin plin de smochine' },
      ],
      explain: {
        en: 'It wasn\'t much, but Jesus blessed it, and everyone ate and was satisfied, with twelve baskets left over!',
        ro: 'Nu era mult, dar Iisus le-a binecuvântat, și toți au mâncat și s-au săturat, iar au mai rămas douăsprezece coșuri!',
      },
    },
    {
      type: 'pick',
      q: {
        en: 'Ana lives in a Greek town by the sea, today the biggest port in Romania. Find Tomis on the map!',
        ro: 'Ana locuiește într-un oraș grecesc de lângă mare, care e azi cel mai mare port al României. Găsește Tomisul pe hartă!',
      },
      at: [28.65, 44.17],
      radiusKm: 30,
      focus: ['byzantium', 'tomis', 'callatis', 'histria', 'peuce'],
      answer: { en: 'Tomis', ro: 'Tomis' },
      explain: {
        en: 'Tomis is today\'s Constanța, on the coast of Dobrogea, south of the mouths of the Danube.',
        ro: 'Tomisul este Constanța de azi, pe țărmul Dobrogei, la miazăzi de gurile Dunării.',
      },
    },
    {
      type: 'mc',
      q: { en: 'What did the very first Greek sailors call the Black Sea?', ro: 'Cum le spuneau Mării Negre primii marinari greci?' },
      options: [
        { en: 'The Inhospitable Sea', ro: 'Marea Neprimitoare' },
        { en: 'The Sea of Honey', ro: 'Marea de Miere' },
        { en: 'The Quiet Sea', ro: 'Marea Liniștită' },
        { en: 'The Sea of Rome', ro: 'Marea Romei' },
      ],
      explain: {
        en: 'Because of its storms and fogs! Later, when Greek towns were built all around it, it became the Pontus Euxinus, "the Hospitable Sea".',
        ro: 'Din cauza furtunilor și a cețurilor! Mai târziu, când grecii și-au construit orașe de jur împrejurul ei, a devenit Pontul Euxin, „Marea Primitoare”.',
      },
    },
    {
      type: 'mc',
      q: { en: 'Which poet from Rome lived in Tomis and complained about the cold?', ro: 'Ce poet din Roma a trăit la Tomis și se plângea de frig?' },
      options: [
        { en: 'Ovid', ro: 'Ovidiu' },
        { en: 'Homer', ro: 'Homer' },
        { en: 'Virgil', ro: 'Vergiliu' },
        { en: 'Pliny', ro: 'Pliniu' },
      ],
      explain: {
        en: 'The Emperor Augustus sent Ovid away to Tomis. He wrote that even the wine froze in the jars! Today his statue stands in the middle of Constanța.',
        ro: 'Împăratul Augustus l-a trimis pe Ovidiu la Tomis. El a scris că până și vinul îngheța în ulcioare! Astăzi statuia lui stă în mijlocul Constanței.',
      },
    },
    {
      type: 'mc',
      q: { en: 'Histria is the oldest town on the land of today\'s Romania. Who built it?', ro: 'Histria este cel mai vechi oraș de pe pământul României de azi. Cine a construit-o?' },
      options: [
        { en: 'Greeks from Miletus', ro: 'Grecii din Milet' },
        { en: 'The Romans', ro: 'Romanii' },
        { en: 'The Egyptians', ro: 'Egiptenii' },
        { en: 'Andrew and his friends', ro: 'Andrei și prietenii lui' },
      ],
      explain: {
        en: 'More than 2,600 years ago, Greeks sailed here from Miletus, the town where Paul later said goodbye to the elders.',
        ro: 'Acum mai bine de 2.600 de ani, grecii au venit aici cu corăbiile din Milet, orașul unde, mai târziu, Pavel și-a luat rămas-bun de la presbiteri.',
      },
    },
    {
      type: 'mc',
      q: { en: 'The Romans called the great river Danuvius. What did the Greeks call it?', ro: 'Romanii îi spuneau marelui fluviu Danuvius. Cum îi spuneau grecii?' },
      options: [
        { en: 'Istros', ro: 'Istros' },
        { en: 'Nilus', ro: 'Nilus' },
        { en: 'Iordanes', ro: 'Iordanes' },
        { en: 'Tiberis', ro: 'Tiberis' },
      ],
      explain: {
        en: 'The Istros, and the town of Histria was named after it. The Nile, the Jordan and the Tiber are other rivers on our map.',
        ro: 'Istros, iar orașul Histria și-a luat numele de la el. Nilul, Iordanul și Tibrul sunt alte râuri de pe harta noastră.',
      },
    },
    {
      type: 'order',
      q: { en: 'Put the places of our voyage in order:', ro: 'Pune în ordine locurile din călătoria noastră:' },
      items: [
        { en: 'Byzantium', ro: 'Bizanț' },
        { en: 'Callatis', ro: 'Callatis' },
        { en: 'Tomis', ro: 'Tomis' },
        { en: 'Histria', ro: 'Histria' },
        { en: 'The mouths of the Danube', ro: 'Gurile Dunării' },
      ],
      explain: {
        en: 'Through the Bosporus into the Black Sea, north along the coast to Callatis and Tomis, then on to Histria and the Danube Delta.',
        ro: 'Prin Bosfor în Marea Neagră, spre miazănoapte de-a lungul țărmului, la Callatis și Tomis, apoi mai departe, la Histria și în Delta Dunării.',
      },
    },
    {
      type: 'mc',
      q: { en: 'How do we know that Andrew preached in Scythia?', ro: 'De unde știm că Andrei a propovăduit în Sciția?' },
      options: [
        { en: 'From an old tradition, written down by Origen and Eusebius', ro: 'Dintr-o tradiție veche, scrisă de Origen și de Eusebiu' },
        { en: 'From the book of Acts', ro: 'Din cartea Faptele Apostolilor' },
        { en: 'From a letter Andrew wrote to Ana', ro: 'Dintr-o scrisoare a lui Andrei către Ana' },
        { en: 'From Roman coins with his face on them', ro: 'De pe monede romane cu chipul lui' },
      ],
      explain: {
        en: 'The Bible doesn\'t tell us where Andrew went. But Christians remembered it, and Origen wrote it down about 170 years later. Today the Romanian Church honours St Andrew as "the Apostle of the Romanians", on 30 November.',
        ro: 'Biblia nu ne spune unde a mers Andrei. Dar creștinii și-au amintit, iar Origen a scris asta cam 170 de ani mai târziu. Astăzi Biserica Română îl cinstește pe Sfântul Andrei ca „Apostolul românilor”, pe 30 noiembrie.',
      },
    },
  ],
  cheers: {
    en: ['Ana: "You were listening!"', 'Thalia: "Well done!"', 'Ana: "Great-aunt Ariadne would be proud!"', 'Nikias: "Like a true sailor of the Pontus!"'],
    ro: ['Ana: „Ai fost atent!”', 'Thalia: „Bravo!”', 'Ana: „Mătușa Ariadna ar fi mândră!”', 'Nikias: „Ca un adevărat marinar al Pontului!”'],
  },
  oops: {
    en: ['Ana: "Not quite…"', 'Thalia: "Almost! Look:"', 'Ana: "Let me check my logbook."'],
    ro: ['Ana: „Nu chiar…”', 'Thalia: „Aproape! Uite:”', 'Ana: „Stai să mă uit în jurnalul meu.”'],
  },
  done: {
    pass: {
      en: 'Ana gives you a small shell from the beach at Tomis. "Friend of the Black Sea! Now you have to come back one day."',
      ro: 'Ana îți dă o scoică mică de pe plaja din Tomis. „Prieten al Mării Negre! Acum trebuie să te întorci într-o zi.”',
    },
    fail: {
      en: '"There were a lot of stories," says Ana kindly. "Let\'s walk around Tomis once more, then try again!"',
      ro: '„Au fost multe povești”, spune Ana cu blândețe. „Hai să ne mai plimbăm o dată prin Tomis, apoi mai încearcă!”',
    },
  },
};
