// Historical map data for the prototype. Coordinates are [lon, lat].
// Tiers: 1 = great city (~250k+), 2 = major city / port, 3 = town.
// Coordinates are approximate (site of the ancient city); check against Pleiades before release.

export const cities = [
  // Italia & west
  { id: 'roma', la: 'Roma', en: 'Rome', ro: 'Roma', modern: 'Rome, Italy', at: [12.49, 41.89], tier: 1 },
  { id: 'ostia', la: 'Ostia', en: 'Ostia', ro: 'Ostia', modern: 'near Rome, Italy', at: [12.29, 41.75], tier: 3, port: true, lab: 'l' },
  { id: 'puteoli', la: 'Puteoli', en: 'Puteoli', ro: 'Puteoli', modern: 'Pozzuoli, Italy', at: [14.12, 40.82], tier: 2, port: true },
  { id: 'brundisium', la: 'Brundisium', en: 'Brundisium', ro: 'Brundisium', modern: 'Brindisi, Italy', at: [17.94, 40.64], tier: 3, port: true },
  { id: 'rhegium', la: 'Rhegium', en: 'Rhegium', ro: 'Rhegium', modern: 'Reggio Calabria, Italy', at: [15.65, 38.11], tier: 3, port: true },
  { id: 'syracusae', la: 'Syracusae', en: 'Syracuse', ro: 'Siracuza', modern: 'Siracusa, Sicily', at: [15.29, 37.07], tier: 2, port: true },
  { id: 'melita', la: 'Melita', en: 'Malta', ro: 'Malta', modern: 'Malta', at: [14.40, 35.90], tier: 3, port: true },
  { id: 'aquileia', la: 'Aquileia', en: 'Aquileia', ro: 'Aquileia', modern: 'Aquileia, Italy', at: [13.37, 45.77], tier: 3 },
  { id: 'mediolanum', la: 'Mediolanum', en: 'Milan', ro: 'Milano', modern: 'Milan, Italy', at: [9.19, 45.46], tier: 3 },
  { id: 'massilia', la: 'Massilia', en: 'Massilia', ro: 'Massilia', modern: 'Marseille, France', at: [5.37, 43.30], tier: 2, port: true },
  { id: 'lugdunum', la: 'Lugdunum', en: 'Lyon', ro: 'Lyon', modern: 'Lyon, France', at: [4.83, 45.76], tier: 2 },
  { id: 'narbo', la: 'Narbo', en: 'Narbo', ro: 'Narbo', modern: 'Narbonne, France', at: [3.00, 43.18], tier: 3 },
  { id: 'tarraco', la: 'Tarraco', en: 'Tarraco', ro: 'Tarraco', modern: 'Tarragona, Spain', at: [1.25, 41.12], tier: 3, port: true },
  { id: 'carthagonova', la: 'Carthago Nova', en: 'New Carthage', ro: 'Carthago Nova', modern: 'Cartagena, Spain', at: [-0.98, 37.60], tier: 3, port: true },
  { id: 'gades', la: 'Gades', en: 'Gades', ro: 'Gades', modern: 'Cádiz, Spain', at: [-6.29, 36.53], tier: 3, port: true },
  { id: 'londinium', la: 'Londinium', en: 'London', ro: 'Londra', modern: 'London, UK', at: [-0.09, 51.51], tier: 3 },
  { id: 'treveri', la: 'Augusta Treverorum', en: 'Trier', ro: 'Trier', modern: 'Trier, Germany', at: [6.64, 49.75], tier: 3 },
  { id: 'forumappii', la: 'Forum Appii', en: 'Forum of Appius', ro: 'Forul lui Apiu', modern: 'near Borgo Faiti, Italy', at: [13.07, 41.45], tier: 3 },
  // Crete
  { id: 'kaloilimenes', la: 'Kaloi Limenes', en: 'Fair Havens', ro: 'Limanuri Bune', modern: 'Kaloi Limenes, Crete', at: [24.80, 34.93], tier: 3, port: true, lab: 'b' },
  { id: 'phoenix', la: 'Phoenix', en: 'Phoenix', ro: 'Fenix', modern: 'near Loutro, Crete', at: [24.08, 35.20], tier: 3, port: true, lab: 'l' },
  { id: 'cauda', la: 'Cauda', en: 'Cauda', ro: 'Clauda', modern: 'Gavdos, Greece', at: [24.08, 34.85], tier: 3, port: true, lab: 'b' },
  // Africa
  { id: 'carthago', la: 'Carthago', en: 'Carthage', ro: 'Cartagina', modern: 'near Tunis, Tunisia', at: [10.32, 36.85], tier: 2, port: true },
  { id: 'hippo', la: 'Hippo Regius', en: 'Hippo', ro: 'Hippo', modern: 'Annaba, Algeria', at: [7.75, 36.88], tier: 3, port: true },
  { id: 'leptis', la: 'Leptis Magna', en: 'Leptis Magna', ro: 'Leptis Magna', modern: 'near Khoms, Libya', at: [14.29, 32.64], tier: 3, port: true },
  { id: 'cyrene', la: 'Cyrene', en: 'Cyrene', ro: 'Cirene', modern: 'Shahhat, Libya', at: [21.86, 32.82], tier: 3 },
  { id: 'alexandria', la: 'Alexandria', en: 'Alexandria', ro: 'Alexandria', modern: 'Alexandria, Egypt', at: [29.92, 31.20], tier: 1, port: true },
  // Greece & Balkans
  { id: 'corinthus', la: 'Corinthus', en: 'Corinth', ro: 'Corint', modern: 'Corinth, Greece', at: [22.88, 37.91], tier: 2, port: true, lab: 'l' },
  { id: 'athenae', la: 'Athenae', en: 'Athens', ro: 'Atena', modern: 'Athens, Greece', at: [23.73, 37.97], tier: 2 },
  { id: 'thessalonica', la: 'Thessalonica', en: 'Thessalonica', ro: 'Tesalonic', modern: 'Thessaloniki, Greece', at: [22.94, 40.64], tier: 2, port: true },
  { id: 'beroea', la: 'Beroea', en: 'Berea', ro: 'Bereea', modern: 'Veria, Greece', at: [22.20, 40.52], tier: 3, lab: 'l' },
  { id: 'philippi', la: 'Philippi', en: 'Philippi', ro: 'Filipi', modern: 'near Kavala, Greece', at: [24.28, 41.01], tier: 3 },
  { id: 'amphipolis', la: 'Amphipolis', en: 'Amphipolis', ro: 'Amfipoli', modern: 'Amfipoli, Greece', at: [23.84, 40.82], tier: 3, lab: 'b' },
  { id: 'samothrace', la: 'Samothrace', en: 'Samothrace', ro: 'Samotrace', modern: 'Samothraki, Greece', at: [25.53, 40.47], tier: 3, port: true },
  { id: 'cenchreae', la: 'Cenchreae', en: 'Cenchreae', ro: 'Chencreea', modern: 'Kechries, Greece', at: [22.99, 37.88], tier: 3, port: true, lab: 'b' },
  { id: 'neapolis', la: 'Neapolis', en: 'Neapolis', ro: 'Neapole', modern: 'Kavala, Greece', at: [24.41, 40.94], tier: 3, port: true, lab: 'b' },
  { id: 'byzantium', la: 'Byzantium', en: 'Byzantium', ro: 'Bizanț', modern: 'Istanbul, Turkey', at: [28.98, 41.01], tier: 2, port: true },
  { id: 'sirmium', la: 'Sirmium', en: 'Sirmium', ro: 'Sirmium', modern: 'Sremska Mitrovica, Serbia', at: [19.61, 44.97], tier: 3 },
  { id: 'tomis', la: 'Tomis', en: 'Tomis', ro: 'Tomis', modern: 'Constanța, Romania', at: [28.65, 44.17], tier: 3, port: true, lab: 'b' },
  { id: 'histria', la: 'Histria', en: 'Histria', ro: 'Histria', modern: 'near Istria, Romania', at: [28.77, 44.55], tier: 3, port: true },
  // Asia Minor
  { id: 'ephesus', la: 'Ephesus', en: 'Ephesus', ro: 'Efes', modern: 'near Selçuk, Turkey', at: [27.34, 37.94], tier: 2, port: true },
  { id: 'smyrna', la: 'Smyrna', en: 'Smyrna', ro: 'Smirna', modern: 'İzmir, Turkey', at: [27.14, 38.42], tier: 2, port: true },
  { id: 'pergamum', la: 'Pergamum', en: 'Pergamum', ro: 'Pergam', modern: 'Bergama, Turkey', at: [27.18, 39.13], tier: 2 },
  { id: 'miletus', la: 'Miletus', en: 'Miletus', ro: 'Milet', modern: 'near Didim, Turkey', at: [27.28, 37.53], tier: 3, port: true, lab: 'b' },
  { id: 'troas', la: 'Troas', en: 'Troas', ro: 'Troa', modern: 'near Dalyan, Turkey', at: [26.16, 39.75], tier: 3, port: true },
  { id: 'thyatira', la: 'Thyatira', en: 'Thyatira', ro: 'Tiatira', modern: 'Akhisar, Turkey', at: [27.84, 38.92], tier: 3 },
  { id: 'assos', la: 'Assos', en: 'Assos', ro: 'Asos', modern: 'Behramkale, Turkey', at: [26.34, 39.49], tier: 3, port: true },
  { id: 'mitylene', la: 'Mytilene', en: 'Mitylene', ro: 'Mitilene', modern: 'Mytilene, Lesbos, Greece', at: [26.56, 39.11], tier: 3, port: true, lab: 'l' },
  { id: 'chios', la: 'Chios', en: 'Chios', ro: 'Chios', modern: 'Chios, Greece', at: [26.14, 38.37], tier: 3, port: true, lab: 'l' },
  { id: 'samos', la: 'Samos', en: 'Samos', ro: 'Samos', modern: 'Pythagoreio, Samos, Greece', at: [26.94, 37.69], tier: 3, port: true, lab: 'l' },
  { id: 'cos', la: 'Cos', en: 'Cos', ro: 'Cos', modern: 'Kos, Greece', at: [27.29, 36.89], tier: 3, port: true, lab: 'l' },
  { id: 'rhodus', la: 'Rhodus', en: 'Rhodes', ro: 'Rodos', modern: 'Rhodes, Greece', at: [28.23, 36.44], tier: 3, port: true },
  { id: 'patara', la: 'Patara', en: 'Patara', ro: 'Patara', modern: 'near Gelemiş, Turkey', at: [29.32, 36.26], tier: 3, port: true, lab: 'bl' },
  { id: 'laodicea', la: 'Laodicea', en: 'Laodicea', ro: 'Laodiceea', modern: 'near Denizli, Turkey', at: [29.11, 37.84], tier: 3, lab: 'l' },
  { id: 'colossae', la: 'Colossae', en: 'Colossae', ro: 'Colose', modern: 'near Honaz, Turkey', at: [29.26, 37.79], tier: 3 },
  { id: 'nicaea', la: 'Nicaea', en: 'Nicaea', ro: 'Niceea', modern: 'İznik, Turkey', at: [29.72, 40.43], tier: 3 },
  { id: 'cnidus', la: 'Cnidus', en: 'Cnidus', ro: 'Cnid', modern: 'near Datça, Turkey', at: [27.37, 36.69], tier: 3, port: true },
  { id: 'myra', la: 'Myra', en: 'Myra', ro: 'Mira', modern: 'Demre, Turkey', at: [29.99, 36.26], tier: 3, port: true },
  { id: 'attalia', la: 'Attalia', en: 'Attalia', ro: 'Atalia', modern: 'Antalya, Turkey', at: [30.70, 36.89], tier: 3, port: true, lab: 'bl' },
  { id: 'perga', la: 'Perga', en: 'Perga', ro: 'Perga', modern: 'near Antalya, Turkey', at: [30.85, 36.96], tier: 3 },
  { id: 'antiochpisidia', la: 'Antiochia Pisidiae', en: 'Pisidian Antioch', ro: 'Antiohia Pisidiei', modern: 'near Yalvaç, Turkey', at: [31.19, 38.31], tier: 3 },
  { id: 'iconium', la: 'Iconium', en: 'Iconium', ro: 'Iconia', modern: 'Konya, Turkey', at: [32.49, 37.87], tier: 3 },
  { id: 'lystra', la: 'Lystra', en: 'Lystra', ro: 'Listra', modern: 'near Hatunsaray, Turkey', at: [32.33, 37.58], tier: 3 },
  { id: 'derbe', la: 'Derbe', en: 'Derbe', ro: 'Derbe', modern: 'near Karaman, Turkey', at: [33.36, 37.35], tier: 3 },
  { id: 'tarsus', la: 'Tarsus', en: 'Tarsus', ro: 'Tars', modern: 'Tarsus, Turkey', at: [34.90, 36.92], tier: 2 },
  { id: 'sinope', la: 'Sinope', en: 'Sinope', ro: 'Sinope', modern: 'Sinop, Turkey', at: [35.15, 42.03], tier: 3, port: true },
  // Cyprus, Syria, Judaea
  { id: 'salamis', la: 'Salamis', en: 'Salamis', ro: 'Salamina', modern: 'near Famagusta, Cyprus', at: [33.90, 35.18], tier: 3, port: true },
  { id: 'paphos', la: 'Paphos', en: 'Paphos', ro: 'Pafos', modern: 'Paphos, Cyprus', at: [32.41, 34.76], tier: 3, port: true },
  { id: 'antiochia', la: 'Antiochia', en: 'Antioch', ro: 'Antiohia', modern: 'Antakya, Turkey', at: [36.16, 36.20], tier: 1 },
  { id: 'seleucia', la: 'Seleucia Pieria', en: 'Seleucia', ro: 'Seleucia', modern: 'near Samandağ, Turkey', at: [35.93, 36.12], tier: 3, port: true, lab: 'b' },
  { id: 'damascus', la: 'Damascus', en: 'Damascus', ro: 'Damasc', modern: 'Damascus, Syria', at: [36.29, 33.51], tier: 2 },
  { id: 'tyrus', la: 'Tyrus', en: 'Tyre', ro: 'Tir', modern: 'Tyre, Lebanon', at: [35.20, 33.27], tier: 3, port: true },
  { id: 'sidon', la: 'Sidon', en: 'Sidon', ro: 'Sidon', modern: 'Saida, Lebanon', at: [35.37, 33.56], tier: 3, port: true },
  { id: 'caesarea', la: 'Caesarea', en: 'Caesarea', ro: 'Cezareea', modern: 'Caesarea, Israel', at: [34.89, 32.50], tier: 2, port: true },
  { id: 'ioppe', la: 'Ioppe', en: 'Joppa', ro: 'Iope', modern: 'Jaffa, Israel', at: [34.75, 32.05], tier: 3, port: true, lab: 'l' },
  { id: 'capernaum', la: 'Capernaum', en: 'Capernaum', ro: 'Capernaum', modern: 'Kfar Nahum, Israel', at: [35.575, 32.881], tier: 3, lab: 'l' },
  { id: 'caesareaphilippi', la: 'Caesarea Philippi', en: 'Caesarea Philippi', ro: 'Cezareea lui Filip', modern: 'Banias, Golan Heights', at: [35.694, 33.248], tier: 3 },
  { id: 'ptolemais', la: 'Ptolemais', en: 'Ptolemais', ro: 'Ptolemaida', modern: 'Acre (Akko), Israel', at: [35.07, 32.92], tier: 3, port: true, lab: 'l' },
  { id: 'jericho', la: 'Jericho', en: 'Jericho', ro: 'Ierihon', modern: 'Jericho, West Bank', at: [35.444, 31.871], tier: 3 },
  { id: 'bethlehem', la: 'Bethlehem', en: 'Bethlehem', ro: 'Betleem', modern: 'Bethlehem, West Bank', at: [35.202, 31.705], tier: 3, lab: 'b' },
  { id: 'gaza', la: 'Gaza', en: 'Gaza', ro: 'Gaza', modern: 'Gaza', at: [34.46, 31.50], tier: 3, port: true, lab: 'l' },
  { id: 'nazareth', la: 'Nazareth', en: 'Nazareth', ro: 'Nazaret', modern: 'Nazareth, Israel', at: [35.30, 32.70], tier: 3, lab: 'l' },
  { id: 'samaria', la: 'Sebaste', en: 'Samaria', ro: 'Samaria', modern: 'Sebastia, West Bank', at: [35.19, 32.28], tier: 3 },
  { id: 'hierosolyma', la: 'Hierosolyma', en: 'Jerusalem', ro: 'Ierusalim', modern: 'Jerusalem', at: [35.23, 31.78], tier: 2 },
  { id: 'petra', la: 'Petra', en: 'Petra', ro: 'Petra', modern: 'Petra, Jordan', at: [35.44, 30.33], tier: 3 },
  { id: 'edessa', la: 'Edessa', en: 'Edessa', ro: 'Edesa', modern: 'Şanlıurfa, Turkey', at: [38.79, 37.15], tier: 3 },
  { id: 'dura', la: 'Dura-Europos', en: 'Dura-Europos', ro: 'Dura-Europos', modern: 'near Salhiyé, Syria', at: [40.73, 34.75], tier: 3 },
  { id: 'ctesiphon', la: 'Ctesiphon', en: 'Ctesiphon', ro: 'Ctesifon', modern: 'near Baghdad, Iraq', at: [44.58, 33.09], tier: 2 },
];

