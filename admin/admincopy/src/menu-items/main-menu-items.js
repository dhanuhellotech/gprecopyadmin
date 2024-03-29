import React from 'react';
import {FormattedMessage} from 'react-intl';

import {
    IconAtom,
    IconBasket,
    IconBellRinging,
    IconBorderAll,
    IconBorderRadius,
    IconBoxMultiple,
    IconBrandChrome,
    IconBrandGravatar,
    IconBrush,
    IconBug,
    IconCalendar,
    IconChartArcs, 
    IconChartCandle,
    IconChartInfographic,
    IconCircle,
    IconCircleOff,
    IconClipboardList,
    IconDashboard,
    IconDeviceAnalytics,
    IconFiles,
    IconForms,
    IconHelp,
    IconId,
    IconKey,
    IconLayoutList,
    IconLoader,
    IconLockAccess,
    IconMail,
    IconMenu,
    IconMap2,
    IconMessages,
    IconNfc,
    IconPalette,
    IconPencil,
    IconPhoneCall,
    IconPictureInPicture,
    IconReceipt2,
    IconRun,
    IconShadow,
    IconShape,
    IconShieldLock,
    IconSitemap,
    IconTools,
    IconTypography,
    IconUser,
    IconUserCheck,

} from '@tabler/icons';

const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,

    IconChartArcs: IconChartArcs,
    IconClipboardList: IconClipboardList,
    IconChartInfographic: IconChartInfographic,

    IconForms: IconForms,
    IconReceipt2: IconReceipt2,
    IconPencil: IconPencil,
    IconPalette: IconPalette,
    IconShadow: IconShadow,
    IconPhoneCall: IconPhoneCall,
    IconBrandChrome: IconBrandChrome,

    IconFiles: IconFiles,
    IconAtom: IconAtom,
    IconTools: IconTools,
    IconBrush: IconBrush,
    IconLockAccess: IconLockAccess,
    IconShieldLock: IconShieldLock,
    IconKey: IconKey,
    IconTypography: IconTypography,
    IconMenu: IconMenu,
    IconBoxMultiple: IconBoxMultiple,
    IconCircleOff: IconCircleOff,
    IconCircle: IconCircle,
    IconBorderRadius: IconBorderRadius,
    IconBrandGravatar: IconBrandGravatar,
    IconShape: IconShape,
    IconUserCheck: IconUserCheck,
    IconId: IconId,
    IconLayoutList: IconLayoutList,
    IconBug: IconBug,
    IconLoader: IconLoader,
    IconRun: IconRun,
    IconUser: IconUser,
    IconHelp: IconHelp,
    IconSitemap: IconSitemap,
    IconPictureInPicture: IconPictureInPicture,
    IconMail: IconMail,
    IconMessages: IconMessages,
    IconNfc: IconNfc,
    IconCalendar: IconCalendar,
    IconBellRinging: IconBellRinging,
    IconBorderAll: IconBorderAll,
    IconChartCandle: IconChartCandle,
    IconBasket: IconBasket
};

