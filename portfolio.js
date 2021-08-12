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
    const titlesToShow = this.getProjectTitlesFromTech(desiredTechName);
    const titlesAll = this.getProjectTitlesFromTech(constants.MENU_ITEM_ALL);
    titlesAll.forEach((title) => {
      let domProjectContainer =
        this.mapProjectTitleToProjectDomObject.get(title);
      domProjectContainer.style.display = titlesToShow.includes(title)
        ? "inline-block"
        : "none";
    });
  },
  // ************* mouse enter \ exit **************
  mouseHelper: function (
    domElemProject,
    textTop,
    textOpacity,
    buttonBottom,
    buttonOpacity
  ) {
    const elemTopText = domElemProject.querySelector(".top_text");
    elemTopText.style.top = textTop;
    elemTopText.style.opacity = textOpacity;

    const elemBottomButton = domElemProject.querySelector(".learn_more_button");
    elemBottomButton.style.bottom = buttonBottom;
    elemBottomButton.style.opacity = buttonOpacity;
  },

  mouseEnterHandler: function () {
    if (!portfoloioJs.popupIsActive()) {
      // mouseEnter is not relevant once pop up is active
      portfoloioJs.mouseHelper(this, "35%", 1, "35%", 1);
      const buttonLearnMore = this.querySelector(".learn_more_button");
      const indexProject = buttonLearnMore.getAttribute(
        constants.DATA_INDEX_ATTRIBUE
      );
      portfoloioJs.objCurrentProjectLogic = projects[indexProject];
      portfoloioJs.sliderIndex = 0;
    }
  },
  mouseLeaveHandler: function () {
    if (!portfoloioJs.popupIsActive()) {
      // mouseLeave is not relevant once pop up is active
      portfoloioJs.mouseHelper(this, 0, 0, 0, 0);
    }
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

      this.resetState(projectDomObject);
      projectDomObject.addEventListener("mouseenter", this.mouseEnterHandler);
      projectDomObject.addEventListener("mouseleave", this.mouseLeaveHandler);

      this.mapProjectTitleToProjectDomObject.set(
        project.title,
        projectDomObject
      );
    }
  },
  //  ************* details **************
  popupIsActive: function () {
    return (potfolioView.getElemCenterScreen().style.zIndex ===
      constants.POPUP_ON_ZINDEX);
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
    this.hideDetails();
  },

  /**
   * slideLeftHandler is used with onclick on the html because iconify might not be ready
   */
  slideLeftHandler: function () {
    if (this.sliderIndex === 0) {
      this.sliderIndex =
        this.objCurrentProjectLogic.imgsSliderFileNames.length - 1;
    } else {
      this.sliderIndex--;
    }
    potfolioView.setCurrentSlideImage(
      this.objCurrentProjectLogic,
      this.sliderIndex
    );
  },

  /**
   * slideRightHandler is used with onclick on the html because iconify might not be ready
   */
  slideRightHandler: function () {
    if (
      this.sliderIndex + 1 ===
      this.objCurrentProjectLogic.imgsSliderFileNames.length
    ) {
      this.sliderIndex = 0;
    } else {
      this.sliderIndex++;
    }
    potfolioView.setCurrentSlideImage(
      this.objCurrentProjectLogic,
      this.sliderIndex
    );
  },

  initDetails: function () {
    // hideDetails is also th click handler of button_close
    this.hideDetails();

    const listLearnMoreButton = document.querySelectorAll(
      ".project_container_back_side .learn_more_button"
    );

    listLearnMoreButton.forEach((elemLearnMoreButton) => {
      const index = elemLearnMoreButton.getAttribute(
        constants.DATA_INDEX_ATTRIBUE
      );

      elemLearnMoreButton.onclick = () => {
        const objProject = projects[index];
        this.showDetails();
        potfolioView.fillDetailsDomElement(objProject);
      };
    });
  },

  initPopupDetails: function () {
    fatherDomElement = document.getElementById("id_popup_details");
    potfolioView.createPopupDetails(fatherDomElement);
  },

  menuItemClickHandler: function(elemNewSelectedMenuItem)  {
    // remove selected from prev and add default
    this.removeClassFromCurrentMenuItem(
      constants.CLASS_MENU_BUTTON_ACTIVE_COLORS
    );
    this.addClassToCurrentMenuItem(constants.CLASS_MENU_BUTTON_DEFAULT_COLORS);

    // set current to new
    this.elemCurrentMenuItem = elemNewSelectedMenuItem;

    // remove default from new selected and add selected
    this.removeClassFromCurrentMenuItem(
      constants.CLASS_MENU_BUTTON_DEFAULT_COLORS
    );
    this.addClassToCurrentMenuItem(constants.CLASS_MENU_BUTTON_ACTIVE_COLORS);

    const selectedTechName = elemNewSelectedMenuItem.innerText;
    this.showProjectsByTech(selectedTechName);
  },

  addClassToCurrentMenuItem: function (nameClass) {
    this.elemCurrentMenuItem.className += ` ${nameClass}`;
  },

  removeClassFromCurrentMenuItem: function (nameClass) {
    this.elemCurrentMenuItem.className =
      this.elemCurrentMenuItem.className.replace(nameClass, "");
  },

  initMenu: function () {
    fatherDomElement = document.getElementById("menu");
    techCategories.forEach((techCategory) => {
      fatherDomElement.innerHTML += ` <button onclick='portfoloioJs.menuItemClickHandler(this)' 
      class='button menu_button 
      ${constants.CLASS_MENU_BUTTON_DEFAULT_COLORS}'>${techCategory}</button>`;
    });
    this.elemCurrentMenuItem = fatherDomElement.querySelector(".menu_button");
    this.removeClassFromCurrentMenuItem(
      constants.CLASS_MENU_BUTTON_DEFAULT_COLORS
    );
    this.addClassToCurrentMenuItem(constants.CLASS_MENU_BUTTON_ACTIVE_COLORS);
  },
};

// ************* main **************
document.title = projectsOwner;

portfoloioJs.initMenu();
portfoloioJs.initPopupDetails();
portfoloioJs.initMouseEnterExit();
portfoloioJs.initDetails();
