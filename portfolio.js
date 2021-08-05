let objCurrentProjectLogic = null;
let sliderIndex = null;


// ************* mouse enter \ exit **************
function mouseHelper(_this, textTop, textOpacity, buttonBottom, buttonOpacity) {
  const elemTopText = _this.querySelector(".top_text");
  elemTopText.style.top = textTop;
  elemTopText.style.opacity = textOpacity;

  const elemBottomButton = _this.querySelector(".learn_more_button");
  elemBottomButton.style.bottom = buttonBottom;
  elemBottomButton.style.opacity = buttonOpacity;
}

function mouseEnterHandler() {
  mouseHelper(this, "50%", 1, "50%", 1);
  const buttonLearnMore = this.querySelector('.learn_more_button');
  const indexProject = buttonLearnMore.getAttribute(
    constants.DATA_INDEX_ATTRIBUE
  );
  objCurrentProjectLogic = projects[indexProject];
  sliderIndex = 0;
}

function mouseLeaveHandler() {
  mouseHelper(this, 0, 0, 0, 0);
}

function resetState() {
  const newFunc = mouseLeaveHandler.bind(this);
  newFunc();
}

function initMouseEnterExit() {
  const projectsRootElem = document.getElementById("id_projects");
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
const elemCenterScreen = document.querySelector(
  "#id_popup_details .center_screen"
);

function showDetails() {
  elemCenterScreen.style.visibility = "visible";
  elemCenterScreen.style.zIndex = "100";
}

function hideDetails() {
  elemCenterScreen.style.visibility = "hidden";
  elemCenterScreen.style.zIndex = "-1";
}

function initDetails() {
  const buttonLeft = document.querySelector("#id_popup_details .button_left");
  buttonLeft.onclick = () => {
    if (sliderIndex === 0){
      sliderIndex = objCurrentProjectLogic.imgsSliderFileNames.length - 1
    }
    else{
      sliderIndex--;
    }
    potfolioView.setCurrentSlideImage(objCurrentProjectLogic,sliderIndex);
  };

  const buttonRight = document.querySelector("#id_popup_details .button_right");
  buttonRight.onclick = () => {
    console.log(objCurrentProjectLogic);
    if ((sliderIndex+1) === objCurrentProjectLogic.imgsSliderFileNames.length){
      sliderIndex = 0
    }
    else{
      sliderIndex++;
    }
    potfolioView.setCurrentSlideImage(objCurrentProjectLogic,sliderIndex);
  };

  const buttonClose = document.querySelector("#id_popup_details .button_close");
  hideDetails();
  buttonClose.onclick = () => {
    hideDetails();
  };

  const listLearnMoreButton = document.querySelectorAll(
    ".project_container_back_side .learn_more_button"
  );

  listLearnMoreButton.forEach((elemLearnMoreButton) => {
    const index = elemLearnMoreButton.getAttribute(
      constants.DATA_INDEX_ATTRIBUE
    );

    elemLearnMoreButton.onclick = () => {
      const objProject = projects[index];
      showDetails();
      potfolioView.fillDetailsDomElement(objProject);
    };
  });
}

// ************* main **************
initMouseEnterExit();
initDetails();
