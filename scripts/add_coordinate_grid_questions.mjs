import fs from 'fs';

const tests = JSON.parse(fs.readFileSync('src/data/lgsGeneratedTests.json', 'utf8'));

// Helper to create 4 option figures (1 correct, 3 distractors)
function createOptionFigures({
  xLabels = ['1', '2', '3', '4', '5', '6'],
  yLabels = ['A', 'B', 'C', 'D', 'E', 'F'],
  correctSegments,
  correctLetter = 'B',
  distractorTypes = ['swap_axes', 'invert_dash', 'wrong_vertex']
}) {
  const figures = {};
  const letters = ['A', 'B', 'C', 'D'];

  letters.forEach(letter => {
    if (letter === correctLetter) {
      figures[letter] = {
        xLabels: [...xLabels],
        yLabels: [...yLabels],
        segments: JSON.parse(JSON.stringify(correctSegments)),
        label: letter
      };
    } else {
      // Create subtle distractors
      const distractorType = distractorTypes.pop() || 'swap_axes';

      if (distractorType === 'swap_axes') {
        // Swap X and Y axes labels (e.g. X becomes letters, Y becomes numbers)
        figures[letter] = {
          xLabels: [...yLabels],
          yLabels: [...xLabels],
          segments: JSON.parse(JSON.stringify(correctSegments)),
          label: letter
        };
      } else if (distractorType === 'invert_dash') {
        // Invert some solid and dashed lines
        const modified = correctSegments.map((s, idx) => ({
          ...s,
          type: idx % 2 === 0 ? (s.type === 'solid' ? 'dashed' : 'solid') : s.type
        }));
        figures[letter] = {
          xLabels: [...xLabels],
          yLabels: [...yLabels],
          segments: modified,
          label: letter
        };
      } else {
        // Shift a vertex or invert specific segment
        const modified = correctSegments.map((s, idx) => {
          if (idx === 1 || idx === correctSegments.length - 2) {
            return { ...s, type: s.type === 'solid' ? 'dashed' : 'solid' };
          }
          return s;
        });
        figures[letter] = {
          xLabels: [...xLabels],
          yLabels: [...yLabels],
          segments: modified,
          label: letter
        };
      }
    }
  });

  return figures;
}

