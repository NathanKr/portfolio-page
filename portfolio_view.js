function getImageUrl(imageFileName){
    return `images/${imageFileName}`
}

const potfolioView = {
    createProjectDomElement : function (fatherDomElement,projectLogicObj){
        console.log(projectLogicObj);
        const class_name = constants.TEXT_ON_BACKGROUND_IMG_PROJECT_CLASS_NAME
        let projectDomElement = document.createElement('div');
        projectDomElement.innerHTML += `<h2 class=${class_name}>${projectLogicObj.title}</h2>`
        projectDomElement.innerHTML += `<h4 class=${class_name}>${projectLogicObj.subTitle}</h4>`
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
        projectDomElement.innerHTML += `<p class=${class_name}>${techs}</p>`
        const imagePath = getImageUrl(projectLogicObj.backgroundImgFileName)
        projectDomElement.style.background = `url('${imagePath}')`;
        // projectDomElement.style.color = "rgba(0,0,0,0)";
        // projectDomElement.style.opacity = 0.5;
        projectDomElement.className = constants.PROJECT_CLASS_NAME
        
        fatherDomElement.appendChild(projectDomElement)
        return projectDomElement;
    }
}

