const Api_Key = "5b846a49735a99810cdc31abec6854ee24d5fbacc99f86e37ceed1d6ef90051b44448c931171fac41740222918ef0def";

async function generateImage() {
    const promt = document.getElementById("prompt").value.trim();

    if(!promt) return alert("Please enter a prompt to generate an image.");
    document.getElementById("result").innerHTML = '<div class="loading-text">Generating image...</div>';

    const form = new FormData();
    form.append("prompt", promt);

    try {
        const res = await fetch("https://clipdrop-api.co/text-to-image/v1",
             {
            method: "POST",
            headers:{"x-api-key":Api_Key},
            body: form,
        });
        
        if (!res.ok) throw new Error(`<div class="loading-text" style="color: red;" > Image generation failed</div>`);
        
        const blob = await res.blob();
        const imageUrl = URL.createObjectURL(blob);

        document.getElementById("result").innerHTML = `
                <div class="image-wrapper" id="image-container">
                <div class="icon-btns">
                    <button onclick="downloadImage('${imageUrl}')"><i class="fa-solid fa-download"></i></button>
                    <button onclick="deleteImage()"><i class="fa-solid fa-trash"></i></button>
                </div>
                    <img id="generated-image" src="${imageUrl}" alt="Generated Image">
            </div>`;

        } catch (error) {
              document.getElementById("result").innerHTML =`<div class="loading-text" style="color: red;">
              ${error.message}</div>`;
        } 

   
        }
          function downloadImage(Url) {
                const a = document.createElement("a");
                a.href = Url;
                a.download = "ai-image.png";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
         

}          
         function deleteImage() {
                document.getElementById("result").innerHTML = ``;

}
