
const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");
const contactCount = document.getElementById("contactCount");
const contactMessage = document.getElementById("contactMessage");

let contacts = [];

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();

    if (!name || !phone) {
        contactMessage.textContent = "Please complete both fields.";
        return;
    }

    contacts.push({ name: name, phone: phone });

    displayContacts();
    contactForm.reset();

    contactMessage.textContent = "Contact added successfully.";
});

function displayContacts() {
    contactList.innerHTML = "";

    contacts.forEach(function(contact, index) {
        const item = document.createElement("div");
        item.className = "contact-item";

        const details = document.createElement("span");
        details.textContent = contact.name + " — " + contact.phone;

        const deleteButton = document.createElement("button");
        deleteButton.className = "button danger";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            contacts.splice(index, 1);
            displayContacts();
            contactMessage.textContent = "Contact deleted.";
        });

        item.append(details, deleteButton);
        contactList.appendChild(item);
    });

    contactCount.textContent = contacts.length;
}