// Main sea lanes, as waypoints through open water (drawn as smooth curves).
export const seaLanes = [
  { id: 'grain', name: 'The grain route: Alexandria → Rome',
    pts: [[29.92, 31.3], [28, 32.4], [25, 33.7], [21.5, 34.9], [18.5, 36.0], [16.2, 37.3], [15.62, 38.0], [15.55, 38.35], [15.0, 39.2], [14.2, 40.3], [13.2, 40.9], [12.4, 41.55], [12.26, 41.72]] },
  { id: 'carthage-ostia', pts: [[10.4, 37.0], [10.9, 38.2], [11.4, 39.8], [12.0, 41.2], [12.26, 41.72]] },
  { id: 'gades-carthage', pts: [[-6.35, 36.45], [-5.6, 35.95], [-4, 36.15], [-1, 36.9], [3, 37.2], [7, 37.6], [9.7, 37.45], [10.35, 37.05]] },
  { id: 'massilia-ostia', pts: [[5.37, 43.2], [7.2, 43.2], [9.45, 43.25], [10.0, 42.6], [11.0, 42.15], [12.26, 41.72]] },
  { id: 'tarraco-massilia', pts: [[1.25, 41.05], [2.6, 41.5], [3.6, 42.6], [5.37, 43.2]] },
  { id: 'corinth-italy', pts: [[22.85, 38.0], [22.3, 38.2], [21.6, 38.35], [21.0, 38.2], [20.3, 37.9], [18.0, 37.6], [16.2, 37.6], [15.62, 38.0]] },
  { id: 'aegean', name: 'Across the Aegean: Ephesus → Corinth',
    pts: [[27.25, 37.92], [26.55, 37.62], [25.7, 37.35], [24.6, 37.5], [23.75, 37.68], [23.05, 37.85]] },
  { id: 'troas-neapolis', pts: [[26.1, 39.75], [25.7, 40.1], [25.0, 40.6], [24.45, 40.85]] },
  { id: 'levant', name: 'Along the coast: Alexandria → Antioch',
    pts: [[29.92, 31.3], [31.5, 31.75], [33.5, 31.9], [34.6, 32.4], [34.9, 33.2], [35.1, 34.3], [35.5, 35.3], [35.85, 36.05]] },
  { id: 'rhodes-alex', pts: [[27.34, 36.62], [28.3, 35.8], [29.2, 33.5], [29.92, 31.3]] },
  { id: 'black-sea', name: 'Through the Bosporus to the Black Sea',
    pts: [[28.98, 40.98], [29.05, 41.2], [29.3, 41.5], [29.6, 42.5], [29.2, 43.6], [28.75, 44.15]] },
  { id: 'aegean-north', pts: [[23.05, 37.85], [24.2, 38.6], [24.0, 39.6], [23.2, 40.3], [22.95, 40.6]] },
];

