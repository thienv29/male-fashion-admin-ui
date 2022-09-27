// assets
import { IconBrandChrome, IconTestPipe } from '@tabler/icons';

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: 'Sample Page',
            type: 'item',
            url: '/sample-page',
            icon: IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'test-page',
            title: 'Testing',
            type: 'item',
            url: '/test-page',
            icon: IconTestPipe,
            breadcrumbs: false
        }
    ]
};

export default other;
