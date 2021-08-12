function getImageUrl(imageFileName) {
  return `images/${imageFileName}`;
}

const getViewText = (projectLogicObj) => {
  let viewText;
  switch (projectLogicObj.moreInfo.mode) {
    case constants.MODE_SITE:
      viewText = "View Site";
      break;

    case constants.MODE_VIDEO:
      viewText = "View Video";
      break;

    default:
      console.log(`Error : unexpected mode ${projectLogicObj.moreInfo.mode}`);
  }

  return viewText;
};

const potfolioView = {
  getElemCenterScreen: function () {
    return document.querySelector("#id_popup_details .center_screen");
  },
  createPopupDetails: function (fatherDomElement) {
    fatherDomElement.innerHTML += `<div
      class="center_screen popup project_details_container"
      style="background: white"
    >
      <div class="project_details_container_top">
      <i onclick='portfoloioJs.slideLeftHandler()' 
        class="button_left iconify arrow" 
        data-icon="mdi:chevron-left">
      </i>
        <i onclick='portfoloioJs.slideRightHandler()'
        class="button_right iconify arrow"
        data-icon="mdi:chevron-right"
        ></i>
      </div>
      <div class="project_details_container_bottom">
        <h2 class="title"></h2>
        <h4 class="project_category"></h4>
        <p class="description"></p>
        <div class="view_site">
          <span class="iconify" data-icon="mdi:open-in-new"></span>
          <a href="" target="_blank"></a>
        </div>
        <span class="button_close button iconify" onclick='portfoloioJs.closeHandler()' data-icon="mdi:close"></span>
      </div>
    </div>
`;
  },

  setCurrentSlideImage: function (projectLogicObj, indexSlider) {
    const imagePath = getImageUrl(
      projectLogicObj.imgsSliderFileNames[indexSlider]
    );
    const backgroundImage = `url('${imagePath}')`;
    document.querySelector(
      "#id_popup_details .project_details_container_top"
    ).style.backgroundImage = backgroundImage;
  },

  fillDetailsDomElement: function (projectLogicObj) {
    const elemIdPopupDetails = document.getElementById("id_popup_details");
    this.setCurrentSlideImage(projectLogicObj, 0);
    elemIdPopupDetails.querySelector(".title").innerText =
      projectLogicObj.title;
    elemIdPopupDetails.querySelector(".project_category").innerText =
      projectLogicObj.category;
    elemIdPopupDetails.querySelector(".description").innerText =
      projectLogicObj.description;

    const elemMoreInfo = elemIdPopupDetails.querySelector(".view_site");
    const elemMoreInfoUrl = elemIdPopupDetails.querySelector(".view_site > a");
    elemMoreInfoUrl.href = projectLogicObj.moreInfo.url;
    elemMoreInfo.style.display = projectLogicObj.moreInfo.show
      ? "block"
      : "none";
    elemMoreInfoUrl.innerText = getViewText(projectLogicObj);
  },

  createNewProjectDomElement: function (fatherDomElement, projectLogicObj,indexProject) {
    const imagePath = getImageUrl(projectLogicObj.backgroundImgFileName);
    let techs = "";
    for (let index = 0; index < projectLogicObj.techs.length; index++) {
      const tech = projectLogicObj.techs[index];
      techs += tech;
      if (index + 1 < projectLogicObj.techs.length) {
        // we have another item
        techs += " / ";
      }
    }

    let projectContainerDomElement = document.createElement("div");
    projectContainerDomElement.className = "project_container";
    projectContainerDomElement.innerHTML = `<img
          class="project_container_front_side"
          src="${imagePath}"
          alt="${projectLogicObj.title}"
        >
        <div class="project_container_back_side">
          <div class="back_side_container">
            <div class="back_side_container_item">
              <div class="top_text">
                <h3 class="title">${projectLogicObj.title}</h3>
                <p class="techs">${techs}</p>
              </div>
            </div>
            <div class="back_side_container_item">
              <button class="learn_more_button" ${constants.DATA_INDEX_ATTRIBUE}=${indexProject}>LEARN MORE</button>
            </div>
          </div>
        </div>`;

    fatherDomElement.appendChild(projectContainerDomElement);
    return projectContainerDomElement; // return the created projectContainer
  },
};
