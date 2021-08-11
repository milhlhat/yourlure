const dumyCustomize = {
  initMaterials: () => {
    return {
      // đầu vào của FE cần
      customizeId: 10,
      model3dId: 31,
      name: "nhái hơi mặc định",
      url: "model/Saucy Swimmers.glb",
      materials: [
        //customizeInfo
        {
          materialId: 21,
          defaultName: "lung",
          vnName: "LUNG",
          canAddImg: true,
          canAddColor: true,
          canAddText: true,
          text: "mua xuan nho nho anh yeu em",
          textFont: "",
          textColor: "",
          textSize: 70,
          color: "#eb5834",
          img: "",
          // img: "textures/lung_texture_0.png",
          textures: [
            {
              textureId: 21,
              textureUrl: "images/10-min.jpg",
              isDefault: true,
            },
          ],
        },

        {
          materialId: 22,
          defaultName: "bung",
          vnName: "BUNG",
          canAddImg: true,
          canAddColor: true,
          canAddText: true,
          text: "hú hồn chim én",
          textFont: "",
          textColor: "red",
          textSize: 60,
          color: null,
          img: null,
          textures: [
            {
              textureId: 22,
              textureUrl: "images/10-min.jpg",
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
