function getImageUrl(imageFileName) {
  return `images/${imageFileName}`;
}

const potfolioView = {
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
    this.setCurrentSlideImage(projectLogicObj, 0);
    document.querySelector("#id_popup_details .title").innerText =
      projectLogicObj.title;
    document.querySelector("#id_popup_details .sub_title").innerText =
      projectLogicObj.subTitle;
    document.querySelector("#id_popup_details .description").innerText =
      projectLogicObj.description;

    const elemMoreInfo = document.querySelector("#id_popup_details .view_site");
    const elemMoreInfoUrl = document.querySelector(
      "#id_popup_details .view_site > a"
    );
    elemMoreInfoUrl.href = projectLogicObj.moreInfo.url;
    if (!projectLogicObj.moreInfo.show) {
      elemMoreInfo.style.display = "none";
    }
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
