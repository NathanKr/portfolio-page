// ************* mouse enter \ exit **************

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

function initMouseEnterExit() {
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

//  ************* details **************
function initDetails() {
  const elemCenterScreen = document.querySelector(
    "#id_popup_details .center_screen"
  );
  const buttonClose = document.querySelector("#id_popup_details .button_close");
  buttonClose.onclick = () => {
    elemCenterScreen.style.zIndex = "-1";
  };

  const listLearnMoreButton = document.querySelectorAll(
    ".project_container_back_side .bottom_button"
  );

  listLearnMoreButton.forEach((elemLearnMoreButton) => {
    const index = elemLearnMoreButton.getAttribute(
      constants.DATA_INDEX_ATTRIBUE
    );

    elemLearnMoreButton.onclick = () => {
      const objProject = projects[index];
      elemCenterScreen.style.zIndex = "100";
      potfolioView.fillDetailsDomElement(objProject);
    };
  });
}

// main
initMouseEnterExit();
initDetails();
