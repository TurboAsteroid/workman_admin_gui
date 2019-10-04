import createHistory from 'history/createBrowserHistory';

export default {
    ajax: async function (url, params = {}) {
        try {
            let config = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                }
            };
            Object.assign(config, params);
            if (window.sessionStorage.getItem('token')) {
                config.headers.authorization = 'BEARER ' + window.sessionStorage.getItem('token')
            }
            const response = await fetch(url, config);

            if (!response.ok) {
                const history = createHistory();
                if (history.location.pathname !== '/login') {
                    window.location.href = '/login'
                }
                return {};
            }

            let result = await response.json()

            if (result.status === "TOKEN")  {
                window.sessionStorage.setItem('token', result.data)
            }

            return result;
        } catch (e) {
            const history = createHistory();
            history.go('/login');
            return {};
        }
    }
}
