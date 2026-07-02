/* ══════════════════════════════════════════════════════════════
   NIHONGO TUTOR — Datos de contenido
   ══════════════════════════════════════════════════════════════ */

const modules = [
  ["mod-presentacion", "🎌 Presentacion"],
  ["mod-saludos", "💬 Saludos"],
  ["mod-pronuncia", "🎧 Pronunciacion"],
  ["mod-hiragana", "✨ Hiragana"],
  ["mod-katakana", "⚡ Katakana"]
];

const phrases = [
  {
    jp: "はじめまして",
    romaji: "Hajimemashite",
    es: "Mucho gusto / encantado de conocerlo por primera vez",
    speak: "はじめまして",
    parts: ["hajime = comienzo", "mashite = forma cortes", "idea: primer encuentro"]
  },
  {
    jp: "わたし は [nombre] です",
    romaji: "Watashi wa [nombre] desu",
    es: "Yo soy [nombre]",
    speak: "わたしはがくせいです",
    parts: ["watashi = yo", "wa = partícula de tema", "desu = ser/estar formal"]
  },
  {
    jp: "ペルーじん です",
    romaji: "Peruujin desu",
    es: "Soy peruano(a)",
    speak: "ペルーじんです",
    parts: ["Peruu = Peru", "jin = persona/nacionalidad", "desu = expresion formal"]
  },
  {
    jp: "どうぞ よろしく おねがいします",
    romaji: "Douzo yoroshiku onegaishimasu",
    es: "Encantado de conocerlo / por favor trateme bien",
    speak: "どうぞよろしくおねがいします",
    parts: ["douzo = por favor", "yoroshiku = favorablemente", "onegaishimasu = se lo pido"]
  }
];

const greetings = [
  ["おはようございます", "ohayou gozaimasu", "Buenos dias", "Se usa al comenzar el dia o al ver a alguien temprano."],
  ["こんにちは", "konnichiwa", "Buenas tardes / hola", "Saludo general durante el dia. La ha final se pronuncia wa."],
  ["こんばんは", "konbanwa", "Buenas noches", "Saludo al encontrarse de noche. La ha final tambien se pronuncia wa."],
  ["おやすみなさい", "oyasumi nasai", "Buenas noches antes de dormir", "Se usa al despedirse para ir a dormir."],
  ["いってきます", "ittekimasu", "Ya me voy", "Lo dice quien sale de casa."],
  ["いってらっしゃい", "itterasshai", "Que te vaya bien", "Lo dice quien se queda en casa."],
  ["ただいま", "tadaima", "Ya volvi", "Lo dice quien regresa a casa."],
  ["おかえりなさい", "okaeri nasai", "Bienvenido de vuelta", "Lo dice quien recibe en casa."],
  ["ありがとうございます", "arigatou gozaimasu", "Muchas gracias", "Forma cortes de agradecer."],
  ["すみません", "sumimasen", "Disculpe / perdon / gracias contextual", "Sirve para disculparse, llamar la atencion o suavizar una peticion."],
  ["いただきます", "itadakimasu", "Gracias por la comida antes de comer", "Se dice antes de empezar a comer."],
  ["ごちそうさま", "gochisousama", "Gracias por la comida despues de comer", "Se dice al terminar de comer."]
];

