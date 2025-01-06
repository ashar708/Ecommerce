# MERN Stack E-Commerce Website<br/><br/><br/>
![image](https://github.com/user-attachments/assets/e7aa6986-78ff-414e-b34d-5d0041244c92)


## Key Components of the Website<br/>

1. Home Page
2. Login Page
3. SignUp Page
4. Admin Panel- 
    - All Products Page
    - All Users Page
5. Category Page
6. Product Details Page
7. Search Product Page
8. Order Page - 
   - Success Page
   - Cancel Page


## The Login & Singup Component - <br/>

Comprises of 3 parts the website icon, the search bar to search the products and the login page clicking the login button takes us to the login page and where we can switch between login and signup and store the user details using the MongoDB by creating a configuration in the backend. <br/><br/><br/>
![image](https://github.com/user-attachments/assets/b699577c-0d60-451a-a727-34bcf2cf1711)

### The login page - <br/><br/><br/>

![image](https://github.com/user-attachments/assets/c0a8e255-1329-4499-a99a-b801b6e7c676)

Where we can see our profile as well and enter our credentials.

### The signup page - <br/><br/><br/>

![image](https://github.com/user-attachments/assets/a697e419-abe9-4360-91b1-15eeb974fa74)

Where we can upload our profile and clicking on the signup button creates a user account in MongoDB.

### The Users Database in MongoDB - <br/><br/><br/>

![image](https://github.com/user-attachments/assets/13affadb-c12c-4f62-bbc3-2ec9337b50e8)

The password is hashed using bcrypt - A library for securing passwords.


After getting signed In the a session is created using the JWT Token and passed to the client side using the payload and the cart, profile pic icons get rendered - <br/><br/><br/>

![image](https://github.com/user-attachments/assets/c14157e3-7865-4cc7-8259-a52efcd6d803)

So we get a toastify message which comes from the react-toastify on Successfully getting logged In. 

## The Admin Panel - <br/><br/><br/>

The profile Pic icon gives us the option to go to the admin panel if that particular users role is selected as the "Admin"
So we can get into the Admin Panel if that particular user is an Admin and has the rights to update, add, and edit a product.

![image](https://github.com/user-attachments/assets/87ec4c0e-e844-466c-a05a-7b75511ef712)


### All Products Page - <br/><br/><br/>


So there are 2 pages by default it will render the All Products Page and we have a button to upload a product and a overlay form for it similarly we have a form for updating the existing product - 

### Uploading a Product - <br/><br/><br/>

![image](https://github.com/user-attachments/assets/781f12bd-bbc2-444d-bced-ad9c214a3e2c)


### Editing an Existing Product - <br/><br/><br/>

![image](https://github.com/user-attachments/assets/0242eb66-c510-46c2-8584-47f5684da0af)




### All Users Page - <br/><br/><br/>

![image](https://github.com/user-attachments/assets/4f77911c-0396-4fc6-a0d6-7ff88a2e4edc)

It is made of a table which consists of all the users on the website and allows us to edit the role of the users -  <br/><br/><br/>

![image](https://github.com/user-attachments/assets/c6262041-a12b-4a1b-b868-2505afc13a0c) <br/><br/><br/>



## The Home Page - 

The category section which displays us all the categories available in the database - <br/><br/><br/>

![image](https://github.com/user-attachments/assets/9be1102f-9a05-404a-8f2d-47320c90d8c4)


After the header section comes the auto Banner Product in which the images are getting scrolled after a delay of 5 seconds using the setTimout function in the useEffect hook and it starts whenever the page reloads for the first time - <br/><br/><br/>

![image](https://github.com/user-attachments/assets/610f7d96-963f-48d1-81cc-4923a5a4b7ca)


The top category's product section displays all the categories which have been stored in the database along with the product details and a button with the add to cart option. <br/><br/><br/>

![image](https://github.com/user-attachments/assets/8132e309-fc16-4e08-b606-6185fbc7b19b)<br/><br/><br/>

## The Cart Page - 

After adding a particular product into the cart we can just go the cart page and do the payment - 

![image](https://github.com/user-attachments/assets/847ffa81-0436-4860-bc51-476960088443)



We use the context api to get the products into the cart as well as increase the items in the cart product.<br/><br/>


## The Search Page - <br/><br/><br/>

If we search any product, we can use the query parameters to get to it , so we can just get the product name as the input and we can query the database with the input value and display the results by clicking on a particular category - 

![image](https://github.com/user-attachments/assets/ab340e7c-34a9-4bea-8745-b1c54d38d6da)


Clicking on any of these categories as well takes us to the search results page where the data is displayed according to the query - 


![image](https://github.com/user-attachments/assets/135d084e-ff00-405c-8521-d5f5d1db015c)

So in here we can sort the array of data into ascending as well as descending order and we can select multiple items to display and the url gets updated with the category selected as well.

![image](https://github.com/user-attachments/assets/b29319d8-798f-46b8-bc4a-cae800ee51b3) <br/><br/><br/>


## The Product Details Page - <br/><br/><br/>

 It displays the product detail along with the add to cart and buy buttons which adds the product to the cart.

 ![image](https://github.com/user-attachments/assets/87b47b15-40ec-4c5f-8fb5-eeb30244a7e2)

 And we get the recommended products as well down the particular products detail - 

 ![image](https://github.com/user-attachments/assets/20785f29-0ed1-4954-b250-e4c7fe81ba6c) <br/><br/><br/>







