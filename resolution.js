/**
 * 渲染全部决议面板，分类渲染、判断灰化、进度
 */
function renderResolutions(){
  const usedOutsource = getUsedOutsource();
  resContent.innerHTML = "";
  const group = {};
  resolutionPool.forEach(r=>{
    if(!group[r.category]) group[r.category] = [];
    group[r.category].push(r);
  })
  for(let cat in group){
    const catTitle = document.createElement('div');
    catTitle.className = "resCategoryTitle";
    catTitle.innerText = cat;
    resContent.appendChild(catTitle);
    group[cat].forEach(res=>{
      const div = document.createElement('div');
      div.className="resItem";
      const runningRes = runningResolutions.find(r=>r.id === res.id);
      let progressPercent = 0;
      let isRunning = !!runningRes;
      let canTrigger = res.condition(gameState, usedOutsource);
      if(isRunning){
        progressPercent = Math.min(100, (runningRes.progress / res.needHour)*100);
      }
      if(!canTrigger && !isRunning) div.classList.add("disabled");
      div.innerHTML = `...`;
      resContent.appendChild(div);
    })
  }
  document.querySelectorAll('.resItem button').forEach(btn=>{
    btn.onclick = ()=>{
      const rid = btn.dataset.resId;
      const targetRes = resolutionPool.find(r=>r.id === rid);
      const usedOutsource = getUsedOutsource();
      if(!targetRes || runningResolutions.find(r=>r.id===rid) || !targetRes.condition(gameState, usedOutsource)) return;
      runningResolutions.push({
        id:targetRes.id,
        progress:0,
        outsourceCost: targetRes.outsourceCost
      })
      addLog(`启动决议：${targetRes.title}，占用外勤${targetRes.outsourceCost}`);
      refreshStatUI();
      renderResolutions();
    }
  })
}

/**
 * 每帧tick决议进度，完成后应用奖励/惩罚
 */
function tickResolution(){
  const usedOutsource = getUsedOutsource();
  for(let i = runningResolutions.length -1; i >=0; i--){
    const runRes = runningResolutions[i];
    const resDef = resolutionPool.find(r=>r.id === runRes.id);
    if(!resDef){
      runningResolutions.splice(i,1);
      continue;
    }
    runRes.progress += timeSpeed;
    if(runRes.progress >= resDef.needHour){
      for(let key in resDef.cost){
        gameState[key] += resDef.cost[key];
      }
      for(let key in resDef.reward){
        gameState[key] += resDef.reward[key];
      }
      gameState.stability = Math.max(0, Math.min(100, gameState.stability));
      gameState.satisfaction = Math.max(0, Math.min(100, gameState.satisfaction));
      gameState.admitRate = Math.max(0, Math.min(100, gameState.admitRate));
      gameState.money = Math.max(0, gameState.money);
      gameState.outsource = Math.max(0, gameState.outsource);
      addLog(`决议【${resDef.title}】完成！释放外勤${resDef.outsourceCost}`);
      runningResolutions.splice(i,1);
    }
  }
  refreshStatUI();
  renderResolutions();
}
