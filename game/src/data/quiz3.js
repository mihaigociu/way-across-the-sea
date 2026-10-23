// Quiz gate 3: Paul's Third Journey (Acts 18:23–21:17). Same question types as quiz1.js.

export const quiz3 = {
  id: 'quiz3',
  title: { en: 'Quiz: The third journey', ro: 'Test: A treia călătorie' },
  subtitle: { en: '10 questions · Acts 18–21', ro: '10 întrebări · Faptele Apostolilor 18–21' },
  intro: {
    en: '"Only the best sailor may hold the rudder," says Father, "and only one who remembers the whole voyage." Thalia grins: "Get 7 out of 10 right, and you can steer the Euploia!"',
    ro: '„Doar cel mai bun marinar poate ține cârma”, spune tata, „și doar unul care ține minte toată călătoria.” Thalia zâmbește: „Răspunde corect la 7 din 10, și poți cârmi Euploia!”',
  },
  pass: 7,
  rank: { en: 'Helmsman', ro: 'Cârmaci' },
  replay: 'paul-3',
  questions: [
    {
      type: 'pick',
      q: {
        en: 'Paul stayed more than two years in the great city of Asia, and from there the good news reached the whole province. Find Ephesus on the map!',
        ro: 'Pavel a stat mai bine de doi ani în marele oraș al Asiei, iar de acolo vestea cea bună a ajuns în toată provincia. Găsește Efesul pe hartă!',
      },
      at: [27.34, 37.94],
      radiusKm: 25,
      focus: ['troas', 'ephesus', 'miletus', 'corinthus', 'antiochpisidia'],
      answer: { en: 'Ephesus', ro: 'Efes' },
      explain: {
        en: 'Ephesus was a big harbour on the coast of Asia, halfway between Troas and Miletus, straight across the Aegean from Corinth.',
        ro: 'Efesul era un port mare pe țărmul Asiei, la jumătatea drumului dintre Troa și Milet, drept peste Marea Egee de Corint.',
      },
    },
    {
      type: 'mc',
      q: { en: 'The sons of Sceva tried to drive out an evil spirit "by the Jesus whom Paul preaches". What did the spirit answer?', ro: 'Fiii lui Sceva au încercat să scoată un duh rău „pe Iisus pe Care Îl propovăduiește Pavel”. Ce le-a răspuns duhul?' },
      options: [
        { en: '"Jesus I know, and Paul I know, but who are you?"', ro: '„Pe Iisus Îl cunosc, și pe Pavel îl știu, dar voi cine sunteți?”' },
        { en: '"I will go out at once!"', ro: '„Ies chiar acum!”' },
        { en: '"Great is Artemis of the Ephesians!"', ro: '„Mare este Artemis a efesenilor!”' },
        { en: '"Come back tomorrow."', ro: '„Mai veniți mâine.”' },
      ],
      explain: {
        en: 'And they ran out of the house with their clothes torn! As Thalia said: the name of Jesus is not a magic word.',
        ro: 'Și au fugit din casă cu hainele sfâșiate! Cum a spus Thalia: numele lui Iisus nu e un cuvânt magic.',
      },
    },
    {
      type: 'mc',
      q: { en: 'What did the new believers in Ephesus do with their books of magic?', ro: 'Ce au făcut noii credincioși din Efes cu cărțile lor de vrăji?' },
      options: [
        { en: 'They burned them in front of everyone', ro: 'Le-au ars în fața tuturor' },
        { en: 'They sold them in the market', ro: 'Le-au vândut în piață' },
        { en: 'They hid them under the floor', ro: 'Le-au ascuns sub podea' },
        { en: 'They gave them to Paul', ro: 'I le-au dat lui Pavel' },
      ],
      explain: {
        en: 'Books worth fifty thousand silver coins, and each coin was a whole day\'s pay! That is how much they loved Jesus.',
        ro: 'Cărți de cincizeci de mii de arginți, iar fiecare argint era plata pe o zi întreagă! Atât de mult Îl iubeau pe Iisus.',
      },
    },
    {
      type: 'mc',
      q: { en: '"Love is patient, love is kind… the greatest of these is love." In which letter did Paul write this?', ro: '„Dragostea îndelung rabdă, dragostea este binevoitoare… mai mare dintre acestea este dragostea.” În ce scrisoare a scris Pavel asta?' },
      options: [
        { en: 'The First Letter to the Corinthians', ro: 'Întâia Epistolă către Corinteni' },
        { en: 'The Letter to the Romans', ro: 'Epistola către Romani' },
        { en: 'The First Letter to the Thessalonians', ro: 'Întâia Epistolă către Tesaloniceni' },
        { en: 'A letter to the Emperor', ro: 'O scrisoare către împărat' },
      ],
      explain: {
        en: 'Paul wrote it from Ephesus to the believers in Corinth, who were quarrelling, and Father carried it across the sea.',
        ro: 'Pavel a scris-o din Efes credincioșilor din Corint, care se certau, iar tata a dus-o peste mare.',
      },
    },
    {
      type: 'mc',
      q: { en: 'Why did the silversmiths of Ephesus start a riot?', ro: 'De ce au pornit argintarii din Efes o răscoală?' },
      options: [
        { en: 'People stopped buying their little silver temples of Artemis', ro: 'Oamenii nu mai cumpărau templele lor mici de argint ale lui Artemis' },
        { en: 'Paul had not paid for his tent', ro: 'Pavel nu-și plătise cortul' },
        { en: 'The theatre was too small', ro: 'Teatrul era prea mic' },
        { en: 'The Emperor raised their taxes', ro: 'Împăratul le mărise birurile' },
      ],
      explain: {
        en: 'Demetrius was afraid for his business, and the crowd shouted "Great is Artemis of the Ephesians!" for two hours. The town clerk sent them all home.',
        ro: 'Dimitrie se temea pentru câștigul lui, iar mulțimea a strigat două ceasuri „Mare este Artemis a efesenilor!”. Logofătul cetății i-a trimis pe toți acasă.',
      },
    },
    {
      type: 'mc',
      q: { en: 'Paul wrote his great Letter to the Romans in Corinth. Who carried it all the way to Rome?', ro: 'Pavel a scris marea Epistolă către Romani la Corint. Cine a dus-o tocmai până la Roma?' },
      options: [
        { en: 'Phoebe, the deacon of Cenchreae', ro: 'Fivi, diaconița din Chencreea' },
        { en: 'Demetrius the silversmith', ro: 'Dimitrie argintarul' },
        { en: 'Eutychus', ro: 'Eutihie' },
        { en: 'A Roman soldier', ro: 'Un soldat roman' },
      ],
      explain: {
        en: '"I commend to you our sister Phoebe," Paul writes at the end of the letter. "Welcome her in the Lord!"',
        ro: '„Vă încredințez pe Fivi, sora noastră”, scrie Pavel la sfârșitul scrisorii. „Primiți-o în Domnul!”',
      },
    },
    {
      type: 'mc',
      q: { en: 'In Troas, Paul talked until midnight. What happened to Eutychus, the young man in the window?', ro: 'La Troa, Pavel a vorbit până la miezul nopții. Ce s-a întâmplat cu Eutihie, tânărul din fereastră?' },
      options: [
        { en: 'He fell asleep, fell from the third floor, and Paul brought him back to life', ro: 'A adormit, a căzut de la etajul al treilea, iar Pavel l-a readus la viață' },
        { en: 'He asked the best question of the night', ro: 'A pus cea mai bună întrebare din seara aceea' },
        { en: 'He blew out all the lamps', ro: 'A stins toate candelele' },
        { en: 'He ran away to Rome', ro: 'A fugit la Roma' },
      ],
      explain: {
        en: '"His life is in him!" said Paul. Then he went back upstairs, broke the bread, and kept talking until dawn!',
        ro: '„Sufletul lui este în el!”, a spus Pavel. Apoi a urcat iarăși, a frânt pâinea și a mai vorbit până în zori!',
      },
    },
    {
      type: 'mc',
      q: { en: 'At Miletus, Paul reminded the elders of a saying of the Lord Jesus. Which one?', ro: 'La Milet, Pavel le-a amintit presbiterilor un cuvânt al Domnului Iisus. Care?' },
      options: [
        { en: '"It is more blessed to give than to receive"', ro: '„Mai fericit este a da decât a lua”' },
        { en: '"Always sail with the wind behind you"', ro: '„Mergi mereu cu vântul din spate”' },
        { en: '"Keep your money safe"', ro: '„Păstrează-ți bine banii”' },
        { en: '"Never leave your home town"', ro: '„Nu-ți părăsi niciodată orașul”' },
      ],
      explain: {
        en: 'It is not written in any of the Gospels: we know it only because Paul remembered it that day on the beach.',
        ro: 'Nu e scris în niciuna dintre Evanghelii: îl știm doar pentru că Pavel și l-a amintit în ziua aceea, pe țărm.',
      },
    },
    {
      type: 'order',
      q: { en: 'Put what happened in the right order:', ro: 'Pune în ordine ce s-a întâmplat:' },
      items: [
        { en: 'The riot in the theatre of Ephesus', ro: 'Răscoala din teatrul Efesului' },
        { en: 'The Letter to the Romans, in Corinth', ro: 'Epistola către Romani, la Corint' },
        { en: 'Eutychus falls from the window in Troas', ro: 'Eutihie cade din fereastră la Troa' },
        { en: 'Goodbye to the elders at Miletus', ro: 'Rămas-bun de la presbiteri la Milet' },
        { en: 'Agabus ties himself with Paul\'s belt', ro: 'Agab se leagă cu brâul lui Pavel' },
      ],
      explain: {
        en: 'From Ephesus to Greece, then back through Troas and Miletus, and down the coast to Caesarea, on the road to Jerusalem.',
        ro: 'De la Efes în Grecia, apoi înapoi prin Troa și Milet, și de-a lungul țărmului până la Cezareea, pe drumul spre Ierusalim.',
      },
    },
    {
      type: 'mc',
      q: { en: 'What were Paul and his friends carrying to Jerusalem?', ro: 'Ce duceau Pavel și prietenii lui la Ierusalim?' },
      options: [
        { en: 'A gift of money from the churches, for the poor believers', ro: 'Un dar în bani de la biserici, pentru credincioșii săraci' },
        { en: 'A silver statue of Artemis', ro: 'O statuie de argint a lui Artemis' },
        { en: 'The burned books of magic', ro: 'Cărțile de vrăji arse' },
        { en: 'A letter from the Emperor', ro: 'O scrisoare de la împărat' },
      ],
      explain: {
        en: 'From Galatia, Asia, Macedonia and Greece, even from the poor Macedonians, and with Thalia\'s coin inside!',
        ro: 'Din Galatia, Asia, Macedonia și Grecia, chiar și de la macedonenii cei săraci, și cu banul Thaliei înăuntru!',
      },
    },
  ],
  cheers: {
    en: ['Thalia: "Right on course!"', 'Nikias: "Steady on the rudder!"', 'Thalia: "You remember everything!"', 'Nikias: "Father, look at this one!"'],
    ro: ['Thalia: „Drept pe drum!”', 'Nikias: „Ții bine cârma!”', 'Thalia: „Ții minte tot!”', 'Nikias: „Tată, uită-te la ăsta!”'],
  },
  oops: {
    en: ['Nikias: "Not quite…"', 'Thalia: "Almost! Look:"', 'Nikias: "Hmm, let\'s check the logbook."'],
    ro: ['Nikias: „Nu chiar…”', 'Thalia: „Aproape! Uite:”', 'Nikias: „Hmm, hai să ne uităm în jurnal.”'],
  },
  done: {
    pass: {
      en: 'Father steps back from the rudder and puts your hands on it. "She\'s yours, Helmsman. Keep her straight!"',
      ro: 'Tata se dă un pas înapoi de la cârmă și îți pune mâinile pe ea. „E a ta, cârmaciule. Ține-o drept!”',
    },
    fail: {
      en: '"Even Father went the wrong way once, near Rhodes," Nikias whispers. "Let\'s sail the third journey again, then try once more!"',
      ro: '„Chiar și tata a greșit odată drumul, lângă Rodos”, șoptește Nikias. „Hai să mai facem o dată a treia călătorie, apoi mai încearcă!”',
    },
  },
};
