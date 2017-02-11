import facebook
import datetime
from dateutil.parser import parse

GRAPH_VERSION = '2.7'

EVENT_PAGES_NAME = [
    '1847852682123882'
]
# If you have a Facebook page with URL like:
# https://www.facebook.com/seattlechildrens
# then, page name/id = seattlechildrens

# If you have page URL like:
# https://www.facebook.com/ActoKids-1847852682123882
# then, page name/id = 1847852682123882

# If you have page URL like:
# https://www.facebook.com/pages/smashballoon/123654123654123
# then, page name/id = 123654123654123

EVENT_DIRECTORY = '/events'

def main():
    access_token = get_access_token()
    # get the graph
    graph = facebook.GraphAPI(access_token=access_token, version=GRAPH_VERSION)

    for event_page in EVENT_PAGES_NAME:
        # get the all events information as dictionary
        event_dict = graph.get_object(id=event_page+EVENT_DIRECTORY)

        # extract only data
        event_data = event_dict['data']

        # extract necessary information about the event
        for event in event_data:
            activity_name = event['name']
            # parse description
            description = event['description'].strip().encode('utf-8')

            details = {}
            descrip_by_lines = description.split('\n')
            for line in descrip_by_lines:
                if ":" in line:
                    # it may have information we want
                    line = line.lower()
                    (field, value) = line.split(':')
                    details[field] = value

            # parse location
            place = event.get('place','')
            if place:
                location = event.get('place').get('location', '')
                if location:
                    country = location.get('country', '')
                    city = location.get('city', '')
                    street = location.get('street', '')
                    zip_code = location.get('zip', '')
                else:
                    continue # no nolcation information
                    # we could assume place['name'] has some infromation
                    # about the locatoin but may not worth our time at this point.
            else:
                continue # no place information

            # parse time
            start_datetime = event.get('start_time','')
            end_datetime = event.get('end_time','')
            if not start_datetime or not end_datetime:
                continue # time is not available

            start_datetime = parse(start_datetime)
            end_datetime = parse(end_datetime)

            start_date = start_datetime.date()
            end_date = end_datetime.date()

            start_time = start_datetime.time()
            end_time = end_datetime.time()

            if end_date < datetime.date.today():
                continue # event is alreay finished. No reason of putting them into the database

            print activity_name
            print details
            print street, city, country, zip_code
            print start_datetime, end_datetime
            print description.encode('utf-8')

# Have not figured out how to manage the tokens.
# you can get your personal token through
# https://developers.facebook.com/tools/explorer/
def get_access_token():
    return ''


if __name__ == '__main__':
    main()
