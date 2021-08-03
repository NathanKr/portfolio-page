function mouseHelper(_this, textTop, textOpacity, buttonBottom, buttonOpacity) {
  const elemTopText = _this.querySelector(".top_text");
  elemTopText.style.top = textTop;
  elemTopText.style.opacity = textOpacity;

  const elemBottomButton = _this.querySelector(".bottom_button");
  elemBottomButton.style.bottom = buttonBottom;
  elemBottomButton.style.opacity = buttonOpacity;
}

function mouseEnterHandler() {
  mouseHelper(this, "50%", 1, "50%", 1);
}

function mouseLeaveHandler() {
  mouseHelper(this, 0, 0, 0, 0);
}

function resetState() {
  const newFunc = mouseLeaveHandler.bind(this);
  newFunc();
}

function init() {
  const projectsRootElem = document.getElementById("projects");
  for (let index = 0; index < projects.length; index++) {
    const project = projects[index];
    potfolioView.createNewProjectDomElement(projectsRootElem, project);
  }

  const nodeList = document.querySelectorAll(".project_container_back_side");
  for (let index = 0; index < nodeList.length; index++) {
    const objProject = nodeList[index];
    const newFunc = resetState.bind(objProject);
    newFunc();
    objProject.addEventListener("mouseenter", mouseEnterHandler);
    objProject.addEventListener("mouseleave", mouseLeaveHandler);
  }
}

init();
