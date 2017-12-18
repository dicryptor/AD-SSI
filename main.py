# Copyright 2013 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""
Sample App Engine application demonstrating how to connect to Google Cloud SQL
using App Engine's native unix socket or using TCP when running locally.

For more information, see the README.md.
"""

# [START all]
import os

import MySQLdb
import webapp2
from webapp2_extras import json

# These environment variables are configured in app.yaml.
CLOUDSQL_CONNECTION_NAME = os.environ.get('CLOUDSQL_CONNECTION_NAME')
CLOUDSQL_USER = os.environ.get('CLOUDSQL_USER')
CLOUDSQL_PASSWORD = os.environ.get('CLOUDSQL_PASSWORD')
DB_NAME = 'ssi_db'

def connect_to_cloudsql():
    # When deployed to App Engine, the `SERVER_SOFTWARE` environment variable
    # will be set to 'Google App Engine/version'.
    if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
        # Connect using the unix socket located at
        # /cloudsql/cloudsql-connection-name.
        cloudsql_unix_socket = os.path.join(
            '/cloudsql', CLOUDSQL_CONNECTION_NAME)

        db = MySQLdb.connect(
            unix_socket=cloudsql_unix_socket,
            user=CLOUDSQL_USER,
            passwd=CLOUDSQL_PASSWORD,
            db=DB_NAME)

    # If the unix socket is unavailable, then try to connect using TCP. This
    # will work if you're running a local MySQL server or using the Cloud SQL
    # proxy, for example:
    #
    #   $ cloud_sql_proxy -instances=your-connection-name=tcp:3306
    #
    else:
        db = MySQLdb.connect(
            host='127.0.0.1', user=CLOUDSQL_USER, passwd=CLOUDSQL_PASSWORD, db=DB_NAME)

    return db

class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.write('Hello, Students of CU BSc. PT-316!')


class DBInfoPage(webapp2.RequestHandler):
    def get(self):
        """Simple request handler that shows all of the MySQL variables."""
        self.response.headers['Content-Type'] = 'text/plain'

        db = connect_to_cloudsql()
        cursor = db.cursor()
        cursor.execute('SHOW VARIABLES')

        for r in cursor.fetchall():
            self.response.write('{}\n'.format(r))


class TestTable(webapp2.RequestHandler):
    def get(self):
        """Simple test to query data from test table"""
        self.response.headers['Content-Type'] = 'application/json'
        db  = connect_to_cloudsql()
        cursor = db.cursor()
        cursor.execute('SELECT * FROM tbl_gae_test')
        
        row_headers=[x[0] for x in cursor.description] #this will extract row headers
        rv = cursor.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers,result)))
        self.response.write(json.encode(json_data))
        #for r in cursor.fetchall():
        #    self.response.write('{}\n'.format(r))


class PostTest(webapp2.RequestHandler):
    def post(self):
        data = json.decode(self.request.body)
        return_data = json.encode(data)
        self.response.headers.add_header('content-type', 'application/json', charset='utf-8')
        self.response.write(return_data)
        # self.response.write(json.encode(data))

class Register(webapp2.RequestHandler):
    """Handler for test SQL query generator"""
    def post(self):
        db  = connect_to_cloudsql()
        cursor = db.cursor()
        data = json.decode(self.request.body)
        cols = data.keys()
        vals = data.values()
        insert_qry = "INSERT INTO tbl_users (%s) VALUES(\"%s\")" % (",".join(cols), "\",\"".join(vals))
        try:
            cursor.execute(insert_qry)
            db.commit()
            json_response = {"status": "success"}
        except (MySQLdb.Error, MySQLdb.Warning) as e:
            json_response = {"status": "%s" % e}

        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.encode(json_response))


class SignIn(webapp2.RequestHandler):
    """Handler for test SQL query generator"""
    def post(self):
        db  = connect_to_cloudsql()
        cursor = db.cursor()
        data = json.decode(self.request.body)
        cols = data.keys()
        vals = data.values()
        in_out = cols.index("signinout")
        id_imei = cols.index("id_imei")
        student_id = cols.index("student_id")

        if vals[in_out] == "signin":
            insert_qry = "INSERT INTO tbl_attendance (id_imei, student_id) VALUES(%s, %s)" % (vals[id_imei], vals[student_id])
            try:
                cursor.execute(insert_qry)
                db.commit()
                json_response = {"status": "success"}
            except (MySQLdb.Error, MySQLdb.Warning) as e:
                json_response = {"status": "%s" % e}
        elif vals[in_out] == "signout":
            update_qry = "UPDATE tbl_attendance SET sign_out=now() WHERE id_imei=\"%s\"" % (vals[id_imei])
        # try:
        #     cursor.execute(insert_qry)
        #     db.commit()
        #     json_response = {"status": "success"}
        # except (MySQLdb.Error, MySQLdb.Warning) as e:
        #     json_response = {"status": "%s" % e}
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.write(update_qry)
        # self.response.headers['Content-Type'] = 'application/json'
        # self.response.write(json.encode(json_response))


app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/dbinfo', DBInfoPage),
    ('/testtable', TestTable),
    ('/posttest', PostTest),
    ('/register', Register),
    ('/signin', SignIn),
], debug=True)

# [END all]
