function init(){
  renderGameTime();
  renderResolutions();
  renderLog();
  renderDecisionPie();
  bindPieceEvents();
  setInterval(tickGameTime, 1000);
}
init();
