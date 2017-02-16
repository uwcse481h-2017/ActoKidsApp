var api = {
    getActivities() {
        var url = 'http://10.0.2.2:3000/api/activities/getAllActivities'

        return fetch(url).then((res) => res.json());
    }
};

module.exports = api;