function addLog(text){
  const timeStr = `${gameDate.month}月${gameDate.day}日 ${String(gameDate.hour).padStart(2,'0')}:00`;
  const logItem = `[${timeStr}] ${text}`;
  eventLogList.unshift(logItem);
  renderLog();
}
function renderLog(){
  logContent.innerHTML = '';
  eventLogList.forEach(item=>{
    const div = document.createElement('div');
    div.className="logItem";
    div.innerText = item;
    logContent.appendChild(div);
  })
}
