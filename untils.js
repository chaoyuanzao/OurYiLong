/**
 * 获取当前已经被决议占用的外勤总和
 */
function getUsedOutsource(){
  return runningResolutions.reduce((sum, r)=> sum + r.outsourceCost, 0);
}

/**
 * 修改决策层权重，自动归一化总和100
 * @param {Object} change {staff: +2, studentUnion:-2}
 */
function changeDecisionPower(change){
  for(let key in change){
    gameState.decisionPower[key] += change[key];
  }
  const dp = gameState.decisionPower;
  let total = dp.staff + dp.studentUnion + dp.normalStudent;
  dp.staff = Math.max(0, dp.staff / total * 100);
  dp.studentUnion = Math.max(0, dp.studentUnion / total * 100);
  dp.normalStudent = Math.max(0, dp.normalStudent / total * 100);
  const newTotal = dp.staff + dp.studentUnion + dp.normalStudent;
  dp.staff = dp.staff / newTotal * 100;
  dp.studentUnion = dp.studentUnion / newTotal * 100;
  dp.normalStudent = dp.normalStudent / newTotal * 100;
  renderDecisionPie();
}