// Roman Empire, c. AD 46 (simplified; drawn clipped to land, so it can overshoot into the sea).
export const empire = [
  [[-11, 44.5], [-3, 48.6], [1.5, 51.2], [4, 51.9], [6.1, 51.85], [6.7, 51.1], [7.6, 50.3], [8.3, 49.1], [7.7, 47.6],
   [9.0, 47.75], [12.0, 48.5], [13.6, 48.6], [16.5, 48.2], [18.8, 47.8], [18.9, 46.0], [19.4, 45.2], [21.4, 44.7],
   [22.6, 44.2], [24.0, 43.75], [25.5, 43.7], [27.0, 44.1], [28.2, 44.6], [29.7, 45.3], [31.5, 44.0], [33, 42.2],
   [36.5, 41.6], [37.8, 40.9], [38.9, 39.9], [38.6, 38.5], [38.1, 37.4], [38.3, 36.1], [38.9, 35.0], [38.4, 34.0],
   [37.3, 33.0], [36.6, 32.3], [35.9, 31.6], [35.55, 31.0], [35.1, 30.6], [34.3, 31.2], [33.2, 30.6], [32.6, 29.8],
   [33.5, 27.6], [34.4, 25.6], [33.4, 23.8], [32.4, 23.7], [31.3, 24.2], [30.3, 25.6], [28.8, 27.2], [26.5, 29.0],
   [25.0, 30.0], [23.0, 30.6], [20.0, 30.4], [18.4, 30.2], [15.6, 30.9], [13.0, 31.5], [11.0, 32.3], [9.6, 33.3],
   [8.0, 34.4], [6.0, 35.3], [3.0, 35.8], [0.0, 35.0], [-2.0, 34.6], [-5.0, 34.0], [-7.0, 33.6], [-9.5, 33.4],
   [-11.5, 36.0]],
  // Southern Britain (conquest began AD 43)
  [[-6, 49.8], [1.8, 50.8], [2.0, 52.9], [-0.5, 53.3], [-3.0, 52.6], [-4.4, 51.6], [-6, 50.4]],
];

