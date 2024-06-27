**Task Managment Application**
**Package Requirements :**
1. Node.js 20
2. MongoDB server (Version 7 is used in this project)

**Features of the Project :**
=> The Front end has an landing page with all the tasks colored based on their priority
=> The Landing page also contains a form to submit a new Task by providing Task name, Description, task due date and task priority
=> Each Task contains thre buttons 
    (i) View : To view to the detailed information about the task. It will redirect to task info page where detailed information about the task is provided with option toedit the details
    (ii) Complete : To complete a specific Task
    (iii) Delete : To delete a specific task

**Steps to Run the Project :**
1. Clone the repository into a folder of your choice
2. Now to run the backend:
     (i) cd backend (enter the backend folder)
     (ii) npm i (install the required packages)
     (iii) nodemon . (run the backend server) (**if nodemon is not available then use the command *npm i -g nodemon* to install nodemon)
3. To run the frontend:
     (i) cd frontend/task_app (enter the app folder)
     (ii) npm i (install the required packages)
     (iii) npm start (to start the react project)
Now the backend server will be running in localhost port 5000 and frontend can be accessed at localhost port 3000
**The frontend application can be accessed at http://localhost:3000 (or) https://localhost:3000**
