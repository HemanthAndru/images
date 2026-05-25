// document.addEventListener('DOMContentLoaded',()=>{
//     const input = document.querySelector('#input');
//     const image = document.querySelector('#image');
//     const name = document.querySelector('#name');
//     const btn = document.querySelector('#button');
//     const imageList = document.querySelector('.imageList');
//     const imageContainer = document.querySelector('.imageContainer');
    
//     btn.addEventListener('click',()=>{

//         const inputvalue = input.value;
//         if(inputvalue !== ''){
           
            
//           image.innerHTML = `<img id="image" src="${input.value}">`;
//           const fname = input.addEventListener('change',(event)=>{
//               return event.target.files[0].name;
//           })
//           name.innerHTML = `<p id="name">${fname}</p>`;
//           imageList.innerHTML = `<div class="imageList">
//           ${image}
//           ${name}
//           </div>`;

//           imageContainer.innerHTML += `
//             <div class="imageStoreContainer">
//              ${imageList}
//             </div>`

//         }else{
//             console.log('something went wrong');
//         }
//     });

// });


document.addEventListener('DOMContentLoaded',async () => {
    const input = document.querySelector('#input');
    const btn = document.querySelector('#button');
    const imageContainer = document.querySelector('.imageContainer');
    const error = document.querySelector('.error');

    let imageList;
    async function loadImages(){
           const result = await fetch('http://localhost:8080/api/load',{
            method: 'GET'
           })
           imageList= await result.json();
           console.log(imageList)
           display(imageList);
          // return imageList;
}
loadImages();

    btn.addEventListener('click', async () => {
        const inputvalue = input.value.trim();

        if (inputvalue !== '') {
            error.classList.add('hidden');
           await upload();
           const imageList = await loadImages();
            
        } else {
            error.classList.remove('hidden');
            console.log('Something went wrong');
        }

        async function upload(){
            const file = input.files[0];
            const formData = new FormData();
            formData.append('image',file);
            
            try{
                const reponse = await fetch('http://localhost:8080/api/upload',{
                    method: 'POST',
                    body: formData
                });
                return;
                // const result = await reponse.json();
                // console.log('Success :',result);
            }catch(error)
            {
                console.log('Error: ',error);
            }

        }
    });
            function displayImages(str,imgname){
            const imageStoreContainer = document.createElement('div');
            imageStoreContainer.classList.add('imageStoreContainer');

            const imageList = document.createElement('div');
            imageList.classList.add('imageList');

            // Create image element
            const img = document.createElement('img');
            img.src = str;
            img.style.maxWidth = '200px';

            // Create name element
            const name = document.createElement('p');
            name.textContent = imgname // extract name from URL

            // Append elements
            imageList.appendChild(img);
            imageList.appendChild(name);

            // Add to main container
            imageContainer.innerHTML += imageList.outerHTML;

            // Clear input
            input.value = '';

        }
        function display(imageList){
            imageList?.forEach(image =>{
                str = `data:${image.type};base64,${image.imageData}`;
                console.log(str);
                displayImages(str,image.name)
            })
        }
});
