import Login from './login.page';
import Forgot from './forgot.page';
import Home from './home.page';
import Models from './models.page';
import AddFile from './addfile.page';
import AddModel from './addmodel.page';
import EditModel from './editmodel.page';
import EditFile from './editfile.page';

const Pages = {
    public: [
        {
            path: '/',
            component: Login
        },
        {
            path: '/password/reset',
            component: Forgot
        },
    ],
    private: [
        {
            path: '/home',
            component: Home
        },
        {
            path: '/device-models',
            component: Models
        },
        {
            path: '/add-file',
            component: AddFile
        },
        {
            path: '/add-device-model',
            component: AddModel
        },
        {
            path: '/device-models/edit/:id',
            component: EditModel
        },
        {
            path: '/files/edit/:id',
            component: EditFile
        }
    ]
}

export default Pages;