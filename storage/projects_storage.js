const projectsOwner = "Nathan Krasney";
const techCategories = [constants.MENU_ITEM_ALL, "React", "ASP.net"];
const projects = [
  new ProjectLogic(
    "Proj1",
    "proj1 sub title",
    ["JavaScript" , 'React'],
    "proj1 description",
    "white-water-lily-5087465_640.jpg",
    ["slide1.png", "slide2.png"],
    0,
    new MoreInfo(
      "https://www.ynet.co.il/home/0,7340,L-8,00.html",
      true,
      constants.MODE_SITE
    )
  ),
  new ProjectLogic(
    "proj2",
    "proj2 sub title",
    ["aSP.Net"],
    "proj2 description",
    "ocean-3605547_640.jpg",
    ["slide1.png"],
    1,
    new MoreInfo(
      "https://www.youtube.com/watch?v=_vRacVqNdTI",
      true,
      constants.MODE_VIDEO
    )
  ),
];
