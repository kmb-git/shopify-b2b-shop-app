document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("table.table tbody");

  // Handle Edit Button Click
  tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-edit")) {
      const row = event.target.closest("tr");
      const id = row.dataset.id; // Get the row ID
      const product = row.cells[0].textContent; // Get product details from the first cell
      const discountType = row.cells[1].textContent; // Get discount type
      const discountValue = row.cells[2].textContent; // Get discount value

      // Prompt the user to edit the details
      // const newProduct = prompt("Edit Product ID:", product);
      const newDiscountType = prompt("Edit Discount Type:", discountType);
      const newDiscountValue = prompt("Edit Discount Value:", discountValue);

      if (newProduct && newDiscountType && newDiscountValue) {
        // Update the table row
        // row.cells[0].textContent = newProduct;
        row.cells[1].textContent = newDiscountType;
        row.cells[2].textContent = newDiscountValue;

        // Make an API call to update the data in the database
        fetch(`/discounts/edit/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // product: newProduct,
            discountType: newDiscountType,
            discount: newDiscountValue,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            alert(data.message || "Updated successfully!");
          })
          .catch((error) => {
            console.error("Error updating data:", error);
            alert("Failed to update the data.");
          });
      }
    }
  });

  // Handle Delete Button Click
  tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-delete")) {
      const row = event.target.closest("tr");
      const id = row.dataset.id; // Get the row ID

      if (confirm("Are you sure you want to delete this item?")) {
        // Remove the row from the table
        row.remove();

        // Make an API call to delete the data from the database
        fetch(`/discounts/delete/${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            alert(data.message || "Deleted successfully!");
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            alert("Failed to delete the data.");
          });
      }
    }
  });
});
