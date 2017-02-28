import facebook
import datetime
from dateutil.parser import parse
import requests

GRAPH_VERSION = '2.7'

URL = 'http://localhost:3000/api/activities/createNewActivity'

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
            details = {}
            details['a'] = event['name']
            # parse description
            description = event['description'].strip().encode('utf-8')

            descrip_by_lines = description.split('\n')
            for line in descrip_by_lines:
                if ":" in line:
                    # it may have information we want
                    line = line.lower()
                    (field, value) = line.split(':')
                    details[field] = value.strip()

            # parse location
            place = event.get('place','')
            if place:
                location = event.get('place').get('location', '')
                if location:
                    details['h'] = location.get('country', '')
                    details['g'] = location.get('state', '')
                    details['f'] = location.get('city', '')
                    details['e'] = location.get('street', '')
                    if details['e'] == '':
                        details['e'] = place.get('name', '')
                    details['i'] = location.get('zip', '')
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

            details['b'] = str(start_date)

            start_time = start_datetime.time()
            end_time = end_datetime.time()
            details['c'] = '[' + str(start_time.hour) + '.' + str(int(start_time.minute / 60.0 * 100)) \
            + ',' + str(end_time.hour) + '.' + str(int(end_time.minute / 60.0 * 100)) + ']'

            # requried
            details['d'] = details['cost']
            details['k'] = details['wheelchair_accessible']
            details['l'] = details['activity_type'].capitalize()
            details['m'] = details['disability_type'].capitalize()
            details['n'] = details['age_range']
            details['o'] = details['parent_participation_required']
            details['p'] = details['assistant_provided']
            details['q'] = details['disability_restrooms_available']
            details['z'] = details['phone']
            details['j'] = details['descriptions']

            # optional
            details['r'] = details.get('equipment_provided', 'Unknown')
            details['s'] = details.get('sibling_participation', 'False')
            details['t'] = details.get('kids_to_staff_ratio', '0')
            details['u'] = details.get('asl_interpreter_available', 'False')
            details['v'] = details.get('closed_circuit_heering_loop_available', 'False')
            details['w'] = details.get('additional_charge', 'False')
            details['x'] = details.get('accomodate_service_animals', 'False')
            details['y'] = details.get('onsite_childcare', 'False')



            if end_date < datetime.date.today():
                continue # event is alreay finished. No reason of putting them into the database

            # print details

            # i is zip code. not required
            if 'a' in details and 'b' in details and 'c' in details and 'd' in details and 'e' in details and 'f' in details and 'g' in details and 'h' in details and 'i' in details and 'j' in details and 'k' in details and 'l' in details and 'm' in details and 'n' in details and 'o' in details and 'p' in details and 'q' in details and 'z' in details:
                request = requests.post(URL, data=details)
                # print(request.status_code, request.reason)
                continue

            print 'Missing some entries'

# Have not figured out how to manage the tokens.
# you can get your personal token through
# https://developers.facebook.com/tools/explorer/
def get_access_token():
    return 'EAACEdEose0cBAPj0HvrkQW8WZBQgSyZCwP0ZBSF7ofu6aThookTK7raamn6tNhpM9zY9fsECWWQZBYgnCAl0Ewyidr3h4N4yOQOkYKBtni9HXpSGnSqnZC2CLEkmeGuPXEaQeCjgWt5kpdu08tFPeVjg3tTVIKthZAsB6nvdvTZAMjFih6Q5AUoahnwChs4zK8ZD'

if __name__ == '__main__':
    main()
