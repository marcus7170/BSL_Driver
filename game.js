// ===================================
// INICIALIZAÇÃO E ELEMENTOS DO DOM
// ===================================
let audioInitialized = false;
let audioPlayer, volumeUpButton, volumeDownButton, muteButton, skipTrackButton;
const musicTracks = ['music1.mp3', 'music2.mp3', 'music3.mp3', 'music4.mp3', 'music5.mp3'];
let currentTrackIndex = Math.floor(Math.random() * musicTracks.length);
let isModalActive = false; // NOVO: Sinalizador para controlar eventos na tela

document.addEventListener('DOMContentLoaded', () => {
    audioPlayer = document.getElementById('background-music');
    volumeUpButton = document.getElementById('volume-up-button');
    volumeDownButton = document.getElementById('volume-down-button');
    muteButton = document.getElementById('mute-button');
    skipTrackButton = document.getElementById('skip-track-button');

    volumeUpButton.addEventListener('click', increaseVolume);
    volumeDownButton.addEventListener('click', decreaseVolume);
    muteButton.addEventListener('click', toggleMute);
    skipTrackButton.addEventListener('click', skipTrack);
    audioPlayer.addEventListener('ended', skipTrack);

    initializeNewSeason();
});


// ===================================
// ESTADO DO JOGO E DADOS GLOBAIS
// ===================================
let player = {
    name: "Você",
    age: 17.0,
    team: "BSL Team",
    category: "Fórmula 3",
    skill: 65,
    reputation: 40,
    form: 100,
    morale: 100,
    driverValue: 5000000,
    balance: 10000,
    salary: 5000,
    career: { wins: 0, podiums: 0, poles: 0, championships: 0, f1Championships: 0, points: 0 },
    titles: [],
    history: [],
    milestones: [],
    possessions: []
};

let world = {
    season: 2025,
    currentRaceIndex: 0,
    calendars: {
        "Fórmula 3": ["Bahrein", "Melbourne", "Ímola", "Mônaco", "Barcelona", "Spielberg", "Silverstone", "Hungaroring", "Spa", "Monza"],
        "Fórmula 2": ["Bahrein", "Jeddah", "Melbourne", "Baku", "Ímola", "Mônaco", "Barcelona", "Spielberg", "Silverstone", "Hungaroring", "Spa", "Zandvoort", "Monza", "Yas Marina"],
        "Fórmula 1": ["Bahrein", "Jeddah", "Melbourne", "Suzuka", "Xangai", "Miami", "Ímola", "Mônaco", "Montreal", "Barcelona", "Spielberg", "Silverstone", "Hungaroring", "Spa", "Zandvoort", "Monza", "Baku", "Singapura", "Austin", "México", "São Paulo", "Las Vegas", "Qatar", "Yas Marina"]
    },
    teams: {
        "Fórmula 3": [ { name: "Prema Racing", performance: 95 }, { name: "Trident", performance: 90 }, { name: "ART Grand Prix", performance: 88 }, { name: "MP Motorsport", performance: 85 }, { name: "Campos Racing", performance: 82 }, { name: "Hitech Pulse-Eight", performance: 80 }, { name: "Van Amersfoort Racing", performance: 78 }, { name: "Rodin Motorsport", performance: 76 } ],
        "Fórmula 2": [ { name: "Invicta Racing", performance: 92 }, { name: "Campos Racing", performance: 85 }, { name: "MP Motorsport", performance: 88 }, { name: "DAMS Lucas Oil", performance: 84 }, { name: "Hitech Pulse-Eight", performance: 86 }, { name: "ART Grand Prix", performance: 90 } ],
        "Fórmula 1": [ { name: "Red Bull Racing", performance: 98 }, { name: "Ferrari", performance: 96 }, { name: "McLaren", performance: 94 }, { name: "Mercedes", performance: 92 }, { name: "Aston Martin", performance: 88 }, { name: "Alpine", performance: 82 }, { name: "Williams", performance: 78 }, { name: "Sauber", performance: 76 }, { name: "RB F1 Team", performance: 80 }, { name: "Haas F1 Team", performance: 75 } ]
    },
    drivers: {
        "Fórmula 3": [ { name: "L. Browning", skill: 72 }, { name: "D. Beganovic", skill: 71 }, { name: "G. Minì", skill: 70 }, { name: "A. Lindblad", skill: 69 }, { name: "O. Goethe", skill: 68 }, { name: "T. Tramnitz", skill: 67 }, { name: "L. Fornaroli", skill: 66 }, { name: "C. Mansell", skill: 65 }, { name: "M. Boya", skill: 64 }, { name: "S. Meguetounif", skill: 63 }, { name: "N. Tsolov", skill: 62 }, { name: "L. Van Hoepen", skill: 61 }, { name: "C. Wurz", skill: 60 }, { name: "M. Stenshorne", skill: 59 }, { name: "A. Dunne", skill: 58 }, { name: "S. Floersch", skill: 57 }, { name: "J. Dufek", skill: 56 }, { name: "T. Inthraphuvasak", skill: 55 }, { name: "P. Wisnicki", skill: 54 } ],
        "Fórmula 2": [ { name: "P. Aron", skill: 78 }, { name: "I. Hadjar", skill: 77 }, { name: "Z. Maloney", skill: 76 }, { name: "D. Hauger", skill: 75 }, { name: "G. Bortoleto", skill: 79 }, { name: "A. Antonelli", skill: 80 }, { name: "O. Bearman", skill: 79 }, { name: "J. Crawford", skill: 74 }, { name: "R. Stanek", skill: 73 }, { name: "Z. O'Sullivan", skill: 72 }, { name: "V. Martins", skill: 78 }, { name: "E. Fittipaldi", skill: 76 }, { name: "K. Maini", skill: 75 }, { name: "J. Marti", skill: 74 }, { name: "R. Villagomez", skill: 71 }, { name: "A. Cordeel", skill: 70 }, { name: "F. Colapinto", skill: 77 }, { name: "J. Duerksen", skill: 69 }, { name: "T. Barnard", skill: 68 } ],
        "Fórmula 1": [ { name: "M. Verstappen", skill: 99 }, { name: "L. Norris", skill: 96 }, { name: "C. Leclerc", skill: 95 }, { name: "O. Piastri", skill: 93 }, { name: "C. Sainz", skill: 92 }, { name: "L. Hamilton", skill: 94 }, { name: "G. Russell", skill: 91 }, { name: "F. Alonso", skill: 90 }, { name: "S. Perez", skill: 88 }, { name: "Y. Tsunoda", skill: 86 }, { name: "A. Albon", skill: 85 }, { name: "P. Gasly", skill: 84 }, { name: "E. Ocon", skill: 83 }, { name: "D. Ricciardo", skill: 82 }, { name: "N. Hulkenberg", skill: 81 }, { name: "V. Bottas", skill: 80 }, { name: "K. Magnussen", skill: 79 }, { name: "L. Stroll", skill: 78 }, { name: "G. Zhou", skill: 77 } ]
    },
    currentGrid: []
};

