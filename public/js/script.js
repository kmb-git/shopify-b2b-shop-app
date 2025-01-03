document.addEventListener("DOMContentLoaded", () => {
  const formFieldsContainer = document.querySelector(".form-fields");
  const addMoreButton = document.getElementById("add-more-button");
  const submitButton = document.getElementById("submit-button");

  function generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

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

      const price =
        event.target.options[event.target.selectedIndex]?.dataset.price;
      const numberField = event.target
        .closest(".form-row")
        .querySelector('input[name="numberField"]');
      numberField.max = price; // Set max value for the discount field
    }

    if (event.target.name === "select2") {
      console.log("Discount type changed to:", event.target.value);
    }
  });

  formFieldsContainer.addEventListener("change", (event) => {
    if (event.target.name === "numberField") {
      const selectedValue = event.target.value;
      const type = event.target
        .closest(".form-row")
        .querySelector("#select2").value;
      const priceSelect = event.target
        .closest(".form-row")
        .querySelector("#products-dropdown");

      const price =
        priceSelect.options[priceSelect.selectedIndex]?.dataset.price;

      if (type === "percentage") {
        if (selectedValue > 100) {
          console.log("Price Adjust percentage done");
          event.target.value = 100;
        }
      } else {
        if (parseFloat(selectedValue) > parseFloat(price)) {
          console.log("Price Adjust done");
          event.target.value = price;
        }
      }
    }
  });

  // Submit Button Functionality
  submitButton.addEventListener("click", () => {
    const formRows = document.querySelectorAll(".form-row");
    const formData = [];
    let isValid = true;

    // Collect data from each form row
    formRows.forEach(async (row, index) => {
      const product = row.querySelector(
        'select[name="products-dropdown"]'
      )?.value;
      const discountType = row.querySelector('select[name="select2"]')?.value;
      const discount = row.querySelector('input[name="numberField"]')?.value;

      // Validate the fields
      if (!product || !discountType || !discount) {
        isValid = false;
        row.classList.add("error"); // Highlight the row with an error
      } else {
        row.classList.remove("error"); // Remove error highlight if corrected

        const isVariant =
          row.querySelector('select[name="products-dropdown"]')
            .selectedOptions[0]?.dataset.product === "true"
            ? false
            : true;
        const selectedIndex = row.querySelector(
          'select[name="products-dropdown"]'
        ).selectedIndex;
        let selectedOption = row.querySelectorAll(
          'select[name="products-dropdown"] option'
        )[selectedIndex];

        let productTitle = selectedOption.dataset.title;
        let variantTitle = selectedOption.dataset.product;

        if (variantTitle == "true") {
          variantTitle = "Discount Code";
        }
        let params = {};
        let ruleTitle = productTitle;
        if (productTitle != variantTitle) {
          ruleTitle = ruleTitle + " -- " + variantTitle;
        }

        params["title"] = ruleTitle;
        params["type"] =
          discountType != "percentage" ? "fixed_amount" : "percentage";

        if (discountType == "percentage") {
          params["value"] = discount;
        } else if (discountType == "amount") {
          params["value"] = discount;
        } else if (discountType == "fixed amount") {
          let amount = selectedOption.dataset.price;

          let fixed = discount;

          params["value"] = amount - discount;
        }

        if (!isVariant) {
          params["product_variant_list"] = [];
          params["product_id_list"] = [product];
        } else {
          params["product_id_list"] = [];
          params["product_variant_list"] = [product];
        }
        if (productTitle == "all") {
          params["product_id_list"] = [];
          params["product_variant_list"] = [];
        }

        let code = generateRandomString(8);

        params["code"] = code;

        // debugger;
        setTimeout(() => {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          const raw = JSON.stringify(params);

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch("/shopify/create-price-rule", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
        }, 1000 * index);

        formData.push({
          product,
          discountCode: code,
          discountType,
          discount,
          isVariant,
        });
      }
    });

    if (!isValid) {
      alert("Please fill out all fields before submitting.");
      return; // Prevent submission if any field is invalid
    }

    // Send JSON data to the server
    fetch("/discounts/save-discounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // JSON payload
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to save data.");
      });
  });
});
