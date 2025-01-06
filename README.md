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

![image](https://github.com/user-attachments/assets/c6262041-a12b-4a1b-b868-2505afc13a0c)


## The Home Page - 




