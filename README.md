# Watson Fitness Attendant

This is the source for the CISC 490: Cognitive Computing Using Watson course project.

## Quick Start

```bash
# clone the repo
$ git clone https://github.com/cchawn/watson-fitness.git

# install node dependencies
$ npm install

# install bower dependencies
$ bower install

# run the server
$ node app.js
```

If you're running it locally you can go to [http://localhost:3000](http://localhost:3000) in your browser.

To push to Bluemix, first verify that you can run the app locally. You will need to modify the `manifest.yml` file to reflect the unique `name` and `host` for your Node.js application. Once this has been updated, from the app's root directory on your local machine:

```bash
# login with cloud foundry
$ cf login

# enter bluemix username and password

# upload and start the app
$ cf push
```