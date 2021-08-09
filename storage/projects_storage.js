const projectsOwner = 'Nathan Krasney';
const projects = [
  new ProjectLogic(
    "proj1",
    "proj1 sub title",
    ["React", "JavaScript"],
    "proj1 description",
    "white-water-lily-5087465_640.jpg",
    ["slide1.png" , "slide2.png"],
    0,
    new MoreInfo('https://www.ynet.co.il/home/0,7340,L-8,00.html',true,constants.modeSite)
  ),
  new ProjectLogic(
    "proj2",
    "proj2 sub title",
    ["ASP.Net"],
    "proj2 description",
    "white-water-lily-5087465_640.jpg",
    ["slide1.png"],
    1,
    new MoreInfo('https://www.youtube.com/watch?v=_vRacVqNdTI',true,constants.modeVideo)
  ),
];
