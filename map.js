/**
 * 关闭详情面板、清空选中地块
 */
function closePanelAndClear(){
  infoPanel.style.display = 'none';
  tooltipSelected.style.display = 'none';
  if(activeItem){
    activeItem.classList.remove('active');
  }
  activeItem = null;
}

/**
 * 绑定所有地块hover、点击事件
 */
function bindPieceEvents(){
  pieces.forEach(el => {
    el.addEventListener('mouseenter', (e) => {
      tooltipHover.textContent = el.dataset.name;
      tooltipHover.style.display = 'block';
    });
    el.addEventListener('mousemove', (e) => {
      tooltipHover.style.left = (e.clientX + 12) + 'px';
      tooltipHover.style.top = (e.clientY + 12) + 'px';
    });
    el.addEventListener('mouseleave', () => {
      tooltipHover.style.display = 'none';
    });
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      if(activeItem === el){
        closePanelAndClear();
      }else{
        if(activeItem){
          activeItem.classList.remove('active');
        }
        el.classList.add('active');
        activeItem = el;
        selectedNameDom.textContent = el.dataset.name;
        selectedDescDom.textContent = el.dataset.desc;
        tooltipSelected.style.display = 'block';
        panelTitle.innerText = el.dataset.name;
        powerDom.innerText = el.dataset.power;
        floorDom.innerText = el.dataset.floor;
        facilityDom.innerText = el.dataset.facility;
        renderPie(el.dataset.pie);
        infoPanel.style.display = 'block';
      }
    });
  });
}