export const regions = [
  { la: 'HISPANIA', at: [-4.0, 39.9], size: 1.2 },
  { la: 'GALLIA', at: [2.5, 46.8], size: 1.2 },
  { la: 'BRITANNIA', at: [-1.6, 52.0], size: 0.75 },
  { la: 'GERMANIA', at: [11.5, 50.8], size: 1, outside: true },
  { la: 'ITALIA', at: [11.6, 43.5], size: 0.85, rot: 36 },
  { la: 'AFRICA', at: [9.2, 34.0], size: 1 },
  { la: 'MAVRETANIA', at: [-4.2, 34.9], size: 0.7 },
  { la: 'AEGYPTVS', at: [30.6, 27.6], size: 1.1 },
  { la: 'CYRENAICA', at: [23.4, 31.0], size: 0.7 },
  { la: 'CRETA', at: [25.3, 35.45], size: 0.4 },
  { la: 'ACHAIA', at: [21.9, 37.45], size: 0.55 },
  { la: 'MACEDONIA', at: [21.4, 41.65], size: 0.65 },
  { la: 'THRACIA', at: [26.0, 42.1], size: 0.7 },
  { la: 'MOESIA', at: [23.3, 43.3], size: 0.75 },
  { la: 'DACIA', at: [24.6, 46.4], size: 0.9, outside: true },
  { la: 'PANNONIA', at: [17.6, 46.4], size: 0.75 },
  { la: 'ASIA', at: [30.0, 39.0], size: 0.85 },
  { la: 'BITHYNIA', at: [31.2, 40.75], size: 0.55 },
  { la: 'CILICIA', at: [34.1, 37.55], size: 0.45 },
  { la: 'GALATIA', at: [33.3, 40.15], size: 0.75 },
  { la: 'CAPPADOCIA', at: [36.6, 38.7], size: 0.6 },
  { la: 'SYRIA', at: [37.4, 34.6], size: 0.8 },
  { la: 'IVDAEA', at: [35.2, 31.15], size: 0.5 },
  { la: 'ARABIA', at: [38.5, 30.2], size: 1, outside: true },
  { la: 'MESOPOTAMIA', at: [42.6, 36.9], size: 0.62, outside: true },
  { la: 'PARTHIA', at: [44.0, 34.9], size: 0.8, outside: true },
  { la: 'SARMATIA', at: [34.0, 48.3], size: 1, outside: true },
];

