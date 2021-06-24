import YLButton from 'components/custom-field/YLButton';
import React, { useState } from 'react';
import doraemon from 'assets/images/lure_logo.jpeg'

function AddTextToModelTab(props) {
    const { onAddText } = props;
    const [text, setText] = useState('');

    const canvasRef = React.useRef(null)
    let img = new Image();
    img.src = doraemon;
    img.crossOrigin = "anonymous"
    React.useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        draw(ctx)
    }, [text])
    function scalePreserveAspectRatio(imgW, imgH, maxW, maxH) {
        return (Math.min((maxW / imgW), (maxH / imgH)));
    }
    function draw(ctx) {
        const canvas = canvasRef.current

        let w = img.width;
        let h = img.height;

        // resize img to fit in the canvas 
        // You can alternately request img to fit into any specified width/height
        let sizer = scalePreserveAspectRatio(w, h, canvas.width, canvas.height);
        console.log("sizer:", sizer);

        // resize canvas height to fit with the image
        canvas.height = h * sizer;
        ctx.drawImage(img, 0, 0, w, h, 0, 0, w * sizer, h * sizer);


        let textSize = 100;
        let fontFamily = "'Dancing Script'";

        // write text to canvas
        ctx.fillStyle = "#bc2929";
        // ctx.font = "50px 'Kirang Haerang'";
        ctx.font = textSize + "px " + fontFamily;
        console.log("font:", ctx.font);

        let textString = text,
            textWidth = ctx.measureText(textString).width;

        console.log("text width size:", textSize);
        ctx.fillText(textString, (canvas.width / 2) - (textWidth / 2), img.height / 2 + textSize/2);
    }

    function captureImg() {

        const myImage = canvasRef.current.toDataURL("image/png");
        console.log("my image:", myImage);
        onAddText(myImage);

    }

    function CanvasText() {
        return (<canvas
            className="d-none"
            ref={canvasRef}
            width={img.width}
            height={img.height}
        // onClick={handleCanvasClick}
        />);

    }

    return (
        <div>
            <input type='text' className="w-100" defaultValue={text} onChange={(e) => setText(e.target.value)} />
            <YLButton variant="primary" type="button" name="canvasText" onClick={captureImg}>Capture</YLButton>
            <CanvasText />
        </div>
    );
}

export default AddTextToModelTab;