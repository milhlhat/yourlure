import g1 from "assets/images/texture1.png";
import g2 from "assets/images/texture2.png";
import g3 from "assets/images/texture3.png";
import g4 from "assets/images/texture4.png";
import g5 from "assets/images/texture5.png";
import g6 from "assets/images/texture6.jpg";
import g7 from "assets/images/texture7.jpg";
import g8 from "assets/images/texture8.jpg";
import g9 from "assets/images/texture9.jpg";
import g10 from "assets/images/texture10.png";
import g11 from "assets/images/texture11.jpg";
import g12 from "assets/images/texture12.jpg";
import g15 from "assets/images/texture15.png";
import g16 from "assets/images/texture16.png";
import g17 from "assets/images/lure_logo.jpeg";

// export const images = [g1, g2, g3, g4,g5, g6, g7, g8, g9, g10, g11, g12, g15, g16, g17];

const dumyCustomize = {
  initMaterials: () => {
    return {
      // đầu vào của FE cần
      modelId: 31,
      name: "nhái hơi mặc định",
      url: "model/Saucy Swimmers.glb",
      defaultMaterials: [
        //customizeInfo

        {
          materialId: 8,
          defaultName: "Belly", // cái này để map với model để translate
          vnName: "Bụng", // cái này để hiển thị
          img: "",
          color: "",
          text: "",
          textColor: "",
          textFont: "",
          textSize: "",

          canAddText: true,
          canAddImg: true,
          canAddColor: true,
          textures: [
            {
              textureId: 1,
              textureUrl: "images/10-min.jpg",
              isDefault: true,
            },
            {
              textureId: 2,
              textureUrl: "images/bo-6-spinner-SP06-4.jpg",
              isDefault: true,
            },
          ],
        },
        {
          materialId: 2,
          defaultName: "back", // cái này để map với model để translate
          vnName: "Lưng", // cái này để hiển thị
          img: "",
          color: "",
          text: "",
          textColor: "",
          textFont: "",
          textSize: "",

          canAddText: true,
          canAddImg: true,
          canAddColor: true,
          textures: [
            {
              textureId: 5,
              textureUrl: "images/CR28.jpg",
              sDefault: true,
            },
            {
              textureId: 6,
              textureUrl: "images/DK8.jpg",
              sDefault: true,
            },
          ],
        },
      ],
    };
  },
};
export default dumyCustomize;

// <!DOCTYPE html>
// <html>
// <body>

// <h3>A demonstration of how to access a File Upload Button</h3>

// <input type="file" id="myFile">

// <p>Click the "Try it" button to disable the file upload button.</p>

// <button onclick="Main()">Try it</button>

// <script>
// const toBase64 = file => new Promise((resolve, reject) => {
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = () => resolve(reader.result);
//   reader.onerror = error => reject(error);
// });

// async function Main() {
//  const file = document.querySelector('#myFile').files[0];
//  console.log(await toBase64(file));
// }

// </script>

// </body>
// </html>
