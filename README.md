<h2>Motivation</h2>
Any software developer \ software house need a portfolio page. You might take all ready implemented one like in WIX but as a developer i like to implement it my self

<h2>Inspiration</h2>
I like the portfolio page <a href='http://findmatthew.com/'>here</a> so i am taking the UI design from there and doing the implementation my self

<h2>Project guidlines</h2>
<ul>
<li>Static web site</li>
<li>Nice and simple UI</li>
<li>Responsive</li>
<li>Configureable - Easy to add new project in the portfolio</li>
<li>Generic - This is only one page so i am  using vanila js</li>
<li>Simplicity - no external module are used beside fonts and icons</li>
</ul>

<h2>Setup</h2>
If you want to use this project as your portfolio page you need to do the following 
<ul>
<li>Replace projects_storage.js with your own values. </li>
<li>Replace matching images in images directory. Front project image is 390px X 300px , project sliders images are 700px X 350 px. Your images can be different but try to keep the aspect ratio or change css variables (main_project_background_image_width,main_project_background_image_height,popup_width) </li>
</ul>


<h2>Points of interest</h2>
<ul>
<li>In general projects_storage.js should be projects_storage.json but there was a problem reading the file using fetch. This problem can be fixed with proper development server as with react but i prefered in this small project to simply use js file</li>
</ul>


<h2>Todos</h2>
<ul>
<li>tranisition on view_site is not smooth so remarked</li>
<li>center vertically svg in view_state not using top 3px. use robust approach</li>
<li>projects underline is not as in the reference project </li>
</ul>