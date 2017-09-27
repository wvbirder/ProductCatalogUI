## Introduction

This is the Git repository for the UI files for the **Oracle Public Cloud DevOps Cloud Native Microservices-DB Workshop.** There is a dependency upon the Node.js npm distribution of http_server.  This Node.js software serves as a simple web server for static files.  These include
- alpha.html which is the UI for the deployed application.  It calls two REST services: one to access product data in a MySQL database, and one to call static Twitter data in a JSON file.
- js.alphaOffice.js is the critical custom Javascript file for alpha.js.  There is also a simple JQeury js file in the .js folder.
- css.alpha.css is the stylesheet for alpha.html.
- Image files are in the Images folder.