// const ProductList = require("./path-to-productList-model"); // Import the ProductList model

// // Controller for ProductList
// const productListController = {
//   // Create a new ProductList
//   createProductList: async (req, res) => {
//     try {
//       const { reserve_id, is_variant, is_collection, price_role_id } = req.body;

//       // Create a new ProductList instance
//       const newProductList = new ProductList({
//         reserve_id,
//         is_variant,
//         is_collection,
//         price_role_id,
//       });

//       // Save to database
//       const savedProductList = await newProductList.save();
//       res
//         .status(201)
//         .json({
//           message: "ProductList created successfully!",
//           data: savedProductList,
//         });
//     } catch (error) {
//       res
//         .status(500)
//         .json({ message: "Error creating ProductList", error: error.message });
//     }
//   },

//   // Fetch all ProductLists
//   getAllProductLists: async (req, res) => {
//     try {
//       const productLists = await ProductList.find().populate("price_role_id"); // Fetch all records and populate related PriceRole
//       res.status(200).json(productLists);
//     } catch (error) {
//       res
//         .status(500)
//         .json({ message: "Error fetching ProductLists", error: error.message });
//     }
//   },

//   // Fetch a single ProductList by ID
//   getProductListById: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const productList = await ProductList.findById(id).populate(
//         "price_role_id"
//       ); // Find by ID and populate related PriceRole
//       if (!productList) {
//         return res.status(404).json({ message: "ProductList not found" });
//       }
//       res.status(200).json(productList);
//     } catch (error) {
//       res
//         .status(500)
//         .json({ message: "Error fetching ProductList", error: error.message });
//     }
//   },

//   // Update a ProductList by ID
//   updateProductList: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const updates = req.body;

//       const updatedProductList = await ProductList.findByIdAndUpdate(
//         id,
//         updates,
//         {
//           new: true, // Return the updated document
//           runValidators: true, // Validate fields before updating
//         }
//       );

//       if (!updatedProductList) {
//         return res.status(404).json({ message: "ProductList not found" });
//       }

//       res
//         .status(200)
//         .json({
//           message: "ProductList updated successfully!",
//           data: updatedProductList,
//         });
//     } catch (error) {
//       res
//         .status(500)
//         .json({ message: "Error updating ProductList", error: error.message });
//     }
//   },

//   // Delete a ProductList by ID
//   deleteProductList: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const deletedProductList = await ProductList.findByIdAndDelete(id);

//       if (!deletedProductList) {
//         return res.status(404).json({ message: "ProductList not found" });
//       }

//       res.status(200).json({ message: "ProductList deleted successfully!" });
//     } catch (error) {
//       res
//         .status(500)
//         .json({ message: "Error deleting ProductList", error: error.message });
//     }
//   },
// };

// module.exports = productListController;
