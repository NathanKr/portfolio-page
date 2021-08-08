function getImageUrl(imageFileName) {
  return `images/${imageFileName}`;
}

const getViewText = (projectLogicObj) => {
  let viewText;
  switch (projectLogicObj.moreInfo.mode) {
    case constants.modeSite:
      viewText = "View Site";
      break;

    case constants.modeVideo:
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
        <i onclick='slideLeftHandler()' 
         style="background: url('./icons/chevron-left-48.png');" 
         class="button_left icon arrow"></i>
        <i onclick='slideRightHandler()'
          style="background: url('./icons/chevron-right-48.png');"
          class="button_right icon arrow"
        ></i>
      </div>
      <div class="project_details_container_bottom">
        <h2 class="title"></h2>
        <h4 class="sub_title"></h4>
        <p class="description"></p>
        <div class="view_site">
          <i class="icon" style="background: url('./icons/open-in-new-48.png');"></i>
          <a href="" target="_blank"></a>
        </div>
        <span class="button_close iconify" onclick='closeHandler()' data-icon="mdi:close"></span>
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
    elemIdPopupDetails.querySelector(".sub_title").innerText =
      projectLogicObj.subTitle;
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

  createNewProjectDomElement: function (fatherDomElement, projectLogicObj) {
    const imagePath = getImageUrl(projectLogicObj.backgroundImgFileName);
    const background = `url('${imagePath}')`;
    let techs = "";
    for (let index = 0; index < projectLogicObj.techs.length; index++) {
      const tech = projectLogicObj.techs[index];
      techs += tech;
      if (index + 1 < projectLogicObj.techs.length) {
        // we have another item
        techs += " / ";
      }
    }

    const projectContainer = `<div class="project_container">
        <div
          class="project_container_front_side"
          style="
            background-image: ${background};
          "
        ></div>
        <div class="project_container_back_side">
          <div class="back_side_container">
            <div class="back_side_container_item">
              <div class="top_text">
                <h3 class="title">${projectLogicObj.title}</h3>
                <p class="techs">${techs}</p>
              </div>
            </div>
            <div class="back_side_container_item">
              <button class="learn_more_button" ${constants.DATA_INDEX_ATTRIBUE}=${projectLogicObj.index}>LEARN MORE</button>
            </div>
          </div>
        </div>
      </div>`;

    fatherDomElement.innerHTML += projectContainer;
  },
};
