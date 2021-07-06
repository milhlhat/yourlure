const dumyCustomize = {
  initMaterials: () => {
    return {
      // đầu vào của FE cần
      customizeId: 10,
      model3dId: 31,
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
              isDefault: false,
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
              isDefault: true,
            },
            {
              textureId: 6,
              textureUrl: "images/DK8.jpg",
              isDefault: true,
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
