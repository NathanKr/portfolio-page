function MoreInfo(url, show, mode) {
  this.url = url;
  this.show = show;
  this.mode = mode; //video or site
}

function ProjectLogic(
  title,
  category,
  techs,
  description,
  backgroundImgFileName,
  imgsSliderFileNames,
  index,
  moreInfo
) {
  this.title = title;
  this.category = category;
  this.description = description;
  this.techs = techs;
  this.backgroundImgFileName = backgroundImgFileName;
  this.imgsSliderFileNames = imgsSliderFileNames;
  this.index = index;
  this.moreInfo = moreInfo;
}