export const seas = [
  { la: 'MARE INTERNVM', at: [17.5, 34.0], size: 1.5, rot: -4 },
  { la: 'Mare Aegaeum', at: [25.15, 38.95], size: 0.75, rot: -70 },
  { la: 'Mare Adriaticum', at: [15.8, 42.95], size: 0.8, rot: -38 },
  { la: 'Mare Tyrrhenum', at: [11.6, 40.1], size: 0.85, rot: -12 },
  { la: 'Mare Ionium', at: [18.6, 37.9], size: 0.85, rot: 0 },
  { la: 'Pontus Euxinus', at: [34.0, 43.2], size: 1.1, rot: 0 },
  { la: 'Oceanus Atlanticus', at: [-5.5, 45.3], size: 0.7, rot: 0 },
  { la: 'Mare Libycum', at: [25.0, 33.0], size: 0.75, rot: 0 },
  { la: 'Mare Syriacum', at: [32.8, 33.4], size: 0.7, rot: 0 },
  { la: 'Mare Balearicum', at: [3.7, 39.3], size: 0.7, rot: -15 },
  { la: 'Mare Germanicum', at: [3.8, 54.0], size: 0.7, rot: 0 },
  { la: 'Sinus Arabicus', at: [34.7, 26.6], size: 0.6, rot: -58 },
];

