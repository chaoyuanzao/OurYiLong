/**
 * 弹出事件窗口，渲染选项、效果小字
 */
function showEvent(eventObj){
  eventTitle.innerText = eventObj.title;
  eventDesc.innerText = eventObj.desc;
  eventOptionWrap.innerHTML = '';
  eventObj.options.forEach(opt=>{
    const btn = document.createElement('button');
    btn.className = "eventOption";
    let effectTextParts = [];
    if(opt.effect.stability !== 0) effectTextParts.push(`稳定度 ${opt.effect.stability >0 ? '+' : ''}${opt.effect.stability}`);
    if(opt.effect.satisfaction !== 0) effectTextParts.push(`满意度 ${opt.effect.satisfaction >0 ? '+' : ''}${opt.effect.satisfaction}`);
    if(opt.effect.money !== 0) effectTextParts.push(`资金 ${opt.effect.money >0 ? '+' : ''}${opt.effect.money}`);
    if(opt.effect.admitRate !== 0) effectTextParts.push(`升学率 ${opt.effect.admitRate >0 ? '+' : ''}${opt.effect.admitRate}`);
    if(opt.effect.outsource !== 0) effectTextParts.push(`外勤 ${opt.effect.outsource >0 ? '+' : ''}${opt.effect.outsource}`);
    if(opt.effect.decisionPower){
      const dp = opt.effect.decisionPower;
      if(dp.staff) effectTextParts.push(`教职工话语权 ${dp.staff>0?'+':''}${dp.staff}%`);
      if(dp.studentUnion) effectTextParts.push(`学生会话语权 ${dp.studentUnion>0?'+':''}${dp.studentUnion}%`);
      if(dp.normalStudent) effectTextParts.push(`普通学生话语权 ${dp.normalStudent>0?'+':''}${dp.normalStudent}%`);
    }
    const effectText = effectTextParts.join('，');
    btn.innerHTML = `
      <div>${opt.text}</div>
      <div style="font-size:12px;opacity:0.7;margin-top:4px;">${effectText}</div>
    `;
    btn.onclick = ()=>{
      gameState.stability += opt.effect.stability;
      gameState.satisfaction += opt.effect.satisfaction;
      gameState.money += opt.effect.money;
      gameState.admitRate += opt.effect.admitRate;
      gameState.outsource += opt.effect.outsource;
      gameState.stability = Math.max(0, Math.min(100, gameState.stability));
      gameState.satisfaction = Math.max(0, Math.min(100, gameState.satisfaction));
      gameState.admitRate = Math.max(0, Math.min(100, gameState.admitRate));
      gameState.outsource = Math.max(0, gameState.outsource);
      refreshStatUI();
      addLog(`事件【${eventObj.title}】选择：${opt.text}，变动：${effectText}`);
      if(opt.effect.decisionPower){
        changeDecisionPower(opt.effect.decisionPower);
        addLog(`决策层势力发生变动`);
      }
      eventOverlay.style.display = "none";
    };
    eventOptionWrap.appendChild(btn);
  })
  eventOverlay.style.display = "flex";
  addLog(`触发事件：${eventObj.title}`);
}

/**
 * 轮询检测是否满足事件触发条件
 */
function checkEvents(){
  for(let evt of eventPool){
    if(evt.triggered) continue;
    if(evt.condition()){
      evt.triggered = true;
      showEvent(evt);
      break;
    }
  }
}
