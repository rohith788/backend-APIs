# Fetch Rewards Coding Exercise - Backend Software Engineering
## Premise
Create 3 APIs to add tranactions, spend points and display these poitns.

The entire project is build in Node.js and Express
The test cases are written in Chai Mocha
## Steps to Build and Run the application
### Install Node and NPM
If Node and npm are already not installed, go to this link and install them : https://nodejs.dev/en/download/
You will find the installation file for Windows, MacOS and major Linux distros.
Check installation by typing 
```
node -v
npm -v
```
![alt text](https://github.com/rohith788/fetchrewards_be/blob/main/assets/node-v.png)
### Clone repo and Build the project

1) Ensure git is installed on your PC. If not installed please follow the instructions on this page: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

2)After ensuring that you have git on your system, clone this repo by using the following command:
```
git clone https://github.com/rohith788/fetchrewards_be.git
```
Alternatively, you can also download the zip file from the git hub website 
![alt text](https://github.com/rohith788/fetchrewards_be/blob/main/assets/github.png)

3) After cloing the repo to the desired location in your PC, navigate into the directory using a terminal with the following command:
```
cd /path_to_file/fetchrewards_be 
```

4) Install the Node dependnecies by using the following command:

```
npm install
```

5) You can now start the server to test the build/install by using this command:

```
npm start
```

The output should look like this

![alt text](https://github.com/rohith788/fetchrewards_be/blob/main/assets/npm%20start.png)

The project is not set up to run and test!!

### Run and Test the project

You will have to install Postman Desktop version for this tutorial as the web version cannot access localhost. 

1) Visit this website and download Postman: https://www.postman.com/downloads/

2) Install and log in to Postman

3) Click on the Workspaces drop down on the top left and select My Workspace on this menu (You can also create a new Workspace).
![alt text](https://github.com/rohith788/fetchrewards_be/blob/main/assets/post1.png)
4) On the next screen, click on the  "Create new request"(Http) as shown below
![alt text](https://github.com/rohith788/fetchrewards_be/blob/main/assets/post2.png)
5) On the next screen, add the url as shown below
![alt text](https://github.com/rohith788/fetchrewards_be/blob/main/assets/post3.png)
Now we can start sending requests to the API!

6) We have three api calls in this solution :
* /addPoints : to add new transactions
* /spendPoints : to spend points according to the given rules
* / : this is the landing page and will be used to display the existing points for the user

### Calling the APIs
For all the steps below, make sure the API server is running

* For POST /addPoints API
  1) Add /addPoints to the existing URL in postman and change the API call to POST as shown below
  ![alt text](https://github.com/rohith788/fetchrewards_be/blob/main/assets/api1.png)
  2) You can add the JSON input for the API call in the Body section by choosing the shown options as shown below.
  ![alt text](https://github.com/rohith788/fetchrewards_be/blob/main/assets/api2.png)
  3) Hit the Send button.
  
  4) You should see the following output
  ![alt text](https://github.com/rohith788/fetchrewards_be/blob/main/assets/api3.png)
* For POST /spendPoints API
  1) Add /spendPoints to the existing URL in postman and change the API call to POST as shown below
  ![alt text](https://github.com/rohith788/fetchrewards_be/blob/main/assets/api4.png)
  2) You can add the JSON input for the API call in the Body section by choosing the shown options as shown below.
  ![alt text](https://github.com/rohith788/fetchrewards_be/blob/main/assets/api5.png)
  3) Hit the Send button.
  
  4) You should see the following output
  ![alt text](https://github.com/rohith788/fetchrewards_be/blob/main/assets/api6.png)
 * For GET / API
 1) Change the API call to GET and the url to whats shown in the picture below.
 
 2) You don't need any input for this and click Send.
 
 3) You will see a similar output if there were any previous transactions.
 ![alt text](https://github.com/rohith788/fetchrewards_be/blob/main/assets/api7.png)
 
### Tests

* In the root directory of the repository, type .
```
npm test
```
![alt text](https://github.com/rohith788/fetchrewards_be/blob/main/assets/test1.png)
* You will see the output for the given test cases.




