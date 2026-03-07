const Api_Key = "AIzaSyCc9h59c8hWwBWRU0lKxRN6LNQEfSEH7Nw";

async function generateImage() {
    const promt = document.getElementById("promt").value.trim();

    if(!promt) return alert("Please enter a prompt to generate an image.");
    document.getElementById("result").innerHTML = '<div class="loading-text">Generating image...</div>';

    const form = new FormData();
    form.append("promt", promt);

    try {
        const res = await fetch("https://clipdrop-api.co/text-to-image/v1",
             {
            method: "POST",
            headers:{"x-api-key":Api_Key},
            body: form,
        });
        

        const blob = await res.blob();
        const imageUrl = URL.createObjectURL(blob);

        document.getElementById("result").innerHTML = `
        <div class="image-wrapper" id="image-container">
        <div class="icon-btns">
            <button onclick="downloadImage()"><i class="fa-solid fa-download"></i></button>
            <button onclick="deleteImage()"><i class="fa-solid fa-trash"></i></button>
        </div>
            <img id="generated-image" src="https://picsum.photos/id/237/536/354" alt="Generated Image">
     </div>`;

        } catch (error) {

          } 
}