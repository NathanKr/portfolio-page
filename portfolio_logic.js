
function MoreInfo(url,show,mode){
  this.url = url;
  this.show = show;
  this.mode = mode; //video or site
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