const shopItems = [
    { id: 'sim_upgrade', name: 'Upgrade de Simulador', description: 'Melhora permanente no simulador da sua casa. (+2 Skill)', price: 150000, type: 'unique', effect: { skill: 2 } },
    { id: 'personal_coach', name: 'Coach de Pilotagem', description: 'Contrate um coach renomado para uma temporada. (+5 Skill)', price: 500000, type: 'unique', effect: { skill: 5 } },
    { id: 'nutritionist', name: 'Nutricionista de Elite', description: 'Plano de dieta e físico para a temporada. (+10 Forma)', price: 75000, type: 'consumable', effect: { form: 10 } },
    { id: 'pr_agent', name: 'Agente de Relações Públicas', description: 'Contrate um agente para melhorar sua imagem. (+10 Reputação)', price: 100000, type: 'unique', effect: { reputation: 10 } },
    { id: 'luxury_watch', name: 'Relógio de Luxo', description: 'Um belo item para aumentar o ânimo. (+5 Moral)', price: 30000, type: 'repeatable', effect: { morale: 5 } },
    { id: 'short_vacation', name: 'Férias Curtas', description: 'Uma viagem rápida para Mônaco para recarregar as baterias. (+15 Moral)', price: 45000, type: 'repeatable', effect: { morale: 15 } },
    { id: 'sports_car', name: 'Carro Esportivo', description: 'Uma máquina veloz para sua garagem. (Item de prestígio, +2 Reputação)', price: 250000, type: 'unique', effect: { reputation: 2 } },
    { id: 'apartment_monaco', name: 'Apartamento em Mônaco', description: 'Uma propriedade de luxo no coração do automobilismo. (+10 Reputação)', price: 2000000, type: 'unique', effect: { reputation: 10 } },
    { id: 'art_helmet', name: 'Capacete Customizado', description: 'Um capacete exclusivo, pintado por um artista famoso. (+5 Reputação, +5 Moral)', price: 500000, type: 'unique', effect: { reputation: 5, morale: 5 } },
    { id: 'hypercar', name: 'Hipercarro de Colecionador', description: 'Uma joia rara da engenharia automotiva, para poucos. (+15 Reputação)', price: 3500000, type: 'unique', effect: { reputation: 15 } },
    { id: 'junior_team_investment', name: 'Investir em Equipe Junior', description: 'Seja dono de parte de uma equipe de base, moldando o futuro do esporte. (+25 Reputação)', price: 7000000, type: 'unique', effect: { reputation: 25 } },
    { id: 'legendary_engineer', name: 'Consultor Lendário', description: 'Contrate um engenheiro campeão aposentado como seu consultor pessoal. (+10 Skill)', price: 10000000, type: 'unique', effect: { skill: 10 } },
    { id: 'private_jet', name: 'Jato Particular', description: 'Viaje para as corridas com máximo conforto e privacidade. (+20 Reputação, +5 Forma permanente)', price: 15000000, type: 'unique', effect: { reputation: 20, form: 5 } },
    { id: 'yacht_monaco', name: 'Iate de Luxo em Mônaco', description: 'O maior símbolo de status no paddock. Ancore seu iate no porto durante o GP. (+30 Reputação)', price: 25000000, type: 'unique', effect: { reputation: 30 } },
];
const randomEvents = [
    { title: "Sessão de Simulador", text: "A equipe agendou um dia inteiro de treinos no novo simulador.", choices: [ { text: "Focar em voltas rápidas (+2 Skill, -5 Forma)", action: () => { player.skill = Math.min(100, player.skill + 2); player.form -= 5; } }, { text: "Trabalhar no acerto do carro (+1 Skill, +5 Moral)", action: () => { player.skill = Math.min(100, player.skill + 1); player.morale += 5; } } ] },
    { title: "Análise de Telemetria", text: "Seu engenheiro quer analisar dados da última corrida com você.", choices: [ { text: "Estudar cada detalhe (+2 Skill)", action: () => { player.skill = Math.min(100, player.skill + 2); } }, { text: "Confiar no resumo dele (+5 Moral)", action: () => { player.morale += 5; } } ] },
    { title: "Workshop de Pilotagem", text: "Um piloto lendário está oferecendo um workshop. Custa €20.000.", choices: [ { text: "Pagar e participar (+4 Skill)", action: () => { if(player.balance >= 20000){ player.balance -= 20000; player.skill = Math.min(100, player.skill + 4);} else { addHistory("Dinheiro insuficiente para o workshop.")} } }, { text: "Economizar o dinheiro", action: () => {} } ] },
    { title: "Patrocínio Pessoal!", text: "Uma marca de relógios de luxo quer te patrocinar.", choices: [ { text: "Aceitar (+€50.000)", action: () => { player.balance += 50000; player.reputation += 2; } }, { text: "Recusar para focar na pilotagem (+5 Moral)", action: () => { player.morale += 5; } } ] },
    { title: "Rival na Pista", text: "Você e seu rival se tocaram na pista. A imprensa quer uma declaração.", choices: [ { text: "Assumir a culpa (-5 Reputação, +10 Moral)", action: () => { player.reputation -= 5; player.morale += 10; } }, { text: "Culpar o rival (+5 Reputação, -10 Moral)", action: () => { player.reputation += 5; player.morale -= 10; } } ] },
    { title: "Elogio do Chefe de Equipe", text: "Seu chefe de equipe elogiou publicamente sua dedicação.", choices: [ { text: "Agradecer humildemente (+10 Moral)", action: () => { player.morale += 10; } }, { text: "Dizer que é só o começo (+5 Reputação)", action: () => { player.reputation += 5; } } ] },
    { title: "Problema no Pit Stop", text: "Sua equipe cometeu um erro grave no último pit stop que custou posições.", choices: [ { text: "Defender a equipe publicamente (+15 Moral)", action: () => { player.morale += 15; } }, { text: "Criticar o erro internamente (-10 Moral, +1 Skill)", action: () => { player.morale -= 10; player.skill = Math.min(100, player.skill + 1); } } ] },
    { title: "Documentário da Netflix", text: "A equipe da Netflix quer gravar um episódio focado em você.", choices: [ { text: "Aceitar e ganhar exposição (+10 Reputação, -5 Moral)", action: () => { player.reputation += 10; player.morale -= 5; addHistory("Gravou para a Netflix."); } }, { text: "Recusar para evitar distrações (-5 Reputação, +5 Forma)", action: () => { player.reputation -= 5; player.form += 5; addHistory("Recusou a Netflix para manter o foco."); } } ] },
    { title: "Novo Componente Aerodinâmico", text: "Os engenheiros desenvolveram uma nova asa dianteira. Quer testá-la no treino?", choices: [ { text: "Sim, vamos arriscar! (+2 Skill, Risco de -5 Moral)", action: () => { player.skill = Math.min(100, player.skill + 2); if(Math.random() < 0.3) { player.morale -=5; addHistory("Nova asa era instável."); } else { addHistory("Teste da nova asa foi um sucesso."); } } }, { text: "Não, vamos com o pacote conhecido. (+5 Forma)", action: () => { player.form += 5; addHistory("Optou por não testar a nova peça."); } } ] },
    { title: "Viagem Exaustiva", text: "O voo para a Austrália foi longo e com muitas turbulências.", choices: [ { text: "Fazer uma sessão de recuperação extra (-€5.000, +5 Forma)", action: () => { player.balance -= 5000; player.form += 5; addHistory("Pagou por uma sessão de crio-terapia."); } }, { text: "Apenas descansar (-5 Forma)", action: () => { player.form -= 5; addHistory("Sentiu o cansaço da viagem longa."); } } ] },
    { title: "Entrevista Polêmica", text: "Um jornalista pergunta se você se sente subvalorizado pela sua equipe.", choices: [ { text: "Elogiar a equipe e desconversar (+10 Moral)", action: () => { player.morale += 10; addHistory("Saiu de uma saia justa na imprensa."); } }, { text: "Deixar a dúvida no ar (-10 Moral, +5 Reputação)", action: () => { player.morale -= 10; player.reputation += 5; addHistory("Causou polêmica em uma entrevista."); } } ] },
    { title: "Dieta Rigorosa", text: "O nutricionista da equipe propõe uma dieta extremamente restritiva.", choices: [ { text: "Seguir à risca (+10 Forma, -10 Moral)", action: () => { player.form = Math.min(100, player.form + 10); player.morale -= 10; addHistory("Iniciou uma dieta rigorosa."); } }, { text: "“Esquecer” dela no fim de semana (-5 Forma, +5 Moral)", action: () => { player.form -= 5; player.morale += 5; addHistory("Deu uma escapada na dieta."); } } ] },
    { title: "Investimento de Risco", text: "Um amigo sugere investir em uma criptomoeda desconhecida.", choices: [ { text: "Investir €25.000", action: () => { player.balance -= 25000; if(Math.random() < 0.2) { player.balance += 100000; addHistory("Investimento arriscado deu muito certo!");} else { addHistory("Perdeu dinheiro em um mau investimento."); }} }, { text: "Não, muito arriscado.", action: () => { addHistory("Decidiu não arriscar seu dinheiro."); } } ] },
    { title: "Briga com Engenheiro", text: "Você e seu engenheiro de corrida discordam sobre a estratégia.", choices: [ { text: "Impor sua vontade (-5 Moral, +1 Skill)", action: () => { player.morale -= 5; player.skill = Math.min(100, player.skill + 1); addHistory("Bateu o pé e impôs sua estratégia."); } }, { text: "Confiar na experiência dele (+5 Moral)", action: () => { player.morale += 5; addHistory("Confiou na decisão do seu engenheiro."); } } ] },
    { title: "Problema Elétrico Misterioso", text: "O carro está com uma falha elétrica intermitente.", choices: [ { text: "Autorizar troca completa do sistema (-€50.000)", action: () => { player.balance -= 50000; player.morale += 10; addHistory("Gastou para resolver um problema elétrico.");} }, { text: "Rezar para não acontecer na corrida (-10 Moral)", action: () => { player.morale -= 10; addHistory("Está correndo com um carro pouco confiável."); } } ] },
    { title: "Férias com a Família", text: "Sua família quer tirar uma semana de férias durante a pausa de verão.", choices: [ { text: "Ir e relaxar completamente (+15 Moral, +10 Forma, -1 Skill)", action: () => { player.morale += 15; player.form = Math.min(100, player.form + 10); player.skill -=1; addHistory("Tirou férias e voltou renovado."); } }, { text: "Ficar e continuar treinando (-10 Moral, +2 Skill)", action: () => { player.morale -= 10; player.skill = Math.min(100, player.skill + 2); addHistory("Sacrificou as férias para treinar."); } } ] },
    { title: "Convidado para Podcast", text: "Um podcast famoso de automobilismo te convidou para uma entrevista.", choices: [ { text: "Participar e contar sua história (+7 Reputação)", action: () => { player.reputation += 7; addHistory("Participou de um podcast famoso."); } }, { text: "Recusar, agenda cheia", action: () => { addHistory("Recusou um convite para podcast."); } } ] },
    { title: "Treinador Mental", text: "A equipe sugere sessões com um psicólogo esportivo.", choices: [ { text: "Aceitar as sessões (+10 Forma, +5 Moral)", action: () => { player.form = Math.min(100, player.form + 10); player.morale += 5; addHistory("Começou a trabalhar com um treinador mental."); } }, { text: "Dispensar, 'não preciso disso'", action: () => { addHistory("Acha que a mente já está forte o suficiente."); } } ] },
    { title: "Evento de Caridade", text: "Você foi convidado para um jogo de futebol beneficente.", choices: [ { text: "Jogar e se divertir (+10 Reputação, -5 Forma)", action: () => { player.reputation += 10; player.form -= 5; addHistory("Participou de um evento de caridade."); } }, { text: "Apenas doar €10.000 e não ir", action: () => { player.balance -= 10000; player.reputation += 5; addHistory("Fez uma doação generosa para a caridade."); } } ] },
    { title: "Regras da FIA", text: "Uma nova diretiva técnica da FIA força a equipe a remover uma peça.", choices: [ { text: "Trabalhar com a equipe para se adaptar (+1 Skill)", action: () => { player.skill = Math.min(100, player.skill + 1); addHistory("Ajudou a equipe a se adaptar a novas regras."); } }, { text: "Reclamar da FIA para a imprensa (-5 Reputação)", action: () => { player.reputation -= 5; addHistory("Criticou a FIA publicamente."); } } ] },
    { title: "Pedido dos Fãs", text: "Um grande fã-clube seu organizou um encontro e pediu sua presença.", choices: [ { text: "Comparecer e tirar fotos (+15 Moral)", action: () => { player.morale += 15; addHistory("Passou um tempo com seus maiores fãs."); } }, { text: "Enviar um vídeo de agradecimento (+5 Moral)", action: () => { player.morale += 5; addHistory("Mandou uma mensagem em vídeo para os fãs."); } } ] },
    { title: "Inspiração em Lendas", text: "Você passou a noite assistindo corridas antigas de Ayrton Senna.", choices: [ { text: "Sentir-se inspirado (+10 Moral, +1 Skill)", action: () => { player.morale += 10; player.skill = Math.min(100, player.skill + 1); addHistory("Buscou inspiração nos grandes do passado."); } } ] },
    { title: "Acidente Doméstico Bobo", text: "Você escorregou e torceu o pulso. Nada grave, mas incomoda.", choices: [ { text: "Fazer fisioterapia intensiva (-€2.000, -2 Forma)", action: () => { player.balance -= 2000; player.form -= 2; addHistory("Tratou uma pequena lesão doméstica."); } }, { text: "Deixar sarar com o tempo (-5 Forma)", action: () => { player.form -= 5; addHistory("Está pilotando com um pequeno incômodo."); } } ] },
    { title: "Jantar com o Chefe", text: "O chefe da equipe te convidou para um jantar para discutir o futuro.", choices: [ { text: "Ir e mostrar ambição (+5 Reputação, +5 Moral)", action: () => { player.reputation += 5; player.morale += 5; addHistory("Teve um jantar produtivo com o chefe."); } }, { text: "Desmarcar por estar cansado (-5 Reputação)", action: () => { player.reputation -= 5; addHistory("Cancelou um jantar importante."); } } ] },
    { title: "Novo Hobby", text: "Você decide começar um novo hobby para relaxar a mente.", choices: [ { text: "Aprender a tocar guitarra (+10 Moral, -2 Forma)", action: () => { player.morale += 10; player.form -= 2; addHistory("A música é sua nova válvula de escape."); } }, { text: "Começar a correr maratonas (+10 Forma, -5 Moral)", action: () => { player.form = Math.min(100, player.form + 10); player.morale -= 5; addHistory("Está treinando para maratonas nas horas vagas."); } } ] },
    { title: "Reclamação de Vizinhos", text: "Seus vizinhos estão reclamando do barulho do seu simulador em casa.", choices: [ { text: "Pagar por isolamento acústico (-€15.000)", action: () => { player.balance -= 15000; addHistory("Teve que gastar com isolamento acústico."); } }, { text: "Ignorar e treinar mais baixo (-1 Skill)", action: () => { player.skill -= 1; addHistory("Diminuiu o ritmo dos treinos em casa."); } } ] },
    { title: "Dia de Marketing", text: "Um patrocinador exige um dia inteiro de gravações e fotos.", choices: [ { text: "Cumprir o contrato (-10 Forma, +€20.000)", action: () => { player.form -= 10; player.balance += 20000; addHistory("Passou um dia cansativo com patrocinadores."); } }, { text: "Pagar multa para não ir (-€10.000, +5 Forma)", action: () => { player.balance -= 10000; player.form += 5; addHistory("Pagou para não participar de um evento de marketing."); } } ] },
    { title: "Dia de Kart com Amigos", text: "Alguns amigos te convidaram para um dia de descontração na pista de kart local para relembrar os velhos tempos.", choices: [ { text: "Usar o dia para treinar reflexos (+2 Skill, -5 Moral)", action: () => { player.skill = Math.min(100, player.skill + 2); player.morale -= 5; addHistory("Aproveitou o kart para aprimorar os reflexos."); } }, { text: "Apenas se divertir (+10 Moral, -5 Forma)", action: () => { player.morale += 10; player.form -= 5; addHistory("Relembrou os velhos tempos no kart."); } } ] },
    { title: "Visita à Fábrica da Equipe", text: "O diretor técnico te convidou para passar um dia na fábrica para entender melhor a construção do carro.", choices: [ { text: "Passar o dia com os engenheiros (+3 Skill)", action: () => { player.skill = Math.min(100, player.skill + 3); addHistory("Aprendeu muito sobre o carro na fábrica."); } }, { text: "Confraternizar com os mecânicos (+10 Moral)", action: () => { player.morale += 10; addHistory("Aumentou a moral da equipe com uma visita à fábrica."); } } ] },
    { title: "Training Camp Intensivo", text: "Seu preparador físico recomendou um training camp de uma semana nos Alpes, focado em resistência.", choices: [ { text: "Participar do camp completo (+10 Forma, +1 Skill, -5 Moral)", action: () => { player.form = Math.min(100, player.form + 10); player.skill = Math.min(100, player.skill + 1); player.morale -= 5; addHistory("Superou seus limites no training camp."); } }, { text: "Fazer um programa mais leve (+5 Forma)", action: () => { player.form = Math.min(100, player.form + 5); addHistory("Fez um treino leve de recuperação nos Alpes."); } } ] },
    { title: "Análise de Onboards do Rival", text: "Seu engenheiro conseguiu as onboards completas do seu principal rival na última corrida.", choices: [ { text: "Passar a noite estudando os traçados dele (+2 Skill)", action: () => { player.skill = Math.min(100, player.skill + 2); addHistory("Descobriu novos segredos analisando seu rival."); } }, { text: "Ignorar, 'já sou mais rápido que ele' (-5 Moral)", action: () => { player.morale -= 5; addHistory("O excesso de confiança pode ser perigoso."); } } ] },
    { title: "Treinamento de Mídia Avançado", text: "A equipe quer que você treine como manter a calma sob a pressão da imprensa.", choices: [ { text: "Focar na parte de controle mental (+1 Skill, +5 Moral)", action: () => { player.skill = Math.min(100, player.skill + 1); player.morale += 5; addHistory("Usou o treinamento de mídia para fortalecer a mente."); } }, { text: "Aprender a dar respostas 'de PR' (+10 Reputação)", action: () => { player.reputation += 10; addHistory("Aprimorou suas habilidades com a imprensa."); } } ] },
];

