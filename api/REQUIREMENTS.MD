# API Endpoints

### Users

- ALL route: `'api/v1/users' [GET]`
- Single route: `'api/v1/users/:id' [GET]`
- Single by Token route: `'api/v1/users/profile' [GET] [token required]`
- Create route: `'api/v1/users/sign-up' [POST]`
- Sign in route: `'api/v1/users/sign-in' [POST]`
- Update without password route: `'api/v1/users/:id' [PATCH] [token required]`
- Update password route: `'api/v1/users/update-password/:id' [PATCH] [token required]`
- Delete route: `'api/v1/users/:id' [DELETE] [token required]`

### Products

- ALL route: `'api/v1/products' [GET]`
- Single route: `'api/v1/products/:id' [GET]`
- Create route: `'api/v1/products' [POST] [token required]`
- Update route: `'api/v1/products/:ownerID/:productID' [PATCH] [token required]`
- Delete route: `'api/v1/products/:ownerID/:productID' [DELETE] [token required]`

### Cart

- ALL route: `'api/v1/cart' [GET] [token required]`
- Single route: `'api/v1/cart/:userID' [GET]`
- Update-Add Item route: `'api/v1/cart/add/:userID/:productID' [PATCH] [token required]`
- Update-Remove Item route: `'api/v1/cart/remove/:userID/:productID' [PATCH] [token required]`
- Delete route: `'api/v1/cart/:userID' [DELETE] [token required]`

### Reviews

- ALL route: `'api/v1/reviews' [GET]`
- Single route: `'api/v1/reviews/:id' [GET]`
- Create route: `'api/v1/reviews/:productID' [POST] [token required]`
- Update route: `'api/v1/reviews/:ownerID/:reviewID' [PATCH] [token required]`
- Delete route: `'api/v1/reviews/:ownerID/:reviewID' [DELETE] [token required]`

### Orders

- ALL route: `'api/v1/orders' [GET] [token required]`
- All User Orders route: `'api/v1/orders/:userID' [GET] [token required]`
- Create route: `'api/v1/orders' [POST] [token required]`
- Delete route: `'api/v1/orders/:userID/:orderID' [DELETE] [token required]`

# Data Shapes

### User

- id: `string`
- name: `string`
- role: `string`
- email: `string`
- password: `string`
- passwordConfirm: `string`

### Product

- id: `string`
- sku: `string`
- ownerID: `mongoose.Types.ObjectId`
- title: `string`
- description: `string`
- category: `string`
- price: `number`
- onSale: `boolean`
- salePrice: `number`
- reviewIDs: `mongoose.Types.ObjectId[]`
- availablePieces: `number`
- imageUrl: `string`
- averageRating: `number`
- numberOfRatings: `number`

### Review

- id: `string`
- review: `string`
- rating: `number`
- productID: `mongoose.Types.ObjectId`
- userID: `mongoose.Types.ObjectId`

### Cart

- userID: `mongoose.Types.ObjectId`
- itemsList: `(mongoose.Types.ObjectId)[]`
- totalPrice: `number`

### Order

- userID: `mongoose.Types.ObjectId`
- items: `mongoose.Types.ObjectId[]`
- taxPrice: `number`
- shippingPrice: `number`
- totalPrice: `number`
- status: `string`
- shippingDetails: `{
address: string
city: string
postalCode: string
country: string
 }`
- paymentMethod: `string`
