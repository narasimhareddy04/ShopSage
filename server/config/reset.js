// createUserTable.js

import { pool } from '../config/database.js'
import createTable from '../Model/UserModel.js'
import createUserDetailsTable from '../Model/UserDetails.js'
import createComment from '../Model/CommentModel.js'
import {
  createProductDetailsTable,
  createProductsTable,
} from '../Model/ProductModel.js'
import createCartTable from '../Model/AddCartModel.js'

createTable()
createUserDetailsTable()
createComment()

createProductsTable()
createProductDetailsTable()
createCartTable()
