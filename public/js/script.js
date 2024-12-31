document.addEventListener("DOMContentLoaded", () => {
  const formFieldsContainer = document.querySelector(".form-fields");
  const addMoreButton = document.getElementById("add-more-button");
  const submitButton = document.getElementById("submit-button");

  // Function to clone and append a new form row
  const cloneFormRow = () => {
    const firstFormRow = document.querySelector(".form-row");
    const clonedRow = firstFormRow.cloneNode(true); // Deep clone the row

    // Reset the values of the cloned row
    const selectInputs = clonedRow.querySelectorAll("select");
    selectInputs.forEach((select) => (select.value = ""));

    const textInputs = clonedRow.querySelectorAll('input[type="number"]');
    textInputs.forEach((input) => (input.value = ""));

    // Append the cloned row to the form container
    formFieldsContainer.appendChild(clonedRow);
  };

  // Add More Button Functionality
  addMoreButton.addEventListener("click", () => {
    cloneFormRow();
  });

  // Apply a listener to the form fields container
  formFieldsContainer.addEventListener("change", (event) => {
    if (event.target.name === "products-dropdown") {
      const selectedValue = event.target.value;
      const isProduct =
        event.target.options[event.target.selectedIndex]?.dataset.product ===
        "true";

      if (isProduct) {
        console.log("Selected Product ID:", selectedValue);
      } else {
        console.log("Selected Variant ID:", selectedValue);
      }
    }

    if (event.target.name === "select2") {
      console.log("Discount type changed to:", event.target.value);
    }
  });

  // Submit Button Functionality
  submitButton.addEventListener("click", () => {
    const formRows = document.querySelectorAll(".form-row");
    const formData = [];
    let isValid = true;

    // Collect data from each form row
    formRows.forEach((row, index) => {
      const rowElements = row.querySelectorAll(
        'select[name="products-dropdown"] option'
      );

      const selectedIndex = row.querySelector(
        'select[name="products-dropdown"]'
      ).selectedIndex;

      const product = row.querySelector(
        'select[name="products-dropdown"]'
      ).value;
      const discountType = row.querySelector('select[name="select2"]').value;
      const discount = row.querySelector('input[name="numberField"]').value;

      // Validate the fields
      if (!product || !discountType || !discount) {
        isValid = false;
        row.classList.add("error"); // Highlight the row with an error
      } else {
        row.classList.remove("error"); // Remove error highlight if corrected

        isVariant = true;
        if (rowElements[selectedIndex].dataset.product == "true") {
          isVariant = false;
        }
        formData.push({ product, discountType, discount, isVariant });
      }
    });

    if (!isValid) {
      alert("Please fill out all fields before submitting.");
      return; // Prevent submission if any field is invalid
    }

    // Send JSON data to the server
    fetch('/discounts/save-discounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // JSON payload
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        alert(data.message);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to save data.');
      });
  });
});