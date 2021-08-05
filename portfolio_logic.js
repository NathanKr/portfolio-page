function MoreInfo(url,show){
  this.url = url;
  this.show = show;
}

function ProjectLogic(
  title,
  subTitle,
  techs,
  description,
  backgroundImgFileName,
  imgsSliderFileNames,
  index,
  moreInfo
) {
  this.title = title;
  this.subTitle = subTitle;
  this.description = description;
  this.techs = techs;
  this.backgroundImgFileName = backgroundImgFileName;
  this.imgsSliderFileNames = imgsSliderFileNames;
  this.index = index;
  this.moreInfo = moreInfo
}

const constants = {
  DATA_INDEX_ATTRIBUE : 'data-index'
}