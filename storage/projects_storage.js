const projectsOwner = "Nathan Krasney";
const techCategories = [
  constants.MENU_ITEM_ALL,
  "React",
  "ASP.net",
  "Node",
  "Android",
];
const projects = [
  new ProjectLogic(
    "Nathan Krasney Mentor \\ Instructor",
    "Marketing  : Personal Web Site",
    ["React", "Node", "Express", "Digital Ocean", "Nginx", "SSL"],
    "Static SPA web site based on React ",
    "nathan_krasney_com.png",
    [
      "nathan_krasney_com_slider_1.png",
      "nathan_krasney_com_slider_2.png",
      "nathan_krasney_com_slider_3.png",
    ],
    new MoreInfo("https://nathankrasney.com/", true,constants.MODE_SITE)
  ),
  new ProjectLogic(
    "Cash On Tab",
    "Reatail : Point of Sale",
    [
      "C#",
      "Java",
      "Android",
      "RS232",
      "Credit Card API - Shva",
      "HTTP",
      "SQLite",
      "Web API",
    ],
    "Cash On Tab is a computerize and compact Point Of Sale with an admin system on the cloud. The first version was implemented using C# on windows mobile device and the next version was implemented using java on an android device",
    "cash-on-tab.png",
    ["cash_on_tab_slider_1.png"],
    new MoreInfo(
      "https://www.autosoft.co.il/%d7%9e%d7%95%d7%a6%d7%a8%d7%99-%d7%90%d7%95%d7%98%d7%95%d7%a1%d7%95%d7%a4%d7%98/cashontab/",
      true,
      constants.MODE_SITE
    )
  ),
  new ProjectLogic(
    "Ultrashape",
    "Medical Devices : Body Contouring",
    [
      "C#",
      "RS232",
      "Digital IO",
      ".Net Compact",
      "WinForm",
      "WPF",
      "OOP",
      "OOD",
      "UML",
    ],
    "UltraShape® is the first and only FDA-cleared, non-invasive body-shaping procedure to use focused, pulsed ultrasound energy to selectively destroy fat cells. Responsible for the development of software to hardware interfaces and software tools for the transducers production lines",
    "ultrashape.png",
    ["ultrashape_slider_1.png", "ultrashape_slider_2.png"],
    new MoreInfo(
      "https://candelamedical.com/na/patient/product/ultrashape",
      true,
      constants.MODE_SITE
    )
  ),
  new ProjectLogic(
    "Learn Online Courses",
    "eLearning : Create and Learn Courses Online",
    [
      "ASP.net MVC",
      "HTML",
      "CSS",
      "JavaScript",
      "Entity Framework",
      "SQL Server",
      "Azure",
      "SQL",
      "Pay Pal API",
    ],
    "Learn Online Courses is a web platform that help teachers to create online courses and help students to learn courses online anytime anywhere.",
    "learn_online_courses.png",
    [
      "learn_online_courses_slider_1.png",
      "learn_online_courses_slider_2.png",
      "learn_online_courses_slider_3.png",
      "learn_online_courses_slider_4.png",
    ],
    new MoreInfo("", false) //todo change to video
  ),
  new ProjectLogic(
    "Wind Notifier",
    "Sport : Event Notification",
    [
      "Node",
      "Express",
      "MongoDB",
      "React",
      "Redis",
      "SendGrid",
      "Typescript",
      "Jest",
      "REST API",
    ],
    "Wind Notifier allows wind and kite surfers to receive email notifications when the wind is strong. It eliminates the need to manually poll wind stations for strong winds",
    "wind_notifier.jpg",
    ["wind_notifier_slider_1.png", "wind_notifier_slider_2.png"],
    new MoreInfo("", false)
  ),
];
