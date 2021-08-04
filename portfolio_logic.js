function ProjectLogic(
  title,
  subTitle,
  techs,
  description,
  backgroundImgFileName,
  imgsSliderFileNames,
  index
) {
  this.title = title;
  this.subTitle = subTitle;
  this.description = description;
  this.techs = techs;
  this.backgroundImgFileName = backgroundImgFileName;
  this.imgsSliderFileNames = imgsSliderFileNames;
  this.index = index;
}

const constants = {
  DATA_INDEX_ATTRIBUE : 'data-index'
}