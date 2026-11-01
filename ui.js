/**
 * 刷新顶部状态栏所有数值
 */
function refreshStatUI(){
  const usedOutsource = getUsedOutsource();
  const freeOutsource = gameState.outsource - usedOutsource;
  statStability.textContent = gameState.stability.toFixed(1);
  statSatisfaction.textContent = gameState.satisfaction.toFixed(1);
  statMoney.textContent = Math.floor(gameState.money);
  statOutsource.textContent = `${freeOutsource}/${gameState.outsource}`;
  statAdmit.textContent = gameState.admitRate.toFixed(0)+"%";
  renderResolutions();
}
