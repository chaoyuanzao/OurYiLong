/**
 * 渲染时间文本
 */
function renderGameTime(){
  let h = String(gameDate.hour).padStart(2,'0');
  gameTimeDom.textContent = `${gameDate.month}月${gameDate.day}日 ${h}:00`;
}

/**
 * 时间tick主函数：推进时间、触发事件、推进决议
 */
function tickGameTime(){
  if(timeSpeed === 0) return;
  gameDate.hour += timeSpeed;
  if(gameDate.hour >=24){
    gameDate.hour -= 24;
    gameDate.day += 1;
    const monthDayMap = {9:30,10:31,11:30,12:31};
    const maxDay = monthDayMap[gameDate.month] ?? 30;
    if(gameDate.day > maxDay){
      gameDate.day = 1;
      gameDate.month += 1;
    }
  }
  renderGameTime();
  checkEvents();
  tickResolution();
}
