# HorizonHomes

- Live Site: https://horizonhomes-c540e.web.app

- Admin Email: alex@gmail.com
- Admin Password: Aa12345!

1. **Home Page Components**:

   - Navbar with logo, Home, All properties, Dashboard, and Login links.
   - Banner/slider section.
   - Advertisement section with at least 4 cards containing property image, location, price range, verification status, and details button.
   - Latest User Review section with at least 3 latest user reviews including reviewer name, image, description, and property title.
   - Footer section.

2. **Private Routes**:

   - Except for the Home route, other routes (All properties, Dashboard, etc.) will be private and require authentication.

3. **All Properties Page**:

   - Contains admin-verified properties with cards displaying property image, title, location, agent name, agent image, verification status, price range, and details button.
   - This page is a private/protected route.

4. **Details Page**:

   - Displays detailed information about the property including title, description, price range, and agent name.
   - Includes "Add to wishlist" button, review section, and "Add a review" button.
   - This page is a private/protected route.

5. **User Dashboard**:

   - Contains routes for MyProfile, Wishlist, Propertybought, and Myreviews.
   - Wishlist page: Shows wishlisted properties with information and "Make an offer" and "Remove" buttons.
   - Propertybought page: Shows properties user has offered for, with a status indicator and a "Pay" button for accepted offers.
   - Myreviews page: Displays user's reviews with property title, agent name, review time, description, and delete button.

6. **Agent Dashboard**:

   - Contains routes for AgentProfile, AddProperty, Myaddedproperties, Mysoldproperties, and Requestedproperties.
   - AddProperty page: Form for adding a property with fields for title, location, image, agent name (readonly), agent email (readonly), and price range.
   - Myaddedproperties page: Displays properties added by the agent with options to update or delete.
   - Mysoldproperties page: Displays properties sold by the agent.
   - Requestedproperties page: Displays offers made by users with options to accept or reject.

7. **Admin Dashboard**:

   - Contains routes for AdminProfile, ManageProperties, ManageUsers, and Managereviews.
   - ManageProperties: Displays all properties with verify and reject buttons.
   - ManageUsers: Displays all users with options to make admin, make agent, mark as fraud, and delete user.
   - Managereviews: Displays all reviews with an option to delete them.

8. **Authentication**:

   - Implement email and password-based authentication with registration and login pages.
   - Display errors on the registration page if the password is less than 6 characters, doesn't have a capital letter, or doesn't have a special character.
   - Display errors on the login page if the email or password doesn't match.
   - Implement at least one social login system.

9. **JWT Implementation**:

   - Implement JWT on login (email/password and social) and store the token in localStorage.

10. **Search and Sort Functionality**:

- Add search functionality on the "All properties" page based on the property location.
- Implement sort functionality based on the price range on the "All properties" page.

11. **Additional Sections on Home Page**:

- Add two extra sections to the home page in addition to the sections mentioned above.

12. **Advertise Property**:

- Admin dashboard route to advertise properties, displaying verified properties with an "Advertise" button. Properties advertised will be shown in the advertisement section on the homepage.

13. **Logout Functionality**:

- Once logged in, the user name, profile picture, and logout button should appear on the navbar. Logging out should work correctly.

14. **404 Page**:

- Add a 404 page (not found page) for undefined routes.

15. **Transaction Status and Payment**:

- On the Property bought page, properties for which offers are made will show an initial "pending" status. Upon acceptance, a "Pay" button appears, leading to a payment page. After payment, the status changes to "bought" with the transaction ID displayed.
