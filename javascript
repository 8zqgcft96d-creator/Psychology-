// 計算最高分（可能不只一個）
const maxScore = Math.max(...Object.values(scores));
const topTypes = Object.keys(scores).filter(type => scores[type] === maxScore);

// topTypes 可能是 ["馬型"] 或 ["馬型", "男孩型"]
const datasets = topTypes.map(type => ({
    label: type + " 分布",
    data: types.map(t => scores[t]),
    fill: true,
    backgroundColor: "rgba(" + (50 + Math.floor(Math.random()*150)) + ", 100, 200, 0.2)",
    borderColor: "rgba(" + (50 + Math.floor(Math.random()*150)) + ", 100, 200, 1)",
    pointBackgroundColor: "rgba(" + (50 + Math.floor(Math.random()*150)) + ", 100, 200, 1)"
}));

const radarData = {
    labels: types,
    datasets: datasets
};
let html = "<h3>你的主要人格</h3>";

topTypes.forEach(type => {
    html += `
        <div style="margin-bottom:20px; padding:10px; background:#f7f7f7; border-radius:10px;">
            <h4>${type}</h4>
            <p>${explanations[type]}</p>
        </div>
    `;
});

document.getElementById('explanation').innerHTML = html;
