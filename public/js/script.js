document.addEventListener('DOMContentLoaded', () => {
    const formFieldsContainer = document.querySelector('.form-fields');
    const addMoreButton = document.getElementById('add-more-button');
    const submitButton = document.getElementById('submit-button');
    // Add More Button Functionality
    addMoreButton.addEventListener('click', () => {
      // Create a new form row
      const newFormRow = document.createElement('div');
      newFormRow.className = 'form-row';
      // Create the Products column
      const productsColumn = document.createElement('div');
      productsColumn.className = 'column';
      productsColumn.innerHTML = `
        <label for="select1" class="form-label">Products</label>
        <select name="select1" class="form-select">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      `;
      // Create the Discount Type column
      const discountTypeColumn = document.createElement('div');
      discountTypeColumn.className = 'column';
      discountTypeColumn.innerHTML = `
        <label for="select2" class="form-label">Discount Type</label>
        <select name="select2" class="form-select">
          <option value="percentage">Percentage </option>
          <option value="amount">Amount </option>
          <option value="fixed amount">Fixed Amount</option>
        </select>
      `;
      // Create the Discount column
      const discountColumn = document.createElement('div');
      discountColumn.className = 'column';
      discountColumn.innerHTML = `
        <label for="numberField" class="form-label">Discount</label>
        <input type="number" name="numberField" class="form-input" placeholder="Enter a number" />
      `;
      // Append columns to the new form row
      newFormRow.appendChild(productsColumn);
      newFormRow.appendChild(discountTypeColumn);
      newFormRow.appendChild(discountColumn);
      // Append the new form row to the container
      formFieldsContainer.appendChild(newFormRow);
    });
    // Submit Button Functionality
    submitButton.addEventListener('click', () => {
      // Collect all form data
      const formRows = document.querySelectorAll('.form-row');
      const formData = [];
      formRows.forEach((row) => {
        const product = row.querySelector('select[name="select1"]').value;
        const discountType = row.querySelector('select[name="select2"]').value;
        const discount = row.querySelector('input[name="numberField"]').value;
        formData.push({ product, discountType, discount });
      });
      // Log the data to the console (or send it to a server)
      console.log(formData);
      // Example: Send the data to a server
      /*
      fetch('/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      */
    });
  });









