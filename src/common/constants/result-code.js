// Description: Define result code for API response.
// Result code format: x - yy - zz
// x: type of code
//    1 - Business code (Business logic, Validation, ...)
//    2 - Infrastructure code (Database, Server, File, External Service, ...)
//    0 - Common HTTP status code
// yy: Module code (2 digits) eg. 01 for User module
// zz: Code number (2 digits) eg. 01, 02, 03, ...
const ResultCode = Object.freeze({
  // --- Common HTTP status code ---
  SUCCESS: { code: 200, message: 'Success' },
  BAD_REQUEST: { code: 400, message: 'Bad Request' },
  UNAUTHORIZED: { code: 401, message: 'Unauthorized' },
  FORBIDDEN: { code: 403, message: 'Forbidden' },
  NOT_FOUND: { code: 404, message: 'Not Found' },
  INTERNAL_SERVER_ERROR: { code: 500, message: 'Internal Server Error' },
  VALIDATION_ERROR: { code: 422, message: 'Validation Error' },

  // --- Business code ---

  // User
  USER_NOT_FOUND: { code: 10101, message: 'User not found' },
  EMAIL_EXISTS: { code: 10100, message: 'Email already exists' },
  USERNAME_EXISTS: { code: 10102, message: 'Username already exists' },

  // Account
  ACCOUNT_NOT_FOUND: { code: 10200, message: 'Account not found' },
  ACCOUNT_EXISTS: { code: 10201, message: 'Account already exists' },
  ACCOUNT_BALANCE_INSUFFICIENT: { code: 10202, message: 'Account balance insufficient' },
  MASTER_ACCOUNT_NOT_FOUND: { code: 10203, message: 'Master account not found' },
  MERCHANT_ACCOUNT_NOT_FOUND: { code: 10204, message: 'Merchant account not found' },
  SYSTEM_ACCOUNT_NOT_FOUND: { code: 10205, message: 'System account not found' },
  CUSTOMER_ACCOUNT_NOT_FOUND: { code: 10206, message: 'Customer account not found' },
  MERCHANT_BALANCE_INSUFFICIENT: { code: 10207, message: 'Merchant balance insufficient' },
  CUSTOMER_BALANCE_INSUFFICIENT: { code: 10208, message: 'Customer balance insufficient' },

  // Transaction
  TRANSACTION_NOT_FOUND: { code: 10301, message: 'Transaction not found' },
  TRANSACTION_EXISTS: { code: 10302, message: 'Transaction already exists' },
  TRANSACTION_TYPE_INVALID: { code: 10303, message: 'Transaction type invalid' },
  REFUND_TRANSACTION_NOT_SUCCESS: { code: 10304, message: 'Cannot refund transaction not success' },

  // Auth
  TOKEN_INVALID: { code: 10901, message: 'Invalid token' },

  // --- Infrastructure code ---
  DB_ERROR: { code: 30001, message: 'Database error' },
  SERVER_ERROR: { code: 30101, message: 'Server error' },
  FILE_UPLOAD_ERROR: { code: 30201, message: 'File upload error' },
});

module.exports = ResultCode;
