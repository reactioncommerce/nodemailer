# Nodemailer

![Nodemailer](https://raw.githubusercontent.com/reactioncommerce/nodemailer/master/assets/nm_logo_200x136.png)

This is the officially supported fork of Nodemailer that is now maintained by Reaction Commerce.

Currently, the only difference from the original project is it is now compiled with Babel so Node >=6 is no longer required.

See [nodemailer.com](https://nodemailer.com/) for full documentation.

-------

## Having an issue?

#### I'm having issues with Gmail

Gmail either works well or it does not work at all. It is probably easier to switch to an alternative service instead of fixing issues with Gmail. If Gmail does not work for you then don't use it.

#### I get ETIMEDOUT errors

Check your firewall settings. Timeout usually occurs when you try to open a connection to a port that is firewalled either on the server or on your machine

#### I get TLS errors

If you are running the code in your own machine, then check your antivirus settings. Antiviruses often mess around with email ports usage. Node.js might not recognize the MITM cert your antivirus is using.

#### I have a different problem

If you are having issues with Nodemailer, then the best way to find help would be [Stack Overflow](https://stackoverflow.com/search?q=nodemailer).

### License

Copyright © [MIT](./LICENSE)
