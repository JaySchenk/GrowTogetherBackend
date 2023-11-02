# Grow Together

"Grow Together" is a React-based application that assists users in plant care by providing watering reminders, advice, and general plant information.

User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know I can't acces this page.
- **Signup:** As an anon, I can sign up on the platform so that I can start registering and managing my plants. After signup I'm automatically logged in.
- **Login:** As a user, I can log in to the platform so that I can access my personalized plant care reminders and information.
- **Logout:** As a user, I can log out from the platform to ensure my data remains secure.
- **Add Plants** As a user, I can add my plants to receive specific care advice and reminders.
- **List Plants** As a user, I want to see my plants so that I can manage them easily.
- **Edit Plants** As a user, I want to edit my plant details so that I can keep the information up-to-date.

## Backlog

User Profile:

- Customize notification settings for plant care reminders.
- Share plant cuttings with other users.
- Contact other users for plant cutting.

## Routes

- / - Homepage
- /signup - Signup form
- /login - Login form
- /plants - List of user's plants
- /plants/add - Form to add a new plant
- /plants/:id - Plant detail and care advice
- /profile/me - User's profile and settings

## Pages

- Home Page (public)
- Sign In Page (anon only)
- Log In Page (anon only)
- User Plant Page (user only)
- User Profile (user only)
- Update Plant (user only)
- Plant Library (user only)
- Create Plant (user only)

## Components

- Navbar Mobile
- Logged in Navbar
- Logged out Navbar
- New User Plant
    creating new user plant
    update water date
- Plant Card 
    displays general plantcare advice depending on species
- User Plant Card
    displays relevant information for a signle user plant
- Update plant
    change plant values


## Models

User model

```
email - string // required & unique
passwordHash - string // required
address:
    streetHouseNumb - string
    postalCode - string
    city - string
    country - string
userPicture - string
name - string
surname - string
plants - [] - ref: UserPlant
```

Plant model

```
species - string // required & unique
image - string
about - string
careInstructions:
    water frequency - string // required
    water amount - string // required
lightRequirement - string // required
temperature - string // required
soilType - string // required
potSize - String // required
growthStages - [string] // required
commonPests diseases - string // required
toxicity - [string] // required
difficultyCareLevel - [string] // required 
```

User Plant model

```
plantname - string // required
plantSpecies - [] - ref: Plant
dateOfAcquisition - date // default date.now
plantPicture - string
plantCutting - int
plantSize - string
productsUsed:
    product - string
    dateUsed - date // default date.now
careActivityDate:
    activity - string
    dateOfCare - date // default date.now
reminderSettings - boolean
```

## Services

- Auth Service
    auth.login
    auth.signup
    auth.verify
- Api Service
    get     /getUser/:userId
    get     /plantcare
    get     /plantcare/:plantCareId
    post    /plantcare
    put     /plantcare/:plantCareId
    delete  /plantcare/:plantCareId
    post    /userplants
    get     /userplant/:userId
    put     /userplants/:userPlantId
    get     /plant/:plantId
    put     /users/:UserId
    put     /userplantsUpdate/:userPlantId
    delete  /userplants/:userId/:userPlantId
    put     /userUpdate/:userId

## Links

### Trello
https://trello.com/b/ZpGTruMo/grow-together

### Github
- Frontend  https://github.com/JaySchenk/GrowTogether
- Backend   https://github.com/JaySchenk/GrowTogetherBackend
- Deployed  https://vocal-elf-bdb61c.netlify.app
