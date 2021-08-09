let objCurrentProjectLogic = null;
let sliderIndex = null;
let elemCurrentMenuItem = null;

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
  const buttonLearnMore = this.querySelector(".learn_more_button");
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

function showDetails() {
  potfolioView.getElemCenterScreen().style.visibility = "visible";
  potfolioView.getElemCenterScreen().style.zIndex = "100";
}

/**
 * hideDetails is used with onclick on the html because iconify might not be ready
 */
function hideDetails() {
  potfolioView.getElemCenterScreen().style.visibility = "hidden";
  potfolioView.getElemCenterScreen().style.zIndex = "-1";
}

function closeHandler() {
  hideDetails();
}

/**
 * slideLeftHandler is used with onclick on the html because iconify might not be ready
 */
function slideLeftHandler() {
  if (sliderIndex === 0) {
    sliderIndex = objCurrentProjectLogic.imgsSliderFileNames.length - 1;
  } else {
    sliderIndex--;
  }
  potfolioView.setCurrentSlideImage(objCurrentProjectLogic, sliderIndex);
}

/**
 * slideRightHandler is used with onclick on the html because iconify might not be ready
 */
function slideRightHandler() {
  if (sliderIndex + 1 === objCurrentProjectLogic.imgsSliderFileNames.length) {
    sliderIndex = 0;
  } else {
    sliderIndex++;
  }
  potfolioView.setCurrentSlideImage(objCurrentProjectLogic, sliderIndex);
}

function initDetails() {
  // hideDetails is also th click handler of button_close
  hideDetails();

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

function initPopupDetails() {
  fatherDomElement = document.getElementById("id_popup_details");
  potfolioView.createPopupDetails(fatherDomElement);
}

const menuItemClickHandler = (elemNewSelectedMenuItem) => {
  // remove selected from prev and add default
  removeClassFromCurrentMenuItem(constants.CLASS_MENU_BUTTON_ACTIVE_COLORS);
  addClassToCurrentMenuItem(constants.CLASS_MENU_BUTTON_DEFAULT_COLORS);

  // set current to new
  elemCurrentMenuItem = elemNewSelectedMenuItem;

  // remove default from new selected and add selected
  removeClassFromCurrentMenuItem(constants.CLASS_MENU_BUTTON_DEFAULT_COLORS);
  addClassToCurrentMenuItem(constants.CLASS_MENU_BUTTON_ACTIVE_COLORS);
};

function addClassToCurrentMenuItem(nameClass) {
  elemCurrentMenuItem.className += ` ${nameClass}`;
}

function removeClassFromCurrentMenuItem(nameClass) {
  elemCurrentMenuItem.className = elemCurrentMenuItem.className.replace(
    nameClass,
    ""
  );
}

function initMenu() {
  fatherDomElement = document.getElementById("menu");
  techCategories.forEach((category) => {
    fatherDomElement.innerHTML += ` <button onclick='menuItemClickHandler(this)' 
      class='button menu_button 
      ${
        constants.CLASS_MENU_BUTTON_DEFAULT_COLORS
      }'>${category.toUpperCase()}</button>`;
  });
  elemCurrentMenuItem = fatherDomElement.querySelector(".menu_button");
  removeClassFromCurrentMenuItem(constants.CLASS_MENU_BUTTON_DEFAULT_COLORS);
  addClassToCurrentMenuItem(constants.CLASS_MENU_BUTTON_ACTIVE_COLORS);
}

// ************* main **************
document.title = projectsOwner;
initMenu();
initPopupDetails();
initMouseEnterExit();
initDetails();
