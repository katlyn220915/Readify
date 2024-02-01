# Readify

#### Readify is a App that you can read E-book and take notes while your reading.
#### Link: [https://readify-rosy.vercel.app/](https://readify-rosy.vercel.app/)

# Feature
* Uplaod and parse your epub file
* Categorize your book with three main categories - my library, later and archive
* Add and manage tags to your book
* Customize reading font size, typeface or line height to meet your preferences
* Highlight words, phrases or add note to them
  
![image](https://github.com/Katlyn880815/Readify/blob/develop/public/image/demo-add-tag.gif)

![image](https://github.com/Katlyn880815/Readify/blob/develop/public/image/demo-highlight.gif)

![image](https://github.com/Katlyn880815/Readify/blob/develop/public/image/demo-custom-font.gif)

![image](https://github.com/Katlyn880815/Readify/blob/develop/public/image/demo-typeface.gif)

# Demo
Test account is already pre-written on the Demo page.

* Email: test@test.com
* Password: 123456

# Tech stack

### Front-end

| Technique | Description |
| :-- | :-- |
| Next.js  | Use next.js to handle routes, Api end points  |
| React | Created mutiple custom hooks, used useMemo, useCallback to prevent infinite re-render |
| Redux | Managing global UI state |
| React Hook Form | Handling inputs and error messages  |
| Yup | Validating user's input |
| Epub.js | Helper to parse epub file |
| Font-awsome | Icon provider |

### Back-end

| Technique | Description |
| :-- | :-- |
| Firebase  | Authentication, Firestore database and storage   |
| Vercel | Deployment |

### React components design

* Root
![image](https://github.com/Katlyn880815/Readify/blob/develop/public/image/App.png)

* Auth
![image](https://github.com/Katlyn880815/Readify/blob/develop/public/image/auth%20components.png)

* Homepage
![image](https://github.com/Katlyn880815/Readify/blob/develop/public/image/homepage.png)

* Category page
![image](https://github.com/Katlyn880815/Readify/blob/develop/public/image/category%20components.png)

* Read page
![image](https://github.com/Katlyn880815/Readify/blob/develop/public/image/read%20Components.png)

* Reusable components

![image](https://github.com/Katlyn880815/Readify/blob/develop/public/image/reusable%20components.png)



## Next todo
- [ ] Find solutions for throuble of displaying sans-serif typeface of Chinese
- [ ] Redesign Home page
- [ ] Intergrate google translate api for translate words while user is reading
- [ ] Add Components design graph to project's Readme
