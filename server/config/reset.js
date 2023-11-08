// createUserTable.js

import { pool } from "./database.js";
import createTable from "../Model/UserModel.js";
import createUserDetailsTable from "../Model/UserDetails.js";
import createComment from "../Model/CommentModel.js";
import {
  createProductDetailsTable,
  createProductsTable,
<<<<<<< HEAD
} from "../Model/ProductModel.js";
createTable();
createUserDetailsTable();
createComment();

createProductsTable();
createProductDetailsTable();
=======
} from '../Model/ProductModel.js'
import createCartTable from '../Model/AddCartModel.js'

createTable()
createUserDetailsTable()
createComment()

createProductsTable()
createProductDetailsTable()
createCartTable()
>>>>>>> be35e7e660a441fda6391b0e64e48259511d1c2c
