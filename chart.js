/**
 * 右侧全局决策层饼图
 */
function renderDecisionPie(){
  if(decisionPieChart) decisionPieChart.destroy();
  const data = gameState.decisionPower;
  const ctx = document.getElementById('globalPieChart').getContext('2d');
  decisionPieChart = new Chart(ctx,{
    type:'pie',
    data:{
      labels:["教职工","学生会","普通学生"],
      datasets:[{
        data:[data.staff, data.studentUnion, data.normalStudent],
        backgroundColor:["#74c476","#ffbc42","#4292c6"]
      }]
    },
    options:{responsive:true, maintainAspectRatio:false}
  })
}

/**
 * 地块详情内饼图
 * @param {string} pieStr "学校人员,80,#4292c6;访客,20,#ffbc42"
 */
function renderPie(pieStr){
  if(pieChart) pieChart.destroy();
  pieLegendDom.innerHTML = '';
  const parts = pieStr.split(';');
  const labels = [];
  const data = [];
  const colors = [];
  parts.forEach(p=>{
    const [label,val,color] = p.split(',');
    labels.push(label);
    data.push(Number(val));
    colors.push(color);
    pieLegendDom.innerHTML += `<div style="color:${color}">${label}: ${val}%</div>`
  })
  const ctx = document.getElementById('pieChart').getContext('2d');
  pieChart = new Chart(ctx,{
    type:'pie',
    data:{
      labels:labels,
      datasets:[{data:data, backgroundColor:colors}]
    },
    options:{responsive:true, maintainAspectRatio:false}
  })
}
