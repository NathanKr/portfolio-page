function getImageUrl(imageFileName){
    return `images/${imageFileName}`
}

const potfolioView = {
    createNewProjectDomElement : function (fatherDomElement,projectLogicObj){
        const imagePath = getImageUrl(projectLogicObj.backgroundImgFileName)
        const background = `url('${imagePath}')`;
        let techs = ""
        for (let index = 0; index < projectLogicObj.techs.length; index++) {
            
            const tech = projectLogicObj.techs[index];
            techs += tech
            if ((index+1) < projectLogicObj.techs.length)
            {
                // we have another item
                techs += ' / ';
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
              <button class="bottom_button">LEARN MORE</button>
            </div>
          </div>
        </div>
      </div>`

      fatherDomElement.innerHTML += projectContainer;
    } 

}

