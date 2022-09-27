// assets
import { IconPalette, IconTypography, IconArchive, IconRuler } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconRuler,
    IconArchive
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const product = {
    id: 'product',
    title: 'Sản phẩm',
    type: 'group',
    children: [
        {
            id: 'product-main',
            title: 'Sản phẩm chính',
            type: 'item',
            url: 'product',
            icon: icons.IconArchive,
            breadcrumbs: false
        },
        {
            id: 'product-color',
            title: 'Màu sắc',
            type: 'item',
            url: 'product/color',
            icon: icons.IconPalette,
            breadcrumbs: false
        },
        {
            id: 'product-size',
            title: 'Size',
            type: 'item',
            url: 'product/size',
            icon: icons.IconRuler,
            breadcrumbs: false
        }
    ]
};

export default product;