const kana = [
  {h:"あ", r:"a", memo:"A de antena.", ex:"あさ asa = manana", strokes:["horizontal corto","vertical que cruza","lazo amplio final"]},
  {h:"い", r:"i", memo:"I de ir: dos piernas.", ex:"いいえ iie = no", strokes:["trazo izquierdo curvo","trazo derecho corto"]},
  {h:"う", r:"u", memo:"U con gorrito.", ex:"うえ ue = arriba", strokes:["marca corta arriba","curva inferior grande"]},
  {h:"え", r:"e", memo:"E de escalera.", ex:"えき eki = estacion", strokes:["marca corta arriba","zigzag continuo"]},
  {h:"お", r:"o", memo:"O de ornamento.", ex:"おはよう ohayou = buenos dias", strokes:["horizontal corto","vertical con lazo","punto diagonal"]},
  {h:"か", r:"ka", memo:"Ka de karate.", ex:"かいしゃ kaisha = empresa", strokes:["curva principal con gancho","diagonal que cruza","punto derecho"]},
  {h:"き", r:"ki", memo:"Ki como key.", ex:"きく kiku = escuchar", strokes:["horizontal superior","horizontal inferior","diagonal","curva inferior"]},
  {h:"く", r:"ku", memo:"Ku como cuna abierta.", ex:"くに kuni = pais", strokes:["angulo unico hacia la izquierda"]},
  {h:"け", r:"ke", memo:"Ke de querer entrar.", ex:"けさ kesa = esta manana", strokes:["vertical izquierdo","horizontal arriba","vertical derecho"]},
  {h:"こ", r:"ko", memo:"Ko de cofre abierto.", ex:"こんにちは konnichiwa = hola", strokes:["horizontal superior curvo","horizontal inferior"]},
  {h:"さ", r:"sa", memo:"Sa de saltar.", ex:"さようなら sayounara = adios", strokes:["horizontal","diagonal con gancho","curva inferior"]},
  {h:"し", r:"shi", memo:"Shi como silencio.", ex:"わたし watashi = yo", strokes:["un trazo: baja y gira"]},
  {h:"す", r:"su", memo:"Su de sushi enrollado.", ex:"です desu = ser formal", strokes:["horizontal","vertical con bucle"]},
  {h:"せ", r:"se", memo:"Se de sentarse.", ex:"せんせい sensei = profesor", strokes:["horizontal","vertical derecho corto","vertical izquierdo largo"]},
  {h:"そ", r:"so", memo:"So de soplar.", ex:"そうです sou desu = asi es", strokes:["trazo continuo tipo Z y curva"]},
  {h:"た", r:"ta", memo:"Ta de tabla.", ex:"たべます tabemasu = comer", strokes:["horizontal","diagonal corto","horizontal derecho superior","horizontal derecho inferior"]},
  {h:"ち", r:"chi", memo:"Chi de chico.", ex:"ちち chichi = padre", strokes:["horizontal","trazo que baja y forma panza"]},
  {h:"つ", r:"tsu", memo:"Tsu como ola.", ex:"つくえ tsukue = escritorio", strokes:["trazo unico curvo"]},
  {h:"て", r:"te", memo:"Te de techo curvo.", ex:"て te = mano", strokes:["trazo unico horizontal y curva"]},
  {h:"と", r:"to", memo:"To de tocar.", ex:"ともだち tomodachi = amigo", strokes:["diagonal corta","curva amplia"]},
  {h:"な", r:"na", memo:"Na de nudo.", ex:"なまえ namae = nombre", strokes:["horizontal","diagonal","punto","lazo inferior"]},
  {h:"に", r:"ni", memo:"Ni de dos lineas.", ex:"にほん nihon = Japon", strokes:["vertical izquierdo","horizontal superior","horizontal inferior"]},
  {h:"ぬ", r:"nu", memo:"Nu de nudo grande.", ex:"ぬの nuno = tela", strokes:["diagonal suave","trazo largo con lazo"]},
  {h:"ね", r:"ne", memo:"Ne como resorte.", ex:"ねこ neko = gato", strokes:["vertical","zigzag con bucle"]},
  {h:"の", r:"no", memo:"No como aro.", ex:"の no = posesion", strokes:["circulo en un solo trazo"]},
  {h:"は", r:"ha", memo:"Ha se lee wa como particula.", ex:"わたし は watashi wa", strokes:["vertical izquierdo","horizontal","vertical con lazo"]},
  {h:"ひ", r:"hi", memo:"Hi como una U ancha.", ex:"ひと hito = persona", strokes:["trazo unico en U"]},
  {h:"ふ", r:"fu", memo:"Fu como soplar.", ex:"ふじさん fujisan", strokes:["punto superior","curva central","punto izquierdo","punto derecho"]},
  {h:"へ", r:"he", memo:"He como montana.", ex:"へや heya = cuarto", strokes:["montana en un trazo"]},
  {h:"ほ", r:"ho", memo:"Ho parece ha con extra.", ex:"ほん hon = libro", strokes:["vertical izquierdo","horizontal superior","horizontal inferior","vertical con lazo"]},
  {h:"ま", r:"ma", memo:"Ma de mapa con lazo.", ex:"まいにち mainichi", strokes:["horizontal superior","horizontal inferior","vertical con bucle"]},
  {h:"み", r:"mi", memo:"Mi de mirada curva.", ex:"みず mizu = agua", strokes:["trazo con lazo izquierdo","vertical que cruza"]},
  {h:"む", r:"mu", memo:"Mu de mundo con punto.", ex:"むし mushi = insecto", strokes:["horizontal","vertical con bucle","punto"]},
  {h:"め", r:"me", memo:"Me como malla.", ex:"め me = ojo", strokes:["diagonal","curva ovalada"]},
  {h:"も", r:"mo", memo:"Mo con dos rayas.", ex:"も mo = tambien", strokes:["gancho central","horizontal superior","horizontal inferior"]},
  {h:"や", r:"ya", memo:"Ya de yate.", ex:"やすみ yasumi = descanso", strokes:["curva grande","linea pequena","diagonal larga"]},
  {h:"ゆ", r:"yu", memo:"Yu como yugo.", ex:"ゆき yuki = nieve", strokes:["panza redonda","vertical largo"]},
  {h:"よ", r:"yo", memo:"Yo con bucle.", ex:"よろしく yoroshiku", strokes:["horizontal corto","vertical con bucle"]},
  {h:"ら", r:"ra", memo:"Ra como un 5.", ex:"らいねん rainen", strokes:["punto arriba","curva tipo 5"]},
  {h:"り", r:"ri", memo:"Ri son dos rios.", ex:"りんご ringo = manzana", strokes:["trazo izquierdo","trazo derecho largo"]},
  {h:"る", r:"ru", memo:"Ru con lazo final.", ex:"くるま kuruma = carro", strokes:["zigzag y lazo en un trazo"]},
  {h:"れ", r:"re", memo:"Re como resorte abierto.", ex:"れい rei", strokes:["vertical","zigzag que sale a derecha"]},
  {h:"ろ", r:"ro", memo:"Ro como ru sin lazo.", ex:"ろく roku = seis", strokes:["zigzag sin lazo"]},
  {h:"わ", r:"wa", memo:"Wa de watashi.", ex:"わたし watashi = yo", strokes:["vertical","zigzag con arco"]},
  {h:"を", r:"wo", memo:"Wo se pronuncia o.", ex:"を wo = particula", strokes:["horizontal","diagonal quebrada","semicirculo inferior"]},
  {h:"ん", r:"n", memo:"N va sola.", ex:"にほん nihon = Japon", strokes:["trazo unico ondulado"]}
];