// ===================================
// LÓGICA DA LOJA
// ===================================
function openShop() {
    if (isModalActive) return;
    isModalActive = true;
    renderShopItems();
    document.getElementById('shop-modal').classList.remove('hidden');
}

function closeShop() {
    document.getElementById('shop-modal').classList.add('hidden');
    isModalActive = false;
}

function renderShopItems() {
    const container = document.getElementById('shop-items-container');
    container.innerHTML = '';
    shopItems.forEach(item => {
        const isPurchased = item.type === 'unique' && player.possessions.includes(item.id);
        const canAfford = player.balance >= item.price;
        let itemHTML = `<div class="shop-item"><h3>${item.name}</h3><p class="description">${item.description}</p><p class="price">€ ${item.price.toLocaleString()}</p><button class="buy-button" onclick="buyItem('${item.id}')" ${isPurchased || !canAfford ? 'disabled' : ''}>${isPurchased ? 'Adquirido' : (canAfford ? 'Comprar' : 'Saldo Insuficiente')}</button></div>`;
        container.innerHTML += itemHTML;
    });
}

function buyItem(itemId) {
    const item = shopItems.find(i => i.id === itemId);
    if (!item) return;
    if (player.balance < item.price) {
        addHistory("Saldo insuficiente para comprar este item.");
        return;
    }
    player.balance -= item.price;
    for (const stat in item.effect) {
        if (player.hasOwnProperty(stat)) {
             player[stat] = Math.min(100, player[stat] + item.effect[stat]);
        }
    }
    if (item.type === 'unique') {
        player.possessions.push(item.id);
    }
    addHistory(`Comprou "${item.name}" por €${item.price.toLocaleString()}.`);
    updateUI();
    renderShopItems();
}


