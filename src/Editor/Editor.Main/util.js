export const NavBarComponent = {
  id: "nav",
  label: "nav",
  content: `
<nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
  <div class="container flex flex-wrap items-center justify-between mx-auto">
    <a href="https://flowbite.com/" class="flex items-center">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
`,
};
export const TemplateComponent = {
  id: "template",
  label: "template",
  content: `
 <div class="flex flex-col justify-center items-center md:h-screen md:flex-row">
    <img class="w-32 h-32" src="./assets/avatar.png" alt="avatar">
    <div class="ml-6">
      <h1 class="text-2xl md:text-5xl font-bold">Maximilian Kürschner</h1>
      <h2 class="text-xl md:text-3xl text-center md:text-left">Programonaut</h2>
    </div>
    <div class="hidden absolute bottom-6 h-12 w-12 md:block">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>

  <div>
    <h3 class="text-2xl font-bold">&lt;ABOUT /&gt;</h3>
     <div class="space-y-2">
      <p>
        <strong>Languages:</strong> <code>.c</code>, <code>.cs</code>,
        <code>.py</code>, <code>.js</code>, <code>.dart</code>
      </p>
      <p>
        <strong>Fields:</strong> <br />
        🎮 Games <br />
        ☎️ Mobile <br />
        💻 Full-Stack Web <br />
        🏠 IoT and Automation <br />
        🖥️ Other Software…
      </p>
      <p>
        <strong>Projects:</strong> <br />
        🏐
        <a href="https://play.google.com/store/apps/details?id=com.Deved.Bralls">Bralls</a>
        <br />
        🎵 <a href="https://playlist.programonaut.com/">Artist to playlist</a>
      </p>
      <p>
        Check out my
        <a href="https://programonaut.com"><strong>Website</strong></a>! <br />
        Contact me via <strong>mail@programonaut.com</strong> or
        <strong>mail@maximilian-kuerschner.de</strong>
      </p>
    </div>
  </div>

  <div>
    <h3 class="text-2xl font-bold mb-2">&lt;PROJECTS /&gt;</h3>
    <div class="grid grid-cols-1 auto-rows-fr gap-2 md:grid-cols-2">
      <div class="bg-black text-white p-3 rounded-md group">
        <h3 class="text-lg font-bold group-hover:underline">Bralls</h3>
        <p>A little game.</p>
      </div>
      <div class="bg-black text-white p-3 rounded-md group">
        <h3 class="text-lg font-bold group-hover:underline">Slide for Four</h3>
        <p>A one vs. one slide puzzle. Created for the Flutter Puzzle Hack!</p>
      </div>
    </div>
  </div>

  <div>
    <h3 class="text-2xl font-bold mb-2">&lt;CONTACT /&gt;</h3>
    <div class="grid grid-cols-1 gap-2 md:grid-cols-4">
      <div class="bg-black text-white p-2 rounded-md text-center font-bold text-xl hover:underline">Twitter</div>
      <div class="bg-black text-white p-2 rounded-md text-center font-bold text-xl hover:underline">GitHub</div>
      <div class="bg-black text-white p-2 rounded-md text-center font-bold text-xl hover:underline">Website</div>
      <div class="bg-black text-white p-2 rounded-md text-center font-bold text-xl hover:underline">E-Mail</div>
    </div>
  </div>
`,
};

export default NavBarComponent;