// Smaller names that appear only when zoomed in (minK = zoom level from which they show).
// kind: 'water' (lakes, seas) | 'river' | 'region' | 'mount' (a peak, drawn with a little glyph) | 'town' (a village, a dot).
// name: {en, ro} for places kids know by their Bible names; la: Latin, for the great rivers.
export const details = [
  // The Holy Land
  { kind: 'water', name: { en: 'Sea of Galilee', ro: 'Marea Galileii' }, at: [35.665, 32.80], anchor: 'start', minK: 6 },
  { kind: 'water', name: { en: 'Dead Sea', ro: 'Marea Moartă' }, at: [35.49, 31.47], rot: -90, minK: 6 },
  { kind: 'river', name: { en: 'Jordan', ro: 'Iordan' }, at: [35.60, 32.30], rot: -90, minK: 6 },
  { kind: 'region', name: { en: 'GALILEE', ro: 'GALILEEA' }, at: [35.36, 33.03], minK: 6 },
  { kind: 'region', name: { en: 'SAMARIA', ro: 'SAMARIA' }, at: [35.28, 32.10], minK: 6 },
  { kind: 'region', name: { en: 'JUDEA', ro: 'IUDEEA' }, at: [34.98, 31.36], minK: 6 },
  { kind: 'region', name: { en: 'PEREA', ro: 'PEREEA' }, at: [35.80, 31.95], minK: 6 },
  { kind: 'region', name: { en: 'DECAPOLIS', ro: 'DECAPOLE' }, at: [36.05, 32.58], minK: 6 },
  { kind: 'region', name: { en: 'PHOENICIA', ro: 'FENICIA' }, at: [35.75, 33.95], minK: 6 },
  { kind: 'region', name: { en: 'NABATAEA', ro: 'NABATEEA' }, at: [35.85, 30.75], minK: 6 },
  { kind: 'mount', name: { en: 'Mt Carmel', ro: 'Muntele Carmel' }, at: [35.02, 32.70], anchor: 'end', minK: 6 },
  { kind: 'mount', name: { en: 'Mt Hermon', ro: 'Muntele Hermon' }, at: [35.86, 33.42], minK: 6 },
  { kind: 'mount', name: { en: 'Mt Tabor', ro: 'Muntele Tabor' }, at: [35.39, 32.687], minK: 9 },
  { kind: 'town', name: { en: 'Bethany', ro: 'Betania' }, at: [35.262, 31.771], minK: 8 },
  { kind: 'mount', name: { en: 'Mt of Olives', ro: 'Muntele Măslinilor' }, at: [35.245, 31.779], anchor: 'end', minK: 11 },
  // Great rivers
  { kind: 'river', la: 'Nilus', at: [31.25, 28.4], rot: -78, minK: 1.4 },
  { kind: 'river', la: 'Danuvius', at: [25.6, 43.95], rot: -4, minK: 1.4 },
  { kind: 'river', la: 'Rhenus', at: [7.95, 50.2], rot: -62, minK: 1.4 },
  { kind: 'river', la: 'Rhodanus', at: [5.05, 44.55], rot: -84, minK: 1.4 },
  { kind: 'river', la: 'Padus', at: [10.9, 45.25], rot: 4, minK: 1.4 },
  { kind: 'river', la: 'Euphrates', at: [40.7, 35.0], rot: 36, minK: 1.4 },
  { kind: 'river', la: 'Tigris', at: [43.6, 35.4], rot: 60, minK: 1.4 },
  { kind: 'river', la: 'Iberus', at: [-0.9, 41.9], rot: 28, minK: 1.4 },
  { kind: 'river', la: 'Tagus', at: [-5.2, 39.75], rot: -6, minK: 1.4 },
];