// ===================================
// CONTROLES DE ÁUDIO
// ===================================
function initializeAudio() { if (!audioInitialized) { audioPlayer.src = musicTracks[currentTrackIndex]; audioPlayer.volume = 0.2; audioPlayer.play().catch(e => console.error(e)); audioInitialized = true; } }
function increaseVolume() { if (audioPlayer.volume <= 0.9) audioPlayer.volume = parseFloat((audioPlayer.volume + 0.1).toFixed(1)); }
function decreaseVolume() { if (audioPlayer.volume >= 0.1) audioPlayer.volume = parseFloat((audioPlayer.volume - 0.1).toFixed(1)); }
function toggleMute() { audioPlayer.muted = !audioPlayer.muted; muteButton.textContent = audioPlayer.muted ? "🔈" : "🔇"; }
function skipTrack() { currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length; audioPlayer.src = musicTracks[currentTrackIndex]; audioPlayer.play(); }

// ===================================
// MOTOR DE SIMULAÇÃO E LÓGICA DO JOGO
// ===================================
function initializeNewSeason() {
    world.season = player.category === "Fórmula 3" && world.currentRaceIndex === 0 ? world.season : world.season + 1;
    world.currentRaceIndex = 0;
    player.form = 100;
    player.morale = 100;
    player.career.points = 0;
    world.currentGrid = [];
    const teams = world.teams[player.category];
    const drivers = world.drivers[player.category];
    for (let i = 0; i < 19; i++) {
        world.currentGrid.push({
            ...drivers[i % drivers.length],
            name: drivers[i % drivers.length].name,
            team: teams[i % teams.length].name,
            points: 0
        });
    }
    addHistory(`Iniciando a temporada ${world.season} com a equipe ${player.team}!`);
    updateStandingsDisplay();
    updateMilestonesDisplay();
    updateUI();
}