const menuItems = {
    items: [
        {
            id: 'dashboard',
            title: <FormattedMessage id="dashboard" />,
            type: 'group',
            children: [
                {
                    id: 'dash-default',
                    title: <FormattedMessage id="Dashboard" />,
                    type: 'item',
                    url: '/dashboard/default',
                    icon: icons['IconDashboard'],
                    breadcrumbs: false
                }
            ]
        },

        // {
        //     id: 'pages',
        //     title: <FormattedMessage id="pages" />,
        //     caption: <FormattedMessage id="pages-caption" />,
        //     type: 'group',
        //     children: [
        //         {
        //             id: 'authentication',
        //             title: <FormattedMessage id="authentication" />,
        //             type: 'collapse',
        //             icon: icons['IconKey'],
        //             children: [




        //                         {
        //                             id: 'login3',
        //                             title: <FormattedMessage id="login" />,
        //                             type: 'item',
        //                             url: '/pages/login/login3',
        //                             target: true
        //                         },
        //                         {
        //                             id: 'register3',
        //                             title: <FormattedMessage id="register" />,
        //                             type: 'item',
        //                             url: '/pages/register/register3',
        //                             target: true
        //                         }






        //             ]
        //         },



        //     ]
        // },
        // {
        //     id: 'utilities',
        //     title: <FormattedMessage id="utilities" />,
        //     type: 'group',
        //     children: [
        //         {
        //             id: 'Appointments',
        //             title: <FormattedMessage id="Appointments" />,
        //             type: 'item',
        //             url: '/utils/util-typography',
        //             icon: icons['IconAppointments']
        //         },
        //         {
        //             id: 'color',
        //             title: <FormattedMessage id="color" />,
        //             type: 'item',
        //             url: '/utils/util-color',
        //             icon: icons['IconPalette']
        //         },
        //         {
        //             id: 'shadow',
        //             title: <FormattedMessage id="shadow" />,
        //             type: 'item',
        //             url: '/utils/util-shadow',
        //             icon: icons['IconShadow']
        //         },
        //         {
        //             id: 'icons',
        //             title: <FormattedMessage id="icons" />,
        //             type: 'collapse',
        //             icon: icons['IconPencil'],
        //             children: [
        //                 {
        //                     id: 'util-tabler-icons',
        //                     title: <FormattedMessage id="tabler-icons" />,
        //                     type: 'item',
        //                     url: '/icons/tabler-icons'
        //                 },
        //                 {
        //                     id: 'util-material-icons',
        //                     title: <FormattedMessage id="material-icons" />,
        //                     type: 'item',
        //                     url: '/icons/material-icons'
        //                 }
        //             ]
        //         }
        //     ]
        // },
        {
            id: 'sample-docs-roadmap',
            type: 'group',
            children: [
                // {
                //     id: 'sample-page',
                //     title: <FormattedMessage id="sample-page" />,
                //     type: 'item',
                //     url: '/sample-page',
                //     icon: icons['IconBrandChrome']
                // },
                {
                    id: 'events',
                    title: <FormattedMessage id="Events" />,
                    type: 'item',
                    url: '/events',
                    icon: icons['IconBellRinging']
                },
                {
                    id: 'Admission',
                    title: <FormattedMessage id="Admission" />,
                    type: 'item',
                    url: '/Admission',
                    icon: icons['IconBoxMultiple']
                },
                {
                    id: 'Teacher',
                    title: <FormattedMessage id="Teacher data" />,
                    type: 'item',
                    url: '/teacher',
                    icon: icons['IconUserCheck']
                },
                {
                    id: 'Newsletter',
                    title: <FormattedMessage id="Newsletter" />,
                    type: 'item',
                    url: '/newsletter',
                    icon: icons['IconShieldLock']
                },
                {
                    id: 'Enquiry',
                    title: <FormattedMessage id="Enquiry" />,
                    type: 'item',
                    url: '/enquiry',
                    icon: icons['IconForms']
                },
                {
                    id: 'Franchise',
                    title: <FormattedMessage id="Franchise" />,
                    type: 'item',
                    url: '/franchise',
                    icon: icons['IconSitemap']
                },
                {
                    id: 'Contact',
                    title: <FormattedMessage id="Contact" />,
                    type: 'item',
                    url: '/contact',
                    icon: icons['IconPhoneCall']
                },
                {
                    id: 'Blogs',
                    title: <FormattedMessage id="Blog" />,
                    type: 'item',
                    url: '/blog',
                    icon: icons['IconForms']
                },
                {
                    id: 'Address',
                    title: <FormattedMessage id="Address" />,
                    type: 'item',
                    url: '/address',
                    icon: icons['IconSitemap']
                },
                {
                    id: 'Calendar',
                    title: <FormattedMessage id="Calendar" />,
                    type: 'item',
                    url: '/calendar',
                    icon: icons['IconCalendar']
                },
                {
                    id: 'Class',
                    title: <FormattedMessage id="Summer Class" />,
                    type: 'item',
                    url: '/class',
                    icon: icons['IconCalendar']
                },
                {
                    id: 'TimeTable',
                    title: <FormattedMessage id="TimeTable" />,
                    type: 'item',
                    url: '/timetable',
                    icon: icons['IconCalendar']
                },
                {
                    id: 'Topbar',
                    title: <FormattedMessage id="Tobbar" />,
                    type: 'item',
                    url: '/topbar',
                    icon: icons['IconCalendar']
                },
            ]
        }
    ]
};

export default menuItems;