// Mountain ranges, as polylines along which little hill glyphs are drawn.
export const mountains = [
  [[5.8, 44.2], [7.0, 45.6], [8.6, 46.4], [10.5, 46.6], [12.5, 46.8], [14.5, 46.6]], // Alpes
  [[-1.8, 43.0], [0.5, 42.75], [2.6, 42.5]], // Pyrenaei
  [[9.6, 44.3], [11.5, 43.7], [13.0, 42.6], [14.6, 41.4], [15.9, 40.3], [16.2, 39.2]], // Appenninus
  [[-8.0, 31.2], [-5.5, 32.5], [-3.0, 33.4], [0.5, 34.2], [4.0, 35.3], [7.0, 35.5]], // Atlas
  [[29.5, 37.1], [31.5, 37.2], [33.0, 36.9], [34.5, 37.3], [36.0, 37.8]], // Taurus
  [[21.2, 42.9], [23.0, 42.8], [25.0, 42.7], [26.6, 42.6]], // Haemus
  [[19.6, 42.2], [20.5, 41.0], [21.3, 39.8], [21.8, 38.8]], // Pindus
  [[22.5, 45.4], [24.0, 45.5], [25.8, 45.6], [26.4, 46.6], [25.5, 47.6], [24.0, 48.0]], // Carpathians
  [[35.8, 33.3], [36.2, 34.2], [36.4, 34.9]], // Lebanon
  [[43.0, 37.3], [45.0, 36.0], [46.5, 34.5]], // Zagros
  [[-4.6, 40.3], [-3.5, 40.9], [-2.0, 41.3]], // Central Iberian
  [[35.2, 39.6], [37.5, 40.3], [40.0, 40.6], [42.0, 41.0]], // Pontic
  [[42.0, 42.5], [44.5, 42.7], [46.5, 41.8]], // Caucasus
];