function updateDriverValue() {
    const MAX_VALUE = 200000000;
    const SKILL_EXP = 5;
    const skillFactor = Math.pow(player.skill / 100, SKILL_EXP);
    let ageFactor = 1;
    if (player.age > 24 && player.age <= 33) ageFactor = 1 - ((player.age - 24) / 9) * 0.6;
    else if (player.age > 33) ageFactor = 0.4 - ((player.age - 33) / 7) * 0.3;
    const reputationFactor = 0.8 + (player.reputation / 100 * 0.4);
    const formFactor = 0.15 + (player.form / 100 * 0.1);
    const rawValue = MAX_VALUE * skillFactor * Math.max(0.1, ageFactor) * reputationFactor * formFactor;
    player.driverValue = Math.round(rawValue);
}

function simulateRaceResult(driver, team) {
    const s = driver.skill;
    const teamPerformanceBonus = team ? (team.performance - 85) / 100 : 0;
    const formModifier = driver.form ? ((driver.form + driver.morale) / 200) : 1;
    let basePerformance = s + teamPerformanceBonus * 20;
    let finalPerformance = basePerformance * (0.8 + formModifier * 0.4);
    let luck = (Math.random() - 0.5) * 15;
    let performanceScore = finalPerformance + luck;
    if (Math.random() > (0.93 + (s / 100 * 0.06))) return -1;
    return performanceScore;
}

