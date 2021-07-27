function Project(
  title,
  subTitle,
  techs,
  description,
  backgroundImgFileName,
  imgsSliderFileNames
) {
  this.title = title;
  this.subTitle = subTitle;
  this.description = description;
  this.techs = techs;
  this.backgroundImgFileName = backgroundImgFileName;
  this.imgsSliderFileNames = imgsSliderFileNames;
}

const constants = {
    PROJECT_CLASS_NAME : 'project',
    TEXT_ON_BACKGROUND_IMG_PROJECT_CLASS_NAME : 'project_text_animation',
}