// Paul's first journey (Acts 13–14), c. AD 46–48.
// mode: how the leg was travelled; via: extra [lon, lat] waypoints to keep sea legs off the land.
export const paulFirstJourney = {
  id: 'paul-1',
  title: { en: "Paul's First Journey", ro: 'Prima călătorie a lui Pavel' },
  years: { en: 'c. AD 46–48', ro: 'cca. 46–48 d.Hr.' },
  acts: '13–14',
  quiz: 'quiz1',
  legs: [
    { to: 'antiochia', mode: 'start',
      en: "The church in Antioch is praying and fasting when the Holy Spirit says: \"Set apart for me Barnabas and Saul, for the work I have called them to.\" Everyone lays hands on them, and they are sent off. And guess whose ship will take them to Cyprus? Our father's!",
      ro: "Comunitatea din Antiohia se roagă și postește, când Duhul Sfânt spune: „Puneți-Mi deoparte pe Barnaba și pe Saul pentru lucrarea la care i-am chemat.” Toți își pun mâinile peste ei și îi trimit la drum. Și ghiciți cu a cui corabie vor merge în Cipru? Cu a tatălui nostru!" },
    { to: 'seleucia', mode: 'land',
      en: "We walk down with them to Seleucia, the harbour of Antioch. Father checks the wind, Nikias helps load the cargo, and we set sail for Cyprus!",
      ro: "Coborâm împreună cu ei până la Seleucia, portul Antiohiei. Tata cercetează vântul, Nikias ajută la încărcat, și pornim spre Cipru!" },
    { to: 'salamis', mode: 'sea', via: [[34.95, 35.5], [34.45, 35.33]],
      en: "Salamis, on Cyprus: Barnabas's home island! On the Sabbath, Paul and Barnabas go to the synagogues and tell the Jews about Jesus, the Messiah they have been waiting for.",
      ro: "Salamina, în Cipru: insula lui Barnaba! În ziua de Sabat, Pavel și Barnaba merg în sinagogi și le vorbesc iudeilor despre Iisus, Mesia pe care Îl așteptau." },
    { to: 'paphos', mode: 'land',
      en: "We cross the whole island to Paphos. The Roman governor, Sergius Paulus, wants to hear the word of God. A sorcerer tries to stop him, but Paul, full of the Holy Spirit, faces him, and the governor believes!",
      ro: "Traversăm toată insula până la Pafos. Guvernatorul roman, Sergius Paulus, vrea să audă cuvântul lui Dumnezeu. Un vrăjitor încearcă să-l oprească, dar Pavel, plin de Duh Sfânt, îl înfruntă, iar guvernatorul crede!" },
    { to: 'perga', mode: 'sea', via: [[32.12, 34.85], [31.95, 35.35], [31.1, 36.55]],
      en: "Father's ship carries us to Perga. Here young John Mark leaves the group and sails home with us. Paul and Barnabas walk on alone, up into the mountains. Later they told us everything that happened…",
      ro: "Corabia tatei ne duce la Perga. Aici tânărul Ioan Marcu se desparte de ei și se întoarce acasă cu noi. Pavel și Barnaba merg mai departe singuri, sus, în munți. Mai târziu ne-au povestit tot ce s-a întâmplat…" },
    { to: 'antiochpisidia', mode: 'land',
      en: "Over the Taurus mountains to Pisidian Antioch. Paul preaches in the synagogue, and the next Sabbath almost the whole town comes to hear the word of the Lord! The Greeks are full of joy, and the word spreads through the whole region.",
      ro: "Peste munții Taur, până la Antiohia Pisidiei. Pavel predică în sinagogă, iar în Sabatul următor aproape tot orașul vine să asculte cuvântul Domnului! Grecii se umplu de bucurie, iar cuvântul se răspândește în tot ținutul." },
    { to: 'iconium', mode: 'land',
      en: "In Iconium, many Jews and Greeks believe, and God works signs and wonders through Paul and Barnabas. But some stir up the town against them, so they go on to the next town.",
      ro: "La Iconia, mulți iudei și greci cred, iar Dumnezeu face semne și minuni prin mâinile lui Pavel și ale lui Barnaba. Dar unii întărâtă orașul împotriva lor, așa că pleacă mai departe." },
    { to: 'lystra', mode: 'land',
      en: "In Lystra, a man who has never walked in his life jumps up and walks when Paul tells him to! The crowd shouts that they are the gods Zeus and Hermes. \"No! We are human, just like you,\" they cry. \"We bring you good news of the living God!\" Later, enemies attack Paul and leave him for dead, but he gets up and walks back into town!",
      ro: "La Listra, un om care nu umblase niciodată sare în picioare și merge, când Pavel îi poruncește! Mulțimea strigă că ei sunt zeii Zeus și Hermes. „Nu! Suntem oameni ca și voi”, strigă ei. „Vă aducem vestea cea bună a Dumnezeului celui viu!” Mai târziu, dușmanii îl atacă pe Pavel și îl lasă drept mort, dar el se ridică și intră înapoi în oraș!" },
    { to: 'derbe', mode: 'land',
      en: "Derbe, the farthest town of the journey. Here many people become disciples of Jesus.",
      ro: "Derbe, cel mai îndepărtat oraș al călătoriei. Aici mulți oameni devin ucenici ai lui Iisus." },
    { to: 'lystra', mode: 'land',
      en: "Now they go back the brave way, through the very towns where they were attacked, to encourage the new believers: \"Stay strong in the faith!\"",
      ro: "Acum se întorc pe drumul curajos, prin aceleași orașe în care fuseseră atacați, ca să-i încurajeze pe noii credincioși: „Rămâneți tari în credință!”" },
    { to: 'iconium', mode: 'land',
      en: "In every church they choose elders, pray and fast with them, and entrust them to the Lord.",
      ro: "În fiecare biserică aleg presbiteri, se roagă și postesc împreună cu ei și îi încredințează Domnului." },
    { to: 'antiochpisidia', mode: 'land',
      en: "Pisidian Antioch again. Now a little lamp burns in every town they visited.",
      ro: "Din nou la Antiohia Pisidiei. Acum, în fiecare oraș prin care au trecut arde o candelă mică." },
    { to: 'perga', mode: 'land',
      en: "Down from the mountains to Perga, where they preach the word too.",
      ro: "Coboară din munți până la Perga, unde vestesc și aici cuvântul." },
    { to: 'attalia', mode: 'land',
      en: "To the harbour of Attalia, to find a ship home.",
      ro: "Până la portul Atalia, ca să găsească o corabie spre casă." },
    { to: 'seleucia', mode: 'sea', via: [[31.5, 36.45], [32.8, 35.82], [34.4, 35.92], [35.6, 36.04]],
      en: "A long voyage back across the sea to Seleucia.",
      ro: "O lungă călătorie pe mare, înapoi la Seleucia." },
    { to: 'antiochia', mode: 'land',
      en: "We run down to the harbour to meet them! The whole church gathers, and Paul and Barnabas tell how God has \"opened a door of faith\" for the gentiles. But soon a big question will need an answer… (to be continued)",
      ro: "Alergăm la port să-i întâmpinăm! Toată biserica se adună, iar Pavel și Barnaba povestesc cum Dumnezeu „a deschis neamurilor ușa credinței”. Dar curând o mare întrebare va cere un răspuns… (va urma)" },
  ],
  // Cities where a new community ("lamp") is lit, on arrival.
  lamps: ['salamis', 'paphos', 'perga', 'antiochpisidia', 'iconium', 'lystra', 'derbe'],
};

// Communities that already exist by c. AD 46 (Acts 1–12).
export const litAtStart = ['hierosolyma', 'samaria', 'ioppe', 'caesarea', 'tyrus', 'damascus', 'antiochia'];