function awardPoints(raceResults) {
    const pointsSystem = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
    raceResults.forEach((result, index) => {
        if (result.score === -1) return; 
        if (index < pointsSystem.length) {
            const points = pointsSystem[index];
            if (result.isPlayer) {
                player.career.points += points;
            } else {
                const driverInGrid = world.currentGrid.find(d => d.name === result.name);
                if (driverInGrid) driverInGrid.points += points;
            }
        }
    });
}

function advanceToNextRace() {
    initializeAudio();
    const trackName = world.calendars[player.category][world.currentRaceIndex];
    
    const raceResults = [];
    const playerTeam = world.teams[player.category].find(t => t.name === player.team);
    raceResults.push({ name: player.name, score: simulateRaceResult(player, playerTeam), isPlayer: true });
    
    world.currentGrid.forEach(driver => {
        const team = world.teams[player.category].find(t => t.name === driver.team);
        raceResults.push({ name: driver.name, score: simulateRaceResult(driver, team), isPlayer: false });
    });

    raceResults.sort((a, b) => b.score - a.score);
    const playerResult = raceResults.find(r => r.isPlayer);
    const playerPosition = playerResult.score === -1 ? 'DNF' : raceResults.findIndex(r => r.isPlayer) + 1;

    setTimeout(() => {
        if (playerPosition !== 'DNF') {
            // CORRIGIDO: Vitória agora também conta como pódio
            if (playerPosition <= 3) {
                player.career.podiums++;
                // A conquista de pódio é adicionada primeiro, depois trocada pela de vitória se for o caso
                const milestone = {type: playerPosition === 1 ? 'win' : 'podium', race: trackName, season: world.season};
                player.milestones.unshift(milestone);
                
                if (playerPosition === 1) {
                    player.career.wins++;
                    showAchievement('Vitória!', `P1 em ${trackName}`, 'win');
                }
            }
        }
    }, 500);
    
    const resultText = playerPosition === 'DNF' ? "DNF! Problema no carro." : `Terminou em P${playerPosition}`;
    addHistory(`Corrida em ${trackName}: ${resultText}`);
    awardPoints(raceResults);
    player.age = parseFloat((player.age + 1 / world.calendars[player.category].length).toFixed(2));
    player.balance += player.salary;
    player.form = Math.max(20, player.form - (Math.random() * 5));
    if (playerPosition !== 'DNF') player.morale = Math.min(100, player.morale + (5 - playerPosition / 2));
    else player.morale = Math.max(10, player.morale - 10);
    updateDriverValue();
    world.currentRaceIndex++;

    if (world.currentRaceIndex >= world.calendars[player.category].length) {
        setTimeout(endSeason, 3000);
    } else {
        if (Math.random() < 0.4) {
            setTimeout(triggerRandomEvent, 2000);
        }
    }
    updateStandingsDisplay();
    updateMilestonesDisplay();
    updateUI();
}

