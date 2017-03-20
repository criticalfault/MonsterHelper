# Monster Helper

> Monster Helper is a program designed to assist with running Kindgom Death: Monster. Those familar with the game will find the controls intuitive, but it requires knowledge of the game before one can fully use the interface. 


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