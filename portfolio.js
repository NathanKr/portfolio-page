const projectsRootElem = document.getElementById('projects');

for (let index = 0; index < projects.length; index++) {
  const project = projects[index];
  // console.log(project);
  potfolioView.createProjectDomElement(projectsRootElem,project)
}
// 