const kata = [
  ["a", "あ", "ア", "アメリカ Amerika"],
  ["i", "い", "イ", "インド Indo"],
  ["u", "う", "ウ", "ドイツ Doitsu"],
  ["e", "え", "エ", "エンジニア enjinia"],
  ["o", "お", "オ", "オーストラリア Oosutoraria"],
  ["ka", "か", "カ", "カルロス Karurosu"],
  ["ki", "き", "キ", "キロ kiro"],
  ["ku", "く", "ク", "クラス kurasu"],
  ["ke", "け", "ケ", "ケーキ keeki"],
  ["ko", "こ", "コ", "コンピューター konpyuutaa"]
];

const quizItems = [
  {q:"Sales de casa. Que dices?", a:"ittekimasu", options:["ittekimasu", "tadaima", "okaeri nasai"]},
  {q:"Llegas a casa. Que dices?", a:"tadaima", options:["tadaima", "itterasshai", "ohayou"]},
  {q:"Antes de comer. Que dices?", a:"itadakimasu", options:["gochisousama", "itadakimasu", "konbanwa"]},
  {q:"Quieres decir disculpe. Que dices?", a:"sumimasen", options:["sumimasen", "peruujin", "watashi"]}
];

const romajiMap = [
  ["konnichiwa", "こんにちは"], ["konbanwa", "こんばんは"], ["hajimemashite", "はじめまして"],
  ["watashi", "わたし"], ["peruujin", "ペルーじん"], ["nihonjin", "にほんじん"],
  ["douzo", "どうぞ"], ["yoroshiku", "よろしく"], ["onegaishimasu", "おねがいします"],
  ["ohayou", "おはよう"], ["gozaimasu", "ございます"], ["arigatou", "ありがとう"],
  ["sumimasen", "すみません"], ["desu", "です"], ["wa", "は"], ["ha", "は"],
  ["Carlos", "カルロス"], ["carlos", "カルロス"], ["Higa", "ひが"], ["higa", "ひが"],
  ["Peruu", "ペルー"], ["peruu", "ペルー"], ["jin", "じん"], ["go", "ご"],
  ["a", "あ"], ["i", "い"], ["u", "う"], ["e", "え"], ["o", "お"],
  ["ka", "か"], ["ki", "き"], ["ku", "く"], ["ke", "け"], ["ko", "こ"],
  ["sa", "さ"], ["shi", "し"], ["su", "す"], ["se", "せ"], ["so", "そ"]
];

