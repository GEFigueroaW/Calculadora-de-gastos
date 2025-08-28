const questions = [
    { q: "Cuando tomo decisiones importantes, suelo guiarme más por:", masculine: "Lógica y datos", feminine: "Intuición y sentimientos" },
    { q: "Mi ritmo natural es más:", masculine: "Rápido y orientado a resultados", feminine: "Tranquilo y disfruto el proceso" },
    { q: "Cuando tengo un problema, prefiero:", masculine: "Buscar soluciones inmediatas", feminine: "Hablarlo y procesar mis emociones" },
    { q: "En las relaciones, me importa más:", masculine: "Independencia y espacio personal", feminine: "Conexión emocional y cercanía" },
    { q: "Al trabajar en equipo, suelo ser:", masculine: "Líder, tomo decisiones y organizo", feminine: "Colaborador, busco armonía" },
    { q: "Cuando siento estrés:", masculine: "Me enfoco en resolverlo", feminine: "Necesito tiempo para sentir y soltar" },
    { q: "Enfrentando cambios inesperados:", masculine: "Me adapto rápido y busco control", feminine: "Los proceso con calma, necesito tiempo" },
    { q: "Prefiero actividades que son:", masculine: "Competitivas y de logro personal", feminine: "Creativas y de conexión" },
    { q: "En discusiones, tiendo a ser:", masculine: "Directo y firme", feminine: "Empático y conciliador" },
    { q: "Sobre mis metas de vida:", masculine: "Necesito claridad, estructura y pasos", feminine: "Confío en que el camino se revela solo" },
    { q: "Cuando alguien cercano sufre:", masculine: "Pienso en cómo ayudarlo con soluciones", feminine: "Prefiero escucharlo y acompañarlo" },
    { q: "Mi principal motivación es:", masculine: "Lograr resultados y avanzar", feminine: "Disfrutar el presente y sentir conexión" }
];

let currentQuestion = 0;
let masculineScore = 0;
let feminineScore = 0;
const quizContainer = document.getElementById("quiz");
const resultCard = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
const resultDescription = document.getElementById("resultDescription");
const restartBtn = document.getElementById("restartBtn");
let chartInstance;

function loadQuestion() {
    if (currentQuestion < questions.length) {
        const q = questions[currentQuestion];
        quizContainer.innerHTML = `
            <h3>${currentQuestion + 1}. ${q.q}</h3>
            <button class="btn" onclick="selectAnswer('masculine')">${q.masculine}</button>
            <button class="btn" onclick="selectAnswer('feminine')">${q.feminine}</button>
        `;
    } else {
        showResult();
    }
}

function selectAnswer(type) {
    if (type === "masculine") masculineScore++;
    else feminineScore++;
    currentQuestion++;
    loadQuestion();
}

function showResult() {
    quizContainer.style.display = "none";
    resultCard.style.display = "block";

    const total = masculineScore + feminineScore;
    const masculinePercent = Math.round((masculineScore / total) * 100);
    const femininePercent = 100 - masculinePercent;

    let resultText = "";
    if (masculinePercent > 65) {
        resultTitle.textContent = "⚡ Predomina tu Energía Masculina";
        resultText = "Eres más lógico, orientado a resultados y acción. Intenta integrar más apertura emocional y creatividad.";
    } else if (femininePercent > 65) {
        resultTitle.textContent = "🌿 Predomina tu Energía Femenina";
        resultText = "Eres empático, creativo y conectado con tus emociones. Fortalece tu foco, límites y toma de decisiones.";
    } else {
        resultTitle.textContent = "☯️ Energías Balanceadas";
        resultText = "Combinas lo mejor de ambas energías: enfoque y sensibilidad. Mantener este balance te da flexibilidad y estabilidad emocional.";
    }
    resultDescription.textContent = resultText;

    localStorage.setItem("energiaMasculina", masculinePercent);
    localStorage.setItem("energiaFemenina", femininePercent);

    drawChart(masculinePercent, femininePercent);
}

function drawChart(masculinePercent, femininePercent) {
    const ctx = document.getElementById("resultChart").getContext("2d");
    if (chartInstance) chartInstance.destroy();
    chartInstance = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Masculina", "Femenina"],
            datasets: [{
                data: [masculinePercent, femininePercent],
                backgroundColor: ["#4a90e2", "#e83e8c"],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: "bottom" } }
        }
    });
}

restartBtn.addEventListener("click", () => {
    masculineScore = 0;
    feminineScore = 0;
    currentQuestion = 0;
    quizContainer.style.display = "block";
    resultCard.style.display = "none";
    loadQuestion();
});

loadQuestion();