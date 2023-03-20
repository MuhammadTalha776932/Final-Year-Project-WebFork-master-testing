import React, { useState, useEffect } from "react";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gpsBlockBasic from "grapesjs-blocks-basic";
import * as ImagePlugin from "grapesjs-aviary";
import * as NavbarPlugin from "grapesjs-navbar";
import { GetTokenSilently } from "../../LocalStorage/util";
import "./Editor.index.style.css";
import { useAuth0 } from "@auth0/auth0-react";
import PreNavbar from "../../components/PreNavbar";
import useIsAuthStore from "./../../store/IsAuth.store";
import NavBarComponent, { TemplateComponent } from "./util";

const EditorIndex = () => {
  //   const showMenu = (toggleId, navId) => {
  //   const toggle = document.getElementById(toggleId),
  //     nav = document.getElementById(navId);
  //   // Validate that variables exist
  //   if (toggle && nav) {
  //     toggle.addEventListener("click", () => {
  //       nav.classList.toggle("show-menu");
  //     });
  //   }
  // };
  // showMenu("nav-toggle", "nav-menu");

  const IsAuth = useIsAuthStore((state) => state?.IsAuth);
  const [editor, setEditor] = useState(null);
  const { getAccessTokenSilently, isAuthenticated, loginWithPopup } =
    useAuth0();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    let isRender = true;
    if (isRender) {
      let token = GetTokenSilently("token");
      const editors = grapesjs.init({
        container: "#Editor",
        plugins: [gjsPresetWebpage, gpsBlockBasic, ImagePlugin, NavbarPlugin],
        pluginsOpts: {
          gjsPresetWebpage: {
            exportOpts: {
              filenamePfx: "html",
              filename: "index",
              addExportBtn: 1,
              btnLabel: "Export to ZIP",
            },
          },
          gpsBlockBasic: {},
          ImagePlugin: {},
          NavbarPlugin: {},
        },
        storageManager: {
          type: "local", //"remote",
          stepsBeforeSave: 1,
          contentTypeJson: true,
          autosave: 1,
          autoload: 1,
          storeComponents: true,
          storeStyles: true,
          storeHtml: true,
          storeCss: true,
          options: {
            local: {
              // Options for the `local` type
              key: "gjsProject", // The key for the local storage
            },
          },

          // headers: {
          //   "Content-Type": "application/json",
          //   authorization: `Bearer ${token}`,
          // },
          // id: "mycustom",
          // urlStore: `http://localhost:3001/editor/customized`,
          // urlLoad: `http://localhost:3001/editor/customized`,
        },
        blockManager: {
          blocks: [NavBarComponent, TemplateComponent],
        },
        canvas: {
          styles: [
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
          ],
          scripts: [
            `https://unpkg.com/boxicons@2.1.4/dist/boxicons.js`,
            "https://cdn.tailwindcss.com",
            "https://unpkg.com/tailwindcss-jit-cdn",
          ],
        },
        //
        // layerManager: {
        //   appendTo: '#layers-container',
        // },
        // traitManager: {
        //   appendTo: '#trait-container',
        // },
        // selectorManager: {
        //   appendTo: '#styles-container',
        // }
      });
      setEditor(editors);
    }
    return () => {
      isRender = false;
    };
  }, [IsAuth, getAccessTokenSilently]);
  return (
    <>
      <PreNavbar />
      <div id="Editor"></div>
    </>
  );
};

export default EditorIndex;

// {/* <header className="l-header" id="header">
//   <nav className="nav bd-container">
//     <a href="#" className="nav__logo">
//       WEBFORK
//     </a>
//     <div className="nav__menu" id="nav-menu">
//       <ul className="nav__list">
//         <li className="nav__item">
//           <label>Color</label> <br />
//           <input type="color" name="selectColor" id="color" />
//         </li>
//         <li className="nav__item">
//           <label>Font Size</label> <br />
//           <input type="number" name="FontSize" id="fontsize" className="border border-black"/>
//         </li>
//        <li className="nav__item">
//           <label>Font Family</label> <br />
//           <input type="text" name="FontFamily" id="fontfamily" className="border border-black"/>
//         </li>
//        <li className="nav__item">
//           <label>Background Color</label> <br />
//           <input type="color" name="BackgroundColor" id="backgroundcolor"/>
//         </li>
//       </ul>
//     </div>
//     <div className="nav__toggle" id="nav-toggle">
//       <i className="bx bx-grid-alt"></i>
//     </div>
//   </nav>
// </header> */}