/* ── SVG Stroke guides — paths para cada hiragana ── */
const STROKE_SVG = {
  "あ": {
    strokes: [
      {d:"M18,40 Q50,37 82,40", color:"#00f5d4"},
      {d:"M50,12 L50,75", color:"#ffd166"},
      {d:"M38,55 Q15,68 18,80 Q22,90 50,85 Q75,80 82,65 Q85,50 70,45", color:"#ff4fd8"}
    ]
  },
  "い": {
    strokes: [
      {d:"M30,25 Q28,55 35,75", color:"#00f5d4"},
      {d:"M65,20 Q63,50 55,70", color:"#ffd166"}
    ]
  },
  "う": {
    strokes: [
      {d:"M45,15 L55,20", color:"#00f5d4"},
      {d:"M25,35 Q50,30 75,40 Q75,70 50,80 Q30,75 28,60", color:"#ffd166"}
    ]
  },
  "え": {
    strokes: [
      {d:"M40,20 L60,20", color:"#00f5d4"},
      {d:"M20,45 Q50,40 80,45 Q65,60 50,75 Q35,85 60,90", color:"#ffd166"}
    ]
  },
  "お": {
    strokes: [
      {d:"M35,20 L65,20", color:"#00f5d4"},
      {d:"M50,15 L50,80", color:"#ffd166"},
      {d:"M20,50 Q35,45 50,50 Q70,60 75,45", color:"#ff4fd8"}
    ]
  },
  "か": {
    strokes: [
      {d:"M30,20 Q28,50 35,80", color:"#00f5d4"},
      {d:"M25,45 L75,35", color:"#ffd166"},
      {d:"M65,30 Q80,55 65,75 Q55,85 50,80", color:"#ff4fd8"}
    ]
  },
  "き": {
    strokes: [
      {d:"M20,28 L80,28", color:"#00f5d4"},
      {d:"M20,50 L80,50", color:"#ffd166"},
      {d:"M50,15 Q48,55 55,70", color:"#ff4fd8"},
      {d:"M30,65 Q50,80 75,70", color:"#5d8cff"}
    ]
  },
  "く": {
    strokes: [{d:"M70,20 Q35,50 70,80", color:"#00f5d4"}]
  },
  "け": {
    strokes: [
      {d:"M30,15 L30,85", color:"#00f5d4"},
      {d:"M30,35 L70,30", color:"#ffd166"},
      {d:"M70,30 L70,80", color:"#ff4fd8"}
    ]
  },
  "こ": {
    strokes: [
      {d:"M20,35 Q50,30 80,38", color:"#00f5d4"},
      {d:"M20,65 Q50,60 80,68", color:"#ffd166"}
    ]
  },
  "さ": {
    strokes: [
      {d:"M20,30 L80,30", color:"#00f5d4"},
      {d:"M50,15 Q48,50 40,65 Q30,80 50,82 Q70,80 72,65", color:"#ffd166"}
    ]
  },
  "し": {
    strokes: [{d:"M50,15 L50,70 Q50,85 65,82", color:"#00f5d4"}]
  },
  "す": {
    strokes: [
      {d:"M20,30 L80,30", color:"#00f5d4"},
      {d:"M50,15 L50,55 Q50,75 65,70 Q75,60 60,55", color:"#ffd166"}
    ]
  },
  "せ": {
    strokes: [
      {d:"M50,20 L50,80", color:"#00f5d4"},
      {d:"M20,45 L80,45", color:"#ffd166"},
      {d:"M70,20 L70,75", color:"#ff4fd8"}
    ]
  },
  "そ": {
    strokes: [{d:"M20,25 Q50,20 80,30 Q60,45 50,50 Q40,60 50,75 Q60,85 75,80", color:"#00f5d4"}]
  },
  "た": {
    strokes: [
      {d:"M20,35 L80,35", color:"#00f5d4"},
      {d:"M50,15 Q48,50 45,70", color:"#ffd166"},
      {d:"M60,25 L80,25", color:"#ff4fd8"},
      {d:"M60,50 L80,50", color:"#5d8cff"}
    ]
  },
  "ち": {
    strokes: [
      {d:"M25,30 L75,28", color:"#00f5d4"},
      {d:"M55,18 Q53,45 50,60 Q45,80 30,82 Q20,78 25,65", color:"#ffd166"}
    ]
  },
  "つ": {
    strokes: [{d:"M20,30 Q60,20 80,40 Q85,70 60,82 Q40,85 30,75", color:"#00f5d4"}]
  },
  "て": {
    strokes: [{d:"M15,40 Q50,35 85,42 Q70,60 55,75", color:"#00f5d4"}]
  },
  "と": {
    strokes: [
      {d:"M50,15 Q48,40 45,55", color:"#00f5d4"},
      {d:"M35,50 Q60,45 75,55 Q80,75 55,80", color:"#ffd166"}
    ]
  },
  "な": {
    strokes: [
      {d:"M25,30 L75,28", color:"#00f5d4"},
      {d:"M50,15 Q48,45 45,65", color:"#ffd166"},
      {d:"M70,20", color:"#ff4fd8"},
      {d:"M30,65 Q50,80 55,70 Q60,55 50,50 Q35,48 38,65 Q40,80 55,82", color:"#5d8cff"}
    ]
  },
  "に": {
    strokes: [
      {d:"M30,15 L30,85", color:"#00f5d4"},
      {d:"M30,35 L70,32", color:"#ffd166"},
      {d:"M30,60 L70,58", color:"#ff4fd8"}
    ]
  },
  "ぬ": {
    strokes: [
      {d:"M35,20 Q33,55 30,75", color:"#00f5d4"},
      {d:"M55,18 Q53,45 50,60 Q40,80 30,78 Q55,82 70,65 Q80,50 65,45 Q55,42 58,60", color:"#ffd166"}
    ]
  },
  "ね": {
    strokes: [
      {d:"M35,15 L35,80", color:"#00f5d4"},
      {d:"M55,18 Q75,25 70,45 Q65,65 50,72 Q35,75 38,60 Q42,48 58,50 Q72,55 68,70 Q60,82 70,85", color:"#ffd166"}
    ]
  },
  "の": {
    strokes: [{d:"M60,20 Q80,35 75,55 Q70,75 50,80 Q25,80 20,60 Q18,40 35,25 Q55,15 65,25", color:"#00f5d4"}]
  },
  "は": {
    strokes: [
      {d:"M30,15 L30,85", color:"#00f5d4"},
      {d:"M30,40 L70,38", color:"#ffd166"},
      {d:"M70,35 L70,65 Q68,80 55,80 Q45,78 48,68 Q52,55 65,58", color:"#ff4fd8"}
    ]
  },
  "ひ": {
    strokes: [{d:"M20,40 Q50,20 80,40 Q85,65 65,75 Q50,80 35,72 Q20,60 22,45", color:"#00f5d4"}]
  },
  "ふ": {
    strokes: [
      {d:"M45,15 L55,20", color:"#00f5d4"},
      {d:"M25,40 Q50,30 75,42 Q70,60 55,68", color:"#ffd166"},
      {d:"M30,65", color:"#ff4fd8"},
      {d:"M65,65", color:"#5d8cff"}
    ]
  },
  "へ": {
    strokes: [{d:"M15,60 Q50,20 85,60", color:"#00f5d4"}]
  },
  "ほ": {
    strokes: [
      {d:"M30,15 L30,85", color:"#00f5d4"},
      {d:"M30,40 L70,38", color:"#ffd166"},
      {d:"M30,65 L70,63", color:"#ff4fd8"},
      {d:"M70,35 L70,65 Q68,80 55,80 Q45,78 48,68", color:"#5d8cff"}
    ]
  },
  "ま": {
    strokes: [
      {d:"M20,35 L80,33", color:"#00f5d4"},
      {d:"M20,55 L80,53", color:"#ffd166"},
      {d:"M50,20 L50,55 Q48,75 35,80 Q55,85 70,75 Q80,65 70,55", color:"#ff4fd8"}
    ]
  },
  "み": {
    strokes: [
      {d:"M25,30 Q22,55 30,70 Q38,80 35,65 Q32,50 42,48", color:"#00f5d4"},
      {d:"M60,20 L60,55 Q58,70 45,75", color:"#ffd166"}
    ]
  },
  "む": {
    strokes: [
      {d:"M20,40 L80,38", color:"#00f5d4"},
      {d:"M50,20 L50,50 Q48,72 35,78 Q50,82 65,72 Q78,60 68,48 Q58,38 55,55", color:"#ffd166"},
      {d:"M72,30", color:"#ff4fd8"}
    ]
  },
  "め": {
    strokes: [
      {d:"M35,25 Q20,50 30,70 Q40,82 55,75", color:"#00f5d4"},
      {d:"M65,20 Q80,38 70,55 Q55,72 40,65 Q30,55 40,48 Q52,42 65,52 Q75,65 65,75", color:"#ffd166"}
    ]
  },
  "も": {
    strokes: [
      {d:"M35,30 Q55,25 65,35 Q65,50 35,50", color:"#00f5d4"},
      {d:"M20,55 L80,53", color:"#ffd166"},
      {d:"M20,70 L80,68", color:"#ff4fd8"}
    ]
  },
  "や": {
    strokes: [
      {d:"M25,35 Q22,60 30,78", color:"#00f5d4"},
      {d:"M55,18", color:"#ffd166"},
      {d:"M35,50 Q55,40 80,55 Q80,78 60,82", color:"#ff4fd8"}
    ]
  },
  "ゆ": {
    strokes: [
      {d:"M20,35 Q18,60 30,75 Q42,85 40,70 Q38,55 55,50", color:"#00f5d4"},
      {d:"M70,20 L70,82", color:"#ffd166"}
    ]
  },
  "よ": {
    strokes: [
      {d:"M55,25 L80,23", color:"#00f5d4"},
      {d:"M55,20 L55,55 Q53,75 40,80 Q55,82 75,72 Q82,60 72,50", color:"#ffd166"}
    ]
  },
  "ら": {
    strokes: [
      {d:"M45,15 L55,22", color:"#00f5d4"},
      {d:"M25,38 Q60,32 75,42 Q78,65 55,75 Q35,80 30,65", color:"#ffd166"}
    ]
  },
  "り": {
    strokes: [
      {d:"M30,20 Q28,55 35,72", color:"#00f5d4"},
      {d:"M65,20 Q63,50 55,68 Q45,80 35,78", color:"#ffd166"}
    ]
  },
  "る": {
    strokes: [{d:"M30,25 Q55,18 75,30 Q80,48 65,58 Q50,65 45,55 Q42,45 55,42 Q68,42 70,55 Q68,72 55,78", color:"#00f5d4"}]
  },
  "れ": {
    strokes: [
      {d:"M30,15 L30,82", color:"#00f5d4"},
      {d:"M55,20 Q75,28 70,50 Q65,68 50,75 Q38,78 40,65 Q55,60 72,70 Q80,82 72,88", color:"#ffd166"}
    ]
  },
  "ろ": {
    strokes: [{d:"M25,30 Q55,22 78,32 Q80,52 60,62 Q42,68 35,55", color:"#00f5d4"}]
  },
  "わ": {
    strokes: [
      {d:"M35,15 L35,82", color:"#00f5d4"},
      {d:"M55,18 Q75,28 70,50 Q60,72 45,78", color:"#ffd166"}
    ]
  },
  "を": {
    strokes: [
      {d:"M25,28 L75,26", color:"#00f5d4"},
      {d:"M55,18 Q35,35 25,45 Q55,38 80,48", color:"#ffd166"},
      {d:"M50,48 Q48,72 40,80", color:"#ff4fd8"}
    ]
  },
  "ん": {
    strokes: [{d:"M35,25 Q33,50 40,65 Q52,80 68,72 Q78,60 65,50", color:"#00f5d4"}]
  }
};