// Definition of 20 Grid Coordinate questions
const gridQuestionsData = [
  // 1. LGS Test 1 (ID 1008)
  {
    testId: 'lgs_test_1',
    qNum: 8,
    teacher: 'Ece Öğretmen',
    activity: 'kodlama ve robotik dersinde birim kareli çizim alanında bir logo tasarımı',
    xLabels: ['1', '2', '3', '4', '5', '6'],
    yLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
    axesDesc: 'dikey çizgileri rakamlarla (1, 2, 3, 4, 5, 6), yatay çizgileri ise harflerle (A, B, C, D, E, F)',
    sampleRef: 'E çizgisiyle 4 çizgisinin kesiştiği nokta E4 noktasıdır.',
    code: 'B2 — D2 — F4 ---- D4 — B2',
    extraIntro: 'Verilen kesişim noktaları arasında düz çizgi (—) varsa düz, kesik çizgi (----) varsa kesik çizgiyle birleştirmelerini söylemiştir.',
    correctLetter: 'A',
    correctAnswer: 0,
    segments: [
      { from: 'B2', to: 'D2', type: 'solid' },
      { from: 'D2', to: 'F4', type: 'solid' },
      { from: 'F4', to: 'D4', type: 'dashed' },
      { from: 'D4', to: 'B2', type: 'solid' }
    ],
    explanation: 'Doğru Cevap: A seçeneğidir. Dikey çizgiler rakamlarla (1..6) altta, yatay çizgiler harflerle (A..F) solda yer almaktadır. B2, D2, F4 ve D4 noktaları kurallara uygun olarak sırasıyla düz, düz, kesik ve düz çizgilerle birleştirildiğinde A seçeneğindeki şekil elde edilir.'
  },

  // 2. LGS Test 2 (ID 1018)
  {
    testId: 'lgs_test_2',
    qNum: 8,
    teacher: 'Selim Öğretmen',
    activity: 'görsel sanatlar ve matematik projesinde birim kareli ızgarada kristal / elmas motifi',
    xLabels: ['1', '2', '3', '4', '5', '6'],
    yLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
    axesDesc: 'dikey çizgileri rakamlarla, yatay çizgileri ise harflerle',
    sampleRef: 'D çizgisiyle 3 çizgisinin kesiştiği nokta D3 noktasıdır.',
    code: 'B3 — D1 — F3 ---- D5 ---- B3',
    extraIntro: 'Verilen kesişim noktaları arasında düz çizgi (—) varsa düz, kesik çizgi (----) varsa kesik çizgiyle birleştirilecektir.',
    correctLetter: 'C',
    correctAnswer: 2,
    segments: [
      { from: 'B3', to: 'D1', type: 'solid' },
      { from: 'D1', to: 'F3', type: 'solid' },
      { from: 'F3', to: 'D5', type: 'dashed' },
      { from: 'D5', to: 'B3', type: 'dashed' }
    ],
    explanation: 'Doğru Cevap: C seçeneğidir. Yatay eksende 1..6 rakamları, dikey eksende A..F harfleri yer alır. B3-D1 ve D1-F3 düz çizgi; F3-D5 ve D5-B3 ise kesik çizgi ile birleştirilmiştir.'
  },

  // 3. LGS Test 3 (ID 1028)
  {
    testId: 'lgs_test_3',
    qNum: 8,
    teacher: 'Canan Öğretmen',
    activity: 'bilişim teknolojileri dersinde robotik çizgi izleyen sensörün merdiven tipi rotasını',
    xLabels: ['1', '2', '3', '4', '5', '6'],
    yLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
    axesDesc: 'dikey çizgileri rakamlarla (1..6), yatay çizgileri harflerle (A..F)',
    sampleRef: 'C çizgisiyle 3 çizgisinin kesiştiği nokta C3 noktasıdır.',
    code: 'A1 — C1 ---- C3 — E3 ---- E5 — F5',
    extraIntro: 'Düz çizgi (—) kesintisiz hareketi, kesik çizgi (----) ise sensörün aralıklı tarama yaptığını göstermektedir.',
    correctLetter: 'B',
    correctAnswer: 1,
    segments: [
      { from: 'A1', to: 'C1', type: 'solid' },
      { from: 'C1', to: 'C3', type: 'dashed' },
      { from: 'C3', to: 'E3', type: 'solid' },
      { from: 'E3', to: 'E5', type: 'dashed' },
      { from: 'E5', to: 'F5', type: 'solid' }
    ],
    explanation: 'Doğru Cevap: B seçeneğidir. Dikey eksen harfler (A..F), yatay eksen rakamlar (1..6) olup A1-C1 düz, C1-C3 kesik, C3-E3 düz, E3-E5 kesik ve E5-F5 düz çizgi olarak B seçeneğinde eksiksiz çizilmiştir.'
  },

  // 4. LGS Test 4 (ID 1038)
  {
    testId: 'lgs_test_4',
    qNum: 8,
    teacher: 'Murat Öğretmen',
    activity: 'tasarım beceri atölyesinde birim kareli zeminde Selçuklu sekizgen motifinin üst kanat formunu',
    xLabels: ['1', '2', '3', '4', '5', '6'],
    yLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
    axesDesc: 'dikey çizgileri rakamlarla, yatay çizgileri harflerle',
    sampleRef: 'B çizgisiyle 2 çizgisinin kesiştiği nokta B2 noktasıdır.',
    code: 'C2 — E2 — F3 ---- E4 — C4 ---- B3 — C2',
    extraIntro: 'Verilen noktalar arasında düz çizgi (—) varsa düz, kesik çizgi (----) varsa kesik çizgi uygulanacaktır.',
    correctLetter: 'D',
    correctAnswer: 3,
    segments: [
      { from: 'C2', to: 'E2', type: 'solid' },
      { from: 'E2', to: 'F3', type: 'solid' },
      { from: 'F3', to: 'E4', type: 'dashed' },
      { from: 'E4', to: 'C4', type: 'solid' },
      { from: 'C4', to: 'B3', type: 'dashed' },
      { from: 'B3', to: 'C2', type: 'solid' }
    ],
    explanation: 'Doğru Cevap: D seçeneğidir. Eksen adlandırmaları ve noktaların birleşimi incelendiğinde C2-E2 (düz), E2-F3 (düz), F3-E4 (kesik), E4-C4 (düz), C4-B3 (kesik) ve B3-C2 (düz) bağlantıları D seçeneğinde tam olarak eşleşmektedir.'
  },

  // 5. LGS Test 5 (ID 1048)
  {
    testId: 'lgs_test_5',
    qNum: 8,
    teacher: 'Bahar Öğretmen',
    activity: 'mimarlık ve çevre kulübünde birim kareli ızgarada üçgen köprü kafesi modelini',
    xLabels: ['1', '2', '3', '4', '5', '6'],
    yLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
    axesDesc: 'dikey çizgileri rakamlarla, yatay çizgileri harflerle',
    sampleRef: 'A çizgisiyle 1 çizgisinin kesişimi A1 noktasıdır.',
    code: 'A1 — D3 — A5 ---- D3 ---- A3 — D3',
    extraIntro: 'Ana taşıyıcılar düz çizgi (—), çapraz gergi telleri ise kesik çizgi (----) ile gösterilmiştir.',
    correctLetter: 'A',
    correctAnswer: 0,
    segments: [
      { from: 'A1', to: 'D3', type: 'solid' },
      { from: 'D3', to: 'A5', type: 'solid' },
      { from: 'A5', to: 'D3', type: 'dashed' },
      { from: 'A3', to: 'D3', type: 'solid' },
      { from: 'A1', to: 'A5', type: 'solid' }
    ],
    explanation: 'Doğru Cevap: A seçeneğidir. A1-D3 ve D3-A5 ana kirişleri düz, taban kirişi düz ve orta gergi A3-D3 düz çizgi olarak A seçeneğindeki kafes modelini oluşturur.'
  },

  // 6. LGS Test 6 (ID 1058)
  {
    testId: 'lgs_test_6',
    qNum: 8,
    teacher: 'Tarık Öğretmen',
    activity: 'havacılık ve uzay kulübünde birim kareli koordinat alanında roket ucu formunu',
    xLabels: ['1', '2', '3', '4', '5', '6'],
    yLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
    axesDesc: 'dikey çizgileri rakamlarla (1..6), yatay çizgileri harflerle (A..F)',
    sampleRef: 'F çizgisiyle 3 çizgisinin kesiştiği nokta F3 noktasıdır.',
    code: 'B2 — D2 — F3 ---- D4 — B4 ---- B2',
    extraIntro: 'Düz çizgi (—) ve kesik çizgi (----) sembollerine dikkat edilerek birleştirilecektir.',
    correctLetter: 'B',
    correctAnswer: 1,
    segments: [
      { from: 'B2', to: 'D2', type: 'solid' },
      { from: 'D2', to: 'F3', type: 'solid' },
      { from: 'F3', to: 'D4', type: 'dashed' },
      { from: 'D4', to: 'B4', type: 'solid' },
      { from: 'B4', to: 'B2', type: 'dashed' }
    ],
    explanation: 'Doğru Cevap: B seçeneğidir. B2-D2 (düz), D2-F3 (düz), F3-D4 (kesik), D4-B4 (düz) ve B4-B2 (kesik) bağlantıları eksen yönlerine uygun olarak B seçeneğinde doğru verilmiştir.'
  },

  // 7. LGS Test 7 (ID 1068)
  {
    testId: 'lgs_test_7',
    qNum: 8,
    teacher: 'Fatma Öğretmen',
    activity: 'origami atölyesinde kâğıt katlama çizgilerini birim kareli zeminde',
    xLabels: ['1', '2', '3', '4', '5', '6'],
    yLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
    axesDesc: 'dikey çizgileri rakamlarla, yatay çizgileri harflerle',
    sampleRef: 'C çizgisiyle 2 çizgisinin kesiştiği nokta C2 noktasıdır.',
    code: 'C1 — E3 — C5 ---- A3 — C1',
    extraIntro: 'Dağ katlama hatları düz çizgi (—), vadi katlama hatları kesik çizgi (----) ile gösterilmiştir.',
    correctLetter: 'C',
    correctAnswer: 2,
    segments: [
      { from: 'C1', to: 'E3', type: 'solid' },
      { from: 'E3', to: 'C5', type: 'solid' },
      { from: 'C5', to: 'A3', type: 'dashed' },
      { from: 'A3', to: 'C1', type: 'dashed' }
    ],
    explanation: 'Doğru Cevap: C seçeneğidir. C1-E3 ve E3-C5 düz; C5-A3 ve A3-C1 kesik çizgi ile birleştirilerek simetrik katlama ekseni oluşturulmuştur.'
  },

  // 8. LGS Test 8 (ID 1078)
  {
    testId: 'lgs_test_8',
    qNum: 8,
    teacher: 'Harun Öğretmen',
    activity: 'grafik tasarım dersinde birim kareli alanda geometrik ev ve çatı motifi',
    xLabels: ['1', '2', '3', '4', '5', '6'],
    yLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
    axesDesc: 'dikey çizgileri rakamlarla, yatay çizgileri harflerle',
    sampleRef: 'D çizgisiyle 4 çizgisinin kesiştiği nokta D4 noktasıdır.',
    code: 'A2 — D2 — F3 — D4 — A4 ---- A2',
    extraIntro: 'Duvar ve çatı hatları düz çizgi (—), taban hattı kesik çizgi (----) ile gösterilmiştir.',
    correctLetter: 'B',
    correctAnswer: 1,
    segments: [
      { from: 'A2', to: 'D2', type: 'solid' },
      { from: 'D2', to: 'F3', type: 'solid' },
      { from: 'F3', to: 'D4', type: 'solid' },
      { from: 'D4', to: 'A4', type: 'solid' },
      { from: 'A4', to: 'A2', type: 'dashed' }
    ],
    explanation: 'Doğru Cevap: B seçeneğidir. Dikey çizgiler 1..6, yatay çizgiler A..F olup dış çerçeve düz, zemin tabanı ise kesik çizgiyle B seçeneğinde gösterilmiştir.'
  },

  // 9. LGS Test 9 (ID 1088)
  {
    testId: 'lgs_test_9',
    qNum: 8,
    teacher: 'Serkan Öğretmen',
    activity: 'yapay zekâ ve algoritma dersinde kum saati formundaki piksel tarama rotasını',
    xLabels: ['1', '2', '3', '4', '5', '6'],
    yLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
    axesDesc: 'dikey çizgileri rakamlarla, yatay çizgileri harflerle',
    sampleRef: 'E çizgisiyle 2 çizgisinin kesişimi E2 noktasıdır.',
    code: 'E2 — E5 ---- B2 — B5 ---- E2',
    extraIntro: 'Yatay sınırlar düz çizgi (—), çapraz geçiş hatları kesik çizgi (----) olarak tanımlanmıştır.',
    correctLetter: 'A',
    correctAnswer: 0,
    segments: [
      { from: 'E2', to: 'E5', type: 'solid' },
      { from: 'E5', to: 'B2', type: 'dashed' },
      { from: 'B2', to: 'B5', type: 'solid' },
      { from: 'B5', to: 'E2', type: 'dashed' }
    ],
    explanation: 'Doğru Cevap: A seçeneğidir. Üst (E2-E5) ve alt (B2-B5) yatay hatlar düz, iç çapraz geçişler kesik çizgi ile A seçeneğindeki kum saatini oluşturur.'
  },

  // 10. LGS Test 10 (ID 1098)
  {
    testId: 'lgs_test_10',
    qNum: 8,
    teacher: 'Deniz Öğretmen',
    activity: 'denizcilik kulübünde pusula gülü ve yönlendirme okunu birim kareli alanda',
    xLabels: ['1', '2', '3', '4', '5', '6'],
    yLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
    axesDesc: 'dikey çizgileri rakamlarla (1..6), yatay çizgileri harflerle (A..F)',
    sampleRef: 'F çizgisiyle 3 çizgisinin kesiştiği nokta F3 noktasıdır.',
    code: 'B3 — F3 ---- D2 — D4 ---- B3',
    extraIntro: 'Ana kuzey oku gövdesi düz çizgi (—), yan denge kolları kesik çizgi (----) ile birleştirilecektir.',
    correctLetter: 'D',
    correctAnswer: 3,
    segments: [
      { from: 'B3', to: 'F3', type: 'solid' },
      { from: 'F3', to: 'D2', type: 'dashed' },
      { from: 'D2', to: 'D4', type: 'solid' },
      { from: 'D4', to: 'B3', type: 'dashed' }
    ],
    explanation: 'Doğru Cevap: D seçeneğidir. Dikey ana ok B3-F3 (düz), yan kanatlar F3-D2 (kesik), D2-D4 (düz) ve D4-B3 (kesik) olarak D seçeneğinde doğru konumlanmıştır.'
  },

  // 11. MEBİ Test 1 (ID 2108)
  {
    testId: 'mebi_test_1',
    qNum: 8,
    teacher: 'Mehmet Öğretmen',
    activity: 'kodlama etkinliğinde birim kareli çizim alanında "M" harfi profilini',
    xLabels: ['1', '2', '3', '4', '5', '6'],
    yLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
    axesDesc: 'dikey çizgileri rakamlarla, yatay çizgileri harflerle',
    sampleRef: 'E çizgisiyle 3 çizgisinin kesişimi E3 noktasıdır.',
    code: 'A2 — E2 ---- C3 ---- E4 — A4',
    extraIntro: 'Dış bacaklar düz çizgi (—), iç vadi hatları kesik çizgi (----) ile çizilecektir.',
    correctLetter: 'C',
    correctAnswer: 2,
    segments: [
      { from: 'A2', to: 'E2', type: 'solid' },
      { from: 'E2', to: 'C3', type: 'dashed' },
      { from: 'C3', to: 'E4', type: 'dashed' },
      { from: 'E4', to: 'A4', type: 'solid' }
    ],
    explanation: 'Doğru Cevap: C seçeneğidir. Dikey çizgiler 1..6, yatay çizgiler A..F olup dış dikey hatlar düz, iç kırılma hatları kesik çizgiyle C seçeneğindeki "M" harfini oluşturur.'
  },

  // 12. MEBİ Test 2 (ID 2118)
  {
    testId: 'mebi_test_2',
    qNum: 8,
    teacher: 'Ayşe Öğretmen',
    activity: 'akıl ve zekâ oyunları turnuvasında birim kareli zeminde altıgen prizma tabanını',
    xLabels: ['1', '2', '3', '4', '5', '6'],
    yLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
    axesDesc: 'dikey çizgileri rakamlarla, yatay çizgileri harflerle',
    sampleRef: 'C çizgisiyle 1 çizgisinin kesiştiği nokta C1 noktasıdır.',
    code: 'C1 — D2 — D4 — C5 ---- B4 ---- B2 — C1',
    extraIntro: 'Ön yüz çizgileri düz (—), arka perspektif çizgileri kesik (----) olarak çizilmiştir.',
    correctLetter: 'A',
    correctAnswer: 0,
    segments: [
      { from: 'C1', to: 'D2', type: 'solid' },
      { from: 'D2', to: 'D4', type: 'solid' },
      { from: 'D4', to: 'C5', type: 'solid' },
      { from: 'C5', to: 'B4', type: 'dashed' },
      { from: 'B4', to: 'B2', type: 'dashed' },
      { from: 'B2', to: 'C1', type: 'solid' }
    ],
    explanation: 'Doğru Cevap: A seçeneğidir. Belirtilen altıgen koordinatlarında C1-D2-D4-C5 ve B2-C1 düz; C5-B4-B2 kesik çizgi olarak A seçeneğinde eksiksiz gösterilmiştir.'
  },

  // 13. MEBİ Test 3 (ID 2128)
  {
    testId: 'mebi_test_3',
    qNum: 8,
    teacher: 'Kemal Öğretmen',
    activity: 'tasarım beceri atölyesinde yelkenli gemi pruva profilini birim kareli zeminde',
    xLabels: ['1', '2', '3', '4', '5', '6'],
    yLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
    axesDesc: 'dikey çizgileri rakamlarla, yatay çizgileri harflerle',
    sampleRef: 'B çizgisiyle 3 çizgisinin kesiştiği nokta B3 noktasıdır.',
    code: 'B2 — B5 — C4 ---- E3 ---- C2 — B2',
    extraIntro: 'Gövde omurgası düz çizgi (—), yelken halatları kesik çizgi (----) ile gösterilmiştir.',
    correctLetter: 'B',
    correctAnswer: 1,
    segments: [
      { from: 'B2', to: 'B5', type: 'solid' },
      { from: 'B5', to: 'C4', type: 'solid' },
      { from: 'C4', to: 'E3', type: 'dashed' },
      { from: 'E3', to: 'C2', type: 'dashed' },
      { from: 'C2', to: 'B2', type: 'solid' }
    ],
    explanation: 'Doğru Cevap: B seçeneğidir. Alt taban B2-B5 (düz), pruva B5-C4 (düz), yelken C4-E3 (kesik) ve E3-C2 (kesik), ön gövde C2-B2 (düz) olarak B seçeneğinde tam uyuşmaktadır.'
  },

  // 14. MEBİ Test 4 (ID 2138)
  {
    testId: 'mebi_test_4',
    qNum: 8,
    teacher: 'Ziya Öğretmen',
    activity: 'STEM kulübünde güneş paneli ayak şasisini birim kareli alanda',
    xLabels: ['1', '2', '3', '4', '5', '6'],
    yLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
    axesDesc: 'dikey çizgileri rakamlarla (1..6), yatay çizgileri harflerle (A..F)',
    sampleRef: 'D çizgisiyle 2 çizgisinin kesişimi D2 noktasıdır.',
    code: 'A2 — D2 — D5 — A5 ---- D2 ---- A5',
    extraIntro: 'Çerçeve hatları düz çizgi (—), diyagonal rüzgâr teli kesik çizgi (----) ile çizilecektir.',
    correctLetter: 'D',
    correctAnswer: 3,
    segments: [
      { from: 'A2', to: 'D2', type: 'solid' },
      { from: 'D2', to: 'D5', type: 'solid' },
      { from: 'D5', to: 'A5', type: 'solid' },
      { from: 'A5', to: 'A2', type: 'solid' },
      { from: 'D2', to: 'A5', type: 'dashed' }
    ],
    explanation: 'Doğru Cevap: D seçeneğidir. Dikdörtgen çerçeve A2-D2-D5-A5 düz çizgilerden, D2-A5 çapraz bağı ise kesik çizgiden oluşur. D seçeneği kuralları tam sağlar.'
  },

  // 15. MEBİ Test 5 (ID 2148)
  {
    testId: 'mebi_test_5',
    qNum: 8,
    teacher: 'Nihan Öğretmen',
    activity: 'coğrafi bilgi sistemi kulübünde eş yükselti sırt çizgisini birim kareli koordinatlarda',
    xLabels: ['1', '2', '3', '4', '5', '6'],
    yLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
    axesDesc: 'dikey çizgileri rakamlarla, yatay çizgileri harflerle',
    sampleRef: 'C çizgisiyle 3 çizgisinin kesiştiği nokta C3 noktasıdır.',
    code: 'B1 — C3 — B5 ---- D4 — D2 ---- B1',
    extraIntro: 'Ana sırt çizgisi düz (—), vadi tabanı ise kesik çizgi (----) ile gösterilmiştir.',
    correctLetter: 'C',
    correctAnswer: 2,
    segments: [
      { from: 'B1', to: 'C3', type: 'solid' },
      { from: 'C3', to: 'B5', type: 'solid' },
      { from: 'B5', to: 'D4', type: 'dashed' },
      { from: 'D4', to: 'D2', type: 'solid' },
      { from: 'D2', to: 'B1', type: 'dashed' }
    ],
    explanation: 'Doğru Cevap: C seçeneğidir. Verilen koordinatlar incelendiğinde B1-C3 (düz), C3-B5 (düz), B5-D4 (kesik), D4-D2 (düz) ve D2-B1 (kesik) çizgileri C seçeneğinde birebir eşleşir.'
  },

  // 16. MEBİ Test 6 (ID 2158)
  {
    testId: 'mebi_test_6',
    qNum: 8,
    teacher: 'Oğuz Öğretmen',
    activity: 'sayısal mantık etkinliğinde birim kareli labirent duvarını ve kontrol kapısını',
    xLabels: ['1', '2', '3', '4', '5', '6'],
    yLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
    axesDesc: 'dikey çizgileri rakamlarla, yatay çizgileri harflerle',
    sampleRef: 'E çizgisiyle 1 çizgisinin kesiştiği nokta E1 noktasıdır.',
    code: 'B1 — E1 — E3 ---- C3 — C5 — E5',
    extraIntro: 'Sert beton duvarlar düz (—), lazer sensör kapısı kesik çizgi (----) ile temsil edilmiştir.',
    correctLetter: 'A',
    correctAnswer: 0,
    segments: [
      { from: 'B1', to: 'E1', type: 'solid' },
      { from: 'E1', to: 'E3', type: 'solid' },
      { from: 'E3', to: 'C3', type: 'dashed' },
      { from: 'C3', to: 'C5', type: 'solid' },
      { from: 'C5', to: 'E5', type: 'solid' }
    ],
    explanation: 'Doğru Cevap: A seçeneğidir. Eksen adları, koordinat sıralaması ve E3-C3 arasındaki kesik çizgi A seçeneğinde tam olarak doğru gösterilmiştir.'
  },

  // 17. MEBİ Test 7 (ID 2168)
  {
    testId: 'mebi_test_7',
    qNum: 8,
    teacher: 'Burak Öğretmen',
    activity: 'astronomi ve uzay gözleminde takımyıldız bağlantılarını birim kareli koordinatlarda',
    xLabels: ['1', '2', '3', '4', '5', '6'],
    yLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
    axesDesc: 'dikey çizgileri rakamlarla, yatay çizgileri harflerle',
    sampleRef: 'F çizgisiyle 4 çizgisinin kesiştiği nokta F4 noktasıdır.',
    code: 'B1 — C3 — E3 — F4 ---- E5 — C5 ---- C3',
    extraIntro: 'Görünür yıldız bağları düz çizgi (—), zayıf ışıklı bağlar kesik çizgi (----) ile çizilmiştir.',
    correctLetter: 'B',
    correctAnswer: 1,
    segments: [
      { from: 'B1', to: 'C3', type: 'solid' },
      { from: 'C3', to: 'E3', type: 'solid' },
      { from: 'E3', to: 'F4', type: 'solid' },
      { from: 'F4', to: 'E5', type: 'dashed' },
      { from: 'E5', to: 'C5', type: 'solid' },
      { from: 'C5', to: 'C3', type: 'dashed' }
    ],
    explanation: 'Doğru Cevap: B seçeneğidir. Takımyıldız formu B1-C3 (düz), C3-E3 (düz), E3-F4 (düz), F4-E5 (kesik), E5-C5 (düz) ve C5-C3 (kesik) çizgileriyle B seçeneğinde kusursuz biçimde çizilmiştir.'
  },

  // 18. MEBİ Test 8 (ID 2178) -> KULLANICININ YÜKLEDİĞİ GÖRSELİN BİREBİR SORUSU!
  {
    testId: 'mebi_test_8',
    qNum: 8,
    teacher: 'Gökhan Öğretmen',
    activity: 'birim karelerden oluşan bir çizim alanında kesişim noktaları ve birleştirme çizgilerini',
    xLabels: ['1', '2', '3', '4', '5', '6'],
    yLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
    axesDesc: 'dikey çizgileri rakamlarla, yatay çizgileri ise harflerle',
    sampleRef: 'Örneğin E çizgisiyle 5 çizgisinin kesiştiği nokta E5 noktasıdır.',
    code: 'C3 — D4 — C5 ---- B4 ---- A3 — B2 ---- C1 — D2',
    extraIntro: 'Verilen kesişim noktaları arasında düz çizgi (—) varsa kesişim noktalarını düz, kesik çizgi (----) varsa kesik çizgiyle birleştirmelerini söylemiştir.',
    correctLetter: 'B',
    correctAnswer: 1,
    segments: [
      { from: 'C3', to: 'D4', type: 'solid' },
      { from: 'D4', to: 'C5', type: 'solid' },
      { from: 'C5', to: 'B4', type: 'dashed' },
      { from: 'B4', to: 'A3', type: 'dashed' },
      { from: 'A3', to: 'B2', type: 'solid' },
      { from: 'B2', to: 'C1', type: 'dashed' },
      { from: 'C1', to: 'D2', type: 'solid' },
      { from: 'D2', to: 'C3', type: 'solid' }
    ],
    explanation: 'Doğru Cevap: B seçeneğidir. Dikey çizgiler rakamlarla (1, 2, 3, 4, 5, 6 - yatay eksen), yatay çizgiler harflerle (A, B, C, D, E, F - dikey eksen) adlandırılmıştır. C3(3,C) — D4(4,D) (düz), D4 — C5(5,C) (düz), C5 ---- B4(4,B) (kesik), B4 ---- A3(3,A) (kesik), A3 — B2(2,B) (düz), B2 ---- C1(1,C) (kesik), C1 — D2(2,D) (düz) ve D2 — C3 (düz) birleştirildiğinde B seçeneğindeki şekil tam olarak ortaya çıkar. A ve D seçeneklerinde eksenler yer değiştirmiş (rakam ve harf yerleri ters), C seçeneğinde ise çizgi türleri (düz/kesik) hatalı verilmiştir.'
  },

  // 19. MEBİ Test 9 (ID 2188)
  {
    testId: 'mebi_test_9',
    qNum: 8,
    teacher: 'Leyla Öğretmen',
    activity: 'fen bilimleri optik ünitesinde düzlem aynalardan yansıyan ışık ışını rotasını',
    xLabels: ['1', '2', '3', '4', '5', '6'],
    yLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
    axesDesc: 'dikey çizgileri rakamlarla, yatay çizgileri harflerle',
    sampleRef: 'B çizgisiyle 1 çizgisinin kesiştiği nokta B1 noktasıdır.',
    code: 'B1 — D3 ---- D5 — B3 ---- B1',
    extraIntro: 'Asıl yansıyan ışınlar düz çizgi (—), ayna arkası sanal uzantılar kesik çizgi (----) ile gösterilmiştir.',
    correctLetter: 'C',
    correctAnswer: 2,
    segments: [
      { from: 'B1', to: 'D3', type: 'solid' },
      { from: 'D3', to: 'D5', type: 'dashed' },
      { from: 'D5', to: 'B3', type: 'solid' },
      { from: 'B3', to: 'B1', type: 'dashed' }
    ],
    explanation: 'Doğru Cevap: C seçeneğidir. B1-D3 (düz), D3-D5 (kesik), D5-B3 (düz) ve B3-B1 (kesik) çizgileriyle eşleşen çizim alanı C seçeneğidir.'
  },

  // 20. MEBİ Test 10 (ID 2198)
  {
    testId: 'mebi_test_10',
    qNum: 8,
    teacher: 'Tolga Öğretmen',
    activity: 'robotik ligi finalinde keşif robotunun birim kareli alandaki devriye sınırını',
    xLabels: ['1', '2', '3', '4', '5', '6'],
    yLabels: ['A', 'B', 'C', 'D', 'E', 'F'],
    axesDesc: 'dikey çizgileri rakamlarla (1..6), yatay çizgileri harflerle (A..F)',
    sampleRef: 'E çizgisiyle 4 çizgisinin kesişimi E4 noktasıdır.',
    code: 'B2 — B5 — E4 ---- E2 ---- B2',
    extraIntro: 'Güvenli rotalar düz çizgi (—), aralıklı sinyal bölgeleri kesik çizgi (----) ile çizilmiştir.',
    correctLetter: 'D',
    correctAnswer: 3,
    segments: [
      { from: 'B2', to: 'B5', type: 'solid' },
      { from: 'B5', to: 'E4', type: 'solid' },
      { from: 'E4', to: 'E2', type: 'dashed' },
      { from: 'E2', to: 'B2', type: 'dashed' }
    ],
    explanation: 'Doğru Cevap: D seçeneğidir. B2-B5 (düz), B5-E4 (düz), E4-E2 (kesik) ve E2-B2 (kesik) hatları D seçeneğinde eksiksiz ve doğru eksenlerle gösterilmiştir.'
  }
];

