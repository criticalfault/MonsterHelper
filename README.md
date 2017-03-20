# Monster Helper

Monster Helper is a program designed to assist with running Kindgom Death: Monster. Those familar with the game will find the controls intuitive, but it requires knowledge of the game before one can fully use the interface. 
 
As Monster Helper is an open source project, we encourage forks and folks helping add to our code base. Should you desire to help, please put in a pull request with your code so we can review it and then merge it into the codebase. We thank you for all of your hard work! Lets make a great tool for our community. 

1. Setup Instructions
2. Deployment Instructions

#Setup Instructions

## Update Application Package Manager

App-get is Ubtuntu's package manager. Whenever you are doing a fresh install of any package. You should update the package manager. This will fix any broken links (should there have been any in previous builds) as well as make sure your getting the latest package.

```shell
sudo apt-get update
```

## Install Apache2

I often used Apache2 as my quick web server of choice. It has very little configuration required to get up and running and can parse PHP out of the box. For Monster Helper, we just need something that can render our HTML page and run our JavaScript. This is done as simply as...

```shell
sudo apt-get install apache2
```

This will create a default served folder of ```/var/www/html``` We will be dropping our contents

## Finalize Installation and Secure Deployment

We will want to change the permissions on this folder so our deployment user can access them when we create our deployment pipeline! 

```shell
sudo chmod 774 html/
chown -R www-data:www-data /var/www/html 
```

Now lets create our deployment user...

```shell
adduser deploy
usermod -aG www-data deploy
```

After this, you are ready to move onto working with the deployment!


# Deployment Instructions

I utilized CodeShip for my deployment pipeline. The follow instructions will help you get CodeShip setup and installed for continuous deployment.

## Setting up CodeShip

### Getting an Account

First you need to get an account on _www.Codeship.com_. Once you have registered, you can click on the menu above and click, 'Create a new project'

### Linking a Repository
You will be given three options to link your code repository. _Github_, _BitBucket_, _Gitlab_. 

![Imgur](http://i.imgur.com/rr3R2qq.png)

Once you click on your repository service of your choice. You will have to enter the link to the repository you want to codeship.

![Imgur](http://i.imgur.com/rmOjKCq.png)

You then will be asked to choose between _Codeship basic_ and _pro_. We will only be covering the basic tools. Though you can free feel to use the Pro should you find you enjoy this tool specifically.

![Imgur](http://i.imgur.com/CZzJpAn.png)

After, you will need to make a test setup for the repository you are using. This will require you to declare what kind of tests you will be using and what you will be using to perform them with. They have prestablished test builds for many of the more popular code bases. Select your unit testing software and make sure they are placed in the proper folders in your repository. 

![Imgur](http://i.imgur.com/AvqZe0Q.png)

Finalize with writing the commands required to run your tests!

After you have completed this final test commands. It will require you to make a push to the repository you have configured. This will then accept in your push, download that repository on to _CodeShip_ and run your unit test. After completion, if its gets a green light (Your tests succeed) then it will fire off the deployment plan you will be prompted to establish.

### Project Settings

After your successful push (Continue to retry after making modifications to your code so your tests succeed). You can setup a deployment pipeline to have _CodeShip_ push your code to a remote server. This requires you to add _CodeShips_ SSH Key to the ```~/.ssh/authorized_keys``` file. This key can be found under the general tab of project settings. Make sure to do this under your deploy user created in the setup!

>Be extremely careful when editing this file. It is very possible to accidentally change this file while trying to add the key to the bottom of it. Doing so will make it impossible for you to use the edited key as they need to match exactly.

Once you have finished editing in your files. You will need to move onto the "deployment" aspect of the CodeShip Pipeline.

![Imgur](http://i.imgur.com/oWczdTR.png)

Click on the "Add New Deployment Pipeline" and configure the "master" branch to match exactly to that name.

They will each take you to a new page. Click on Custom Script and then enter in the following...

```
#Master Branch Push -> Deployment Server
ssh deployp@<IP ADDRESS OF SERVER> 'rm -Rd /var/www/html/*'
scp -rp ~/clone/* deploy@<IP ADDRESS OF SERVER>:/var/www/html/
```

Make Sure to sub out the IP Addresses for the correct locations. The Prerelease SCPing to the Staging Server and the Master SCPing to the Production Server.

When you save, it should look like this.

![Imgur](http://i.imgur.com/PEDdf7Z.png)