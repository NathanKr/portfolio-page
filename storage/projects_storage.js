const projectsOwner = "Nathan Krasney";
const techCategories = [constants.MENU_ITEM_ALL, "React", "ASP.net" , 'Node' , 'Android'];
const projects = [
  new ProjectLogic(
    "Wind Notifier",
    "Event Notification",
    [
      "Node",
      "Puppeteer",
      "Express",
      "MongoDB",
      "React",
      "Redis",
      "SendGrid",
      "Typescript",
      "Jest",
      "Digital Ocean",
      "Nginx",
      "pm2",
      "Git",
      "Microservices",
      "REST API",
    ],
    "Wind Notifier allows wind and kite surfers to receive email notifications when the wind is strong. It eliminates the need to manually poll wind stations for strong winds",
    "wave-2089959_640.jpg",
    ["slide1.png", "slide2.png"],
    0,
    new MoreInfo(
      "https://www.ynet.co.il/home/0,7340,L-8,00.html",
      true,
      constants.MODE_SITE
    )
  ),
  new ProjectLogic(
    "Cash On Tab",
    "Point of Sale",
    ['C#', "Java",'Android', 'RS232', 'Credit Card API - Shva', 'HTTP', 'SQLite', 'Web API'],
    "proj description",
    "cash-on-tab.png",
    ["slide1.png"],
    1,
    new MoreInfo(
      "https://www.youtube.com/watch?v=_vRacVqNdTI",
      true,
      constants.MODE_VIDEO
    )
  ),
];
