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

document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('#input');
    const btn = document.querySelector('#button');
    const imageContainer = document.querySelector('.imageContainer');
    const error = document.querySelector('.error');
    
    btn.addEventListener('click', () => {
        const inputvalue = input.value.trim();

        if (inputvalue !== '') {
            
            error.classList.add('hidden');
            // Create container
            const imageStoreContainer = document.createElement('div');
            imageStoreContainer.classList.add('imageStoreContainer');

            const imageList = document.createElement('div');
            imageList.classList.add('imageList');

            // Create image element
            const img = document.createElement('img');
            img.src = inputvalue;
            img.style.maxWidth = '200px';

            // Create name element
            const name = document.createElement('p');
            name.textContent = inputvalue.split('/').pop(); // extract name from URL

            // Append elements
            imageList.appendChild(img);
            imageList.appendChild(name);

            // Add to main container
            imageContainer.appendChild(imageList);

            // Clear input
            input.value = '';

        } else {
            error.classList.remove('hidden');
            console.log('Something went wrong');
        }
    });
});