// Apply each grid question into tests
let updatedCount = 0;

tests.forEach(test => {
  const gq = gridQuestionsData.find(g => g.testId === test.id);
  if (!gq) return;

  const targetIndex = test.questions.findIndex(q => q.questionNumberInTest === gq.qNum);
  if (targetIndex === -1) return;

  const oldQ = test.questions[targetIndex];

  // Context formulation matching the image style
  const contextText = `${gq.teacher} öğrencilerine birim karelerden oluşan bir çizim alanı vermiştir. Öğrencilerin bu çizim alanında birim kareleri oluşturan ${gq.axesDesc} adlandırmalarını istemiştir. Daha sonra ${gq.teacher} bu çizgilerin kesişim noktalarını öğrencilerin çizgilere verdikleri adlarla tanımlayabileceklerini söylemiştir. Örneğin ${gq.sampleRef} Verilen kesişim noktaları arasında düz çizgi (—) varsa kesişim noktalarını düz, kesik çizgi (----) varsa kesik çizgiyle birleştirmelerini söylemiştir.`;

  const questionStem = `Buna göre ${gq.teacher} ${gq.code} şeklinde kesişim noktaları ve birleştirme çizgileri tanımladığında ortaya çıkan çizim alanı ve şekil aşağıdakilerden hangisidir?`;

  const optionFigures = createOptionFigures({
    xLabels: gq.xLabels,
    yLabels: gq.yLabels,
    correctSegments: gq.segments,
    correctLetter: gq.correctLetter
  });

  const newQuestion = {
    ...oldQ,
    category: 'Görsel Mantık & Kodlama',
    konu: 'Birim Kareli Çizim Alanı, Koordinat & Çizgi Kodlaması',
    badgeLabel: test.testType === '2026_lgs' ? '2026 LGS Görsel Kodlama' : 'MEBİ Görsel Koordinat',
    context: contextText,
    tableData: null,
    tableMarkdown: null,
    tableOrPremises: null,
    logicScenario: null,
    chartData: null,
    gridQuestionData: {
      type: 'grid_coordinate_coding',
      sampleCode: gq.code,
      optionFigures: optionFigures
    },
    questionStem: questionStem,
    options: [
      'A seçeneğindeki koordinat ve çizgi modeli',
      'B seçeneğindeki koordinat ve çizgi modeli',
      'C seçeneğindeki koordinat ve çizgi modeli',
      'D seçeneğindeki koordinat ve çizgi modeli'
    ],
    correctAnswer: gq.correctAnswer,
    explanation: gq.explanation,
    strategyTip: 'Birim kareli koordinat sorularında önce dikey ve yatay eksenlerin adlandırma yönüne (hangi eksende harf, hangi eksende rakam olduğuna) dikkat edin. Ardından düz (—) ve kesik (----) çizgileri kesişim noktalarıyla sırayla takip ederek eleme yapın.'
  };

  test.questions[targetIndex] = newQuestion;
  updatedCount++;
  console.log(`Updated test ${test.id} question ${gq.qNum} with grid coordinate question.`);
});

fs.writeFileSync('src/data/lgsGeneratedTests.json', JSON.stringify(tests, null, 2), 'utf8');
console.log(`Successfully updated ${updatedCount} tests with grid coordinate questions!`);
