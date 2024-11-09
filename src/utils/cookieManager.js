import Cookies from 'js-cookie';

const cookieManager = {
    set: (name, value, options) => {
        Cookies.set(name, value, options);
    },
    get: (name) => {
        return Cookies.get(name);
    },
    remove: (name) => {
        Cookies.remove(name);
    }
};

export default cookieManager;