function endSeason() {
    addHistory(`Fim da temporada de ${world.season} na ${player.category}.`);
    const fullGrid = [ { ...player, name: player.name, team: player.team, points: player.career.points, isPlayer: true }, ...world.currentGrid ];
    fullGrid.sort((a,b) => b.points - a.points);
    if(fullGrid[0].isPlayer) {
        player.career.championships++;
        
        if (player.category === "Fórmula 1") {
            player.career.f1Championships++;
        }
        addHistory(`🏆 CAMPEÃO DA ${player.category.toUpperCase()} ${world.season}!`);
        player.titles.push(`Campeão da ${player.category} ${world.season}`);
        showAchievement(`Campeão Mundial`, `da ${player.category} ${world.season}`, 'champion');
    }
    setTimeout(startContractPhase, 3000);
}

function startContractPhase() {
    let offers = [];
    const s = player.skill;
    if (player.reputation > 50) {
        const currentTeam = world.teams[player.category].find(t => t.name === player.team);
        if (currentTeam) {
            offers.push({
                text: `Renovar com a ${currentTeam.name}`,
                action: () => acceptOffer(currentTeam.name, player.category, player.salary * 1.2)
            });
        }
    }
    const categoriesToOffer = [];
    if (s > 75) categoriesToOffer.push("Fórmula 1", "Fórmula 2", "Fórmula 3");
    else if (s >= 60) categoriesToOffer.push("Fórmula 2", "Fórmula 3");
    else categoriesToOffer.push("Fórmula 3");

    categoriesToOffer.forEach(category => {
        if(world.teams[category]) {
            world.teams[category].forEach(team => {
                if (team.name !== player.team && Math.random() < 0.7) {
                     offers.push({
                        text: `Mudar para ${team.name} (${category})`,
                        action: () => acceptOffer(team.name, category, player.driverValue / 20)
                    });
                }
            });
        }
    });

    if (offers.length === 0) {
        showEvent({ title: "Fim de Carreira", text: "Nenhuma equipe se interessou em seus serviços.", choices: [{ text: "Ver estatísticas", action: () => { document.getElementById('advance-button').disabled = true; } }] });
        return;
    }
    showEvent({
        title: "Período de Contratos",
        text: "Avalie suas opções para a próxima temporada:",
        choices: offers.map(offer => ({ text: offer.text, action: offer.action }))
    });
}
function acceptOffer(teamName, category, newSalary) {
    addHistory(`Contrato assinado com ${teamName} na ${category}.`);
    player.team = teamName;
    player.category = category;
    player.salary = Math.round(newSalary);
    initializeNewSeason();
}
function triggerRandomEvent() { 
    if(isModalActive) return; // ALTERADO: Checagem do sinalizador
    const event = randomEvents[Math.floor(Math.random() * randomEvents.length)]; 
    showEvent(event); 
}
function showEvent(event) {
    if (isModalActive) return; // ALTERADO: Checagem do sinalizador
    isModalActive = true;     // ALTERADO: Ativa o sinalizador

    const modal = document.getElementById('event-modal');
    modal.classList.remove('hidden');
    document.getElementById('event-title').textContent = event.title;
    document.getElementById('event-text').textContent = event.text;
    const choicesDiv = document.getElementById('event-choices');
    choicesDiv.innerHTML = '';
    event.choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.textContent = choice.text;
        button.onclick = () => {
            choice.action();
            modal.classList.add('hidden');
            isModalActive = false; // ALTERADO: Desativa o sinalizador
            updateUI();
        };
        choicesDiv.appendChild(button);
    });
}
function showAchievement(title, subtitle, type) {
    if (isModalActive) return; // ALTERADO: Checagem do sinalizador
    isModalActive = true;     // ALTERADO: Ativa o sinalizador

    const overlay = document.getElementById('achievement-overlay');
    const card = document.getElementById('achievement-card');
    const titleElement = document.getElementById('achievement-title');
    const subtitleElement = document.getElementById('achievement-subtitle');

    titleElement.innerHTML = title;
    subtitleElement.innerHTML = subtitle;
    card.className = '';
    card.classList.add(type);
    card.classList.remove('animate-achievement');
    void card.offsetWidth;
    card.classList.add('animate-achievement');
    overlay.classList.remove('hidden');
    setTimeout(() => {
        overlay.classList.add('hidden');
        isModalActive = false; // ALTERADO: Desativa o sinalizador
    }, 1500);
}
// ALTERADO: UI atualizada com o contador de títulos de F1
function updateUI() {
    const dashboard = document.getElementById('player-dashboard');
    let f1TitlesHTML = '';
    if (player.career.f1Championships > 0) {
        f1TitlesHTML = `<div class="stat-box champion-box"><div class="label">Títulos F1</div><div class="value">🏆 ${player.career.f1Championships}</div></div>`;
    }

    dashboard.innerHTML = `
        <div class="stat-box"><div class="label">Idade</div><div class="value">${Math.floor(player.age)}</div></div>
        <div class="stat-box"><div class="label">Skill</div><div class="value">${Math.round(player.skill)}</div></div>
        <div class="stat-box"><div class="label">Forma</div><div class="value">${Math.round(player.form)}</div></div>
        <div class="stat-box"><div class="label">Moral</div><div class="value">${Math.round(player.morale)}</div></div>
        <div class="stat-box stat-box-large"><div class="label">Valor de Mercado</div><div class="value">€${player.driverValue.toLocaleString()}</div></div>
        <div class="stat-box stat-box-large"><div class="label">Saldo em Conta</div><div class="value">€${player.balance.toLocaleString()}</div></div>
        <div class="stat-box"><div class="label">Vitórias</div><div class="value">${player.career.wins}</div></div>
        <div class="stat-box"><div class="label">Pódios</div><div class="value">${player.career.podiums}</div></div>
        <div class="stat-box"><div class="label">Poles</div><div class="value">${player.career.poles}</div></div>
        <div class="stat-box"><div class="label">Reputação</div><div class="value">${Math.round(player.reputation)}</div></div>
        ${f1TitlesHTML}
    `;

    const raceInfo = document.getElementById('race-info');
    const calendar = world.calendars[player.category];
    const advanceButton = document.getElementById('advance-button');

    if (world.currentRaceIndex < calendar.length) {
        raceInfo.textContent = `T${world.season} | Corrida ${world.currentRaceIndex + 1}/${calendar.length} - ${calendar[world.currentRaceIndex]}`;
        advanceButton.disabled = false;
    } else {
        raceInfo.textContent = `Fim de Temporada - Aguardando Contratos`;
        advanceButton.disabled = true;
    }
}
function addHistory(text) {
    player.history.unshift(text);
    const historyLog = document.getElementById('history-log');
    historyLog.innerHTML = '';
    player.history.slice(0, 10).forEach(entry => {
        const p = document.createElement('p');
        p.textContent = entry;
        historyLog.appendChild(p);
    });
}
function updateMilestonesDisplay() {
    const log = document.getElementById('milestones-log');
    log.innerHTML = '';
    if(player.milestones.length === 0) {
        log.innerHTML = '<p>Suas maiores conquistas serão listadas aqui.</p>';
        return;
    }
    player.milestones.slice(0, 15).forEach(m => {
        const p = document.createElement('p');
        let icon = '';
        if (m.type === 'win') icon = '🏆';
        else if (m.type === 'podium') icon = '🥈';
        else if (m.type === 'pole') icon = '⏱️';
        p.innerHTML = `<span class="milestone-icon">${icon}</span> ${m.type.charAt(0).toUpperCase() + m.type.slice(1)} em ${m.race} (T${m.season})`;
        log.appendChild(p);
    });
}
function updateStandingsDisplay() {
    const container = document.getElementById('championship-standings');
    const fullGrid = [
        { name: player.name, team: player.team, points: player.career.points, isPlayer: true },
        ...world.currentGrid
    ];
    fullGrid.sort((a, b) => b.points - a.points);
    let tableHTML = '<table><thead><tr><th>Pos</th><th>Piloto</th><th>Equipe</th><th>Pts</th></tr></thead><tbody>';
    fullGrid.forEach((driver, index) => {
        tableHTML += `
            <tr class="${driver.isPlayer ? 'player-row' : ''}">
                <td>${index + 1}</td>
                <td>${driver.name}</td>
                <td>${driver.team}</td>
                <td>${driver.points}</td>
            </tr>
        `;
    });
    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
}
