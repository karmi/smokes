# Smokes #

An application to keep track of how many cigarettes you smoke in a long run.

It's a standalone HTML/JS application served from [CouchDB](http://couchdb.apache.org/) database,
so called _CouchApp_, made with the [_soca_](https://github.com/quirkey/soca) Rubygem.

It's specifically tailored for usage on the iPhone:

![Screenshot: Smokes](https://github.com/karmi/smokes/raw/master/screenshot.png)


## Why? ##

Because quitting is easy. Restraining yourself is much more interesting.
Also, because Protovis charts are sexy.


## Setup ##

You'll need a working Ruby & Rubygems on your developmment machine,
and working CouchDB database — either local or remote.

If you have CouchDB running locally, you don't need anything else.

If you don't have CouchDB installed, you should give it a shot.
It's awesome database. Otherwise, you can get hosted database
for free from [_CouchOne_](http://www.couchone.com/get) or
[_Cloudant_](https://cloudant.com/#!/solutions/cloud/signup/oxygen).

The application relies on the [_soca_](https://github.com/quirkey/soca) RubyGem to
deploy the application source into the database. So, let's install the gem first:

    $ gem install soca

Then, clone (or [download](https://github.com/karmi/smokes/zipball/master)) the repository
and switch to the folder with application:

    $ git clone git://github.com/karmi/smokes.git
    $ cd smokes

Copy the example `couchapprc` configuration file:

    $ cp couchapprc .couchapprc

You may want to edit the settings in the file:

    $ $EDITOR .couchapprc

The default (development) database is set to
[`http://localhost:5984/smokes`](http://localhost:5984/_utils/database.html?smokes).

If you have _Admin Party_ disabled, or you want to use hosted database, make your changes accordingly.

Now, let's push the code into Couch:

    $ soca push

and open the application in browser:

    $ soca open


## Deployment ##

To run the application FOR REALZ at your own or hosted server, you'd probably want
to restrict the access. In Couch, that's [simple](http://guide.couchdb.org/draft/security.html).

Just make sure you have _Admin Party_ disabled and you have your admin credentials handy.
Prefferably, create separate `smokes` user.

Then configure the security for the database (make sure to replace USERNAME, PASSWORD and SERVER):

    # Display current settings
    $ curl http://USERNAME:PASSWORD@SERVER/smokes/_security

    # Restrict access to the database
    curl -H 'Content-Type: application/json' \
         -X PUT http://USERNAME:PASSWORD@SERVER/smokes/_security \
         -d '{"admins":{"names":["USERNAME", "smokes"]},"readers":{"names":["USERNAME","smokes"]}}'

You can now load the application simply by placing the credentials into the URL:

    http://USERNAME:PASSWORD@SERVER/smokes/_design/smokes/index.html#/

Don't forget to put this instance as an environment into the `.couchapprc` file,
probably as `production`. You can deploy the application simply by doing:

    $ soca push --debug=true production

Please report any errors, concerns or similar as Github Issues.

-----

[Karel Minarik](http://karmi.cz)
