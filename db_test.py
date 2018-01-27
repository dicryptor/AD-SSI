import os
import MySQLdb
import json
# Add comments for GitHub usage in project document
# These environment variables are configured in app.yaml.
CLOUDSQL_CONNECTION_NAME = os.environ.get('CLOUDSQL_CONNECTION_NAME')
CLOUDSQL_USER = "ssi_db"
CLOUDSQL_PASSWORD = "studentsignin"
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

student_id = "7665464"
db = connect_to_cloudsql()
cursor = db.cursor()
# cursor.execute('INSERT INTO tbl_users (id_imei, first_name, last_name, student_id, batch, role) '
#                'VALUES (\'12323123\', \'123\', \'123\', \'123\', \'123123\', \'student\')')
# db.commit()
cursor.execute('SELECT first_name, last_name FROM tbl_users WHERE student_id=\"%s\"' % (student_id))
row_headers=[x[0] for x in cursor.description] #this will extract row headers
name = cursor.fetchone()
# print row_headers
json_data = dict(zip(row_headers, name))
for i,j in enumerate(row_headers):
    print row_headers[i]
    print name[i]
    json_data.update({row_headers[i]: name[i]})
