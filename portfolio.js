let objCurrentProjectLogic = null;
let sliderIndex = null;
let elemCurrentMenuItem = null;
let mapProjectTitleToProjectDomObject = new Map();

//  ************* menu **************
/**
 * getProjectTitlesFromTech
 *
 * @param {*} desiredTechName  : e.g. All or ASP.Net
 *
 */
function getProjectTitlesFromTech(desiredTechName) {
  const desiredTechNameLowerCase = desiredTechName.toLowerCase();

  if (desiredTechNameLowerCase === constants.MENU_ITEM_ALL.toLowerCase()) {
    return projects.map((projectLogic) => projectLogic.title);
  }

  // --- filter projects by desiredTechNameLowerCase
  const matchedProjects = projects.filter((projectLogic) => {
    const projectTechsLowerCase = projectLogic.techs.map((techName) =>
      techName.toLowerCase()
    );
    return projectTechsLowerCase.includes(desiredTechNameLowerCase);
  });

  // --- map
  return matchedProjects.map((projectLogic) => projectLogic.title);
}

// ************* projects **************
function showProjectsByTech(desiredTechName) {
  const titlesToShow = getProjectTitlesFromTech(desiredTechName);
  const titlesAll = getProjectTitlesFromTech(constants.MENU_ITEM_ALL);
  titlesAll.forEach((title) => {
    let domProjectContainer = mapProjectTitleToProjectDomObject.get(title);
    domProjectContainer.style.display = titlesToShow.includes(title)
      ? "inline-block"
      : "none";
  });
}

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
  mouseHelper(this, "35%", 1, "35%", 1);
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


function resetState(domElement) {
  const newFunc = mouseLeaveHandler.bind(domElement);
  newFunc();
}

function initMouseEnterExit() {
  const projectsRootElem = document.getElementById("id_projects");
  for (let index = 0; index < projects.length; index++) {
    const project = projects[index];
    const projectDomObject = potfolioView.createNewProjectDomElement(
      projectsRootElem,
      project,
      index
    );

    resetState(projectDomObject)
    projectDomObject.addEventListener("mouseenter", mouseEnterHandler);
    projectDomObject.addEventListener("mouseleave", mouseLeaveHandler);

    mapProjectTitleToProjectDomObject.set(project.title, projectDomObject);
  }

}

//  ************* details **************

function popupIsActive(){
  potfolioView.getElemCenterScreen().style.zIndex === constants.POPUP_ON_ZINDEX
}

function showDetails() {
  potfolioView.getElemCenterScreen().style.visibility = "visible";
  potfolioView.getElemCenterScreen().style.zIndex = constants.POPUP_ON_ZINDEX;
}

/**
 * hideDetails is used with onclick on the html because iconify might not be ready
 */
function hideDetails() {
  potfolioView.getElemCenterScreen().style.visibility = "hidden";
  potfolioView.getElemCenterScreen().style.zIndex = constants.POPUP_OFF_ZINDEX;
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

  const selectedTechName = elemNewSelectedMenuItem.innerText;
  showProjectsByTech(selectedTechName);
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
  techCategories.forEach((techCategory) => {
    fatherDomElement.innerHTML += ` <button onclick='menuItemClickHandler(this)' 
      class='button menu_button 
      ${
        constants.CLASS_MENU_BUTTON_DEFAULT_COLORS
      }'>${techCategory}</button>`;
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
