const portfoloioJs = {
  objCurrentProjectLogic: null,
  sliderIndex: null,
  elemCurrentMenuItem: null,
  mapProjectTitleToProjectDomObject: new Map(),
  //  ************* menu **************
  /**
   * getProjectTitlesFromTech
   *
   * @param {*} desiredTechName  : e.g. All or ASP.Net
   *
   */
  getProjectTitlesFromTech: function (desiredTechName) {
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
  },
  // ************* projects **************
  showProjectsByTech: function (desiredTechName) {
    const titlesToShow = portfoloioJs.getProjectTitlesFromTech(desiredTechName);
    const titlesAll = portfoloioJs.getProjectTitlesFromTech(
      constants.MENU_ITEM_ALL
    );
    titlesAll.forEach((title) => {
      let domProjectContainer =
        portfoloioJs.mapProjectTitleToProjectDomObject.get(title);
      domProjectContainer.style.display = titlesToShow.includes(title)
        ? "inline-block"
        : "none";
    });
  },
  // ************* mouse enter \ exit **************
  mouseHelper: function (
    _this,
    textTop,
    textOpacity,
    buttonBottom,
    buttonOpacity
  ) {
    const elemTopText = _this.querySelector(".top_text");
    elemTopText.style.top = textTop;
    elemTopText.style.opacity = textOpacity;

    const elemBottomButton = _this.querySelector(".learn_more_button");
    elemBottomButton.style.bottom = buttonBottom;
    elemBottomButton.style.opacity = buttonOpacity;
  },

  mouseEnterHandler: function () {
    portfoloioJs.mouseHelper(this, "35%", 1, "35%", 1);
    const buttonLearnMore = this.querySelector(".learn_more_button");
    const indexProject = buttonLearnMore.getAttribute(
      constants.DATA_INDEX_ATTRIBUE
    );
    portfoloioJs.objCurrentProjectLogic = projects[indexProject];
    portfoloioJs.sliderIndex = 0;
  },
  mouseLeaveHandler: function () {
    portfoloioJs.mouseHelper(this, 0, 0, 0, 0);
  },
  resetState: function (domElement) {
    const newFunc = portfoloioJs.mouseLeaveHandler.bind(domElement);
    newFunc();
  },

  initMouseEnterExit: function () {
    const projectsRootElem = document.getElementById("id_projects");
    for (let index = 0; index < projects.length; index++) {
      const project = projects[index];
      const projectDomObject = potfolioView.createNewProjectDomElement(
        projectsRootElem,
        project,
        index
      );

      portfoloioJs.resetState(projectDomObject);
      projectDomObject.addEventListener(
        "mouseenter",
        portfoloioJs.mouseEnterHandler
      );
      projectDomObject.addEventListener(
        "mouseleave",
        portfoloioJs.mouseLeaveHandler
      );

      portfoloioJs.mapProjectTitleToProjectDomObject.set(
        project.title,
        projectDomObject
      );
    }
  },
  //  ************* details **************
  popupIsActive: function () {
    potfolioView.getElemCenterScreen().style.zIndex ===
      constants.POPUP_ON_ZINDEX;
  },
  showDetails: function () {
    potfolioView.getElemCenterScreen().style.visibility = "visible";
    potfolioView.getElemCenterScreen().style.zIndex = constants.POPUP_ON_ZINDEX;
  },

  /**
   * hideDetails is used with onclick on the html because iconify might not be ready
   */
  hideDetails: function () {
    potfolioView.getElemCenterScreen().style.visibility = "hidden";
    potfolioView.getElemCenterScreen().style.zIndex =
      constants.POPUP_OFF_ZINDEX;
  },

  closeHandler: function () {
    portfoloioJs.hideDetails();
  },

  /**
   * slideLeftHandler is used with onclick on the html because iconify might not be ready
   */
  slideLeftHandler: function () {
    if (portfoloioJs.sliderIndex === 0) {
      portfoloioJs.sliderIndex =
        portfoloioJs.objCurrentProjectLogic.imgsSliderFileNames.length - 1;
    } else {
      portfoloioJs.sliderIndex--;
    }
    potfolioView.setCurrentSlideImage(
      portfoloioJs.objCurrentProjectLogic,
      portfoloioJs.sliderIndex
    );
  },

  /**
   * slideRightHandler is used with onclick on the html because iconify might not be ready
   */
  slideRightHandler: function () {
    if (
      portfoloioJs.sliderIndex + 1 ===
      portfoloioJs.objCurrentProjectLogic.imgsSliderFileNames.length
    ) {
      portfoloioJs.sliderIndex = 0;
    } else {
      portfoloioJs.sliderIndex++;
    }
    potfolioView.setCurrentSlideImage(
      portfoloioJs.objCurrentProjectLogic,
      portfoloioJs.sliderIndex
    );
  },

  initDetails: function () {
    // hideDetails is also th click handler of button_close
    portfoloioJs.hideDetails();

    const listLearnMoreButton = document.querySelectorAll(
      ".project_container_back_side .learn_more_button"
    );

    listLearnMoreButton.forEach((elemLearnMoreButton) => {
      const index = elemLearnMoreButton.getAttribute(
        constants.DATA_INDEX_ATTRIBUE
      );

      elemLearnMoreButton.onclick = () => {
        const objProject = projects[index];
        portfoloioJs.showDetails();
        potfolioView.fillDetailsDomElement(objProject);
      };
    });
  },

  initPopupDetails: function () {
    fatherDomElement = document.getElementById("id_popup_details");
    potfolioView.createPopupDetails(fatherDomElement);
  },

  menuItemClickHandler: (elemNewSelectedMenuItem) => {
    // remove selected from prev and add default
    portfoloioJs.removeClassFromCurrentMenuItem(
      constants.CLASS_MENU_BUTTON_ACTIVE_COLORS
    );
    portfoloioJs.addClassToCurrentMenuItem(
      constants.CLASS_MENU_BUTTON_DEFAULT_COLORS
    );

    // set current to new
    portfoloioJs.elemCurrentMenuItem = elemNewSelectedMenuItem;

    // remove default from new selected and add selected
    portfoloioJs.removeClassFromCurrentMenuItem(
      constants.CLASS_MENU_BUTTON_DEFAULT_COLORS
    );
    portfoloioJs.addClassToCurrentMenuItem(
      constants.CLASS_MENU_BUTTON_ACTIVE_COLORS
    );

    const selectedTechName = elemNewSelectedMenuItem.innerText;
    portfoloioJs.showProjectsByTech(selectedTechName);
  },

  addClassToCurrentMenuItem: function (nameClass) {
    portfoloioJs.elemCurrentMenuItem.className += ` ${nameClass}`;
  },

  removeClassFromCurrentMenuItem: function (nameClass) {
    portfoloioJs.elemCurrentMenuItem.className =
      portfoloioJs.elemCurrentMenuItem.className.replace(nameClass, "");
  },

  initMenu: function () {
    fatherDomElement = document.getElementById("menu");
    techCategories.forEach((techCategory) => {
      fatherDomElement.innerHTML += ` <button onclick='portfoloioJs.menuItemClickHandler(this)' 
      class='button menu_button 
      ${constants.CLASS_MENU_BUTTON_DEFAULT_COLORS}'>${techCategory}</button>`;
    });
    portfoloioJs.elemCurrentMenuItem =
      fatherDomElement.querySelector(".menu_button");
    portfoloioJs.removeClassFromCurrentMenuItem(
      constants.CLASS_MENU_BUTTON_DEFAULT_COLORS
    );
    portfoloioJs.addClassToCurrentMenuItem(
      constants.CLASS_MENU_BUTTON_ACTIVE_COLORS
    );
  },
};

// ************* main **************
document.title = projectsOwner;

portfoloioJs.initMenu();
portfoloioJs.initPopupDetails();
portfoloioJs.initMouseEnterExit();
portfoloioJs.initDetails();
