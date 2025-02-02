const insertButton = document.getElementById('insert-button');
const linkInput = document.getElementById('link-input');
const descInput = document.getElementById('desc-input');
const resourceList = document.getElementById('resource-list');

// Define whether the user is an admin
const isAdmin = true; // Change this to false for non-admin users

insertButton.addEventListener('click', () => {
    const newLink = linkInput.value.trim();
    const linkDesc = descInput.value.trim();

    if (newLink !== "" && linkDesc !== "") {
        // Check if the first box already exists
        let firstBox = resourceList.querySelector('.main-box');

        if (!firstBox) {
            // If no box exists, create one
            firstBox = document.createElement('li');
            firstBox.classList.add('main-box');
            firstBox.style.marginBottom = '15px';
            firstBox.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            firstBox.style.padding = '20px';
            firstBox.style.borderRadius = '10px';
            firstBox.style.boxShadow = '4px 4px 8px rgba(0,0,0,0.5)';
            firstBox.style.transition = 'transform 0.2s ease, background-color 0.2s ease';

            // Add a heading inside the first box
            const heading = document.createElement('h3');
            heading.textContent = "Added Links";
            heading.style.color = "#E91E63";
            heading.style.textAlign = "center";
            firstBox.appendChild(heading);

            // Create a container for links
            const linkContainer = document.createElement('ul');
            linkContainer.classList.add('link-container');
            linkContainer.style.paddingLeft = "15px";
            firstBox.appendChild(linkContainer);

            // Append the first box to the list
            resourceList.appendChild(firstBox);
        }

        // Find the link container inside the first box
        const linkContainer = firstBox.querySelector('.link-container');

        // Create a new list item for the new link inside the existing box
        const newLi = document.createElement('li');
        newLi.style.marginTop = '10px';

        // Add the description
        const strongText = document.createElement('strong');
        strongText.textContent = linkDesc;
        newLi.appendChild(strongText);

        // Create the link
        const newA = document.createElement('a');
        newA.href = newLink;
        newA.target = "_blank";newA.textContent = " Visit here";
        newA.style.display = "block";
        newA.style.color = "#FFEB3B"; 
        newA.style.textDecoration = "none";
        newA.style.marginTop = "5px";

        newLi.appendChild(newA);

        // Only add the remove button if the user is an admin
        if (isAdmin) {
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-button');
            removeButton.style.marginLeft = "10px";
            removeButton.style.backgroundColor = "#FF5733";
            removeButton.style.color = "white";
            removeButton.style.padding = "5px 10px";
            removeButton.style.border = "none";
            removeButton.style.borderRadius = "5px";
            removeButton.style.cursor = "pointer";
            removeButton.style.transition = "background-color 0.3s";
            
            removeButton.addEventListener('click', () => {
                newLi.remove();
                showSuccessMessage('Removed successfully! ✔️');
            });

            removeButton.addEventListener('mouseover', () => {
                removeButton.style.backgroundColor = "#C70039";
            });

            removeButton.addEventListener('mouseout', () => {
                removeButton.style.backgroundColor = "#FF5733";
            });

            newLi.appendChild(removeButton);
        }

        // Append the new link inside the existing box
        linkContainer.appendChild(newLi);

        // Show insertion success message
        showSuccessMessage('Inserted successfully! ✔️');

        // Clear the input fields after adding
        linkInput.value = ''; 
        descInput.value = ''; 
    } else {
        alert("Please enter a valid link and description!");
    }
});

// Function to show success messages
function showSuccessMessage(message) {
    const successMessage = document.createElement('div');
    successMessage.textContent = message;
    successMessage.style.backgroundColor = '#4CAF50';
    successMessage.style.color = 'white';
    successMessage.style.padding = '10px';
    successMessage.style.borderRadius = '5px';
    successMessage.style.position = 'fixed';
    successMessage.style.top = '20px';
    successMessage.style.right = '20px';
    successMessage.style.zIndex = '1000';
    successMessage.style.transition = 'opacity 0.5s ease';
    document.body.appendChild(successMessage);

    // Fade out after 2 seconds
    setTimeout(() => {
        successMessage.style.opacity = '0';
        setTimeout(() => {
            successMessage.remove();
        }, 500);
    }, 2000);
}