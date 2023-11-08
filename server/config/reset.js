// createUserTable.js

import { pool } from "./database.js";
import createTable from "../Model/UserModel.js";
import createUserDetailsTable from "../Model/UserDetails.js";
import createComment from "../Model/CommentModel.js";
import {
  createProductDetailsTable,
  createProductsTable,
} from "../Model/ProductModel.js";
createTable();
createUserDetailsTable();
createComment();

createProductsTable();
createProductDetailsTable();
